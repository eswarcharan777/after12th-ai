import React, { useState } from 'react';

// ═══════════════════════════════════════════════════════════════════
// Molecular structures drawn as inline SVG — zero external requests.
// Ball-and-stick style with colour-coded atoms (CPK).
// ═══════════════════════════════════════════════════════════════════

const ATOM = {
  H:  { color: '#F1F5F9', stroke: '#94A3B8', r: 14 },
  C:  { color: '#334155', stroke: '#0F172A', r: 20 },
  N:  { color: '#3B82F6', stroke: '#1E3A8A', r: 20 },
  O:  { color: '#EF4444', stroke: '#7F1D1D', r: 20 },
  S:  { color: '#F59E0B', stroke: '#78350F', r: 22 },
};

// Draw bond (single or double)
const Bond = ({ x1, y1, x2, y2, double }) => {
  if (!double) return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#475569" strokeWidth="4" strokeLinecap="round" />;
  const dx = y2 - y1, dy = x1 - x2;
  const len = Math.hypot(dx, dy) || 1;
  const ox = (dx / len) * 4, oy = (dy / len) * 4;
  return (
    <>
      <line x1={x1 + ox} y1={y1 + oy} x2={x2 + ox} y2={y2 + oy} stroke="#475569" strokeWidth="3" strokeLinecap="round" />
      <line x1={x1 - ox} y1={y1 - oy} x2={x2 - ox} y2={y2 - oy} stroke="#475569" strokeWidth="3" strokeLinecap="round" />
    </>
  );
};

const Atom = ({ x, y, sym }) => {
  const a = ATOM[sym] || ATOM.C;
  return (
    <g>
      <circle cx={x} cy={y} r={a.r} fill={a.color} stroke={a.stroke} strokeWidth="2" />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="800"
        fill={sym === 'H' ? '#334155' : '#fff'} fontFamily="Sora, sans-serif">{sym}</text>
    </g>
  );
};

const Water = () => (
  <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: 300 }}>
    <rect width="300" height="300" fill="#fff" />
    <Bond x1={150} y1={150} x2={80} y2={210} />
    <Bond x1={150} y1={150} x2={220} y2={210} />
    <Atom x={80} y={210} sym="H" />
    <Atom x={220} y={210} sym="H" />
    <Atom x={150} y={150} sym="O" />
    <text x="150" y="50" textAnchor="middle" fontSize="14" fill="#475569" fontFamily="Sora">Bond angle: 104.5°</text>
  </svg>
);

const Methane = () => (
  <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: 300 }}>
    <rect width="300" height="300" fill="#fff" />
    <Bond x1={150} y1={150} x2={70} y2={80} />
    <Bond x1={150} y1={150} x2={230} y2={80} />
    <Bond x1={150} y1={150} x2={70} y2={230} />
    <Bond x1={150} y1={150} x2={230} y2={230} />
    <Atom x={70} y={80} sym="H" /><Atom x={230} y={80} sym="H" />
    <Atom x={70} y={230} sym="H" /><Atom x={230} y={230} sym="H" />
    <Atom x={150} y={150} sym="C" />
    <text x="150" y="280" textAnchor="middle" fontSize="14" fill="#475569" fontFamily="Sora">Tetrahedral · 109.5°</text>
  </svg>
);

const Ammonia = () => (
  <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: 300 }}>
    <rect width="300" height="300" fill="#fff" />
    <Bond x1={150} y1={150} x2={80} y2={220} />
    <Bond x1={150} y1={150} x2={150} y2={240} />
    <Bond x1={150} y1={150} x2={220} y2={220} />
    <Atom x={80} y={220} sym="H" /><Atom x={150} y={240} sym="H" /><Atom x={220} y={220} sym="H" />
    <Atom x={150} y={150} sym="N" />
    <ellipse cx="150" cy="100" rx="20" ry="12" fill="#DBEAFE" stroke="#1E3A8A" strokeDasharray="3" />
    <text x="150" y="105" textAnchor="middle" fontSize="10" fill="#1E3A8A">lone pair</text>
    <text x="150" y="280" textAnchor="middle" fontSize="14" fill="#475569" fontFamily="Sora">Trigonal pyramidal · 107°</text>
  </svg>
);

const CO2 = () => (
  <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: 200 }}>
    <rect width="400" height="200" fill="#fff" />
    <Bond x1={200} y1={100} x2={100} y2={100} double />
    <Bond x1={200} y1={100} x2={300} y2={100} double />
    <Atom x={100} y={100} sym="O" /><Atom x={300} y={100} sym="O" />
    <Atom x={200} y={100} sym="C" />
    <text x="200" y="180" textAnchor="middle" fontSize="14" fill="#475569" fontFamily="Sora">Linear · 180°</text>
  </svg>
);

const Benzene = () => {
  const cx = 200, cy = 180, r = 90;
  const carbons = Array.from({ length: 6 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 3;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  });
  const hydrogens = carbons.map(c => ({
    x: cx + (r + 45) * (c.x - cx) / r,
    y: cy + (r + 45) * (c.y - cy) / r,
  }));
  return (
    <svg viewBox="0 0 400 360" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: 360 }}>
      <rect width="400" height="360" fill="#fff" />
      {carbons.map((c, i) => (
        <Bond key={i} x1={c.x} y1={c.y} x2={carbons[(i + 1) % 6].x} y2={carbons[(i + 1) % 6].y} double={i % 2 === 0} />
      ))}
      {hydrogens.map((h, i) => <Bond key={`b${i}`} x1={carbons[i].x} y1={carbons[i].y} x2={h.x} y2={h.y} />)}
      {carbons.map((c, i) => <Atom key={`c${i}`} x={c.x} y={c.y} sym="C" />)}
      {hydrogens.map((h, i) => <Atom key={`h${i}`} x={h.x} y={h.y} sym="H" />)}
      <text x="200" y="30" textAnchor="middle" fontSize="14" fill="#475569" fontFamily="Sora">Planar aromatic · 120°</text>
    </svg>
  );
};

const Ethanol = () => (
  <svg viewBox="0 0 500 260" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: 260 }}>
    <rect width="500" height="260" fill="#fff" />
    <Bond x1={100} y1={150} x2={200} y2={100} />
    <Bond x1={200} y1={100} x2={300} y2={150} />
    <Bond x1={300} y1={150} x2={400} y2={100} />
    <Bond x1={100} y1={150} x2={50} y2={220} />
    <Bond x1={100} y1={150} x2={100} y2={50} />
    <Bond x1={200} y1={100} x2={200} y2={30} />
    <Bond x1={300} y1={150} x2={300} y2={220} />
    <Atom x={50} y={220} sym="H" /><Atom x={100} y={50} sym="H" /><Atom x={200} y={30} sym="H" />
    <Atom x={300} y={220} sym="H" /><Atom x={400} y={100} sym="H" />
    <Atom x={100} y={150} sym="C" /><Atom x={200} y={100} sym="C" /><Atom x={300} y={150} sym="O" />
    <text x="250" y="250" textAnchor="middle" fontSize="14" fill="#475569" fontFamily="Sora">CH₃-CH₂-OH · Hydroxyl group forms H-bonds</text>
  </svg>
);

const SulfuricAcid = () => (
  <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: 400 }}>
    <rect width="400" height="400" fill="#fff" />
    <Bond x1={200} y1={200} x2={80} y2={130} double />
    <Bond x1={200} y1={200} x2={320} y2={130} double />
    <Bond x1={200} y1={200} x2={110} y2={310} />
    <Bond x1={200} y1={200} x2={290} y2={310} />
    <Bond x1={110} y1={310} x2={60} y2={360} />
    <Bond x1={290} y1={310} x2={340} y2={360} />
    <Atom x={80} y={130} sym="O" /><Atom x={320} y={130} sym="O" />
    <Atom x={110} y={310} sym="O" /><Atom x={290} y={310} sym="O" />
    <Atom x={60} y={360} sym="H" /><Atom x={340} y={360} sym="H" />
    <Atom x={200} y={200} sym="S" />
    <text x="200" y="30" textAnchor="middle" fontSize="14" fill="#475569" fontFamily="Sora">Tetrahedral around S · Diprotic strong acid</text>
  </svg>
);

const Glucose = () => {
  const cx = 250, cy = 200, r = 90;
  const ring = Array.from({ length: 6 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 3;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a), sym: i === 0 ? 'O' : 'C' };
  });
  return (
    <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: 400 }}>
      <rect width="500" height="400" fill="#fff" />
      {ring.map((r, i) => (
        <Bond key={i} x1={r.x} y1={r.y} x2={ring[(i + 1) % 6].x} y2={ring[(i + 1) % 6].y} />
      ))}
      {ring.map((n, i) => <Atom key={`a${i}`} x={n.x} y={n.y} sym={n.sym} />)}
      <text x="250" y="380" textAnchor="middle" fontSize="14" fill="#475569" fontFamily="Sora">Pyranose ring · C₆H₁₂O₆ (OH groups omitted for clarity)</text>
    </svg>
  );
};

const MOL = [
  { name: 'Water',          formula: 'H₂O',    comp: Water,        desc: 'Bent structure with a bond angle of ~104.5°. Highly polar due to the electronegativity difference between O and H.' },
  { name: 'Methane',        formula: 'CH₄',    comp: Methane,      desc: 'Tetrahedral geometry with bond angles of 109.5°. Simplest alkane, non-polar (symmetrical).' },
  { name: 'Ammonia',        formula: 'NH₃',    comp: Ammonia,      desc: 'Trigonal pyramidal shape (bond angle ~107°) due to one lone pair on nitrogen. Basic — accepts H⁺.' },
  { name: 'Carbon Dioxide', formula: 'CO₂',    comp: CO2,          desc: 'Linear (180°). Non-polar despite polar C=O bonds because dipoles cancel. Central sp-hybridised carbon.' },
  { name: 'Benzene',        formula: 'C₆H₆',   comp: Benzene,      desc: 'Planar hexagonal ring, aromatic (6 delocalised π electrons). All C-C bonds equivalent (1.40 Å).' },
  { name: 'Ethanol',        formula: 'C₂H₅OH', comp: Ethanol,      desc: 'Contains a hydroxyl (-OH) group; forms hydrogen bonds → boiling point (78°C) much higher than ethane.' },
  { name: 'Glucose',        formula: 'C₆H₁₂O₆',comp: Glucose,      desc: 'Aldohexose; usually shown in pyranose (6-membered ring) form. Primary energy source in cellular respiration.' },
  { name: 'Sulphuric Acid', formula: 'H₂SO₄',  comp: SulfuricAcid, desc: 'Tetrahedral geometry around sulfur. Diprotic strong acid; central to many industrial processes.' },
];

export default function Molecule3D() {
  const [sel, setSel] = useState(MOL[0]);
  const Structure = sel.comp;

  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>📐 Molecule Viewer</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>Ball-and-stick structures drawn on this page. Click any molecule below.</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {MOL.map(m => (
          <button key={m.name} onClick={() => setSel(m)}
            className={sel.name === m.name ? 'btn-primary' : 'btn-outline'}
            style={{ fontSize: 13, padding: '8px 14px' }}>
            {m.name}
          </button>
        ))}
      </div>

      <div className="glass" style={{ padding: 20, borderRadius: 16, display: 'grid', gridTemplateColumns: 'minmax(280px, 1.2fr) minmax(220px, 1fr)', gap: 20, alignItems: 'center' }}>
        <div style={{ background: '#fff', padding: 12, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 320 }}>
          <Structure />
        </div>
        <div>
          <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 24, color: 'var(--text)' }}>{sel.name}</div>
          <div style={{ fontSize: 17, color: 'var(--violet-2)', fontFamily: 'monospace', marginTop: 4 }}>{sel.formula}</div>
          <div style={{ color: 'var(--text-dim)', marginTop: 14, lineHeight: 1.7 }}>{sel.desc}</div>
          <div style={{ marginTop: 18, padding: 12, background: 'rgba(139,92,246,0.08)', borderRadius: 10, fontSize: 12, color: 'var(--text-mid)', lineHeight: 1.6 }}>
            <strong>Atom colours:</strong> <span style={{ color: '#334155' }}>■</span> C · <span style={{ color: '#EF4444' }}>■</span> O · <span style={{ color: '#3B82F6' }}>■</span> N · <span style={{ color: '#F59E0B' }}>■</span> S · <span style={{ color: '#94A3B8' }}>■</span> H
          </div>
        </div>
      </div>
    </div>
  );
}
