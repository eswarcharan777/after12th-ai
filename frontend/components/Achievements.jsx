import React, { useEffect, useState } from 'react';
import { getLocalScores } from '../userdata';

// Achievement definitions — each has a check() function that returns boolean
const ACHIEVEMENTS = [
  // Mock test achievements
  { id: 'first_test',     icon: '🎯', title: 'First Steps',       desc: 'Take your first mock test',         check: ({ scores }) => scores.length >= 1 },
  { id: 'five_tests',     icon: '🏃', title: 'Getting Serious',   desc: 'Complete 5 mock tests',             check: ({ scores }) => scores.length >= 5 },
  { id: 'ten_tests',      icon: '💪', title: 'Test Warrior',      desc: 'Complete 10 mock tests',            check: ({ scores }) => scores.length >= 10 },
  { id: 'twenty_tests',   icon: '⚔️', title: 'Mock Master',       desc: 'Complete 20 mock tests',            check: ({ scores }) => scores.length >= 20 },

  // Score achievements
  { id: 'half_score',     icon: '📈', title: 'Halfway Hero',      desc: 'Score 50% in any mock test',        check: ({ scores }) => scores.some(s => s.score >= s.total * 0.5) },
  { id: 'good_score',     icon: '⭐', title: 'Solid Performer',   desc: 'Score 70% in any mock test',        check: ({ scores }) => scores.some(s => s.score >= s.total * 0.7) },
  { id: 'great_score',    icon: '🌟', title: 'Top Scorer',        desc: 'Score 85% in any mock test',        check: ({ scores }) => scores.some(s => s.score >= s.total * 0.85) },
  { id: 'perfect_score',  icon: '👑', title: 'Perfectionist',     desc: 'Score 100% in any mock test',       check: ({ scores }) => scores.some(s => s.score === s.total && s.total > 0) },

  // Study time (Pomodoro)
  { id: 'first_focus',    icon: '🍅', title: 'Focus Begins',      desc: 'Complete your first Pomodoro session', check: ({ pomoTotal }) => pomoTotal >= 25 },
  { id: 'hour_focus',     icon: '⏰', title: 'Hour of Power',     desc: 'Study for 60 minutes total',        check: ({ pomoTotal }) => pomoTotal >= 60 },
  { id: 'five_hours',     icon: '🔥', title: 'Burning Bright',    desc: 'Study for 5 hours total',           check: ({ pomoTotal }) => pomoTotal >= 300 },
  { id: 'ten_hours',      icon: '💎', title: 'Diamond Focus',     desc: 'Study for 10 hours total',          check: ({ pomoTotal }) => pomoTotal >= 600 },

  // Variety
  { id: 'both_exams',     icon: '🎭', title: 'Versatile',         desc: 'Take both NEET and JEE mock tests', check: ({ scores }) => new Set(scores.map(s => s.exam)).size >= 2 },
  { id: 'questions_100',  icon: '🧠', title: '100 Questions',     desc: 'Answer 100+ questions',             check: ({ scores }) => scores.reduce((sum, s) => sum + (s.correct + s.wrong + s.unattempted), 0) >= 100 },

  // Special
  { id: 'launched',       icon: '🚀', title: 'Welcome Aboard',    desc: 'Created your account',              check: () => true },
];

function getStatus() {
  const scores = getLocalScores();
  const pomoTotal = Number(localStorage.getItem('after12th_pomo_total') || 0);
  return { scores, pomoTotal };
}

export default function Achievements({ compact = false }) {
  const [status, setStatus] = useState(getStatus());
  const earned = ACHIEVEMENTS.filter(a => a.check(status));
  const locked = ACHIEVEMENTS.filter(a => !a.check(status));
  const pct = Math.round((earned.length / ACHIEVEMENTS.length) * 100);

  useEffect(() => {
    // Refresh every 5s in case user takes a test or pomodoro elsewhere
    const id = setInterval(() => setStatus(getStatus()), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
        <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 17, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 10, margin: 0 }}>
          <span style={{ width: 4, height: 22, background: 'var(--aurora)', borderRadius: 2, boxShadow: 'var(--glow-violet)' }} />
          🏆 Achievements
        </h3>
        <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>
          <strong style={{ color: 'var(--violet-2)' }}>{earned.length}</strong> / {ACHIEVEMENTS.length} unlocked · {pct}%
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 8, background: 'var(--surface)', borderRadius: 4, marginBottom: 18, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'var(--aurora)', boxShadow: '0 0 12px rgba(139,92,246,0.5)', transition: 'width 1s cubic-bezier(.22,1,.36,1)' }} />
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: compact ? 'repeat(auto-fill, minmax(120px, 1fr))' : 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: 12,
      }}>
        {ACHIEVEMENTS.map((a, i) => {
          const isEarned = earned.includes(a);
          return (
            <div key={a.id} title={`${a.title}: ${a.desc}`} style={{
              background: isEarned ? 'rgba(139,92,246,0.10)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${isEarned ? 'rgba(139,92,246,0.4)' : 'var(--border)'}`,
              borderRadius: 12,
              padding: compact ? 10 : 14,
              textAlign: 'center',
              transition: 'all 0.25s',
              cursor: 'default',
              animation: `fadeUp 0.5s ${i * 30}ms backwards`,
              opacity: isEarned ? 1 : 0.5,
              boxShadow: isEarned ? '0 4px 16px rgba(139,92,246,0.2)' : 'none',
            }}
              onMouseEnter={e => { if (isEarned) { e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(139,92,246,0.4)'; } }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = isEarned ? '0 4px 16px rgba(139,92,246,0.2)' : 'none'; }}
            >
              <div style={{ fontSize: compact ? 26 : 32, marginBottom: 6, filter: isEarned ? 'none' : 'grayscale(1) brightness(0.6)' }}>{a.icon}</div>
              <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: compact ? 12 : 13, color: isEarned ? 'var(--text)' : 'var(--text-faint)', marginBottom: 4 }}>{a.title}</div>
              {!compact && <div style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.4 }}>{a.desc}</div>}
            </div>
          );
        })}
      </div>

      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: var(--final-opacity, 1); transform: translateY(0); } }`}</style>
    </div>
  );
}
