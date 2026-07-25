import React, { useState } from 'react';
import { callAI } from '../../lib/callAI';

export default function NoteSummarizer() {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const summarize = async () => {
    if (input.trim().length < 40) { window.__a12Toast && window.__a12Toast('Paste more content first', 'warn'); return; }
    setLoading(true); setSummary('');
    try {
      const text = await callAI({ mode: 'summarize', prompt: input });
      setSummary(text);
      window.__a12Toast && window.__a12Toast('Notes ready!', 'success');
    } catch (e) { setSummary(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>📚 AI Note Summarizer</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 24 }}>Paste any lesson, chapter, or article — get clean exam-focused notes.</p>

      <div className="glass" style={{ padding: 20, borderRadius: 16, marginBottom: 20 }}>
        <textarea value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your lesson text here..."
          style={{ width: '100%', minHeight: 260, padding: 14, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: 14, lineHeight: 1.6 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
          <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>{input.length} chars</span>
          <button className="btn-primary" onClick={summarize} disabled={loading}>
            {loading ? 'Summarizing...' : '✨ Summarize'}
          </button>
        </div>
      </div>

      {summary && (
        <div className="glass-strong" style={{ padding: 24, borderRadius: 16, whiteSpace: 'pre-wrap', lineHeight: 1.75 }}>
          {summary}
        </div>
      )}
    </div>
  );
}
