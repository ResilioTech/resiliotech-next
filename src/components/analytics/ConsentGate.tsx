"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/config";

// Extend Window interface for analytics
declare global {
  interface Window {
    dataLayer?: any[];
    clarity?: (...args: any[]) => void;
  }
}

// Declare gtag function type
type GtagFunction = (...args: any[]) => void;

const GA_ID = siteConfig.analytics.ga4;
const CLARITY_ID = siteConfig.analytics.clarity;
const CONSENT_BANNER_ENABLED = process.env.NEXT_PUBLIC_ENABLE_CONSENT_BANNER !== "false";

function loadScript(src: string) {
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  script.defer = true;
  script.crossOrigin = "anonymous";
  document.head.appendChild(script);
}

function requestIdle(callback: () => void) {
  // Use idle callback to avoid blocking main thread
  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(callback, { timeout: 3000 });
  } else {
    // Fallback: wait 2.5s to ensure LCP/FCP/TTI are not blocked
    setTimeout(callback, 2500);
  }
}

export default function ConsentGate() {
  const [consented, setConsented] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  // Check stored consent on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("rtx-consent");
    if (stored === "yes") {
      setConsented(true);
    } else if (stored === "no") {
      setConsented(false);
      setShowBanner(false);
    } else if (CONSENT_BANNER_ENABLED) {
      // No consent stored, show banner
      setShowBanner(true);
    } else {
      // Banner disabled, auto-consent
      setConsented(true);
    }
  }, []);

  // Load analytics after consent + idle
  useEffect(() => {
    if (!consented) return;

    requestIdle(() => {
      // Load GA4 after idle
      if (GA_ID && process.env.NODE_ENV !== "development") {
        loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);

        window.dataLayer = window.dataLayer || [];
        const gtag: GtagFunction = function () {
          window.dataLayer!.push(arguments);
        };

        gtag("js", new Date());
        gtag("config", GA_ID, {
          send_page_view: false,
          anonymize_ip: true,
          cookie_flags: "SameSite=None;Secure",
        });

        // Send initial page view
        gtag("event", "page_view", {
          page_path: window.location.pathname,
        });
      }

      // Load Clarity only if ID is configured
      if (CLARITY_ID && process.env.NODE_ENV !== "development") {
        // Clarity loading script (untyped IIFE to avoid TS conflicts)
        (window as any).clarity =
          (window as any).clarity ||
          function (...args: any[]) {
            ((window as any).clarity.q = (window as any).clarity.q || []).push(args);
          };
        const clarityScript = document.createElement("script");
        clarityScript.async = true;
        clarityScript.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
        const firstScript = document.getElementsByTagName("script")[0];
        firstScript.parentNode!.insertBefore(clarityScript, firstScript);
      }
    });
  }, [consented]);

  // Don't show banner if not enabled or if consent already given/denied
  if (!showBanner) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 bg-neutral-900 text-white text-sm p-3 md:p-4 shadow-lg border-t border-neutral-700"
      role="dialog"
      aria-label="Cookie consent banner"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="opacity-90 text-center sm:text-left">
          We use minimal analytics (Google Analytics & Microsoft Clarity) to improve the site. Load analytics now?
        </p>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => {
              localStorage.setItem("rtx-consent", "no");
              setConsented(false);
              setShowBanner(false);
            }}
            className="px-4 py-2 rounded bg-neutral-700 hover:bg-neutral-600 transition-colors font-medium"
            aria-label="Decline analytics"
          >
            Decline
          </button>
          <button
            onClick={() => {
              localStorage.setItem("rtx-consent", "yes");
              setConsented(true);
              setShowBanner(false);
            }}
            className="px-4 py-2 rounded bg-primary hover:bg-primary-hover transition-colors font-medium"
            aria-label="Accept analytics"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
