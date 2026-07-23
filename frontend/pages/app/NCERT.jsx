import React from 'react';
const CHAPTERS = {
  Physics: ['Motion in a Plane', 'Laws of Motion', 'Work Energy Power', 'Gravitation', 'Thermodynamics', 'Waves', 'Electric Charges', 'Current Electricity', 'Magnetism', 'Optics', 'Modern Physics'],
  Chemistry: ['Some Basic Concepts', 'Structure of Atom', 'Chemical Bonding', 'States of Matter', 'Thermodynamics', 'Equilibrium', 'Redox', 'Organic Basics', 'Hydrocarbons', 'Environmental Chem'],
  Biology: ['Living World', 'Biological Classification', 'Plant Kingdom', 'Animal Kingdom', 'Cell Structure', 'Biomolecules', 'Cell Cycle', 'Photosynthesis', 'Respiration', 'Reproduction', 'Genetics', 'Evolution', 'Ecology'],
};
export default function NCERT() {
  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>📚 NCERT Solutions</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>Chapter-wise NCERT exercise answers</p>
      {Object.entries(CHAPTERS).map(([sub, list]) => (
        <div key={sub} className="glass" style={{ padding: 20, borderRadius: 14, marginBottom: 16 }}>
          <h3 style={{ fontFamily: 'Sora', marginBottom: 12 }}>{sub}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8 }}>
            {list.map(ch => (
              <a key={ch} href={`https://www.google.com/search?q=NCERT+${sub}+${ch.replace(/ /g, '+')}+solutions`} target="_blank" rel="noopener"
                style={{ padding: 10, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13 }}>📖 {ch} →</a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
