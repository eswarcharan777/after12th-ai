import React from 'react';
const PLAN = [
  { time: '6:00 AM', task: 'Wake up + light stretch (10 min)', icon: '🌅' },
  { time: '6:30 AM', task: 'Revise NCERT quick summaries', icon: '📖' },
  { time: '8:00 AM', task: 'Breakfast — light, no heavy food', icon: '🍞' },
  { time: '9:00 AM', task: 'Review formula sheets only', icon: '📐' },
  { time: '11:00 AM', task: 'Solve 5 easy PYQs (confidence boost)', icon: '✅' },
  { time: '12:30 PM', task: 'Light lunch + 15 min power nap', icon: '😴' },
  { time: '2:00 PM', task: 'Skim high-yield topics: NCERT diagrams', icon: '🧬' },
  { time: '4:00 PM', task: 'Meditation + visualization (10 min)', icon: '🧘' },
  { time: '5:00 PM', task: 'Pack exam bag (use checklist!)', icon: '🎒' },
  { time: '7:00 PM', task: 'Dinner + relax with family', icon: '🍽' },
  { time: '9:30 PM', task: 'Sleep — no more studying!', icon: '🛌' },
];
export default function LastMinute() {
  return (
    <div className="page-enter" style={{ maxWidth: 700, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>📋 Last-Minute Revision (1 day before)</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>Follow this exact plan the day before your exam.</p>
      {PLAN.map((p, i) => (
        <div key={i} className="glass" style={{ padding: 16, borderRadius: 12, marginBottom: 10, display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ fontSize: 30 }}>{p.icon}</div>
          <div style={{ minWidth: 90, color: 'var(--violet-2)', fontWeight: 700 }}>{p.time}</div>
          <div style={{ flex: 1 }}>{p.task}</div>
        </div>
      ))}
    </div>
  );
}
