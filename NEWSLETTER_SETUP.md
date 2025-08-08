# Newsletter Netlify Forms Setup

## Overview
The newsletter and contact system uses Netlify Forms for simple, reliable form handling without external dependencies.

## No Environment Variables Required

All form submissions are handled directly by Netlify - no API keys or external services needed!

## How It Works

1. **User submits** newsletter or contact form on the website
2. **Netlify Forms** automatically processes the submission
3. **Form data** appears in your Netlify dashboard under "Forms"
4. **Email notifications** can be configured in Netlify settings

## Form Submissions

Forms are submitted directly to Netlify using standard HTML form submission:

**Method**: POST to `/` (root)
**Content-Type**: application/x-www-form-urlencoded

### Forms Available
- **newsletter** - Main newsletter signup
- **blog-newsletter** - Blog newsletter signup  
- **contact** - Contact form submissions

## Components Updated

1. **`/src/components/newsletter/NewsletterSignup.tsx`** - Main newsletter component
2. **`/src/components/blog/NewsletterSignup.tsx`** - Blog newsletter component
3. **`/src/components/contact/ContactForm.tsx`** - Contact form component

## Features

- ✅ **Netlify Forms Integration**: Simple, reliable form handling
- ✅ **No External Dependencies**: No API keys or third-party services needed
- ✅ **Three Form Types**: Newsletter, blog newsletter, and contact forms
- ✅ **Spam Protection**: Built-in honeypot and spam filtering
- ✅ GDPR compliant with consent tracking
- ✅ Error handling with user-friendly messages
- ✅ Analytics tracking with Google Analytics
- ✅ LocalStorage integration to prevent modal reappearance
- ✅ Validation for email format and required fields
- ✅ Compatible with @netlify/plugin-nextjs@5

## Testing

1. Deploy to Netlify (no environment variables needed)
2. Test newsletter signup on various forms
3. Check Netlify dashboard "Forms" section for submissions
4. Verify error handling with invalid emails
5. Set up email notifications in Netlify settings

## Netlify Dashboard

After deployment, you can:
- View all form submissions in **Site settings → Forms**
- Set up email notifications for new submissions
- Download submission data as CSV
- Configure spam filtering settings
- Set up webhooks for form submissions

## Security

- Built-in spam protection with honeypot fields
- Input validation and sanitization
- Rate limiting on form submissions
- No API keys or sensitive data exposed