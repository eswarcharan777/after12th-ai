import React, { useRef, useState, useEffect } from 'react';

export default function Whiteboard() {
  const cRef = useRef(null);
  const [color, setColor] = useState('#EC4899');
  const [size, setSize] = useState(3);
  const [tool, setTool] = useState('pen'); // 'pen' | 'eraser'
  const drawing = useRef(false);
  // Mirror reactive state into refs so effect doesn't re-attach listeners (which was wiping the canvas).
  const colorRef = useRef(color);
  const sizeRef = useRef(size);
  const toolRef = useRef(tool);
  useEffect(() => { colorRef.current = color; }, [color]);
  useEffect(() => { sizeRef.current = size; }, [size]);
  useEffect(() => { toolRef.current = tool; }, [tool]);

  // One-time canvas init + listeners.
  useEffect(() => {
    const c = cRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    c.width = c.offsetWidth;
    c.height = 500;
    ctx.fillStyle = '#0B0F1F';
    ctx.fillRect(0, 0, c.width, c.height);

    const pos = e => {
      const r = c.getBoundingClientRect();
      const t = e.touches?.[0] || e;
      return { x: t.clientX - r.left, y: t.clientY - r.top };
    };
    const down = e => {
      e.preventDefault();
      drawing.current = true;
      const p = pos(e);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
    };
    const move = e => {
      if (!drawing.current) return;
      e.preventDefault();
      const p = pos(e);
      ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = toolRef.current === 'eraser' ? '#0B0F1F' : colorRef.current;
      ctx.lineWidth = toolRef.current === 'eraser' ? Math.max(sizeRef.current * 4, 12) : sizeRef.current;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    };
    const up = () => { drawing.current = false; };

    // Attach to window so releasing outside the canvas still ends the stroke.
    c.addEventListener('mousedown', down);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    c.addEventListener('touchstart', down, { passive: false });
    c.addEventListener('touchmove', move, { passive: false });
    c.addEventListener('touchend', up);

    // Handle window resize — preserve current drawing.
    const onResize = () => {
      const snapshot = ctx.getImageData(0, 0, c.width, c.height);
      c.width = c.offsetWidth;
      c.height = 500;
      ctx.putImageData(snapshot, 0, 0);
    };
    window.addEventListener('resize', onResize);

    return () => {
      c.removeEventListener('mousedown', down);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      c.removeEventListener('touchstart', down);
      c.removeEventListener('touchmove', move);
      c.removeEventListener('touchend', up);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const clear = () => {
    const c = cRef.current, ctx = c.getContext('2d');
    ctx.fillStyle = '#0B0F1F';
    ctx.fillRect(0, 0, c.width, c.height);
  };
  const save = () => {
    const url = cRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url; a.download = `whiteboard-${Date.now()}.png`;
    a.click();
  };

  const btn = (active) => ({
    padding: '8px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600,
    background: active ? 'var(--violet)' : 'var(--surface)',
    color: active ? '#fff' : 'var(--text)',
    border: `1px solid ${active ? 'var(--violet)' : 'var(--border)'}`,
    cursor: 'pointer',
  });

  return (
    <div className="page-enter">
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 16 }}>🎨 Whiteboard</h1>
      <div className="glass" style={{ padding: 12, borderRadius: 12, marginBottom: 10, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        {['#EC4899', '#8B5CF6', '#06B6D4', '#10B981', '#F5A623', '#FFFFFF'].map(c => (
          <button key={c} onClick={() => { setColor(c); setTool('pen'); }} aria-label={`Color ${c}`}
            style={{ width: 30, height: 30, borderRadius: '50%', background: c, cursor: 'pointer', border: color === c && tool === 'pen' ? '3px solid white' : '1px solid var(--border)' }} />
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>Size</span>
          <input type="range" min="1" max="20" value={size} onChange={e => setSize(+e.target.value)} />
          <span style={{ fontSize: 12, color: 'var(--text-dim)', minWidth: 16 }}>{size}</span>
        </div>
        <button style={btn(tool === 'eraser')} onClick={() => setTool(tool === 'eraser' ? 'pen' : 'eraser')}>🧽 Eraser</button>
        <button className="btn-outline" onClick={clear}>Clear</button>
        <button className="btn-primary" onClick={save}>💾 Save PNG</button>
      </div>
      <canvas ref={cRef} style={{ width: '100%', borderRadius: 12, border: '1px solid var(--border)', cursor: 'crosshair', touchAction: 'none' }} />
    </div>
  );
}
