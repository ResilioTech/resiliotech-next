import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { StructuredData } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'DevOps Services - Complete Solutions for Growing Companies | Resiliotech',
  description: 'Comprehensive DevOps services including automation, cloud infrastructure, MLOps, observability, and security. Transform your development workflow with expert guidance.',
  keywords: ['DevOps services', 'cloud infrastructure', 'automation', 'MLOps', 'observability', 'DevSecOps', 'consulting'],
  openGraph: {
    title: 'DevOps Services - Complete Solutions for Growing Companies',
    description: 'Transform your development workflow with our comprehensive DevOps services. From automation to security, we handle every aspect of your DevOps journey.',
    images: ['/og-images/services-overview.png'],
  },
  twitter: {
    title: 'DevOps Services - Complete Solutions for Growing Companies',
    description: 'Transform your development workflow with our comprehensive DevOps services.',
  },
};

const services = [
  {
    title: 'DevOps Automation',
    description: 'End-to-end CI/CD pipelines, automated testing, and deployment strategies that reduce deployment time from hours to minutes.',
    features: ['CI/CD Pipeline Setup', 'Automated Testing', 'Blue-Green Deployments', 'Rollback Strategies'],
    icon: '🔄',
    href: '/services/devops-automation',
    color: 'from-primary to-blue-400',
    startingPrice: '$2,500',
  },
  {
    title: 'Cloud Infrastructure',
    description: 'Scalable, secure, and cost-optimized cloud architecture using Infrastructure-as-Code principles.',
    features: ['AWS/GCP/Azure Setup', 'Terraform/Pulumi IaC', 'Auto-scaling Configuration', 'Cost Optimization'],
    icon: '☁️',
    href: '/services/cloud-infrastructure',
    color: 'from-secondary to-purple-400',
    startingPrice: '$3,500',
  },
  {
    title: 'MLOps & Data Pipeline',
    description: 'Machine learning operations and automated data workflows for AI-powered applications.',
    features: ['ML Model Deployment', 'Data Pipeline Automation', 'Model Monitoring', 'A/B Testing'],
    icon: '🤖',
    href: '/services/mlops',
    color: 'from-accent to-green-400',
    startingPrice: '$4,500',
  },
  {
    title: 'Observability & Monitoring',
    description: 'Comprehensive monitoring, logging, and alerting solutions for proactive issue detection.',
    features: ['Metrics & Dashboards', 'Log Aggregation', 'Alert Management', 'Performance Monitoring'],
    icon: '📊',
    href: '/services/observability',
    color: 'from-yellow-400 to-orange-400',
    startingPrice: '$2,000',
  },
  {
    title: 'Security & Compliance',
    description: 'DevSecOps integration with automated security scanning and compliance monitoring.',
    features: ['Security Scanning', 'Compliance Automation', 'Access Control', 'Vulnerability Management'],
    icon: '🔒',
    href: '/services/security',
    color: 'from-red-400 to-pink-400',
    startingPrice: '$3,000',
  },
];

const stats = [
  { number: '500+', label: 'Projects Delivered', description: 'Successful implementations' },
  { number: '98%', label: 'Client Satisfaction', description: 'Consistently high ratings' },
  { number: '60%', label: 'Cost Reduction', description: 'Average infrastructure savings' },
  { number: '10x', label: 'Deployment Speed', description: 'Faster time to market' },
];

export default function ServicesPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://resiliotech.com" },
    { name: "Services", url: "https://resiliotech.com/services" }
  ];

  const servicesData = [
    {
      name: "DevOps Automation",
      description: "End-to-end CI/CD pipelines, automated testing, and deployment strategies that reduce deployment time from hours to minutes.",
      provider: "Resiliotech",
      serviceType: "DevOps Consulting",
      areaServed: "Global",
      url: "https://resiliotech.com/services/devops-automation"
    },
    {
      name: "Cloud Infrastructure",
      description: "Scalable, secure, and cost-optimized cloud architecture using Infrastructure-as-Code principles.",
      provider: "Resiliotech", 
      serviceType: "Cloud Consulting",
      areaServed: "Global",
      url: "https://resiliotech.com/services/cloud-infrastructure"
    },
    {
      name: "MLOps & Data Pipeline",
      description: "Machine learning operations and automated data workflows for AI-powered applications.",
      provider: "Resiliotech",
      serviceType: "MLOps Consulting", 
      areaServed: "Global",
      url: "https://resiliotech.com/services/mlops"
    },
    {
      name: "Observability & Monitoring",
      description: "Comprehensive monitoring, logging, and alerting solutions for proactive issue detection.",
      provider: "Resiliotech",
      serviceType: "Monitoring Solutions",
      areaServed: "Global", 
      url: "https://resiliotech.com/services/observability"
    },
    {
      name: "Security & Compliance",
      description: "DevSecOps integration with automated security scanning and compliance monitoring.",
      provider: "Resiliotech",
      serviceType: "Security Consulting",
      areaServed: "Global",
      url: "https://resiliotech.com/services/security"
    }
  ];

  return (
    <div className="min-h-screen">
      <StructuredData
        services={servicesData}
        breadcrumbs={breadcrumbs}
      />
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-surface to-surface-elevated relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <svg className="w-full h-full" viewBox="0 0 60 60" aria-hidden="true">
            <defs>
              <pattern id="services-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1.5" fill="currentColor"/>
                <circle cx="10" cy="10" r="1" fill="currentColor"/>
                <circle cx="50" cy="50" r="1" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="60" height="60" fill="url(#services-pattern)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
              🛠️ Professional Services
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6 leading-tight">
              Complete <span className="gradient-text">DevOps Solutions</span>
            </h1>
            
            <p className="text-xl text-text-secondary leading-relaxed mb-12 max-w-4xl mx-auto">
              From infrastructure to deployment, we handle every aspect of your DevOps journey. 
              Our expert team transforms fast-moving startups into scalable tech companies.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm font-medium text-text-primary mb-1">{stat.label}</div>
                  <div className="text-xs text-text-muted">{stat.description}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all duration-300 group"
              >
                Get Free Consultation
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center px-8 py-4 bg-surface-elevated hover:bg-surface border border-border hover:border-primary/30 text-text-primary rounded-lg transition-all duration-300"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Our Services
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Comprehensive DevOps solutions tailored to your specific needs and business objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="group p-8 bg-surface border border-border rounded-xl hover:border-primary/30 hover:shadow-xl transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-3 bg-gradient-to-br ${service.color} rounded-lg text-white text-2xl`}>
                    {service.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-text-primary">
                      {service.startingPrice}
                    </div>
                    <div className="text-xs text-text-muted">starting at</div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-text-primary mb-3">
                  {service.title}
                </h3>
                
                <p className="text-text-secondary leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-text-secondary text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={service.href}
                  className="block w-full text-center bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-lg transition-colors group-hover:shadow-lg"
                >
                  Learn More About {service.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-surface/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Why Choose Resiliotech?
              </h2>
              <p className="text-lg text-text-secondary mb-8">
                We combine deep technical expertise with business understanding to deliver solutions that drive real results.
              </p>
              
              <div className="space-y-4">
                {[
                  'Expert team with experience from Google, Netflix, and leading startups',
                  'Proven methodologies that reduce risk and accelerate delivery',
                  'End-to-end support from strategy to implementation and ongoing maintenance',
                  '24/7 monitoring and support for critical systems',
                  'Transparent pricing with no hidden costs or vendor lock-in'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface-elevated border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-text-primary mb-6">
                Our Process
              </h3>
              <div className="space-y-4">
                {[
                  { step: '1', title: 'Discovery & Assessment', desc: 'Analyze current state and define objectives' },
                  { step: '2', title: 'Strategy & Planning', desc: 'Create detailed roadmap and timeline' },
                  { step: '3', title: 'Implementation', desc: 'Execute with regular checkpoints and updates' },
                  { step: '4', title: 'Optimization & Support', desc: 'Ongoing monitoring and improvements' }
                ].map((phase) => (
                  <div key={phase.step} className="flex gap-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {phase.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary">{phase.title}</h4>
                      <p className="text-text-secondary text-sm">{phase.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-primary-hover">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your DevOps?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get a free consultation and detailed proposal for your specific needs. 
            No commitment required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-100 text-primary font-semibold rounded-lg transition-all duration-300 group"
            >
              Schedule Free Consultation
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="mailto:services@resiliotech.com"
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