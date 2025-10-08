import { Project } from '@/types/projects';

export const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform Modernization',
    slug: 'ecommerce-platform-modernization',
    description: 'Sample architecture demonstrating microservices migration with high availability and performance optimization.',
    fullDescription: 'Reference architecture for migrating from a legacy PHP monolith to a modern microservices architecture using Node.js, React, and Kubernetes.',
    category: 'web',
    industry: 'E-commerce',
    client: {
      name: 'Sample Project',
      type: 'personal',
      size: 'Reference Architecture'
    },
    challenge: 'Demonstrating modern approaches to handling legacy monolithic architecture challenges: downtime prevention, performance optimization, and scaling patterns.',
    solution: 'Implemented microservices architecture with containerized deployment, auto-scaling capabilities, and comprehensive monitoring using modern DevOps practices.',
    results: [
      'What this demo shows: Microservices migration patterns from monolith',
      'Zero-downtime deployment strategies',
      'Auto-scaling configuration and load balancing',
      'Container orchestration with Kubernetes',
      'Performance monitoring and optimization approaches'
    ],
    technologies: [
      { name: 'React', category: 'frontend', proficiency: 'expert' },
      { name: 'Node.js', category: 'backend', proficiency: 'expert' },
      { name: 'TypeScript', category: 'frontend', proficiency: 'expert' },
      { name: 'Kubernetes', category: 'devops', proficiency: 'advanced' },
      { name: 'Docker', category: 'devops', proficiency: 'expert' },
      { name: 'PostgreSQL', category: 'database', proficiency: 'advanced' },
      { name: 'Redis', category: 'database', proficiency: 'advanced' },
      { name: 'AWS', category: 'devops', proficiency: 'expert' }
    ],
    features: [
      'Real-time inventory management',
      'Advanced product search and filtering',
      'Multi-vendor marketplace support',
      'Integrated payment processing',
      'Order tracking and notifications',
      'Admin dashboard and analytics'
    ],
    images: {
      thumbnail: '/project-images/ecommerce-thumb.jpg',
      gallery: ['/project-images/ecommerce-1.jpg', '/project-images/ecommerce-2.jpg'],
      hero: '/project-images/ecommerce-hero.jpg'
    },
    links: {
      live: 'https://demo.techmart.com',
      demo: 'https://demo.techmart.com/preview'
    },
    metrics: {
      duration: '6 months',
      teamSize: 4,
      linesOfCode: 125000,
      performanceImprovement: 'Demo architecture',
      userGrowth: 'Scalable design patterns',
      costSavings: 'Cost optimization strategies shown'
    },
    testimonial: undefined,
    status: 'completed',
    featured: true,
    publishedAt: '2024-08-15',
    completedAt: '2024-07-30'
  },
  {
    id: '2',
    title: 'AI-Powered Analytics Dashboard',
    slug: 'ai-analytics-dashboard',
    description: 'Reference architecture for analytics platform with real-time data processing and machine learning insights.',
    fullDescription: 'Sample analytics dashboard demonstrating how to process large data volumes in real-time, providing actionable insights through machine learning algorithms and intuitive visualizations.',
    category: 'web',
    industry: 'Data Analytics',
    client: {
      name: 'Internal Demo',
      type: 'personal',
      size: 'Reference Architecture'
    },
    challenge: 'Demonstrating solutions for data analysis challenges: real-time processing, ML integration, and unified dashboards from disparate data sources.',
    solution: 'Created a unified analytics platform with real-time data ingestion, automated ML pipelines, and interactive dashboards using modern data engineering practices.',
    results: [
      'What this demo shows: Real-time data pipeline architecture',
      'ML model integration patterns',
      'Interactive data visualization techniques',
      'Automated anomaly detection implementation',
      'Multi-source data aggregation strategies'
    ],
    technologies: [
      { name: 'React', category: 'frontend', proficiency: 'expert' },
      { name: 'D3.js', category: 'frontend', proficiency: 'advanced' },
      { name: 'Python', category: 'backend', proficiency: 'expert' },
      { name: 'FastAPI', category: 'backend', proficiency: 'advanced' },
      { name: 'Apache Kafka', category: 'backend', proficiency: 'advanced' },
      { name: 'ClickHouse', category: 'database', proficiency: 'advanced' },
      { name: 'TensorFlow', category: 'other', proficiency: 'intermediate' },
      { name: 'Apache Airflow', category: 'devops', proficiency: 'advanced' }
    ],
    features: [
      'Real-time data visualization',
      'Custom dashboard builder',
      'ML-powered predictions',
      'Automated reporting',
      'Multi-tenant architecture',
      'API integrations'
    ],
    images: {
      thumbnail: '/project-images/analytics-thumb.jpg',
      gallery: ['/project-images/analytics-1.jpg', '/project-images/analytics-2.jpg'],
      hero: '/project-images/analytics-hero.jpg'
    },
    links: {
      demo: 'https://demo.analytics.dataflow.com'
    },
    metrics: {
      duration: '8 months',
      teamSize: 6,
      linesOfCode: 180000,
      performanceImprovement: 'Real-time processing patterns',
      costSavings: 'Cloud cost optimization approaches'
    },
    testimonial: undefined,
    status: 'completed',
    featured: true,
    publishedAt: '2024-06-20',
    completedAt: '2024-06-01'
  },
  {
    id: '3',
    title: 'Mobile Banking Application',
    slug: 'mobile-banking-app',
    description: 'Reference architecture for secure mobile banking with biometric authentication and real-time transaction processing.',
    fullDescription: 'Sample mobile banking application demonstrating advanced security features, seamless UX, and integration patterns with financial systems.',
    category: 'mobile',
    industry: 'Fintech',
    client: {
      name: 'Internal Demo',
      type: 'personal',
      size: 'Reference Architecture'
    },
    challenge: 'Demonstrating secure, compliant banking app patterns that provide excellent user experience while meeting strict security requirements.',
    solution: 'Built reference React Native app with end-to-end encryption, biometric authentication, and secure API integration patterns.',
    results: [
      'What this demo shows: Mobile banking security patterns',
      'Biometric authentication implementation',
      'End-to-end encryption strategies',
      'Real-time transaction processing',
      'Compliance-ready architecture (PCI DSS patterns)'
    ],
    technologies: [
      { name: 'React Native', category: 'mobile', proficiency: 'expert' },
      { name: 'TypeScript', category: 'mobile', proficiency: 'expert' },
      { name: 'Node.js', category: 'backend', proficiency: 'expert' },
      { name: 'Express.js', category: 'backend', proficiency: 'advanced' },
      { name: 'PostgreSQL', category: 'database', proficiency: 'advanced' },
      { name: 'Redis', category: 'database', proficiency: 'intermediate' },
      { name: 'AWS', category: 'devops', proficiency: 'advanced' }
    ],
    features: [
      'Biometric authentication',
      'Real-time transaction processing',
      'Account management',
      'Bill payments and transfers',
      'Investment tracking',
      'Spending analytics'
    ],
    images: {
      thumbnail: '/project-images/banking-thumb.jpg',
      gallery: ['/project-images/banking-1.jpg', '/project-images/banking-2.jpg'],
      hero: '/project-images/banking-hero.jpg'
    },
    links: {
      live: 'https://apps.apple.com/securebank-pro'
    },
    metrics: {
      duration: '10 months',
      teamSize: 5,
      linesOfCode: 95000,
      userGrowth: 'Scalable architecture patterns'
    },
    testimonial: undefined,
    status: 'completed',
    featured: true,
    publishedAt: '2024-04-10',
    completedAt: '2024-03-20'
  },
  {
    id: '4',
    title: 'DevOps Pipeline Automation',
    slug: 'devops-pipeline-automation',
    description: 'Reference CI/CD implementation demonstrating automated testing, deployment pipelines, and zero-downtime strategies.',
    fullDescription: 'Comprehensive DevOps reference architecture including automated testing, deployment pipelines, infrastructure as code, and monitoring setup.',
    category: 'devops',
    industry: 'SaaS',
    client: {
      name: 'Internal Demo',
      type: 'personal',
      size: 'Reference Architecture'
    },
    challenge: 'Demonstrating solutions to common DevOps challenges: slow deployments, manual processes, lack of testing, and scaling development workflows.',
    solution: 'Implemented comprehensive DevOps practices with automated CI/CD pipelines, infrastructure as code, comprehensive monitoring, and automated testing frameworks.',
    results: [
      'What this demo shows: Complete CI/CD automation patterns',
      'Infrastructure as Code (Terraform) implementation',
      'Zero-downtime deployment strategies',
      'Automated testing and security scanning',
      'Comprehensive monitoring with Prometheus/Grafana'
    ],
    technologies: [
      { name: 'Jenkins', category: 'devops', proficiency: 'expert' },
      { name: 'Docker', category: 'devops', proficiency: 'expert' },
      { name: 'Kubernetes', category: 'devops', proficiency: 'advanced' },
      { name: 'Terraform', category: 'devops', proficiency: 'expert' },
      { name: 'Ansible', category: 'devops', proficiency: 'advanced' },
      { name: 'Prometheus', category: 'devops', proficiency: 'advanced' },
      { name: 'Grafana', category: 'devops', proficiency: 'intermediate' },
      { name: 'AWS', category: 'devops', proficiency: 'expert' }
    ],
    features: [
      'Automated CI/CD pipelines',
      'Infrastructure as Code',
      'Comprehensive monitoring',
      'Automated testing',
      'Security scanning',
      'Performance optimization'
    ],
    images: {
      thumbnail: '/project-images/devops-thumb.jpg',
      gallery: ['/project-images/devops-1.jpg', '/project-images/devops-2.jpg'],
      hero: '/project-images/devops-hero.jpg'
    },
    links: {
      demo: 'https://demo.cloudsync-devops.com'
    },
    metrics: {
      duration: '4 months',
      teamSize: 3,
      performanceImprovement: 'Automated deployment patterns',
      costSavings: 'Infrastructure optimization strategies'
    },
    testimonial: undefined,
    status: 'completed',
    featured: false,
    publishedAt: '2024-02-15',
    completedAt: '2024-01-30'
  }
];
