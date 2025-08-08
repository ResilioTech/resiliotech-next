import { ProductInfo, ProductTimeline } from '@/types/products';

export const productData: ProductInfo = {
  name: 'ResilioPlatform',
  tagline: 'The Future of DevOps Automation',
  description: 'A comprehensive platform that automates your entire DevOps lifecycle, from code commit to production deployment, with built-in monitoring and self-healing capabilities.',
  launchDate: '2024-12-15',
  features: [
    {
      id: '1',
      title: 'Automated CI/CD Pipelines',
      description: 'Set up production-ready pipelines in minutes, not days. Our intelligent automation detects your stack and configures optimal deployment workflows.',
      icon: 'GitBranch',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Infrastructure as Code',
      description: 'Declarative infrastructure management with automatic provisioning, scaling, and cost optimization across all major cloud providers.',
      icon: 'Cloud',
      priority: 'high'
    },
    {
      id: '3',
      title: 'Intelligent Monitoring',
      description: 'AI-powered observability that predicts issues before they impact users, with automatic resolution for common problems.',
      icon: 'Activity',
      priority: 'high'
    },
    {
      id: '4',
      title: 'Zero-Downtime Deployments',
      description: 'Advanced deployment strategies including blue-green, canary, and rolling deployments with automatic rollback capabilities.',
      icon: 'Zap',
      priority: 'medium'
    },
    {
      id: '5',
      title: 'Security by Design',
      description: 'Built-in security scanning, compliance checks, and secret management integrated into every step of your pipeline.',
      icon: 'Shield',
      priority: 'medium'
    },
    {
      id: '6',
      title: 'Cost Intelligence',
      description: 'Real-time cost tracking and optimization recommendations to reduce cloud spend by up to 40%.',
      icon: 'DollarSign',
      priority: 'low'
    }
  ],
  benefits: [
    'Reduce deployment time from hours to minutes',
    'Eliminate infrastructure management overhead',
    'Achieve 99.9% uptime with automated monitoring',
    'Cut cloud costs by up to 40% with intelligent optimization',
    'Scale from startup to enterprise without platform changes'
  ],
  targetAudience: [
    'Fast-growing startups',
    'Development teams',
    'DevOps engineers',
    'CTOs and technical leaders'
  ],
  pricing: {
    isRevealed: false,
    startingPrice: 99,
    pricingModel: 'per developer/month'
  }
};

export const productTimeline: ProductTimeline[] = [
  {
    phase: 'alpha',
    title: 'Alpha Release',
    description: 'Core CI/CD and infrastructure automation features for early adopters',
    date: '2024-10-01',
    status: 'completed'
  },
  {
    phase: 'beta',
    title: 'Beta Release',
    description: 'Advanced monitoring and security features with expanded cloud provider support',
    date: '2024-11-15',
    status: 'current'
  },
  {
    phase: 'launch',
    title: 'Public Launch',
    description: 'Full platform release with enterprise features and 24/7 support',
    date: '2024-12-15',
    status: 'upcoming'
  },
  {
    phase: 'enterprise',
    title: 'Enterprise Edition',
    description: 'Advanced compliance, multi-tenancy, and custom integrations',
    date: '2025-02-01',
    status: 'upcoming'
  }
];