# Rayhan Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, responsive single-page developer portfolio with a cinematic Code-to-Product Prism hero and interactive theme system.

**Architecture:** Deliver one dependency-free `index.html` containing semantic markup, token-based CSS themes, and progressive JavaScript enhancements. Keep visuals usable without WebGL and avoid motion when the browser requests reduced motion.

**Tech Stack:** HTML5, CSS custom properties, vanilla JavaScript, Canvas 2D.

## Global Constraints

- Keep all visible text legible at 320px and 1440px with no horizontal overflow.
- Include nine selectable themes, persisted with `localStorage`.
- Hero motion must pause while offscreen or tab-hidden and respect `prefers-reduced-motion`.
- Use keyboard-accessible menu, theme controls, and project cards.
- No third-party runtime or remote dependency is required for core experience.

---

### Task 1: Portfolio page and behavior checks

**Files:**

- Create: `tests/portfolio.test.mjs`
- Create: `index.html`

**Interfaces:**

- Consumes: Browser DOM, Canvas 2D, `window.localStorage`, `window.matchMedia`.
- Produces: A static portfolio page with IDs `hero`, `story`, `projects`, `contact`, `themeMenu`, `menuButton`, and canvas `heroCanvas`.

- [x] **Step 1: Write failing structural test**

```js
assert.match(html, /id="hero"/);
assert.match(html, /id="projects"/);
assert.match(html, /data-theme="matrix"/);
assert.match(html, /prefers-reduced-motion/);
assert.match(html, /localStorage/);
```

- [x] **Step 2: Run structural test and confirm expected failure**

Run: `node --test tests/portfolio.test.mjs`

Expected: FAIL because `index.html` does not exist yet.

- [x] **Step 3: Create responsive portfolio**

```html
<main>
  <section id="hero">...</section>
  <section id="story">...</section>
  <section id="projects">...</section>
  <section id="contact">...</section>
</main>
```

Implement CSS token themes, Canvas prism rendering, project cards, a mobile menu, theme picker, scroll reveals, and motion-safe behavior in the same document.

- [x] **Step 4: Run structural test and confirm success**

Run: `node --test tests/portfolio.test.mjs`

Expected: PASS with all assertions green.

- [x] **Step 5: Browser verification**

Run local server, inspect desktop and mobile in Chrome, verify theme persistence and navigation controls, then capture a live preview URL.
