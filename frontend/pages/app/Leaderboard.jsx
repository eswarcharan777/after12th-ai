import React, { useMemo } from 'react';
import { useXP } from '../../xp';

const BOTS = [
  { name: 'Arjun R.', avatar: '🧑‍🎓', base: 1240 },
  { name: 'Priya S.', avatar: '👩‍🔬', base: 980 },
  { name: 'Vikram K.', avatar: '🤓', base: 850 },
  { name: 'Ananya M.', avatar: '👩‍💻', base: 720 },
  { name: 'Rahul P.', avatar: '🧑‍💼', base: 610 },
  { name: 'Neha J.', avatar: '👩‍🎓', base: 480 },
  { name: 'Karan T.', avatar: '🧢', base: 320 },
  { name: 'Isha B.', avatar: '👩', base: 210 },
];

export default function Leaderboard() {
  const { xp } = useXP();
  const user = JSON.parse(localStorage.getItem('after12th_user') || '{}');

  const board = useMemo(() => {
    const dayOffset = Math.floor(Date.now() / 86400000) % 100;
    const rows = BOTS.map(b => ({ ...b, xp: b.base + ((dayOffset * 7 + b.name.length * 13) % 200) }));
    rows.push({ name: user.name || 'You', avatar: '⭐', xp, isYou: true });
    rows.sort((a, b) => b.xp - a.xp);
    return rows;
  }, [xp, user.name]);

  const myRank = board.findIndex(r => r.isYou) + 1;

  return (
    <div className="page-enter" style={{ maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🥇 Leaderboard</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>You're rank <b style={{ color: 'var(--violet-2)' }}>#{myRank}</b> · Beat the top scorers this week!</p>

      <div className="glass" style={{ padding: 8, borderRadius: 16 }}>
        {board.map((r, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: 14,
            background: r.isYou ? 'rgba(139,92,246,0.15)' : 'transparent',
            borderRadius: 10, marginBottom: 4,
            border: r.isYou ? '1px solid var(--violet)' : '1px solid transparent',
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: i === 0 ? 'linear-gradient(135deg, #F5A623, #EC4899)' : i === 1 ? 'rgba(255,255,255,0.08)' : i === 2 ? 'rgba(245,166,35,0.15)' : 'transparent',
              fontWeight: 800, color: 'white',
            }}>{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}</div>
            <div style={{ fontSize: 22 }}>{r.avatar}</div>
            <div style={{ flex: 1, fontWeight: r.isYou ? 700 : 500 }}>{r.name} {r.isYou && <span className="badge badge-violet" style={{ marginLeft: 8 }}>YOU</span>}</div>
            <div style={{ fontFamily: 'Sora', fontWeight: 800, color: 'var(--violet-2)' }}>{r.xp} XP</div>
          </div>
        ))}
      </div>
    </div>
  );
}
