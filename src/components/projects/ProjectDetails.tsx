'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Users,
  TrendingUp,
  CheckCircle,
  Star,
  Clock,
  Building,
  Target,
  Lightbulb,
  Award
} from 'lucide-react';
import { Project } from '@/types/projects';

interface ProjectDetailsProps {
  project: Project;
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const getCategoryColor = (category: string) => {
    const colors = {
      web: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
      mobile: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
      api: 'text-green-400 bg-green-400/10 border-green-400/20',
      devops: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
      other: 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    };
    return colors[category as keyof typeof colors] || colors.other;
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
            
            <div className="flex items-center gap-3">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Live
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-surface-elevated hover:bg-surface border border-border hover:border-primary/30 text-text-primary rounded-lg transition-all"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-16 bg-gradient-to-br from-surface to-surface-elevated"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className={`px-3 py-1 text-sm font-medium border rounded-full capitalize ${getCategoryColor(project.category)}`}>
                  {project.category}
                </span>
                <span className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-sm font-medium rounded-full capitalize">
                  {project.status}
                </span>
                <span className="px-3 py-1 bg-surface border border-border text-text-muted text-sm rounded-full">
                  {project.industry}
                </span>
                {project.featured && (
                  <span className="px-3 py-1 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-sm font-medium rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Featured
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
                {project.title}
              </h1>

              {/* Description */}
              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                {project.fullDescription}
              </p>

              {/* Project Info */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-2 text-text-muted mb-2">
                    <Building className="w-4 h-4" />
                    <span className="text-sm">Client</span>
                  </div>
                  <p className="font-semibold text-text-primary">{project.client.name}</p>
                  <p className="text-sm text-text-muted capitalize">{project.client.type}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-text-muted mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Duration</span>
                  </div>
                  <p className="font-semibold text-text-primary">{project.metrics.duration}</p>
                  <p className="text-sm text-text-muted">{project.metrics.teamSize} team members</p>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.metrics.performanceImprovement && (
                  <div className="p-4 bg-background border border-border rounded-lg">
                    <TrendingUp className="w-5 h-5 text-accent mb-2" />
                    <p className="font-semibold text-text-primary text-sm">Performance</p>
                    <p className="text-accent">{project.metrics.performanceImprovement}</p>
                  </div>
                )}
                {project.metrics.costSavings && (
                  <div className="p-4 bg-background border border-border rounded-lg">
                    <Award className="w-5 h-5 text-primary mb-2" />
                    <p className="font-semibold text-text-primary text-sm">Cost Savings</p>
                    <p className="text-primary">{project.metrics.costSavings}</p>
                  </div>
                )}
                {project.metrics.userGrowth && (
                  <div className="p-4 bg-background border border-border rounded-lg">
                    <Users className="w-5 h-5 text-secondary mb-2" />
                    <p className="font-semibold text-text-primary text-sm">User Growth</p>
                    <p className="text-secondary">{project.metrics.userGrowth}</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Project Image */}
            <motion.div variants={itemVariants} className="relative">
              <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-surface-elevated to-background border border-border">
                {project.images.hero ? (
                  <Image
                    src={project.images.hero}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="w-16 h-16 text-primary mx-auto mb-4" />
                      <p className="text-text-muted">Project Showcase</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Challenge */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <Target className="w-5 h-5 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-text-primary">The Challenge</h2>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-text-secondary leading-relaxed">{project.challenge}</p>
              </div>
            </motion.section>

            {/* Solution */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-text-primary">Our Solution</h2>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-text-secondary leading-relaxed">{project.solution}</p>
              </div>
            </motion.section>

            {/* Results */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-accent/10 border border-accent/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-text-primary">Results Achieved</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 p-4 bg-surface-elevated border border-border rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary">{result}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Features */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-text-primary mb-6">Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-surface-elevated/50 border border-border/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Testimonial */}
            {project.testimonial && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="p-8 bg-surface-elevated border border-border rounded-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <blockquote className="text-lg text-text-primary mb-4 italic">
                      "{project.testimonial.content}"
                    </blockquote>
                    <div>
                      <p className="font-semibold text-text-primary">{project.testimonial.author.name}</p>
                      <p className="text-text-muted text-sm">{project.testimonial.author.role} at {project.testimonial.author.company}</p>
                    </div>
                    {project.testimonial.rating && (
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(project.testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="p-6 bg-surface-elevated border border-border rounded-xl"
            >
              <h3 className="text-lg font-bold text-text-primary mb-4">Technologies Used</h3>
              <div className="space-y-3">
                {project.technologies.map((tech, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-text-secondary">{tech.name}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      tech.proficiency === 'expert' ? 'bg-accent/10 text-accent' :
                      tech.proficiency === 'advanced' ? 'bg-primary/10 text-primary' :
                      'bg-surface border border-border text-text-muted'
                    }`}>
                      {tech.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Project Details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-surface-elevated border border-border rounded-xl"
            >
              <h3 className="text-lg font-bold text-text-primary mb-4">Project Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-text-muted mb-1">Published</p>
                  <p className="text-text-primary">{new Date(project.publishedAt).toLocaleDateString()}</p>
                </div>
                {project.completedAt && (
                  <div>
                    <p className="text-sm text-text-muted mb-1">Completed</p>
                    <p className="text-text-primary">{new Date(project.completedAt).toLocaleDateString()}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-text-muted mb-1">Client Type</p>
                  <p className="text-text-primary capitalize">{project.client.type}</p>
                </div>
                {project.client.size && (
                  <div>
                    <p className="text-sm text-text-muted mb-1">Company Size</p>
                    <p className="text-text-primary">{project.client.size}</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-xl text-center"
            >
              <h3 className="text-lg font-bold text-text-primary mb-2">Interested in Similar Work?</h3>
              <p className="text-text-secondary text-sm mb-4">
                Let&apos;s discuss how we can help with your next project.
              </p>
              <Link
                href="/contact"
                className="inline-block w-full px-4 py-2 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors"
              >
                Get In Touch
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}