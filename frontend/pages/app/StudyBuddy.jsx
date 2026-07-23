import React, { useState } from 'react';
const BUDDIES = [
  { name: 'Riya M.', exam: 'NEET', level: 'Level 12', match: 92, subjects: ['Biology', 'Chemistry'], avatar: '👩‍🎓', status: 'online' },
  { name: 'Aditya K.', exam: 'JEE', level: 'Level 10', match: 88, subjects: ['Physics', 'Maths'], avatar: '🧑‍🎓', status: 'online' },
  { name: 'Priyanka S.', exam: 'NEET', level: 'Level 14', match: 85, subjects: ['Biology'], avatar: '👩', status: 'away' },
  { name: 'Rohan V.', exam: 'JEE', level: 'Level 11', match: 80, subjects: ['Maths'], avatar: '👨‍💻', status: 'online' },
];
export default function StudyBuddy() {
  const [connected, setConnected] = useState([]);
  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>💬 Study Buddy Match</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>AI-matched students at your level</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
        {BUDDIES.map(b => (
          <div key={b.name} className="glass" style={{ padding: 20, borderRadius: 14 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
              <div style={{ fontSize: 42 }}>{b.avatar}</div>
              <div>
                <div style={{ fontWeight: 700 }}>{b.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{b.exam} · {b.level}</div>
              </div>
              <div style={{ marginLeft: 'auto', width: 10, height: 10, borderRadius: '50%', background: b.status === 'online' ? 'var(--green)' : '#F5A623' }} />
            </div>
            <div style={{ fontSize: 12, color: 'var(--pink-2)', fontWeight: 700, marginBottom: 8 }}>{b.match}% MATCH</div>
            <div style={{ fontSize: 13, marginBottom: 12 }}>Focus: {b.subjects.join(', ')}</div>
            <button className={connected.includes(b.name) ? 'btn-outline' : 'btn-primary'} onClick={() => { setConnected([...connected, b.name]); window.__a12Toast?.(`Connected with ${b.name} 🤝`, 'success'); }} disabled={connected.includes(b.name)} style={{ width: '100%' }}>
              {connected.includes(b.name) ? '✓ Connected' : '+ Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
