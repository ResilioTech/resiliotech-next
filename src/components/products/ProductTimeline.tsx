'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Circle, Clock, Rocket } from 'lucide-react';
import { ProductTimeline as TimelineType } from '@/types/products';

interface ProductTimelineProps {
  timeline: TimelineType[];
}

export function ProductTimeline({ timeline }: ProductTimelineProps) {
  const getStatusIcon = (status: TimelineType['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-accent" />;
      case 'current':
        return <Clock className="w-6 h-6 text-primary animate-pulse" />;
      case 'upcoming':
        return <Circle className="w-6 h-6 text-text-muted" />;
    }
  };

  const getStatusColor = (status: TimelineType['status']) => {
    switch (status) {
      case 'completed':
        return 'border-accent bg-accent/10';
      case 'current':
        return 'border-primary bg-primary/10';
      case 'upcoming':
        return 'border-border bg-surface';
    }
  };

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
    hidden: { opacity: 0, x: -20 },
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
    <section className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full text-sm font-medium text-secondary mb-6">
            <Rocket className="w-4 h-4" />
            Development Roadmap
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Our Journey to Launch
          </h2>
          
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Follow our progress as we build the future of DevOps automation, one milestone at a time
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Vertical Line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border"></div>
          
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={item.phase}
                variants={itemVariants}
                className="relative flex items-start gap-6"
              >
                {/* Status Icon */}
                <div className={`relative z-10 flex items-center justify-center w-12 h-12 border-2 rounded-full ${getStatusColor(item.status)}`}>
                  {getStatusIcon(item.status)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className={`p-6 border rounded-xl ${getStatusColor(item.status)} transition-all duration-300`}>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-text-primary mb-2">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-text-muted">
                          <span className="px-2 py-1 bg-surface-elevated rounded-full capitalize">
                            {item.phase}
                          </span>
                          <span>•</span>
                          <span>{new Date(item.date).toLocaleDateString('en-US', { 
                            month: 'long', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}</span>
                        </div>
                      </div>
                      
                      {item.status === 'current' && (
                        <div className="flex items-center gap-1 text-primary">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium">In Progress</span>
                        </div>
                      )}
                    </div>

                    <p className="text-text-secondary leading-relaxed">
                      {item.description}
                    </p>

                    {/* Progress Bar for Current Phase */}
                    {item.status === 'current' && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm text-text-muted mb-2">
                          <span>Progress</span>
                          <span>75%</span>
                        </div>
                        <div className="w-full bg-surface-elevated rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '75%' }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="bg-primary h-2 rounded-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-surface-elevated border border-border rounded-lg">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
              <p className="text-text-secondary">
                <span className="font-medium text-text-primary">Want to influence our roadmap?</span>
                {' '}Join our early access program and share your feedback.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}