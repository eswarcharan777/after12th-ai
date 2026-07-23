import React, { useState, useEffect } from 'react';

// Anki-style SM-2 lite: rating 0-3 adjusts next review interval
const KEY = 'a12_srs_cards';

const SEED = [
  { id: 1, front: 'Newton\'s 2nd Law formula', back: 'F = m × a', subject: 'Physics' },
  { id: 2, front: 'Photosynthesis equation', back: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂', subject: 'Biology' },
  { id: 3, front: 'Quadratic formula', back: 'x = (-b ± √(b²-4ac)) / 2a', subject: 'Maths' },
  { id: 4, front: 'Ideal gas law', back: 'PV = nRT', subject: 'Chemistry' },
];

const load = () => {
  try {
    const d = JSON.parse(localStorage.getItem(KEY));
    return d && d.length ? d : SEED.map(c => ({ ...c, ease: 2.5, interval: 1, due: Date.now() }));
  } catch { return SEED.map(c => ({ ...c, ease: 2.5, interval: 1, due: Date.now() })); }
};

export default function SRS() {
  const [cards, setCards] = useState(load);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [newCard, setNewCard] = useState({ front: '', back: '', subject: 'Physics' });

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(cards)); }, [cards]);

  const due = cards.filter(c => c.due <= Date.now());
  const current = due[idx % (due.length || 1)];

  const rate = (rating) => {
    const days = rating === 0 ? 0 : rating === 1 ? 1 : rating === 2 ? 3 : 7;
    const newEase = Math.max(1.3, current.ease + (rating - 2) * 0.15);
    setCards(cards.map(c => c.id === current.id ? { ...c, ease: newEase, interval: days, due: Date.now() + days * 86400000 } : c));
    setFlipped(false); setIdx(i => i + 1);
    window.__a12Toast && window.__a12Toast(rating >= 2 ? 'Nice! 🎯' : 'Review sooner', rating >= 2 ? 'success' : 'warn');
  };

  const addCard = () => {
    if (!newCard.front || !newCard.back) return;
    setCards([...cards, { id: Date.now(), ...newCard, ease: 2.5, interval: 1, due: Date.now() }]);
    setNewCard({ front: '', back: '', subject: 'Physics' });
    window.__a12Toast && window.__a12Toast('Card added', 'success');
  };

  return (
    <div className="page-enter" style={{ maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🎴 Spaced Repetition</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 24 }}>Anki-style smart flashcards · {due.length} cards due · {cards.length} total</p>

      {due.length === 0 ? (
        <div className="glass" style={{ padding: 40, borderRadius: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 60, marginBottom: 12 }}>🎉</div>
          <h3>All caught up!</h3>
          <p style={{ color: 'var(--text-dim)' }}>Come back later for more reviews.</p>
        </div>
      ) : (
        <>
          <div onClick={() => setFlipped(!flipped)} className="glass-strong pulse-glow" style={{
            padding: 40, borderRadius: 20, minHeight: 240, marginBottom: 20, cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', transition: 'all 0.4s',
          }}>
            <div className="badge badge-violet" style={{ marginBottom: 14 }}>{current?.subject}</div>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
              {flipped ? current?.back : current?.front}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{flipped ? 'Rate your recall ↓' : 'Click to flip'}</div>
          </div>

          {flipped && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 24 }}>
              {[['😵 Again', 0, '#EF4444'], ['😅 Hard', 1, '#F5A623'], ['🙂 Good', 2, '#10B981'], ['🚀 Easy', 3, '#06B6D4']].map(([label, r, c]) => (
                <button key={r} onClick={() => rate(r)} style={{
                  padding: 14, borderRadius: 12, border: `1px solid ${c}`, background: `${c}22`, color: 'var(--text)', fontWeight: 600,
                }}>{label}</button>
              ))}
            </div>
          )}
        </>
      )}

      <div className="glass" style={{ padding: 20, borderRadius: 14 }}>
        <h4 style={{ fontFamily: 'Sora', marginBottom: 12 }}>➕ Add new card</h4>
        <input placeholder="Front (question)" value={newCard.front} onChange={e => setNewCard({ ...newCard, front: e.target.value })} style={inp} />
        <input placeholder="Back (answer)" value={newCard.back} onChange={e => setNewCard({ ...newCard, back: e.target.value })} style={inp} />
        <select value={newCard.subject} onChange={e => setNewCard({ ...newCard, subject: e.target.value })} style={inp}>
          <option>Physics</option><option>Chemistry</option><option>Biology</option><option>Maths</option>
        </select>
        <button className="btn-primary" onClick={addCard} style={{ marginTop: 10 }}>Add Card</button>
      </div>
    </div>
  );
}
const inp = { width: '100%', padding: 10, marginBottom: 8, borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' };
