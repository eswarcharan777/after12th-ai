import React, { useEffect, useRef, useState } from 'react';

// Counts up to a target number with easing when it enters the viewport.
export default function AnimatedNumber({ value, duration = 1200, suffix = '', prefix = '', style }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const startRef = useRef(0);
  const fromRef = useRef(0);
  const rafRef = useRef(0);

  const target = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^\d.-]/g, '')) || 0;
  const isFloat = !Number.isInteger(target);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let running = false;

    const animate = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const t = Math.min(1, (ts - startRef.current) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const next = fromRef.current + (target - fromRef.current) * eased;
      setDisplay(next);
      if (t < 1) rafRef.current = requestAnimationFrame(animate);
      else running = false;
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !running) {
          running = true;
          startRef.current = 0;
          fromRef.current = 0;
          cancelAnimationFrame(rafRef.current);
          rafRef.current = requestAnimationFrame(animate);
        } else if (!e.isIntersecting) {
          cancelAnimationFrame(rafRef.current);
          setDisplay(0);
          running = false;
        }
      });
    }, { threshold: 0.3 });

    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);

  const formatted = isFloat ? display.toFixed(1) : Math.round(display).toLocaleString('en-IN');
  return <span ref={ref} style={style}>{prefix}{formatted}{suffix}</span>;
}
