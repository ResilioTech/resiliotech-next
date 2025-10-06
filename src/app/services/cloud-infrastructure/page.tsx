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
      description: 'Continuous monitoring and optimization to reduce cloud costs without sacrificing performance.',
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
      title: 'Cost optimization',
      description: 'Pilot target: right-size resources and eliminate waste',
      metric: '(target)'
    },
    {
      title: 'High availability',
      description: 'Design for reliability and fault tolerance',
      metric: '(target)'
    },
    {
      title: 'Enhanced security',
      description: 'Implement security best practices and compliance',
      metric: '(target)'
    },
    {
      title: 'Faster scaling',
      description: 'Auto-scaling to handle traffic spikes',
      metric: '(target)'
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

  caseStudies: [],

  technologies: [
    'AWS', 'Google Cloud Platform', 'Microsoft Azure', 'DigitalOcean',
    'Terraform', 'CloudFormation', 'Pulumi', 'Ansible',
    'Kubernetes', 'Docker', 'ECS', 'GKE', 'AKS',
    'CloudFront', 'CloudFlare', 'Route53', 'Load Balancers',
    'RDS', 'DynamoDB', 'MongoDB Atlas', 'Redis',
    'VPC', 'IAM', 'Security Groups', 'WAF', 'GuardDuty'
  ],

  pricing: {
    startingPrice: 'Founding Pilot',
    model: '3 slots/month at pilot rates',
    description: 'We're running Founding Pilot engagements (3 slots/month) to refine our services. Join the waitlist to get pilot rates and shape how we build cloud infrastructure solutions.'
  },

  faq: [
    {
      question: 'Which cloud provider do you recommend?',
      answer: 'The choice depends on your specific requirements, existing tech stack, and business needs. AWS offers the most comprehensive services, GCP excels in data analytics and ML, while Azure integrates well with Microsoft ecosystems. We help you choose the best fit and can design multi-cloud strategies to avoid vendor lock-in.'
    },
    {
      question: 'How much can I save by optimizing my cloud infrastructure?',
      answer: 'Savings vary by workload and current setup. Common optimization strategies include proper resource sizing, reserved instances, spot instances, and automated scaling. We provide detailed cost analysis and ongoing optimization recommendations. Join our Founding Pilot to explore cost optimization for your infrastructure.'
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