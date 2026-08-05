'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Clock, Send, ArrowUpRight } from 'lucide-react';

export function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mailto fallback with form data
    const subject = encodeURIComponent(`Portfolio Contact from ${formState.name}`);
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`);
    window.location.href = `mailto:rakibulrayhan63@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const LINKS = [
    { icon: <Mail size={16} />, label: 'Email', value: 'rakibulrayhan63@gmail.com', href: 'mailto:rakibulrayhan63@gmail.com' },
    { icon: <Github size={16} />, label: 'GitHub', value: 'github.com/Ray37han', href: 'https://github.com/Ray37han' },
    { icon: <Linkedin size={16} />, label: 'LinkedIn', value: 'linkedin.com/in/rayhan', href: 'https://linkedin.com' },
    { icon: <MapPin size={16} />, label: 'Location', value: 'Rajshahi, Bangladesh', href: null },
    { icon: <Clock size={16} />, label: 'Availability', value: 'Open to Internships & Collabs', href: null },
  ];

  return (
    <section id="contact" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Divider */}
        <div className="h-px bg-[var(--line)] mb-24" />

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] font-mono tracking-widest text-[var(--faint)] uppercase mb-4">
              Let&apos;s Build
            </p>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-serif tracking-tight text-[var(--text)] leading-tight mb-6">
              Ideas deserve{' '}
              <em className="text-[var(--accent)] not-italic">momentum.</em>
            </h2>
            <p className="text-[var(--muted)] leading-relaxed mb-10 max-w-md">
              Open to internships, full-stack collaboration, freelance projects, and
              open-source contributions. If you have an idea, I&apos;m listening.
            </p>

            <div className="space-y-1">
              {LINKS.map((link) => (
                <div key={link.label}>
                  {link.href ? (
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-4 py-4 border-b border-[var(--line)] text-[var(--text)] hover:text-[var(--accent)] transition-all duration-200"
                    >
                      <div className="flex items-center gap-3 text-[var(--faint)] group-hover:text-[var(--accent)]">
                        {link.icon}
                        <span className="text-xs font-mono tracking-widest uppercase">{link.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono">{link.value}</span>
                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center justify-between gap-4 py-4 border-b border-[var(--line)]">
                      <div className="flex items-center gap-3 text-[var(--faint)]">
                        {link.icon}
                        <span className="text-xs font-mono tracking-widest uppercase">{link.label}</span>
                      </div>
                      <span className="text-sm font-mono text-[var(--muted)]">{link.value}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-12 rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)]"
              >
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-2xl font-serif text-[var(--text)] mb-2">Message sent!</h3>
                <p className="text-[var(--muted)] text-sm">Your email client opened. I&apos;ll get back to you soon.</p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 p-8 rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)]"
                noValidate
              >
                <p className="text-[10px] font-mono tracking-widest text-[var(--faint)] uppercase mb-6">
                  Send a message
                </p>
                <div>
                  <label htmlFor="name" className="block text-[10px] font-mono text-[var(--faint)] uppercase tracking-widest mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--surface-strong)] text-[var(--text)] font-mono text-sm outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--faint)]"
                    placeholder="Rayhan"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[10px] font-mono text-[var(--faint)] uppercase tracking-widest mb-1.5">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--surface-strong)] text-[var(--text)] font-mono text-sm outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--faint)]"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-[10px] font-mono text-[var(--faint)] uppercase tracking-widest mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--surface-strong)] text-[var(--text)] font-mono text-sm outline-none focus:border-[var(--accent)] transition-colors resize-none placeholder:text-[var(--faint)]"
                    placeholder="Hey Rayhan, I have a project idea..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[var(--accent)] text-[var(--accent-ink)] font-mono font-bold text-sm hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[color-mix(in_srgb,var(--accent)_30%,transparent)]"
                >
                  Send Message <Send size={15} />
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-[var(--line)] flex flex-wrap justify-between gap-4 text-[10px] font-mono text-[var(--faint)] tracking-widest uppercase">
          <span>© 2025 Rakibul Hasan Rayhan</span>
          <span>Built with Next.js + Framer Motion</span>
          <span>CSE @ RUET</span>
        </div>
      </div>
    </section>
  );
}
