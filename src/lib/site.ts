/**
 * Site-wide configuration for content and URLs
 * Central source of truth for dates, hours, social links, and product labels
 */

export const SITE = {
  TODAY: "2025-10-08",
  HOURS: "Mon–Fri 10:00–19:00 IST",
  PILOT_URL: "/founding-pilot",
  CALENDLY: "https://calendly.com/resiliotech",
  SOCIAL: {
    linkedin: "",
    twitter: "",
    github: "",
    youtube: ""
  },
  PRODUCT_LABELS: {
    observability: "SignalWatch"
  }
} as const;

/**
 * Check if a URL is a real, configured URL (not just a placeholder domain)
 */
export const hasRealUrl = (url?: string): boolean => {
  if (!url) return false;

  // Reject bare domain URLs that are just placeholders
  const placeholderPattern = /^(https?:\/\/)?(www\.)?(linkedin\.com|x\.com|twitter\.com|github\.com|youtube\.com)\/?$/;

  return !placeholderPattern.test(url);
};
