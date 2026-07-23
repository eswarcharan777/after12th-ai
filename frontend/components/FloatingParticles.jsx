import { useMemo } from 'react';

export default function FloatingParticles({ count = 22 }) {
  const dots = useMemo(() => Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 2 + Math.random() * 4,
    dur: 12 + Math.random() * 18,
    delay: -Math.random() * 20,
    color: ['#8B5CF6', '#EC4899', '#06B6D4'][i % 3],
  })), [count]);
  return (
    <div aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {dots.map(d => (
        <span key={d.id} style={{
          position: 'absolute', left: `${d.left}%`, top: `${d.top}%`,
          width: d.size, height: d.size, borderRadius: '50%',
          background: d.color, opacity: 0.5,
          boxShadow: `0 0 ${d.size * 3}px ${d.color}`,
          animation: `a12-float ${d.dur}s ease-in-out ${d.delay}s infinite`,
        }} />
      ))}
    </div>
  );
}
