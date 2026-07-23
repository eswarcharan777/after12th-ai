import React, { useRef } from 'react';
export default function ScoreCard() {
  const ref = useRef();
  const scores = JSON.parse(localStorage.getItem('after12th_scores') || '[]');
  const latest = scores[scores.length - 1] || { score: 0, total: 100, exam: 'NEET' };
  const user = JSON.parse(localStorage.getItem('after12th_user') || '{}');
  const download = async () => {
    const c = document.createElement('canvas'); c.width = 1080; c.height = 1080;
    const ctx = c.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 1080, 1080);
    grad.addColorStop(0, '#8B5CF6'); grad.addColorStop(0.5, '#EC4899'); grad.addColorStop(1, '#06B6D4');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, 1080, 1080);
    ctx.fillStyle = 'rgba(11,15,31,0.85)'; ctx.roundRect(60, 60, 960, 960, 40); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = 'bold 44px Sora, sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('After12th AI', 540, 200);
    ctx.font = 'bold 24px Sora'; ctx.fillStyle = '#CBD5E1'; ctx.fillText(`${latest.exam} Mock Test`, 540, 260);
    ctx.font = 'bold 200px Sora'; ctx.fillStyle = '#F472B6'; ctx.fillText(`${latest.score}`, 540, 560);
    ctx.font = '32px DM Sans'; ctx.fillStyle = '#94A3B8'; ctx.fillText(`out of ${latest.total}`, 540, 620);
    ctx.font = 'bold 30px Sora'; ctx.fillStyle = '#fff'; ctx.fillText(user.name || 'Student', 540, 780);
    ctx.font = '24px DM Sans'; ctx.fillStyle = '#A78BFA'; ctx.fillText('after12th-ai.vercel.app', 540, 960);
    const url = c.toDataURL(); const a = document.createElement('a'); a.href = url; a.download = 'my-score.png'; a.click();
  };
  return (
    <div className="page-enter" style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 20 }}>📸 Shareable Score Card</h1>
      <div ref={ref} className="glass-strong" style={{ padding: 40, borderRadius: 20, background: 'var(--aurora)' }}>
        <div style={{ fontSize: 20, color: 'white', opacity: 0.85 }}>After12th AI · {latest.exam}</div>
        <div style={{ fontSize: 100, fontWeight: 900, color: 'white', margin: '20px 0' }}>{latest.score}</div>
        <div style={{ color: 'white', opacity: 0.85 }}>out of {latest.total} · {user.name}</div>
      </div>
      <button className="btn-primary" onClick={download} style={{ marginTop: 20 }}>⬇ Download for Instagram</button>
    </div>
  );
}
