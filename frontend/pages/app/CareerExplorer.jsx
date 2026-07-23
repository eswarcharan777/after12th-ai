import React, { useState } from 'react';
export default function CareerExplorer() {
  const [branch, setBranch] = useState('CSE'); const [reply, setReply] = useState(''); const [loading, setLoading] = useState(false);
  const go = async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'tutor', messages: [{ role: 'user', content: `I'm considering ${branch} branch after 12th. Show me: top 5 career paths, expected salaries (India + abroad), top companies hiring, skills required, and realistic growth timeline.` }] }) });
      setReply((await r.json()).reply);
    } catch { setReply('Error'); } finally { setLoading(false); }
  };
  return (
    <div className="page-enter" style={{ maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🏢 Career Path Explorer</h1>
      <input value={branch} onChange={e => setBranch(e.target.value)} placeholder="Branch (e.g. CSE, MBBS)" style={{ padding: 12, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', width: '100%', maxWidth: 300, marginBottom: 12 }} />
      <button className="btn-primary" onClick={go} disabled={loading}>{loading ? 'Loading...' : 'Explore careers →'}</button>
      {reply && <div className="glass" style={{ padding: 22, borderRadius: 14, marginTop: 20, whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{reply}</div>}
    </div>
  );
}
