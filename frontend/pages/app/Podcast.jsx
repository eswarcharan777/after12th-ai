import React from 'react';
const EPS = [
  { ep: 12, title: 'How to score 700+ in NEET', duration: '32 min', date: 'Jul 4' },
  { ep: 11, title: 'JEE Advanced strategy from AIR 45', duration: '28 min', date: 'Jun 27' },
  { ep: 10, title: 'Time management for droppers', duration: '35 min', date: 'Jun 20' },
  { ep: 9, title: 'Handling exam anxiety', duration: '22 min', date: 'Jun 13' },
];
export default function Podcast() {
  return (
    <div className="page-enter" style={{ maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 20 }}>📻 After12th Podcast</h1>
      {EPS.map(e => (
        <div key={e.ep} className="glass" style={{ padding: 20, borderRadius: 14, marginBottom: 12, display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ width: 60, height: 60, borderRadius: 12, background: 'var(--aurora)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🎙</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: 'var(--violet-2)', fontWeight: 700 }}>EP {e.ep} · {e.date}</div>
            <h3>{e.title}</h3>
            <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{e.duration}</div>
          </div>
          <button className="btn-primary">▶ Play</button>
        </div>
      ))}
    </div>
  );
}
