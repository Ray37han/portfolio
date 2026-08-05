'use client';

import dynamic from 'next/dynamic';

const CursorInner = dynamic(
  () => import('./custom-cursor').then((m) => m.CustomCursor),
  { ssr: false }
);

export function CursorLoader() {
  return <CursorInner />;
}
