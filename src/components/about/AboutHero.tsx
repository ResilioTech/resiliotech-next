'use client';

import { motion } from 'framer-motion';
import { 
  Target, 
  Heart, 
  Sparkles, 
  Users,
  TrendingUp,
  Award
} from 'lucide-react';

interface AboutHeroProps {
  stats: {
    yearsInBusiness: number;
    projectsCompleted: number;
    clientsServed: number;
    uptimeAchieved: string;
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
    { icon: TrendingUp, value: `${stats.yearsInBusiness}+`, label: 'Years in Business' },
    { icon: Award, value: `${stats.projectsCompleted}+`, label: 'Projects Completed' },
    { icon: Users, value: `${stats.clientsServed}+`, label: 'Clients Served' },
    { icon: Target, value: stats.uptimeAchieved, label: 'Average Uptime' }
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
              About <span className="text-primary">Resiliotech</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
              We're on a mission to democratize enterprise-grade DevOps, making it accessible 
              and affordable for growing companies to build reliable, scalable infrastructure.
            </p>
          </motion.div>

          {/* Mission Statement */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="p-8 bg-surface-elevated/50 backdrop-blur-sm border border-border/50 rounded-2xl">
                <Sparkles className="w-8 h-8 text-accent mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-text-primary mb-4">Our Mission</h2>
                <p className="text-lg text-text-secondary leading-relaxed">
                  Every startup deserves enterprise-grade infrastructure without enterprise-level complexity. 
                  We bridge the gap between ambitious growth plans and the technical infrastructure needed to 
                  support them, ensuring your technology scales as fast as your business.
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

          {/* Story Preview */}
          <motion.div variants={itemVariants} className="mt-16 text-center">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-text-secondary leading-relaxed">
                Founded in 2020 by former engineers from Google, Netflix, and Stripe, Resiliotech was born 
                from the frustration of seeing talented development teams held back by infrastructure challenges. 
                We've since helped over 85 companies transform their DevOps practices and achieve unprecedented reliability.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}