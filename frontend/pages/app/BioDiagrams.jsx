import React, { useState } from 'react';

// Real NCERT-quality diagrams. Prefer local /public/diagrams/ if present
// (populated by scripts/fetch-assets.ps1); otherwise fall back to the
// free-license Wikimedia Commons original so the image always renders.
const DIAG = [
  { key: 'animal',    name: 'Animal Cell',      emoji: '🔬', img: '/diagrams/animal-cell.png',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Animal_cell_structure_en.svg/1024px-Animal_cell_structure_en.svg.png',
    parts: ['Nucleus', 'Nucleolus', 'Mitochondria', 'Endoplasmic Reticulum', 'Golgi Apparatus', 'Ribosome', 'Lysosome', 'Cell Membrane', 'Cytoplasm'] },
  { key: 'plant',     name: 'Plant Cell',       emoji: '🌱', img: '/diagrams/plant-cell.png',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Plant_cell_structure_svg-en.svg/1024px-Plant_cell_structure_svg-en.svg.png',
    parts: ['Cell Wall', 'Plasma Membrane', 'Nucleus', 'Chloroplast', 'Central Vacuole', 'Mitochondria', 'Cytoplasm', 'Plasmodesmata'] },
  { key: 'heart',     name: 'Human Heart',      emoji: '❤️', img: '/diagrams/heart.png',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Diagram_of_the_human_heart_%28cropped%29.svg/900px-Diagram_of_the_human_heart_%28cropped%29.svg.png',
    parts: ['Right Atrium', 'Left Atrium', 'Right Ventricle', 'Left Ventricle', 'Aorta', 'Pulmonary Artery', 'Superior Vena Cava', 'Tricuspid Valve', 'Mitral Valve'] },
  { key: 'nephron',   name: 'Nephron',          emoji: '🫘', img: '/diagrams/nephron.png',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Physiology_of_Nephron.png/900px-Physiology_of_Nephron.png',
    parts: ['Glomerulus', "Bowman's Capsule", 'Proximal Convoluted Tubule (PCT)', 'Loop of Henle', 'Distal Convoluted Tubule (DCT)', 'Collecting Duct'] },
  { key: 'neuron',    name: 'Neuron',           emoji: '🧠', img: '/diagrams/neuron.png',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Neuron.svg/1024px-Neuron.svg.png',
    parts: ['Cell Body (Soma)', 'Dendrites', 'Axon', 'Myelin Sheath', 'Nodes of Ranvier', 'Axon Terminals'] },
  { key: 'dna',       name: 'DNA Structure',    emoji: '🧬', img: '/diagrams/dna.png',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/DNA_chemical_structure.svg/800px-DNA_chemical_structure.svg.png',
    parts: ['Sugar-phosphate backbone', 'Adenine (A)', 'Thymine (T)', 'Guanine (G)', 'Cytosine (C)', 'Hydrogen bonds', 'Antiparallel strands'] },
  { key: 'intestine', name: 'Small Intestine',  emoji: '🌀', img: '/diagrams/small-intestine.png',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Blausen_0817_SmallIntestine_Anatomy.png/900px-Blausen_0817_SmallIntestine_Anatomy.png',
    parts: ['Duodenum', 'Jejunum', 'Ileum', 'Villi', 'Microvilli', 'Lacteals'] },
  { key: 'eye',       name: 'Human Eye',        emoji: '👁️', img: '/diagrams/eye.png',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Schematic_diagram_of_the_human_eye_en.svg/1024px-Schematic_diagram_of_the_human_eye_en.svg.png',
    parts: ['Cornea', 'Iris', 'Pupil', 'Lens', 'Retina', 'Optic Nerve', 'Ciliary Body', 'Vitreous Humour'] },
  { key: 'brain',     name: 'Human Brain',      emoji: '🧠', img: '/diagrams/brain.png',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/1311_Brain_Stem.jpg/900px-1311_Brain_Stem.jpg',
    parts: ['Cerebrum', 'Cerebellum', 'Brain Stem', 'Frontal Lobe', 'Parietal Lobe', 'Corpus Callosum'] },
  { key: 'digestive', name: 'Digestive System', emoji: '🍽️', img: '/diagrams/digestive.png',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Digestive_system_diagram_en.svg/700px-Digestive_system_diagram_en.svg.png',
    parts: ['Mouth', 'Oesophagus', 'Stomach', 'Liver', 'Pancreas', 'Small Intestine', 'Large Intestine', 'Rectum'] },
  { key: 'respiratory', name: 'Respiratory System', emoji: '🫁', img: '/diagrams/respiratory.png',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Respiratory_system_complete_en.svg/700px-Respiratory_system_complete_en.svg.png',
    parts: ['Nasal Cavity', 'Pharynx', 'Larynx', 'Trachea', 'Bronchi', 'Bronchioles', 'Alveoli', 'Diaphragm'] },
  { key: 'mito',      name: 'Mitochondrion',    emoji: '⚡', img: '/diagrams/mitochondrion.png',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mitochondrion_structure.svg/1024px-Mitochondrion_structure.svg.png',
    parts: ['Outer Membrane', 'Inner Membrane', 'Cristae', 'Matrix', 'Intermembrane Space', 'DNA', 'Ribosomes'] },
  { key: 'chloroplast', name: 'Chloroplast', emoji: '🌿', img: '/diagrams/chloroplast.png',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Chloroplast_diagram.svg/1024px-Chloroplast_diagram.svg.png',
    parts: ['Outer Membrane', 'Inner Membrane', 'Thylakoid', 'Granum', 'Stroma', 'Lamella', 'Starch Granule', 'Chloroplast DNA'] },
  { key: 'photosynthesis', name: 'Photosynthesis', emoji: '☀️', img: '/diagrams/photosynthesis.png',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Simple_photosynthesis_overview.svg/900px-Simple_photosynthesis_overview.svg.png',
    parts: ['Sunlight input', 'CO₂ input', 'H₂O input (roots)', 'O₂ output', 'Glucose output', 'Chlorophyll (light absorption)'] },
  { key: 'mitosis', name: 'Mitosis', emoji: '➗', img: '/diagrams/mitosis.png',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Major_events_in_mitosis.svg/1024px-Major_events_in_mitosis.svg.png',
    parts: ['Prophase', 'Metaphase', 'Anaphase', 'Telophase', 'Cytokinesis'] },
  { key: 'meiosis', name: 'Meiosis', emoji: '🔀', img: '/diagrams/meiosis.png',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Meiosis_Overview_new.svg/1024px-Meiosis_Overview_new.svg.png',
    parts: ['Interphase', 'Prophase I (crossing over)', 'Metaphase I', 'Anaphase I', 'Meiosis II', '4 haploid gametes'] },
  { key: 'skeleton', name: 'Human Skeleton', emoji: '🦴', img: '/diagrams/skeleton.png',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Human_skeleton_front_en.svg/500px-Human_skeleton_front_en.svg.png',
    parts: ['Skull', 'Vertebral column', 'Ribs & Sternum', 'Pelvic girdle', 'Femur', 'Tibia & Fibula', 'Humerus', 'Radius & Ulna'] },
  { key: 'muscle', name: 'Muscle Types', emoji: '💪', img: '/diagrams/muscle.png',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/414_Skeletal_Smooth_Cardiac.jpg/900px-414_Skeletal_Smooth_Cardiac.jpg',
    parts: ['Skeletal (striated, voluntary)', 'Smooth (non-striated, involuntary)', 'Cardiac (striated, involuntary)'] },
  { key: 'blood', name: 'Blood Cells', emoji: '🩸', img: '/diagrams/blood.png',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Blausen_0761_RedWhiteBloodcells.png/900px-Blausen_0761_RedWhiteBloodcells.png',
    parts: ['Erythrocytes (RBC)', 'Leukocytes (WBC)', 'Thrombocytes (platelets)', 'Plasma'] },
  { key: 'reflex', name: 'Reflex Arc', emoji: '⚡', img: '/diagrams/reflex.png',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Imgnotxt-reflex-arc-1.png/900px-Imgnotxt-reflex-arc-1.png',
    parts: ['Receptor', 'Sensory (afferent) Neuron', 'Interneuron', 'Motor (efferent) Neuron', 'Effector (muscle)'] },
  { key: 'flower', name: 'Flower Structure', emoji: '🌸', img: '/diagrams/flower.png',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Mature_flower_diagram.svg/900px-Mature_flower_diagram.svg.png',
    parts: ['Petal', 'Sepal', 'Stamen (anther + filament)', 'Carpel/Pistil (stigma + style + ovary)', 'Ovule', 'Receptacle'] },
  { key: 'foodchain', name: 'Food Chain', emoji: '🔗', img: '/diagrams/foodchain.png',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Food_chain.svg/900px-Food_chain.svg.png',
    parts: ['Producers (plants)', 'Primary consumers (herbivores)', 'Secondary consumers (carnivores)', 'Tertiary consumers (top carnivores)', 'Decomposers'] },
  { key: 'endocrine', name: 'Endocrine System', emoji: '🧪', img: '/diagrams/endocrine.png',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Illu_endocrine_system_New.svg/500px-Illu_endocrine_system_New.svg.png',
    parts: ['Pituitary gland', 'Thyroid & Parathyroid', 'Adrenal glands', 'Pancreas', 'Ovaries / Testes', 'Pineal gland'] },
  { key: 'virus', name: 'Virus Structure', emoji: '🦠', img: '/diagrams/virus.png',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/HIV_gross.png/800px-HIV_gross.png',
    parts: ['Capsid (protein coat)', 'Nucleic acid (DNA/RNA)', 'Envelope (in some viruses)', 'Surface glycoproteins', 'Enzymes (e.g., reverse transcriptase)'] },
  { key: 'bacteria', name: 'Bacterial Cell', emoji: '🧫', img: '/diagrams/bacteria.png',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Average_prokaryote_cell-_en.svg/1024px-Average_prokaryote_cell-_en.svg.png',
    parts: ['Cell Wall', 'Plasma Membrane', 'Cytoplasm', 'Nucleoid (DNA)', 'Ribosomes', 'Flagellum', 'Pili', 'Capsule'] },
];

export default function BioDiagrams() {
  const [sel, setSel] = useState(DIAG[0]);
  const [src, setSrc] = useState(DIAG[0].img);
  const [imgOk, setImgOk] = useState(true);

  const pick = (d) => { setImgOk(true); setSel(d); setSrc(d.img); };
  const onImgError = () => {
    // Local file missing → try the free-license fallback URL.
    if (src === sel.img && sel.fallback) { setSrc(sel.fallback); return; }
    setImgOk(false);
  };

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
            <img src={src} alt={sel.name} loading="eager" onError={onImgError}
              style={{ maxWidth: '100%', maxHeight: 440, objectFit: 'contain' }} />
          ) : (
            <div style={{ color: '#666', fontSize: 13, textAlign: 'center', padding: 20 }}>
              Diagram temporarily unavailable — please pick another.
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
