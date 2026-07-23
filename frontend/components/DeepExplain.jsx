import React, { useState } from 'react';

const CACHE_KEY = 'after12th_deep_explain_cache';

function readCache() {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}'); } catch { return {}; }
}
function writeCache(obj) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(obj)); } catch {}
}

export default function DeepExplain({ q, userAnswer }) {
  const cacheKey = `${q.id ?? q.question?.slice(0, 40)}::${userAnswer ?? 'na'}`;
  const cached = readCache()[cacheKey];
  const [deep, setDeep] = useState(cached || '');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const fetchDeep = async () => {
    if (deep) return;
    setLoading(true); setErr('');
    try {
      const payload = {
        question: q.question,
        options: q.options,
        correct: q.correct,
        userAnswer,
        subject: q.subject,
        chapter: q.chapter,
        baseExplanation: q.explanation,
      };
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'explain', messages: [{ role: 'user', content: JSON.stringify(payload) }] }),
      });
      const j = await r.json();
      const reply = (j.reply || '').trim();
      if (!reply) throw new Error('empty');
      setDeep(reply);
      const c = readCache();
      c[cacheKey] = reply;
      writeCache(c);
    } catch (e) {
      setErr('Could not load deeper explanation. Try again.');
    } finally { setLoading(false); }
  };

  const hasMedia = q.videoUrl || q.diagramUrl;

  return (
    <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {(hasMedia || !deep) && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {q.videoUrl && (
            <a href={q.videoUrl} target="_blank" rel="noopener noreferrer" className="btn-outline"
               style={chipStyle}>▶️ Watch video</a>
          )}
          {q.diagramUrl && (
            <a href={q.diagramUrl} target="_blank" rel="noopener noreferrer" className="btn-outline"
               style={chipStyle}>🖼️ View diagram</a>
          )}
          {!deep && (
            <button onClick={fetchDeep} disabled={loading} className="btn-outline" style={chipStyle}>
              {loading ? '⏳ Thinking...' : '🧠 Explain deeper'}
            </button>
          )}
        </div>
      )}
      {err && <div style={{ fontSize: 12, color: '#FCA5A5' }}>{err}</div>}
      {deep && (
        <div style={{
          padding: '12px 14px', borderRadius: 10,
          background: 'rgba(139,92,246,0.08)',
          border: '1px solid var(--border)',
          fontSize: 13, lineHeight: 1.6, color: 'var(--text)',
          whiteSpace: 'pre-wrap',
        }}>
          {deep}
        </div>
      )}
    </div>
  );
}

const chipStyle = {
  fontSize: 12, padding: '6px 12px', borderRadius: 999,
  textDecoration: 'none', cursor: 'pointer',
};
