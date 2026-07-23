import { useEffect, useRef } from 'react';

// SVG line chart with draw-on-mount stroke-dashoffset animation
export default function ChartLine({ data = [40, 55, 45, 70, 65, 82, 90], width = 320, height = 120, color = '#8B5CF6', color2 = '#EC4899' }) {
  const pathRef = useRef(null);
  const max = Math.max(...data, 1);
  const step = width / (data.length - 1);
  const points = data.map((v, i) => [i * step, height - (v / max) * (height - 10) - 5]);
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const area = `${d} L${width},${height} L0,${height} Z`;

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;
    path.getBoundingClientRect();
    path.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(.22,1,.36,1)';
    path.style.strokeDashoffset = '0';
  }, [d]);

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="a12chartFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color2} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="a12chartStroke" x1="0" x2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color2} />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#a12chartFill)" />
      <path ref={pathRef} d={d} fill="none" stroke="url(#a12chartStroke)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3" fill={color2} style={{ opacity: 0, animation: `a12-dot-in 0.4s ease ${0.15 * i + 1.0}s forwards` }} />
      ))}
    </svg>
  );
}
