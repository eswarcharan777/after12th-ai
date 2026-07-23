import React from 'react';
export default function Certificate() {
  const user = JSON.parse(localStorage.getItem('after12th_user') || '{}');
  const download = () => {
    const c = document.createElement('canvas'); c.width = 1400; c.height = 1000;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#0B0F1F'; ctx.fillRect(0, 0, 1400, 1000);
    ctx.strokeStyle = '#8B5CF6'; ctx.lineWidth = 8; ctx.strokeRect(30, 30, 1340, 940);
    ctx.strokeStyle = '#EC4899'; ctx.lineWidth = 3; ctx.strokeRect(60, 60, 1280, 880);
    ctx.fillStyle = '#F5A623'; ctx.font = 'bold 60px Sora'; ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE OF ACHIEVEMENT', 700, 180);
    ctx.fillStyle = '#CBD5E1'; ctx.font = '30px DM Sans'; ctx.fillText('This is proudly presented to', 700, 320);
    ctx.fillStyle = '#F472B6'; ctx.font = 'bold 80px Sora'; ctx.fillText(user.name || 'Student', 700, 460);
    ctx.fillStyle = '#fff'; ctx.font = '28px DM Sans'; ctx.fillText('for successfully completing the After12th AI', 700, 560);
    ctx.fillText(`${user.exam || 'NEET'} preparation program`, 700, 610);
    ctx.fillStyle = '#8B5CF6'; ctx.font = 'bold 24px Sora'; ctx.fillText(`Issued on ${new Date().toDateString()}`, 700, 800);
    ctx.fillStyle = '#A78BFA'; ctx.font = '20px DM Sans'; ctx.fillText('after12th-ai.vercel.app', 700, 900);
    const a = document.createElement('a'); a.href = c.toDataURL(); a.download = 'certificate.png'; a.click();
  };
  return (
    <div className="page-enter" style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 20 }}>🎓 Graduation Certificate</h1>
      <div className="glass-strong" style={{ padding: 40, borderRadius: 20, border: '3px solid var(--violet)', marginBottom: 20 }}>
        <div style={{ color: 'var(--gold)', fontFamily: 'Sora', fontSize: 22, fontWeight: 800 }}>CERTIFICATE OF ACHIEVEMENT</div>
        <div style={{ marginTop: 20 }}>presented to</div>
        <div style={{ fontFamily: 'Sora', fontSize: 40, fontWeight: 900, background: 'var(--aurora)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '20px 0' }}>{user.name}</div>
        <div>for completing After12th AI {user.exam || 'NEET'} program</div>
      </div>
      <button className="btn-primary" onClick={download}>⬇ Download Certificate</button>
    </div>
  );
}
