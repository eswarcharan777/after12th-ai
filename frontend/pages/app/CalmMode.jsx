import React, { useState, useEffect } from 'react';

export default function CalmMode() {
  const [phase, setPhase] = useState('inhale');
  const [count, setCount] = useState(4);
  useEffect(() => {
    const t = setInterval(() => setCount(c => {
      if (c <= 1) { setPhase(p => p === 'inhale' ? 'hold' : p === 'hold' ? 'exhale' : 'inhale'); return phase === 'inhale' ? 7 : phase === 'hold' ? 8 : 4; }
      return c - 1;
    }), 1000);
    return () => clearInterval(t);
  }, [phase]);
  return (
    <div className="page-enter" style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🧠 Pre-Exam Calm Mode</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 30 }}>4-7-8 Breathing · Slows heart rate, calms anxiety</p>
      <div className="glass-strong" style={{ padding: 40, borderRadius: 20 }}>
        <div style={{
          width: 220, height: 220, borderRadius: '50%', margin: '0 auto',
          background: 'var(--aurora)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
          transform: phase === 'inhale' ? 'scale(1.3)' : phase === 'exhale' ? 'scale(0.8)' : 'scale(1.1)',
          transition: 'transform 1s ease-in-out', boxShadow: 'var(--glow-violet)',
        }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'white', textTransform: 'uppercase' }}>{phase}</div>
          <div style={{ fontSize: 60, fontWeight: 900, color: 'white' }}>{count}</div>
        </div>
        <div style={{ marginTop: 30, color: 'var(--text-dim)' }}>
          Inhale 4s · Hold 7s · Exhale 8s · Repeat 4 times
        </div>
      </div>
    </div>
  );
}
