import React from 'react';
const BADGES = [
  { name: 'First Steps', icon: '👶', desc: 'Completed onboarding', color: '#94A3B8' },
  { name: 'Streak Warrior', icon: '🔥', desc: '7-day streak', color: '#EF4444' },
  { name: 'Quiz Master', icon: '🎲', desc: '50 quiz questions', color: '#8B5CF6' },
  { name: 'Test Champion', icon: '🏆', desc: '10 mock tests', color: '#F5A623' },
  { name: 'Focus Guru', icon: '🧘', desc: '20 Pomodoros', color: '#10B981' },
  { name: 'Night Owl', icon: '🦉', desc: 'Studied past midnight', color: '#06B6D4' },
];
const download = (b) => {
  const c = document.createElement('canvas'); c.width = 600; c.height = 600;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 600, 600); g.addColorStop(0, b.color); g.addColorStop(1, '#0B0F1F');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 600, 600);
  ctx.fillStyle = 'rgba(11,15,31,0.85)'; ctx.beginPath(); ctx.arc(300, 300, 250, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = b.color; ctx.lineWidth = 6; ctx.stroke();
  ctx.font = '160px sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#fff';
  ctx.fillText(b.icon, 300, 320);
  ctx.font = 'bold 28px Sora'; ctx.fillText(b.name, 300, 430);
  ctx.font = '16px DM Sans'; ctx.fillStyle = '#CBD5E1'; ctx.fillText('After12th AI Achievement', 300, 470);
  const a = document.createElement('a'); a.href = c.toDataURL(); a.download = `${b.name}.png`; a.click();
};
export default function Achievements() {
  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 20 }}>🏅 Achievement Badges</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
        {BADGES.map(b => (
          <div key={b.name} className="glass" style={{ padding: 24, borderRadius: 16, textAlign: 'center', border: `2px solid ${b.color}` }}>
            <div style={{ fontSize: 60 }}>{b.icon}</div>
            <h3 style={{ marginTop: 10 }}>{b.name}</h3>
            <div style={{ color: 'var(--text-dim)', fontSize: 12, marginBottom: 12 }}>{b.desc}</div>
            <button className="btn-outline" onClick={() => download(b)}>⬇ Download PNG</button>
          </div>
        ))}
      </div>
    </div>
  );
}
