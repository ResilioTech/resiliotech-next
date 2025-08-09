import { ProductInfo, ProductTimeline } from '@/types/products';

export const microSaasProducts: ProductInfo[] = [
  {
    name: 'DeployFlow',
    tagline: 'Simplified CI/CD for Startups',
    description: 'Zero-config CI/CD pipelines that automatically detect your stack and deploy to production in minutes. Perfect for teams who want to focus on building, not managing infrastructure.',
    launchDate: null,
    status: 'launched',
    category: 'deployment',
    features: [
      {
        id: '1',
        title: 'Auto-Detect Stack',
        description: 'Automatically identifies your tech stack and creates optimized pipelines',
        icon: 'GitBranch',
        priority: 'high'
      },
      {
        id: '2',
        title: 'One-Click Deployments',
        description: 'Deploy to AWS, Vercel, or Netlify with a single click',
        icon: 'Zap',
        priority: 'high'
      },
      {
        id: '3',
        title: 'Smart Rollbacks',
        description: 'Automatic rollback when deployment issues are detected',
        icon: 'Shield',
        priority: 'medium'
      }
    ],
    benefits: [
      'Deploy in under 5 minutes',
      'Zero configuration required',
      'Automatic rollbacks on failure'
    ],
    targetAudience: ['Startups', 'Solo developers', 'Small teams'],
    pricing: {
      isRevealed: true,
      startingPrice: 29,
      pricingModel: 'per project/month'
    }
  },
  {
    name: 'CloudWatch Pro',
    tagline: 'AI-Powered Infrastructure Monitoring',
    description: 'Intelligent monitoring that predicts and prevents downtime before it happens. Get insights into your infrastructure health with automated alerts and resolution suggestions.',
    launchDate: null,
    status: 'waitlist',
    category: 'monitoring',
    features: [
      {
        id: '1',
        title: 'Predictive Alerts',
        description: 'AI predicts issues 30 minutes before they occur',
        icon: 'Activity',
        priority: 'high'
      },
      {
        id: '2',
        title: 'Auto-Healing',
        description: 'Automatically fixes common infrastructure problems',
        icon: 'Zap',
        priority: 'high'
      },
      {
        id: '3',
        title: 'Cost Optimization',
        description: 'Real-time recommendations to reduce cloud spend',
        icon: 'DollarSign',
        priority: 'medium'
      }
    ],
    benefits: [
      'Prevent 95% of downtime',
      'Reduce monitoring overhead',
      'Save 40% on cloud costs'
    ],
    targetAudience: ['DevOps teams', 'SRE engineers', 'CTOs'],
    pricing: {
      isRevealed: true,
      startingPrice: 49,
      pricingModel: 'per server/month'
    }
  },
  {
    name: 'SecureOps',
    tagline: 'DevSecOps Made Simple',
    description: 'Integrate security scanning and compliance checks directly into your CI/CD pipeline. Catch vulnerabilities early and maintain compliance automatically.',
    launchDate: null,
    status: 'waitlist',
    category: 'security',
    features: [
      {
        id: '1',
        title: 'Vulnerability Scanning',
        description: 'Scan code, dependencies, and containers for security issues',
        icon: 'Shield',
        priority: 'high'
      },
      {
        id: '2',
        title: 'Compliance Dashboard',
        description: 'Track SOC2, GDPR, and other compliance requirements',
        icon: 'CheckCircle',
        priority: 'high'
      },
      {
        id: '3',
        title: 'Secret Management',
        description: 'Secure storage and rotation of API keys and secrets',
        icon: 'Key',
        priority: 'medium'
      }
    ],
    benefits: [
      'Catch security issues before production',
      'Automated compliance reporting',
      'Zero-trust secret management'
    ],
    targetAudience: ['Security teams', 'Compliance officers', 'Enterprise developers'],
    pricing: {
      isRevealed: true,
      startingPrice: 79,
      pricingModel: 'per developer/month'
    }
  },
  {
    name: 'InfraScale',
    tagline: 'Smart Infrastructure Scaling',
    description: 'Automatically scale your infrastructure based on real usage patterns and predictions. Never overpay for unused resources or experience performance bottlenecks.',
    launchDate: null,
    status: 'waitlist',
    category: 'infrastructure',
    features: [
      {
        id: '1',
        title: 'Predictive Scaling',
        description: 'Scale resources before traffic spikes occur',
        icon: 'TrendingUp',
        priority: 'high'
      },
      {
        id: '2',
        title: 'Multi-Cloud Support',
        description: 'Manage scaling across AWS, GCP, and Azure',
        icon: 'Cloud',
        priority: 'high'
      },
      {
        id: '3',
        title: 'Cost Analytics',
        description: 'Detailed breakdown of infrastructure costs and optimization opportunities',
        icon: 'BarChart',
        priority: 'medium'
      }
    ],
    benefits: [
      'Reduce infrastructure costs by 50%',
      'Handle traffic spikes automatically',
      'Unified multi-cloud management'
    ],
    targetAudience: ['Platform engineers', 'DevOps teams', 'Growing startups'],
    pricing: {
      isRevealed: false,
      startingPrice: 99,
      pricingModel: 'per cluster/month'
    }
  }
];

export const featuredProduct = microSaasProducts[0]; // DeployFlow as the featured product

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