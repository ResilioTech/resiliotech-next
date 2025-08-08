import { Project } from '@/types/projects';

export const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform Modernization',
    slug: 'ecommerce-platform-modernization',
    description: 'Transformed legacy monolith into microservices architecture with 99.9% uptime and 50% faster response times.',
    fullDescription: 'Complete platform overhaul for a rapidly growing e-commerce company, migrating from a legacy PHP monolith to a modern microservices architecture using Node.js, React, and Kubernetes.',
    category: 'web',
    industry: 'E-commerce',
    client: {
      name: 'TechMart Solutions',
      type: 'startup',
      size: '50-100 employees'
    },
    challenge: 'Legacy monolithic architecture causing frequent downtime, slow performance, and difficulty scaling during peak traffic periods like Black Friday.',
    solution: 'Implemented microservices architecture with containerized deployment, auto-scaling capabilities, and comprehensive monitoring using modern DevOps practices.',
    results: [
      '99.9% uptime achieved (up from 95.2%)',
      '50% faster page load times',
      'Zero downtime deployments implemented',
      '10x faster development velocity',
      'Reduced infrastructure costs by 30%'
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
      performanceImprovement: '50% faster load times',
      userGrowth: '200% increase in concurrent users',
      costSavings: '30% reduction in infrastructure costs'
    },
    testimonial: {
      author: {
        name: 'Sarah Johnson',
        role: 'CTO',
        company: 'TechMart Solutions',
        avatar: '/testimonials/sarah-johnson.jpg'
      },
      content: 'The Resiliotech team delivered exceptional results. Our platform is now faster, more reliable, and can handle 10x the traffic. The migration was seamless with zero business disruption.',
      rating: 5
    },
    status: 'completed',
    featured: true,
    publishedAt: '2024-08-15',
    completedAt: '2024-07-30'
  },
  {
    id: '2',
    title: 'AI-Powered Analytics Dashboard',
    slug: 'ai-analytics-dashboard',
    description: 'Built comprehensive analytics platform with real-time data processing and machine learning insights for enterprise client.',
    fullDescription: 'Developed a sophisticated analytics dashboard that processes millions of data points in real-time, providing actionable insights through machine learning algorithms and intuitive visualizations.',
    category: 'web',
    industry: 'Data Analytics',
    client: {
      name: 'DataFlow Enterprises',
      type: 'enterprise',
      size: '500+ employees'
    },
    challenge: 'Manual data analysis taking weeks, no real-time insights, and disparate data sources making it difficult to get a unified view of business metrics.',
    solution: 'Created a unified analytics platform with real-time data ingestion, automated ML pipelines, and interactive dashboards using modern data engineering practices.',
    results: [
      '95% reduction in analysis time',
      'Real-time insights across all business units',
      'Automated anomaly detection',
      '$2M annual savings through optimized operations',
      '40% improvement in decision-making speed'
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
      performanceImprovement: '95% faster analysis',
      costSavings: '$2M annual operational savings'
    },
    testimonial: {
      author: {
        name: 'Michael Chen',
        role: 'VP of Engineering',
        company: 'DataFlow Enterprises',
        avatar: '/testimonials/michael-chen.jpg'
      },
      content: 'This platform has transformed how we make data-driven decisions. What used to take our analysts weeks now happens in real-time. The ROI has been incredible.',
      rating: 5
    },
    status: 'completed',
    featured: true,
    publishedAt: '2024-06-20',
    completedAt: '2024-06-01'
  },
  {
    id: '3',
    title: 'Mobile Banking Application',
    slug: 'mobile-banking-app',
    description: 'Secure, user-friendly banking app with biometric authentication and real-time transaction processing for fintech startup.',
    fullDescription: 'Developed a comprehensive mobile banking application with advanced security features, seamless UX, and integration with multiple financial institutions.',
    category: 'mobile',
    industry: 'Fintech',
    client: {
      name: 'SecureBank Pro',
      type: 'startup',
      size: '20-50 employees'
    },
    challenge: 'Creating a secure, compliant banking app that provides excellent user experience while meeting strict financial regulations and security requirements.',
    solution: 'Built native iOS and Android apps with end-to-end encryption, biometric authentication, and seamless integration with banking APIs using React Native and robust security practices.',
    results: [
      '250K+ active users within 6 months',
      'Bank-grade security certification',
      '4.8/5 app store rating',
      '99.99% transaction success rate',
      'PCI DSS compliance achieved'
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
      userGrowth: '250K users in 6 months'
    },
    testimonial: {
      author: {
        name: 'Emily Rodriguez',
        role: 'Founder & CEO',
        company: 'SecureBank Pro',
        avatar: '/testimonials/emily-rodriguez.jpg'
      },
      content: 'The team delivered a world-class banking app that our customers love. The security implementation gave us confidence to launch, and the user experience has driven incredible adoption.',
      rating: 5
    },
    status: 'completed',
    featured: true,
    publishedAt: '2024-04-10',
    completedAt: '2024-03-20'
  },
  {
    id: '4',
    title: 'DevOps Pipeline Automation',
    slug: 'devops-pipeline-automation',
    description: 'Complete CI/CD overhaul reducing deployment time from 4 hours to 15 minutes with zero-downtime deployments.',
    fullDescription: 'Comprehensive DevOps transformation including automated testing, deployment pipelines, infrastructure as code, and monitoring setup for a growing SaaS company.',
    category: 'devops',
    industry: 'SaaS',
    client: {
      name: 'CloudSync Technologies',
      type: 'startup',
      size: '30-50 employees'
    },
    challenge: 'Manual deployments taking hours, frequent production issues, no automated testing, and difficulty scaling development processes as team grew.',
    solution: 'Implemented comprehensive DevOps practices with automated CI/CD pipelines, infrastructure as code, comprehensive monitoring, and automated testing frameworks.',
    results: [
      '94% reduction in deployment time (4 hours to 15 minutes)',
      'Zero-downtime deployments achieved',
      '80% reduction in production incidents',
      'Automated testing coverage increased to 85%',
      '300% faster development velocity'
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
      performanceImprovement: '94% faster deployments',
      costSavings: '60% reduction in operational overhead'
    },
    testimonial: {
      author: {
        name: 'David Park',
        role: 'Engineering Manager',
        company: 'CloudSync Technologies',
        avatar: '/testimonials/david-park.jpg'
      },
      content: 'The DevOps transformation was game-changing. Our team can now deploy multiple times per day with confidence. The automated monitoring has prevented numerous potential outages.',
      rating: 5
    },
    status: 'completed',
    featured: false,
    publishedAt: '2024-02-15',
    completedAt: '2024-01-30'
  }
];