import React, { useState } from 'react';

const DIAG = [
  {
    name: 'Animal Cell', emoji: '🔬',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Animal_cell_structure_en.svg/1024px-Animal_cell_structure_en.svg.png',
    credit: 'Wikimedia · LadyofHats',
    parts: ['Nucleus', 'Mitochondria', 'Endoplasmic Reticulum', 'Golgi Apparatus', 'Ribosome', 'Cell Membrane', 'Lysosome', 'Cytoplasm'],
  },
  {
    name: 'Plant Cell', emoji: '🌱',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Plant_cell_structure_svg-en.svg/1024px-Plant_cell_structure_svg-en.svg.png',
    credit: 'Wikimedia · LadyofHats',
    parts: ['Chloroplast', 'Cell Wall', 'Central Vacuole', 'Nucleus', 'Cytoplasm', 'Plasma Membrane', 'Plasmodesmata'],
  },
  {
    name: 'Human Heart', emoji: '❤️',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Diagram_of_the_human_heart_%28cropped%29.svg/800px-Diagram_of_the_human_heart_%28cropped%29.svg.png',
    credit: 'Wikimedia · Wapcaplet',
    parts: ['Right Atrium', 'Left Atrium', 'Right Ventricle', 'Left Ventricle', 'Aorta', 'Pulmonary Artery', 'Superior Vena Cava', 'Mitral Valve', 'Tricuspid Valve'],
  },
  {
    name: 'Nephron', emoji: '🫘',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Physiology_of_Nephron.png/800px-Physiology_of_Nephron.png',
    credit: 'Wikimedia',
    parts: ['Glomerulus', "Bowman's Capsule", 'Proximal Convoluted Tubule (PCT)', 'Loop of Henle', 'Distal Convoluted Tubule (DCT)', 'Collecting Duct'],
  },
  {
    name: 'Neuron', emoji: '🧠',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Neuron.svg/1024px-Neuron.svg.png',
    credit: 'Wikimedia · Quasar Jarosz',
    parts: ['Cell Body (Soma)', 'Dendrites', 'Axon', 'Myelin Sheath', 'Nodes of Ranvier', 'Axon Terminals', 'Synapse'],
  },
  {
    name: 'DNA Double Helix', emoji: '🧬',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/DNA_chemical_structure.svg/800px-DNA_chemical_structure.svg.png',
    credit: 'Wikimedia · Madprime',
    parts: ['Sugar-phosphate backbone', 'Adenine (A)', 'Thymine (T)', 'Guanine (G)', 'Cytosine (C)', 'Hydrogen bonds', 'Major & minor grooves'],
  },
  {
    name: 'Small Intestine', emoji: '🌀',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Small_intestine_diagram.svg/800px-Small_intestine_diagram.svg.png',
    credit: 'Wikimedia',
    parts: ['Duodenum', 'Jejunum', 'Ileum', 'Villi', 'Microvilli', 'Lacteals', 'Peyer’s Patches'],
  },
  {
    name: 'Human Eye', emoji: '👁️',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Schematic_diagram_of_the_human_eye_en.svg/1024px-Schematic_diagram_of_the_human_eye_en.svg.png',
    credit: 'Wikimedia',
    parts: ['Cornea', 'Iris', 'Pupil', 'Lens', 'Retina', 'Optic Nerve', 'Ciliary Body', 'Vitreous Humour'],
  },
  {
    name: 'Human Brain', emoji: '🧠',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/1311_Brain_Stem.jpg/800px-1311_Brain_Stem.jpg',
    credit: 'Wikimedia · OpenStax',
    parts: ['Cerebrum', 'Cerebellum', 'Brain Stem (Medulla, Pons, Midbrain)', 'Corpus Callosum', 'Hypothalamus', 'Thalamus'],
  },
];

export default function BioDiagrams() {
  const [sel, setSel] = useState(DIAG[0]);
  const [imgOk, setImgOk] = useState(true);

  const pick = (d) => { setImgOk(true); setSel(d); };

  return (
    <div className="page-enter" style={{ maxWidth: 1100, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🧬 Biology Diagrams</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>NCERT-quality labelled diagrams for revision. Click any diagram below.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10, marginBottom: 20 }}>
        {DIAG.map(d => (
          <button key={d.name} onClick={() => pick(d)}
            className={sel.name === d.name ? 'glass-strong' : 'glass'}
            style={{
              padding: 14, borderRadius: 12, textAlign: 'center', cursor: 'pointer',
              border: sel.name === d.name ? '1px solid var(--violet)' : '1px solid var(--border)',
            }}>
            <div style={{ fontSize: 30 }}>{d.emoji}</div>
            <div style={{ fontWeight: 700, marginTop: 6, fontSize: 13 }}>{d.name}</div>
          </button>
        ))}
      </div>

      <div className="glass-strong" style={{ padding: 26, borderRadius: 16, display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(240px, 1fr)', gap: 24 }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 320 }}>
          {imgOk ? (
            <img src={sel.img} alt={sel.name} onError={() => setImgOk(false)}
              style={{ maxWidth: '100%', maxHeight: 380, objectFit: 'contain' }} />
          ) : (
            <div style={{ color: '#333', fontSize: 13, textAlign: 'center', padding: 20 }}>
              Diagram temporarily unavailable.<br />
              <a href={sel.img} target="_blank" rel="noopener noreferrer" style={{ color: '#8B5CF6' }}>Open image directly →</a>
            </div>
          )}
        </div>
        <div>
          <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 20, marginBottom: 4 }}>{sel.emoji} {sel.name}</h3>
          <div style={{ fontSize: 11, color: 'var(--text-faint)', marginBottom: 14 }}>Image: {sel.credit}</div>
          <div style={{ fontSize: 13, color: 'var(--violet-2)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Labelled parts</div>
          <ol style={{ paddingLeft: 22, color: 'var(--text)', lineHeight: 1.9 }}>
            {sel.parts.map(p => <li key={p}>{p}</li>)}
          </ol>
        </div>
      </div>
    </div>
  );
}
