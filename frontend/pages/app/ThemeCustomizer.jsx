import React, { useState, useEffect } from 'react';
const THEMES = {
  aurora: { name: 'Aurora', violet: '#8B5CF6', pink: '#EC4899', cyan: '#06B6D4' },
  cyber: { name: 'Cyber', violet: '#00FF88', pink: '#FF0080', cyan: '#00E5FF' },
  mint: { name: 'Mint', violet: '#10B981', pink: '#06D6A0', cyan: '#22D3EE' },
  saffron: { name: 'Saffron', violet: '#FF9933', pink: '#F5A623', cyan: '#EF4444' },
  ocean: { name: 'Ocean', violet: '#3B82F6', pink: '#8B5CF6', cyan: '#06B6D4' },
};
export default function ThemeCustomizer() {
  const [current, setCurrent] = useState(localStorage.getItem('a12_theme') || 'aurora');
  const apply = (id) => {
    const t = THEMES[id];
    document.documentElement.style.setProperty('--violet', t.violet);
    document.documentElement.style.setProperty('--pink', t.pink);
    document.documentElement.style.setProperty('--cyan', t.cyan);
    document.documentElement.style.setProperty('--aurora', `linear-gradient(135deg, ${t.violet} 0%, ${t.pink} 50%, ${t.cyan} 100%)`);
    localStorage.setItem('a12_theme', id);
    setCurrent(id);
    window.__a12Toast?.(`Theme: ${t.name}`, 'success');
  };
  useEffect(() => { apply(current); /* eslint-disable-next-line */ }, []);
  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 20 }}>🌈 Theme Customizer</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
        {Object.entries(THEMES).map(([id, t]) => (
          <button key={id} onClick={() => apply(id)} className="glass" style={{ padding: 20, borderRadius: 14, cursor: 'pointer', border: current === id ? '2px solid var(--violet)' : '1px solid var(--border)' }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: t.violet }} />
              <div style={{ width: 40, height: 40, borderRadius: 8, background: t.pink }} />
              <div style={{ width: 40, height: 40, borderRadius: 8, background: t.cyan }} />
            </div>
            <div style={{ fontWeight: 700 }}>{t.name}</div>
            {current === id && <div style={{ color: 'var(--green)', fontSize: 12, marginTop: 4 }}>✓ Active</div>}
          </button>
        ))}
      </div>
    </div>
  );
}
