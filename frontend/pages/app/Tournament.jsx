import React, { useMemo } from 'react';
import { useXP } from '../../xp';

const TOURNAMENT_BOTS = [
  { name: 'Kavya R.', xp: 480 }, { name: 'Rohit S.', xp: 410 }, { name: 'Meera K.', xp: 380 },
  { name: 'Aditya J.', xp: 320 }, { name: 'Sana P.', xp: 260 }, { name: 'Vivek M.', xp: 200 },
  { name: 'Diya G.', xp: 150 }, { name: 'Ayaan T.', xp: 90 },
];

const weekStart = () => {
  const d = new Date();
  d.setDate(d.getDate() - d.getDay());
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};

const daysLeft = () => {
  const now = new Date();
  const end = new Date(weekStart() + 7 * 86400000);
  return Math.ceil((end - now) / 86400000);
};

export default function Tournament() {
  const { xp, log } = useXP();
  const user = JSON.parse(localStorage.getItem('after12th_user') || '{}');

  const weekXP = useMemo(() => {
    const start = weekStart();
    return log.filter(l => l.ts >= start).reduce((a, l) => a + l.amount, 0);
  }, [log]);

  const board = useMemo(() => {
    const rows = TOURNAMENT_BOTS.map(b => ({ ...b, avatar: '🎓' }));
    rows.push({ name: user.name || 'You', xp: weekXP, avatar: '⭐', isYou: true });
    rows.sort((a, b) => b.xp - a.xp);
    return rows;
  }, [weekXP, user.name]);

  const rank = board.findIndex(r => r.isYou) + 1;
  const prize = rank === 1 ? '🏆 Champion Badge + 500 XP' : rank <= 3 ? '🥉 Podium Badge + 200 XP' : rank <= 10 ? '🎖 Top 10 Badge + 50 XP' : 'Keep grinding!';

  return (
    <div className="page-enter" style={{ maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🏆 Weekly Tournament</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>Compete with students across India · Resets in {daysLeft()} day{daysLeft() !== 1 ? 's' : ''}</p>

      <div className="glass-strong pulse-glow" style={{ padding: 24, borderRadius: 16, marginBottom: 20, textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: 'var(--text-dim)', letterSpacing: 1, textTransform: 'uppercase' }}>YOUR RANK THIS WEEK</div>
        <div style={{ fontFamily: 'Sora', fontSize: 60, fontWeight: 900, background: 'var(--aurora)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>#{rank}</div>
        <div style={{ fontSize: 14, color: 'var(--text-mid)' }}>{weekXP} XP earned this week</div>
        <div style={{ marginTop: 14, padding: 12, background: 'rgba(139,92,246,0.1)', borderRadius: 10, fontWeight: 700 }}>{prize}</div>
      </div>

      <div className="glass" style={{ padding: 8, borderRadius: 14 }}>
        {board.map((r, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: 12,
            background: r.isYou ? 'rgba(139,92,246,0.15)' : 'transparent',
            borderRadius: 10, border: r.isYou ? '1px solid var(--violet)' : '1px solid transparent',
          }}>
            <div style={{ width: 30, textAlign: 'center', fontWeight: 800 }}>#{i + 1}</div>
            <div style={{ fontSize: 20 }}>{r.avatar}</div>
            <div style={{ flex: 1, fontWeight: r.isYou ? 700 : 500 }}>{r.name}</div>
            <div style={{ fontFamily: 'Sora', fontWeight: 800, color: 'var(--pink-2)' }}>{r.xp} XP</div>
          </div>
        ))}
      </div>
    </div>
  );
}
