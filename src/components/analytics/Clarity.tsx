'use client'

import Script from 'next/script'
import { siteConfig } from '@/lib/config'

/**
 * Microsoft Clarity Component
 * Add this to your root layout to enable session recordings and heatmaps
 */
export function Clarity() {
  const clarityId = siteConfig.analytics.clarity

  // Don't load in development or if ID is not configured
  if (process.env.NODE_ENV === 'development' || !clarityId) {
    return null
  }

  return (
    <Script id="microsoft-clarity" strategy="lazyOnload">
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
