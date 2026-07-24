import React, { useState } from 'react';

// Real NCERT-quality diagrams served from /public/diagrams/
// (populated by scripts/fetch-assets.ps1 — free-license Wikimedia Commons files).
const DIAG = [
  { key: 'animal',    name: 'Animal Cell',      emoji: '🔬', img: '/diagrams/animal-cell.png',
    parts: ['Nucleus', 'Nucleolus', 'Mitochondria', 'Endoplasmic Reticulum', 'Golgi Apparatus', 'Ribosome', 'Lysosome', 'Cell Membrane', 'Cytoplasm'] },
  { key: 'plant',     name: 'Plant Cell',       emoji: '🌱', img: '/diagrams/plant-cell.png',
    parts: ['Cell Wall', 'Plasma Membrane', 'Nucleus', 'Chloroplast', 'Central Vacuole', 'Mitochondria', 'Cytoplasm', 'Plasmodesmata'] },
  { key: 'heart',     name: 'Human Heart',      emoji: '❤️', img: '/diagrams/heart.png',
    parts: ['Right Atrium', 'Left Atrium', 'Right Ventricle', 'Left Ventricle', 'Aorta', 'Pulmonary Artery', 'Superior Vena Cava', 'Tricuspid Valve', 'Mitral Valve'] },
  { key: 'nephron',   name: 'Nephron',          emoji: '🫘', img: '/diagrams/nephron.png',
    parts: ['Glomerulus', "Bowman's Capsule", 'Proximal Convoluted Tubule (PCT)', 'Loop of Henle', 'Distal Convoluted Tubule (DCT)', 'Collecting Duct'] },
  { key: 'neuron',    name: 'Neuron',           emoji: '🧠', img: '/diagrams/neuron.png',
    parts: ['Cell Body (Soma)', 'Dendrites', 'Axon', 'Myelin Sheath', 'Nodes of Ranvier', 'Axon Terminals'] },
  { key: 'dna',       name: 'DNA Structure',    emoji: '🧬', img: '/diagrams/dna.png',
    parts: ['Sugar-phosphate backbone', 'Adenine (A)', 'Thymine (T)', 'Guanine (G)', 'Cytosine (C)', 'Hydrogen bonds', 'Antiparallel strands'] },
  { key: 'intestine', name: 'Small Intestine',  emoji: '🌀', img: '/diagrams/small-intestine.png',
    parts: ['Duodenum', 'Jejunum', 'Ileum', 'Villi', 'Microvilli', 'Lacteals'] },
  { key: 'eye',       name: 'Human Eye',        emoji: '👁️', img: '/diagrams/eye.png',
    parts: ['Cornea', 'Iris', 'Pupil', 'Lens', 'Retina', 'Optic Nerve', 'Ciliary Body', 'Vitreous Humour'] },
  { key: 'brain',     name: 'Human Brain',      emoji: '🧠', img: '/diagrams/brain.png',
    parts: ['Cerebrum', 'Cerebellum', 'Brain Stem', 'Frontal Lobe', 'Parietal Lobe', 'Corpus Callosum'] },
  { key: 'digestive', name: 'Digestive System', emoji: '🍽️', img: '/diagrams/digestive.png',
    parts: ['Mouth', 'Oesophagus', 'Stomach', 'Liver', 'Pancreas', 'Small Intestine', 'Large Intestine', 'Rectum'] },
  { key: 'respiratory', name: 'Respiratory System', emoji: '🫁', img: '/diagrams/respiratory.png',
    parts: ['Nasal Cavity', 'Pharynx', 'Larynx', 'Trachea', 'Bronchi', 'Bronchioles', 'Alveoli', 'Diaphragm'] },
  { key: 'mito',      name: 'Mitochondrion',    emoji: '⚡', img: '/diagrams/mitochondrion.png',
    parts: ['Outer Membrane', 'Inner Membrane', 'Cristae', 'Matrix', 'Intermembrane Space', 'DNA', 'Ribosomes'] },
];

export default function BioDiagrams() {
  const [sel, setSel] = useState(DIAG[0]);
  const [imgOk, setImgOk] = useState(true);

  const pick = (d) => { setImgOk(true); setSel(d); };

  return (
    <div className="page-enter" style={{ maxWidth: 1100, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🧬 Biology Diagrams</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>Textbook-quality NCERT diagrams. All images served from our own site.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10, marginBottom: 20 }}>
        {DIAG.map(d => (
          <button key={d.key} onClick={() => pick(d)}
            className={sel.key === d.key ? 'glass-strong' : 'glass'}
            style={{
              padding: 12, borderRadius: 12, textAlign: 'center', cursor: 'pointer',
              border: sel.key === d.key ? '1px solid var(--violet)' : '1px solid var(--border)',
            }}>
            <div style={{ fontSize: 28 }}>{d.emoji}</div>
            <div style={{ fontWeight: 700, marginTop: 6, fontSize: 12 }}>{d.name}</div>
          </button>
        ))}
      </div>

      <div className="glass-strong" style={{ padding: 22, borderRadius: 16, display: 'grid', gridTemplateColumns: 'minmax(300px, 1.4fr) minmax(220px, 1fr)', gap: 22 }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 380 }}>
          {imgOk ? (
            <img src={sel.img} alt={sel.name} loading="eager" onError={() => setImgOk(false)}
              style={{ maxWidth: '100%', maxHeight: 440, objectFit: 'contain' }} />
          ) : (
            <div style={{ color: '#666', fontSize: 13, textAlign: 'center', padding: 20, lineHeight: 1.6 }}>
              Diagram file missing — run <code style={{ background: '#eee', padding: '2px 6px', borderRadius: 4 }}>scripts/fetch-assets.ps1</code> from the project root, then redeploy.
            </div>
          )}
        </div>
        <div>
          <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 22, marginBottom: 14 }}>{sel.emoji} {sel.name}</h3>
          <div style={{ fontSize: 13, color: 'var(--violet-2)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Labelled parts</div>
          <ol style={{ paddingLeft: 22, color: 'var(--text)', lineHeight: 1.9 }}>
            {sel.parts.map(p => <li key={p}>{p}</li>)}
          </ol>
        </div>
      </div>
    </div>
  );
}
