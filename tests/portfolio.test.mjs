import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('portfolio exposes complete accessible interactive structure', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');

  for (const id of ['hero', 'story', 'projects', 'contact', 'themeMenu', 'menuButton', 'heroCanvas']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }

  for (const theme of ['dark', 'light', 'matrix', 'cyberpunk', 'synthwave', 'hacker', 'space', 'glass', 'retro']) {
    assert.match(html, new RegExp(`data-theme="${theme}"`));
  }

  assert.match(html, /localStorage/);
  assert.match(html, /prefers-reduced-motion/);
  assert.match(html, /IntersectionObserver/);
  assert.match(html, /aria-expanded/);
});
