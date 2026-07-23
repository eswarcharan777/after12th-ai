import React from 'react';
export default function Wrapped() {
  const scores = JSON.parse(localStorage.getItem('after12th_scores') || '[]');
  const pomo = JSON.parse(localStorage.getItem('a12_pomo_log') || '[]');
  const totalMins = pomo.reduce((a, p) => a + p.minutes, 0);
  const xp = JSON.parse(localStorage.getItem('a12_xp_state') || '{}').xp || 0;
  const topSub = Object.entries(pomo.reduce((a, p) => ({ ...a, [p.subject]: (a[p.subject] || 0) + p.minutes }), {})).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';
  const bestScore = Math.max(0, ...scores.map(s => s.score));
  const slides = [
    { bg: 'linear-gradient(135deg, #8B5CF6, #EC4899)', title: 'Your 2026 Wrapped', big: '🎉' },
    { bg: 'linear-gradient(135deg, #EC4899, #F5A623)', title: 'You studied for', big: `${Math.floor(totalMins / 60)}h ${totalMins % 60}m` },
    { bg: 'linear-gradient(135deg, #06B6D4, #8B5CF6)', title: 'Your top subject', big: topSub },
    { bg: 'linear-gradient(135deg, #10B981, #06B6D4)', title: 'Total XP earned', big: `${xp}` },
    { bg: 'linear-gradient(135deg, #F5A623, #EF4444)', title: 'Best mock score', big: `${bestScore}` },
    { bg: 'linear-gradient(135deg, #8B5CF6, #F472B6)', title: 'Tests taken', big: `${scores.length}` },
  ];
  const [idx, setIdx] = React.useState(0);
  return (
    <div className="page-enter" style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 28, fontWeight: 800, marginBottom: 20 }}>📊 Year-end Wrapped</h1>
      <div onClick={() => setIdx((idx + 1) % slides.length)} style={{
        padding: 60, borderRadius: 24, background: slides[idx].bg,
        minHeight: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center', cursor: 'pointer',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}>
        <div style={{ color: 'white', fontSize: 24, opacity: 0.85 }}>{slides[idx].title}</div>
        <div style={{ fontSize: 80, fontWeight: 900, color: 'white', margin: '20px 0', fontFamily: 'Sora' }}>{slides[idx].big}</div>
        <div style={{ color: 'white', opacity: 0.7, fontSize: 12 }}>Tap for next · {idx + 1}/{slides.length}</div>
      </div>
    </div>
  );
}
