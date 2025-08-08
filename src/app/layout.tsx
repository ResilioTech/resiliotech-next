import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Resiliotech - DevOps Automation for Fast-Moving Startups',
    template: '%s | Resiliotech'
  },
  description: 'Enterprise-grade DevOps infrastructure without enterprise overhead. We help startups scale their technology through automated CI/CD, infrastructure-as-code, and observability solutions.',
  keywords: ['DevOps automation', 'startup infrastructure', 'CI/CD', 'cloud automation', 'SRE services', 'MLOps', 'observability'],
  authors: [{ name: 'Resiliotech' }],
  creator: 'Resiliotech',
  publisher: 'Resiliotech',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://resiliotech.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://resiliotech.com',
    siteName: 'Resiliotech',
    title: 'Resiliotech - DevOps Automation for Fast-Moving Startups',
    description: 'Enterprise-grade DevOps infrastructure without enterprise overhead. We help startups scale their technology through automated solutions.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Resiliotech - DevOps Automation for Startups',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@resiliotech',
    creator: '@resiliotech',
    title: 'Resiliotech - DevOps Automation for Fast-Moving Startups',
    description: 'Enterprise-grade DevOps infrastructure without enterprise overhead. We help startups scale their technology through automated solutions.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="antialiased">
        {/* Hidden Netlify forms for form detection - required for @netlify/plugin-nextjs@5 */}
        <div style={{ display: 'none' }}>
          <form name="newsletter" data-netlify="true" action="/forms/newsletter" method="POST">
            <input type="email" name="email" />
            <input type="text" name="firstName" />
            <input type="text" name="interests" />
            <input type="text" name="source" />
            <input type="checkbox" name="gdprConsent" />
          </form>
          
          <form name="contact" data-netlify="true" action="/forms/contact" method="POST">
            <input type="text" name="name" />
            <input type="email" name="email" />
            <input type="text" name="company" />
            <select name="projectType">
              <option value="devops-transformation">DevOps Transformation</option>
              <option value="cloud-migration">Cloud Migration</option>
              <option value="ci-cd-setup">CI/CD Pipeline Setup</option>
              <option value="monitoring-observability">Monitoring & Observability</option>
              <option value="security-compliance">Security & Compliance</option>
              <option value="platform-engineering">Platform Engineering</option>
              <option value="consulting-strategy">Consulting & Strategy</option>
              <option value="other">Other</option>
            </select>
            <select name="budget">
              <option value="under-25k">Under $25,000</option>
              <option value="25k-50k">$25,000 - $50,000</option>
              <option value="50k-100k">$50,000 - $100,000</option>
              <option value="100k-250k">$100,000 - $250,000</option>
              <option value="over-250k">Over $250,000</option>
              <option value="discuss">Let's discuss</option>
            </select>
            <select name="timeline">
              <option value="asap">ASAP (Rush project)</option>
              <option value="1-month">Within 1 month</option>
              <option value="2-3-months">2-3 months</option>
              <option value="3-6-months">3-6 months</option>
              <option value="6-months-plus">6+ months</option>
              <option value="flexible">Flexible timeline</option>
            </select>
            <textarea name="message"></textarea>
            <input type="checkbox" name="newsletter" />
          </form>
        </div>

        <div className="flex min-h-screen flex-col">
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}