export interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface CompanyMilestone {
  year: string;
  title: string;
  description: string;
  metric?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  newsletter: boolean;
}