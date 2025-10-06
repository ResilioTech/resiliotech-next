import { TeamMember, CompanyValue, CompanyMilestone } from '@/types/company';

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Shivam Shah',
    role: 'Founder',
    bio: 'Building DevOps tools for startups to move fast without breaking things. Currently working on DeployFlow (Private Alpha) while running Founding Pilot engagements.',
    expertise: ['DevOps', 'Cloud Infrastructure', 'CI/CD', 'Kubernetes'],
    social: {
      linkedin: 'https://www.linkedin.com/in/shivam-neer-shah/',
      github: 'https://github.com/resiliotech',
      twitter: 'https://x.com/resiliotech',
      email: 'shivam@resiliotech.com'
    },
    experience: 'Building in public',
    avatar: '/team/shivam-shah.jpg'
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
    description: 'Expanding with InfraScale, SignalWatch, and SecureOps to cover the full DevOps lifecycle.',
    metric: '4 Products'
  }
];

export const companyStats = {
  yearsInBusiness: 1,
  projectsCompleted: 0, // Building in public - see roadmap
  clientsServed: 0, // Building in public - see roadmap
  uptimeAchieved: 'Building',
  costReduction: 'TBD',
  teamSize: 1 // Solo founder + Founding Pilot partners
};