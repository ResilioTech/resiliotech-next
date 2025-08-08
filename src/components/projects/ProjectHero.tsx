'use client';

import { motion } from 'framer-motion';
import { 
  Code, 
  Rocket, 
  Users, 
  Trophy, 
  TrendingUp,
  Calendar,
  MapPin
} from 'lucide-react';

interface ProjectHeroProps {
  totalProjects: number;
  totalTechnologies: number;
  yearsExperience: number;
  completedProjects: number;
}

export function ProjectHero({ 
  totalProjects, 
  totalTechnologies, 
  yearsExperience, 
  completedProjects 
}: ProjectHeroProps) {
  const stats = [
    {
      icon: Code,
      value: totalProjects,
      label: 'Projects Delivered',
      suffix: '+'
    },
    {
      icon: Rocket,
      value: totalTechnologies,
      label: 'Technologies',
      suffix: '+'
    },
    {
      icon: Calendar,
      value: yearsExperience,
      label: 'Years Experience',
      suffix: '+'
    },
    {
      icon: Trophy,
      value: Math.round((completedProjects / totalProjects) * 100),
      label: 'Success Rate',
      suffix: '%'
    }
  ];

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

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative py-24 bg-gradient-to-br from-background via-surface to-surface-elevated overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <pattern id="hero-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#hero-grid)" />
          </svg>
        </div>

        {/* Floating Elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-primary/20 rounded-full"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 6 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
              <TrendingUp className="w-4 h-4" />
              Portfolio Showcase
            </div>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-text-primary mb-6 leading-tight"
          >
            Our <span className="text-primary">Projects</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Discover our journey of transforming ideas into powerful digital solutions that drive business growth and innovation
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <div className="flex items-center gap-2 text-text-muted">
              <MapPin className="w-4 h-4" />
              <span>Serving clients globally</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border"></div>
            <div className="flex items-center gap-2 text-text-muted">
              <Users className="w-4 h-4" />
              <span>Trusted by {Math.floor(totalProjects * 1.2)} companies</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={statVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
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
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                      duration: 1, 
                      delay: 0.8 + index * 0.1,
                    }}
                  >
                    {stat.value}{stat.suffix}
                  </motion.span>
                </div>
                <div className="text-sm text-text-secondary font-medium">
                  {stat.label}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Technologies Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <p className="text-text-muted mb-6">Technologies we excel in</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              'React', 'Node.js', 'TypeScript', 'Python', 'Docker', 
              'Kubernetes', 'AWS', 'PostgreSQL', 'MongoDB', 'Redis'
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 1.4 + index * 0.05,
                  ease: "easeOut"
                }}
                className="px-3 py-2 bg-surface border border-border rounded-lg text-sm text-text-muted hover:text-text-primary hover:border-primary/30 transition-all cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}