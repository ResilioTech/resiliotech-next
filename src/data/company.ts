import { CompanyValue, CompanyMilestone } from '@/types/company';

export const companyValues: CompanyValue[] = [
  {
    id: '1',
    title: 'Production-First Thinking',
    description: 'We don\'t build demos. Every system we design is built to survive real traffic, real failures, and real Friday deploys.',
    icon: 'Shield'
  },
  {
    id: '2',
    title: 'Reliability as a Feature',
    description: 'AI systems are only as good as their uptime. We engineer reliability into every layer — from model serving to monitoring.',
    icon: 'Activity'
  },
  {
    id: '3',
    title: 'Radical Transparency',
    description: 'We build in public, share our learnings, and work as an extension of your team. No black boxes, no vendor lock-in.',
    icon: 'Eye'
  },
  {
    id: '4',
    title: 'Engineer-to-Engineer',
    description: 'We speak your language. Direct, specific, no fluff. We\'d rather show you a Kubernetes manifest than a slide deck.',
    icon: 'Terminal'
  }
];

export const companyMilestones: CompanyMilestone[] = [
  {
    year: '2024',
    title: 'Company Founded',
    description: 'Resilio Tech was founded by experienced SREs who saw a gap — companies building AI couldn\'t make it work reliably in production.',
    metric: 'Founded'
  },
  {
    year: '2025',
    title: 'AI Infrastructure Pivot',
    description: 'Expanded from DevOps consulting to AI infrastructure & reliability, combining deep SRE expertise with modern AI/ML knowledge.',
    metric: 'AI Infra'
  },
  {
    year: '2025',
    title: 'Building in Public',
    description: 'Launched open roadmap and changelog. Sharing real production lessons through YouTube and technical blog posts.',
    metric: 'Open Source'
  },
  {
    year: '2026',
    title: 'AI Infrastructure Services Launch',
    description: 'Launched AI infrastructure consulting services. Actively accepting clients for production AI deployment and reliability.',
    metric: 'Launched'
  }
];

export const companyStats = {
  yearsExperience: '6+',
  systemsOperated: 'Fortune 500',
  focusArea: 'AI Infrastructure',
  availability: 'Global'
};