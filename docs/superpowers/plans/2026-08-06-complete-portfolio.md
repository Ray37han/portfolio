# Complete Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert portfolio into deployable Next.js application with complete resume, project case studies, rich theme behavior, and Vercel release.

**Architecture:** Use Next App Router with one client portfolio component for theme, typed role, case-study modal, and motion. Keep resume as validated PDF in `public/`; use Vercel-native deployment once account access is available.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Lucide React, ReportLab.

## Global Constraints

- Preserve current portfolio copy and accessible keyboard interactions.
- Support nine persisted themes with token, cursor, scrollbar, particle, and motion differences.
- Include real downloadable PDF resume built from verified available profile data.
- Do not create external Vercel project without logged-in CLI access.

---

### Task 1: Resume artifact

**Files:** Create `scripts/create_resume.py`, `public/rakibul-hasan-rayhan-resume.pdf`.

- [ ] Write resume generator.
- [ ] Render PDF to PNG and inspect it.

### Task 2: Next.js migration

**Files:** Create `package.json`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `app/components/portfolio.tsx`.

- [ ] Write failing source-structure test.
- [ ] Install dependencies.
- [ ] Create responsive React portfolio and nine-theme system.
- [ ] Run tests and production build.

### Task 3: Rich project cases and release

**Files:** Modify `app/components/portfolio.tsx`, `app/globals.css`, `README.md`.

- [ ] Add device previews, architecture, database schema, authentication flow, challenges, solution, and lessons for every project.
- [ ] Start local Next preview and browser-test core interactions.
- [ ] Check Vercel authentication; deploy only when authenticated.
