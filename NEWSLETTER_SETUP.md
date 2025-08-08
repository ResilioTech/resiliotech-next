# Newsletter Kit Integration Setup

## Overview
The newsletter system has been updated to integrate with Kit (formerly ConvertKit) for better email marketing capabilities.

## Environment Variables Required

In your Netlify dashboard, add the following environment variables:

### NETLIFY_TOKEN
- **Description**: Your Kit API Secret (NOT the API Key)
- **How to get it**: 
  1. Log into your Kit account
  2. Go to Settings → Advanced → API & Webhooks  
  3. Look for "API Secret" section (NOT "API Key")
  4. Copy the API Secret value (should be a long string starting with your account ID)
  5. **Important**: Use the API Secret, not the API Key - they are different!

### KIT_FORM_ID (Optional)
- **Description**: The form ID in Kit you want to subscribe users to
- **Default**: Uses form ID "6c7f10c1fa" (from your ConvertKit embed script)
- **How to get it**: Found in your ConvertKit form embed script `data-uid` attribute

## How It Works

1. **User subscribes** via any newsletter form on the website
2. **Netlify function** (`/.netlify/functions/subscribe-newsletter`) receives the request
3. **Kit API** is called to add the subscriber
4. **Response** is sent back to the frontend with success/error status

## API Endpoint

**URL**: `/.netlify/functions/subscribe-newsletter`
**Method**: POST
**Content-Type**: application/json

### Request Body
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "source": "homepage",
  "interests": ["devops", "tutorials"],
  "gdprConsent": true
}
```

### Response
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter!",
  "data": {
    "subscriptionId": 12345,
    "state": "active",
    "subscriberState": "active"
  }
}
```

## Components Updated

1. **`/src/components/newsletter/NewsletterSignup.tsx`** - Main newsletter component
2. **`/src/components/blog/NewsletterSignup.tsx`** - Blog newsletter component
3. **`/netlify/functions/subscribe-newsletter.ts`** - Serverless function for Kit integration

## Features

- ✅ **ConvertKit Integration**: Direct API integration with your Kit account
- ✅ **Serverless Function**: Secure API calls via Netlify Functions
- ✅ **Form ID**: Uses `6c7f10c1fa` from your embed script
- ✅ GDPR compliant with consent tracking
- ✅ Duplicate subscription handling
- ✅ Error handling with user-friendly messages
- ✅ Analytics tracking with subscription IDs
- ✅ LocalStorage integration to prevent modal reappearance
- ✅ CORS support for cross-origin requests
- ✅ Validation for email format and required fields
- ✅ Compatible with @netlify/plugin-nextjs@5 (no forms migration needed)

## Testing

1. Deploy to Netlify with environment variables set
2. Test newsletter signup on various forms
3. Check Kit dashboard for new subscribers
4. Verify error handling with invalid emails

## Security

- API keys are stored as environment variables (never in code)
- CORS headers properly configured
- Input validation and sanitization
- Error messages don't expose sensitive information