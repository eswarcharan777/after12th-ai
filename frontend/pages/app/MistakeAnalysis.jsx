import React, { useState } from 'react';
export default function MistakeAnalysis() {
  const [reply, setReply] = useState(''); const [loading, setLoading] = useState(false);
  const go = async () => {
    setLoading(true);
    const scores = JSON.parse(localStorage.getItem('after12th_scores') || '[]');
    try {
      const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'tutor', messages: [{ role: 'user', content: `Analyze my common NEET/JEE mistakes based on my score history: ${JSON.stringify(scores.slice(-10))}. Identify 3-5 patterns and give me specific corrections.` }] }) });
      setReply((await r.json()).reply);
    } catch { setReply('Error'); } finally { setLoading(false); }
  };
  return (
    <div className="page-enter" style={{ maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>📉 Mistake Analysis</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>AI reviews your test history for patterns</p>
      <button className="btn-primary" onClick={go} disabled={loading}>{loading ? 'Analyzing...' : '🔍 Analyze my mistakes'}</button>
      {reply && <div className="glass" style={{ padding: 22, borderRadius: 14, marginTop: 20, whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{reply}</div>}
    </div>
  );
}
