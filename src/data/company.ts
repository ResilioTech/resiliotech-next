import { TeamMember, CompanyValue, CompanyMilestone } from '@/types/company';

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Chen',
    role: 'Founder & CEO',
    bio: 'Former Principal Engineer at Google Cloud with 10+ years of experience building scalable infrastructure. Passionate about helping startups achieve enterprise-grade reliability without the complexity.',
    expertise: ['Cloud Architecture', 'DevOps Strategy', 'Team Leadership', 'System Design'],
    social: {
      linkedin: 'https://www.linkedin.com/company/resilio-tech',
      github: 'https://github.com/resiliotech',
      twitter: 'https://x.com/resiliotech',
      email: 'alex@resiliotech.com'
    },
    experience: '10+ years',
    avatar: '/team/alex-chen.jpg'
  },
  {
    id: '2',
    name: 'Sarah Rodriguez',
    role: 'CTO & Co-Founder',
    bio: 'Ex-Netflix Senior SRE with deep expertise in observability and incident management. Champions reliability engineering practices that keep systems running at 99.9% uptime.',
    expertise: ['Site Reliability Engineering', 'Observability', 'Incident Management', 'Platform Engineering'],
    social: {
      linkedin: 'https://www.linkedin.com/company/resilio-tech',
      github: 'https://github.com/resiliotech',
      email: 'sarah@resiliotech.com'
    },
    experience: '8+ years',
    avatar: '/team/sarah-rodriguez.jpg'
  },
  {
    id: '3',
    name: 'Michael Park',
    role: 'Lead DevOps Engineer',
    bio: 'Kubernetes specialist and CI/CD automation expert. Previously built deployment pipelines at Stripe that processed millions of deployments per month.',
    expertise: ['Kubernetes', 'CI/CD Automation', 'Infrastructure as Code', 'Security'],
    social: {
      linkedin: 'https://www.linkedin.com/company/resilio-tech',
      github: 'https://github.com/resiliotech',
      email: 'michael@resiliotech.com'
    },
    experience: '6+ years',
    avatar: '/team/michael-park.jpg'
  },
  {
    id: '4',
    name: 'Emily Watson',
    role: 'Senior Cloud Architect',
    bio: 'AWS Solutions Architect with expertise in cost optimization and security. Helped Fortune 500 companies reduce cloud spending by an average of 40% while improving performance.',
    expertise: ['AWS Architecture', 'Cost Optimization', 'Security', 'Migration Strategy'],
    social: {
      linkedin: 'https://www.linkedin.com/company/resilio-tech',
      github: 'https://github.com/resiliotech',
      email: 'emily@resiliotech.com'
    },
    experience: '7+ years',
    avatar: '/team/emily-watson.jpg'
  }
];

export const companyValues: CompanyValue[] = [
  {
    id: '1',
    title: 'Simplicity First',
    description: 'We believe that powerful solutions should be simple to use. Our goal is to eliminate complexity, not add to it.',
    icon: 'Zap'
  },
  {
    id: '2',
    title: 'Reliability by Design',
    description: 'Every solution we build is designed with reliability as a core principle. We dont just fix problems; we prevent them.',
    icon: 'Shield'
  },
  {
    id: '3',
    title: 'Transparent Partnership',
    description: 'We work as an extension of your team with complete transparency. Your success is our success.',
    icon: 'Users'
  },
  {
    id: '4',
    title: 'Continuous Innovation',
    description: 'Technology evolves rapidly, and so do we. We stay ahead of the curve to bring you the latest and greatest solutions.',
    icon: 'TrendingUp'
  }
];

export const companyMilestones: CompanyMilestone[] = [
  {
    year: '2024',
    title: 'Company Founded',
    description: 'Started Resiliotech with a vision to democratize enterprise-grade DevOps for growing companies.',
    metric: 'Founded'
  },
  {
    year: '2025',
    title: 'Building in Public',
    description: 'Launched Founding Pilot Program and started building DeployFlow in public. See our Roadmap and Changelog.',
    metric: 'Private Alpha'
  },
  {
    year: 'Q2 2025',
    title: 'DeployFlow Beta',
    description: 'Launching DeployFlow public beta with multi-cloud support and policy library.',
    metric: 'Public Beta'
  },
  {
    year: 'Q3+ 2025',
    title: 'Product Portfolio',
    description: 'Expanding with InfraScale, CloudWatch Pro, and SecureOps to cover the full DevOps lifecycle.',
    metric: '4 Products'
  }
];

export const companyStats = {
  yearsInBusiness: 4,
  projectsCompleted: 120,
  clientsServed: 0, // Building in public - see roadmap
  uptimeAchieved: '99.9%',
  costReduction: '40%',
  teamSize: 15
};