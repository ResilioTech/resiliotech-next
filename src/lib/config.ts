/**
 * Resilio Tech Site Configuration
 * AI Infrastructure & Reliability Company
 */

export const siteConfig = {
  // Company Info
  name: "Resilio Tech",
  domain: "resiliotech.com",
  url: "https://resiliotech.com",
  description: "AI Infrastructure That Doesn't Break in Production. We help companies deploy, scale, and operate AI systems reliably.",
  tagline: "AI Infrastructure That Doesn't Break in Production",

  // Location & Support
  hq: "India",
  servingGlobally: true,
  timezone: "Asia/Kolkata",

  // Tech Stack
  primaryClouds: ["AWS", "GCP", "Azure"],

  // Contact
  email: {
    hello: "hello@resiliotech.com",
    support: "hello@resiliotech.com",
  },

  // External Links
  calendly: "https://calendly.com/resiliotech",

  // Form Endpoints (Netlify Forms)
  forms: {
    netlify: true,
  },

  // Social Links (Company pages only — NO personal profiles)
  social: {
    github: "https://github.com/resiliotech",
    linkedin: "https://www.linkedin.com/company/resiliotech",
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
  },

  // Feature Flags
  features: {
    blog: true,
    testimonials: false,
    caseStudies: false,
    roadmap: true,
    changelog: false
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
