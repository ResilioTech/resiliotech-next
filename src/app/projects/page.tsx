import type { Metadata } from 'next';
import { ProjectHero } from '@/components/projects/ProjectHero';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { sampleProjects } from '@/data/sample-projects';

export const metadata: Metadata = {
  title: 'Sample Architectures (Internal Builds)',
  description: 'Internal reference architectures and technical demonstrations. We\'ll publish named case studies after our Founding Pilot engagements conclude.',
  keywords: ['sample architectures', 'reference designs', 'DevOps patterns', 'infrastructure templates'],
  openGraph: {
    title: 'Sample Architectures (Internal Builds) | Resiliotech',
    description: 'Internal reference architectures and technical demonstrations built to showcase our capabilities.',
    images: ['/og-images/projects-portfolio.png'],
  },
  twitter: {
    title: 'Sample Architectures (Internal Builds) | Resiliotech',
    description: 'Internal reference architectures and technical demonstrations built to showcase our capabilities.',
  },
};

export default function ProjectsPage() {
  // Calculate statistics from projects data
  const totalProjects = sampleProjects.length;
  const completedProjects = sampleProjects.filter(p => p.status === 'completed').length;
  
  // Get unique technologies
  const allTechnologies = new Set();
  sampleProjects.forEach(project => {
    project.technologies.forEach(tech => {
      allTechnologies.add(tech.name);
    });
  });
  const totalTechnologies = allTechnologies.size;
  
  // Calculate years of experience (based on oldest project)
  const oldestProject = sampleProjects.reduce((oldest, project) => {
    const projectDate = new Date(project.publishedAt);
    const oldestDate = new Date(oldest.publishedAt);
    return projectDate < oldestDate ? project : oldest;
  });
  const yearsExperience = new Date().getFullYear() - new Date(oldestProject.publishedAt).getFullYear() + 1;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ProjectHero
        totalProjects={totalProjects}
        totalTechnologies={totalTechnologies}
        yearsExperience={yearsExperience}
        completedProjects={completedProjects}
      />

      {/* Projects Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <ProjectGrid projects={sampleProjects} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-text-primary mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how we can help transform your ideas into powerful digital solutions that drive growth and innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-colors"
            >
              Start a Project
            </a>
            <a
              href="/blog"
              className="inline-flex items-center justify-center px-8 py-3 bg-surface-elevated hover:bg-surface border border-border hover:border-primary/30 text-text-primary rounded-lg transition-all"
            >
              Read Our Blog
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}