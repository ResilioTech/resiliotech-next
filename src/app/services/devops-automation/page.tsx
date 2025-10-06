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
      title: 'Faster deployments',
      description: 'Pilot target: reduce deployment time from hours to minutes',
      metric: '(target)'
    },
    {
      title: 'Higher deployment success',
      description: 'Automated testing and validation to prevent failed deployments',
      metric: '(target)'
    },
    {
      title: 'Quick rollbacks',
      description: 'Pilot target: recover from issues rapidly',
      metric: '(target)'
    },
    {
      title: 'Developer productivity',
      description: 'Focus on features, not deployment complexity',
      metric: '(target)'
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

  caseStudies: [],

  technologies: [
    'Jenkins', 'GitHub Actions', 'GitLab CI', 'CircleCI', 'Azure DevOps',
    'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Helm',
    'Jest', 'Cypress', 'Selenium', 'SonarQube', 'OWASP ZAP',
    'AWS CodePipeline', 'GCP Cloud Build', 'Azure Pipelines',
    'Prometheus', 'Grafana', 'Datadog', 'New Relic'
  ],

  pricing: {
    startingPrice: 'Founding Pilot',
    model: '3 slots/month at pilot rates',
    description: 'We're running Founding Pilot engagements (3 slots/month) to refine our CI/CD services. Join the waitlist to get pilot rates and shape how we build DevOps automation solutions.'
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
      answer: 'All our CI/CD implementations include automated rollback mechanisms and comprehensive monitoring. We provide ongoing support to address any issues quickly. Join our Founding Pilot to explore CI/CD automation with pilot rates and support.'
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