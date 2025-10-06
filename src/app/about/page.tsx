import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { teamMembers, companyValues, companyMilestones, companyStats } from '@/data/company';

// Above-the-fold with SSR
const AboutHero = dynamic(() => import('@/components/about/AboutHero').then(mod => ({ default: mod.AboutHero })), {
  ssr: true,
  loading: () => <div className="h-screen bg-gradient-to-br from-background via-surface to-surface-elevated"></div>
});

// Below-the-fold: Lazy load to reduce initial JS bundle
const TeamSection = dynamic(() => import('@/components/about/TeamSection').then(mod => ({ default: mod.TeamSection })), {
  ssr: false,
  loading: () => <div className="py-24 bg-surface animate-pulse"><div className="max-w-7xl mx-auto px-6"><div className="h-96 bg-background rounded-xl"></div></div></div>
});

const ValuesSection = dynamic(() => import('@/components/about/ValuesSection').then(mod => ({ default: mod.ValuesSection })), {
  ssr: false,
  loading: () => <div className="py-24 bg-background animate-pulse"><div className="max-w-7xl mx-auto px-6"><div className="h-80 bg-surface rounded-xl"></div></div></div>
});

const TimelineSection = dynamic(() => import('@/components/about/TimelineSection').then(mod => ({ default: mod.TimelineSection })), {
  ssr: false,
  loading: () => <div className="py-24 bg-surface animate-pulse"><div className="max-w-6xl mx-auto px-6"><div className="h-96 bg-background rounded-xl"></div></div></div>
});

export const metadata: Metadata = {
  title: 'About Us - Building DevOps Tools for Startups',
  description: 'Building platform-grade DevOps tools for startups. Currently in Private Alpha with DeployFlow. Join our Founding Pilot program.',
  keywords: ['about resiliotech', 'devops startup', 'building in public', 'founding pilot', 'deployflow'],
  openGraph: {
    title: 'About Us - Building DevOps Tools for Startups',
    description: 'Building platform-grade DevOps tools for startups. Currently in Private Alpha with DeployFlow.',
    images: ['/og-images/about-team.png'],
  },
  twitter: {
    title: 'About Us - Building DevOps Tools for Startups',
    description: 'Building platform-grade DevOps tools for startups. Currently in Private Alpha with DeployFlow.',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <AboutHero stats={companyStats} />

      {/* Team Section */}
      <TeamSection teamMembers={teamMembers} />

      {/* Values Section */}
      <ValuesSection values={companyValues} />

      {/* Timeline Section */}
      <TimelineSection milestones={companyMilestones} />

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-text-primary mb-6">
            Build With Us
          </h2>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Join our Founding Pilot program (3 slots/month) or get early access to DeployFlow.
            We're building in public - see our Roadmap and Changelog.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/founding-pilot"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-colors"
            >
              Join Founding Pilot
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