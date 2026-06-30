import React, { useEffect, useRef, useState } from 'react';

/**
 * Scroll-triggered reveal wrapper.
 *
 * Behavior:
 * - First time element enters viewport → dramatic reveal (fade + slide + scale).
 * - Marks itself with `data-scroll-pulse` so the global ScrollPulse
 *   manager re-animates it on every scroll while visible.
 * - Content NEVER becomes invisible after first reveal — buttons stay clickable.
 *
 * Variants: 'up' | 'left' | 'right' | 'scale' | 'fade'
 */
export default function Reveal({
  children,
  variant = 'up',
  delay = 0,
  duration = 800,
  threshold = 0.1,
  once = true, // kept for back-compat; behavior is fixed (always visible once revealed)
  style,
  as: Tag = 'div',
}) {
  const ref = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof IntersectionObserver === 'undefined' ||
      (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    ) {
      setHasEntered(true);
      return;
    }

    // Safety: force visible after 1.5s if observer never fires
    const safetyTimer = setTimeout(() => setHasEntered(true), 1500);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setHasEntered(true);
            io.unobserve(el);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(safetyTimer);
    };
  }, [threshold]);

  const initial = {
    up:    { opacity: 0, transform: 'translate3d(0, 60px, 0) scale(0.96)' },
    left:  { opacity: 0, transform: 'translate3d(-60px, 0, 0) scale(0.96)' },
    right: { opacity: 0, transform: 'translate3d(60px, 0, 0) scale(0.96)' },
    scale: { opacity: 0, transform: 'scale(0.85)' },
    fade:  { opacity: 0 },
  }[variant];

  const shown = { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' };

  return (
    <Tag
      ref={ref}
      data-scroll-pulse={hasEntered ? '' : undefined}
      style={{
        ...(hasEntered ? shown : initial),
        transition: `opacity ${duration}ms cubic-bezier(.22,1,.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(.22,1,.36,1) ${delay}ms`,
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
