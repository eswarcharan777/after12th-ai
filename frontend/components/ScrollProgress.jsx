import React, { useEffect, useState } from 'react';

// Thin aurora-gradient bar at top of the page that fills as you scroll.
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = (h.scrollHeight - h.clientHeight) || 1;
        setProgress(Math.min(100, Math.max(0, (h.scrollTop / max) * 100)));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 3,
      zIndex: 9999, pointerEvents: 'none',
      background: 'transparent',
    }}>
      <div style={{
        height: '100%', width: `${progress}%`,
        background: 'var(--aurora)',
        boxShadow: '0 0 12px rgba(139,92,246,0.7), 0 0 24px rgba(236,72,153,0.5)',
        transition: 'width 60ms linear',
      }} />
    </div>
  );
}
