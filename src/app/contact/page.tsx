import type { Metadata } from 'next';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactForm } from '@/components/contact/ContactForm';
import { FAQSection } from '@/components/contact/FAQSection';

export const metadata: Metadata = {
  title: 'Contact Us - Get Your DevOps Project Started',
  description: 'Ready to transform your infrastructure? Contact Resiliotech for expert DevOps consulting, cloud migration, and platform engineering services. Free consultation available.',
  keywords: ['contact resiliotech', 'devops consulting', 'free consultation', 'cloud migration', 'infrastructure help'],
  openGraph: {
    title: 'Contact Us - Get Your DevOps Project Started | Resiliotech',
    description: 'Ready to transform your infrastructure? Contact our team of experts from Google, Netflix, and Stripe for your DevOps transformation.',
    images: ['/og-images/contact-us.png'],
  },
  twitter: {
    title: 'Contact Us - Get Your DevOps Project Started | Resiliotech',
    description: 'Ready to transform your infrastructure? Contact our team of experts from Google, Netflix, and Stripe for your DevOps transformation.',
  },
};

export default function ContactPage() {
  return (
    <>

      <div className="min-h-screen">
        {/* Hero Section */}
        <ContactHero />

        {/* Contact Form Section */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <ContactForm />
          </div>
        </section>

        {/* FAQ Section */}
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
                <a 
                  href="mailto:hello@resiliotech.com"
                  className="text-primary hover:text-primary-hover transition-colors"
                >
                  hello@resiliotech.com
                </a>
              </div>
              
              <div className="p-6 bg-surface-elevated border border-border rounded-lg">
                <h3 className="font-semibold text-text-primary mb-2">LinkedIn</h3>
                <a 
                  href="https://www.linkedin.com/company/resilio-tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-hover transition-colors"
                >
                  Connect with us
                </a>
              </div>
              
              <div className="p-6 bg-surface-elevated border border-border rounded-lg">
                <h3 className="font-semibold text-text-primary mb-2">Emergency Support</h3>
                <p className="text-text-secondary text-sm">
                  For existing clients with urgent issues
                </p>
              </div>
            </div>

            <div className="mt-12 p-6 bg-surface-elevated border border-border rounded-lg">
              <h3 className="text-lg font-bold text-text-primary mb-3">
                Prefer a Quick Call?
              </h3>
              <p className="text-text-secondary mb-4">
                Schedule a free 30-minute consultation to discuss your project and see if we're a good fit.
              </p>
              <a
                href="https://calendly.com/resiliotech/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg transition-colors"
              >
                Schedule Free Consultation
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}