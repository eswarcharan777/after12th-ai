import React, { useState } from 'react';

export default function MindMap() {
  const [topic, setTopic] = useState('Photosynthesis');
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true); setMap(null);
    const prompt = `Create a mind map for NEET/JEE topic "${topic}". Reply ONLY with JSON: {"center":"${topic}","branches":[{"label":"sub-topic","children":["detail1","detail2","detail3"]},{"label":"...","children":[...]}]}. Give 5-6 branches, each with 3-4 children. No markdown fences.`;
    try {
      const r = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'qgen', messages: [{ role: 'user', content: prompt }] }),
      });
      const j = await r.json();
      const cleaned = j.reply.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
      setMap(JSON.parse(cleaned));
      window.__a12Toast && window.__a12Toast('Mind map built 🎨', 'success');
    } catch (e) {
      window.__a12Toast && window.__a12Toast('Generation failed', 'error');
    } finally { setLoading(false); }
  };

  const colors = ['#8B5CF6', '#EC4899', '#06B6D4', '#F5A623', '#10B981', '#F472B6'];

  return (
    <div className="page-enter" style={{ maxWidth: 1100, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🎨 Mind Maps</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 24 }}>Visual concept connections powered by AI</p>

      <div className="glass" style={{ padding: 20, borderRadius: 14, marginBottom: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="Enter a topic..."
          style={{ flex: 1, minWidth: 240, padding: 12, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }} />
        <button className="btn-primary" onClick={generate} disabled={loading}>{loading ? 'Generating...' : '✨ Generate Map'}</button>
      </div>

      {map && (
        <div className="glass" style={{ padding: 30, borderRadius: 16, position: 'relative', overflow: 'auto' }}>
          <div style={{ position: 'relative', minHeight: 500 }}>
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              padding: '18px 28px', borderRadius: 100, background: 'var(--aurora)',
              color: 'white', fontWeight: 800, fontFamily: 'Sora', fontSize: 18,
              boxShadow: 'var(--glow-violet)', zIndex: 2,
            }}>{map.center}</div>
            {map.branches?.map((b, i) => {
              const angle = (i / map.branches.length) * 2 * Math.PI;
              const r = 200;
              const x = 50 + Math.cos(angle) * 30;
              const y = 50 + Math.sin(angle) * 30;
              return (
                <div key={i} style={{
                  position: 'absolute', left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)',
                  maxWidth: 200, textAlign: 'center',
                }}>
                  <div style={{
                    padding: '10px 16px', borderRadius: 12, background: colors[i % colors.length],
                    color: 'white', fontWeight: 700, boxShadow: `0 0 20px ${colors[i % colors.length]}66`, marginBottom: 8,
                  }}>{b.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-mid)' }}>
                    {b.children?.map((c, j) => <div key={j} style={{ padding: 4 }}>• {c}</div>)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
