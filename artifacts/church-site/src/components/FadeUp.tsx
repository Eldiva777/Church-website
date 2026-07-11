'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface FadeUpProps {
  children: ReactNode;
  /** Stagger delay in milliseconds (max 100 ms per spec) */
  delay?: number;
  className?: string;
}

export default function FadeUp({ children, delay = 0, className = '' }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If already visible on mount (e.g. above the fold), fire immediately
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`fade-up ${className}`}>
      {children}
    </div>
  );
}
