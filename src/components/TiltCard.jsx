import React, { useRef } from 'react';

// Cheap, CSS-only 3D tilt-on-hover wrapper — no JS libraries.
// Tracks mouse position over the card and applies perspective rotation.
export default function TiltCard({ children, style, maxTilt = 10, scale = 1.03, glow = true }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * -2 * maxTilt;
    const ry = (px - 0.5) *  2 * maxTilt;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;
    if (glow) {
      el.style.boxShadow = `${(px - 0.5) * -22}px ${(py - 0.5) * -22}px 50px rgba(255,107,0,0.25), 0 18px 40px rgba(10,22,40,0.35)`;
    }
  };

  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1)';
    el.style.boxShadow = '0 2px 8px rgba(10,22,40,0.05)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transition: 'transform 0.2s ease-out, box-shadow 0.25s ease-out',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
