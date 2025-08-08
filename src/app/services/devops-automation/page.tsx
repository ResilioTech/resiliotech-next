import type { Metadata } from 'next';
import { ServicePageLayout, ServiceData } from '@/components/services/ServicePageLayout';

export const metadata: Metadata = {
  title: 'DevOps Automation Services - CI/CD & Deployment Pipelines | Resiliotech',
  description: 'Professional DevOps automation services including CI/CD pipelines, automated testing, and deployment strategies. Reduce deployment time from hours to minutes.',
  keywords: ['DevOps automation', 'CI/CD pipelines', 'automated testing', 'deployment automation', 'blue-green deployment', 'rollback strategies'],
  openGraph: {
    title: 'DevOps Automation Services - CI/CD & Deployment Pipelines',
    description: 'Transform your development workflow with professional DevOps automation. Reduce deployment time from hours to minutes.',
    images: ['/og-images/devops-automation.png'],
  },
};

const devopsAutomationService: ServiceData = {
  title: 'DevOps Automation',
  subtitle: 'Streamline Your Development Workflow',
  description: 'Transform your development process with end-to-end CI/CD pipelines, automated testing, and deployment strategies that reduce deployment time from hours to minutes while ensuring reliability and quality.',
  
  features: [
    {
      title: 'CI/CD Pipeline Setup',
      description: 'Custom continuous integration and deployment pipelines tailored to your tech stack and requirements.',
      icon: 'Zap'
    },
    {
      title: 'Automated Testing',
      description: 'Comprehensive test automation including unit, integration, and end-to-end testing strategies.',
      icon: 'CheckCircle'
    },
    {
      title: 'Blue-Green Deployments',
      description: 'Zero-downtime deployment strategies with instant rollback capabilities for maximum reliability.',
      icon: 'Shield'
    },
    {
      title: 'Infrastructure as Code',
      description: 'Version-controlled infrastructure management using Terraform, CloudFormation, or Pulumi.',
      icon: 'Target'
    },
    {
      title: 'Monitoring Integration',
      description: 'Built-in monitoring and alerting to catch issues before they impact your users.',
      icon: 'TrendingUp'
    },
    {
      title: 'Security Scanning',
      description: 'Automated security vulnerability scanning integrated into your CI/CD pipeline.',
      icon: 'Shield'
    }
  ],

  benefits: [
    {
      title: '10x faster deployments',
      description: 'Reduce deployment time from hours to minutes',
      metric: '90% time saved'
    },
    {
      title: '99.9% deployment success rate',
      description: 'Automated testing and validation prevents failed deployments',
      metric: '75% fewer incidents'
    },
    {
      title: 'Instant rollbacks',
      description: 'Recover from issues in under 5 minutes',
      metric: '<5min recovery'
    },
    {
      title: 'Developer productivity boost',
      description: 'Focus on features, not deployment complexity',
      metric: '40% more features'
    }
  ],

  process: [
    {
      step: 1,
      title: 'Current State Assessment',
      description: 'Analyze existing development and deployment processes to identify bottlenecks and opportunities.',
      duration: '3-5 days'
    },
    {
      step: 2,
      title: 'Pipeline Design & Architecture',
      description: 'Design custom CI/CD architecture based on your tech stack, team size, and deployment requirements.',
      duration: '1-2 weeks'
    },
    {
      step: 3,
      title: 'Implementation & Integration',
      description: 'Build and configure pipelines, set up automated testing, and integrate with existing systems.',
      duration: '2-4 weeks'
    },
    {
      step: 4,
      title: 'Testing & Optimization',
      description: 'Thoroughly test the pipeline, optimize performance, and train your team on the new processes.',
      duration: '1-2 weeks'
    }
  ],

  caseStudies: [
    {
      company: 'TechFlow (YC S23)',
      industry: 'SaaS Platform',
      challenge: 'Manual deployments taking 4+ hours with frequent rollbacks due to bugs reaching production.',
      solution: 'Implemented comprehensive CI/CD pipeline with automated testing, staging environments, and blue-green deployments.',
      results: [
        'Deployment time reduced from 4 hours to 8 minutes',
        'Zero failed deployments in production since implementation',
        'Developer productivity increased by 45%',
        'Time to market improved by 60%'
      ]
    },
    {
      company: 'DataVault (Series A)',
      industry: 'Data Analytics',
      challenge: 'Complex microservices architecture with inconsistent deployment processes across teams.',
      solution: 'Standardized CI/CD across all services with automated testing, dependency management, and coordinated deployments.',
      results: [
        'Unified deployment process across 15+ microservices',
        'Reduced deployment complexity by 80%',
        'Eliminated inter-service deployment conflicts',
        'Improved team collaboration and knowledge sharing'
      ]
    }
  ],

  technologies: [
    'Jenkins', 'GitHub Actions', 'GitLab CI', 'CircleCI', 'Azure DevOps',
    'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Helm',
    'Jest', 'Cypress', 'Selenium', 'SonarQube', 'OWASP ZAP',
    'AWS CodePipeline', 'GCP Cloud Build', 'Azure Pipelines',
    'Prometheus', 'Grafana', 'Datadog', 'New Relic'
  ],

  pricing: {
    startingPrice: '$2,500',
    model: 'Fixed project pricing',
    description: 'Pricing varies based on complexity, number of services, and requirements. Includes 3 months of support and optimization.'
  },

  faq: [
    {
      question: 'How long does it take to implement CI/CD pipelines?',
      answer: 'Typical implementation takes 4-8 weeks depending on the complexity of your current setup and requirements. Simple single-service applications can be completed in 2-3 weeks, while complex microservices architectures may take 6-10 weeks.'
    },
    {
      question: 'Do you work with existing CI/CD tools or only specific ones?',
      answer: 'We work with your preferred tools and platforms. Whether you\'re using GitHub Actions, Jenkins, GitLab CI, or any other CI/CD platform, we can design solutions that integrate seamlessly with your existing workflow.'
    },
    {
      question: 'What if our deployment fails after implementation?',
      answer: 'All our CI/CD implementations include automated rollback mechanisms and comprehensive monitoring. We also provide 3 months of support to address any issues. Our track record shows 99.9% successful deployments after implementation.'
    },
    {
      question: 'Can you help with both cloud and on-premises deployments?',
      answer: 'Yes, we have extensive experience with AWS, GCP, Azure, as well as on-premises and hybrid environments. Our solutions are designed to work across different infrastructure types.'
    },
    {
      question: 'Do you provide training for our development team?',
      answer: 'Absolutely. Training and knowledge transfer are included in every engagement. We provide documentation, hands-on training sessions, and ongoing support to ensure your team can maintain and extend the solutions.'
    }
  ]
};

export default function DevOpsAutomationPage() {
  return <ServicePageLayout service={devopsAutomationService} category="devops-automation" />;
}