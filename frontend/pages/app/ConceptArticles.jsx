import React, { useState } from 'react';
export default function ConceptArticles() {
  const [topic, setTopic] = useState('Photosynthesis');
  const [article, setArticle] = useState(''); const [loading, setLoading] = useState(false);
  const go = async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'tutor', messages: [{ role: 'user', content: `Write a comprehensive but simple 500-word article explaining ${topic} for a Class 12 NEET/JEE student. Include: definition, key mechanisms, real-world examples, common exam mistakes, and 3 practice questions.` }] }) });
      setArticle((await r.json()).reply);
    } catch { setArticle('Error'); } finally { setLoading(false); }
  };
  return (
    <div className="page-enter" style={{ maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 20 }}>📖 Concept Articles</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="Topic name" style={{ flex: 1, padding: 12, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }} />
        <button className="btn-primary" onClick={go} disabled={loading}>{loading ? '...' : 'Generate'}</button>
      </div>
      {article && <div className="glass" style={{ padding: 24, borderRadius: 14, whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>{article}</div>}
    </div>
  );
}
