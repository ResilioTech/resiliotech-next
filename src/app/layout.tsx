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
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#00d4ff" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="antialiased">

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