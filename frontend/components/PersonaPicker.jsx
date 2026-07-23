import React, { useState, useEffect } from 'react';

const PERSONAS = [
  { id: 'friendly', emoji: '😊', name: 'Friendly', desc: 'Warm senior vibes' },
  { id: 'strict', emoji: '🧐', name: 'Strict', desc: 'No-nonsense professor' },
  { id: 'motivational', emoji: '🔥', name: 'Motivator', desc: 'High-energy coach' },
  { id: 'chill', emoji: '😎', name: 'Chill', desc: 'Casual & calm' },
];

export default function PersonaPicker() {
  const [selected, setSelected] = useState('friendly');
  useEffect(() => { setSelected(localStorage.getItem('a12_persona') || 'friendly'); }, []);
  const pick = (id) => {
    setSelected(id);
    localStorage.setItem('a12_persona', id);
    window.__a12Toast && window.__a12Toast(`Tutor style: ${PERSONAS.find(p => p.id === id).name}`, 'success');
  };
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
      {PERSONAS.map(p => (
        <button key={p.id} onClick={() => pick(p.id)}
          style={{
            padding: '10px 16px', borderRadius: 12, cursor: 'pointer',
            background: selected === p.id ? 'var(--aurora)' : 'var(--surface)',
            border: `1px solid ${selected === p.id ? 'transparent' : 'var(--border)'}`,
            color: selected === p.id ? 'white' : 'var(--text)',
            boxShadow: selected === p.id ? 'var(--glow-violet)' : 'none',
            display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600,
          }}>
          <span style={{ fontSize: 20 }}>{p.emoji}</span>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 13 }}>{p.name}</div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>{p.desc}</div>
          </div>
        </button>
      ))}
    </div>
  );
}
