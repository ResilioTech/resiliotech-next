# Newsletter Kit Integration Setup

## Overview
The newsletter system has been updated to integrate with Kit (formerly ConvertKit) for better email marketing capabilities.

## Environment Variables Required

In your Netlify dashboard, add the following environment variables:

### NETLIFY_TOKEN
- **Description**: Your Kit API secret key
- **How to get it**: 
  1. Log into your Kit account
  2. Go to Settings → Advanced → API & Webhooks
  3. Generate a new API Secret
  4. Copy the secret key

### KIT_FORM_ID (Optional)
- **Description**: The form ID in Kit you want to subscribe users to
- **Default**: Uses form ID "8411580" if not specified
- **How to get it**: Check your Kit forms section for the form ID

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

- ✅ GDPR compliant with consent tracking
- ✅ Duplicate subscription handling
- ✅ Error handling with user-friendly messages
- ✅ Analytics tracking with subscription IDs
- ✅ LocalStorage integration to prevent modal reappearance
- ✅ CORS support for cross-origin requests
- ✅ Validation for email format and required fields

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