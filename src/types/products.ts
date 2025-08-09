export interface ProductFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  comingSoon?: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface ProductInfo {
  name: string;
  tagline: string;
  description: string;
  launchDate?: string;
  status?: 'planning' | 'development' | 'beta' | 'launched' | 'waitlist';
  category?: 'deployment' | 'monitoring' | 'security' | 'infrastructure' | 'analytics';
  features: ProductFeature[];
  benefits: string[];
  targetAudience: string[];
  pricing: {
    isRevealed: boolean;
    startingPrice?: number;
    pricingModel?: string;
  };
}

export interface EarlyAccessSignup {
  email: string;
  interestedFeatures?: string[];
  referralSource?: string;
  marketingConsent: boolean;
}

export interface ProductTimeline {
  phase: string;
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'current' | 'upcoming';
}