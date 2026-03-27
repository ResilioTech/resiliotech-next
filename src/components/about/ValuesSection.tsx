'use client';

import { motion } from 'framer-motion';
import { 
  Shield, 
  Activity, 
  Eye, 
  Terminal,
  Sparkles,
  Target,
  Lightbulb
} from 'lucide-react';
import { CompanyValue } from '@/types/company';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Activity,
  Eye,
  Terminal,
};

interface ValuesSectionProps {
  values: CompanyValue[];
}

export function ValuesSection({ values }: ValuesSectionProps) {
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
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="values-pattern" width="25" height="25" patternUnits="userSpaceOnUse">
              <circle cx="12.5" cy="12.5" r="2" fill="currentColor" opacity="0.3"/>
              <circle cx="12.5" cy="12.5" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#values-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm font-medium text-accent mb-6">
              <Sparkles className="w-4 h-4" />
              Our Values
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              What Drives <span className="text-accent">Us</span>
            </h2>
          </motion.div>

          {/* Mission & Vision */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 bg-surface-elevated/50 backdrop-blur-sm border border-primary/20 rounded-2xl">
              <Target className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold text-text-primary mb-3">Mission</h3>
              <p className="text-text-secondary leading-relaxed">
                Make AI systems as reliable as the infrastructure they run on.
              </p>
            </div>
            <div className="p-8 bg-surface-elevated/50 backdrop-blur-sm border border-secondary/20 rounded-2xl">
              <Lightbulb className="w-8 h-8 text-secondary mb-4" />
              <h3 className="text-xl font-bold text-text-primary mb-3">Vision</h3>
              <p className="text-text-secondary leading-relaxed">
                Every company deploying AI should have production-grade reliability — not just the tech giants.
              </p>
            </div>
          </motion.div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => {
              const IconComponent = iconMap[value.icon] || Shield;
              
              return (
                <motion.div
                  key={value.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="group relative"
                >
                  <div className="h-full p-8 bg-surface-elevated border border-border rounded-2xl transition-all duration-300 group-hover:border-accent/30 group-hover:shadow-lg group-hover:shadow-accent/10">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 border border-accent/20 rounded-xl mb-6 group-hover:bg-accent/20 transition-colors">
                      <IconComponent className="w-8 h-8 text-accent" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-text-primary mb-4 group-hover:text-accent transition-colors">
                      {value.title}
                    </h3>
                    
                    <p className="text-text-secondary leading-relaxed">
                      {value.description}
                    </p>

                    {/* Hover Effect */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}