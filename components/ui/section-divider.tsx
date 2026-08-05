'use client';

import { motion } from 'framer-motion';

export function SectionDivider({ label }: { label?: string }) {
  return (
    <motion.div
      className="max-w-6xl mx-auto px-6 flex items-center gap-4 py-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="h-px flex-1 bg-[var(--line)]" />
      {label && (
        <span className="text-[9px] font-mono tracking-widest text-[var(--faint)] uppercase px-2 select-none">
          {label}
        </span>
      )}
      <div className="h-px flex-1 bg-[var(--line)]" />
    </motion.div>
  );
}
