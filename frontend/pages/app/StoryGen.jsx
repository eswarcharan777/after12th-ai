import React, { useState } from 'react';
export default function StoryGen() {
  const [story, setStory] = useState(''); const [loading, setLoading] = useState(false);
  const gen = async () => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('after12th_user') || '{}');
    const scores = JSON.parse(localStorage.getItem('after12th_scores') || '[]');
    const pomo = JSON.parse(localStorage.getItem('a12_pomo_log') || '[]');
    const total = pomo.reduce((a, p) => a + p.minutes, 0);
    try {
      const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'tutor', messages: [{ role: 'user', content: `Write an inspiring 400-word story about ${user.name || 'a student'}'s ${user.exam || 'NEET'} journey. Data: ${scores.length} mocks, ${Math.floor(total/60)} hours studied. Make it emotional and motivating.` }] }) });
      setStory((await r.json()).reply);
    } catch { setStory('Error'); } finally { setLoading(false); }
  };
  return (
    <div className="page-enter" style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 20 }}>🤖 My Journey Story</h1>
      <button className="btn-primary" onClick={gen} disabled={loading}>{loading ? 'Writing...' : '✨ Generate my story'}</button>
      {story && <div className="glass" style={{ padding: 24, borderRadius: 14, marginTop: 20, textAlign: 'left', whiteSpace: 'pre-wrap', lineHeight: 1.8, fontStyle: 'italic' }}>{story}</div>}
    </div>
  );
}
