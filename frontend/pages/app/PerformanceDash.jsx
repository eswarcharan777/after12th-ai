import React from 'react';
import ChartLine from '../../components/ChartLine';
export default function PerformanceDash() {
  const scores = JSON.parse(localStorage.getItem('after12th_scores') || '[]');
  const pomo = JSON.parse(localStorage.getItem('a12_pomo_log') || '[]');
  const trend = scores.slice(-7).map(s => Math.round((s.score / (s.total || 1)) * 100));
  const bySubject = {};
  pomo.forEach(p => { bySubject[p.subject] = (bySubject[p.subject] || 0) + p.minutes; });
  return (
    <div className="page-enter" style={{ maxWidth: 1000, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>📈 Performance Dashboard</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>{scores.length} tests · {pomo.length} sessions</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
        <div className="glass" style={{ padding: 20, borderRadius: 14 }}>
          <h4>Score trend (last 7)</h4>
          <ChartLine data={trend.length ? trend : [40, 55, 60, 65, 70, 75, 80]} height={140} />
        </div>
        <div className="glass" style={{ padding: 20, borderRadius: 14 }}>
          <h4>Time per subject (mins)</h4>
          {Object.entries(bySubject).length === 0 && <p style={{ color: 'var(--text-dim)' }}>Start Pomodoro to track</p>}
          {Object.entries(bySubject).map(([s, m]) => (
            <div key={s} style={{ marginTop: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}><span>{s}</span><b>{m} min</b></div>
              <div style={{ height: 8, background: 'var(--surface)', borderRadius: 4, overflow: 'hidden', marginTop: 4 }}>
                <div style={{ width: `${Math.min(100, m)}%`, height: '100%', background: 'var(--aurora)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
