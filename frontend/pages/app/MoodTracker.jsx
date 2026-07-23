import React, { useState, useEffect } from 'react';
const MOODS = [{e:'😄',l:'Great',v:5},{e:'🙂',l:'Good',v:4},{e:'😐',l:'Okay',v:3},{e:'😟',l:'Low',v:2},{e:'😢',l:'Down',v:1}];
export default function MoodTracker() {
  const [log, setLog] = useState([]);
  useEffect(() => { setLog(JSON.parse(localStorage.getItem('a12_mood') || '[]')); }, []);
  const set = (m) => { const nl = [...log, { ts: Date.now(), ...m }]; setLog(nl); localStorage.setItem('a12_mood', JSON.stringify(nl.slice(-30))); window.__a12Toast?.(`Logged: ${m.l}`, 'success'); };
  const avg = log.length ? (log.reduce((a, l) => a + l.v, 0) / log.length).toFixed(1) : '-';
  return (
    <div className="page-enter" style={{ maxWidth: 700, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🌡️ Mood Tracker</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>Avg mood: {avg}/5 · {log.length} logs</p>
      <div className="glass" style={{ padding: 24, borderRadius: 16, marginBottom: 20 }}>
        <h3>How are you feeling right now?</h3>
        <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
          {MOODS.map(m => <button key={m.v} onClick={() => set(m)} style={{ flex: 1, padding: 18, fontSize: 40, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, cursor: 'pointer' }}>{m.e}<div style={{ fontSize: 12, marginTop: 6 }}>{m.l}</div></button>)}
        </div>
      </div>
      <div className="glass" style={{ padding: 20, borderRadius: 14 }}>
        <h4>Recent logs</h4>
        {log.slice(-7).reverse().map((l, i) => <div key={i} style={{ padding: 10, borderBottom: '1px solid var(--border)' }}>{l.e} {l.l} · {new Date(l.ts).toLocaleString()}</div>)}
      </div>
    </div>
  );
}
