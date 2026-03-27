import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import ConsentGate from '@/components/analytics/ConsentGate'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Resilio Tech — AI Infrastructure That Doesn\'t Break in Production',
    template: '%s | Resilio Tech'
  },
  description: 'We help companies deploy, scale, and operate AI systems reliably. From model serving to monitoring — production-grade AI infrastructure by engineers who\'ve run systems at enterprise scale.',
  keywords: ['AI infrastructure consulting', 'MLOps services', 'ML model deployment', 'AI reliability engineering', 'production AI systems', 'AI SRE', 'deploy ML models to production', 'AI infrastructure for startups'],
  authors: [{ name: 'Resilio Tech' }],
  creator: 'Resilio Tech',
  publisher: 'Resilio Tech',
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
    siteName: 'Resilio Tech',
    title: 'Resilio Tech — AI Infrastructure That Doesn\'t Break in Production',
    description: 'We deploy ML models to production and make sure they stay up. Production-grade AI infrastructure & reliability.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Resilio Tech — Production-Grade AI Infrastructure & Reliability',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@resiliotech',
    creator: '@resiliotech',
    title: 'Resilio Tech — AI Infrastructure That Doesn\'t Break in Production',
    description: 'We deploy ML models to production and make sure they stay up. Production-grade AI infrastructure & reliability.',
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
    <html lang="en" suppressHydrationWarning className={inter.variable}>
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
      <body className={`${inter.className} antialiased`}>
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:shadow-lg transition-all"
        >
          Skip to main content
        </a>

        <div className="flex min-h-screen flex-col">
          <Navigation />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <ConsentGate />
      </body>
    </html>
  )
}