/**
 * Resiliotech Site Configuration
 * Day-0 honest setup with no fake clients or testimonials
 */

export const siteConfig = {
  // Company Info
  name: "Resiliotech",
  domain: "resiliotech.com",
  url: "https://resiliotech.com",
  description: "Platform-grade DevOps for startups. From repo to reliable infra in 30 days—without enterprise overhead.",

  // Location & Support
  hq: "India",
  supportHours: "Mon–Fri 10:00–19:00 IST",
  timezone: "Asia/Kolkata",

  // Tech Stack
  primaryClouds: ["AWS", "Azure", "GCP"],

  // Contact
  email: {
    hello: "hello@resiliotech.com",
    support: "support@resiliotech.com",
    founders: "founders@resiliotech.com"
  },

  // External Links
  calendly: "https://calendly.com/resiliotech",

  // Form Endpoints (Netlify Forms - no action needed, forms handled by Netlify)
  forms: {
    netlify: true, // Using Netlify Forms
  },

  // Social Links
  social: {
    github: "https://github.com/resiliotech",
    linkedin: "https://www.linkedin.com/company/resilio-tech",
    twitter: "https://x.com/resiliotech",
    youtube: "https://www.youtube.com/@ResilioTech"
  },

  // Analytics
  analytics: {
    ga4: "G-GBTY565EQ7",
    clarity: "sr1y78mww9",
  },

  // reCAPTCHA
  recaptcha: {
    siteKey: "6Ld9bp0rAAAAACdIYemp9LvEyC6NGghMjeyUkR0u",
    // Secret key should be in environment variables, not in client code
  },

  // Business Model
  founding: {
    slots: 3,
    currency: "INR",
    fixedFee: true
  },

  // Product Status
  products: {
    deployflow: {
      status: "Private Alpha",
      waitlistOpen: true
    },
    infrascale: {
      status: "Planned",
      waitlistOpen: true
    },
    cloudwatchPro: {
      status: "Planned",
      waitlistOpen: true
    },
    secureops: {
      status: "Planned",
      waitlistOpen: true
    }
  },

  // Product Label Overrides (Day-0 cleanup)
  productLabels: {
    observability: "SignalWatch" // Renamed from "CloudWatch Pro" to avoid AWS confusion
  },

  // Day-0 Constants
  today: "2025-10-06",
  foundingPilotUrl: "/founding-pilot",

  // Feature Flags
  features: {
    blog: true,
    products: true,
    testimonials: false, // Day-0: no fake testimonials
    caseStudies: false,  // Day-0: no fake case studies
    roadmap: true,
    changelog: true
  }
} as const

export type SiteConfig = typeof siteConfig

/**
 * Helper to check if a social URL is real (not just a domain homepage)
 */
export const hasRealSocialUrl = (url?: string): boolean => {
  if (!url) return false
  // Check if it's just a domain homepage without a handle
  return !/^(https?:\/\/)?(www\.)?(linkedin\.com|x\.com|twitter\.com|github\.com|youtube\.com)\/?$/.test(url)
}
