import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, Calendar } from 'lucide-react'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Thank You | Message Received',
  description: 'Thank you for contacting Resilio Tech. We\'ll respond within 24 hours.',
}

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-24">
      <div className="max-w-2xl w-full text-center">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full"></div>
            <CheckCircle2 className="w-20 h-20 text-green-500 relative" strokeWidth={1.5} />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
          Thank You!
        </h1>
        <p className="text-xl text-text-secondary mb-12">
          We&apos;ve received your submission and will respond within <strong>24 hours</strong>.
        </p>

        {/* What Happens Next */}
        <div className="bg-surface border border-border rounded-xl p-8 mb-12 text-left">
          <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">
            What Happens Next?
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">We Review Your Request</h3>
                <p className="text-text-secondary">
                  Our team reviews your submission and prepares a personalized response.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">You&apos;ll Hear From Us</h3>
                <p className="text-text-secondary">
                  Expect an email from <a href={`mailto:${siteConfig.email.contact}`} className="text-primary hover:underline">{siteConfig.email.contact}</a> within 24 hours.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">Let&apos;s Talk</h3>
                <p className="text-text-secondary">
                  We&apos;ll schedule a call to discuss your needs and explore how we can help.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
          >
            Back to Home
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href={siteConfig.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-surface-elevated hover:bg-surface border border-border hover:border-primary text-text-primary font-semibold rounded-lg transition-all duration-300"
          >
            <Calendar className="w-5 h-5" />
            Or Book a Call Now
          </Link>
        </div>

        {/* Additional Resources */}
        <div className="border-t border-border pt-8">
          <p className="text-sm text-text-muted mb-4">While you wait, check out:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/blog"
              className="text-primary hover:underline text-sm"
            >
              Blog
            </Link>
            <Link
              href="/services"
              className="text-primary hover:underline text-sm"
            >
              Our Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
