import React, { useState } from 'react';

// PubChem CID for each molecule → gives us reliable 3D-render PNGs (no iframe issues).
const MOL = [
  { name: 'Water',     formula: 'H₂O',    cid: 962,   desc: 'Bent structure with a bond angle of ~104.5°. Highly polar due to the difference in electronegativity between O and H.' },
  { name: 'Methane',   formula: 'CH₄',    cid: 297,   desc: 'Tetrahedral geometry with bond angles of 109.5°. Simplest alkane, non-polar.' },
  { name: 'Ammonia',   formula: 'NH₃',    cid: 222,   desc: 'Trigonal pyramidal shape (bond angle ~107°) due to one lone pair on nitrogen.' },
  { name: 'Benzene',   formula: 'C₆H₆',   cid: 241,   desc: 'Planar hexagonal ring, aromatic (6 delocalised π electrons). All C–C bonds are equivalent (1.40 Å).' },
  { name: 'Ethanol',   formula: 'C₂H₅OH', cid: 702,   desc: 'Contains a hydroxyl (–OH) group; forms hydrogen bonds → high boiling point for its size.' },
  { name: 'Glucose',   formula: 'C₆H₁₂O₆',cid: 5793,  desc: 'Aldohexose; usually drawn in its pyranose (6-membered ring) form. Primary energy source in respiration.' },
  { name: 'CO₂',       formula: 'CO₂',    cid: 280,   desc: 'Linear (180°), non-polar despite polar C=O bonds. Central sp-hybridised carbon.' },
  { name: 'Sulphuric Acid', formula: 'H₂SO₄', cid: 1118, desc: 'Tetrahedral around S. Diprotic strong acid; central to many industrial processes.' },
];

export default function Molecule3D() {
  const [sel, setSel] = useState(MOL[0]);
  const [imgOk, setImgOk] = useState(true);

  // PubChem's public image endpoint — returns a 3D-style rendering of the molecule.
  const imgUrl = `https://pubchem.ncbi.nlm.nih.gov/image/imagefly.cgi?cid=${sel.cid}&width=500&height=500`;

  const handleSelect = (m) => { setImgOk(true); setSel(m); };

  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>📐 3D Molecule Viewer</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>Molecular structures rendered via PubChem. Click any molecule below.</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {MOL.map(m => (
          <button key={m.name} onClick={() => handleSelect(m)}
            className={sel.name === m.name ? 'btn-primary' : 'btn-outline'}
            style={{ fontSize: 13, padding: '8px 14px' }}>
            {m.name}
          </button>
        ))}
      </div>

      <div className="glass" style={{ padding: 20, borderRadius: 16, display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#fff', padding: 12, borderRadius: 12, minWidth: 300, minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {imgOk ? (
            <img
              src={imgUrl}
              alt={`Structure of ${sel.name}`}
              onError={() => setImgOk(false)}
              style={{ maxWidth: 300, maxHeight: 300, objectFit: 'contain' }}
            />
          ) : (
            <div style={{ color: '#333', fontSize: 13, textAlign: 'center', padding: 20 }}>
              Image temporarily unavailable.<br />
              <a href={`https://pubchem.ncbi.nlm.nih.gov/compound/${sel.cid}`} target="_blank" rel="noopener noreferrer" style={{ color: '#8B5CF6' }}>
                Open on PubChem →
              </a>
            </div>
          )}
        </div>

        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 22, color: 'var(--text)' }}>{sel.name}</div>
          <div style={{ fontSize: 15, color: 'var(--violet-2)', fontFamily: 'monospace', marginTop: 4 }}>{sel.formula}</div>
          <div style={{ color: 'var(--text-dim)', marginTop: 12, lineHeight: 1.6 }}>{sel.desc}</div>
          <a href={`https://pubchem.ncbi.nlm.nih.gov/compound/${sel.cid}`} target="_blank" rel="noopener noreferrer"
             style={{ display: 'inline-block', marginTop: 14, color: 'var(--violet-2)', fontSize: 13, textDecoration: 'none' }}>
            🔬 Open interactive 3D on PubChem →
          </a>
        </div>
      </div>
    </div>
  );
}
