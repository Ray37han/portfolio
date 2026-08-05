export type Theme =
  | 'dark'
  | 'light'
  | 'matrix'
  | 'cyberpunk'
  | 'synthwave'
  | 'hacker'
  | 'space'
  | 'glass'
  | 'retro';

export const THEMES: Theme[] = [
  'dark',
  'light',
  'matrix',
  'cyberpunk',
  'synthwave',
  'hacker',
  'space',
  'glass',
  'retro',
];

export const THEME_LABELS: Record<Theme, string> = {
  dark: '🌙 Dark',
  light: '☀️ Light',
  matrix: '🟩 Matrix',
  cyberpunk: '🌆 Cyberpunk',
  synthwave: '🌊 Synthwave',
  hacker: '💻 Hacker',
  space: '🚀 Space',
  glass: '🪟 Glass',
  retro: '📺 Retro CRT',
};

export const PROJECTS = [
  {
    key: 'vybe',
    number: '01',
    type: 'MERN E-COMMERCE',
    name: 'Vybebd.store',
    tagline: 'Full-stack e-commerce, end to end.',
    summary:
      'A production-grade online storefront with real-time inventory, secure checkout, admin dashboard, and full mobile responsiveness.',
    stack: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'Cloudinary', 'Redis'],
    challenge:
      'Building a storefront that feels fast and discoverable without sacrificing the SPA flow.',
    solution:
      'Structured rendering and metadata strategy around a focused commerce journey, paired with Redis caching for hot routes.',
    lessons:
      'Product SEO works best when content, routing, and deployment decisions are designed together from day one.',
    db: ['users', 'products', 'orders', 'reviews', 'coupons'],
    auth: ['JWT session', 'role gate (admin/user)', 'order ownership middleware'],
    architecture: [
      { node: 'React Frontend', tech: 'Vite + React 18', layer: 'UI' },
      { node: 'Express API', tech: 'Node.js + Express', layer: 'Backend' },
      { node: 'MongoDB', tech: 'Mongoose ODM', layer: 'Database' },
      { node: 'Redis', tech: 'Upstash Redis', layer: 'Cache' },
      { node: 'Cloudinary', tech: 'Image CDN', layer: 'Storage' },
      { node: 'JWT Auth', tech: 'jsonwebtoken', layer: 'Security' },
    ],
    liveUrl: 'https://vybebd.store',
    githubUrl: 'https://github.com/Ray37han/vybe-mern',
    color: '#e0aa5b',
  },
  {
    key: 'portfolio',
    number: '02',
    type: 'PERSONAL BRAND',
    name: 'rhrayhan.dev',
    tagline: 'Engineering identity through design.',
    summary:
      'Editorial personal brand system built with Next.js 15, Framer Motion, and 9 switchable themes. Cinematic scroll-story telling.',
    stack: ['Next.js 15', 'React', 'TypeScript', 'Framer Motion', 'Tailwind', 'GSAP'],
    challenge: 'Technical work often reads like a list, not a story.',
    solution:
      'Built a scroll narrative with clear evidence, hierarchy, and contact paths that feel like a product launch.',
    lessons: 'A portfolio should make confidence visible before it makes claims.',
    db: ['case studies', 'theme config', 'static data'],
    auth: ['public profile', 'secure contact form'],
    architecture: [
      { node: 'Next.js App Router', tech: 'Next.js 15', layer: 'UI' },
      { node: 'Framer Motion', tech: 'Animation Engine', layer: 'Motion' },
      { node: 'Vercel Edge', tech: 'Edge Functions', layer: 'Deploy' },
      { node: 'Static Data', tech: 'JSON / TypeScript', layer: 'Data' },
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/Ray37han',
    color: '#68d8ca',
  },
  {
    key: 'flutter',
    number: '03',
    type: 'MOBILE APP',
    name: 'Commerce App',
    tagline: 'Touch-first shopping, built right.',
    summary:
      'Flutter-based companion mobile app for the Vybe storefront. Native-feeling UI with state management, cart, and secure checkout.',
    stack: ['Flutter', 'Dart', 'Provider', 'REST API', 'Firebase Auth'],
    challenge:
      'Desktop commerce patterns do not translate directly to one-handed, on-the-go mobile use.',
    solution:
      'Compressed product discovery, cart feedback, and checkout states into mobile-first flows with clear hierarchy.',
    lessons: 'Mobile velocity comes from clear hierarchy and reduced friction, not more controls.',
    db: ['catalog', 'cart', 'user profile', 'order history'],
    auth: ['email sign-in', 'Firebase Auth', 'saved profile'],
    architecture: [
      { node: 'Flutter UI', tech: 'Flutter 3.x', layer: 'UI' },
      { node: 'Provider State', tech: 'Provider package', layer: 'State' },
      { node: 'REST API', tech: 'HTTP package', layer: 'Network' },
      { node: 'Firebase Auth', tech: 'Firebase', layer: 'Security' },
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/Ray37han',
    color: '#9ba7ff',
  },
  {
    key: 'lingua',
    number: '04',
    type: 'SOFTWARE ENGINEERING',
    name: 'LinguaFlow',
    tagline: 'Learning loops, engineered.',
    summary:
      'Spaced-repetition vocabulary learning application designed with team collaboration, full MVP documentation, and persona-driven UX.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Prisma', 'Design System'],
    challenge:
      'The learning loop had to be simple enough for daily repeated use and explainable to non-technical stakeholders.',
    solution:
      'Defined persona, repeat-cycle, MVP diagrams, and delivery documentation to align the team from day one.',
    lessons: 'Shared product language keeps teams moving when scope shifts.',
    db: ['vocabulary terms', 'review cycles', 'streaks', 'user progress'],
    auth: ['learner account', 'progress ownership', 'session management'],
    architecture: [
      { node: 'React SPA', tech: 'React + TS', layer: 'UI' },
      { node: 'Node API', tech: 'Express.js', layer: 'Backend' },
      { node: 'PostgreSQL', tech: 'Prisma ORM', layer: 'Database' },
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/Ray37han',
    color: '#ff4da6',
  },
] as const;

export const SKILLS = [
  {
    category: 'Frontend',
    color: '#68d8ca',
    items: [
      { name: 'React', experience: '2+ years', confidence: 90, projects: 6, use: 'SPAs, dashboards, portfolios', url: 'https://react.dev' },
      { name: 'Next.js', experience: '1+ year', confidence: 85, projects: 3, use: 'SSR, edge, full-stack', url: 'https://nextjs.org' },
      { name: 'TypeScript', experience: '1+ year', confidence: 80, projects: 5, use: 'Type-safe frontend', url: 'https://typescriptlang.org' },
      { name: 'Tailwind CSS', experience: '2+ years', confidence: 92, projects: 8, use: 'Utility-first styling', url: 'https://tailwindcss.com' },
      { name: 'Framer Motion', experience: '1 year', confidence: 78, projects: 3, use: 'UI animations', url: 'https://framer.com/motion' },
    ],
  },
  {
    category: 'Backend',
    color: '#e0aa5b',
    items: [
      { name: 'Node.js', experience: '2+ years', confidence: 88, projects: 5, use: 'REST APIs, servers', url: 'https://nodejs.org' },
      { name: 'Express', experience: '2+ years', confidence: 90, projects: 5, use: 'API routing, middleware', url: 'https://expressjs.com' },
      { name: 'MongoDB', experience: '2 years', confidence: 85, projects: 4, use: 'Document storage', url: 'https://mongodb.com' },
      { name: 'PostgreSQL', experience: '1 year', confidence: 72, projects: 2, use: 'Relational data', url: 'https://postgresql.org' },
      { name: 'Redis', experience: '6 months', confidence: 65, projects: 1, use: 'Caching, sessions', url: 'https://redis.io' },
    ],
  },
  {
    category: 'Mobile',
    color: '#9ba7ff',
    items: [
      { name: 'Flutter', experience: '1.5 years', confidence: 82, projects: 3, use: 'Cross-platform apps', url: 'https://flutter.dev' },
      { name: 'Dart', experience: '1.5 years', confidence: 80, projects: 3, use: 'Flutter development', url: 'https://dart.dev' },
    ],
  },
  {
    category: 'Languages',
    color: '#ff4da6',
    items: [
      { name: 'JavaScript', experience: '3+ years', confidence: 92, projects: 10, use: 'Web, Node, scripts', url: 'https://developer.mozilla.org' },
      { name: 'C / C++', experience: '2 years', confidence: 75, projects: 5, use: 'Algorithms, DSA', url: 'https://cppreference.com' },
      { name: 'Java', experience: '1.5 years', confidence: 70, projects: 4, use: 'OOP, university projects', url: 'https://java.com' },
      { name: 'Python', experience: '1 year', confidence: 65, projects: 2, use: 'Scripting, AI tools', url: 'https://python.org' },
    ],
  },
] as const;

export const STATS = [
  { label: 'Projects Built', value: 12, suffix: '+', icon: '🚀' },
  { label: 'GitHub Repos', value: 28, suffix: '+', icon: '📦' },
  { label: 'Technologies', value: 20, suffix: '+', icon: '🛠' },
  { label: 'Years Coding', value: 3, suffix: '+', icon: '📅' },
  { label: 'Commits', value: 840, suffix: '+', icon: '💾' },
  { label: 'Hours Spent Building', value: 2400, suffix: '+', icon: '⏱' },
  { label: 'Coffee Consumed', value: 999, suffix: '∞', icon: '☕' },
  { label: 'Current Streak', value: 30, suffix: ' days', icon: '🔥' },
] as const;

export const STORY_CHAPTERS = [
  { id: 'hello', label: 'Hello.', sub: '', accent: false },
  { id: 'name', label: "I'm Rayhan.", sub: 'Rakibul Hasan Rayhan', accent: true },
  { id: 'student', label: 'A CSE student.', sub: 'Rajshahi University of Engineering & Technology', accent: false },
  { id: 'c', label: 'I started with C.', sub: 'Pointers, memory, discipline.', accent: false },
  { id: 'cpp', label: 'Then C++.', sub: 'OOP, algorithms, problem solving.', accent: false },
  { id: 'java', label: 'Java.', sub: 'Data structures, system design thinking.', accent: false },
  { id: 'flutter', label: 'Flutter.', sub: 'Cross-platform apps, beautiful UIs.', accent: false },
  { id: 'react', label: 'React.', sub: 'Components, state, the web clicked.', accent: true },
  { id: 'node', label: 'Node.js.', sub: 'APIs, servers, full-stack unlocked.', accent: false },
  { id: 'mern', label: 'The MERN Stack.', sub: 'End to end. Database to interface.', accent: true },
  { id: 'ai', label: 'AI-assisted development.', sub: 'Build smarter, ship faster, think deeper.', accent: false },
  { id: 'products', label: 'Now I build scalable products.', sub: 'Real users. Real systems. Real impact.', accent: true },
  { id: 'together', label: "Let's build something together.", sub: 'Available for internships & collaboration.', accent: false },
] as const;
