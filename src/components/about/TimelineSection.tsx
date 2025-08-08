'use client';

import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Rocket } from 'lucide-react';
import { CompanyMilestone } from '@/types/company';

interface TimelineSectionProps {
  milestones: CompanyMilestone[];
}

export function TimelineSection({ milestones }: TimelineSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
              <Calendar className="w-4 h-4" />
              Our Journey
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              The <span className="text-primary">Resiliotech</span> Story
            </h2>
            
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              From a small team with a big vision to a trusted partner for growing companies, 
              here's how we've evolved to serve the DevOps community better.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border md:left-1/2"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Year Badge */}
                  <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 z-10">
                    <div className="flex items-center justify-center w-16 h-16 bg-surface-elevated border-4 border-primary rounded-full">
                      <span className="text-sm font-bold text-primary">{milestone.year}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`flex-1 ml-24 md:ml-0 ${
                    index % 2 === 0 
                      ? 'md:pr-12 md:text-right' 
                      : 'md:pl-12 md:text-left'
                  }`}>
                    <div className="p-6 bg-surface-elevated border border-border rounded-xl max-w-md ml-auto mr-auto md:ml-0 md:mr-0">
                      {/* Metric Badge */}
                      {milestone.metric && (
                        <div className="inline-flex items-center gap-1 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-sm font-medium text-accent mb-3">
                          <TrendingUp className="w-3 h-3" />
                          {milestone.metric}
                        </div>
                      )}

                      <h3 className="text-xl font-bold text-text-primary mb-3">
                        {milestone.title}
                      </h3>
                      
                      <p className="text-text-secondary leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Future Vision */}
          <motion.div variants={itemVariants} className="mt-16 text-center">
            <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl">
              <Rocket className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-text-primary mb-4">Looking Ahead</h3>
              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                We're just getting started. Our vision is to help 10,000 development teams worldwide 
                achieve enterprise-grade reliability through our platform and services. The future of 
                DevOps is automated, accessible, and built for everyone.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center gap-2 text-text-muted">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>Next milestone: ResilioPlatform public launch</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}