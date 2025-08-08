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
      description: '24/7 security monitoring with automated threat detection, incident response, and forensic capabilities.',
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
      metric: '60% faster SOC2'
    },
    {
      title: 'Reduced security vulnerabilities',
      description: 'Early detection and prevention of security issues',
      metric: '85% fewer vulnerabilities'
    },
    {
      title: 'Improved security posture',
      description: 'Continuous security monitoring and improvement',
      metric: '99.9% threat detection'
    },
    {
      title: 'Enhanced developer productivity',
      description: 'Security integrated into workflow without friction',
      metric: '40% faster development'
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

  caseStudies: [
    {
      company: 'HealthTech Startup (Series A)',
      industry: 'Healthcare Technology',
      challenge: 'Needed to achieve HIPAA compliance for their patient data platform while maintaining rapid development cycles.',
      solution: 'Implemented comprehensive DevSecOps pipeline with automated security scanning, HIPAA compliance monitoring, and secure development practices.',
      results: [
        'Achieved HIPAA compliance certification in 4 months',
        'Integrated security scanning that catches 95% of vulnerabilities pre-production',
        'Reduced compliance audit preparation time by 75%',
        'Zero security incidents since implementation'
      ]
    },
    {
      company: 'FinTech Platform (Series B)',
      industry: 'Financial Services',
      challenge: 'Complex regulatory requirements (SOC2, PCI-DSS) with multiple third-party integrations and sensitive financial data processing.',
      solution: 'Built comprehensive security framework with automated compliance monitoring, secure API gateway, and continuous security testing.',
      results: [
        'Achieved SOC2 Type II and PCI-DSS Level 1 certification',
        'Implemented zero-trust architecture with 99.9% uptime',
        'Automated 80% of compliance evidence collection',
        'Reduced security assessment time from 6 months to 2 months'
      ]
    }
  ],

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
    startingPrice: '$3,000',
    model: 'Compliance-focused pricing',
    description: 'Pricing varies based on compliance requirements, system complexity, and ongoing monitoring needs. Includes initial assessment and 6 months of support.'
  },

  faq: [
    {
      question: 'How long does it take to achieve SOC2 compliance?',
      answer: 'With our automated compliance approach, most companies can achieve SOC2 Type I in 2-3 months and Type II in 6-9 months. The timeline depends on your current security posture and the scope of systems being certified.'
    },
    {
      question: 'Will security scanning slow down our development process?',
      answer: 'Our approach integrates security scanning seamlessly into your existing CI/CD pipelines with minimal impact on development velocity. We focus on providing actionable feedback and automating remediation where possible.'
    },
    {
      question: 'Do you provide ongoing security monitoring?',
      answer: 'Yes, we offer 24/7 security monitoring services with automated threat detection, incident response, and regular security assessments. We can also train your internal team to manage security operations.'
    },
    {
      question: 'What compliance frameworks do you support?',
      answer: 'We support major compliance frameworks including SOC2, HIPAA, PCI-DSS, GDPR, ISO 27001, FedRAMP, and industry-specific regulations. We can also help with custom compliance requirements.'
    },
    {
      question: 'How do you handle security in cloud environments?',
      answer: 'We implement cloud-native security controls including identity and access management, network security, encryption, and compliance monitoring specifically designed for AWS, GCP, and Azure environments.'
    }
  ]
};

export default function SecurityPage() {
  return <ServicePageLayout service={securityService} category="security" />;
}