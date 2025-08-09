'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ExternalLink, 
  Github, 
  Calendar, 
  Users, 
  TrendingUp,
  Star,
  ArrowRight
} from 'lucide-react';
import { Project } from '@/types/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      },
    },
  };

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

  const getStatusColor = (status: string) => {
    const colors = {
      completed: 'text-accent bg-accent/10 border-accent/20',
      ongoing: 'text-primary bg-primary/10 border-primary/20',
      maintenance: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
    };
    return colors[status as keyof typeof colors] || colors.completed;
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <div className="h-full bg-surface-elevated border border-border rounded-xl overflow-hidden transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-xl group-hover:shadow-primary/10">
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 z-10">
            <div className="flex items-center gap-1 px-2 py-1 bg-accent/90 backdrop-blur-sm rounded-full">
              <Star className="w-3 h-3 text-white" />
              <span className="text-xs font-medium text-white">Featured</span>
            </div>
          </div>
        )}

        {/* Project Image */}
        <div className="relative h-48 bg-gradient-to-br from-surface to-surface-elevated overflow-hidden">
          {project.images.thumbnail ? (
            <Image
              src={project.images.thumbnail}
              alt={`Screenshot of ${project.title} - ${project.industry} project`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </div>
          )}
          
          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-5 h-5 text-white" />
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-5 h-5 text-white" />
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-5 h-5 text-white" />
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category and Status */}
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-2 py-1 text-xs font-medium border rounded-full capitalize ${getCategoryColor(project.category)}`}>
              {project.category}
            </span>
            <span className={`px-2 py-1 text-xs font-medium border rounded-full capitalize ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
            <span className="text-xs text-text-muted">
              {project.industry}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-text-secondary text-sm mb-4 leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Metrics */}
          <div className="flex items-center gap-4 text-xs text-text-muted mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {project.metrics.duration}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {project.metrics.teamSize} people
            </div>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1 mb-4">
            {project.technologies.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-surface border border-border rounded text-xs text-text-muted"
              >
                {tech.name}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 text-xs text-text-muted">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>

          {/* Results Preview */}
          {project.results.length > 0 && (
            <div className="mb-4">
              <div className="text-xs text-text-muted mb-2">Key Result:</div>
              <div className="text-sm text-accent font-medium">
                {project.results[0]}
              </div>
            </div>
          )}

          {/* View Details Link */}
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all group"
          >
            View Details
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
    </motion.div>
  );
}