import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PAGES = [
  { name: 'Dashboard', path: '/app/dashboard', icon: '📊' }, { name: 'AI Tutor', path: '/app/tutor', icon: '🤖' },
  { name: 'Mock Test', path: '/app/mocktest', icon: '📝' }, { name: 'Photo Doubt', path: '/app/photo-doubt', icon: '📸' },
  { name: 'Voice Chat', path: '/app/voice-chat', icon: '🗣️' }, { name: 'Summarizer', path: '/app/summarize', icon: '📖' },
  { name: 'Question Generator', path: '/app/qgen', icon: '🧪' }, { name: 'Roadmap', path: '/app/roadmap', icon: '🗺️' },
  { name: 'SRS Flashcards', path: '/app/srs', icon: '🎴' }, { name: 'Adaptive Practice', path: '/app/adaptive', icon: '🎯' },
  { name: 'Weakness Heatmap', path: '/app/heatmap', icon: '📈' }, { name: 'Mind Maps', path: '/app/mindmap', icon: '🎨' },
  { name: 'Cheatsheet', path: '/app/cheatsheet', icon: '📝' }, { name: 'Highlighter', path: '/app/highlighter', icon: '✏️' },
  { name: 'Leaderboard', path: '/app/leaderboard', icon: '🥇' }, { name: 'Challenges', path: '/app/challenges', icon: '🎯' },
  { name: 'Tournament', path: '/app/tournament', icon: '🏆' }, { name: 'Loot Box', path: '/app/lootbox', icon: '🎁' },
  { name: 'Pet', path: '/app/pet', icon: '🐉' }, { name: 'Skill Tree', path: '/app/skilltree', icon: '📊' },
  { name: 'Formulas', path: '/app/formulas', icon: '📐' }, { name: 'Notes', path: '/app/notes', icon: '📝' },
  { name: 'Calculator', path: '/app/calculator', icon: '🧮' }, { name: 'Periodic Table', path: '/app/periodic', icon: '🌍' },
  { name: 'Whiteboard', path: '/app/whiteboard', icon: '🎨' }, { name: 'PYQ Papers', path: '/app/pyq', icon: '📝' },
  { name: 'NCERT Solutions', path: '/app/ncert', icon: '📚' }, { name: 'Bio Diagrams', path: '/app/biodiagrams', icon: '🧬' },
  { name: 'Theme Customizer', path: '/app/theme', icon: '🌈' }, { name: 'Performance', path: '/app/performance', icon: '📈' },
];

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setOpen(o => !o); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const results = q ? PAGES.filter(p => p.name.toLowerCase().includes(q.toLowerCase())).slice(0, 8) : PAGES.slice(0, 8);

  if (!open) return null;
  return (
    <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', zIndex: 100000, display: 'flex', justifyContent: 'center', paddingTop: 100 }}>
      <div onClick={e => e.stopPropagation()} className="glass-strong" style={{ padding: 16, borderRadius: 16, width: 560, maxWidth: '90vw', height: 'fit-content' }}>
        <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Search anything... (Ctrl+K)"
          style={{ width: '100%', padding: 14, fontSize: 16, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', marginBottom: 12 }} />
        {results.map(r => (
          <button key={r.path} onClick={() => { nav(r.path); setOpen(false); setQ(''); }}
            style={{ display: 'flex', width: '100%', gap: 12, padding: 12, borderRadius: 10, background: 'transparent', border: 'none', color: 'var(--text)', cursor: 'pointer', alignItems: 'center' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <span style={{ fontSize: 20 }}>{r.icon}</span>{r.name}
          </button>
        ))}
      </div>
    </div>
  );
}
