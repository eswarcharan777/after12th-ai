import React from 'react';
const GROUPS = [
  { name: 'NEET Warriors', members: 5, progress: 82, challenge: 'Solve 100 Biology MCQs today' },
  { name: 'JEE Squad', members: 4, progress: 65, challenge: '3 hour Physics grind' },
];
export default function GroupChallenges() {
  return (
    <div className="page-enter" style={{ maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 20 }}>🤝 Group Challenges</h1>
      {GROUPS.map((g, i) => (
        <div key={i} className="glass" style={{ padding: 20, borderRadius: 14, marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>{g.name}</h3>
            <span className="badge badge-cyan">{g.members} members</span>
          </div>
          <div style={{ margin: '10px 0', color: 'var(--text-dim)' }}>🎯 {g.challenge}</div>
          <div style={{ background: 'var(--surface)', borderRadius: 6, overflow: 'hidden', height: 12 }}>
            <div style={{ width: `${g.progress}%`, height: '100%', background: 'var(--aurora)' }} />
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 6 }}>{g.progress}% complete</div>
        </div>
      ))}
      <button className="btn-primary" style={{ width: '100%', marginTop: 14 }}>+ Create Group</button>
    </div>
  );
}
