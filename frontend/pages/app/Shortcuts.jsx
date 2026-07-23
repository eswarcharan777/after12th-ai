import React from 'react';
const SC = [
  ['Ctrl+K', 'Global search'], ['Ctrl+/', 'This shortcuts page'],
  ['Alt+D', 'Dashboard'], ['Alt+T', 'AI Tutor'], ['Alt+M', 'Mock Test'],
  ['Alt+P', 'Pomodoro'], ['Alt+F', 'Flashcards'], ['Esc', 'Close modals'],
];
export default function Shortcuts() {
  return (
    <div className="page-enter" style={{ maxWidth: 600, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 20 }}>⌨️ Keyboard Shortcuts</h1>
      <div className="glass" style={{ padding: 20, borderRadius: 14 }}>
        {SC.map(([k, d]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: 12, borderBottom: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--text-dim)' }}>{d}</span>
            <kbd style={{ padding: '4px 10px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, fontFamily: 'monospace' }}>{k}</kbd>
          </div>
        ))}
      </div>
    </div>
  );
}
