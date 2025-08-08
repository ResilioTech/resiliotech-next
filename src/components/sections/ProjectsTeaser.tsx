'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  TrendingUp, 
  ExternalLink,
  Calendar,
  Users,
  Award,
  Code,
  Sparkles
} from 'lucide-react';

export function ProjectsTeaser() {
  // Sample featured projects data
  const featuredProjects = [
    {
      title: 'E-Commerce Platform Modernization',
      category: 'Web Application',
      result: '99.9% uptime achieved',
      tech: ['React', 'Node.js', 'Kubernetes'],
      image: '/project-images/ecommerce-thumb.jpg',
      slug: 'ecommerce-platform-modernization'
    },
    {
      title: 'AI-Powered Analytics Dashboard',
      category: 'Data Analytics',
      result: '95% reduction in analysis time',
      tech: ['Python', 'React', 'TensorFlow'],
      image: '/project-images/analytics-thumb.jpg',
      slug: 'ai-analytics-dashboard'
    },
    {
      title: 'Mobile Banking Application',
      category: 'Mobile App',
      result: '250K+ active users',
      tech: ['React Native', 'Node.js', 'AWS'],
      image: '/project-images/banking-thumb.jpg',
      slug: 'mobile-banking-app'
    }
  ];

  const stats = [
    { icon: Code, value: '50+', label: 'Projects Delivered' },
    { icon: Users, value: '100+', label: 'Happy Clients' },
    { icon: TrendingUp, value: '99%', label: 'Success Rate' },
    { icon: Award, value: '5+', label: 'Years Experience' }
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

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <pattern id="projects-grid" width="15" height="15" patternUnits="userSpaceOnUse">
                <circle cx="7.5" cy="7.5" r="1" fill="currentColor" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#projects-grid)" />
          </svg>
        </div>

        {/* Floating Code Icons */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/10"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
            style={{
              left: `${20 + i * 18}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
          >
            <Code className="w-8 h-8" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full text-sm font-medium text-secondary mb-6">
              <Sparkles className="w-4 h-4" />
              Our Work
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Transforming Ideas into <span className="text-secondary">Digital Solutions</span>
            </h2>
            
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              From concept to deployment, we build scalable applications that drive business growth. 
              Explore our portfolio of successful projects across various industries.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-surface-elevated border border-border rounded-xl"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 border border-secondary/20 rounded-lg mb-4">
                  <stat.icon className="w-6 h-6 text-secondary" />
                </div>
                <div className="text-2xl font-bold text-text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-text-muted">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Featured Projects */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="group bg-surface-elevated border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-secondary/30 hover:shadow-lg hover:shadow-secondary/10 h-full flex flex-col"
                >
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-surface to-surface-elevated overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <TrendingUp className="w-12 h-12 text-secondary" />
                      </div>
                    )}
                    
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5 text-white" />
                      </Link>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-2 py-1 bg-secondary/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-text-primary mb-3 group-hover:text-secondary transition-colors line-clamp-2">
                        {project.title}
                      </h3>

                      {/* Key Result */}
                      <div className="mb-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
                          <TrendingUp className="w-3 h-3 text-accent" />
                          <span className="text-sm font-medium text-accent">{project.result}</span>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.slice(0, 3).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-surface border border-border rounded text-xs text-text-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* View Details */}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 text-secondary font-medium text-sm hover:gap-3 transition-all"
                    >
                      View Case Study
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-lg transition-all duration-300 group"
              >
                View All Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-surface-elevated hover:bg-surface border border-border hover:border-secondary/30 text-text-primary font-medium rounded-lg transition-all duration-300"
              >
                Start Your Project
              </Link>
            </div>

            {/* Bottom Message */}
            <div className="mt-8 p-4 bg-surface-elevated/50 border border-border/50 rounded-lg inline-flex items-center gap-3">
              <Calendar className="w-5 h-5 text-secondary" />
              <div className="text-sm text-text-secondary">
                <span className="font-medium text-text-primary">Ready to build something amazing?</span>
                {' '}Book a free consultation to discuss your project.
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}