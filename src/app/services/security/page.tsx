import type { Metadata } from 'next';
import { ServicePageLayout, ServiceData } from '@/components/services/ServicePageLayout';

export const metadata: Metadata = {
  title: 'DevSecOps & Security Services - Compliance & Vulnerability Management | Resiliotech',
  description: 'Professional DevSecOps services including security scanning, compliance automation, access control, and vulnerability management. Integrate security into your development lifecycle.',
  keywords: ['DevSecOps', 'security automation', 'compliance', 'vulnerability management', 'security scanning', 'SOC2', 'HIPAA', 'access control'],
  openGraph: {
    title: 'DevSecOps & Security Services - Compliance & Vulnerability Management',
    description: 'Integrate security into your development lifecycle with automated security scanning and compliance monitoring.',
    images: ['/og-images/security-compliance.png'],
  },
};

const securityService: ServiceData = {
  title: 'Security & Compliance',
  subtitle: 'DevSecOps Integration Made Simple',
  description: 'Integrate security seamlessly into your development lifecycle with automated security scanning, compliance monitoring, and vulnerability management. Build secure applications from the ground up while maintaining development velocity.',
  
  features: [
    {
      title: 'Automated Security Scanning',
      description: 'Comprehensive vulnerability scanning for code, dependencies, containers, and infrastructure integrated into CI/CD pipelines.',
      icon: 'Shield'
    },
    {
      title: 'Compliance Automation',
      description: 'Automated compliance monitoring and reporting for SOC2, HIPAA, PCI-DSS, GDPR, and other regulatory frameworks.',
      icon: 'CheckCircle'
    },
    {
      title: 'Identity & Access Management',
      description: 'Zero-trust security model with role-based access control, multi-factor authentication, and privilege management.',
      icon: 'Target'
    },
    {
      title: 'Security Monitoring & Response',
      description: 'Security monitoring with automated threat detection, incident response, and forensic capabilities.',
      icon: 'Award'
    },
    {
      title: 'Secrets Management',
      description: 'Centralized secrets management with automatic rotation, secure storage, and audit trails.',
      icon: 'Zap'
    },
    {
      title: 'Security Training & Culture',
      description: 'Security awareness training and establishing a security-first culture within development teams.',
      icon: 'Star'
    }
  ],

  benefits: [
    {
      title: 'Faster compliance certification',
      description: 'Automated compliance monitoring and evidence collection',
      metric: '(target)'
    },
    {
      title: 'Reduced security vulnerabilities',
      description: 'Early detection and prevention of security issues',
      metric: '(target)'
    },
    {
      title: 'Improved security posture',
      description: 'Continuous security monitoring and improvement',
      metric: '(target)'
    },
    {
      title: 'Enhanced developer productivity',
      description: 'Security integrated into workflow without friction',
      metric: '(target)'
    }
  ],

  process: [
    {
      step: 1,
      title: 'Security Assessment',
      description: 'Comprehensive security audit of current systems, processes, and compliance requirements.',
      duration: '1-2 weeks'
    },
    {
      step: 2,
      title: 'Security Strategy Design',
      description: 'Design security architecture, compliance roadmap, and DevSecOps integration strategy.',
      duration: '2-3 weeks'
    },
    {
      step: 3,
      title: 'Implementation & Integration',
      description: 'Deploy security tools, configure scanning, implement access controls, and integrate with development workflows.',
      duration: '4-8 weeks'
    },
    {
      step: 4,
      title: 'Monitoring & Optimization',
      description: 'Continuous monitoring setup, team training, compliance validation, and ongoing optimization.',
      duration: '2-4 weeks'
    }
  ],

  caseStudies: [],

  technologies: [
    'OWASP ZAP', 'SonarQube', 'Checkmarx', 'Veracode', 'Snyk',
    'HashiCorp Vault', 'AWS Secrets Manager', 'Azure Key Vault',
    'Okta', 'Auth0', 'AWS IAM', 'Azure AD', 'LDAP',
    'Splunk', 'Elasticsearch', 'Sumo Logic', 'DataDog Security',
    'Qualys', 'Nessus', 'OpenVAS', 'Rapid7', 'CrowdStrike',
    'Docker Security', 'Kubernetes Security', 'Falco', 'Twistlock',
    'Terraform', 'CloudFormation', 'AWS Config', 'Azure Policy'
  ],

  pricing: {
    startingPrice: 'Founding Pilot',
    model: '3 slots/month at pilot rates',
    description: 'We\'re running Founding Pilot engagements (3 slots/month) to refine our security services. Join the waitlist to get pilot rates and shape how we build DevSecOps solutions.'
  },

  faq: [
    {
      question: 'How long does it take to achieve SOC2 compliance?',
      answer: 'With our automated compliance approach, companies typically achieve SOC2 Type I in a few months and Type II within the first year. The timeline depends on your current security posture and the scope of systems being certified. Join our Founding Pilot program to get hands-on support through your compliance journey at exclusive rates.'
    },
    {
      question: 'Will security scanning slow down our development process?',
      answer: 'Our approach integrates security scanning seamlessly into your existing CI/CD pipelines with minimal impact on development velocity. We focus on providing actionable feedback and automating remediation where possible. Our Founding Pilot program includes hands-on optimization to ensure security doesn\'t become a bottleneck.'
    },
    {
      question: 'Do you provide ongoing security monitoring?',
      answer: 'Yes, we offer security monitoring services with automated threat detection, incident response, and regular security assessments. We can also train your internal team to manage security operations. Join our Founding Pilot program to help us refine our monitoring approach at exclusive pilot rates.'
    },
    {
      question: 'What compliance frameworks do you support?',
      answer: 'We support major compliance frameworks including SOC2, HIPAA, PCI-DSS, GDPR, ISO 27001, FedRAMP, and industry-specific regulations. We can also help with custom compliance requirements. Join our Founding Pilot program to get dedicated support for your specific compliance needs at pilot rates.'
    },
    {
      question: 'How do you handle security in cloud environments?',
      answer: 'We implement cloud-native security controls including identity and access management, network security, encryption, and compliance monitoring specifically designed for AWS, GCP, and Azure environments. Our Founding Pilot program offers hands-on implementation support to help secure your cloud infrastructure at exclusive rates.'
    }
  ]
};

export default function SecurityPage() {
  return <ServicePageLayout service={securityService} category="security" />;
}