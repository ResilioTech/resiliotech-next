'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { ProjectFilter } from './ProjectFilter';
import { Project, ProjectFilter as FilterType } from '@/types/projects';

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [filter, setFilter] = useState<FilterType>({});
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.industry.toLowerCase().includes(searchLower) ||
        project.technologies.some(tech => 
          tech.name.toLowerCase().includes(searchLower)
        ) ||
        project.features.some(feature => 
          feature.toLowerCase().includes(searchLower)
        )
      );
    }

    // Apply category filter
    if (filter.category) {
      filtered = filtered.filter(project => project.category === filter.category);
    }

    // Apply technology filter
    if (filter.technology) {
      filtered = filtered.filter(project => 
        project.technologies.some(tech => tech.name === filter.technology)
      );
    }

    // Apply industry filter
    if (filter.industry) {
      filtered = filtered.filter(project => project.industry === filter.industry);
    }

    // Apply status filter
    if (filter.status) {
      filtered = filtered.filter(project => project.status === filter.status);
    }

    // Sort by featured first, then by publish date
    return filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  }, [projects, filter, searchTerm]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Filter Component */}
      <ProjectFilter
        onFilterChange={setFilter}
        onSearchChange={setSearchTerm}
        totalCount={projects.length}
        filteredCount={filteredProjects.length}
      />

      {/* No Results Message */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-surface-elevated border border-border rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No projects found
            </h3>
            <p className="text-text-secondary">
              Try adjusting your search criteria or clearing the filters.
            </p>
          </div>
        </motion.div>
      )}

      {/* Projects Grid */}
      {filteredProjects.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </motion.div>
      )}

      {/* Load More Button (for future pagination) */}
      {filteredProjects.length > 0 && filteredProjects.length >= 9 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-8"
        >
          <button className="px-8 py-3 bg-surface-elevated hover:bg-surface border border-border hover:border-primary/30 text-text-primary rounded-lg transition-all duration-300">
            Load More Projects
          </button>
        </motion.div>
      )}
    </div>
  );
}