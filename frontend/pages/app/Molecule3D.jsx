import React, { useState } from 'react';

// Molecule structure renderings served from /public/molecules/
// (populated by scripts/fetch-assets.ps1 — PubChem public-domain images).
// Prefer /public/molecules/*.png (from scripts/fetch-assets.ps1);
// fall back to PubChem's public-domain image server when the local file is missing.
const pub = (cid) => `https://pubchem.ncbi.nlm.nih.gov/image/imagefly.cgi?cid=${cid}&width=500&height=500`;
const MOL = [
  { name: 'Water',          formula: 'H₂O',    img: '/molecules/water.png',    fallback: pub(962),  desc: 'Bent shape, bond angle ~104.5°. Polar due to O being much more electronegative than H.' },
  { name: 'Methane',        formula: 'CH₄',    img: '/molecules/methane.png',  fallback: pub(297),  desc: 'Tetrahedral geometry, bond angles 109.5°. Simplest alkane. Non-polar and symmetric.' },
  { name: 'Ammonia',        formula: 'NH₃',    img: '/molecules/ammonia.png',  fallback: pub(222),  desc: 'Trigonal pyramidal (bond angle ~107°) because of one lone pair on nitrogen. Basic — accepts H⁺.' },
  { name: 'Carbon Dioxide', formula: 'CO₂',    img: '/molecules/co2.png',      fallback: pub(280),  desc: 'Linear (180°). Non-polar overall — polar C=O bond dipoles cancel. Central sp-hybridised carbon.' },
  { name: 'Benzene',        formula: 'C₆H₆',   img: '/molecules/benzene.png',  fallback: pub(241),  desc: 'Planar hexagonal ring, aromatic (6 delocalised π electrons). All C-C bonds are equivalent (1.40 Å).' },
  { name: 'Ethanol',        formula: 'C₂H₅OH', img: '/molecules/ethanol.png',  fallback: pub(702),  desc: 'Contains a hydroxyl (-OH) group; hydrogen bonding raises the boiling point to 78°C.' },
  { name: 'Glucose',        formula: 'C₆H₁₂O₆',img: '/molecules/glucose.png',  fallback: pub(5793), desc: 'Aldohexose; usually drawn in its pyranose (6-membered ring) form. Central to respiration.' },
  { name: 'Sulphuric Acid', formula: 'H₂SO₄',  img: '/molecules/sulfuric.png', fallback: pub(1118), desc: 'Tetrahedral around sulfur. Diprotic strong acid; foundation of many industrial processes.' },
  { name: 'Ethene',         formula: 'C₂H₄',   img: '/molecules/ethene.png',   fallback: pub(6325), desc: 'Planar (all atoms in one plane), C=C double bond, bond angle 120°. Simplest alkene.' },
  { name: 'Aspirin',        formula: 'C₉H₈O₄', img: '/molecules/aspirin.png',  fallback: pub(2244), desc: 'Acetylsalicylic acid. Analgesic and antipyretic drug.' },
  { name: 'Caffeine',       formula: 'C₈H₁₀N₄O₂', img: '/molecules/caffeine.png', fallback: pub(2519), desc: 'A methylxanthine alkaloid. Fused-ring purine derivative; central nervous system stimulant.' },
];

export default function Molecule3D() {
  const [sel, setSel] = useState(MOL[0]);
  const [src, setSrc] = useState(MOL[0].img);
  const [imgOk, setImgOk] = useState(true);

  const pick = (m) => { setImgOk(true); setSel(m); setSrc(m.img); };
  const onImgError = () => {
    if (src === sel.img && sel.fallback) { setSrc(sel.fallback); return; }
    setImgOk(false);
  };

  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>📐 Molecule Viewer</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>Real molecular structures. All images served from our own site.</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {MOL.map(m => (
          <button key={m.name} onClick={() => pick(m)}
            className={sel.name === m.name ? 'btn-primary' : 'btn-outline'}
            style={{ fontSize: 13, padding: '8px 14px' }}>
            {m.name}
          </button>
        ))}
      </div>

      <div className="glass" style={{ padding: 20, borderRadius: 16, display: 'grid', gridTemplateColumns: 'minmax(280px, 1.2fr) minmax(220px, 1fr)', gap: 20, alignItems: 'center' }}>
        <div style={{ background: '#fff', padding: 14, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 340 }}>
          {imgOk ? (
            <img src={src} alt={`Structure of ${sel.name}`} loading="eager" onError={onImgError}
              style={{ maxWidth: '100%', maxHeight: 360, objectFit: 'contain' }} />
          ) : (
            <div style={{ color: '#666', fontSize: 13, textAlign: 'center', padding: 20 }}>
              Structure temporarily unavailable — please pick another.
            </div>
          )}
        </div>
        <div>
          <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 24, color: 'var(--text)' }}>{sel.name}</div>
          <div style={{ fontSize: 17, color: 'var(--violet-2)', fontFamily: 'monospace', marginTop: 4 }}>{sel.formula}</div>
          <div style={{ color: 'var(--text-dim)', marginTop: 14, lineHeight: 1.7 }}>{sel.desc}</div>
        </div>
      </div>
    </div>
  );
}
