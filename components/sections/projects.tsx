'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, X, Monitor, Tablet, Smartphone, Github, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PROJECTS } from '@/lib/data';

type Project = (typeof PROJECTS)[number];
type DeviceMode = 'desktop' | 'tablet' | 'phone';

export function ProjectsSection() {
  const [active, setActive] = useState<Project | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <section id="work" className="py-32 relative">
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
            Selected Work
          </p>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-serif tracking-tight text-[var(--text)] leading-tight">
            Cases, not cards.
          </h2>
          <p className="mt-4 text-[var(--muted)] max-w-xl text-base">
            Open any project for device previews, architecture diagrams, data schema,
            authentication flows, and engineering decisions.
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="space-y-4">
          {PROJECTS.map((project, i) => (
            <motion.button
              key={project.key}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={reduceMotion ? {} : { x: 8 }}
              onClick={() => setActive(project)}
              className="w-full group grid grid-cols-[56px_1fr_auto] gap-5 items-start p-6 rounded-2xl border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--line-strong)] hover:bg-[var(--surface-strong)] transition-all duration-300 text-left"
              aria-label={`Open ${project.name} case study`}
            >
              <span className="text-4xl font-mono font-bold text-[var(--line-strong)] group-hover:text-[var(--accent)] transition-colors">
                {project.number}
              </span>
              <div>
                <p className="text-[10px] font-mono tracking-widest text-[var(--faint)] mb-1 uppercase">
                  {project.type}
                </p>
                <h3
                  className="text-2xl font-serif text-[var(--text)] group-hover:text-[var(--accent)] transition-colors"
                  style={{ color: undefined }}
                >
                  {project.name}
                </h3>
                <p className="mt-1.5 text-sm text-[var(--muted)] leading-relaxed max-w-2xl">
                  {project.tagline}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-[var(--surface-strong)] border border-[var(--line)] text-[var(--faint)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <ArrowUpRight
                size={20}
                className="text-[var(--faint)] group-hover:text-[var(--accent)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [device, setDevice] = useState<DeviceMode>('desktop');
  const [archHover, setArchHover] = useState<string | null>(null);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="fixed inset-4 md:inset-8 z-50 overflow-y-auto rounded-3xl border border-[var(--line-strong)] bg-[var(--bg)] shadow-2xl"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.name} case study`}
      >
        <div className="p-8 md:p-12 max-w-5xl mx-auto">
          {/* Close */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <p className="text-[10px] font-mono tracking-widest text-[var(--faint)] uppercase mb-2">
                {project.type}
              </p>
              <h2 className="text-4xl md:text-5xl font-serif text-[var(--text)]">{project.name}</h2>
              <p className="mt-2 text-[var(--muted)] max-w-xl">{project.summary}</p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 ml-4 p-2.5 rounded-xl border border-[var(--line)] hover:border-[var(--line-strong)] hover:bg-[var(--surface)] transition-all"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-10">
            {project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent)] text-[var(--accent-ink)] text-sm font-mono font-bold hover:opacity-90 transition-all"
              >
                Live Demo <ExternalLink size={14} />
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--line-strong)] text-[var(--text)] text-sm font-mono hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
            >
              <Github size={14} /> GitHub
            </a>
          </div>

          {/* Device Preview */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-5">
              <p className="text-[10px] font-mono tracking-widest text-[var(--faint)] uppercase">
                Device Preview
              </p>
              <div className="flex gap-1 ml-auto">
                {[
                  { mode: 'desktop' as DeviceMode, icon: <Monitor size={14} />, label: 'Desktop' },
                  { mode: 'tablet' as DeviceMode, icon: <Tablet size={14} />, label: 'Tablet' },
                  { mode: 'phone' as DeviceMode, icon: <Smartphone size={14} />, label: 'Phone' },
                ].map(({ mode, icon, label }) => (
                  <button
                    key={mode}
                    onClick={() => setDevice(mode)}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all',
                      device === mode
                        ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                        : 'text-[var(--muted)] border border-[var(--line)] hover:border-[var(--line-strong)]'
                    )}
                    aria-pressed={device === mode}
                    aria-label={label}
                  >
                    {icon} {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center p-8 rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={device}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <DeviceFrame mode={device} color={project.color} name={project.name} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Architecture */}
          <div className="mb-10">
            <p className="text-[10px] font-mono tracking-widest text-[var(--faint)] uppercase mb-5">
              System Architecture
            </p>
            <div className="relative">
              <div className="flex flex-wrap items-center gap-3">
                {project.architecture.map((node, i) => (
                  <div key={node.node} className="flex items-center gap-3">
                    <motion.div
                      className="relative group"
                      onMouseEnter={() => setArchHover(node.node)}
                      onMouseLeave={() => setArchHover(null)}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div
                        className="px-4 py-3 rounded-xl border border-[var(--line-strong)] bg-[var(--surface)] cursor-default transition-all"
                        style={{
                          borderColor: archHover === node.node ? project.color : undefined,
                          boxShadow: archHover === node.node ? `0 0 20px ${project.color}30` : undefined,
                        }}
                      >
                        <p className="text-[9px] font-mono tracking-widest text-[var(--faint)] uppercase">
                          {node.layer}
                        </p>
                        <p className="text-sm font-mono text-[var(--text)] mt-0.5">{node.node}</p>
                        <p className="text-[10px] text-[var(--faint)] mt-0.5">{node.tech}</p>
                      </div>
                    </motion.div>
                    {i < project.architecture.length - 1 && (
                      <motion.div
                        className="w-6 h-px bg-[var(--line-strong)]"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Case Study Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {[
              { label: 'Database Schema', value: project.db.join(' · ') },
              { label: 'Auth Flow', value: project.auth.join(' · ') },
              { label: 'Stack', value: project.stack.join(' · ') },
            ].map(({ label, value }) => (
              <div key={label} className="p-4 rounded-xl border border-[var(--line)] bg-[var(--surface)]">
                <p className="text-[9px] font-mono tracking-widest text-[var(--faint)] uppercase mb-2">{label}</p>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{value}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: 'Challenge', value: project.challenge },
              { label: 'Solution', value: project.solution },
              { label: 'Lessons Learned', value: project.lessons },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="p-5 rounded-xl border border-[var(--line-strong)] bg-[var(--surface)]"
              >
                <p className="text-[9px] font-mono tracking-widest text-[var(--faint)] uppercase mb-2">
                  {label}
                </p>
                <p className="text-sm text-[var(--text)] leading-relaxed">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}

function DeviceFrame({ mode, color, name }: { mode: DeviceMode; name: string; color: string }) {
  const configs = {
    desktop: { w: 400, h: 250, rx: 8, label: 'Laptop Mockup', bezel: 4 },
    tablet: { w: 240, h: 320, rx: 16, label: 'iPad View', bezel: 6 },
    phone: { w: 140, h: 280, rx: 24, label: 'Mobile View', bezel: 5 },
  };
  const c = configs[mode];

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative border-2 border-[var(--line-strong)] rounded-[inherit]"
        style={{
          width: c.w, height: c.h, borderRadius: c.rx,
          boxShadow: `0 24px 60px ${color}20, 0 0 0 ${c.bezel}px var(--bg-soft)`,
          background: `linear-gradient(135deg, color-mix(in srgb, ${color} 10%, var(--surface-strong)), var(--surface))`,
        }}
      >
        {/* Screen content */}
        <div className="absolute inset-[8px] rounded-[inherit] overflow-hidden flex flex-col items-center justify-center gap-2 bg-[var(--bg)]">
          <div className="w-8 h-8 rounded-xl" style={{ background: color, opacity: 0.7 }} />
          <p className="text-[8px] font-mono text-[var(--faint)]">{name}</p>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-0.5 rounded-full bg-[var(--line-strong)]" style={{ width: 20 + i * 8 }} />
            ))}
          </div>
        </div>
        {/* Notch for phone */}
        {mode === 'phone' && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-[var(--line-strong)]" />
        )}
        {/* Camera for tablet */}
        {mode === 'tablet' && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[var(--line-strong)]" />
        )}
      </div>
      <p className="text-[10px] font-mono text-[var(--faint)]">{c.label}</p>
    </div>
  );
}
