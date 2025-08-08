import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectDetails } from '@/components/projects/ProjectDetails';
import { sampleProjects } from '@/data/sample-projects';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return sampleProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = sampleProjects.find((p) => p.slug === params.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} - Project Case Study`,
    description: project.description,
    keywords: [
      project.title,
      project.category,
      project.industry,
      ...project.technologies.map(t => t.name),
      'case study',
      'project portfolio'
    ],
    openGraph: {
      title: `${project.title} - Project Case Study`,
      description: project.description,
      images: project.images.hero ? [project.images.hero] : ['/og-images/project-default.png'],
      type: 'article',
      publishedTime: project.publishedAt,
    },
    twitter: {
      title: `${project.title} - Project Case Study`,
      description: project.description,
      images: project.images.hero ? [project.images.hero] : ['/og-images/project-default.png'],
    },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = sampleProjects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  // Add JSON-LD structured data for better SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    author: {
      '@type': 'Organization',
      name: 'Resiliotech',
    },
    datePublished: project.publishedAt,
    dateModified: project.completedAt || project.publishedAt,
    keywords: project.technologies.map(t => t.name).join(', '),
    genre: project.category,
    about: {
      '@type': 'Thing',
      name: project.industry,
    },
    client: {
      '@type': 'Organization',
      name: project.client.name,
    },
    workExample: project.links.live ? {
      '@type': 'WebSite',
      url: project.links.live,
    } : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetails project={project} />
    </>
  );
}