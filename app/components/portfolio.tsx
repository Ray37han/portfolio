'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════ */
const THEMES = ['dark', 'light', 'matrix', 'cyberpunk', 'synthwave', 'hacker', 'space', 'glass', 'retro'] as const;
type Theme = typeof THEMES[number];
const THEME_DOTS: Record<Theme, string> = { dark: '#e0aa5b', light: '#af6e22', matrix: '#76f187', cyberpunk: '#ff4da6', synthwave: '#fa63db', hacker: '#cafc57', space: '#9ba7ff', glass: '#82ece1', retro: '#ffca57' };

const ROLES = ['Full-Stack Developer', 'MERN Engineer', 'Mobile Builder', 'Open-Source Contributor', 'Product Thinker'];

const STORY_CHAPTERS = [
  { id: 1, label: 'Code becomes', accent: false, sub: null },
  { id: 2, label: 'an experience.', accent: true, sub: null },
  { id: 3, label: 'I build things', accent: false, sub: 'From database schema to pixel-perfect interface' },
  { id: 4, label: 'end to end.', accent: true, sub: null },
  { id: 5, label: 'Foundations:', accent: false, sub: null },
  { id: 6, label: 'C · Java · Flutter', accent: false, sub: 'Problem-solving shaped my thinking first' },
  { id: 7, label: 'Then React.', accent: true, sub: 'And Node. And MongoDB. The full picture.' },
  { id: 8, label: 'Products,', accent: false, sub: null },
  { id: 9, label: 'not just projects.', accent: true, sub: 'I think about users, not only output' },
  { id: 10, label: 'AI as a tool,', accent: false, sub: 'Not a replacement for craft and judgment' },
  { id: 11, label: 'not a crutch.', accent: true, sub: null },
  { id: 12, label: 'Always learning.', accent: false, sub: 'CSE · RUET · Rajshahi, Bangladesh' },
  { id: 13, label: "Let's build.", accent: true, sub: 'Open for internships & collaboration' },
];

const SKILLS_DATA = {
  Frontend: [
    { name: 'React', level: .92, exp: '2 yrs', proj: '12+', use: 'E-commerce UIs, portfolios, dashboards' },
    { name: 'Next.js', level: .85, exp: '1.5 yrs', proj: '6+', use: 'SSR apps, personal sites, SEO-first builds' },
    { name: 'TypeScript', level: .78, exp: '1 yr', proj: '8+', use: 'Type-safe APIs and component contracts' },
    { name: 'Tailwind CSS', level: .90, exp: '2 yrs', proj: '10+', use: 'Rapid utility-first styling and design systems' },
    { name: 'Framer Motion', level: .75, exp: '1 yr', proj: '4+', use: 'Scroll animations, page transitions, micro-interactions' },
  ],
  Backend: [
    { name: 'Node.js', level: .88, exp: '2 yrs', proj: '10+', use: 'REST APIs, auth servers, background jobs' },
    { name: 'Express', level: .90, exp: '2 yrs', proj: '10+', use: 'Routing, middleware, JWT auth layers' },
    { name: 'MongoDB', level: .84, exp: '2 yrs', proj: '9+', use: 'Flexible schemas, catalog data, user stores' },
    { name: 'PostgreSQL', level: .70, exp: '1 yr', proj: '3+', use: 'Relational data, transactions, Prisma ORM' },
    { name: 'REST API Design', level: .86, exp: '2 yrs', proj: '8+', use: 'CRUD endpoints, pagination, error handling' },
  ],
  Mobile: [
    { name: 'Flutter', level: .80, exp: '1.5 yrs', proj: '4+', use: 'Cross-platform iOS/Android apps' },
    { name: 'Dart', level: .78, exp: '1.5 yrs', proj: '4+', use: 'Flutter business logic, state management' },
    { name: 'Provider', level: .76, exp: '1 yr', proj: '3+', use: 'Reactive state in Flutter apps' },
  ],
  Tools: [
    { name: 'Git & GitHub', level: .90, exp: '2 yrs', proj: '20+', use: 'Version control, PRs, team collaboration' },
    { name: 'Docker', level: .60, exp: '6 mo', proj: '2+', use: 'Containerised dev environments' },
    { name: 'Prisma ORM', level: .72, exp: '1 yr', proj: '3+', use: 'Type-safe database access with migrations' },
    { name: 'Python', level: .65, exp: '1 yr', proj: '3+', use: 'ML scripts, data processing, LangChain' },
  ],
};

const PROJECTS = [
  {
    key: 'vybe', num: '01', type: 'MERN · E-commerce', name: 'Vybebd.store',
    link: 'https://www.vybebd.store/',
    github: 'https://github.com/Ray37han/vybebd',
    preview: {
      desktop: '/previews/vybe-desktop.png',
      tablet:  '/previews/vybe-tablet.png',
      phone:   '/previews/vybe-phone.png',
    },
    summary: 'A commerce experience built around a robust MERN foundation and practical SEO considerations.',
    desc: 'A full-stack commerce platform designed around catalog discovery, conversion, and the practical constraints of a client-rendered React experience.',
    arch: [
      { layer: 'Interface', name: 'React SPA', tech: 'Redux · Axios' },
      { layer: 'Gateway', name: 'Express API', tech: 'JWT · REST' },
      { layer: 'Storage', name: 'MongoDB', tech: 'Mongoose ODM' },
    ],
    chips: ['MongoDB', 'Express', 'React', 'Node.js', 'Redux', 'JWT', 'SEO'],
    challenge: 'Building a high-performance product catalog that stays SEO-friendly while remaining fully client-rendered.',
    solution: 'Implemented server-side meta injection at the CDN level and lazy-loaded heavy product imagery with blur-up placeholders.',
    lessons: 'CDN-level SSR simulation is a practical middle ground between full CSR and full SSR for legacy MERN apps.',
    db: 'MongoDB — Product, Order, User, Cart, Review collections with compound indexes on category + price.',
    auth: 'JWT access tokens (15m) + httpOnly refresh cookies (7d). Role middleware for admin/buyer separation.',
  },
  {
    key: 'portfolio', num: '02', type: 'Personal brand · Design', name: 'rhrayhan.dev',
    link: 'https://rhrayhan.dev',
    github: 'https://github.com/Ray37han/portfolio',
    preview: {
      desktop: '/previews/portfolio-desktop.png',
      tablet:  '/previews/portfolio-tablet.png',
      phone:   '/previews/portfolio-phone.png',
    },
    summary: 'An editorial personal portfolio designed to make technical work feel composed and memorable.',
    desc: 'A personal brand system built with careful typographic hierarchy, smooth motion, and intentional restraint.',
    arch: [
      { layer: 'Render', name: 'Next.js 15', tech: 'App Router · RSC' },
      { layer: 'Motion', name: 'Framer Motion', tech: 'Scroll · Spring' },
      { layer: 'Style', name: 'CSS Variables', tech: '9-theme system' },
    ],
    chips: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind', 'Lenis'],
    challenge: 'Nine complete visual themes that all maintain readability, contrast ratios, and aesthetic coherence.',
    solution: 'CSS custom properties for every semantic token, one data-theme attribute on html swaps all 20+ variables.',
    lessons: 'A good token architecture makes theming trivial — the hard work is defining the right names, not the values.',
    db: 'No database — statically built, deployed on Vercel Edge Network.',
    auth: 'No auth — public portfolio, optimised for Lighthouse performance scores.',
  },
  {
    key: 'flutter', num: '03', type: 'Flutter · Mobile', name: 'Commerce App',
    link: '',
    github: '',
    preview: null,
    summary: 'A cross-platform mobile companion for a familiar shopping journey, translated for touch.',
    desc: 'A touch-first mobile shopping experience that compresses product discovery and checkout into one-handed flows.',
    arch: [
      { layer: 'UI', name: 'Flutter Widgets', tech: 'Material 3' },
      { layer: 'State', name: 'Provider', tech: 'ChangeNotifier' },
      { layer: 'Data', name: 'REST API', tech: 'http package' },
    ],
    chips: ['Flutter', 'Dart', 'Provider', 'REST API', 'Material 3'],
    challenge: 'Keeping cart state consistent across multiple navigation contexts without a heavy state library.',
    solution: 'Used Provider with a root-level CartNotifier, listening only to the relevant slice in each subtree.',
    lessons: 'Flutter widget tree discipline is as important as state management choice — overscoping listeners kills perf.',
    db: 'Connected to the Vybebd REST API. No separate database.',
    auth: 'Token stored in SharedPreferences, injected into every API request via interceptor service.',
  },
  {
    key: 'lingua', num: '04', type: 'RUET · Software Engineering', name: 'LinguaFlow',
    link: '',
    github: '',
    preview: null,
    summary: 'A spaced-repetition vocabulary app that brought research, teamwork, and documentation together.',
    desc: 'A vocabulary learning system built on spaced-repetition research with a full team workflow.',
    arch: [
      { layer: 'Frontend', name: 'React', tech: 'Context API' },
      { layer: 'Backend', name: 'Node + Express', tech: 'REST · JWT' },
      { layer: 'Database', name: 'PostgreSQL', tech: 'Prisma ORM' },
    ],
    chips: ['React', 'Node.js', 'PostgreSQL', 'Prisma', 'JWT', 'SRS Algorithm'],
    challenge: 'Implementing SM-2 spaced repetition so it felt natural to users, not like a flashcard app.',
    solution: "Wrapped SRS scheduling in a 'Daily practice' metaphor with streaks, mastery levels, confidence ratings.",
    lessons: 'Academic SE practices (SRS docs, personas, sprint reviews) produce better products than winging it.',
    db: 'PostgreSQL — Word, Deck, UserProgress, Review tables. Prisma migrations for schema evolution.',
    auth: 'JWT with role-based access. Instructor accounts create public decks; students subscribe to them.',
  },
];

/* ═══════════════════════════════════════════════════════════
   SVG ICONS — no emojis anywhere
═══════════════════════════════════════════════════════════ */
const Icon = {
  Repo: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M3 3h8v18H3zM13 3h8v18h-8z" />
    </svg>
  ),
  Star: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Fork: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" />
      <path d="M6 9v2a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V9" />
    </svg>
  ),
  Users: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  User: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Code: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Calendar: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  Eye: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Sun: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  ),
  Menu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  ),
  Arrow: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  Send: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  Mail: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 8 10-8" />
    </svg>
  ),
  GitHub: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
  LinkedIn: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
    </svg>
  ),
  WhatsApp: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
};

/* ═══════════════════════════════════════════════════════════
   GITHUB STATS
═══════════════════════════════════════════════════════════ */
interface GHStats {
  repos: number;
  stars: number;
  forks: number;
  followers: number;
  following: number;
  languages: number;
  yearsActive: number;
  topLanguage: string;
}

function useGitHubStats(username: string) {
  const [stats, setStats] = useState<GHStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch_() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
        ]);
        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error');
        const user = await userRes.json();
        const repos: { stargazers_count: number; forks_count: number; language: string | null; fork: boolean }[] = await reposRes.json();

        const ownRepos = repos.filter(r => !r.fork);
        const stars = ownRepos.reduce((a, r) => a + r.stargazers_count, 0);
        const forks = ownRepos.reduce((a, r) => a + r.forks_count, 0);
        const langSet = new Set(repos.map(r => r.language).filter(Boolean));
        const langCount: Record<string, number> = {};
        repos.forEach(r => { if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1; });
        const topLang = Object.entries(langCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'JavaScript';
        const years = Math.floor((Date.now() - new Date(user.created_at).getTime()) / (365.25 * 24 * 60 * 60 * 1000));

        setStats({
          repos: user.public_repos,
          stars,
          forks,
          followers: user.followers,
          following: user.following,
          languages: langSet.size,
          yearsActive: years,
          topLanguage: topLang,
        });
      } catch {
        // fallback values
        setStats({ repos: 20, stars: 14, forks: 8, followers: 12, following: 18, languages: 9, yearsActive: 2, topLanguage: 'JavaScript' });
      } finally {
        setLoading(false);
      }
    }
    fetch_();
  }, [username]);

  return { stats, loading };
}

/* ═══════════════════════════════════════════════════════════
   COMPONENTS
═══════════════════════════════════════════════════════════ */

/* ─── Custom Cursor ─────────────────────────────────────── */
function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const d = dot.current, r = ring.current;
    if (!d || !r) return;
    let rx = window.innerWidth / 2, ry = window.innerHeight / 2;
    let rafId = 0;

    function tick() {
      r!.style.transform = `translate(${rx - 16}px,${ry - 16}px)`;
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      const x = e.clientX, y = e.clientY;
      d!.style.transform = `translate(${x - 4}px,${y - 4}px)`;
      rx += (x - rx) * .14;
      ry += (y - ry) * .14;
    };
    const hover = () => r!.classList.add('hovering');
    const unhover = () => r!.classList.remove('hovering');

    const bindHovers = () => {
      document.querySelectorAll('a,button,[role="button"]').forEach(el => {
        el.addEventListener('mouseenter', hover);
        el.addEventListener('mouseleave', unhover);
      });
    };
    bindHovers();
    window.addEventListener('mousemove', onMove);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);
  return (<><div ref={dot} className="cursor-dot" /><div ref={ring} className="cursor-ring" /></>);
}

/* ─── Magnetic Button ───────────────────────────────────── */
function MagneticBtn({ children, className, href, onClick }: {
  children: React.ReactNode; className?: string; href?: string; onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * .25;
    const y = (e.clientY - r.top - r.height / 2) * .35;
    el.style.transform = `translate(${x}px,${y}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = 'translate(0,0)'; };
  return (
    <div ref={ref} className="magnetic-wrap" onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ transition: 'transform .4s var(--ease)' }}>
      {href
        ? <a href={href} className={className}>{children}</a>
        : <button type="button" className={className} onClick={onClick}>{children}</button>}
    </div>
  );
}

/* ─── Hero Canvas ───────────────────────────────────────── */
function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let animId = 0;
    interface P { x: number; y: number; vx: number; vy: number; r: number; a: number; }
    const pts: P[] = [];

    // Initialise particles ONCE
    function initParticles(w: number, h: number) {
      pts.length = 0;
      const n = Math.min(60, Math.floor(w / 18));
      for (let i = 0; i < n; i++) pts.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - .5) * .38, vy: (Math.random() - .5) * .38,
        r: Math.random() * 1.4 + .4, a: Math.random() * .45 + .1,
      });
    }

    // Resize: scale existing particle positions, don't reinit
    function resize() {
      const nw = canvas!.offsetWidth, nh = canvas!.offsetHeight;
      if (pts.length === 0) { canvas!.width = nw; canvas!.height = nh; initParticles(nw, nh); return; }
      const sx = nw / (canvas!.width || nw), sy = nh / (canvas!.height || nh);
      pts.forEach(p => { p.x *= sx; p.y *= sy; });
      canvas!.width = nw; canvas!.height = nh;
    }

    function draw() {
      const w = canvas!.width, h = canvas!.height;
      ctx!.clearRect(0, 0, w, h);
      const cs = getComputedStyle(document.documentElement);
      const ac = cs.getPropertyValue('--accent').trim() || '#e0aa5b';
      const ac2 = cs.getPropertyValue('--accent-2').trim() || '#68d8ca';
      pts.forEach((p, i) => {
        p.x = (p.x + p.vx + w) % w; p.y = (p.y + p.vy + h) % h;
        ctx!.beginPath(); ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = i % 4 === 0 ? ac2 : ac;
        ctx!.globalAlpha = p.a; ctx!.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[j].x - p.x, dy = pts[j].y - p.y, d2 = dx * dx + dy * dy;
          if (d2 < 11000) { // ~105px
            const d = Math.sqrt(d2);
            ctx!.beginPath(); ctx!.moveTo(p.x, p.y); ctx!.lineTo(pts[j].x, pts[j].y);
            ctx!.strokeStyle = ac; ctx!.globalAlpha = (1 - d / 105) * .1; ctx!.lineWidth = .4; ctx!.stroke();
          }
        }
      }); ctx!.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    }

    // debounced resize
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 150); };

    resize();
    draw();
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); clearTimeout(resizeTimer); };
  }, []);

  return (
    <canvas ref={ref} style={{ width: '100%', height: '100%', minHeight: '480px', display: 'block' }} aria-hidden="true" />
  );
}

/* ─── Typewriter ────────────────────────────────────────── */
function Typewriter({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  useEffect(() => {
    const target = texts[idx];
    if (typing) {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 55);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 28);
        return () => clearTimeout(t);
      } else {
        setIdx((idx + 1) % texts.length); setTyping(true);
      }
    }
  }, [displayed, typing, idx, texts]);
  return <><span className="role-value">{displayed}</span><span className="typing-cursor" aria-hidden="true" /></>;
}

/* ─── Page-flip Sound (Web Audio synthesis — no external file) ──────────── */
function usePageFlipSound() {
  const ctxRef = useRef<AudioContext | null>(null);
  const lastPlayRef = useRef(0);

  // ── Step 1: Unlock AudioContext on FIRST user interaction ───────────────
  // Safari + Chrome require a user gesture before audio can play.
  // We listen for the very first scroll/click/touch and resume the context then.
  useEffect(() => {
    const unlock = () => {
      if (!ctxRef.current) {
        try { ctxRef.current = new AudioContext(); } catch { return; }
      }
      if (ctxRef.current.state === 'suspended') {
        ctxRef.current.resume().catch(() => { });
      }
    };
    // Any of these gestures will unlock audio
    window.addEventListener('scroll', unlock, { once: true, passive: true });
    window.addEventListener('click', unlock, { once: true });
    window.addEventListener('touchstart', unlock, { once: true, passive: true });
    window.addEventListener('keydown', unlock, { once: true });
    return () => {
      window.removeEventListener('scroll', unlock);
      window.removeEventListener('click', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, []);

  // ── Step 2: Synthesise and play the page-flip buffer ─────────────────────
  const synthesize = useCallback((ctx: AudioContext) => {
    const duration = 0.18;
    const sr = ctx.sampleRate;
    const buffer = ctx.createBuffer(1, Math.ceil(sr * duration), sr);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      const t = i / sr;
      const noise = Math.random() * 2 - 1;

      // Main swish: fast attack, exponential decay
      const swish = Math.exp(-t * 18) * (1 - Math.exp(-t * 240));

      // Three paper-flutter micro-bursts — riffling texture
      const f1 = Math.exp(-((t - 0.040) ** 2) * 4500) * 0.72;
      const f2 = Math.exp(-((t - 0.082) ** 2) * 7500) * 0.45;
      const f3 = Math.exp(-((t - 0.115) ** 2) * 10000) * 0.26;

      // Landing thwap
      const thwap = Math.exp(-((t - 0.145) ** 2) * 16000) * 0.55;

      // Higher amplitude so it's clearly audible
      data[i] = noise * (swish + f1 + f2 + f3 + thwap) * 0.85;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    // Wide lowpass (not tight bandpass) — lets the full signal through
    const lpf = ctx.createBiquadFilter();
    lpf.type = 'lowpass';
    lpf.frequency.value = 5000;
    lpf.Q.value = 0.5;

    // High-shelf to brighten the 'snap' of the page
    const shelf = ctx.createBiquadFilter();
    shelf.type = 'highshelf';
    shelf.frequency.value = 3000;
    shelf.gain.value = 6;

    // Loud enough to hear clearly — 0.75 vs the previous 0.28
    const gain = ctx.createGain();
    gain.gain.value = 0.75;

    source.connect(lpf);
    lpf.connect(shelf);
    shelf.connect(gain);
    gain.connect(ctx.destination);
    source.start();
  }, []);

  const play = useCallback(() => {
    const now = performance.now();
    if (now - lastPlayRef.current < 200) return; // throttle
    lastPlayRef.current = now;

    // Create AudioContext if not yet created
    if (!ctxRef.current) {
      try { ctxRef.current = new AudioContext(); } catch { return; }
    }
    const ctx = ctxRef.current;

    // ── KEY FIX: await resume() BEFORE playing ───────────────────────────
    // Previously ctx.resume() was fire-and-forget, so source.start() ran
    // while the context was still suspended → complete silence.
    if (ctx.state === 'running') {
      synthesize(ctx);
    } else {
      ctx.resume()
        .then(() => synthesize(ctx))
        .catch(() => { });
    }
  }, [synthesize]);

  // Cleanup
  useEffect(() => {
    return () => { ctxRef.current?.close().catch(() => { }); };
  }, []);

  return play;
}


/* ─── Scroll Story ──────────────────────────────────────── */
function ScrollStory() {
  const ref = useRef<HTMLDivElement>(null);
  const total = STORY_CHAPTERS.length;
  const [inView, setInView] = useState(false);
  const playFlip = usePageFlipSound();
  const activeChapter = useRef(-1); // track last chapter to detect changes

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // Detect chapter transitions and play the flip sound
  useEffect(() => {
    return scrollYProgress.on('change', v => {
      // Clamp to valid range
      if (v < 0 || v > 1) return;
      const chapter = Math.min(total - 1, Math.floor(v * total));
      if (chapter !== activeChapter.current) {
        activeChapter.current = chapter;
        playFlip();
      }
    });
  }, [scrollYProgress, total, playFlip]);

  // Only show progress dots when this section is in view
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: .01 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="scroll-story" ref={ref} className="scroll-story-track"
      style={{ height: `${total * 75}vh` }} aria-label="Story scroll">
      <div className="scroll-story-sticky">
        {/* Subtle grid */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, opacity: .12, pointerEvents: 'none',
          backgroundImage: `linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

        {STORY_CHAPTERS.map((ch, i) => (
          <StoryChapter key={ch.id} chapter={ch} index={i} total={total} scrollYProgress={scrollYProgress} />
        ))}
      </div>

      {/* Progress dots — only visible during this section */}
      {inView && <StoryDots total={total} scrollYProgress={scrollYProgress} />}
    </section>
  );
}


function StoryChapter({ chapter, index, total, scrollYProgress }: {
  chapter: typeof STORY_CHAPTERS[number]; index: number; total: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const s = index / total;
  const e = (index + 1) / total;
  const w = e - s;

  // ── Apple storytelling: fast snap into focus, aggressive exit blur ─────────
  // Entry:   0%→5%   blur 28→0  (snaps crisp almost instantly)
  // Plateau: 5%→73%  blur 0     (crystal clear reading window)
  // Exit:    73%→93% blur 0→28  (aggressively blurs as it scrolls away)
  // Gone:    93%→100% opacity→0
  const p1 = s;              // chapter starts entering (blurry)
  const p2 = s + w * 0.05;  // snaps fully in-focus
  const p3 = e - w * 0.27;  // plateau ends — blur starts ramping
  const p4 = e - w * 0.07;  // peak blur (chapter almost gone)
  const p5 = e;              // fully out

  const opacity = useTransform(scrollYProgress, [p1, p2, p3, p5], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [p1, p2, p3, p5], [50, 0, 0, -28]);
  const scale = useTransform(scrollYProgress, [p1, p2, p3, p4, p5], [0.85, 1, 1, 0.84, 0.84]);
  // Blur: 0 during the crisp plateau, spikes hard at exit — Apple-style cinematic
  const blurPx = useTransform(scrollYProgress, [p1, p2, p3, p4, p5], [28, 0, 0, 28, 28]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <motion.div className="scroll-story-chapter" style={{ opacity, y, scale, filter }}>
      <h2 style={{ color: chapter.accent ? 'var(--accent)' : 'var(--text)' }}>{chapter.label}</h2>
      {chapter.sub && <p>{chapter.sub}</p>}
    </motion.div>
  );
}


function StoryDots({ total, scrollYProgress }: {
  total: number; scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    return scrollYProgress.on('change', v => {
      setActive(Math.min(total - 1, Math.floor(v * total)));
    });
  }, [scrollYProgress, total]);

  return (
    <div className="story-progress-dots" aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="story-dot" style={{
          opacity: i === active ? 1 : .22,
          transform: i === active ? 'scale(1.8)' : 'scale(1)',
        }} />
      ))}
    </div>
  );
}

/* ─── Skills Section ────────────────────────────────────── */
type SkillCat = keyof typeof SKILLS_DATA;
function SkillsSection() {
  const [cat, setCat] = useState<SkillCat>('Frontend');
  const skills = SKILLS_DATA[cat];
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const card = e.target as HTMLElement;
          card.classList.add('visible');
          // Animate the bar fill using data-level attribute
          const fill = card.querySelector<HTMLElement>('.skill-bar-fill');
          if (fill) {
            const level = fill.dataset.level ?? '1';
            // Small delay so CSS transition fires after paint
            requestAnimationFrame(() => {
              fill.style.transform = `scaleX(${level})`;
            });
          }
        }
      });
    }, { threshold: .35 });
    cardRefs.current.forEach(r => r && obs.observe(r));
    return () => obs.disconnect();
  }, [cat]);


  return (
    <section className="section" id="skills" aria-labelledby="skillsTitle">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <div>
            <p className="eyebrow">Toolkit</p>
            <h2 className="section-title" id="skillsTitle">Different layers.<br />One product mindset.</h2>
          </div>
          <p className="section-intro">I choose tools for the job, then focus on clean handoffs between interface, logic, and data.</p>
        </div>
        <div className="skills-tabs" role="tablist">
          {(Object.keys(SKILLS_DATA) as SkillCat[]).map(k => (
            <button key={k} role="tab" aria-selected={cat === k}
              className={`skills-tab${cat === k ? ' active' : ''}`} onClick={() => setCat(k)}>{k}</button>
          ))}
        </div>
        {/* No AnimatePresence — key change causes instant unmount so old cards never overlap new ones */}
        <motion.div
          key={cat}
          className="skills-grid"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .3, ease: [.16, 1, .3, 1] }}
        >
          {skills.map((sk, i) => (
            <div
              key={sk.name}
              className="skill-card"
              ref={el => { cardRefs.current[i] = el; }}
            >
              <div className="skill-card-header">
                <span className="skill-name">{sk.name}</span>
                <span className="skill-exp">{sk.exp}</span>
              </div>
              <div className="skill-bar-track">
                {/* No inline style — let .visible class animate scaleX via CSS transition */}
                <div className="skill-bar-fill" data-level={sk.level} />
              </div>
              <div className="skill-meta">
                <div className="skill-meta-item">
                  <span className="skill-meta-label">Projects</span>
                  <span className="skill-meta-value">{sk.proj}</span>
                </div>
                <div className="skill-meta-item">
                  <span className="skill-meta-label">Confidence</span>
                  <span className="skill-meta-value">{Math.round(sk.level * 100)}%</span>
                </div>
              </div>
              <div className="skill-use">{sk.use}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Stats Counter ─────────────────────────────────────── */
function AnimatedCount({ target, dec }: { target: number; dec: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [triggered, setTriggered] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTriggered(true); obs.disconnect(); } }, { threshold: .5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!triggered) return;
    const el = ref.current; if (!el) return;
    const span = el; // capture non-null for closure
    const dur = 1500, start = performance.now();
    function ease(t: number) { return 1 - Math.pow(1 - t, 3); }
    function step(now: number) {
      const p = Math.min(1, (now - start) / dur);
      const v = ease(p) * target;
      span.textContent = dec ? v.toFixed(1) : Math.round(v).toString();
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [triggered, target, dec]);
  return <span ref={ref}>0</span>;
}

/* ─── GitHub Stats Section ──────────────────────────────── */
function GitHubStatsSection() {
  const { stats, loading } = useGitHubStats('Ray37han');

  type StatCard = { icon: React.ReactNode; value: number; suffix: string; label: string; dec: boolean; };
  const cards: StatCard[] = stats ? [
    { icon: <Icon.Repo />, value: stats.repos, suffix: '', label: 'Public repositories', dec: false },
    { icon: <Icon.Star />, value: stats.stars, suffix: '', label: 'Stars earned', dec: false },
    { icon: <Icon.Fork />, value: stats.forks, suffix: '', label: 'Total forks', dec: false },
    { icon: <Icon.Users />, value: stats.followers, suffix: '', label: 'GitHub followers', dec: false },
    { icon: <Icon.User />, value: stats.following, suffix: '', label: 'Following', dec: false },
    { icon: <Icon.Code />, value: stats.languages, suffix: '+', label: 'Languages used', dec: false },
    { icon: <Icon.Calendar />, value: stats.yearsActive, suffix: ' yrs', label: 'Years on GitHub', dec: false },
    { icon: <Icon.Eye />, value: stats.repos, suffix: '', label: `Top: ${stats.topLanguage}`, dec: false },
  ] : [];

  return (
    <section className="section" id="stats" aria-labelledby="statsTitle">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <div>
            <p className="eyebrow">By the numbers</p>
            <h2 className="section-title" id="statsTitle">GitHub, measured.</h2>
          </div>
          <p className="section-intro">
            Live stats pulled from{' '}
            <a href="https://github.com/Ray37han" target="_blank" rel="noreferrer"
              style={{ color: 'var(--accent)', borderBottom: '1px solid var(--line-strong)' }}>
              github.com/Ray37han
            </a>
            {' '}— updated on each visit.
          </p>
        </div>

        {loading ? (
          <div className="stats-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="stat-card" style={{ minHeight: 130, opacity: .4, background: 'var(--surface)' }} />
            ))}
          </div>
        ) : (
          <div className="stats-grid">
            {cards.map((s, i) => (
              <motion.div key={s.label} className="stat-card"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * .07, duration: .48, ease: [.16, 1, .3, 1] }}>
                <span className="stat-icon" style={{ color: 'var(--accent)' }}>{s.icon}</span>
                <div className="stat-value">
                  <AnimatedCount target={s.value} dec={s.dec} />{s.suffix}
                </div>
                <div className="stat-label">{s.label}</div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Project Dialog ────────────────────────────────────── */
type DeviceType = 'desktop' | 'tablet' | 'phone';
type ProjectType = typeof PROJECTS[number];

function ProjectDialog({ project, onClose }: { project: ProjectType; onClose: () => void }) {
  const [tab, setTab] = useState<'overview' | 'db' | 'auth' | 'case'>('overview');
  const [device, setDevice] = useState<DeviceType>('desktop');
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => { ref.current?.showModal(); }, []);

  const DEVICES = [
    {
      key: 'desktop' as DeviceType, label: 'Desktop', icon: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
      )
    },
    {
      key: 'tablet' as DeviceType, label: 'Tablet', icon: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="2" width="16" height="20" rx="2" /><circle cx="12" cy="18" r="1" fill="currentColor" /></svg>
      )
    },
    {
      key: 'phone' as DeviceType, label: 'Phone', icon: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></svg>
      )
    },
  ];

  const TABS = [
    { key: 'overview' as const, label: 'Overview' },
    { key: 'db' as const, label: 'DB Schema' },
    { key: 'auth' as const, label: 'Auth Flow' },
    { key: 'case' as const, label: 'Case Study' },
  ];

  return (
    <dialog ref={ref} id="projectDialog" aria-labelledby="dialogTitle"
      onClick={e => { if (e.target === ref.current) onClose(); }}>
      <div className="dialog-inner" style={{ overflowY: 'auto', maxHeight: 'calc(100svh - 80px)' }}>
        <button className="icon-button dialog-close" type="button" aria-label="Close" onClick={onClose}>
          <Icon.X />
        </button>
        <p className="dialog-eyebrow">{project.type}</p>
        <h2 className="dialog-title" id="dialogTitle">{project.name}</h2>

        {/* ACTION LINKS */}
        <div className="dialog-actions" style={{ display: 'flex', gap: 12, marginTop: 16, marginBottom: 24 }}>
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer" className="button button-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              Visit Site <Icon.Arrow />
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="button" style={{ padding: '8px 16px', fontSize: '0.85rem', display: 'flex', gap: 6, alignItems: 'center' }}>
              <Icon.GitHub /> Source Code
            </a>
          )}
        </div>

        <p className="dialog-desc">{project.desc}</p>

        <div className="dialog-tabs" role="tablist">
          {TABS.map(t => (
            <button key={t.key} className={`dialog-tab${tab === t.key ? ' active' : ''}`}
              role="tab" aria-selected={tab === t.key} onClick={() => setTab(t.key)}>{t.label}</button>
          ))}
        </div>

        {tab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dialog-tab-panel active">
            <div className="arch-diagram">
              {project.arch.map((n, i) => (
                <span key={n.name} style={{ display: 'contents' }}>
                  <div className="arch-node" style={{ borderColor: `color-mix(in srgb, var(--accent) ${25 + i * 20}%, var(--line))` }}>
                    <div className="arch-node-layer">{n.layer}</div>
                    <div className="arch-node-name">{n.name}</div>
                    <div className="arch-node-tech">{n.tech}</div>
                  </div>
                  {i < project.arch.length - 1 && <span className="arch-arrow">→</span>}
                </span>
              ))}
            </div>
            <div className="device-toggle" role="group" aria-label="Preview device">
              {DEVICES.map(d => (
                <button key={d.key} className={`device-btn${device === d.key ? ' active' : ''}`} onClick={() => setDevice(d.key)}>
                  {d.icon} {d.label}
                </button>
              ))}
            </div>
            <div className="device-stage">
              {/* CSS transitions only — Framer Motion layout animation fights border-radius clipping */}
              <div className={`device-frame ${device}`}>
                {device !== 'desktop' && <div className="device-notch" />}
                <div className="device-screen">
                  {project.preview ? (
                    <img
                      src={project.preview[device as keyof typeof project.preview] ?? project.preview.desktop}
                      alt={`${project.name} ${device} preview`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top center',
                        display: 'block',
                        borderRadius: 'inherit',
                      }}
                      loading="lazy"
                    />
                  ) : (
                    <>
                      <div className="device-dot" />
                      <div className="device-lines">
                        <div className="device-line" style={{ width: '80%' }} />
                        <div className="device-line" style={{ width: '60%' }} />
                        <div className="device-line" style={{ width: '70%' }} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="chip-row" style={{ marginTop: 16 }}>
              {project.chips.map(c => <span key={c} className="chip">{c}</span>)}
            </div>
          </motion.div>
        )}

        {tab === 'db' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dialog-tab-panel active">
            <div className="flow-node" style={{ marginBottom: 12 }}>
              <span>DB / PERSISTENCE</span>
              <strong style={{ display: 'block', marginTop: 12, fontSize: '1rem', fontFamily: 'var(--mono)', fontWeight: 400, lineHeight: 1.6, color: 'var(--muted)' }}>{project.db}</strong>
            </div>
            <div className="dialog-flow">
              {project.arch.map(n => (
                <div key={n.name} className="flow-node"><span>{n.layer}</span><strong>{n.name}</strong></div>
              ))}
            </div>
          </motion.div>
        )}

        {tab === 'auth' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dialog-tab-panel active">
            <div className="flow-node">
              <span>AUTH STRATEGY</span>
              <strong style={{ display: 'block', marginTop: 12, fontSize: '1rem', fontFamily: 'var(--mono)', fontWeight: 400, lineHeight: 1.6, color: 'var(--muted)' }}>{project.auth}</strong>
            </div>
          </motion.div>
        )}

        {tab === 'case' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dialog-tab-panel active">
            <div className="case-grid">
              <div className="case-card"><p className="case-label">Challenge</p><p className="case-value">{project.challenge}</p></div>
              <div className="case-card"><p className="case-label">Solution</p><p className="case-value">{project.solution}</p></div>
              <div className="case-card"><p className="case-label">Lesson learned</p><p className="case-value">{project.lessons}</p></div>
            </div>
          </motion.div>
        )}
      </div>
    </dialog>
  );
}

/* ─── Contact Form ──────────────────────────────────────── */
function ContactForm() {
  const [sent, setSent] = useState(false);
  const [fields, setFields] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sub = encodeURIComponent(`Portfolio contact from ${fields.name}`);
    const body = encodeURIComponent(`Name: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`);
    window.open(`mailto:rakibulrayhan63@gmail.com?subject=${sub}&body=${body}`);
    setSent(true);
  };

  if (sent) return (
    <motion.div className="form-sent" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }}>
      <span className="form-sent-icon" style={{ color: 'var(--accent)' }}>
        <Icon.Mail />
      </span>
      <h3>Message ready!</h3>
      <p>Your email client opened. Hit send when ready.</p>
      <button className="button" type="button" onClick={() => setSent(false)}>Send another</button>
    </motion.div>
  );

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label className="form-label" htmlFor="cf-name">Your name</label>
        <input id="cf-name" className="form-input" type="text" placeholder="Rakibul Hasan" required
          value={fields.name} onChange={e => setFields({ ...fields, name: e.target.value })} />
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="cf-email">Email address</label>
        <input id="cf-email" className="form-input" type="email" placeholder="you@example.com" required
          value={fields.email} onChange={e => setFields({ ...fields, email: e.target.value })} />
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="cf-msg">Message</label>
        <textarea id="cf-msg" className="form-textarea" placeholder="Tell me about your project or idea…" required
          value={fields.message} onChange={e => setFields({ ...fields, message: e.target.value })} />
      </div>
      <button type="submit" className="form-submit">
        Send message <Icon.Send />
      </button>
    </form>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PORTFOLIO
═══════════════════════════════════════════════════════════ */
export default function Portfolio() {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeProject, setActiveProject] = useState<ProjectType | null>(null);
  const lastScrollY = useRef(0);

  // Theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('rayhan-theme') as Theme | null;
    if (saved && THEMES.includes(saved)) {
      setThemeState(saved);
      document.documentElement.dataset.theme = saved;
    }
  }, []);

  const applyTheme = useCallback((t: Theme) => {
    setThemeState(t);
    document.documentElement.dataset.theme = t;
    localStorage.setItem('rayhan-theme', t);
    setThemeOpen(false);
  }, []);

  // Scroll: hide on down, reveal on up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setNavHidden(y > lastScrollY.current && y > 120);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    const ids = ['hero', 'scroll-story', 'skills', 'projects', 'stats', 'contact'];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: .25, rootMargin: '-60px 0px -40% 0px' });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); } });
    }, { threshold: .1, rootMargin: '0px 0px -30px' });
    document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const year = new Date().getFullYear();

  const NAV_LINKS = [
    { href: '#scroll-story', label: 'Story', id: 'scroll-story' },
    { href: '#skills', label: 'Stack', id: 'skills' },
    { href: '#projects', label: 'Work', id: 'projects' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <CustomCursor />
      <a className="skip-link" href="#content">Skip to content</a>

      {/* ─── Navbar ─── */}
      <header className={['site-header', scrolled && 'scrolled', navHidden && 'nav-hidden'].filter(Boolean).join(' ')}>
        <nav className="nav wrap" aria-label="Primary navigation">
          <a className="brand" href="#hero" aria-label="Rayhan home">
            <span className="brand-mark">R</span>Rayhan
          </a>
          <div className="nav-links">
            {NAV_LINKS.map(l => (
              <a key={l.id} href={l.href} className={activeSection === l.id ? 'active' : ''}>{l.label}</a>
            ))}
          </div>
          <div className="nav-tools">
            <button className="theme-trigger" type="button" aria-expanded={themeOpen} onClick={() => setThemeOpen(v => !v)}>
              <Icon.Sun /><span>Theme</span>
            </button>
            <button className="icon-button menu-button" type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}
              onClick={() => setMenuOpen(v => !v)}>
              {menuOpen ? <Icon.X /> : <Icon.Menu />}
            </button>
          </div>
        </nav>
      </header>

      {/* Theme Menu */}
      <div className={`theme-menu${themeOpen ? ' open' : ''}`} aria-label="Choose theme">
        {THEMES.map(t => (
          <button key={t} className="theme-option" type="button" aria-pressed={theme === t} onClick={() => applyTheme(t)}>
            <span className="theme-dot" style={{ '--dot': THEME_DOTS[t] } as React.CSSProperties} />
            {t[0].toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      <div className={`mobile-panel${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(l => <a key={l.id} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>)}
        <button type="button" onClick={() => { setMenuOpen(false); setThemeOpen(true); }}>Change theme</button>
      </div>
      {(themeOpen || menuOpen) && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 18 }} aria-hidden="true"
          onClick={() => { setThemeOpen(false); setMenuOpen(false); }} />
      )}

      <main id="content">
        {/* ═══ HERO ═══ */}
        <section className="hero" id="hero" aria-labelledby="heroTitle">
          <div className="wrap hero-grid">
            <div className="hero-copy" data-reveal>
              <div className="availability">Available for internships &amp; collaboration</div>
              <h1 id="heroTitle">Code becomes <em>an experience.</em></h1>
              <p className="hero-lede">
                I&apos;m Rakibul Hasan Rayhan — a CSE student at RUET and full-stack developer
                shaping calm, useful products from database to interface.
              </p>
              <div className="roles">
                <span className="roles-label">CURRENTLY /</span>
                <Typewriter texts={ROLES} />
              </div>
              <div className="hero-actions">
                <MagneticBtn className="button button-primary" href="#projects">
                  Explore selected work <Icon.Arrow />
                </MagneticBtn>
                <MagneticBtn className="button" href="#contact">Start a conversation</MagneticBtn>
              </div>
              <div className="hero-meta">
                <span>Rajshahi, Bangladesh</span>
                <span>MERN &amp; Flutter</span>
                <span>AI-assisted builder</span>
              </div>
            </div>
            <div className="hero-visual" data-reveal>
              {/* Particle canvas as background ambiance */}
              <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.45 }}>
                <HeroCanvas />
              </div>
              {/* Avatar circle */}
              <div className="hero-avatar-wrap">
                <div className="hero-avatar-ring" aria-hidden="true" />
                <div className="hero-avatar-ring hero-avatar-ring--2" aria-hidden="true" />
                <div className="hero-avatar">
                  <img
                    src="/avatar.png"
                    alt="Rakibul Hasan Rayhan"
                    width={340}
                    height={380}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
                    priority={true as unknown as undefined}
                  />
                </div>
                {/* Floating badge */}
                <div className="hero-avatar-badge">
                  <span className="badge-dot" />
                  Available for work
                </div>
              </div>
              <div className="visual-label">
                <strong>Rakibul Hasan Rayhan</strong>
                <span>CSE · RUET · Bangladesh</span>
              </div>
            </div>
          </div>
          <div className="scroll-hint"><span className="scroll-line" />Scroll to explore</div>
        </section>

        {/* ═══ SCROLL STORY ═══ */}
        <ScrollStory />

        {/* ═══ SKILLS ═══ */}
        <SkillsSection />

        {/* ═══ PROJECTS ═══ */}
        <section className="section" id="projects" aria-labelledby="projectsTitle">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <div>
                <p className="eyebrow">Selected work</p>
                <h2 className="section-title" id="projectsTitle">Projects, opened up.</h2>
              </div>
              <p className="section-intro">Each card expands into the thinking behind its product — not only the stack used to build it.</p>
            </div>
            <div className="project-list">
              {PROJECTS.map(p => (
                <button key={p.key} className="project-card" type="button"
                  onClick={() => setActiveProject(p)} aria-label={`Open ${p.name}`}>
                  <span className="project-number">{p.num}</span>
                  <span>
                    <p className="project-type">{p.type}</p>
                    <strong className="project-name">{p.name}</strong>
                  </span>
                  <span className="project-summary">{p.summary}</span>
                  <span className="project-arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ GITHUB STATS ═══ */}
        <GitHubStatsSection />

        {/* ═══ CONTACT ═══ */}
        <section className="section" id="contact" aria-labelledby="contactTitle">
          <div className="wrap">
            <div className="contact-form-wrapper" data-reveal>
              <div>
                <p className="eyebrow">Let&apos;s make something useful</p>
                <h2 className="contact-title" id="contactTitle">Have an idea?<br /><em>Let&apos;s shape it.</em></h2>
                <p className="contact-copy">Open to internships, thoughtful freelance work, and open-source collaboration.</p>
                <div className="contact-links" style={{ marginTop: 28 }}>
                  <a className="contact-link" href="mailto:rakibulrayhan63@gmail.com">
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Icon.Mail />Email</span>
                    rakibulrayhan63@gmail.com
                  </a>
                  <a className="contact-link" href="https://github.com/Ray37han" target="_blank" rel="noreferrer">
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Icon.GitHub />GitHub</span>
                    github.com/Ray37han
                  </a>
                  <a className="contact-link" href="https://linkedin.com/in/rakibul-hasan-rayhan" target="_blank" rel="noreferrer">
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Icon.LinkedIn />LinkedIn</span>
                    rakibul-hasan-rayhan
                  </a>
                  <a className="contact-link" href="https://wa.me/8801313285163" target="_blank" rel="noreferrer">
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Icon.WhatsApp />WhatsApp</span>
                    +880 1313 285163
                  </a>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer wrap">
        <span>© {year} Rakibul Hasan Rayhan</span>
        <span>Designed and built with intent in Rajshahi, Bangladesh.</span>
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectDialog key={activeProject.key} project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
