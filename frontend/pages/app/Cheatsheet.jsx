import React, { useState } from 'react';

export default function Cheatsheet() {
  const [input, setInput] = useState('');
  const [sheet, setSheet] = useState('');
  const [loading, setLoading] = useState(false);

  const build = async () => {
    if (input.trim().length < 40) { window.__a12Toast && window.__a12Toast('Paste more content', 'warn'); return; }
    setLoading(true); setSheet('');
    const prompt = `Build a compact 1-page exam cheatsheet from this content. Include: key formulas (boxed), core definitions, common traps, and a "must-remember" section. Use markdown-like structure. Content:\n\n${input}`;
    try {
      const r = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'summarize', messages: [{ role: 'user', content: prompt }] }),
      });
      const j = await r.json();
      setSheet(j.reply);
      window.__a12Toast && window.__a12Toast('Cheatsheet ready!', 'success');
    } catch (e) { setSheet('Error: ' + e.message); } finally { setLoading(false); }
  };

  const download = () => {
    const blob = new Blob([sheet], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'cheatsheet.txt'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>📝 Cheatsheet Generator</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 24 }}>Auto-build exam cheatsheets from any notes.</p>

      <div className="glass" style={{ padding: 20, borderRadius: 14, marginBottom: 20 }}>
        <textarea value={input} onChange={e => setInput(e.target.value)}
          placeholder="Paste your notes / chapter / topic..."
          style={{ width: '100%', minHeight: 220, padding: 14, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }} />
        <button className="btn-primary" onClick={build} disabled={loading} style={{ marginTop: 12 }}>
          {loading ? 'Building...' : '✨ Build Cheatsheet'}
        </button>
      </div>

      {sheet && (
        <div className="glass-strong" style={{ padding: 26, borderRadius: 16, whiteSpace: 'pre-wrap', lineHeight: 1.75, fontFamily: 'monospace', fontSize: 14 }}>
          <button className="btn-outline" onClick={download} style={{ float: 'right', marginBottom: 10 }}>⬇ Download</button>
          {sheet}
        </div>
      )}
    </div>
  );
}
