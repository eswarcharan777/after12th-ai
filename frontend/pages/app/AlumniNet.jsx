import React from 'react';
const ALUMNI = [
  { name: 'Dr. Anand K.', college: 'AIIMS Delhi', batch: 'MBBS 2018', now: 'Cardiologist, Apollo', avatar: '👨‍⚕️' },
  { name: 'Rakesh V.', college: 'IIT Bombay', batch: 'CSE 2020', now: 'SDE @ Google', avatar: '🧑‍💻' },
  { name: 'Pooja S.', college: 'IIM Ahmedabad', batch: 'MBA 2019', now: 'PM @ Meta', avatar: '👩‍💼' },
  { name: 'Ankit P.', college: 'NIT Trichy', batch: 'ECE 2021', now: 'ML Engineer', avatar: '🧑‍🔬' },
];
export default function AlumniNet() {
  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 20 }}>👨‍🎓 Alumni Network</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
        {ALUMNI.map(a => (
          <div key={a.name} className="glass" style={{ padding: 20, borderRadius: 14 }}>
            <div style={{ fontSize: 50, textAlign: 'center' }}>{a.avatar}</div>
            <h3 style={{ textAlign: 'center', marginTop: 10 }}>{a.name}</h3>
            <div style={{ textAlign: 'center', color: 'var(--violet-2)', fontSize: 13 }}>{a.college}</div>
            <div style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: 12 }}>{a.batch}</div>
            <div style={{ textAlign: 'center', marginTop: 10, fontSize: 13 }}>💼 {a.now}</div>
            <button className="btn-primary" style={{ width: '100%', marginTop: 14 }} onClick={() => window.__a12Toast?.('Request sent', 'success')}>Connect on LinkedIn</button>
          </div>
        ))}
      </div>
    </div>
  );
}
