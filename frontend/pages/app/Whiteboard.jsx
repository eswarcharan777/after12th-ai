import React, { useRef, useState, useEffect } from 'react';

export default function Whiteboard() {
  const cRef = useRef(null);
  const [color, setColor] = useState('#EC4899');
  const [size, setSize] = useState(3);
  const drawing = useRef(false);
  useEffect(() => {
    const c = cRef.current;
    const ctx = c.getContext('2d');
    c.width = c.offsetWidth; c.height = 500;
    ctx.fillStyle = '#0B0F1F'; ctx.fillRect(0, 0, c.width, c.height);
    const pos = e => { const r = c.getBoundingClientRect(); const t = e.touches?.[0] || e; return { x: t.clientX - r.left, y: t.clientY - r.top }; };
    const down = e => { drawing.current = true; const p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); };
    const move = e => { if (!drawing.current) return; const p = pos(e); ctx.lineTo(p.x, p.y); ctx.strokeStyle = color; ctx.lineWidth = size; ctx.lineCap = 'round'; ctx.stroke(); };
    const up = () => drawing.current = false;
    c.addEventListener('mousedown', down); c.addEventListener('mousemove', move); c.addEventListener('mouseup', up);
    c.addEventListener('touchstart', down); c.addEventListener('touchmove', move); c.addEventListener('touchend', up);
    return () => { c.removeEventListener('mousedown', down); c.removeEventListener('mousemove', move); c.removeEventListener('mouseup', up); };
  }, [color, size]);
  const clear = () => { const c = cRef.current, ctx = c.getContext('2d'); ctx.fillStyle = '#0B0F1F'; ctx.fillRect(0, 0, c.width, c.height); };
  const save = () => { const url = cRef.current.toDataURL(); const a = document.createElement('a'); a.href = url; a.download = 'whiteboard.png'; a.click(); };
  return (
    <div className="page-enter">
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 16 }}>🎨 Whiteboard</h1>
      <div className="glass" style={{ padding: 12, borderRadius: 12, marginBottom: 10, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        {['#EC4899', '#8B5CF6', '#06B6D4', '#10B981', '#F5A623', '#FFFFFF'].map(c => <button key={c} onClick={() => setColor(c)} style={{ width: 30, height: 30, borderRadius: '50%', background: c, border: color === c ? '3px solid white' : '1px solid var(--border)' }} />)}
        <input type="range" min="1" max="20" value={size} onChange={e => setSize(+e.target.value)} />
        <button className="btn-outline" onClick={clear}>Clear</button>
        <button className="btn-primary" onClick={save}>Save PNG</button>
      </div>
      <canvas ref={cRef} style={{ width: '100%', borderRadius: 12, border: '1px solid var(--border)', cursor: 'crosshair' }} />
    </div>
  );
}
