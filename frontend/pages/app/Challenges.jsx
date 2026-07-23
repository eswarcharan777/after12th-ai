import React, { useEffect, useState } from 'react';
import { useXP } from '../../xp';

const DAILY_TASKS = [
  { id: 'quiz5', label: 'Solve 5 Daily Quiz questions', xp: 30, icon: '🎲', link: '/app/quiz' },
  { id: 'flash10', label: 'Review 10 flashcards', xp: 25, icon: '🎴', link: '/app/srs' },
  { id: 'pomo1', label: 'Complete 1 Pomodoro session', xp: 20, icon: '🍅', link: '/app/pomodoro' },
  { id: 'mock1', label: 'Take 1 mock test', xp: 50, icon: '📝', link: '/app/mocktest' },
  { id: 'tutor1', label: 'Ask AI Tutor 1 question', xp: 15, icon: '🤖', link: '/app/tutor' },
];

const todayKey = () => new Date().toISOString().slice(0, 10);

export default function Challenges() {
  const [state, setState] = useState({});
  const { addXP } = useXP();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('a12_challenges') || '{}');
    if (stored.date !== todayKey()) {
      // rotate 3 challenges each day
      const shuffled = [...DAILY_TASKS].sort(() => Math.random() - 0.5).slice(0, 3);
      const fresh = { date: todayKey(), tasks: shuffled.map(t => ({ ...t, done: false })) };
      localStorage.setItem('a12_challenges', JSON.stringify(fresh));
      setState(fresh);
    } else setState(stored);
  }, []);

  const complete = (id) => {
    const t = state.tasks.find(x => x.id === id);
    if (!t || t.done) return;
    addXP(t.xp, `Daily challenge: ${t.label}`);
    const updated = { ...state, tasks: state.tasks.map(x => x.id === id ? { ...x, done: true } : x) };
    setState(updated);
    localStorage.setItem('a12_challenges', JSON.stringify(updated));
  };

  const doneCount = state.tasks?.filter(t => t.done).length || 0;
  const total = state.tasks?.length || 0;
  const allDone = doneCount === total && total > 0;

  return (
    <div className="page-enter" style={{ maxWidth: 700, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🎯 Daily Challenges</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>Complete today's tasks to earn XP · Progress: {doneCount}/{total}</p>

      {allDone && (
        <div className="glass-strong pulse-glow" style={{ padding: 20, borderRadius: 14, marginBottom: 18, textAlign: 'center' }}>
          🏆 All done! Come back tomorrow for new challenges.
        </div>
      )}

      {state.tasks?.map(t => (
        <div key={t.id} className="glass" style={{
          padding: 18, borderRadius: 14, marginBottom: 12,
          display: 'flex', alignItems: 'center', gap: 14,
          opacity: t.done ? 0.55 : 1,
          textDecoration: t.done ? 'line-through' : 'none',
        }}>
          <div style={{ fontSize: 32 }}>{t.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600 }}>{t.label}</div>
            <div style={{ fontSize: 12, color: 'var(--pink-2)', fontWeight: 700, marginTop: 4 }}>+{t.xp} XP</div>
          </div>
          {t.done ? (
            <span style={{ color: 'var(--green)', fontSize: 22, fontWeight: 800 }}>✓</span>
          ) : (
            <>
              <a href={t.link} className="btn-outline" style={{ fontSize: 13, padding: '8px 14px' }}>Go</a>
              <button onClick={() => complete(t.id)} className="btn-primary" style={{ fontSize: 13, padding: '8px 14px' }}>Mark done</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
