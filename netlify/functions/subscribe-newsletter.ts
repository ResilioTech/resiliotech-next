// Netlify function types
interface HandlerEvent {
  httpMethod: string;
  body?: string;
  headers?: Record<string, string>;
  path?: string;
  queryStringParameters?: Record<string, string>;
}

interface HandlerContext {
  callbackWaitsForEmptyEventLoop: boolean;
}

interface HandlerResponse {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
}

type Handler = (event: HandlerEvent, context: HandlerContext) => Promise<HandlerResponse>;

interface SubscriptionRequest {
  email: string;
  firstName?: string;
  interests?: string[];
  source?: string;
  gdprConsent?: boolean;
}

interface KitSubscriberResponse {
  subscription: {
    id: number;
    state: string;
    created_at: string;
    source: string;
    referrer: string;
    subscribable_id: number;
    subscribable_type: string;
    subscriber: {
      id: number;
      first_name: string;
      email_address: string;
      state: string;
      created_at: string;
      fields: Record<string, any>;
      tags: any[];
    };
  };
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext): Promise<HandlerResponse> => {
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Get Kit API key from environment variables
    const kitApiKey = process.env.NETLIFY_TOKEN;
    
    console.log('Environment check:', {
      hasApiKey: !!kitApiKey,
      keyLength: kitApiKey ? kitApiKey.length : 0,
      keyPrefix: kitApiKey ? kitApiKey.substring(0, 10) + '...' : 'none'
    });
    
    if (!kitApiKey) {
      console.error('Kit API key not found in environment variables');
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ 
          success: false, 
          error: 'Server configuration error - missing API key' 
        })
      };
    }

    // Parse request body
    if (!event.body) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ 
          success: false, 
          error: 'Request body is required' 
        })
      };
    }

    const requestData: SubscriptionRequest = JSON.parse(event.body);
    
    // Validate required fields
    if (!requestData.email) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ 
          success: false, 
          error: 'Email address is required' 
        })
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(requestData.email)) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ 
          success: false, 
          error: 'Invalid email address format' 
        })
      };
    }

    // Prepare Kit API request
    const kitFormId = process.env.KIT_FORM_ID || '6c7f10c1fa'; // Default form ID from ConvertKit embed
    
    const kitRequestData = {
      email_address: requestData.email,
      first_name: requestData.firstName || '',
      fields: {
        source: requestData.source || 'website',
        interests: requestData.interests ? requestData.interests.join(',') : 'devops',
        consent_date: new Date().toISOString(),
        gdpr_consent: requestData.gdprConsent ? 'yes' : 'no'
      },
      tags: requestData.interests || ['devops-newsletter']
    };

    // Try Kit API v3 with embed form format
    const apiUrl = `https://api.kit.com/v3/forms/${kitFormId}/subscribe`;
    console.log('Making Kit API request to:', apiUrl);
    console.log('Form ID from embed:', kitFormId);
    
    // Kit API v3 format for embed forms
    const kitRequestV3 = {
      api_secret: kitApiKey,
      email: requestData.email,
      first_name: requestData.firstName || '',
      // For embed forms, custom fields might need to be in the root
      source: requestData.source || 'website',
      interests: requestData.interests ? requestData.interests.join(',') : 'devops',
      consent_date: new Date().toISOString(),
      gdpr_consent: requestData.gdprConsent ? 'yes' : 'no'
    };
    
    console.log('Request data:', { ...kitRequestV3, email: 'MASKED', api_secret: 'MASKED' });
    
    const kitResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(kitRequestV3)
    });

    if (!kitResponse.ok) {
      const errorText = await kitResponse.text();
      console.error('Kit API error:', {
        status: kitResponse.status,
        statusText: kitResponse.statusText,
        body: errorText
      });

      // Handle specific Kit API errors
      if (kitResponse.status === 400) {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({ 
            success: false, 
            error: 'Invalid subscription data. Please check your email address.' 
          })
        };
      }

      if (kitResponse.status === 409) {
        return {
          statusCode: 200, // Return success for already subscribed users
          headers: corsHeaders,
          body: JSON.stringify({ 
            success: true, 
            message: 'You are already subscribed to our newsletter!',
            alreadySubscribed: true
          })
        };
      }

      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ 
          success: false, 
          error: 'Subscription service temporarily unavailable. Please try again later.' 
        })
      };
    }

    const kitData: KitSubscriberResponse = await kitResponse.json();

    // Log successful subscription (without sensitive data)
    console.log('Successful subscription:', {
      email: requestData.email.replace(/(.{3}).*@/, '$1***@'), // Partially mask email
      source: requestData.source,
      subscriberId: kitData.subscription?.subscriber?.id,
      subscriptionState: kitData.subscription?.state
    });

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        message: 'Successfully subscribed to newsletter!',
        data: {
          subscriptionId: kitData.subscription?.id,
          state: kitData.subscription?.state,
          subscriberState: kitData.subscription?.subscriber?.state
        }
      })
    };

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        error: 'Internal server error. Please try again later.'
      })
    };
  }
};

export { handler };