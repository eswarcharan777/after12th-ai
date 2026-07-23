import React, { useState } from 'react';

const CHAPTERS = {
  Physics: ['Motion in a Plane', 'Laws of Motion', 'Work Energy Power', 'Gravitation', 'Thermodynamics', 'Waves', 'Electric Charges', 'Current Electricity', 'Magnetism', 'Optics', 'Modern Physics'],
  Chemistry: ['Some Basic Concepts', 'Structure of Atom', 'Chemical Bonding', 'States of Matter', 'Thermodynamics', 'Equilibrium', 'Redox', 'Organic Basics', 'Hydrocarbons', 'Environmental Chem'],
  Biology: ['Living World', 'Biological Classification', 'Plant Kingdom', 'Animal Kingdom', 'Cell Structure', 'Biomolecules', 'Cell Cycle', 'Photosynthesis', 'Respiration', 'Reproduction', 'Genetics', 'Evolution', 'Ecology'],
};

export default function NCERT() {
  const [active, setActive] = useState(null); // { sub, ch }
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const open = async (sub, ch) => {
    setActive({ sub, ch });
    setLoading(true); setContent(''); setError('');
    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'summarize',
          messages: [{
            role: 'user',
            content: `Chapter: ${ch} (${sub}, NCERT Class 11/12).
Produce a complete revision-ready summary with:
1) Key concepts (bulleted, max 10)
2) Important formulas / reactions / diagrams (in a boxed section)
3) 5 NCERT exercise-style MCQs with 1-line answers at the end
4) 3 common NEET/JEE traps students fall into

Keep it exam-focused, no fluff.`
          }]
        })
      });
      if (!r.ok) throw new Error();
      const j = await r.json();
      if (!j.reply) throw new Error();
      setContent(j.reply);
    } catch {
      setError('AI service is waking up — please retry in ~15 seconds.');
    } finally { setLoading(false); }
  };

  return (
    <div className="page-enter" style={{ maxWidth: 1000, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>📚 NCERT Solutions & Notes</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>Click any chapter to load AI-generated NCERT-style revision notes right here.</p>

      {Object.entries(CHAPTERS).map(([sub, list]) => (
        <div key={sub} className="glass" style={{ padding: 20, borderRadius: 14, marginBottom: 16 }}>
          <h3 style={{ fontFamily: 'Sora', marginBottom: 12 }}>{sub}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8 }}>
            {list.map(ch => (
              <button key={ch} onClick={() => open(sub, ch)}
                style={{
                  padding: 10, background: active && active.ch === ch ? 'rgba(139,92,246,0.15)' : 'var(--surface)',
                  border: `1px solid ${active && active.ch === ch ? 'var(--violet)' : 'var(--border)'}`,
                  borderRadius: 8, fontSize: 13, color: 'var(--text)', textAlign: 'left', cursor: 'pointer',
                }}>📖 {ch}</button>
            ))}
          </div>
        </div>
      ))}

      {active && (
        <div className="glass-strong" style={{ padding: 24, borderRadius: 16, marginTop: 8 }}>
          <div style={{ fontSize: 12, color: 'var(--violet-2)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>{active.sub}</div>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 22, marginBottom: 14 }}>{active.ch}</h2>
          {loading && <div style={{ color: 'var(--text-dim)' }}>🤖 Generating notes…</div>}
          {error && <div style={{ padding: 12, background: 'rgba(239,68,68,0.12)', border: '1px solid #EF4444', color: '#FCA5A5', borderRadius: 10, fontSize: 13 }}>{error}</div>}
          {content && <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.75, color: 'var(--text)' }}>{content}</div>}
        </div>
      )}
    </div>
  );
}
