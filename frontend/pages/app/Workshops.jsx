import React from 'react';
const EVENTS = [
  { title: 'NEET Last 30 Days Strategy', date: 'Aug 15, 2026', speaker: 'Dr. Ramesh (AIIMS)', price: '₹99', slots: 45 },
  { title: 'JEE Physics Problem-Solving Live', date: 'Aug 22, 2026', speaker: 'IIT Prof. Vinod', price: '₹149', slots: 20 },
  { title: 'How I cracked AIR 89 in NEET', date: 'Sep 5, 2026', speaker: 'Ishita Patel', price: 'Free', slots: 100 },
];
export default function Workshops() {
  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 20 }}>🎟️ Workshops & Events</h1>
      {EVENTS.map((e, i) => (
        <div key={i} className="glass" style={{ padding: 22, borderRadius: 14, marginBottom: 12 }}>
          <h3>{e.title}</h3>
          <div style={{ color: 'var(--text-dim)', margin: '8px 0' }}>📅 {e.date} · 🎤 {e.speaker}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
            <span style={{ color: 'var(--pink-2)', fontWeight: 800, fontSize: 20 }}>{e.price}</span>
            <span style={{ color: 'var(--text-dim)', fontSize: 13 }}>{e.slots} slots left</span>
            <button className="btn-primary">Register</button>
          </div>
        </div>
      ))}
    </div>
  );
}
