import { useEffect } from 'react';

// Global click ripple on buttons — Material style
export default function Ripple() {
  useEffect(() => {
    const onClick = (e) => {
      const btn = e.target.closest('.btn-primary, .btn-outline, .btn-ghost, button');
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.6;
      const span = document.createElement('span');
      span.className = 'a12-ripple';
      span.style.cssText = `left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;width:${size}px;height:${size}px;`;
      const prev = btn.style.position;
      const prevOverflow = btn.style.overflow;
      if (!prev) btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(span);
      setTimeout(() => { span.remove(); btn.style.overflow = prevOverflow; }, 650);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return null;
}
