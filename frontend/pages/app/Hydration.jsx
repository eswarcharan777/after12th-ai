import React, { useState, useEffect } from 'react';
export default function Hydration() {
  const [on, setOn] = useState(false);
  const [count, setCount] = useState(Number(localStorage.getItem('a12_water_today') || 0));
  useEffect(() => {
    if (!on) return;
    const t = setInterval(() => window.__a12Toast?.('💧 Time to drink water & stretch!', 'info'), 60 * 60 * 1000);
    if (Notification.permission === 'default') Notification.requestPermission();
    return () => clearInterval(t);
  }, [on]);
  const drink = () => { const n = count + 1; setCount(n); localStorage.setItem('a12_water_today', n); window.__a12Toast?.(`+1 glass · ${n}/8`, 'success'); };
  return (
    <div className="page-enter" style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>💧 Hydration Reminder</h1>
      <div className="glass-strong" style={{ padding: 40, borderRadius: 20 }}>
        <div style={{ fontSize: 80, marginBottom: 10 }}>💧</div>
        <div style={{ fontSize: 50, fontWeight: 800 }}>{count}/8</div>
        <div style={{ color: 'var(--text-dim)', marginBottom: 20 }}>glasses today</div>
        <button className="btn-primary" onClick={drink}>+1 Glass</button>
        <div style={{ marginTop: 20 }}>
          <label><input type="checkbox" checked={on} onChange={e => setOn(e.target.checked)} /> Remind me every hour</label>
        </div>
      </div>
    </div>
  );
}
