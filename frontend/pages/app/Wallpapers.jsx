import React from 'react';
const WPS = [
  { name: 'Aurora Dreams', grad: 'linear-gradient(135deg, #8B5CF6, #EC4899, #06B6D4)', quote: 'Dream big. Study bigger.' },
  { name: 'Cosmic Focus', grad: 'linear-gradient(135deg, #0B0F1F, #4C1D95, #831843)', quote: 'The universe rewards persistence.' },
  { name: 'Ocean Mind', grad: 'linear-gradient(135deg, #06B6D4, #3B82F6, #8B5CF6)', quote: 'Flow like water. Focus like a laser.' },
  { name: 'Sunrise Rise', grad: 'linear-gradient(135deg, #F5A623, #EC4899, #8B5CF6)', quote: 'Every morning is a fresh start.' },
];
const dl = (w) => {
  const c = document.createElement('canvas'); c.width = 1080; c.height = 1920;
  const ctx = c.getContext('2d');
  const parts = w.grad.match(/#[0-9A-F]{6}/gi);
  const g = ctx.createLinearGradient(0, 0, 1080, 1920);
  parts.forEach((col, i) => g.addColorStop(i / (parts.length - 1), col));
  ctx.fillStyle = g; ctx.fillRect(0, 0, 1080, 1920);
  ctx.font = 'bold 60px Sora'; ctx.textAlign = 'center'; ctx.fillStyle = '#fff';
  ctx.fillText(w.quote, 540, 960);
  ctx.font = '32px DM Sans'; ctx.fillText('After12th AI', 540, 1780);
  const a = document.createElement('a'); a.href = c.toDataURL(); a.download = `${w.name}.png`; a.click();
};
export default function Wallpapers() {
  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 20 }}>🖼 Study Wallpapers</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
        {WPS.map(w => (
          <div key={w.name} style={{ padding: 40, borderRadius: 16, background: w.grad, minHeight: 320, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ color: 'white', fontWeight: 800, fontFamily: 'Sora', fontSize: 22, textAlign: 'center' }}>{w.quote}</div>
            <button className="btn-outline" onClick={() => dl(w)} style={{ background: 'rgba(0,0,0,0.4)' }}>⬇ Download</button>
          </div>
        ))}
      </div>
    </div>
  );
}
