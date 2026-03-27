'use client';

import { motion } from 'framer-motion';
import { 
  Users,
  Star,
  Shield,
  Server,
  BrainCircuit,
  Megaphone
} from 'lucide-react';
import { cn } from '@/lib/utils';

const credentials = [
  {
    icon: Shield,
    text: '6+ years of SRE experience from Fortune 500 identity & security infrastructure',
  },
  {
    icon: Server,
    text: 'Managed production systems handling millions of authentication requests daily',
  },
  {
    icon: BrainCircuit,
    text: 'Deep infrastructure expertise combined with modern AI/ML knowledge',
  },
];

export function TeamSection() {
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
              Our Team
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Our <span className="text-secondary">Team</span>
            </h2>
            
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              We bring deep production infrastructure expertise to the AI reliability space —
              battle-tested at scale, now focused on making AI work in the real world.
            </p>
          </motion.div>

          {/* Credential Cards */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {credentials.map((credential, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className={cn(
                  'group bg-surface-elevated border border-border rounded-xl p-8',
                  'transition-all duration-300 hover:border-secondary/30 hover:shadow-lg hover:shadow-secondary/10'
                )}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-secondary/10 border border-secondary/20 rounded-xl mb-6 group-hover:bg-secondary/20 transition-colors">
                  <credential.icon className="w-7 h-7 text-secondary" />
                </div>
                <p className="text-lg text-text-secondary leading-relaxed">
                  {credential.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Building in Public */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="max-w-4xl mx-auto p-8 bg-surface-elevated border border-border rounded-2xl">
              <Megaphone className="w-8 h-8 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-text-primary mb-4">Building in Public</h3>
              <p className="text-text-secondary leading-relaxed max-w-2xl mx-auto mb-6">
                We believe in radical transparency. Our roadmap, changelog, and progress are all
                public. No fake testimonials, no fabricated case studies — just real engineering
                work shared openly.
              </p>
              <div className="flex items-center justify-center gap-2 text-text-muted">
                <Star className="w-4 h-4 text-accent" />
                <span className="text-sm">Follow our journey on our public roadmap and changelog</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}