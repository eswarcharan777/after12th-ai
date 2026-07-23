import React from 'react';
const MENTORS = [
  { name: 'Dr. Ramesh K.', role: 'AIIMS Delhi MD', rate: '₹499/hr', slots: 'Weekends', avatar: '👨‍⚕️' },
  { name: 'Priyanka M.', role: 'IIT-JEE topper 2020', rate: '₹399/hr', slots: 'Evenings', avatar: '👩‍🎓' },
  { name: 'Arjun V.', role: 'IIT Bombay CSE 2022', rate: '₹299/hr', slots: 'Flexible', avatar: '🧑‍💻' },
];
export default function Mentorship() {
  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🎯 One-on-one Mentorship</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>Book personalized sessions with expert mentors</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
        {MENTORS.map(m => (
          <div key={m.name} className="glass" style={{ padding: 20, borderRadius: 14 }}>
            <div style={{ fontSize: 50, textAlign: 'center' }}>{m.avatar}</div>
            <h3 style={{ textAlign: 'center', marginTop: 10 }}>{m.name}</h3>
            <div style={{ textAlign: 'center', color: 'var(--violet-2)', fontSize: 13 }}>{m.role}</div>
            <div style={{ textAlign: 'center', fontSize: 20, fontWeight: 800, color: 'var(--pink-2)', margin: '12px 0' }}>{m.rate}</div>
            <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-dim)', marginBottom: 12 }}>Slots: {m.slots}</div>
            <button className="btn-primary" onClick={() => window.__a12Toast?.('Booking request sent', 'success')} style={{ width: '100%' }}>Book Session</button>
          </div>
        ))}
      </div>
    </div>
  );
}
