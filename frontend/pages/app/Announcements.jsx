import React from 'react';
const NEWS = [
  { date: 'Jul 1, 2026', title: 'NEET-UG 2026 Results Released', body: 'Cut-offs updated for all categories. Check yours in Rank Predictor.', tag: 'RESULT', color: '#EF4444' },
  { date: 'Jun 15, 2026', title: 'JEE Advanced 2026 Registration Open', body: 'Deadline: July 5. Only JEE Main qualifiers can apply.', tag: 'EXAM', color: '#F5A623' },
  { date: 'Jun 10, 2026', title: 'AIIMS Counselling Round 2', body: 'Choice filling closes June 20. See seat availability.', tag: 'COUNSELLING', color: '#8B5CF6' },
  { date: 'May 28, 2026', title: 'New: AI Photo Doubt Feature Live', body: 'Snap any question → Gemini Vision solves it instantly.', tag: 'FEATURE', color: '#10B981' },
];
export default function Announcements() {
  return (
    <div className="page-enter" style={{ maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 20 }}>📣 Announcement Feed</h1>
      {NEWS.map((n, i) => (
        <div key={i} className="glass" style={{ padding: 20, borderRadius: 14, marginBottom: 12, borderLeft: `4px solid ${n.color}` }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'center' }}>
            <span className="badge" style={{ background: `${n.color}22`, color: n.color, borderColor: n.color }}>{n.tag}</span>
            <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>{n.date}</span>
          </div>
          <h3 style={{ fontFamily: 'Sora', marginBottom: 6 }}>{n.title}</h3>
          <p style={{ color: 'var(--text-mid)' }}>{n.body}</p>
        </div>
      ))}
    </div>
  );
}
