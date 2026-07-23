import React, { useState } from 'react';
export default function ScorePredictor() {
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const predict = async () => {
    setLoading(true);
    const scores = JSON.parse(localStorage.getItem('after12th_scores') || '[]');
    const summary = scores.length ? scores.slice(-5).map(s => `${s.exam} ${s.score}/${s.total}`).join('; ') : 'no tests yet';
    try {
      const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'tutor', messages: [{ role: 'user', content: `Based on my recent mock test scores (${summary}), predict my likely AIR/rank in NEET/JEE with detailed reasoning. Give an optimistic and realistic estimate.` }] }) });
      setReply((await r.json()).reply);
    } catch (e) { setReply('Error'); } finally { setLoading(false); }
  };
  return (
    <div className="page-enter" style={{ maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🎯 AI Score Predictor</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>Based on your recent mock performance</p>
      <button className="btn-primary" onClick={predict} disabled={loading}>{loading ? 'Predicting...' : '✨ Predict my rank'}</button>
      {reply && <div className="glass" style={{ padding: 22, borderRadius: 14, marginTop: 20, whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{reply}</div>}
    </div>
  );
}
