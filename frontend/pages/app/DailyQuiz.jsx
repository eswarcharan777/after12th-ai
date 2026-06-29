import React, { useState, useEffect, useMemo } from 'react';
import { questionBank } from '../../data/questions';
import Reveal from '../../components/Reveal';

const STORAGE = {
  lastDate: 'after12th_quiz_lastdate',
  todayResult: 'after12th_quiz_today',
  history: 'after12th_quiz_history',
};

// Deterministic daily pick: same 5 questions for everyone on the same day
function dailySeed() {
  const d = new Date();
  return d.getFullYear() * 1000 + d.getMonth() * 50 + d.getDate();
}
function pickDaily(pool, n, seed) {
  const shuffled = [...pool].map((q, i) => ({ q, k: (seed * (i + 13)) % 9999 }))
    .sort((a, b) => a.k - b.k).map(x => x.q);
  return shuffled.slice(0, n);
}

export default function DailyQuiz() {
  const user = JSON.parse(localStorage.getItem('after12th_user') || '{}');
  const exam = user.exam === 'JEE' ? 'JEE' : 'NEET';
  const today = new Date().toDateString();

  const questions = useMemo(() => pickDaily(questionBank[exam], 5, dailySeed()), [exam]);

  const alreadyDone = localStorage.getItem(STORAGE.lastDate) === today;
  const savedResult = alreadyDone ? JSON.parse(localStorage.getItem(STORAGE.todayResult) || 'null') : null;

  const [phase, setPhase] = useState(alreadyDone ? 'done' : 'quiz');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(savedResult);

  const finish = () => {
    let correct = 0;
    questions.forEach(q => { if (answers[q.id] === q.correct) correct++; });
    const r = { correct, total: questions.length, date: today, exam };
    setResult(r);
    setPhase('done');
    localStorage.setItem(STORAGE.lastDate, today);
    localStorage.setItem(STORAGE.todayResult, JSON.stringify(r));
    const hist = JSON.parse(localStorage.getItem(STORAGE.history) || '[]');
    hist.push(r);
    localStorage.setItem(STORAGE.history, JSON.stringify(hist.slice(-30)));
  };

  if (phase === 'done' && result) {
    const pct = Math.round((result.correct / result.total) * 100);
    return (
      <div className="page-enter" style={{ maxWidth: 620, margin: '0 auto' }}>
        <Reveal variant="scale">
          <div className="glass-strong pulse-glow" style={{ padding: 36, borderRadius: 20, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'var(--aurora-soft)', opacity: 0.4 }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 56, marginBottom: 12 }}>{pct >= 80 ? '🏆' : pct >= 60 ? '🎯' : '💪'}</div>
              <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 24, marginBottom: 6, color: 'var(--text)' }}>Today's Quiz Complete!</h2>
              <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 64, background: 'var(--aurora)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1, marginBottom: 8 }}>
                {result.correct}/{result.total}
              </div>
              <p style={{ color: 'var(--text-dim)', marginBottom: 24 }}>{pct >= 80 ? 'Excellent! Top form.' : pct >= 60 ? 'Solid effort. Keep going!' : 'Tomorrow brings new chances.'}</p>
              <div style={{ fontSize: 13, color: 'var(--text-faint)', padding: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 12 }}>
                ⏰ Come back tomorrow for 5 fresh questions!<br/>Daily quiz refreshes at midnight.
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    );
  }

  const q = questions[current];
  const allAnswered = questions.every(qq => answers[qq.id] !== undefined);

  return (
    <div className="page-enter" style={{ maxWidth: 720, margin: '0 auto' }}>
      <Reveal variant="up">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 26, color: 'var(--text)', margin: 0 }}>🎲 Daily Quiz</h2>
          <span className="badge badge-violet">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}</span>
        </div>
        <p style={{ color: 'var(--text-dim)', marginBottom: 18 }}>5 fresh questions every day. Same questions for all students — compare with friends!</p>
      </Reveal>

      <div style={{ height: 5, background: 'var(--surface)', borderRadius: 3, marginBottom: 18, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${((current + 1) / questions.length) * 100}%`, background: 'var(--aurora)', boxShadow: '0 0 12px rgba(139,92,246,0.6)', transition: 'width 0.4s' }} />
      </div>

      <Reveal variant="scale" key={current}>
        <div className="glass" style={{ padding: 28, borderRadius: 18, marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            <span className="badge badge-violet">Q.{current + 1} of {questions.length}</span>
            <span className="badge badge-green">{q.subject}</span>
            <span className="badge" style={{ color: 'var(--text-dim)' }}>{q.chapter}</span>
          </div>
          <p style={{ fontSize: 17, color: 'var(--text)', lineHeight: 1.7, marginBottom: 22, fontWeight: 500 }}>{q.question}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {q.options.map((opt, i) => {
              const chosen = answers[q.id] === i;
              return (
                <button key={i} onClick={() => setAnswers(p => ({ ...p, [q.id]: i }))} style={{
                  padding: '14px 18px', borderRadius: 12, textAlign: 'left',
                  border: `1px solid ${chosen ? 'var(--violet)' : 'var(--border)'}`,
                  background: chosen ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.03)',
                  color: 'var(--text)', fontSize: 14, cursor: 'pointer', transition: 'all 0.2s',
                  fontFamily: 'inherit', boxShadow: chosen ? '0 4px 16px rgba(139,92,246,0.25)' : 'none',
                }}>
                  <span style={{ fontWeight: 700, color: chosen ? 'var(--violet-2)' : 'var(--text-dim)', marginRight: 10 }}>({['A','B','C','D'][i]})</span>{opt}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0} className="btn-outline" style={{ flex: 1, justifyContent: 'center', padding: '12px', opacity: current === 0 ? 0.4 : 1 }}>← Previous</button>
        {current < questions.length - 1 ? (
          <button onClick={() => setCurrent(c => c + 1)} className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '12px' }}>Next →</button>
        ) : (
          <button onClick={finish} disabled={!allAnswered} className={allAnswered ? 'btn-primary' : ''} style={!allAnswered ? { flex: 1, padding: '12px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-faint)', border: '1px solid var(--border)', borderRadius: 12, fontFamily: 'Sora', fontWeight: 700, cursor: 'not-allowed' } : { flex: 1, justifyContent: 'center', padding: '12px' }}>Submit ✓</button>
        )}
      </div>
    </div>
  );
}
