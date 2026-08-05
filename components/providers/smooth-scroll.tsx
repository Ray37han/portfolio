'use client';

import dynamic from 'next/dynamic';

// Dynamically imported with ssr:false because Lenis needs window
const LenisProvider = dynamic(
  () => import('./lenis-provider').then((m) => m.LenisProvider),
  { ssr: false }
);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return <LenisProvider>{children}</LenisProvider>;
}
