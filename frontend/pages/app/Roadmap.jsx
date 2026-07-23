import React, { useState } from 'react';

export default function Roadmap() {
  const [exam, setExam] = useState('NEET');
  const [level, setLevel] = useState('beginner');
  const [months, setMonths] = useState(6);
  const [hours, setHours] = useState(6);
  const [weak, setWeak] = useState('Physics numericals');
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const build = async () => {
    setLoading(true); setPlan(null);
    const prompt = `Target: ${exam}. Level: ${level}. Time available: ${months} months. Daily study hours: ${hours}. Weak areas: ${weak}. Build my complete personalized roadmap.`;
    try {
      const r = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'roadmap', messages: [{ role: 'user', content: prompt }] })
      });
      const j = await r.json();
      setPlan(JSON.parse(j.reply));
      window.__a12Toast && window.__a12Toast('Roadmap ready 🗺️', 'success');
    } catch (e) {
      window.__a12Toast && window.__a12Toast('Roadmap failed — retry', 'error');
    } finally { setLoading(false); }
  };

  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🗺️ Personalized Roadmap</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 24 }}>AI plans your entire prep based on your level and time.</p>

      <div className="glass" style={{ padding: 24, borderRadius: 16, marginBottom: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
        <label>Exam
          <select value={exam} onChange={(e) => setExam(e.target.value)} style={inp}><option>NEET</option><option>JEE</option></select>
        </label>
        <label>Your level
          <select value={level} onChange={(e) => setLevel(e.target.value)} style={inp}>
            <option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option>
          </select>
        </label>
        <label>Months available
          <input type="number" min="1" max="24" value={months} onChange={(e) => setMonths(+e.target.value)} style={inp} />
        </label>
        <label>Hours per day
          <input type="number" min="1" max="16" value={hours} onChange={(e) => setHours(+e.target.value)} style={inp} />
        </label>
        <label style={{ gridColumn: '1 / -1' }}>Weak areas
          <input value={weak} onChange={(e) => setWeak(e.target.value)} style={inp} />
        </label>
        <div style={{ gridColumn: '1 / -1' }}>
          <button className="btn-primary" onClick={build} disabled={loading}>
            {loading ? 'Building your roadmap...' : '✨ Build my roadmap'}
          </button>
        </div>
      </div>

      {plan && (
        <div>
          <div className="glass-strong pulse-glow" style={{ padding: 22, borderRadius: 16, marginBottom: 18 }}>
            <div style={{ fontSize: 12, color: 'var(--violet-2)', fontWeight: 700, marginBottom: 6 }}>YOUR PLAN</div>
            <div style={{ fontSize: 15, lineHeight: 1.7 }}>{plan.summary}</div>
          </div>
          {plan.phases?.map((p, i) => (
            <div key={i} className="glass" style={{ padding: 20, borderRadius: 14, marginBottom: 14 }}>
              <h3 style={{ fontFamily: 'Sora', fontWeight: 700, marginBottom: 8 }}>{p.phase}</h3>
              <div style={{ color: 'var(--text-dim)', marginBottom: 12 }}>{p.focus}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--cyan-2)', marginBottom: 6 }}>SUBJECTS</div>
              <ul style={{ paddingLeft: 20, marginBottom: 12 }}>{p.subjects?.map((s, j) => <li key={j}>{s}</li>)}</ul>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--pink-2)', marginBottom: 6 }}>GOALS</div>
              <ul style={{ paddingLeft: 20 }}>{p.goals?.map((g, j) => <li key={j}>{g}</li>)}</ul>
            </div>
          ))}
          {plan.dailySchedule && (
            <div className="glass" style={{ padding: 20, borderRadius: 14, marginBottom: 14 }}>
              <h4 style={{ fontFamily: 'Sora', marginBottom: 10 }}>⏰ Daily Schedule</h4>
              <ul style={{ paddingLeft: 20 }}>{plan.dailySchedule.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
          )}
          {plan.warning && (
            <div className="glass" style={{ padding: 16, borderRadius: 12, borderLeft: '3px solid #F5A623', background: 'rgba(245,166,35,0.08)' }}>
              ⚠️ {plan.warning}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const inp = { width: '100%', padding: 10, borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', marginTop: 4 };
