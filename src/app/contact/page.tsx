import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { CopyEmailButton } from '@/components/ui/CopyEmailButton';

const ContactHero = dynamic(() => import('@/components/contact/ContactHero').then(mod => ({ default: mod.ContactHero })), {
  ssr: true,
  loading: () => <div className="h-screen bg-gradient-to-br from-background via-surface to-surface-elevated"></div>
});

const ContactForm = dynamic(() => import('@/components/contact/ContactForm').then(mod => ({ default: mod.ContactForm })), {
  ssr: false,
  loading: () => <div className="max-w-2xl mx-auto p-8 bg-surface-elevated rounded-xl animate-pulse"><div className="h-96 bg-surface rounded-lg"></div></div>
});

const FAQSection = dynamic(() => import('@/components/contact/FAQSection').then(mod => ({ default: mod.FAQSection })), {
  ssr: false,
  loading: () => <div className="py-24 bg-surface animate-pulse"><div className="max-w-4xl mx-auto px-6"><div className="h-64 bg-background rounded-xl"></div></div></div>
});

export const metadata: Metadata = {
  title: 'Contact Us — Book a Free AI Infrastructure Audit',
  description: 'Book a free 30-minute AI infrastructure audit. We assess your current setup, identify reliability gaps, and give you a concrete action plan. We respond within 24 hours.',
  keywords: ['contact resilio tech', 'AI infrastructure audit', 'MLOps consulting', 'free consultation', 'AI infrastructure help'],
  openGraph: {
    title: 'Contact Us — Book a Free AI Infra Audit | Resilio Tech',
    description: 'Book a free 30-minute AI infrastructure audit. We respond within 24 hours.',
    images: ['/og-image.png'],
  },
  twitter: {
    title: 'Contact Us — Book a Free AI Infra Audit | Resilio Tech',
    description: 'Book a free 30-minute AI infrastructure audit. We respond within 24 hours.',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <ContactHero />

      {/* Contact Form Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <ContactForm />
        </div>
      </section>

      <FAQSection />

      {/* Alternative Contact Methods */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Other Ways to Reach Us
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-surface-elevated border border-border rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">Email</h3>
              <CopyEmailButton className="text-primary hover:text-primary-hover" />
            </div>
            
            <div className="p-6 bg-surface-elevated border border-border rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">LinkedIn</h3>
              <a 
                href="https://www.linkedin.com/company/resiliotech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-hover transition-colors"
              >
                Connect with us
              </a>
            </div>
            
            <div className="p-6 bg-surface-elevated border border-border rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">Response Time</h3>
              <p className="text-text-secondary text-sm">
                We respond within 24 hours
              </p>
            </div>
          </div>

          <div className="mt-12 p-6 bg-surface-elevated border border-border rounded-lg">
            <h3 className="text-lg font-bold text-text-primary mb-3">
              Prefer a Quick Call?
            </h3>
            <p className="text-text-secondary mb-4">
              Schedule a free 30-minute AI infrastructure audit to discuss your needs.
            </p>
            <a
              href="https://calendly.com/resiliotech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-primary hover:bg-primary-hover text-background rounded-lg font-semibold transition-colors"
            >
              Book Free AI Infra Audit
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}