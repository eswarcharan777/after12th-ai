import React, { useEffect, useRef, useState } from 'react';

/**
 * Scroll-triggered reveal wrapper.
 *
 * Behavior:
 * - First time element enters viewport → DRAMATIC reveal (fade + slide + scale).
 * - Every subsequent time it enters viewport → noticeable pulse + glow.
 * - Content NEVER becomes invisible after first reveal (buttons stay clickable).
 *
 * Variants: 'up' | 'left' | 'right' | 'scale' | 'fade'
 */
export default function Reveal({
  children,
  variant = 'up',
  delay = 0,
  duration = 800,
  threshold = 0.1,
  once = true, // kept for back-compat; new behavior pulses on re-entry without hiding
  style,
  as: Tag = 'div',
}) {
  const ref = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);
  const seenBeforeRef = useRef(false);

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
            // On re-entry: trigger pulse animation
            if (seenBeforeRef.current) {
              el.classList.remove('a12-pulse');
              void el.offsetWidth; // force reflow
              el.classList.add('a12-pulse');
            }
            seenBeforeRef.current = true;
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
      style={{
        ...(hasEntered ? shown : initial),
        transition: `opacity ${duration}ms cubic-bezier(.22,1,.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(.22,1,.36,1) ${delay}ms`,
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {children}
      {/* Inline keyframes so this works even if global CSS hasn't loaded yet */}
      <style>{`
        @keyframes a12-pulse {
          0%   { transform: translate3d(0,0,0) scale(1); filter: brightness(1); }
          30%  { transform: translate3d(0,-8px,0) scale(1.035); filter: brightness(1.18) drop-shadow(0 8px 24px rgba(139,92,246,0.45)); }
          60%  { transform: translate3d(0,-2px,0) scale(1.015); filter: brightness(1.08); }
          100% { transform: translate3d(0,0,0) scale(1); filter: brightness(1); }
        }
        .a12-pulse { animation: a12-pulse 0.85s cubic-bezier(.22,1,.36,1); }
      `}</style>
    </Tag>
  );
}
