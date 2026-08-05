import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Next portfolio includes complete delivery features', async () => {
  const [page, portfolio, manifest] = await Promise.all([
    readFile(new URL('../app/page.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../app/components/portfolio.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../package.json', import.meta.url), 'utf8'),
  ]);

  assert.match(page, /Portfolio/);
  assert.match(portfolio, /framer-motion/);
  assert.match(portfolio, /Download resume/);
  assert.match(portfolio, /Laptop preview/);
  assert.match(portfolio, /Authentication flow/);
  assert.match(portfolio, /localStorage/);
  assert.match(manifest, /next/);
  assert.match(manifest, /tailwindcss/);
});
