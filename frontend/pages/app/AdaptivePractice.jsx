import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import DeepExplain from '../../components/DeepExplain';

export default function AdaptivePractice() {
  const [params] = useSearchParams();
  const [subject, setSubject] = useState(params.get('subject') || 'Physics');
  const [topic, setTopic] = useState(params.get('topic') || 'Mechanics');
  const [questions, setQuestions] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchQuestions = async () => {
    setLoading(true); setQuestions(null); setCurrent(0); setAnswers({});
    const scores = JSON.parse(localStorage.getItem('after12th_scores') || '[]');
    const avg = scores.length ? scores.reduce((a, s) => a + (s.score / (s.total || 1)) * 100, 0) / scores.length : 50;
    const difficulty = avg > 70 ? 'hard' : avg > 45 ? 'medium' : 'easy';
    const prompt = `Generate 5 ${difficulty} MCQs for NEET/JEE on ${subject} - ${topic}. Match student level (avg score ${Math.round(avg)}%). Adaptive practice.`;
    try {
      const r = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'qgen', messages: [{ role: 'user', content: prompt }] }),
      });
      const j = await r.json();
      setQuestions(JSON.parse(j.reply));
      window.__a12Toast && window.__a12Toast(`5 ${difficulty} questions ready`, 'success');
    } catch (e) {
      window.__a12Toast && window.__a12Toast('Load failed', 'error');
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchQuestions(); /* eslint-disable-next-line */ }, []);

  const q = questions?.questions[current];
  const answered = q && answers[q.id] !== undefined;
  const correct = q && answers[q.id] === q.correct;

  return (
    <div className="page-enter" style={{ maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🎯 Adaptive Practice</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>AI picks questions targeting your weaknesses.</p>

      <div className="glass" style={{ padding: 14, borderRadius: 12, marginBottom: 16, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <select value={subject} onChange={e => setSubject(e.target.value)} style={inp}>
          <option>Physics</option><option>Chemistry</option><option>Biology</option><option>Maths</option>
        </select>
        <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="Topic" style={{ ...inp, flex: 1, minWidth: 160 }} />
        <button className="btn-outline" onClick={fetchQuestions} disabled={loading}>{loading ? 'Loading...' : 'Load'}</button>
      </div>

      {q && (
        <div className="glass-strong" style={{ padding: 26, borderRadius: 16 }}>
          <div style={{ fontSize: 12, color: 'var(--violet-2)', fontWeight: 700, marginBottom: 6 }}>
            Q{current + 1} of {questions.questions.length}
          </div>
          <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 18 }}>{q.question}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {q.options.map((opt, i) => {
              const picked = answers[q.id] === i;
              const show = answered;
              const isCorr = i === q.correct;
              return (
                <button key={i} onClick={() => !answered && setAnswers({ ...answers, [q.id]: i })} style={{
                  padding: '12px 16px', borderRadius: 10, textAlign: 'left',
                  background: show && isCorr ? 'rgba(16,185,129,0.2)' : picked ? 'rgba(239,68,68,0.15)' : 'var(--surface)',
                  border: `1px solid ${show && isCorr ? 'var(--green)' : picked ? '#EF4444' : 'var(--border)'}`,
                  color: 'var(--text)',
                }}>{opt} {show && isCorr && ' ✓'}</button>
              );
            })}
          </div>
          {answered && (
            <>
              <div style={{ marginTop: 14, padding: 14, borderRadius: 10, background: 'rgba(139,92,246,0.08)', fontSize: 14 }}>
                💡 {q.explanation}
              </div>
              <DeepExplain q={q} userAnswer={answers[q.id]} />
              <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ color: correct ? 'var(--green)' : '#EF4444', fontWeight: 700 }}>{correct ? '✓ Correct!' : '✗ Review this concept'}</div>
                <button className="btn-primary" onClick={() => setCurrent(c => c + 1)} disabled={current >= questions.questions.length - 1}>
                  Next →
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
const inp = { padding: 10, borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' };
