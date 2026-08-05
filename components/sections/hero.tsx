'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Download, Mail, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const ROLES = [
  'Full Stack Developer',
  'AI-Powered Builder',
  'Problem Solver',
  'MERN Stack Engineer',
  'Builder of Digital Products',
];

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = 0, h = 0;

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string;
    }

    const particles: Particle[] = [];
    const COLORS = ['var(--accent)', 'var(--accent-2)', 'var(--text)'];

    function resize() {
      w = canvas!.width = canvas!.offsetWidth;
      h = canvas!.height = canvas!.offsetHeight;
    }

    function init() {
      resize();
      particles.length = 0;
      const count = Math.min(80, Math.floor(w / 14));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.8 + 0.4,
          opacity: Math.random() * 0.5 + 0.1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = p.opacity;
        ctx!.fill();

        // Lines to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = p.color;
            ctx!.globalAlpha = (1 - dist / 90) * 0.12;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      });
      ctx!.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    }

    init();
    draw();
    window.addEventListener('resize', init);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', init);
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      aria-hidden="true"
    />
  );
}

function TypingText() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [deleting, setDeleting] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) { setTyped(ROLES[0]); return; }
    const role = ROLES[roleIdx];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (typed.length < role.length) {
        timer = setTimeout(() => setTyped(role.slice(0, typed.length + 1)), 60);
      } else {
        timer = setTimeout(() => setDeleting(true), 2200);
      }
    } else {
      if (typed.length > 0) {
        timer = setTimeout(() => setTyped(typed.slice(0, -1)), 30);
      } else {
        setDeleting(false);
        setRoleIdx((idx) => (idx + 1) % ROLES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [typed, deleting, roleIdx, reduceMotion]);

  return (
    <span className="text-[var(--accent)] font-mono">
      {typed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  const container: import('framer-motion').Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } },
  };

  const item: import('framer-motion').Variants = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 32 },
    show: reduceMotion
      ? {}
      : { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <ParticleField />

      {/* Glowing gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 70% 10%, color-mix(in srgb, var(--accent) 18%, transparent), transparent), radial-gradient(ellipse 50% 55% at 10% 80%, color-mix(in srgb, var(--accent-2) 14%, transparent), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-28 pb-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          {/* Availability badge */}
          <motion.div variants={item} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--line-strong)] bg-[var(--surface)] backdrop-blur-sm text-[11px] font-mono tracking-widest text-[var(--muted)] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for Internships & Collaboration
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={item}
            className="text-[clamp(3.5rem,10vw,8rem)] font-serif leading-[0.9] tracking-tight text-[var(--text)] mb-6"
          >
            Hello,{' '}
            <br />
            <em className="text-[var(--accent)] not-italic">I&apos;m Rayhan.</em>
          </motion.h1>

          {/* Typing effect */}
          <motion.p
            variants={item}
            className="text-xl md:text-2xl text-[var(--muted)] mb-4 font-light"
          >
            <TypingText />
          </motion.p>

          {/* Sub tagline */}
          <motion.p
            variants={item}
            className="text-[var(--faint)] max-w-xl text-base leading-relaxed mb-10 font-mono text-sm"
          >
            CSE student @ RUET. I build full-stack products — from database schema to
            polished interface. Currently exploring AI-assisted development.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex flex-wrap gap-4">
            <MagneticButton
              href="#work"
              variant="primary"
              icon={<ExternalLink size={16} />}
            >
              View Projects
            </MagneticButton>
            <MagneticButton
              href="mailto:rakibulrayhan63@gmail.com"
              variant="secondary"
              icon={<Mail size={16} />}
            >
              Hire Me
            </MagneticButton>
            <MagneticButton
              href="/rakibul-hasan-rayhan-resume.pdf"
              download
              variant="ghost"
              icon={<Download size={16} />}
            >
              Resume
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-[10px] font-mono text-[var(--faint)] tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={16} className="text-[var(--accent)]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  variant: 'primary' | 'secondary' | 'ghost';
  icon?: React.ReactNode;
  download?: boolean;
}

function MagneticButton({ href, children, variant, icon, download }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    ref.current.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0,0)';
  };

  const base =
    'inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-mono text-sm font-medium tracking-wide transition-all duration-300';
  const variants = {
    primary:
      'bg-[var(--accent)] text-[var(--accent-ink)] hover:opacity-90 hover:scale-105 shadow-lg shadow-[color-mix(in_srgb,var(--accent)_30%,transparent)]',
    secondary:
      'border border-[var(--line-strong)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--surface-strong)] backdrop-blur-sm',
    ghost:
      'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-strong)] border border-transparent hover:border-[var(--line)]',
  };

  return (
    <a
      ref={ref}
      href={href}
      download={download}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(base, variants[variant])}
      style={{ transition: 'transform 0.15s ease, opacity 0.2s, scale 0.2s, background 0.2s, border-color 0.2s, color 0.2s' }}
    >
      {children}
      {icon}
    </a>
  );
}
