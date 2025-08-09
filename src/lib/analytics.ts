// Analytics event tracking utilities
declare global {
  interface Window {
    gtag: (command: string, eventName: string, eventData?: Record<string, any>) => void;
  }
}

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

export function trackEvent(eventName: string, eventData: AnalyticsEvent) {
  // Only track if gtag is available (production environment)
  if (typeof window !== 'undefined' && window.gtag) {
    try {
      window.gtag('event', eventName, {
        event_category: eventData.category,
        event_label: eventData.label,
        value: eventData.value,
        ...eventData
      });
    } catch (error) {
      console.warn('Analytics tracking error:', error);
    }
  } else {
    // Log in development for debugging
    console.log('Analytics Event:', eventName, eventData);
  }
}

// Predefined event tracking functions
export const analytics = {
  // CTA click events
  trackCTAClick: (location: string, ctaText: string, destination: string) => {
    trackEvent('cta_click', {
      action: 'click',
      category: 'engagement',
      label: `${location}: ${ctaText}`,
      cta_location: location,
      cta_text: ctaText,
      destination: destination
    });
  },

  // Form events
  trackFormStart: (formName: string, location: string) => {
    trackEvent('form_start', {
      action: 'start',
      category: 'form',
      label: formName,
      form_name: formName,
      form_location: location
    });
  },

  trackFormSubmit: (formName: string, location: string, success: boolean = true) => {
    trackEvent('form_submit', {
      action: success ? 'submit_success' : 'submit_error',
      category: 'form',
      label: formName,
      form_name: formName,
      form_location: location,
      success: success
    });
  },

  // Navigation events
  trackNavigation: (section: string, destination: string) => {
    trackEvent('navigation_click', {
      action: 'click',
      category: 'navigation',
      label: `${section} → ${destination}`,
      nav_section: section,
      destination: destination
    });
  },

  // Content engagement
  trackContentView: (contentType: string, contentName: string) => {
    trackEvent('content_view', {
      action: 'view',
      category: 'content',
      label: contentName,
      content_type: contentType,
      content_name: contentName
    });
  }
};