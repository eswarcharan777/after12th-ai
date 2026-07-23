import React from 'react';
const SENIORS = [
  { name: 'Aarav Sharma', college: 'IIT Bombay CSE', year: '2nd year', avatar: '🧑‍💻', bio: 'AIR 245 · Happy to help with JEE strategy', rate: 'Free' },
  { name: 'Ishita Patel', college: 'AIIMS Delhi MBBS', year: '3rd year', avatar: '👩‍⚕️', bio: 'AIR 89 · Guide on NEET Biology tricks', rate: 'Free' },
  { name: 'Karthik R.', college: 'NIT Trichy ECE', year: 'Final year', avatar: '🧑‍🎓', bio: 'Placed at Amazon · Career + prep advice', rate: 'Free' },
  { name: 'Sneha Iyer', college: 'BITS Pilani', year: '4th year', avatar: '👩‍🔬', bio: 'Full stack dev · College life advice', rate: 'Free' },
];
export default function AskSenior() {
  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>👨‍🏫 Ask a Senior</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>Verified seniors from top colleges — free advice</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
        {SENIORS.map(s => (
          <div key={s.name} className="glass" style={{ padding: 20, borderRadius: 14 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 40 }}>{s.avatar}</div>
              <div>
                <div style={{ fontWeight: 700 }}>{s.name}</div>
                <div style={{ fontSize: 12, color: 'var(--violet-2)' }}>{s.college}</div>
                <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{s.year}</div>
              </div>
            </div>
            <div style={{ fontSize: 13, marginBottom: 12 }}>{s.bio}</div>
            <button className="btn-primary" onClick={() => window.__a12Toast?.('Request sent!', 'success')} style={{ width: '100%' }}>Request Chat ({s.rate})</button>
          </div>
        ))}
      </div>
    </div>
  );
}
