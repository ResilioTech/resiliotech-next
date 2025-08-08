import type { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { TeamSection } from '@/components/about/TeamSection';
import { ValuesSection } from '@/components/about/ValuesSection';
import { TimelineSection } from '@/components/about/TimelineSection';
import { teamMembers, companyValues, companyMilestones, companyStats } from '@/data/company';

export const metadata: Metadata = {
  title: 'About Us - Meet the Resiliotech Team',
  description: 'Learn about Resiliotech\'s mission to democratize enterprise-grade DevOps for growing companies. Meet our team of experts from Google, Netflix, and Stripe.',
  keywords: ['about resiliotech', 'devops team', 'company story', 'tech leadership', 'startup infrastructure'],
  openGraph: {
    title: 'About Us - Meet the Resiliotech Team',
    description: 'Learn about our mission to democratize enterprise-grade DevOps for growing companies. Meet our team of experts from leading tech companies.',
    images: ['/og-images/about-team.png'],
  },
  twitter: {
    title: 'About Us - Meet the Resiliotech Team',
    description: 'Learn about our mission to democratize enterprise-grade DevOps for growing companies. Meet our team of experts from leading tech companies.',
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
            Ready to Work with Us?
          </h2>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Whether you're looking to transform your infrastructure, need expert consulting, 
            or want to join our team, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-colors"
            >
              Get In Touch
            </a>
            <a
              href="/projects"
              className="inline-flex items-center justify-center px-8 py-3 bg-surface-elevated hover:bg-surface border border-border hover:border-primary/30 text-text-primary rounded-lg transition-all"
            >
              View Our Work
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}