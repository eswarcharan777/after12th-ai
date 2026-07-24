import React, { useState } from 'react';

// ═══════════════════════════════════════════════════════════════════
// Fully inline SVG diagrams — no external image loads, always render.
// ═══════════════════════════════════════════════════════════════════

const S = {
  label: { fontSize: 11, fill: '#1e293b', fontFamily: 'DM Sans, sans-serif', fontWeight: 600 },
  line:  { stroke: '#334155', strokeWidth: 1, fill: 'none' },
  bg:    { fill: '#fff' },
};

const AnimalCell = () => (
  <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: 400 }}>
    <rect width="500" height="400" fill="#fff" />
    <ellipse cx="250" cy="200" rx="200" ry="150" fill="#FEE2E2" stroke="#F87171" strokeWidth="3" />
    <circle cx="250" cy="200" r="55" fill="#C4B5FD" stroke="#7C3AED" strokeWidth="2" />
    <circle cx="260" cy="200" r="18" fill="#7C3AED" />
    <ellipse cx="150" cy="150" rx="35" ry="18" fill="#FDBA74" stroke="#EA580C" strokeWidth="1.5" />
    <ellipse cx="150" cy="150" rx="25" ry="10" fill="none" stroke="#EA580C" strokeWidth="1" />
    <ellipse cx="350" cy="150" rx="35" ry="18" fill="#FDBA74" stroke="#EA580C" strokeWidth="1.5" />
    <path d="M 320 260 Q 360 250 380 275 Q 385 295 360 300 Q 335 295 320 280 Z" fill="#93C5FD" stroke="#2563EB" strokeWidth="1.5" />
    <path d="M 140 260 Q 100 260 90 290 Q 100 305 130 300 Q 145 285 140 260 Z" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
    <circle cx="200" cy="290" r="6" fill="#059669" />
    <circle cx="300" cy="290" r="6" fill="#059669" />
    <circle cx="180" cy="220" r="4" fill="#7C3AED" />
    <circle cx="330" cy="230" r="4" fill="#7C3AED" />
    <text x="252" y="205" textAnchor="middle" style={{ ...S.label, fill: '#fff', fontSize: 10 }}>Nucleolus</text>
    <line x1="250" y1="145" x2="250" y2="90" style={S.line} /><text x="250" y="80" textAnchor="middle" {...S.label}>Nucleus</text>
    <line x1="150" y1="150" x2="150" y2="90" style={S.line} /><text x="150" y="80" textAnchor="middle" {...S.label}>Mitochondrion</text>
    <line x1="350" y1="150" x2="350" y2="90" style={S.line} /><text x="350" y="80" textAnchor="middle" {...S.label}>ER</text>
    <line x1="360" y1="285" x2="430" y2="330" style={S.line} /><text x="430" y="345" textAnchor="middle" {...S.label}>Golgi</text>
    <line x1="115" y1="285" x2="60" y2="330" style={S.line} /><text x="60" y="345" textAnchor="middle" {...S.label}>Lysosome</text>
    <line x1="200" y1="290" x2="180" y2="360" style={S.line} /><text x="180" y="375" textAnchor="middle" {...S.label}>Ribosome</text>
    <line x1="440" y1="220" x2="490" y2="220" style={S.line} /><text x="490" y="225" textAnchor="end" {...S.label}>Cell Membrane</text>
  </svg>
);

const PlantCell = () => (
  <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: 400 }}>
    <rect width="500" height="400" fill="#fff" />
    <rect x="50" y="60" width="400" height="280" fill="#D1FAE5" stroke="#059669" strokeWidth="6" rx="12" />
    <rect x="60" y="70" width="380" height="260" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" rx="8" />
    <rect x="130" y="120" width="240" height="160" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="2" rx="8" />
    <circle cx="250" cy="150" r="30" fill="#C4B5FD" stroke="#7C3AED" strokeWidth="2" />
    <ellipse cx="170" cy="230" rx="20" ry="12" fill="#22C55E" stroke="#166534" strokeWidth="1.5" />
    <ellipse cx="330" cy="230" rx="20" ry="12" fill="#22C55E" stroke="#166534" strokeWidth="1.5" />
    <ellipse cx="250" cy="260" rx="20" ry="12" fill="#22C55E" stroke="#166534" strokeWidth="1.5" />
    <ellipse cx="200" cy="170" rx="16" ry="10" fill="#22C55E" stroke="#166534" strokeWidth="1.5" />
    <line x1="450" y1="80" x2="490" y2="60" style={S.line} /><text x="495" y="60" {...S.label}>Cell Wall</text>
    <line x1="440" y1="90" x2="490" y2="100" style={S.line} /><text x="495" y="105" {...S.label}>Plasma Membrane</text>
    <line x1="250" y1="200" x2="250" y2="380" style={S.line} /><text x="250" y="395" textAnchor="middle" {...S.label}>Central Vacuole</text>
    <line x1="250" y1="150" x2="80" y2="60" style={S.line} /><text x="70" y="55" textAnchor="end" {...S.label}>Nucleus</text>
    <line x1="200" y1="170" x2="30" y2="200" style={S.line} /><text x="25" y="205" textAnchor="end" {...S.label}>Chloroplast</text>
  </svg>
);

const Heart = () => (
  <svg viewBox="0 0 500 450" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: 450 }}>
    <rect width="500" height="450" fill="#fff" />
    <path d="M 150 200 L 150 340 L 250 380 L 350 340 L 350 200 Q 350 130 300 130 Q 270 130 250 155 Q 230 130 200 130 Q 150 130 150 200 Z" fill="#FCA5A5" stroke="#991B1B" strokeWidth="3" />
    <line x1="250" y1="130" x2="250" y2="380" stroke="#7F1D1D" strokeWidth="3" />
    <line x1="150" y1="240" x2="245" y2="240" stroke="#7F1D1D" strokeWidth="2" />
    <line x1="255" y1="240" x2="350" y2="240" stroke="#7F1D1D" strokeWidth="2" />
    <path d="M 250 130 L 240 60 L 260 60 Z" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2" />
    <path d="M 200 130 Q 190 80 170 60" fill="none" stroke="#3B82F6" strokeWidth="6" />
    <path d="M 300 130 Q 310 80 330 60" fill="none" stroke="#3B82F6" strokeWidth="6" />
    <text x="195" y="200" textAnchor="middle" style={{ ...S.label, fill: '#7F1D1D' }}>RA</text>
    <text x="305" y="200" textAnchor="middle" style={{ ...S.label, fill: '#7F1D1D' }}>LA</text>
    <text x="195" y="310" textAnchor="middle" style={{ ...S.label, fill: '#7F1D1D' }}>RV</text>
    <text x="305" y="310" textAnchor="middle" style={{ ...S.label, fill: '#7F1D1D' }}>LV</text>
    <line x1="250" y1="60" x2="410" y2="30" style={S.line} /><text x="415" y="30" {...S.label}>Aorta</text>
    <line x1="170" y1="60" x2="60" y2="30" style={S.line} /><text x="55" y="30" textAnchor="end" {...S.label}>Sup. Vena Cava</text>
    <line x1="330" y1="60" x2="440" y2="60" style={S.line} /><text x="445" y="60" {...S.label}>Pulm. Artery</text>
    <line x1="195" y1="200" x2="30" y2="200" style={S.line} /><text x="25" y="205" textAnchor="end" {...S.label}>Right Atrium</text>
    <line x1="305" y1="200" x2="470" y2="200" style={S.line} /><text x="475" y="205" {...S.label}>Left Atrium</text>
    <line x1="195" y1="320" x2="30" y2="380" style={S.line} /><text x="25" y="385" textAnchor="end" {...S.label}>Right Ventricle</text>
    <line x1="305" y1="320" x2="470" y2="380" style={S.line} /><text x="475" y="385" {...S.label}>Left Ventricle</text>
    <line x1="150" y1="240" x2="30" y2="260" style={S.line} /><text x="25" y="265" textAnchor="end" {...S.label}>Tricuspid Valve</text>
    <line x1="350" y1="240" x2="470" y2="260" style={S.line} /><text x="475" y="265" {...S.label}>Mitral Valve</text>
  </svg>
);

const Nephron = () => (
  <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: 400 }}>
    <rect width="500" height="400" fill="#fff" />
    <circle cx="120" cy="120" r="40" fill="#FCA5A5" stroke="#991B1B" strokeWidth="2.5" />
    <path d="M 100 105 Q 130 90 140 115 Q 130 140 105 130 Q 90 118 100 105" fill="#DC2626" stroke="#7F1D1D" strokeWidth="1" />
    <path d="M 160 120 Q 210 110 220 160 L 220 220 Q 220 300 260 300 Q 300 300 300 230 L 300 160 Q 310 100 380 130 L 470 130" fill="none" stroke="#7C3AED" strokeWidth="8" strokeLinecap="round" />
    <path d="M 160 120 Q 210 110 220 160 L 220 220 Q 220 300 260 300 Q 300 300 300 230 L 300 160 Q 310 100 380 130 L 470 130" fill="none" stroke="#FEF3C7" strokeWidth="4" strokeLinecap="round" />
    <line x1="120" y1="70" x2="120" y2="30" style={S.line} /><text x="120" y="22" textAnchor="middle" {...S.label}>Glomerulus</text>
    <line x1="160" y1="90" x2="220" y2="40" style={S.line} /><text x="230" y="35" {...S.label}>Bowman's Capsule</text>
    <line x1="210" y1="180" x2="30" y2="180" style={S.line} /><text x="25" y="185" textAnchor="end" {...S.label}>PCT (Proximal Tubule)</text>
    <line x1="260" y1="300" x2="260" y2="380" style={S.line} /><text x="260" y="395" textAnchor="middle" {...S.label}>Loop of Henle</text>
    <line x1="310" y1="180" x2="470" y2="200" style={S.line} /><text x="475" y="205" {...S.label}>DCT (Distal Tubule)</text>
    <line x1="450" y1="130" x2="450" y2="60" style={S.line} /><text x="450" y="50" textAnchor="middle" {...S.label}>Collecting Duct</text>
  </svg>
);

const Neuron = () => (
  <svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: 300 }}>
    <rect width="600" height="300" fill="#fff" />
    <circle cx="120" cy="150" r="45" fill="#FDE68A" stroke="#B45309" strokeWidth="2" />
    <circle cx="130" cy="150" r="15" fill="#B45309" />
    <path d="M 80 130 Q 40 100 20 80" style={{ ...S.line, strokeWidth: 3 }} />
    <path d="M 80 170 Q 40 200 20 220" style={{ ...S.line, strokeWidth: 3 }} />
    <path d="M 90 110 Q 60 60 40 40" style={{ ...S.line, strokeWidth: 3 }} />
    <path d="M 90 190 Q 60 240 40 260" style={{ ...S.line, strokeWidth: 3 }} />
    <rect x="165" y="140" width="330" height="20" fill="#FCA5A5" stroke="#7F1D1D" strokeWidth="1.5" rx="10" />
    <rect x="200" y="135" width="40" height="30" fill="#7C3AED" stroke="#4C1D95" strokeWidth="1.5" rx="4" />
    <rect x="280" y="135" width="40" height="30" fill="#7C3AED" stroke="#4C1D95" strokeWidth="1.5" rx="4" />
    <rect x="360" y="135" width="40" height="30" fill="#7C3AED" stroke="#4C1D95" strokeWidth="1.5" rx="4" />
    <path d="M 495 150 L 545 130 M 495 150 L 545 150 M 495 150 L 545 170" style={{ ...S.line, strokeWidth: 3 }} />
    <circle cx="555" cy="130" r="8" fill="#EC4899" />
    <circle cx="555" cy="150" r="8" fill="#EC4899" />
    <circle cx="555" cy="170" r="8" fill="#EC4899" />
    <line x1="120" y1="105" x2="120" y2="40" style={S.line} /><text x="120" y="30" textAnchor="middle" {...S.label}>Cell Body (Soma)</text>
    <line x1="30" y1="80" x2="30" y2="30" style={S.line} /><text x="30" y="20" textAnchor="middle" {...S.label}>Dendrites</text>
    <text x="330" y="180" textAnchor="middle" {...S.label}>Axon</text>
    <line x1="220" y1="130" x2="220" y2="80" style={S.line} /><text x="220" y="70" textAnchor="middle" {...S.label}>Myelin Sheath</text>
    <line x1="340" y1="140" x2="340" y2="100" style={S.line} /><text x="340" y="90" textAnchor="middle" {...S.label}>Node of Ranvier</text>
    <line x1="555" y1="130" x2="590" y2="80" style={S.line} /><text x="590" y="70" textAnchor="end" {...S.label}>Axon Terminals</text>
  </svg>
);

const DNA = () => (
  <svg viewBox="0 0 300 500" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: 500 }}>
    <rect width="300" height="500" fill="#fff" />
    {Array.from({ length: 10 }).map((_, i) => {
      const y = 40 + i * 42;
      const phase = (i / 10) * Math.PI * 2;
      const x1 = 150 + 60 * Math.sin(phase);
      const x2 = 150 - 60 * Math.sin(phase);
      const bases = ['A-T', 'T-A', 'G-C', 'C-G'][i % 4];
      const colors = ['#EC4899', '#3B82F6', '#F59E0B', '#10B981'][i % 4];
      return (
        <g key={i}>
          <line x1={x1} y1={y} x2={x2} y2={y} stroke={colors} strokeWidth="3" />
          <circle cx={x1} cy={y} r="8" fill="#7C3AED" />
          <circle cx={x2} cy={y} r="8" fill="#7C3AED" />
          <text x="150" y={y + 4} textAnchor="middle" style={{ ...S.label, fill: '#fff', fontSize: 9 }}>{bases}</text>
        </g>
      );
    })}
    <path d={`M ${150 + 60 * Math.sin(0)} 40 ${Array.from({length: 40}).map((_,i)=>`L ${150 + 60 * Math.sin((i+1)/10 * Math.PI * 2)} ${40 + (i+1)*10.5}`).join(' ')}`} fill="none" stroke="#7C3AED" strokeWidth="4" />
    <path d={`M ${150 - 60 * Math.sin(0)} 40 ${Array.from({length: 40}).map((_,i)=>`L ${150 - 60 * Math.sin((i+1)/10 * Math.PI * 2)} ${40 + (i+1)*10.5}`).join(' ')}`} fill="none" stroke="#7C3AED" strokeWidth="4" />
    <text x="30" y="30" {...S.label}>Sugar-phosphate backbone →</text>
    <text x="30" y="490" {...S.label}>Base pairs (A-T, G-C) held by H-bonds</text>
  </svg>
);

const SmallIntestine = () => (
  <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: 400 }}>
    <rect width="500" height="400" fill="#fff" />
    <path d="M 60 60 Q 100 60 100 100 L 100 340 Q 100 380 140 380 Q 180 380 180 340 L 180 100 Q 180 60 220 60 Q 260 60 260 100 L 260 340 Q 260 380 300 380 Q 340 380 340 340 L 340 100 Q 340 60 380 60 L 460 60" fill="none" stroke="#F59E0B" strokeWidth="24" strokeLinecap="round" />
    <path d="M 60 60 Q 100 60 100 100 L 100 340 Q 100 380 140 380 Q 180 380 180 340 L 180 100 Q 180 60 220 60 Q 260 60 260 100 L 260 340 Q 260 380 300 380 Q 340 380 340 340 L 340 100 Q 340 60 380 60 L 460 60" fill="none" stroke="#FEF3C7" strokeWidth="16" strokeLinecap="round" />
    <text x="120" y="55" textAnchor="middle" {...S.label}>Duodenum</text>
    <text x="230" y="55" textAnchor="middle" {...S.label}>Jejunum</text>
    <text x="410" y="55" textAnchor="middle" {...S.label}>Ileum</text>
    <line x1="220" y1="200" x2="470" y2="200" style={S.line} /><text x="475" y="205" {...S.label}>Villi (line inner wall)</text>
    <line x1="140" y1="380" x2="140" y2="395" style={S.line} /><text x="140" y="395" textAnchor="middle" {...S.label}>~6-7 m long</text>
  </svg>
);

const Eye = () => (
  <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: 400 }}>
    <rect width="500" height="400" fill="#fff" />
    <ellipse cx="250" cy="200" rx="180" ry="140" fill="#FEE2E2" stroke="#7F1D1D" strokeWidth="3" />
    <ellipse cx="250" cy="200" rx="170" ry="130" fill="#FFF7ED" stroke="#F59E0B" strokeWidth="1.5" />
    <path d="M 80 200 Q 120 130 200 130 Q 260 140 250 200" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" />
    <circle cx="150" cy="200" r="60" fill="#7C3AED" stroke="#4C1D95" strokeWidth="2" />
    <circle cx="150" cy="200" r="25" fill="#000" />
    <path d="M 80 200 Q 110 165 150 155 Q 190 165 220 200 Q 190 235 150 245 Q 110 235 80 200 Z" fill="#DBEAFE" opacity="0.6" />
    <ellipse cx="150" cy="200" rx="45" ry="55" fill="none" stroke="#0EA5E9" strokeWidth="3" />
    <path d="M 420 200 L 470 190 M 420 200 L 470 210" stroke="#7F1D1D" strokeWidth="3" fill="none" />
    <line x1="150" y1="140" x2="150" y2="60" style={S.line} /><text x="150" y="50" textAnchor="middle" {...S.label}>Cornea</text>
    <line x1="200" y1="200" x2="200" y2="30" style={S.line} /><text x="200" y="20" textAnchor="middle" {...S.label}>Iris</text>
    <line x1="150" y1="200" x2="150" y2="380" style={S.line} /><text x="150" y="395" textAnchor="middle" {...S.label}>Pupil</text>
    <line x1="150" y1="245" x2="30" y2="320" style={S.line} /><text x="25" y="325" textAnchor="end" {...S.label}>Lens</text>
    <line x1="400" y1="200" x2="470" y2="130" style={S.line} /><text x="475" y="125" {...S.label}>Retina</text>
    <line x1="450" y1="200" x2="490" y2="290" style={S.line} /><text x="490" y="295" textAnchor="end" {...S.label}>Optic Nerve</text>
  </svg>
);

const Brain = () => (
  <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: 400 }}>
    <rect width="500" height="400" fill="#fff" />
    <path d="M 100 200 Q 100 80 250 70 Q 400 80 400 200 Q 400 260 380 280 L 350 320 L 300 330 L 250 330 Q 220 330 210 350 L 200 380 L 180 380 L 175 340 L 160 320 L 130 300 Q 100 260 100 200 Z" fill="#FBCFE8" stroke="#831843" strokeWidth="3" />
    <path d="M 130 150 Q 180 130 210 160 M 240 100 Q 290 90 320 130 M 320 180 Q 370 190 380 240 M 150 240 Q 200 260 220 300" fill="none" stroke="#831843" strokeWidth="2" />
    <ellipse cx="380" cy="310" rx="60" ry="35" fill="#F9A8D4" stroke="#831843" strokeWidth="2.5" />
    <path d="M 350 320 L 340 380 L 360 380 Z" fill="#F9A8D4" stroke="#831843" strokeWidth="2.5" />
    <line x1="250" y1="150" x2="250" y2="30" style={S.line} /><text x="250" y="20" textAnchor="middle" {...S.label}>Cerebrum</text>
    <line x1="380" y1="310" x2="480" y2="310" style={S.line} /><text x="490" y="315" textAnchor="end" {...S.label}>Cerebellum</text>
    <line x1="350" y1="370" x2="470" y2="380" style={S.line} /><text x="480" y="385" textAnchor="end" {...S.label}>Brain Stem</text>
    <line x1="140" y1="220" x2="30" y2="220" style={S.line} /><text x="25" y="225" textAnchor="end" {...S.label}>Frontal Lobe</text>
    <line x1="360" y1="150" x2="470" y2="120" style={S.line} /><text x="475" y="120" {...S.label}>Parietal Lobe</text>
  </svg>
);

const DIAG = [
  { key: 'animal',   name: 'Animal Cell',      emoji: '🔬', comp: AnimalCell,    parts: ['Nucleus', 'Nucleolus', 'Mitochondria', 'Endoplasmic Reticulum', 'Golgi Apparatus', 'Ribosome', 'Lysosome', 'Cell Membrane'] },
  { key: 'plant',    name: 'Plant Cell',       emoji: '🌱', comp: PlantCell,     parts: ['Cell Wall', 'Plasma Membrane', 'Nucleus', 'Chloroplast', 'Central Vacuole', 'Cytoplasm'] },
  { key: 'heart',    name: 'Human Heart',      emoji: '❤️', comp: Heart,         parts: ['Right Atrium (RA)', 'Left Atrium (LA)', 'Right Ventricle (RV)', 'Left Ventricle (LV)', 'Aorta', 'Pulmonary Artery', 'Superior Vena Cava', 'Tricuspid Valve', 'Mitral Valve'] },
  { key: 'nephron',  name: 'Nephron',          emoji: '🫘', comp: Nephron,       parts: ['Glomerulus', "Bowman's Capsule", 'Proximal Convoluted Tubule (PCT)', 'Loop of Henle', 'Distal Convoluted Tubule (DCT)', 'Collecting Duct'] },
  { key: 'neuron',   name: 'Neuron',           emoji: '🧠', comp: Neuron,        parts: ['Cell Body (Soma)', 'Dendrites', 'Axon', 'Myelin Sheath', 'Nodes of Ranvier', 'Axon Terminals'] },
  { key: 'dna',      name: 'DNA Double Helix', emoji: '🧬', comp: DNA,           parts: ['Sugar-phosphate backbone', 'Base pairs (A-T, G-C)', 'Hydrogen bonds', 'Antiparallel strands', 'Right-handed helix'] },
  { key: 'intestine',name: 'Small Intestine',  emoji: '🌀', comp: SmallIntestine,parts: ['Duodenum', 'Jejunum', 'Ileum', 'Villi (absorption surface)', 'Microvilli (brush border)', 'Lacteals'] },
  { key: 'eye',      name: 'Human Eye',        emoji: '👁️', comp: Eye,           parts: ['Cornea', 'Iris', 'Pupil', 'Lens', 'Retina', 'Optic Nerve', 'Ciliary Body'] },
  { key: 'brain',    name: 'Human Brain',      emoji: '🧠', comp: Brain,         parts: ['Cerebrum', 'Cerebellum', 'Brain Stem', 'Frontal Lobe', 'Parietal Lobe', 'Corpus Callosum'] },
];

export default function BioDiagrams() {
  const [sel, setSel] = useState(DIAG[0]);
  const Diagram = sel.comp;

  return (
    <div className="page-enter" style={{ maxWidth: 1100, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🧬 Biology Diagrams</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>NCERT-quality labelled diagrams — drawn on this page, nothing external.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10, marginBottom: 20 }}>
        {DIAG.map(d => (
          <button key={d.key} onClick={() => setSel(d)}
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
        <div style={{ background: '#fff', borderRadius: 12, padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 340 }}>
          <Diagram />
        </div>
        <div>
          <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 20, marginBottom: 14 }}>{sel.emoji} {sel.name}</h3>
          <div style={{ fontSize: 13, color: 'var(--violet-2)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Labelled parts</div>
          <ol style={{ paddingLeft: 22, color: 'var(--text)', lineHeight: 1.9 }}>
            {sel.parts.map(p => <li key={p}>{p}</li>)}
          </ol>
        </div>
      </div>
    </div>
  );
}
