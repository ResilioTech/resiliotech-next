import type { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { TeamSection } from '@/components/about/TeamSection';
import { ValuesSection } from '@/components/about/ValuesSection';
import { TimelineSection } from '@/components/about/TimelineSection';
import { teamMembers, companyValues, companyMilestones, companyStats } from '@/data/company';

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