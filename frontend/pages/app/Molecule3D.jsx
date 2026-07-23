import React, { useState } from 'react';
const MOL = [
  { name: 'Water (H₂O)', formula: 'H₂O', desc: 'Bent structure, 104.5°' },
  { name: 'Methane (CH₄)', formula: 'CH₄', desc: 'Tetrahedral, 109.5°' },
  { name: 'Benzene (C₆H₆)', formula: 'C₆H₆', desc: 'Planar hexagonal ring' },
  { name: 'Ammonia (NH₃)', formula: 'NH₃', desc: 'Trigonal pyramidal' },
];
export default function Molecule3D() {
  const [sel, setSel] = useState(MOL[0]);
  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 20 }}>📐 3D Molecule Viewer</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {MOL.map(m => <button key={m.name} onClick={() => setSel(m)} className={sel.name === m.name ? 'btn-primary' : 'btn-outline'}>{m.name}</button>)}
      </div>
      <div className="glass" style={{ padding: 6, borderRadius: 16 }}>
        <iframe title="3D Molecule" src={`https://embed.molview.org/v1/?mode=balls&q=${encodeURIComponent(sel.formula)}`} style={{ width: '100%', height: 500, border: 0, borderRadius: 12 }} />
      </div>
      <div className="glass" style={{ padding: 20, borderRadius: 14, marginTop: 14 }}>
        <h3>{sel.name}</h3>
        <div style={{ color: 'var(--text-dim)' }}>{sel.desc}</div>
      </div>
    </div>
  );
}
