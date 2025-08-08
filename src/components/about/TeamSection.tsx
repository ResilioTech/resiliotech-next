'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Linkedin, 
  Github, 
  Twitter, 
  Mail,
  Users,
  Star
} from 'lucide-react';
import { TeamMember } from '@/types/company';

interface TeamSectionProps {
  teamMembers: TeamMember[];
}

export function TeamSection({ teamMembers }: TeamSectionProps) {
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

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin': return Linkedin;
      case 'github': return Github;
      case 'twitter': return Twitter;
      case 'email': return Mail;
      default: return Mail;
    }
  };

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full text-sm font-medium text-secondary mb-6">
              <Users className="w-4 h-4" />
              Meet the Team
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              The People Behind <span className="text-secondary">Resiliotech</span>
            </h2>
            
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Our team combines decades of experience from leading tech companies with a passion 
              for helping startups succeed. We're not just consultants – we're your infrastructure partners.
            </p>
          </motion.div>

          {/* Team Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group bg-surface-elevated border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-secondary/30 hover:shadow-lg hover:shadow-secondary/10"
              >
                {/* Avatar */}
                <div className="relative aspect-square bg-gradient-to-br from-secondary/20 to-primary/20 overflow-hidden">
                  {member.avatar ? (
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-20 h-20 bg-secondary/30 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-secondary">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Experience Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="px-2 py-1 bg-black/70 backdrop-blur-sm rounded-full">
                      <span className="text-xs font-medium text-white">{member.experience}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-text-primary mb-1 group-hover:text-secondary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium text-secondary mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed line-clamp-4">
                      {member.bio}
                    </p>
                  </div>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {member.expertise.slice(0, 2).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-surface border border-border rounded text-xs text-text-muted"
                      >
                        {skill}
                      </span>
                    ))}
                    {member.expertise.length > 2 && (
                      <span className="px-2 py-1 text-xs text-text-muted">
                        +{member.expertise.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center gap-3">
                    {Object.entries(member.social).map(([platform, url]) => {
                      if (!url) return null;
                      const IconComponent = getSocialIcon(platform);
                      
                      return (
                        <Link
                          key={platform}
                          href={url}
                          target={platform !== 'email' ? '_blank' : undefined}
                          rel={platform !== 'email' ? 'noopener noreferrer' : undefined}
                          className="p-2 bg-surface hover:bg-surface-elevated border border-border hover:border-secondary/30 rounded-lg transition-all group/social"
                        >
                          <IconComponent className="w-4 h-4 text-text-muted group-hover/social:text-secondary transition-colors" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Team Culture */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="max-w-4xl mx-auto p-8 bg-surface-elevated border border-border rounded-2xl">
              <Star className="w-8 h-8 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-text-primary mb-4">Why Our Team Excels</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                <div>
                  <h4 className="font-semibold text-text-primary mb-2">Deep Technical Expertise</h4>
                  <p className="text-sm text-text-secondary">
                    Our team has collectively managed infrastructure at scale for companies processing 
                    billions of requests per day.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-2">Startup Mindset</h4>
                  <p className="text-sm text-text-secondary">
                    We understand the unique challenges of growing companies and move at startup speed 
                    while maintaining enterprise quality.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-2">Continuous Learning</h4>
                  <p className="text-sm text-text-secondary">
                    Technology evolves rapidly, and our team dedicates 20% of their time to learning 
                    and experimenting with new tools.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}