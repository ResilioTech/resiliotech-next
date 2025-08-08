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
    question: 'How long does a typical DevOps transformation take?',
    answer: 'The timeline varies based on your current infrastructure and goals. Most transformations take 2-6 months, with initial improvements visible within the first few weeks. We work in phases to deliver value continuously throughout the process.'
  },
  {
    id: '2',
    question: 'Do you work with companies of all sizes?',
    answer: 'We specialize in helping startups and growing companies (10-500 employees). Our sweet spot is companies that have outgrown basic infrastructure but aren\'t ready for enterprise-level complexity and costs.'
  },
  {
    id: '3',
    question: 'What cloud providers do you support?',
    answer: 'We work primarily with AWS, Google Cloud, and Azure. We also have experience with Vercel, Netlify, DigitalOcean, and hybrid cloud setups. Our approach is provider-agnostic, focusing on your specific needs.'
  },
  {
    id: '4',
    question: 'How do you ensure our systems remain secure?',
    answer: 'Security is built into every solution we design. We implement infrastructure as code, automated security scanning, compliance monitoring, secret management, and follow industry best practices like least privilege access and zero-trust architecture.'
  },
  {
    id: '5',
    question: 'What kind of ongoing support do you provide?',
    answer: 'We offer various support levels from on-demand consulting to fully managed services. Most clients start with our implementation services and then choose between quarterly check-ins, monthly optimization reviews, or 24/7 managed support.'
  },
  {
    id: '6',
    question: 'How much does it typically cost to work with Resiliotech?',
    answer: 'Project costs vary widely based on scope and complexity. Most DevOps transformations range from $25K-$150K. We also offer hourly consulting starting at $200/hour and monthly retainer packages. We always provide transparent pricing upfront.'
  },
  {
    id: '7',
    question: 'Can you help us migrate from our current setup?',
    answer: 'Absolutely! We specialize in migrations from legacy systems, other cloud providers, or manual processes. We plan migrations carefully to minimize downtime and ensure data integrity throughout the process.'
  },
  {
    id: '8',
    question: 'What makes Resiliotech different from other DevOps consultants?',
    answer: 'We combine deep technical expertise from companies like Google and Netflix with a startup mindset. We focus on practical solutions that work for growing companies, not over-engineered enterprise solutions. Plus, we\'re building ResilioPlatform to democratize our best practices.'
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
                  href="mailto:hello@resiliotech.com"
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