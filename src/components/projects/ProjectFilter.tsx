'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { ProjectFilter as FilterType } from '@/types/projects';

interface ProjectFilterProps {
  onFilterChange: (filter: FilterType) => void;
  onSearchChange: (search: string) => void;
  totalCount: number;
  filteredCount: number;
}

export function ProjectFilter({ 
  onFilterChange, 
  onSearchChange, 
  totalCount, 
  filteredCount 
}: ProjectFilterProps) {
  const [activeFilters, setActiveFilters] = useState<FilterType>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { value: 'web', label: 'Web Applications' },
    { value: 'mobile', label: 'Mobile Apps' },
    { value: 'api', label: 'APIs & Backend' },
    { value: 'devops', label: 'DevOps & Infrastructure' }
  ];

  const technologies = [
    'React', 'Node.js', 'TypeScript', 'Python', 'Docker', 
    'Kubernetes', 'AWS', 'PostgreSQL', 'MongoDB', 'Redis'
  ];

  const industries = [
    'E-commerce', 'Fintech', 'SaaS', 'Healthcare', 'Education', 
    'Data Analytics', 'Manufacturing', 'Real Estate'
  ];

  const statuses = [
    { value: 'completed', label: 'Completed' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'maintenance', label: 'Maintenance' }
  ];

  const handleFilterChange = (filterType: keyof FilterType, value: string | undefined) => {
    const newFilters = {
      ...activeFilters,
      [filterType]: value
    };

    // Remove undefined values
    Object.keys(newFilters).forEach(key => {
      if (newFilters[key as keyof FilterType] === undefined) {
        delete newFilters[key as keyof FilterType];
      }
    });

    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearchChange(value);
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    setSearchTerm('');
    onFilterChange({});
    onSearchChange('');
  };

  const activeFilterCount = Object.keys(activeFilters).length + (searchTerm ? 1 : 0);

  return (
    <div className="space-y-6">
      {/* Search and Filter Toggle */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
          />
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-3 bg-surface-elevated border border-border rounded-lg text-text-primary hover:bg-surface transition-colors"
        >
          <Filter className="w-5 h-5" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Clear Filters */}
        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-2 px-4 py-3 text-text-muted hover:text-text-primary transition-colors"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-text-secondary">
          Showing {filteredCount} of {totalCount} projects
        </p>
      </div>

      {/* Filter Panel */}
      <motion.div
        initial={false}
        animate={{ height: showFilters ? 'auto' : 0, opacity: showFilters ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-6 bg-surface-elevated border border-border rounded-lg space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Category
              </label>
              <select
                value={activeFilters.category || ''}
                onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
                className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Technology Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Technology
              </label>
              <select
                value={activeFilters.technology || ''}
                onChange={(e) => handleFilterChange('technology', e.target.value || undefined)}
                className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">All Technologies</option>
                {technologies.map((tech) => (
                  <option key={tech} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>
            </div>

            {/* Industry Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Industry
              </label>
              <select
                value={activeFilters.industry || ''}
                onChange={(e) => handleFilterChange('industry', e.target.value || undefined)}
                className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">All Industries</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Status
              </label>
              <select
                value={activeFilters.status || ''}
                onChange={(e) => handleFilterChange('status', e.target.value || undefined)}
                className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">All Statuses</option>
                {statuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFilterCount > 0 && (
            <div>
              <p className="text-sm font-medium text-text-primary mb-3">Active Filters:</p>
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                    <span className="text-sm text-primary">Search: {searchTerm}</span>
                    <button
                      onClick={() => handleSearchChange('')}
                      className="text-primary hover:text-primary-hover"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {Object.entries(activeFilters).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full">
                    <span className="text-sm text-secondary capitalize">
                      {key}: {value}
                    </span>
                    <button
                      onClick={() => handleFilterChange(key as keyof FilterType, undefined)}
                      className="text-secondary hover:text-secondary/80"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}