'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/providers/theme-provider';
import { THEMES, THEME_LABELS } from '@/lib/data';

const NAV_LINKS = [
  { href: '#story', label: 'Story' },
  { href: '#work', label: 'Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#stats', label: 'Stats' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > lastY.current && latest > 80) {
      setHidden(true);
      setMenuOpen(false);
      setThemeOpen(false);
    } else {
      setHidden(false);
    }
    lastY.current = latest;
  });

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-4 left-1/2 z-50 -translate-x-1/2"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)] backdrop-blur-xl shadow-xl shadow-black/20">
          {/* Brand */}
          <a
            href="#top"
            className="mr-2 font-mono text-xs font-bold tracking-widest text-[var(--accent)] px-2 py-1 rounded-lg border border-[var(--line)] hover:bg-[var(--accent)] hover:text-[var(--accent-ink)] transition-all duration-200"
          >
            RH
          </a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-mono font-medium tracking-wide transition-all duration-200',
                  activeSection === link.href.slice(1)
                    ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                    : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-strong)]'
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block w-px h-4 bg-[var(--line-strong)] mx-1" />

          {/* Theme Switcher Button */}
          <button
            onClick={() => setThemeOpen(!themeOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-strong)] transition-all duration-200 border border-transparent hover:border-[var(--line)]"
            aria-label="Switch theme"
          >
            <Sparkles size={12} className="text-[var(--accent)]" />
            <span className="hidden sm:inline capitalize">{theme}</span>
          </button>

          {/* Mobile Menu */}
          <button
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-strong)] transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </nav>
      </motion.header>

      {/* Theme Panel */}
      <AnimatePresence>
        {themeOpen && (
          <motion.div
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-72 rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)] backdrop-blur-xl shadow-2xl p-4"
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-[10px] font-mono tracking-widest text-[var(--faint)] mb-3 uppercase">
              Choose a World
            </p>
            <div className="grid grid-cols-3 gap-2">
              {THEMES.map((t) => (
                <button
                  key={t}
                  onClick={() => { setTheme(t); setThemeOpen(false); }}
                  className={cn(
                    'px-2 py-2 rounded-xl text-[10px] font-mono capitalize transition-all duration-200 text-left',
                    t === theme
                      ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold'
                      : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-strong)] border border-[var(--line)]'
                  )}
                >
                  {THEME_LABELS[t]}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Nav Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed top-20 inset-x-4 z-50 rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)] backdrop-blur-xl shadow-2xl p-4 md:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-mono text-[var(--text)] hover:bg-[var(--surface-strong)] hover:text-[var(--accent)] transition-all"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 pt-2 border-t border-[var(--line)]">
                <p className="text-[10px] font-mono text-[var(--faint)] mb-2">Theme</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {THEMES.map((t) => (
                    <button
                      key={t}
                      onClick={() => { setTheme(t); setMenuOpen(false); }}
                      className={cn(
                        'py-1.5 rounded-lg text-[10px] font-mono capitalize',
                        t === theme ? 'bg-[var(--accent)] text-[var(--accent-ink)]' : 'text-[var(--muted)] border border-[var(--line)]'
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {(themeOpen || menuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setThemeOpen(false); setMenuOpen(false); }}
        />
      )}
    </>
  );
}
