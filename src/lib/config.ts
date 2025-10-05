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
  calendly: "https://calendly.com/resiliotech/30min-audit",

  // Form Endpoints (Replace with your actual endpoints)
  forms: {
    waitlist: "https://formspree.io/f/YOUR_FORM_ID",
    leadMagnet: "https://formspree.io/f/YOUR_FORM_ID",
    contact: "https://formspree.io/f/YOUR_FORM_ID",
    pilot: "https://formspree.io/f/YOUR_FORM_ID"
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
    ga4: "G-XXXXXXXXXX", // Replace with your GA4 measurement ID
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
