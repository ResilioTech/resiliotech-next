import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { companyValues, companyMilestones, companyStats } from '@/data/company';

const AboutHero = dynamic(() => import('@/components/about/AboutHero').then(mod => ({ default: mod.AboutHero })), {
  ssr: true,
  loading: () => <div className="h-screen bg-gradient-to-br from-background via-surface to-surface-elevated"></div>
});

const TeamSection = dynamic(() => import('@/components/about/TeamSection').then(mod => ({ default: mod.TeamSection })), {
  ssr: true,
  loading: () => <div className="py-24 bg-surface animate-pulse"><div className="max-w-7xl mx-auto px-6"><div className="h-96 bg-background rounded-xl"></div></div></div>
});

const ValuesSection = dynamic(() => import('@/components/about/ValuesSection').then(mod => ({ default: mod.ValuesSection })), {
  ssr: true,
  loading: () => <div className="py-24 bg-background animate-pulse"><div className="max-w-7xl mx-auto px-6"><div className="h-80 bg-surface rounded-xl"></div></div></div>
});

const TimelineSection = dynamic(() => import('@/components/about/TimelineSection').then(mod => ({ default: mod.TimelineSection })), {
  ssr: true,
  loading: () => <div className="py-24 bg-surface animate-pulse"><div className="max-w-6xl mx-auto px-6"><div className="h-96 bg-background rounded-xl"></div></div></div>
});

export const metadata: Metadata = {
  title: 'About Us — AI Infrastructure & Reliability Engineers',
  description: 'Resilio Tech was founded by experienced SREs who saw a gap — companies building AI couldn\'t make it work reliably in production. We bridge that gap.',
  keywords: ['about resilio tech', 'AI infrastructure', 'SRE team', 'production AI', 'MLOps consulting'],
  alternates: {
    canonical: 'https://resiliotech.com/about',
  },
  openGraph: {
    title: 'About Us — Resilio Tech',
    description: 'Built by SREs who\'ve operated systems at Fortune 500 scale. We make AI work in production.',
    images: ['/og-image.png'],
  },
  twitter: {
    title: 'About Us — Resilio Tech',
    description: 'Built by SREs who\'ve operated systems at Fortune 500 scale. We make AI work in production.',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutHero stats={companyStats} />
      <TeamSection />
      <ValuesSection values={companyValues} />
      <TimelineSection milestones={companyMilestones} />

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-text-primary mb-6">
            Let&apos;s Build Together
          </h2>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            We&apos;re building in public and sharing everything we learn.
            Check our Roadmap and Changelog, or book a call to discuss your AI infrastructure needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/resiliotech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary hover:bg-primary-hover text-background font-semibold rounded-lg transition-colors"
            >
              Book a Free AI Infra Audit
            </a>
            <a
              href="/roadmap"
              className="inline-flex items-center justify-center px-8 py-3 bg-surface-elevated hover:bg-surface border border-border hover:border-primary/30 text-text-primary rounded-lg transition-all"
            >
              View Roadmap
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}