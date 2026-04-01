'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { CopyEmailButton } from '@/components/ui/CopyEmailButton';
import { contactFaqs } from '@/data/faq';

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
              Got Questions? We&apos;ve Got <span className="text-secondary">Answers</span>
            </h2>
            
            <p className="text-lg text-text-secondary">
              Here are the most common questions we receive. Don&apos;t see yours? 
              Feel free to reach out directly.
            </p>
          </motion.div>

          {/* FAQ Items */}
          <motion.div variants={containerVariants} className="space-y-4">
            {contactFaqs.map((faq) => (
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
                We&apos;re happy to provide more detailed answers about your specific situation.
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
                <CopyEmailButton
                  label="Email Us Directly"
                  className="px-6 py-3 bg-surface hover:bg-surface-elevated border border-border hover:border-secondary/30 text-text-primary rounded-lg transition-all"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
