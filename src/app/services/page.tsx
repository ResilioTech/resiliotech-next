import type { Metadata } from 'next';
import { ArrowRight, Rocket, BarChart3, Bot, Zap, RefreshCw, Target, Server, GitBranch, Cloud, Layers, Eye, AlertTriangle, LineChart, Shield, Brain, Search, Wrench, Cpu, DollarSign, FileText, Bell } from 'lucide-react';
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
    number: '01',
    title: 'AI/ML Deployment & Infrastructure',
    subtitle: 'From notebook to production Kubernetes',
    description: 'We set up model serving infrastructure with GPU optimization, auto-scaling, and CI/CD pipelines for your ML models. Cloud-native AI deployment on Kubernetes — from notebook to production.',
    features: [
      { text: 'Model serving infrastructure with GPU optimization & auto-scaling', icon: Server },
      { text: 'CI/CD pipelines specifically designed for ML models', icon: GitBranch },
      { text: 'Cloud-native AI deployment (AWS SageMaker, GCP Vertex AI, Azure ML)', icon: Cloud },
      { text: 'Kubernetes-based ML workload orchestration', icon: Layers },
      { text: 'Model versioning and artifact management', icon: GitBranch },
      { text: 'A/B testing and canary deployment for models', icon: Zap },
    ],
    techStack: ['Kubernetes', 'Docker', 'AWS SageMaker', 'GCP Vertex AI', 'MLflow', 'Seldon Core', 'KServe', 'Terraform'],
    Icon: Rocket,
    gradient: 'from-[#00D4FF] to-[#6366f1]',
    glowColor: 'rgba(0, 212, 255, 0.15)',
    engagements: [
      { type: '2-Week Sprint', desc: 'Deploy one model end-to-end' },
      { type: 'Ongoing Management', desc: 'Full infrastructure ownership' },
      { type: 'Migration', desc: 'Notebook → production pipeline' },
    ],
  },
  {
    id: 'mlops',
    number: '02',
    title: 'MLOps & AI Reliability',
    subtitle: 'Because AI is only as good as its uptime',
    description: 'We set up monitoring for your models, detection for drift, and alerts for when things break. Automated retraining pipelines with SLA-driven reliability.',
    features: [
      { text: 'ML model monitoring & observability dashboards', icon: Eye },
      { text: 'Data drift detection & automated alerting', icon: AlertTriangle },
      { text: 'Automated model retraining pipelines', icon: RefreshCw },
      { text: 'SLA-driven AI system reliability engineering', icon: Shield },
      { text: 'Model performance tracking and regression detection', icon: LineChart },
      { text: 'Incident response playbooks for AI systems', icon: FileText },
    ],
    techStack: ['Prometheus', 'Grafana', 'Evidently AI', 'Great Expectations', 'Airflow', 'Kubeflow', 'MLflow'],
    Icon: BarChart3,
    gradient: 'from-[#10b981] to-[#34d399]',
    glowColor: 'rgba(16, 185, 129, 0.15)',
    engagements: [
      { type: 'MLOps Sprint', desc: 'Full pipeline setup in 2 weeks' },
      { type: 'Reliability Retainer', desc: 'Ongoing monitoring & tuning' },
      { type: 'Observability Audit', desc: 'Assess & fix blind spots' },
    ],
  },
  {
    id: 'agents',
    number: '03',
    title: 'Custom AI Agents & Tooling',
    subtitle: 'Intelligent systems that work for your team',
    description: 'AI-powered SRE agents for incident detection and auto-remediation. RAG-based internal knowledge systems, custom LLM integrations, and tooling that makes your team more productive.',
    features: [
      { text: 'AI-powered SRE agents (incident detection, auto-remediation)', icon: Brain },
      { text: 'RAG-based internal knowledge systems', icon: Search },
      { text: 'Custom LLM integrations & fine-tuning', icon: Wrench },
      { text: 'AI cost optimization tooling', icon: DollarSign },
      { text: 'Automated documentation and runbook generation', icon: FileText },
      { text: 'Intelligent alerting and triage systems', icon: Bell },
    ],
    techStack: ['LangChain', 'LlamaIndex', 'OpenAI API', 'Pinecone', 'ChromaDB', 'FastAPI', 'Python', 'TypeScript'],
    Icon: Bot,
    gradient: 'from-[#6366f1] to-[#a78bfa]',
    glowColor: 'rgba(99, 102, 241, 0.15)',
    engagements: [
      { type: 'Agent Development', desc: 'Custom-built for your workflow' },
      { type: 'RAG Sprint', desc: 'Knowledge system in 2 weeks' },
      { type: 'LLM Consulting', desc: 'Architecture & integration plan' },
    ],
  },
];

const processSteps = [
  { step: '01', title: 'Audit', desc: 'We assess your current AI infrastructure and identify reliability gaps, bottlenecks, and quick wins.', duration: 'Free 30-min call' },
  { step: '02', title: 'Architect', desc: 'We design a production-grade AI infrastructure tailored to your scale, budget, and team capabilities.', duration: '1–2 weeks' },
  { step: '03', title: 'Implement', desc: 'We build, deploy, and test everything. You get working infrastructure, not a slide deck.', duration: '2–8 weeks' },
  { step: '04', title: 'Operate', desc: 'We monitor, optimize, and continuously improve. Your AI systems stay reliable as you scale.', duration: 'Ongoing' },
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
      <section className="pt-32 pb-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-elevated border border-border rounded-full text-sm font-medium text-primary mb-8">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Accepting new clients
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-8 leading-[1.1] tracking-tight">
              AI infrastructure{' '}
              <span className="gradient-text">services</span>
            </h1>
            
            <p className="text-xl text-text-secondary leading-relaxed mb-12 max-w-2xl mx-auto">
              We deploy ML models to production and make sure they stay up. 
              CI/CD for your models, monitoring for drift, and alerts for when things break.
            </p>

            {/* Service overview cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
              {services.map((service) => (
                <a
                  key={service.id}
                  href={`#${service.id}`}
                  className="group relative p-6 rounded-2xl border border-border bg-surface/50 hover:bg-surface-elevated hover:border-primary/30 transition-all duration-300"
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `radial-gradient(circle at 50% 0%, ${service.glowColor}, transparent 70%)` }} />
                  <div className="relative">
                    <service.Icon className="w-8 h-8 mb-3 mx-auto" style={{ color: service.gradient.includes('00D4FF') ? '#00D4FF' : service.gradient.includes('10b981') ? '#10b981' : '#6366f1' }} />
                    <div className="text-sm font-semibold text-text-primary">{service.title}</div>
                    <div className="text-xs text-text-muted mt-1">{service.subtitle}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

      {/* Services Detail */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          {services.map((service, index) => (
            <div key={service.id} id={service.id} className="scroll-mt-24 mb-32 last:mb-0">
              {/* Section header with number accent */}
              <div className="relative mb-16">
                <div className="absolute -left-4 md:-left-8 top-0 text-[8rem] md:text-[10rem] font-black leading-none text-border/[0.07] select-none pointer-events-none">
                  {service.number}
                </div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="flex items-center justify-center w-12 h-12 rounded-xl"
                      style={{ background: `linear-gradient(135deg, ${service.gradient.includes('00D4FF') ? '#00D4FF, #6366f1' : service.gradient.includes('10b981') ? '#10b981, #34d399' : '#6366f1, #a78bfa'})` }}
                    >
                      <service.Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-mono font-semibold tracking-widest uppercase" style={{ color: service.gradient.includes('00D4FF') ? '#00D4FF' : service.gradient.includes('10b981') ? '#10b981' : '#6366f1' }}>
                      Service {service.number}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-3">
                    {service.title}
                  </h2>
                  <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Bento grid layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Features — main area */}
                <div className="lg:col-span-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feature, idx) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <div
                          key={idx}
                          className="group relative p-5 bg-surface border border-border rounded-2xl hover:border-primary/20 transition-all duration-300 overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="relative flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-surface-elevated border border-border group-hover:border-primary/20 transition-colors">
                              <FeatureIcon className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
                            </div>
                            <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors leading-relaxed pt-2">
                              {feature.text}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sidebar cards */}
                <div className="lg:col-span-4 space-y-5">
                  {/* Tech Stack card */}
                  <div className="relative p-6 rounded-2xl border border-border bg-surface overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${service.gradient.includes('00D4FF') ? '#00D4FF' : service.gradient.includes('10b981') ? '#10b981' : '#6366f1'}, transparent)` }} />
                    <h3 className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5" />
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {service.techStack.map((tech) => (
                        <span key={tech} className="px-3 py-1.5 bg-surface-elevated border border-border rounded-lg text-xs font-medium text-text-secondary hover:text-primary hover:border-primary/30 transition-colors cursor-default">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Engagement Types card */}
                  <div className="relative p-6 rounded-2xl border border-border bg-surface overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${service.gradient.includes('00D4FF') ? '#00D4FF' : service.gradient.includes('10b981') ? '#10b981' : '#6366f1'}, transparent)` }} />
                    <h3 className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Target className="w-3.5 h-3.5" />
                      How We Engage
                    </h3>
                    <div className="space-y-4">
                      {service.engagements.map((engagement) => (
                        <div key={engagement.type} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: service.gradient.includes('00D4FF') ? '#00D4FF' : service.gradient.includes('10b981') ? '#10b981' : '#6366f1' }} />
                          <div>
                            <div className="text-sm font-medium text-text-primary">{engagement.type}</div>
                            <div className="text-xs text-text-muted">{engagement.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA card */}
                  <a
                    href="https://calendly.com/resiliotech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${service.gradient.includes('00D4FF') ? '#00D4FF, #6366f1' : service.gradient.includes('10b981') ? '#10b981, #34d399' : '#6366f1, #a78bfa'})` }}
                  >
                    Discuss This Service
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Separator */}
              {index < services.length - 1 && (
                <div className="mt-32 flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                  <div className="w-2 h-2 rounded-full bg-border" />
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* How We Work / Process */}
      <section className="py-24 bg-surface border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,212,255,0.04),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-4">
              How we <span className="gradient-text">work</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-xl mx-auto">
              A proven process that gets AI systems to production — fast and reliably.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((item, idx) => (
              <div key={item.step} className="group relative">
                {/* Connector line */}
                {idx < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+2rem)] w-[calc(100%-2rem)] h-px bg-gradient-to-r from-border via-primary/20 to-border" />
                )}
                <div className="relative p-6 rounded-2xl border border-border bg-background hover:border-primary/20 transition-all duration-300 h-full">
                  <div className="absolute -top-3 left-6">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {item.step}
                    </span>
                  </div>
                  <div className="pt-4">
                    <h3 className="text-xl font-bold text-text-primary mb-2">{item.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">{item.desc}</p>
                    <div className="text-xs font-medium text-text-muted bg-surface-elevated px-3 py-1.5 rounded-lg inline-block">
                      {item.duration}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-background border-t border-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-4">
              Flexible <span className="gradient-text">pricing</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-xl mx-auto">
              Every project is different. Pick the model that fits your pace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { type: '2-Week Sprint', desc: 'Focused project with clear deliverables. Ship one thing, ship it right.', icon: Zap, highlight: false },
              { type: 'Monthly Retainer', desc: 'Ongoing infrastructure management. We become your AI infra team.', icon: RefreshCw, highlight: true },
              { type: 'Project-Based', desc: 'Custom scope with milestone payments. For well-defined, larger builds.', icon: Target, highlight: false },
            ].map((model) => (
              <div
                key={model.type}
                className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                  model.highlight
                    ? 'border-primary/30 bg-surface'
                    : 'border-border bg-surface hover:border-primary/20'
                }`}
              >
                {model.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary text-background">
                      Most Popular
                    </span>
                  </div>
                )}
                {model.highlight && (
                  <div className="absolute inset-0 rounded-2xl" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(0, 212, 255, 0.08), transparent 60%)' }} />
                )}
                <div className="relative">
                  <model.icon className={`w-8 h-8 mb-4 ${model.highlight ? 'text-primary' : 'text-text-muted'}`} />
                  <h3 className="text-xl font-bold text-text-primary mb-2">{model.type}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6">{model.desc}</p>
                  <a
                    href="https://calendly.com/resiliotech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
                      model.highlight ? 'text-primary hover:text-primary-hover' : 'text-text-muted hover:text-primary'
                    }`}
                  >
                    Get a quote <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-surface border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(99,102,241,0.06),transparent_50%)]" />
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
              href="https://mail.google.com/mail/?view=cm&to=contact@resiliotech.com"
              target="_blank"
              rel="noopener noreferrer"
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