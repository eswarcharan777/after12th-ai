import React, { useState } from 'react';
const DIAG = [
  { name: 'Animal Cell', parts: ['Nucleus', 'Mitochondria', 'ER', 'Golgi', 'Ribosome', 'Cell Membrane'], emoji: '🔬' },
  { name: 'Plant Cell', parts: ['Chloroplast', 'Cell Wall', 'Vacuole', 'Nucleus', 'Cytoplasm'], emoji: '🌱' },
  { name: 'Human Heart', parts: ['Right Atrium', 'Left Atrium', 'Right Ventricle', 'Left Ventricle', 'Aorta', 'Vena Cava'], emoji: '❤️' },
  { name: 'Nephron', parts: ['Glomerulus', 'Bowman\'s Capsule', 'PCT', 'Loop of Henle', 'DCT', 'Collecting Duct'], emoji: '🫘' },
  { name: 'Neuron', parts: ['Cell body', 'Dendrites', 'Axon', 'Myelin sheath', 'Synapse'], emoji: '🧠' },
  { name: 'DNA Double Helix', parts: ['Sugar-phosphate backbone', 'Base pairs', 'Hydrogen bonds', 'Major groove'], emoji: '🧬' },
];
export default function BioDiagrams() {
  const [sel, setSel] = useState(null);
  return (
    <div className="page-enter" style={{ maxWidth: 1000, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 20 }}>🧬 Biology Diagrams</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 20 }}>
        {DIAG.map(d => (
          <button key={d.name} onClick={() => setSel(d)} className="glass" style={{ padding: 20, borderRadius: 14, textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ fontSize: 40 }}>{d.emoji}</div>
            <div style={{ fontWeight: 700, marginTop: 8 }}>{d.name}</div>
          </button>
        ))}
      </div>
      {sel && (
        <div className="glass-strong pulse-glow" style={{ padding: 30, borderRadius: 16 }}>
          <h3>{sel.emoji} {sel.name} — labeled parts</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10, marginTop: 16 }}>
            {sel.parts.map((p, i) => (
              <div key={p} style={{ padding: 12, background: 'rgba(139,92,246,0.1)', borderRadius: 10, border: '1px solid var(--violet)' }}>
                <div style={{ fontSize: 12, color: 'var(--violet-2)', fontWeight: 700 }}>#{i + 1}</div>
                <div>{p}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
