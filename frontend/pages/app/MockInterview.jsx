import React, { useState } from 'react';
export default function MockInterview() {
  const [history, setHistory] = useState([{ role: 'assistant', content: 'Welcome! Tell me — what college are you interviewing for and what stream?' }]);
  const [input, setInput] = useState(''); const [loading, setLoading] = useState(false);
  const send = async () => {
    if (!input.trim()) return;
    const upd = [...history, { role: 'user', content: input }]; setHistory(upd); setInput(''); setLoading(true);
    try {
      const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'tutor', messages: [{ role: 'user', content: 'You are a college admissions interviewer for Indian institutes. Ask tough but fair interview questions one at a time based on the student\'s answers. After each answer, briefly rate (1-10) and ask the next question.' }, ...upd] }) });
      setHistory([...upd, { role: 'assistant', content: (await r.json()).reply }]);
    } catch { setHistory([...upd, { role: 'assistant', content: 'Error, try again' }]); } finally { setLoading(false); }
  };
  return (
    <div className="page-enter" style={{ maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🎤 Mock Interview</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>AI-powered college admission interview practice</p>
      <div className="glass" style={{ padding: 20, borderRadius: 14, marginBottom: 12, maxHeight: 500, overflowY: 'auto' }}>
        {history.map((m, i) => <div key={i} style={{ padding: 12, marginBottom: 8, borderRadius: 10, background: m.role === 'user' ? 'rgba(139,92,246,0.15)' : 'var(--surface)' }}><b>{m.role === 'user' ? 'You' : 'Interviewer'}:</b> {m.content}</div>)}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Your answer..." style={{ flex: 1, padding: 12, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }} />
        <button className="btn-primary" onClick={send} disabled={loading}>{loading ? '...' : 'Send'}</button>
      </div>
    </div>
  );
}
