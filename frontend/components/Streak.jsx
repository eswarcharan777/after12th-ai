import React, { useEffect, useState } from 'react';

const STORAGE = { last: 'after12th_streak_lastdate', count: 'after12th_streak_count' };

function todayStr() { return new Date().toDateString(); }
function yesterdayStr() { const d = new Date(); d.setDate(d.getDate() - 1); return d.toDateString(); }

export default function Streak() {
  const [streak, setStreak] = useState(0);
  const [todayLogged, setTodayLogged] = useState(false);

  useEffect(() => {
    const last = localStorage.getItem(STORAGE.last);
    const stored = Number(localStorage.getItem(STORAGE.count) || 0);
    let nextStreak = stored;
    if (last === todayStr()) {
      // already logged today
      setTodayLogged(true);
    } else if (last === yesterdayStr()) {
      // continuing streak
      nextStreak = stored + 1;
    } else {
      // streak broken or first visit
      nextStreak = 1;
    }
    localStorage.setItem(STORAGE.last, todayStr());
    localStorage.setItem(STORAGE.count, String(nextStreak));
    setStreak(nextStreak);
    setTodayLogged(true);
  }, []);

  const msg = streak >= 30 ? 'Legendary!' : streak >= 14 ? 'Two weeks strong!' : streak >= 7 ? 'A week of fire!' : streak >= 3 ? 'Building momentum' : 'Keep showing up';
  const flameSize = Math.min(38 + streak * 1.4, 68);
  const flameGlow = Math.min(0.25 + streak * 0.015, 0.75);

  return (
    <div className="glass" style={{ padding: 18, borderRadius: 14, display: 'flex', alignItems: 'center', gap: 14, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -20, right: -20, width: 80 + streak * 2, height: 80 + streak * 2, borderRadius: '50%', background: '#EF4444', filter: 'blur(40px)', opacity: flameGlow, transition: 'all 0.6s ease' }} />
      <div style={{ position: 'relative', fontSize: flameSize, animation: 'flicker 2.5s infinite', filter: `drop-shadow(0 0 ${8 + streak}px rgba(239, 68, 68, ${flameGlow}))`, transition: 'font-size 0.6s ease' }}>🔥</div>
      <div style={{ position: 'relative', flex: 1 }}>
        <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 22, color: 'var(--text)', lineHeight: 1 }}>
          {streak} <span style={{ fontSize: 14, color: 'var(--text-dim)', fontWeight: 600 }}>day{streak !== 1 ? 's' : ''}</span>
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 4, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Study Streak · {msg}</div>
      </div>
      <style>{`@keyframes flicker { 0%,100% { transform: scale(1) rotate(-2deg); filter: hue-rotate(0deg); } 50% { transform: scale(1.1) rotate(2deg); filter: hue-rotate(15deg) brightness(1.2); } }`}</style>
    </div>
  );
}
