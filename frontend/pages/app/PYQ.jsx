import React, { useState } from 'react';

const YEARS = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016];

export default function PYQ() {
  const user = JSON.parse(localStorage.getItem('after12th_user') || '{}');
  const defaultExam = user.exam === 'JEE' ? 'JEE' : 'NEET';

  const [pick, setPick] = useState(null); // { exam, year }
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAnswers, setShowAnswers] = useState(false);

  const open = async (exam, year) => {
    setPick({ exam, year });
    setLoading(true); setPaper(null); setError(''); setShowAnswers(false);
    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'qgen',
          messages: [{
            role: 'user',
            content: `Generate a representative ${exam} ${year} question paper — 10 MCQs matching the actual chapter-wise weightage and difficulty of ${exam} ${year}. Mix Physics, Chemistry, and ${exam === 'NEET' ? 'Biology' : 'Maths'}. Include full options and detailed explanations.`
          }]
        })
      });
      if (!r.ok) throw new Error();
      const j = await r.json();
      if (!j.reply) throw new Error();
      setPaper(JSON.parse(j.reply));
    } catch {
      setError('AI service is waking up — please retry in ~15 seconds.');
    } finally { setLoading(false); }
  };

  return (
    <div className="page-enter" style={{ maxWidth: 1000, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>📝 Previous Year Papers</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>Click a year to generate a 10-question paper in that year's style. All questions and solutions are shown right here.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
        {YEARS.map(y => (
          <div key={y} className="glass" style={{ padding: 20, borderRadius: 14 }}>
            <div style={{ fontFamily: 'Sora', fontSize: 28, fontWeight: 800, background: 'var(--aurora)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{y}</div>
            <div style={{ fontSize: 13, color: 'var(--text-dim)', margin: '6px 0 12px' }}>Paper style: 10 MCQs</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => open('NEET', y)} className="btn-outline" style={{ fontSize: 12, padding: '6px 10px', flex: 1 }}>NEET</button>
              <button onClick={() => open('JEE', y)} className="btn-outline" style={{ fontSize: 12, padding: '6px 10px', flex: 1 }}>JEE</button>
            </div>
          </div>
        ))}
      </div>

      {pick && (
        <div className="glass-strong" style={{ padding: 26, borderRadius: 16, marginTop: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 10 }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--violet-2)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>{pick.exam} · {pick.year}</div>
              <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 22, margin: '4px 0 0' }}>{pick.exam} {pick.year} — Practice Paper</h2>
            </div>
            {paper && (
              <button onClick={() => setShowAnswers(s => !s)} className="btn-outline" style={{ fontSize: 13 }}>
                {showAnswers ? 'Hide answers' : 'Show answers'}
              </button>
            )}
          </div>

          {loading && <div style={{ color: 'var(--text-dim)' }}>🤖 Generating {pick.exam} {pick.year} paper…</div>}
          {error && <div style={{ padding: 12, background: 'rgba(239,68,68,0.12)', border: '1px solid #EF4444', color: '#FCA5A5', borderRadius: 10, fontSize: 13 }}>{error}</div>}

          {paper?.questions && paper.questions.map((q, i) => (
            <div key={q.id || i} style={{ padding: '14px 0', borderTop: i ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Q{i + 1}. <span style={{ color: 'var(--text-dim)', fontSize: 12, marginLeft: 4 }}>({q.subject} · {q.topic})</span></div>
              <div style={{ marginBottom: 10 }}>{q.question}</div>
              <div style={{ display: 'grid', gap: 6 }}>
                {q.options.map((opt, j) => (
                  <div key={j} style={{
                    padding: '8px 12px', borderRadius: 8,
                    background: showAnswers && j === q.correct ? 'rgba(16,185,129,0.15)' : 'var(--surface)',
                    border: `1px solid ${showAnswers && j === q.correct ? 'var(--green)' : 'var(--border)'}`,
                    fontSize: 13,
                  }}>{opt}</div>
                ))}
              </div>
              {showAnswers && q.explanation && (
                <div style={{ marginTop: 10, padding: 10, borderRadius: 8, background: 'rgba(139,92,246,0.08)', fontSize: 13, color: 'var(--text)' }}>
                  💡 {q.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
