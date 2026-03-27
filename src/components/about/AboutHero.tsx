'use client';

import { motion } from 'framer-motion';
import { 
  Heart, 
  Sparkles, 
  TrendingUp,
  Award,
  Cpu,
  Globe
} from 'lucide-react';

interface AboutHeroProps {
  stats: {
    yearsExperience: string;
    systemsOperated: string;
    focusArea: string;
    availability: string;
  };
}

export function AboutHero({ stats }: AboutHeroProps) {
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

  const statsData = [
    { icon: TrendingUp, value: stats.yearsExperience, label: 'SRE Experience' },
    { icon: Award, value: stats.systemsOperated, label: 'Systems Operated' },
    { icon: Cpu, value: stats.focusArea, label: 'Focus Area' },
    { icon: Globe, value: stats.availability, label: 'Serving Clients' }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-background via-surface to-surface-elevated overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <pattern id="about-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#about-grid)" />
          </svg>
        </div>

        {/* Gradient Orbs */}
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating Elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-primary/20 rounded-full"
            animate={{
              x: [0, 30, 0],
              y: [0, -40, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
            style={{
              left: `${15 + i * 12}%`,
              top: `${25 + (i % 3) * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
              <Heart className="w-4 h-4" />
              Our Story
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6 leading-tight">
              AI Infrastructure &{' '}
              <span className="text-primary">Reliability Engineers</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
              Resilio Tech was founded by experienced SREs who saw a gap — companies building AI
              couldn&apos;t make it work reliably in production. We bridge that gap.
            </p>
          </motion.div>

          {/* Mission Statement */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="p-8 bg-surface-elevated/50 backdrop-blur-sm border border-border/50 rounded-2xl">
                <Sparkles className="w-8 h-8 text-accent mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-text-primary mb-4">Our Mission</h2>
                <p className="text-lg text-text-secondary leading-relaxed">
                  Make AI systems as reliable as the infrastructure they run on. We bring
                  production-grade SRE practices to the world of AI — so your models don&apos;t
                  just work in notebooks, they work in production.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-surface-elevated/50 backdrop-blur-sm border border-border/50 rounded-xl"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 border border-primary/20 rounded-lg mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-secondary font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}