'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, MotionValue, useReducedMotion } from 'framer-motion';
import { STORY_CHAPTERS } from '@/lib/data';

export function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const chapterCount = STORY_CHAPTERS.length;

  return (
    <section id="story" ref={containerRef} style={{ height: `${chapterCount * 70}vh` }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background grid pulse */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
          {STORY_CHAPTERS.map((chapter, idx) => (
            <Chapter
              key={chapter.id}
              chapter={chapter}
              index={idx}
              total={chapterCount}
              scrollYProgress={scrollYProgress}
              reduceMotion={reduceMotion ?? false}
            />
          ))}
        </div>

        {/* Progress dots */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 hidden lg:flex">
          {STORY_CHAPTERS.map((_, idx) => (
            <ProgressDot
              key={idx}
              index={idx}
              total={chapterCount}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Chapter({
  chapter,
  index,
  total,
  scrollYProgress,
  reduceMotion,
}: {
  chapter: (typeof STORY_CHAPTERS)[number];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const start = index / total;
  const mid = (index + 0.5) / total;
  const end = (index + 1) / total;

  const opacity = useTransform(scrollYProgress, [start, mid, end], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [start, mid, end], [40, 0, -40]);
  const scale = useTransform(scrollYProgress, [start, mid, end], [0.88, 1, 0.88]);
  const blurPx = useTransform(scrollYProgress, [start, mid, end], [12, 0, 12]);
  const blurFilter = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center px-6"
      style={
        reduceMotion
          ? { opacity: index === 0 ? 1 : 0 }
          : { opacity, y, scale, filter: blurFilter }
      }
    >
      <motion.h2
        className="text-[clamp(2.8rem,8vw,7rem)] font-serif leading-tight tracking-tight transition-colors"
        style={{ color: chapter.accent ? 'var(--accent)' : 'var(--text)' }}
      >
        {chapter.label}
      </motion.h2>
      {chapter.sub && (
        <motion.p className="mt-4 text-[var(--faint)] font-mono text-sm md:text-base tracking-wide max-w-md text-center">
          {chapter.sub}
        </motion.p>
      )}
    </motion.div>
  );
}

function ProgressDot({
  index,
  total,
  scrollYProgress,
}: {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = index / total;
  const mid = (index + 0.5) / total;
  const end = (index + 1) / total;

  const opacity = useTransform(scrollYProgress, [start, mid, end], [0.25, 1, 0.25]);
  const scale = useTransform(scrollYProgress, [start, mid, end], [0.8, 1.6, 0.8]);

  return (
    <motion.span
      className="block w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
      style={{ opacity, scale }}
    />
  );
}
