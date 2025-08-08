export interface NewsletterSubscription {
  email: string;
  firstName?: string;
  interests?: NewsletterTopic[];
  source?: string;
  subscribedAt: Date;
}

export interface NewsletterTopic {
  id: string;
  name: string;
  description: string;
}

export interface NewsletterFormData {
  email: string;
  firstName?: string;
  interests?: string[];
  source?: string;
  gdprConsent: boolean;
}

export interface NewsletterResponse {
  success: boolean;
  message: string;
  subscriberId?: string;
}