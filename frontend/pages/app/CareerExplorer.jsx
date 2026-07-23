import React, { useState } from 'react';

const PRESETS = [
  { key: 'CSE', label: 'CSE / Software' },
  { key: 'ECE', label: 'ECE / Electronics' },
  { key: 'Mechanical', label: 'Mechanical' },
  { key: 'Civil', label: 'Civil' },
  { key: 'MBBS', label: 'MBBS / Doctor' },
  { key: 'BDS', label: 'BDS / Dental' },
  { key: 'AI & ML', label: 'AI & ML' },
  { key: 'Biotech', label: 'Biotechnology' },
  { key: 'Data Science', label: 'Data Science' },
];

export default function CareerExplorer() {
  const [branch, setBranch] = useState('CSE');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const go = async () => {
    const target = branch.trim();
    if (!target) { setError('Enter or pick a branch to explore.'); return; }
    setLoading(true); setError(''); setReply('');
    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'tutor',
          messages: [{
            role: 'user',
            content: `I'm considering the ${target} branch/career after 12th. Give me a structured overview with these sections in plain text (no markdown headings):
1) Top 5 career paths (job titles + 1-line each)
2) Expected salary in India (entry / mid / senior) and abroad (USD)
3) Top 10 companies / hospitals hiring
4) Core skills / subjects to master
5) Realistic 10-year growth timeline
6) One honest downside of this path

Keep it under 400 words. Indian context.`
          }]
        })
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const j = await r.json();
      if (j.error) throw new Error(j.error);
      if (!j.reply) throw new Error('empty response');
      setReply(j.reply);
    } catch (e) {
      setError('Could not reach the AI right now. The backend may be waking up — please retry in ~20 seconds.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-enter" style={{ maxWidth: 820, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🏢 Career Path Explorer</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>Pick a branch or type your own — get AI-generated career paths, salaries, top employers, and skills to master.</p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
        {PRESETS.map(p => (
          <button key={p.key} onClick={() => setBranch(p.key)}
            className={branch === p.key ? 'btn-primary' : 'btn-outline'}
            style={{ fontSize: 12, padding: '6px 12px' }}>
            {p.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
        <input
          value={branch}
          onChange={e => setBranch(e.target.value)}
          placeholder="Or type a branch/career (e.g., Aerospace, Nursing, Design)"
          style={{ padding: 12, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', flex: 1, minWidth: 240 }}
        />
        <button className="btn-primary" onClick={go} disabled={loading} style={{ padding: '12px 22px' }}>
          {loading ? 'Thinking…' : 'Explore →'}
        </button>
      </div>

      {error && <div style={{ padding: 14, background: 'rgba(239,68,68,0.12)', border: '1px solid #EF4444', color: '#FCA5A5', borderRadius: 10, fontSize: 13, marginBottom: 12 }}>{error}</div>}

      {loading && (
        <div className="glass" style={{ padding: 22, borderRadius: 14, color: 'var(--text-dim)', textAlign: 'center' }}>
          🤖 Generating career overview for <strong style={{ color: 'var(--text)' }}>{branch}</strong>… may take 5-15s on cold start.
        </div>
      )}

      {reply && (
        <div className="glass" style={{ padding: 26, borderRadius: 14, marginTop: 8, whiteSpace: 'pre-wrap', lineHeight: 1.75, color: 'var(--text)' }}>
          {reply}
        </div>
      )}
    </div>
  );
}
