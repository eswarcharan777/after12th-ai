import React from 'react';
const YEARS = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016];
export default function PYQ() {
  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>📝 Previous Year Papers</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>Last 10 years NEET/JEE papers with solutions</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
        {YEARS.map(y => (
          <div key={y} className="glass" style={{ padding: 20, borderRadius: 14 }}>
            <div style={{ fontFamily: 'Sora', fontSize: 28, fontWeight: 800, background: 'var(--aurora)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{y}</div>
            <div style={{ fontSize: 13, color: 'var(--text-dim)', margin: '6px 0 12px' }}>NEET / JEE Papers</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <a href={`https://www.google.com/search?q=NEET+${y}+question+paper+PDF`} target="_blank" rel="noopener" className="btn-outline" style={{ fontSize: 12, padding: '6px 10px', flex: 1 }}>NEET</a>
              <a href={`https://www.google.com/search?q=JEE+Main+${y}+question+paper+PDF`} target="_blank" rel="noopener" className="btn-outline" style={{ fontSize: 12, padding: '6px 10px', flex: 1 }}>JEE</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
