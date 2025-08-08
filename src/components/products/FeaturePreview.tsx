'use client';

import { motion } from 'framer-motion';
import { 
  GitBranch, 
  Cloud, 
  Activity, 
  Zap, 
  Shield, 
  DollarSign,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { ProductFeature } from '@/types/products';

const iconMap = {
  GitBranch,
  Cloud,
  Activity,
  Zap,
  Shield,
  DollarSign,
};

interface FeaturePreviewProps {
  features: ProductFeature[];
}

export function FeaturePreview({ features }: FeaturePreviewProps) {
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  const sortedFeatures = [...features].sort((a, b) => 
    priorityOrder[a.priority] - priorityOrder[b.priority]
  );

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
            <Sparkles className="w-4 h-4" />
            Powerful Features
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Built for the Future of DevOps
          </h2>
          
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Every feature designed to eliminate complexity and accelerate your development workflow
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {sortedFeatures.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || GitBranch;
            
            return (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.2 }
                }}
                className="group relative"
              >
                <div className="h-full p-8 bg-surface-elevated border border-border rounded-xl transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-lg group-hover:shadow-primary/10">
                  {/* Priority Badge */}
                  {feature.priority === 'high' && (
                    <div className="absolute top-4 right-4">
                      <div className="px-2 py-1 bg-accent/10 border border-accent/20 rounded-full">
                        <span className="text-xs font-medium text-accent">Priority</span>
                      </div>
                    </div>
                  )}

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 border border-primary/20 rounded-lg mb-6 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-text-primary mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-text-secondary leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Coming Soon Badge */}
                  {feature.comingSoon && (
                    <div className="inline-flex items-center gap-1 text-sm text-text-muted">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                      Coming Soon
                    </div>
                  )}

                  {/* Hover Effect Arrow */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ChevronRight className="w-5 h-5 text-primary" />
                  </div>
                </div>

                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4 px-6 py-4 bg-surface-elevated border border-border rounded-lg">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full border-2 border-surface-elevated"
                  style={{
                    background: `linear-gradient(${45 + i * 30}deg, #00D4FF, #6366f1)`,
                  }}
                />
              ))}
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-text-primary">
                Join the beta program
              </p>
              <p className="text-xs text-text-muted">
                Get early access to these features
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}