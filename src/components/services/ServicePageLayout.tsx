'use client';

import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  ArrowRight,
  Clock,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Target,
  Award,
  Star
} from 'lucide-react';
import Link from 'next/link';

const iconMap = {
  CheckCircle,
  ArrowRight,
  Clock,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Target,
  Award,
  Star
} as const;

export interface ServiceFeature {
  title: string;
  description: string;
  icon: keyof typeof iconMap;
}

export interface ServiceBenefit {
  title: string;
  description: string;
  metric?: string;
}

export interface ServiceProcess {
  step: number;
  title: string;
  description: string;
  duration: string;
}

export interface ServiceCase {
  company: string;
  challenge: string;
  solution: string;
  results: string[];
  industry: string;
}

export interface ServiceData {
  title: string;
  subtitle: string;
  description: string;
  heroImage?: string;
  features: ServiceFeature[];
  benefits: ServiceBenefit[];
  process: ServiceProcess[];
  caseStudies: ServiceCase[];
  technologies: string[];
  pricing: {
    startingPrice?: string;
    model: string;
    description: string;
  };
  faq: {
    question: string;
    answer: string;
  }[];
}

interface ServicePageLayoutProps {
  service: ServiceData;
  category: string;
}

export function ServicePageLayout({ service, category }: ServicePageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-surface/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm">
                <Link href="/" className="text-text-muted hover:text-primary transition-colors">
                  Home
                </Link>
                <ArrowRight className="w-4 h-4 text-text-muted" />
                <Link href="/services" className="text-text-muted hover:text-primary transition-colors">
                  Services
                </Link>
                <ArrowRight className="w-4 h-4 text-text-muted" />
                <span className="text-primary">{service.title}</span>
              </div>

              {/* Title & Description */}
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-text-primary mb-4">
                  {service.title}
                </h1>
                <p className="text-xl text-accent font-medium mb-6">
                  {service.subtitle}
                </p>
                <p className="text-lg text-text-secondary leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Key Benefits Preview */}
              <div className="space-y-3">
                {service.benefits.slice(0, 3).map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-text-secondary">{benefit.title}</span>
                    {benefit.metric && (
                      <span className="text-primary font-semibold">{benefit.metric}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/contact?service=${category}`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all duration-300 group"
                >
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#case-studies"
                  className="inline-flex items-center justify-center px-8 py-4 bg-surface-elevated hover:bg-surface border border-border hover:border-primary/30 text-text-primary rounded-lg transition-all duration-300"
                >
                  View Case Studies
                </Link>
              </div>
            </motion.div>

            {/* Right Side - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-surface-elevated border border-border rounded-2xl p-8 shadow-xl">
                <div className="aspect-video bg-surface border border-border rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-text-muted">Service Demonstration</p>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-accent text-background px-4 py-2 rounded-lg text-sm font-semibold">
                  {service.pricing.startingPrice || 'Custom Pricing'}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-surface/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              What We Deliver
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Comprehensive solutions tailored to your specific needs and business objectives.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.features.map((feature, index) => {
              const Icon = iconMap[feature.icon] || Zap;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group p-6 bg-surface-elevated border border-border rounded-xl hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-surface/30">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {service.faq.map((faq, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-surface-elevated border border-border rounded-xl"
              >
                <summary className="p-6 cursor-pointer text-text-primary font-semibold group-open:border-b group-open:border-border hover:text-primary transition-colors">
                  {faq.question}
                </summary>
                <div className="p-6 pt-0 text-text-secondary">
                  {faq.answer}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-primary-hover">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your {service.title}?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join hundreds of companies that have successfully modernized their infrastructure with our expert guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/contact?service=${category}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-100 text-primary font-semibold rounded-lg transition-all duration-300 group"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white/50 rounded-lg transition-all duration-300"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}