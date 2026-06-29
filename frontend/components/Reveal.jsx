import React, { useEffect, useRef, useState } from 'react';

/**
 * Scroll-triggered reveal wrapper.
 * Uses IntersectionObserver (zero deps, GPU-cheap).
 *
 * Variants: 'up' | 'left' | 'right' | 'scale' | 'fade'
 * delay: milliseconds before the in-animation kicks off
 */
export default function Reveal({
  children,
  variant = 'up',
  delay = 0,
  duration = 700,
  threshold = 0.15,
  once = true,       // ← default: animate ONCE on first view, then stay visible
  style,
  as: Tag = 'div',
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If user prefers reduced motion OR IntersectionObserver missing, just show
    if (typeof IntersectionObserver === 'undefined' ||
        (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      setVisible(true);
      return;
    }

    // Safety net: if observer never fires within 1.5s, force visible.
    // Prevents content from staying invisible on flaky devices.
    const safetyTimer = setTimeout(() => setVisible(true), 1500);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            if (once) io.unobserve(el);
          } else if (!once) {
            // Element left the viewport — reset so it animates IN again next time
            setVisible(false);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -80px 0px' }
    );
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(safetyTimer); };
  }, [threshold, once]);

  const initial = {
    up:    { opacity: 0, transform: 'translate3d(0, 40px, 0)' },
    left:  { opacity: 0, transform: 'translate3d(-40px, 0, 0)' },
    right: { opacity: 0, transform: 'translate3d(40px, 0, 0)' },
    scale: { opacity: 0, transform: 'scale(0.92)' },
    fade:  { opacity: 0 },
  }[variant];

  const shown = { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' };

  return (
    <Tag
      ref={ref}
      style={{
        ...(visible ? shown : initial),
        transition: `opacity ${duration}ms cubic-bezier(.22,1,.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(.22,1,.36,1) ${delay}ms`,
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
