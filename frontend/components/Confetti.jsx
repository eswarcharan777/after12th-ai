import { useEffect } from 'react';

const COLORS = ['#8B5CF6', '#EC4899', '#06B6D4', '#F5A623', '#10B981', '#F472B6'];

export function fireConfetti({ count = 140, duration = 2200 } = {}) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:99999';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const pieces = Array.from({ length: count }).map(() => ({
    x: canvas.width / 2 + (Math.random() - 0.5) * 200,
    y: canvas.height / 3,
    vx: (Math.random() - 0.5) * 12,
    vy: -Math.random() * 14 - 6,
    g: 0.35 + Math.random() * 0.15,
    size: 6 + Math.random() * 8,
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.25,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));
  const start = Date.now();
  const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.vy += p.g;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
      ctx.restore();
    });
    if (Date.now() - start < duration) requestAnimationFrame(tick);
    else canvas.remove();
  };
  tick();
}

export default function ConfettiOnMount({ deps = [], when = true }) {
  useEffect(() => { if (when) fireConfetti(); /* eslint-disable-next-line */ }, deps);
  return null;
}
