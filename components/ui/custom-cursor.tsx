'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    let rafId: number;
    function animate() {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x - 4}px, ${pos.current.y - 4}px, 0)`;
      }
      if (ringRef.current) {
        // Lerp ring to dot position
        ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.1;
        ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.1;
        ringRef.current.style.transform = `translate3d(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px, 0)`;
      }
      rafId = requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(animate);

    // Grow on hover of interactive elements
    const onEnter = () => ringRef.current?.classList.add('cursor-hover');
    const onLeave = () => ringRef.current?.classList.remove('cursor-hover');

    const interactives = document.querySelectorAll('a, button, [role="button"]');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="cursor-dot fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-[var(--accent)] pointer-events-none will-change-transform"
        aria-hidden="true"
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="cursor-ring fixed top-0 left-0 z-[9998] w-8 h-8 rounded-full border border-[var(--accent)] pointer-events-none will-change-transform opacity-60 transition-all duration-150"
        aria-hidden="true"
      />
    </>
  );
}
