export interface Technology {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'other';
  icon?: string;
  proficiency: 'expert' | 'advanced' | 'intermediate';
}

export interface ProjectMetrics {
  duration: string;
  teamSize: number;
  linesOfCode?: number;
  performanceImprovement?: string;
  userGrowth?: string;
  costSavings?: string;
}

export interface ProjectTestimonial {
  author: {
    name: string;
    role: string;
    company: string;
    avatar?: string;
  };
  content: string;
  rating?: number;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  category: 'web' | 'mobile' | 'api' | 'devops' | 'other';
  industry: string;
  client: {
    name: string;
    type: 'startup' | 'enterprise' | 'agency' | 'nonprofit' | 'personal';
    size?: string;
  };
  challenge: string;
  solution: string;
  results: string[];
  technologies: Technology[];
  features: string[];
  images: {
    thumbnail: string;
    gallery: string[];
    hero?: string;
  };
  links: {
    live?: string;
    github?: string;
    demo?: string;
  };
  metrics: ProjectMetrics;
  testimonial?: ProjectTestimonial;
  status: 'completed' | 'ongoing' | 'maintenance';
  featured: boolean;
  publishedAt: string;
  completedAt?: string;
}

export interface ProjectFilter {
  category?: string;
  technology?: string;
  industry?: string;
  status?: string;
}