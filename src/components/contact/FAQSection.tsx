'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'What kind of companies do you work with?',
    answer: 'We work primarily with Series A-C startups who are adopting AI but don\'t have ML infrastructure expertise, and AI/ML teams who can build models but struggle with production deployment and reliability. If you\'re hitting infrastructure walls while scaling AI features, we can help.'
  },
  {
    id: '2',
    question: 'What does a typical engagement look like?',
    answer: 'It depends on your needs. We offer 2-week sprints for focused projects (like setting up model serving or monitoring), ongoing retainers for continuous infrastructure management, and project-based engagements. Every engagement starts with a free 30-minute audit to understand your situation.'
  },
  {
    id: '3',
    question: 'What cloud providers do you support?',
    answer: 'We work with AWS (SageMaker, EKS), GCP (Vertex AI, GKE), and Azure (Azure ML, AKS). Our approach is cloud-agnostic — we recommend the best fit for your specific workload, scale, and budget. We also work with hybrid and multi-cloud setups.'
  },
  {
    id: '4',
    question: 'How is Resilio Tech different from other MLOps consultants?',
    answer: 'We\'re SREs first, not just ML engineers. Our team comes from Fortune 500 infrastructure — we\'ve operated systems handling millions of requests daily. We don\'t just deploy your model, we make sure it stays up with proper monitoring, drift detection, and incident response.'
  },
  {
    id: '5',
    question: 'Can you help us migrate models from notebooks to production?',
    answer: 'Absolutely — that\'s one of our core services. We set up the entire pipeline: containerization, model serving infrastructure, CI/CD specifically for ML models, monitoring, and automated retraining. We go from Jupyter notebook to production Kubernetes cluster.'
  },
  {
    id: '6',
    question: 'How much does it cost?',
    answer: 'Every project is different, so we don\'t publish fixed prices. Book a free call and we\'ll scope it together — we provide transparent, detailed proposals with no hidden costs. We offer flexible engagement models to fit different budgets.'
  },
  {
    id: '7',
    question: 'Do you build custom AI agents?',
    answer: 'Yes. We build AI-powered SRE agents for incident detection and auto-remediation, RAG-based internal knowledge systems, custom LLM integrations, and AI cost optimization tooling. If it involves making AI work reliably in production, we can help.'
  },
  {
    id: '8',
    question: 'What\'s your response time?',
    answer: 'We respond to all inquiries within 24 hours. For existing clients on retainer, we provide faster response times as part of the SLA. We\'re based in India and serve clients globally.'
  }
];

export function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full text-sm font-medium text-secondary mb-6">
              <HelpCircle className="w-4 h-4" />
              Frequently Asked Questions
            </div>
            
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Got Questions? We've Got <span className="text-secondary">Answers</span>
            </h2>
            
            <p className="text-lg text-text-secondary">
              Here are the most common questions we receive. Don't see yours? 
              Feel free to reach out directly.
            </p>
          </motion.div>

          {/* FAQ Items */}
          <motion.div variants={containerVariants} className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                variants={itemVariants}
                className="bg-surface-elevated border border-border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-surface transition-colors focus:outline-none focus:bg-surface"
                >
                  <span className="font-semibold text-text-primary pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-text-muted transition-transform flex-shrink-0 ${
                      openFAQ === faq.id ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openFAQ === faq.id ? 'auto' : 0,
                    opacity: openFAQ === faq.id ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4">
                    <div className="pt-2 border-t border-border">
                      <p className="text-text-secondary leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact CTA */}
          <motion.div variants={itemVariants} className="mt-12 text-center">
            <div className="p-8 bg-surface-elevated border border-border rounded-xl">
              <h3 className="text-xl font-bold text-text-primary mb-3">
                Still have questions?
              </h3>
              <p className="text-text-secondary mb-6">
                We're happy to provide more detailed answers about your specific situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    document.getElementById('contact-form')?.scrollIntoView({ 
                      behavior: 'smooth' 
                    });
                  }}
                  className="px-6 py-3 bg-secondary hover:bg-secondary/90 text-white rounded-lg transition-colors"
                >
                  Ask Your Question
                </button>
                <a
                  href="https://mail.google.com/mail/?view=cm&to=contact@resiliotech.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-surface hover:bg-surface-elevated border border-border hover:border-secondary/30 text-text-primary rounded-lg transition-all"
                >
                  Email Us Directly
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}