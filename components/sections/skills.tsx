'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SKILLS } from '@/lib/data';

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(SKILLS[0].category);
  const activeGroup = SKILLS.find((s) => s.category === activeCategory)!;

  return (
    <section id="skills" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] font-mono tracking-widest text-[var(--faint)] uppercase mb-3">
            Toolkit
          </p>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-serif tracking-tight text-[var(--text)] leading-tight">
            One product mindset.{' '}
            <em className="text-[var(--accent)] not-italic">Every layer.</em>
          </h2>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {SKILLS.map((group) => (
            <button
              key={group.category}
              onClick={() => setActiveCategory(group.category)}
              className={cn(
                'px-5 py-2.5 rounded-xl text-sm font-mono font-medium transition-all duration-200',
                activeCategory === group.category
                  ? 'text-[var(--accent-ink)] shadow-lg'
                  : 'text-[var(--muted)] border border-[var(--line)] hover:border-[var(--line-strong)] hover:text-[var(--text)]'
              )}
              style={
                activeCategory === group.category
                  ? { background: group.color, boxShadow: `0 8px 30px ${group.color}40` }
                  : {}
              }
            >
              {group.category}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <motion.div
          key={activeCategory}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {activeGroup.items.map((skill, i) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={i}
              color={activeGroup.color}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface SkillItem {
  name: string;
  experience: string;
  confidence: number;
  projects: number;
  use: string;
  url: string;
}

function SkillCard({ skill, index, color }: { skill: SkillItem; index: number; color: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group rounded-2xl border border-[var(--line)] bg-[var(--surface)] overflow-hidden cursor-default transition-all duration-300"
      style={{
        borderColor: hovered ? color : undefined,
        boxShadow: hovered ? `0 0 30px ${color}25` : undefined,
      }}
    >
      <div className="p-5">
        {/* Name row */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-mono font-bold text-[var(--text)]">{skill.name}</h3>
          <a
            href={skill.url}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-lg text-[var(--faint)] hover:text-[var(--text)] hover:bg-[var(--surface-strong)] transition-all"
            aria-label={`Visit ${skill.name} documentation`}
          >
            <ExternalLink size={13} />
          </a>
        </div>

        {/* Confidence bar */}
        <div className="mb-4">
          <div className="flex justify-between text-[10px] font-mono text-[var(--faint)] mb-1.5">
            <span>Confidence</span>
            <span>{skill.confidence}%</span>
          </div>
          <div className="h-1 rounded-full bg-[var(--line)] overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: color }}
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.confidence}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.06, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-xl bg-[var(--surface-strong)] border border-[var(--line)]">
            <p className="text-[9px] font-mono text-[var(--faint)] uppercase tracking-widest">Experience</p>
            <p className="text-xs font-mono text-[var(--text)] mt-0.5">{skill.experience}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-[var(--surface-strong)] border border-[var(--line)]">
            <p className="text-[9px] font-mono text-[var(--faint)] uppercase tracking-widest">Projects</p>
            <p className="text-xs font-mono text-[var(--text)] mt-0.5">{skill.projects} built</p>
          </div>
        </div>

        {/* Use cases - revealed on hover */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden"
        >
          <div className="mt-3 p-2.5 rounded-xl bg-[var(--surface-strong)] border border-[var(--line)]">
            <p className="text-[9px] font-mono text-[var(--faint)] uppercase tracking-widest mb-1">Use Cases</p>
            <p className="text-xs text-[var(--muted)] leading-relaxed">{skill.use}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
