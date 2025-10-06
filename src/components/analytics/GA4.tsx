'use client'

import Script from 'next/script'
import { siteConfig } from '@/lib/config'

/**
 * Google Analytics 4 Component
 * Add this to your root layout to enable analytics
 */
export function GA4() {
  const ga4Id = siteConfig.analytics.ga4

  // Don't load in development
  if (process.env.NODE_ENV === 'development') {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ga4Id}', {
            page_path: window.location.pathname,
            cookie_flags: 'SameSite=None;Secure'
          });
        `}
      </Script>
    </>
  )
}

/**
 * Track custom events
 * Usage: trackEvent('audit_booked', { source: 'hero_cta' })
 */
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params)
  }
}

/**
 * Track CTA clicks
 * Usage: trackCTAClick('hero', 'Book Audit', '/calendly')
 */
export const trackCTAClick = (location: string, ctaText: string, destination: string) => {
  trackEvent('cta_click', {
    cta_location: location,
    cta_text: ctaText,
    cta_destination: destination
  })
}

/**
 * Track form submissions
 * Usage: trackFormSubmit('pilot_application', 'founding-pilot')
 */
export const trackFormSubmit = (formName: string, formLocation: string) => {
  trackEvent('form_submit', {
    form_name: formName,
    form_location: formLocation
  })
}

/**
 * Track downloads
 * Usage: trackDownload('30-day-devops-plan.pdf')
 */
export const trackDownload = (fileName: string) => {
  trackEvent('file_download', {
    file_name: fileName
  })
}

/**
 * Track outbound links
 * Usage: trackOutboundLink('https://github.com/resiliotech')
 */
export const trackOutboundLink = (url: string) => {
  trackEvent('outbound_link', {
    link_url: url
  })
}
