import React, { useState, useEffect } from 'react';
export default function Meditation() {
  const [dur, setDur] = useState(300); const [left, setLeft] = useState(300); const [on, setOn] = useState(false);
  useEffect(() => { if (!on) return; const t = setInterval(() => setLeft(l => l <= 1 ? (setOn(false), 0) : l - 1), 1000); return () => clearInterval(t); }, [on]);
  const mm = String(Math.floor(left / 60)).padStart(2, '0'), ss = String(left % 60).padStart(2, '0');
  return (
    <div className="page-enter" style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🧘 Meditation Timer</h1>
      <div className="glass-strong" style={{ padding: 40, borderRadius: 20 }}>
        <div style={{ fontSize: 80, fontFamily: 'Sora', fontWeight: 800, background: 'var(--aurora)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{mm}:{ss}</div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: '20px 0' }}>
          {[3, 5, 10, 15].map(m => <button key={m} onClick={() => { setDur(m * 60); setLeft(m * 60); setOn(false); }} className="btn-outline">{m} min</button>)}
        </div>
        <button className="btn-primary" onClick={() => setOn(!on)}>{on ? '⏸ Pause' : '▶ Start'}</button>
      </div>
    </div>
  );
}
