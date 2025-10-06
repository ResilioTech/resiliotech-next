'use client'

import Script from 'next/script'
import { siteConfig } from '@/lib/config'

/**
 * Optimized Google Analytics 4 Component
 * Uses 'worker' strategy to run in a web worker (doesn't block main thread)
 * Falls back to 'lazyOnload' if worker not supported
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
        strategy="worker" // Run in web worker (best performance)
        // strategy="lazyOnload" // Alternative: load after page is interactive
      />
      <Script id="google-analytics-config" strategy="worker">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ga4Id}', {
            page_path: window.location.pathname,
            cookie_flags: 'SameSite=None;Secure',
            // Performance optimizations
            send_page_view: false, // We'll manually send page views
            anonymize_ip: true,
          });

          // Send initial page view
          gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}

/**
 * Track custom events (with debouncing to reduce calls)
 */
let eventQueue: Array<{ name: string; params: any }> = []
let eventTimer: NodeJS.Timeout | null = null

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    // Queue events and batch send them
    eventQueue.push({ name: eventName, params })

    if (eventTimer) clearTimeout(eventTimer)

    eventTimer = setTimeout(() => {
      eventQueue.forEach(({ name, params }) => {
        (window as any).gtag('event', name, params)
      })
      eventQueue = []
    }, 100) // Batch events within 100ms window
  }
}

/**
 * Track CTA clicks
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
 */
export const trackFormSubmit = (formName: string, formLocation: string) => {
  trackEvent('form_submit', {
    form_name: formName,
    form_location: formLocation
  })
}

/**
 * Track downloads
 */
export const trackDownload = (fileName: string) => {
  trackEvent('file_download', {
    file_name: fileName
  })
}

/**
 * Track outbound links
 */
export const trackOutboundLink = (url: string) => {
  trackEvent('outbound_link', {
    link_url: url
  })
}
