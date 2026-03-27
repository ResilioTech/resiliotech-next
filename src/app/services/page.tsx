import type { Metadata } from 'next';
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
      <section className="pt-32 pb-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-elevated border border-border rounded-full text-sm font-medium text-primary mb-8">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Accepting new clients
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-8 leading-[1.1] tracking-tight">
              AI infrastructure{' '}
              <span className="gradient-text">services</span>
            </h1>
            
            <p className="text-xl text-text-secondary leading-relaxed mb-10 max-w-2xl">
              We deploy ML models to production and make sure they stay up. 
              CI/CD for your models, monitoring for drift, and alerts for when things break.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://calendly.com/resiliotech"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary-hover text-background font-semibold rounded-lg transition-all duration-300 glow-effect hover:scale-105 group"
              >
                Book a Free AI Infra Audit
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#deployment"
                className="inline-flex items-center justify-center px-8 py-4 bg-surface-elevated hover:bg-surface border border-border hover:border-primary/30 text-text-primary rounded-lg transition-all duration-300"
              >
                Explore services ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Navigation Pills */}
      <section className="py-6 bg-surface border-y border-border sticky top-16 z-30 backdrop-blur-lg bg-surface/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-3 overflow-x-auto pb-1">
            {services.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-surface-elevated hover:bg-primary/10 border border-border hover:border-primary/30 rounded-full text-sm font-medium text-text-secondary hover:text-primary transition-all duration-200"
              >
                <span>{service.icon}</span>
                {service.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          {services.map((service, index) => (
            <div key={service.id} id={service.id} className="scroll-mt-32">
              {/* Service Number + Title */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-6xl font-bold text-border/60">0{index + 1}</span>
                  <div className={`h-px flex-1 bg-gradient-to-r ${service.color} opacity-20`} />
                </div>
                <div className="flex items-start gap-4 mb-4">
                  <div className={`inline-flex p-3 bg-gradient-to-br ${service.color} rounded-xl text-2xl shadow-lg`}>
                    {service.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
                      {service.title}
                    </h2>
                    <p className="text-lg text-text-secondary leading-relaxed mt-3 max-w-2xl">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Features - takes 2 cols */}
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="group flex items-start gap-3 p-4 bg-surface border border-border rounded-xl hover:border-primary/20 transition-all duration-200"
                      >
                        <div className="mt-0.5 flex-shrink-0">
                          <CheckCircle className="w-5 h-5 text-accent" />
                        </div>
                        <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Tech Stack */}
                  <div className="bg-surface-elevated border border-border rounded-2xl p-6">
                    <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.techStack.map((tech) => (
                        <span key={tech} className="px-3 py-1.5 bg-background border border-border rounded-lg text-xs font-medium text-text-secondary hover:text-primary hover:border-primary/30 transition-colors cursor-default">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Engagement Types */}
                  <div className="bg-surface-elevated border border-border rounded-2xl p-6">
                    <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">How We Engage</h3>
                    <div className="space-y-3">
                      {service.engagements.map((engagement) => (
                        <div key={engagement} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                          <span className="text-sm text-text-secondary">{engagement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href="https://calendly.com/resiliotech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-hover text-background font-semibold py-4 rounded-xl transition-all duration-200"
                  >
                    Discuss This Service
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Note */}
      <section className="py-20 bg-surface border-t border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Transparent Pricing
          </h2>
          <p className="text-lg text-text-secondary mb-10 max-w-2xl mx-auto">
            Every project is different. We offer flexible engagement models — 
            2-week sprints, ongoing retainers, or project-based pricing.
            Book a call and we&apos;ll scope it together.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              { type: '2-Week Sprint', desc: 'Focused project with clear deliverables', icon: '⚡' },
              { type: 'Monthly Retainer', desc: 'Ongoing infrastructure management', icon: '🔄' },
              { type: 'Project-Based', desc: 'Custom scope with milestone payments', icon: '🎯' },
            ].map((model) => (
              <div key={model.type} className="p-6 bg-surface-elevated border border-border rounded-xl">
                <span className="text-2xl mb-3 block">{model.icon}</span>
                <h3 className="font-semibold text-text-primary mb-1">{model.type}</h3>
                <p className="text-sm text-text-muted">{model.desc}</p>
              </div>
            ))}
          </div>
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
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Ready to make your AI{' '}
            <span className="gradient-text">production-ready</span>?
          </h2>
          <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
            Get a free 30-minute AI infrastructure audit. We&apos;ll assess your setup 
            and give you a concrete action plan.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/resiliotech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary-hover text-background font-semibold rounded-lg transition-all duration-300 glow-effect hover:scale-105 group"
            >
              Book Free AI Infra Audit
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="mailto:contact@resiliotech.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-surface-elevated hover:bg-surface border border-border hover:border-primary/30 text-text-primary rounded-lg transition-all duration-300"
            >
              Email Us Directly
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}