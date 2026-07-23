import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let tx = -200, ty = -200, x = -200, y = -200;
    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      x += (tx - x) * 0.15;
      y += (ty - y) * 0.15;
      el.style.transform = `translate3d(${x - 200}px, ${y - 200}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: 'fixed', top: 0, left: 0, width: 400, height: 400,
        pointerEvents: 'none', zIndex: 9999,
        background: 'radial-gradient(circle, rgba(139,92,246,0.22), rgba(236,72,153,0.10) 40%, transparent 70%)',
        filter: 'blur(20px)', mixBlendMode: 'screen',
      }}
    />
  );
}
