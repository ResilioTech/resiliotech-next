'use client'

import Script from 'next/script'
import { siteConfig } from '@/lib/config'

/**
 * Optimized Microsoft Clarity Component
 * Uses 'lazyOnload' strategy to load after page is fully interactive
 */
export function Clarity() {
  const clarityId = siteConfig.analytics.clarity

  // Don't load in development or if ID is not configured
  if (process.env.NODE_ENV === 'development' || !clarityId) {
    return null
  }

  return (
    <Script
      id="microsoft-clarity"
      strategy="lazyOnload" // Load after page is interactive
    >
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${clarityId}");
      `}
    </Script>
  )
}
