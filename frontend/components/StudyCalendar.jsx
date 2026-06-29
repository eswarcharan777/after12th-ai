import React, { useMemo } from 'react';
import { getLocalScores } from '../userdata';

const LS = {
  pomoDays: 'after12th_pomo_days',   // JSON: { 'YYYY-MM-DD': minutes }
  streakLast: 'after12th_streak_lastdate',
};

function dateKey(d) {
  return d.toISOString().split('T')[0];
}

// Build a list of activity per day from existing data
function getActivity() {
  const activity = {};

  // Mock tests
  const scores = getLocalScores();
  scores.forEach(s => {
    const key = new Date(s.date).toISOString().split('T')[0];
    activity[key] = (activity[key] || 0) + 1;
  });

  // Daily quiz
  const quizHist = JSON.parse(localStorage.getItem('after12th_quiz_history') || '[]');
  quizHist.forEach(q => {
    const key = new Date(q.date).toISOString().split('T')[0];
    activity[key] = (activity[key] || 0) + 1;
  });

  // Streak (last login)
  const last = localStorage.getItem(LS.streakLast);
  if (last) {
    const key = new Date(last).toISOString().split('T')[0];
    activity[key] = (activity[key] || 0) + 1;
  }

  return activity;
}

export default function StudyCalendar() {
  const activity = useMemo(() => getActivity(), []);

  // Show last 84 days (12 weeks)
  const days = [];
  const today = new Date();
  for (let i = 83; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push(d);
  }

  // Group into weeks (7 days each, 12 weeks total)
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const totalActive = Object.keys(activity).length;
  const maxActivity = Math.max(1, ...Object.values(activity));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
        <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 17, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 10, margin: 0 }}>
          <span style={{ width: 4, height: 22, background: 'var(--aurora)', borderRadius: 2 }} />
          📅 Study Activity
        </h3>
        <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>
          <strong style={{ color: 'var(--violet-2)' }}>{totalActive}</strong> active days · last 12 weeks
        </div>
      </div>

      <div style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 8 }}>
        {weeks.map((week, wi) => (
          <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {week.map((d, di) => {
              const key = dateKey(d);
              const count = activity[key] || 0;
              const intensity = count === 0 ? 0 : count / maxActivity;
              let bg;
              if (count === 0) bg = 'rgba(255,255,255,0.04)';
              else if (intensity < 0.34) bg = 'rgba(139,92,246,0.30)';
              else if (intensity < 0.67) bg = 'rgba(139,92,246,0.60)';
              else bg = 'rgba(139,92,246,1.0)';

              return (
                <div key={di} title={`${d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} · ${count} activit${count === 1 ? 'y' : 'ies'}`} style={{
                  width: 14, height: 14, borderRadius: 3,
                  background: bg,
                  border: count > 0 ? '1px solid rgba(139,92,246,0.5)' : '1px solid rgba(255,255,255,0.06)',
                  boxShadow: count > 0 ? `0 0 ${intensity * 8}px rgba(139,92,246,0.6)` : 'none',
                  cursor: 'pointer',
                  transition: 'transform 0.15s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12, fontSize: 11, color: 'var(--text-dim)' }}>
        <span>Less</span>
        {[0.04, 0.30, 0.60, 1.0].map(o => (
          <div key={o} style={{ width: 12, height: 12, borderRadius: 3, background: `rgba(139,92,246,${o})`, border: '1px solid rgba(139,92,246,0.3)' }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
