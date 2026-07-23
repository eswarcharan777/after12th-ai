import React, { useState, useEffect } from 'react';

const ITEMS = [
  '🎫 Admit Card (2 printouts)', '🆔 Government Photo ID', '🖊 Blue/Black Ballpoint Pen (2)',
  '💧 Transparent Water Bottle', '⌚ Analog Watch (no smartwatch)', '👓 Spectacles (if needed)',
  '💊 Necessary Medicines', '📿 No metal jewelry', '👕 Half-sleeve light shirt',
  '👖 Simple pants (no cargo)', '👟 Open sandals (no shoes)', '📱 NO phone/electronics',
  '💰 Small cash for emergency', '🍫 Chocolate bar for energy', '📄 Post card size photos (2)',
];

export default function ExamChecklist() {
  const [done, setDone] = useState({});
  useEffect(() => { setDone(JSON.parse(localStorage.getItem('a12_examck') || '{}')); }, []);
  const toggle = i => { const nd = { ...done, [i]: !done[i] }; setDone(nd); localStorage.setItem('a12_examck', JSON.stringify(nd)); };
  const packed = Object.values(done).filter(Boolean).length;
  return (
    <div className="page-enter" style={{ maxWidth: 700, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🎯 Exam Hall Checklist</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>Packed: {packed}/{ITEMS.length}</p>
      <div className="glass" style={{ padding: 20, borderRadius: 14 }}>
        {ITEMS.map((item, i) => (
          <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderBottom: '1px solid var(--border)', cursor: 'pointer', opacity: done[i] ? 0.5 : 1 }}>
            <input type="checkbox" checked={!!done[i]} onChange={() => toggle(i)} style={{ width: 20, height: 20 }} />
            <span style={{ textDecoration: done[i] ? 'line-through' : 'none' }}>{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
