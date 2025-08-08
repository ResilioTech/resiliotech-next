import type { Metadata } from 'next';
import { ServicePageLayout, ServiceData } from '@/components/services/ServicePageLayout';

export const metadata: Metadata = {
  title: 'Cloud Infrastructure Services - AWS, GCP, Azure Solutions | Resiliotech',
  description: 'Professional cloud infrastructure services including architecture design, migration, and optimization for AWS, GCP, and Azure. Scalable, secure, and cost-optimized solutions.',
  keywords: ['cloud infrastructure', 'AWS', 'GCP', 'Azure', 'cloud migration', 'infrastructure as code', 'cloud architecture', 'cost optimization'],
  openGraph: {
    title: 'Cloud Infrastructure Services - AWS, GCP, Azure Solutions',
    description: 'Scalable, secure, and cost-optimized cloud infrastructure using Infrastructure-as-Code principles.',
    images: ['/og-images/cloud-infrastructure.png'],
  },
};

const cloudInfrastructureService: ServiceData = {
  title: 'Cloud Infrastructure',
  subtitle: 'Scalable, Secure, and Cost-Optimized Architecture',
  description: 'Build robust cloud infrastructure that scales with your business. We design and implement secure, cost-optimized cloud architecture using Infrastructure-as-Code principles across AWS, GCP, and Azure.',
  
  features: [
    {
      title: 'Cloud Architecture Design',
      description: 'Custom cloud architecture tailored to your performance, security, and compliance requirements.',
      icon: 'Target'
    },
    {
      title: 'Infrastructure as Code',
      description: 'Version-controlled, reproducible infrastructure using Terraform, CloudFormation, or Pulumi.',
      icon: 'Zap'
    },
    {
      title: 'Auto-scaling Configuration',
      description: 'Dynamic scaling policies that handle traffic spikes while optimizing costs during low usage.',
      icon: 'TrendingUp'
    },
    {
      title: 'Multi-Cloud Strategy',
      description: 'Avoid vendor lock-in with multi-cloud and hybrid cloud architectures designed for flexibility.',
      icon: 'Shield'
    },
    {
      title: 'Cost Optimization',
      description: 'Continuous monitoring and optimization to reduce cloud costs by 30-60% without sacrificing performance.',
      icon: 'Award'
    },
    {
      title: 'Security & Compliance',
      description: 'Built-in security best practices and compliance frameworks (SOC2, HIPAA, PCI-DSS).',
      icon: 'Shield'
    }
  ],

  benefits: [
    {
      title: 'Reduced infrastructure costs',
      description: 'Optimize resource usage and eliminate waste',
      metric: '30-60% savings'
    },
    {
      title: 'Improved scalability',
      description: 'Handle traffic spikes automatically',
      metric: '10x capacity growth'
    },
    {
      title: 'Enhanced security',
      description: 'Enterprise-grade security from day one',
      metric: '99.9% uptime SLA'
    },
    {
      title: 'Faster time to market',
      description: 'Deploy new environments in minutes',
      metric: '80% faster deployment'
    }
  ],

  process: [
    {
      step: 1,
      title: 'Infrastructure Assessment',
      description: 'Analyze current infrastructure, identify bottlenecks, and assess cloud readiness.',
      duration: '1-2 weeks'
    },
    {
      step: 2,
      title: 'Architecture Design',
      description: 'Design scalable, secure cloud architecture with detailed diagrams and implementation plan.',
      duration: '2-3 weeks'
    },
    {
      step: 3,
      title: 'Implementation & Migration',
      description: 'Build infrastructure using IaC, migrate workloads, and configure monitoring and security.',
      duration: '4-8 weeks'
    },
    {
      step: 4,
      title: 'Optimization & Handover',
      description: 'Performance tuning, cost optimization, team training, and ongoing support setup.',
      duration: '1-2 weeks'
    }
  ],

  caseStudies: [
    {
      company: 'FinTech Startup (Seed)',
      industry: 'Financial Services',
      challenge: 'Needed SOC2 compliant infrastructure for their financial platform with strict security and compliance requirements.',
      solution: 'Designed and implemented SOC2-compliant AWS infrastructure with automated compliance monitoring and security controls.',
      results: [
        'Achieved SOC2 Type II certification in 3 months',
        'Reduced infrastructure costs by 45% through optimization',
        'Implemented automated backup and disaster recovery',
        'Zero security incidents since implementation'
      ]
    },
    {
      company: 'E-commerce Platform (Series B)',
      industry: 'Retail Technology',
      challenge: 'Struggling with traffic spikes during sales events, leading to downtime and lost revenue.',
      solution: 'Implemented auto-scaling architecture with CDN, load balancing, and database optimization across multiple regions.',
      results: [
        'Handled 10x traffic increase during Black Friday with zero downtime',
        'Reduced page load times by 60% globally',
        'Decreased infrastructure costs by 35% through right-sizing',
        'Improved customer satisfaction scores by 40%'
      ]
    }
  ],

  technologies: [
    'AWS', 'Google Cloud Platform', 'Microsoft Azure', 'DigitalOcean',
    'Terraform', 'CloudFormation', 'Pulumi', 'Ansible',
    'Kubernetes', 'Docker', 'ECS', 'GKE', 'AKS',
    'CloudFront', 'CloudFlare', 'Route53', 'Load Balancers',
    'RDS', 'DynamoDB', 'MongoDB Atlas', 'Redis',
    'VPC', 'IAM', 'Security Groups', 'WAF', 'GuardDuty'
  ],

  pricing: {
    startingPrice: '$3,500',
    model: 'Project-based pricing',
    description: 'Pricing depends on infrastructure complexity and cloud provider. Includes architecture design, implementation, and 3 months of optimization support.'
  },

  faq: [
    {
      question: 'Which cloud provider do you recommend?',
      answer: 'The choice depends on your specific requirements, existing tech stack, and business needs. AWS offers the most comprehensive services, GCP excels in data analytics and ML, while Azure integrates well with Microsoft ecosystems. We help you choose the best fit and can design multi-cloud strategies to avoid vendor lock-in.'
    },
    {
      question: 'How much can I save by optimizing my cloud infrastructure?',
      answer: 'Most companies can save 30-60% on their cloud costs through proper resource sizing, reserved instances, spot instances, and automated scaling. We provide detailed cost analysis and ongoing optimization recommendations.'
    },
    {
      question: 'Do you help with cloud migration from on-premises?',
      answer: 'Yes, we specialize in cloud migration strategies including lift-and-shift, re-platforming, and cloud-native rebuilds. We create detailed migration plans that minimize downtime and risk while maximizing the benefits of cloud adoption.'
    },
    {
      question: 'What about compliance requirements like SOC2 or HIPAA?',
      answer: 'We have extensive experience implementing compliant cloud infrastructure for various standards including SOC2, HIPAA, PCI-DSS, and GDPR. Our solutions include automated compliance monitoring and audit trails.'
    },
    {
      question: 'Can you help with disaster recovery planning?',
      answer: 'Absolutely. Disaster recovery and business continuity planning are core components of our cloud infrastructure designs. We implement automated backup strategies, multi-region deployments, and tested recovery procedures.'
    }
  ]
};

export default function CloudInfrastructurePage() {
  return <ServicePageLayout service={cloudInfrastructureService} category="cloud-infrastructure" />;
}