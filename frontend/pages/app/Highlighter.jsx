import React, { useState, useEffect } from 'react';

const KEY = 'a12_highlights';

export default function Highlighter() {
  const [text, setText] = useState('Paste any study material here. Then select any text and click a color to highlight it. Your highlights are saved automatically.');
  const [highlights, setHighlights] = useState(() => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } });
  const [selection, setSelection] = useState(null);

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(highlights)); }, [highlights]);

  const captureSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.toString().trim().length > 0) {
      setSelection(sel.toString());
    }
  };

  const highlight = (color) => {
    if (!selection) { window.__a12Toast && window.__a12Toast('Select text first', 'warn'); return; }
    setHighlights([...highlights, { id: Date.now(), text: selection, color, note: '' }]);
    setSelection(null);
    window.getSelection().removeAllRanges();
    window.__a12Toast && window.__a12Toast('Highlighted!', 'success');
  };

  const remove = (id) => setHighlights(highlights.filter(h => h.id !== id));

  const renderText = () => {
    let result = text;
    highlights.forEach(h => {
      result = result.split(h.text).join(`<mark style="background:${h.color}44;padding:2px 4px;border-radius:3px;border-bottom:2px solid ${h.color}">${h.text}</mark>`);
    });
    return result;
  };

  return (
    <div className="page-enter" style={{ maxWidth: 1000, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>📖 Highlighter</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 24 }}>Mark important text · {highlights.length} highlights saved</p>

      <div className="glass" style={{ padding: 14, borderRadius: 14, marginBottom: 16, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 13, color: 'var(--text-dim)', marginRight: 8 }}>Highlight color:</span>
        {['#FBBF24', '#10B981', '#EC4899', '#06B6D4', '#8B5CF6'].map(c => (
          <button key={c} onClick={() => highlight(c)} style={{ width: 32, height: 32, borderRadius: 8, background: c, border: '1px solid var(--border)' }} />
        ))}
        {selection && <span style={{ fontSize: 12, marginLeft: 10, color: 'var(--violet-2)' }}>"{selection.slice(0, 40)}..."</span>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        <div>
          <textarea value={text} onChange={e => setText(e.target.value)}
            placeholder="Paste your notes here..."
            style={{ width: '100%', minHeight: 180, padding: 14, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', marginBottom: 14 }} />
          <div className="glass" onMouseUp={captureSelection} style={{ padding: 20, borderRadius: 14, lineHeight: 1.9, fontSize: 15 }}
            dangerouslySetInnerHTML={{ __html: renderText() }} />
        </div>
        <div className="glass" style={{ padding: 16, borderRadius: 14, alignSelf: 'flex-start' }}>
          <h4 style={{ fontFamily: 'Sora', marginBottom: 12 }}>Your highlights</h4>
          {highlights.length === 0 && <p style={{ color: 'var(--text-dim)', fontSize: 13 }}>None yet.</p>}
          {highlights.map(h => (
            <div key={h.id} style={{ borderLeft: `3px solid ${h.color}`, paddingLeft: 10, marginBottom: 12, fontSize: 13 }}>
              <div>{h.text}</div>
              <button onClick={() => remove(h.id)} style={{ color: 'var(--text-faint)', fontSize: 11, marginTop: 4, background: 'none', cursor: 'pointer' }}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
