import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { StructuredData } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'AI Infrastructure Services — Deploy, Scale & Operate AI Systems',
  description: 'Production-grade AI infrastructure services: ML deployment, MLOps & reliability, custom AI agents. We deploy ML models to production and make sure they stay up.',
  keywords: ['AI infrastructure consulting', 'MLOps services', 'ML model deployment', 'AI reliability engineering', 'production AI systems', 'AI SRE'],
  alternates: {
    canonical: 'https://resiliotech.com/services',
  },
  openGraph: {
    title: 'AI Infrastructure Services — Resilio Tech',
    description: 'Production-grade AI infrastructure services. From model serving to monitoring — we make AI work in production at scale.',
    images: ['/og-images/services-overview.png'],
  },
  twitter: {
    title: 'AI Infrastructure Services — Resilio Tech',
    description: 'Production-grade AI infrastructure services. From model serving to monitoring.',
  },
};

const services = [
  {
    id: 'deployment',
    title: 'AI/ML Deployment & Infrastructure',
    description: 'We set up model serving infrastructure with GPU optimization, auto-scaling, and CI/CD pipelines for your ML models. Cloud-native AI deployment on Kubernetes — from notebook to production.',
    features: [
      'Model serving infrastructure (GPU optimization, auto-scaling)',
      'CI/CD pipelines specifically designed for ML models',
      'Cloud-native AI deployment (AWS SageMaker, GCP Vertex AI, Azure ML)',
      'Kubernetes-based ML workload orchestration',
      'Model versioning and artifact management',
      'A/B testing and canary deployment for models',
    ],
    techStack: ['Kubernetes', 'Docker', 'AWS SageMaker', 'GCP Vertex AI', 'MLflow', 'Seldon Core', 'KServe', 'Terraform'],
    icon: '🚀',
    color: 'from-primary to-blue-400',
    engagements: ['2-week deployment sprint', 'Ongoing infrastructure management', 'Migration from notebook to production'],
  },
  {
    id: 'mlops',
    title: 'MLOps & AI Reliability',
    description: 'We set up monitoring for your models, detection for drift, and alerts for when things break. Automated retraining pipelines with SLA-driven reliability — because AI systems are only as good as their uptime.',
    features: [
      'ML model monitoring & observability dashboards',
      'Data drift detection & automated alerting',
      'Automated model retraining pipelines',
      'SLA-driven AI system reliability engineering',
      'Model performance tracking and regression detection',
      'Incident response playbooks for AI systems',
    ],
    techStack: ['Prometheus', 'Grafana', 'Evidently AI', 'Great Expectations', 'Airflow', 'Kubeflow', 'MLflow'],
    icon: '📊',
    color: 'from-accent to-green-400',
    engagements: ['MLOps setup sprint', 'Ongoing reliability retainer', 'AI observability audit'],
  },
  {
    id: 'agents',
    title: 'Custom AI Agents & Tooling',
    description: 'AI-powered SRE agents for incident detection and auto-remediation. RAG-based internal knowledge systems, custom LLM integrations, and tooling that makes your team more productive.',
    features: [
      'AI-powered SRE agents (incident detection, auto-remediation)',
      'RAG-based internal knowledge systems',
      'Custom LLM integrations & fine-tuning',
      'AI cost optimization tooling',
      'Automated documentation and runbook generation',
      'Intelligent alerting and triage systems',
    ],
    techStack: ['LangChain', 'LlamaIndex', 'OpenAI API', 'Pinecone', 'ChromaDB', 'FastAPI', 'Python', 'TypeScript'],
    icon: '🤖',
    color: 'from-secondary to-purple-400',
    engagements: ['Project-based agent development', 'RAG system setup sprint', 'LLM integration consulting'],
  },
];

export default function ServicesPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://resiliotech.com" },
    { name: "Services", url: "https://resiliotech.com/services" }
  ];

  const servicesData = services.map(s => ({
    name: s.title,
    description: s.description,
    provider: "Resilio Tech",
    serviceType: "AI Infrastructure Consulting",
    areaServed: "Global",
    url: `https://resiliotech.com/services#${s.id}`
  }));

  return (
    <div className="min-h-screen">
      <StructuredData
        services={servicesData}
        breadcrumbs={breadcrumbs}
      />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-surface to-surface-elevated relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
              ⚡ Production-Grade AI Services
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6 leading-tight">
              AI Infrastructure That{' '}
              <span className="gradient-text">Actually Works</span>
            </h1>
            
            <p className="text-xl text-text-secondary leading-relaxed mb-12 max-w-4xl mx-auto">
              We deploy ML models to production and make sure they stay up. 
              CI/CD for your models, monitoring for drift, and alerts for when things break.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/resiliotech"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary-hover text-background font-semibold rounded-lg transition-all duration-300 group"
              >
                Book a Free AI Infra Audit
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="mailto:hello@resiliotech.com"
                className="inline-flex items-center justify-center px-8 py-4 bg-surface-elevated hover:bg-surface border border-border hover:border-primary/30 text-text-primary rounded-lg transition-all duration-300"
              >
                hello@resiliotech.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          {services.map((service, index) => (
            <div key={service.id} id={service.id} className="scroll-mt-24">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Content */}
                <div>
                  <div className={`inline-flex p-3 bg-gradient-to-br ${service.color} rounded-lg text-white text-2xl mb-6`}>
                    {service.icon}
                  </div>
                  
                  <h2 className="text-3xl font-bold text-text-primary mb-4">
                    {service.title}
                  </h2>
                  
                  <p className="text-lg text-text-secondary leading-relaxed mb-8">
                    {service.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Tech Stack */}
                  <div className="bg-surface border border-border rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-text-primary mb-4">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.techStack.map((tech) => (
                        <span key={tech} className="px-3 py-1.5 bg-surface-elevated border border-border rounded-lg text-sm text-text-secondary">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Engagement Types */}
                  <div className="bg-surface border border-border rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-text-primary mb-4">Engagement Types</h3>
                    <div className="space-y-3">
                      {service.engagements.map((engagement) => (
                        <div key={engagement} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span className="text-text-secondary text-sm">{engagement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href="https://calendly.com/resiliotech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-primary hover:bg-primary-hover text-background font-semibold py-3 rounded-lg transition-colors"
                  >
                    Discuss This Service →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Note */}
      <section className="py-16 bg-surface">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Pricing
          </h2>
          <p className="text-lg text-text-secondary mb-8">
            Every project is different. We offer flexible engagement models — 
            2-week sprints, ongoing retainers, or project-based pricing.
            Book a call and we&apos;ll scope it together.
          </p>
          <a
            href="https://calendly.com/resiliotech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary-hover text-background font-semibold rounded-lg transition-all duration-300 group"
          >
            Book a Call for Custom Pricing
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-gradient-to-r from-primary to-primary-hover">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Make Your AI Production-Ready?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get a free 30-minute AI infrastructure audit. We&apos;ll assess your setup 
            and give you a concrete action plan.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/resiliotech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-100 text-primary font-semibold rounded-lg transition-all duration-300 group"
            >
              Book Free AI Infra Audit
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              href="mailto:hello@resiliotech.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white/50 rounded-lg transition-all duration-300"
            >
              Email Us Directly
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}