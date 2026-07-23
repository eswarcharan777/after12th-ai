import React, { useState, useEffect, useCallback } from 'react';
import { getQuestions } from '../../data/questions';
import { appendScore, getLocalScores } from '../../userdata';
import Reveal from '../../components/Reveal';
import AnimatedNumber from '../../components/AnimatedNumber';
import { fireConfetti } from '../../components/Confetti';
import DeepExplain from '../../components/DeepExplain';

const EXAM_CONFIG = {
  NEET: { totalTime: 200 * 60, correct: 4, wrong: -1, total: 20, label: 'NEET-UG' },
  JEE:  { totalTime: 180 * 60, correct: 4, wrong: -1, total: 15, label: 'JEE Main' },
};

export default function MockTest() {
  const user = JSON.parse(localStorage.getItem('after12th_user') || '{}');
  const defaultExam = user.exam === 'JEE' ? 'JEE' : 'NEET';

  const [phase, setPhase] = useState('select');
  const [selectedExam, setSelectedExam] = useState(defaultExam);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [current, setCurrent] = useState(0);

  const cfg = EXAM_CONFIG[selectedExam];

  const startTest = () => {
    const qs = getQuestions(selectedExam, cfg.total);
    setQuestions(qs);
    setAnswers({});
    setTimeLeft(cfg.totalTime);
    setCurrent(0);
    setPhase('test');
  };

  const finishTest = useCallback(() => {
    setPhase('result');
    setTimeout(() => fireConfetti({ count: 160, duration: 2600 }), 250);
    if (typeof window !== 'undefined' && window.__a12Toast) window.__a12Toast('Test submitted! 🎯', 'success');
    if (typeof window !== 'undefined' && window.__a12AddXP) window.__a12AddXP(50 + correct * 5, 'Mock test completed');
    let correct = 0, wrong = 0;
    questions.forEach(q => {
      if (answers[q.id] !== undefined) {
        if (answers[q.id] === q.correct) correct++; else wrong++;
      }
    });
    const score = correct * cfg.correct + wrong * cfg.wrong;
    appendScore({
      exam: cfg.label, score, total: correct * cfg.correct,
      correct, wrong, unattempted: questions.length - correct - wrong,
      timeTaken: cfg.totalTime - timeLeft,
      date: new Date().toISOString(),
    });
  }, [answers, questions, cfg, timeLeft]);

  useEffect(() => {
    if (phase !== 'test') return;
    if (timeLeft <= 0) { finishTest(); return; }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, timeLeft, finishTest]);

  const formatTime = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  const select = (qid, opt) => setAnswers(p => ({ ...p, [qid]: opt }));

  // ── PHASE 1: SELECT ────────────────────────────────────────────────
  if (phase === 'select') {
    return (
      <div className="page-enter">
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <Reveal variant="up">
            <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 28, color: 'var(--text)', marginBottom: 8 }}>📝 Mock Test Engine</h2>
            <p style={{ color: 'var(--text-dim)', marginBottom: 28 }}>NTA-pattern tests with auto-scoring and performance analysis.</p>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 28 }}>
            {Object.entries(EXAM_CONFIG).map(([exam, c], i) => {
              const active = selectedExam === exam;
              return (
                <Reveal key={exam} variant={i === 0 ? 'left' : 'right'} delay={i * 100}>
                  <div onClick={() => setSelectedExam(exam)} className="glass" style={{
                    padding: 24, cursor: 'pointer', borderRadius: 16,
                    border: `1px solid ${active ? 'var(--violet)' : 'var(--border)'}`,
                    boxShadow: active ? 'var(--glow-violet)' : 'none',
                    background: active ? 'rgba(139,92,246,0.10)' : 'var(--surface)',
                    transition: 'all 0.25s',
                    position: 'relative', overflow: 'hidden',
                  }}>
                    {active && <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, borderRadius: '50%', background: 'var(--violet)', filter: 'blur(40px)', opacity: 0.4 }} />}
                    <div style={{ fontSize: 36, marginBottom: 10, position: 'relative' }}>{exam === 'NEET' ? '🩺' : '⚙️'}</div>
                    <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 19, color: 'var(--text)', marginBottom: 10, position: 'relative' }}>{c.label}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-dim)', position: 'relative' }}>{c.total} questions</div>
                    <div style={{ fontSize: 13, color: 'var(--text-dim)', position: 'relative' }}>{c.totalTime / 60} minutes</div>
                    <div style={{ fontSize: 13, color: 'var(--text-dim)', position: 'relative' }}>+{c.correct}/−{Math.abs(c.wrong)} marking</div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal variant="up" delay={150}>
            <div className="glass" style={{ padding: 22, marginBottom: 24, borderRadius: 14, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--aurora-soft)', opacity: 0.3, pointerEvents: 'none' }} />
              <div style={{ fontWeight: 800, color: 'var(--violet-2)', marginBottom: 10, fontSize: 15, letterSpacing: 1, position: 'relative' }}>📋 INSTRUCTIONS</div>
              {[
                `Test will have ${cfg.total} questions (${selectedExam === 'NEET' ? 'Physics 5, Chemistry 5, Biology 10' : 'Physics 5, Chemistry 5, Maths 5'})`,
                `Marking: Correct = +${cfg.correct}, Wrong = ${cfg.wrong}, Unattempted = 0`,
                'Timer starts immediately. Submit before time runs out.',
                'You can navigate between questions using the question panel.',
              ].map((i, idx) => (
                <div key={idx} style={{ fontSize: 13, color: 'var(--text-mid)', padding: '5px 0', position: 'relative' }}>• {i}</div>
              ))}
            </div>
          </Reveal>

          <Reveal variant="scale" delay={200}>
            <button onClick={startTest} className="btn-primary pulse-glow" style={{ width: '100%', padding: '18px', borderRadius: 14, fontSize: 17, justifyContent: 'center' }}>
              Start Mock Test →
            </button>
          </Reveal>
        </div>
      </div>
    );
  }

  // ── PHASE 2: TEST ────────────────────────────────────────────────────
  if (phase === 'test') {
    const q = questions[current];
    const progressPct = ((current + 1) / questions.length) * 100;
    return (
      <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Top bar */}
        <div className="glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 22px', marginBottom: 18, borderRadius: 14 }}>
          <div style={{ fontFamily: 'Sora', fontWeight: 700, color: 'var(--text)', fontSize: 15 }}>
            {cfg.label} <span style={{ color: 'var(--text-dim)', fontWeight: 500 }}>· Mock Test</span>
          </div>
          <div style={{
            fontFamily: 'Sora', fontWeight: 800, fontSize: 20,
            color: timeLeft < 300 ? '#FCA5A5' : 'var(--green)',
            background: timeLeft < 300 ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)',
            border: `1px solid ${timeLeft < 300 ? 'rgba(239,68,68,0.4)' : 'rgba(16,185,129,0.4)'}`,
            padding: '6px 18px', borderRadius: 10,
          }}>⏱ {formatTime(timeLeft)}</div>
          <button onClick={finishTest} style={{ background: 'linear-gradient(135deg, #EF4444, #EC4899)', color: 'white', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '9px 18px', fontWeight: 700, cursor: 'pointer', fontSize: 13, boxShadow: '0 6px 20px rgba(239,68,68,0.35)' }}>
            Submit Test
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ height: 4, background: 'var(--surface)', borderRadius: 2, marginBottom: 18, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progressPct}%`, background: 'var(--aurora)', transition: 'width 0.4s ease', boxShadow: '0 0 12px rgba(139,92,246,0.6)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: 18 }}>
          <div className="glass" style={{ padding: 30, borderRadius: 16 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
              <span className="badge badge-violet">Q.{current + 1}</span>
              <span className="badge badge-green">{q.subject}</span>
              <span className="badge" style={{ color: 'var(--text-dim)', borderColor: 'var(--border)' }}>{q.chapter}</span>
            </div>

            <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.7, marginBottom: 24, fontWeight: 500 }}>{q.question}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {q.options.map((opt, i) => {
                const chosen = answers[q.id] === i;
                return (
                  <button key={i} onClick={() => select(q.id, i)} style={{
                    padding: '14px 18px', borderRadius: 12, textAlign: 'left',
                    border: `1px solid ${chosen ? 'var(--violet)' : 'var(--border)'}`,
                    background: chosen ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.03)',
                    color: 'var(--text)', fontSize: 14, cursor: 'pointer', transition: 'all 0.2s',
                    fontFamily: 'inherit', lineHeight: 1.5,
                    boxShadow: chosen ? '0 4px 16px rgba(139,92,246,0.25)' : 'none',
                  }}>
                    <span style={{ fontWeight: 700, color: chosen ? 'var(--violet-2)' : 'var(--text-dim)', marginRight: 10 }}>
                      ({['A','B','C','D'][i]})
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 22 }}>
              <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0} className="btn-outline" style={{ flex: 1, justifyContent: 'center', opacity: current === 0 ? 0.5 : 1 }}>
                ← Previous
              </button>
              {current < questions.length - 1 ? (
                <button onClick={() => setCurrent(c => c + 1)} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  Next →
                </button>
              ) : (
                <button onClick={finishTest} style={{ flex: 1, justifyContent: 'center', background: 'linear-gradient(135deg, #10B981, #06B6D4)', color: 'white', border: '1px solid rgba(255,255,255,0.15)', padding: '12px', borderRadius: 12, fontFamily: 'Sora', fontWeight: 700, cursor: 'pointer', boxShadow: '0 6px 20px rgba(16,185,129,0.35)' }}>
                  Submit ✓
                </button>
              )}
            </div>
          </div>

          {/* Question grid */}
          <div className="glass" style={{ padding: 20, borderRadius: 16, alignSelf: 'flex-start' }}>
            <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 14, marginBottom: 14, color: 'var(--text)' }}>Questions</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
              {questions.map((qq, i) => {
                const isCurrent = i === current;
                const isAnswered = answers[qq.id] !== undefined;
                return (
                  <button key={i} onClick={() => setCurrent(i)} style={{
                    width: 38, height: 38, borderRadius: 8,
                    border: `1px solid ${isCurrent ? 'var(--violet)' : isAnswered ? 'var(--green)' : 'var(--border)'}`,
                    background: isCurrent ? 'rgba(139,92,246,0.2)' : isAnswered ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.03)',
                    color: isCurrent ? 'var(--violet-2)' : isAnswered ? 'var(--green)' : 'var(--text-dim)',
                    fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                    boxShadow: isCurrent ? 'var(--glow-violet)' : 'none',
                  }}>{i + 1}</button>
                );
              })}
            </div>
            <div style={{ marginTop: 18, fontSize: 12, color: 'var(--text-dim)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: 'rgba(16,185,129,0.15)', border: '1px solid var(--green)' }} /> Answered ({Object.keys(answers).length})
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }} /> Not Answered ({questions.length - Object.keys(answers).length})
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── PHASE 3: RESULTS ────────────────────────────────────────────────
  const scores = getLocalScores();
  const lastResult = scores[scores.length - 1] || {};
  const accuracy = lastResult.correct + lastResult.wrong > 0 ? Math.round(lastResult.correct / (lastResult.correct + lastResult.wrong) * 100) : 0;

  const subjectBreakdown = {};
  questions.forEach(q => {
    if (!subjectBreakdown[q.subject]) subjectBreakdown[q.subject] = { correct: 0, wrong: 0, unattempted: 0 };
    if (answers[q.id] === undefined) subjectBreakdown[q.subject].unattempted++;
    else if (answers[q.id] === q.correct) subjectBreakdown[q.subject].correct++;
    else subjectBreakdown[q.subject].wrong++;
  });

  return (
    <div className="page-enter" style={{ maxWidth: 820, margin: '0 auto' }}>
      <Reveal variant="scale">
        <div className="glass-strong pulse-glow" style={{ padding: 36, textAlign: 'center', marginBottom: 24, borderRadius: 20, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'var(--aurora-soft)', opacity: 0.5, pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 56, marginBottom: 10 }}>🎯</div>
            <h2 style={{ fontFamily: 'Sora', fontSize: 30, fontWeight: 800, marginBottom: 10, color: 'var(--text)' }}>Test Completed!</h2>
            <div style={{ fontFamily: 'Sora', fontSize: 64, fontWeight: 800, background: 'var(--aurora)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: 8, lineHeight: 1 }}>
              <AnimatedNumber value={lastResult.score || 0} />
            </div>
            <div style={{ color: 'var(--text-dim)', fontSize: 15 }}>Score out of {lastResult.total} possible marks</div>
          </div>
        </div>
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14, marginBottom: 24 }}>
        {[
          ['✅', lastResult.correct || 0, 'Correct', '#10B981'],
          ['❌', lastResult.wrong || 0, 'Wrong', '#EC4899'],
          ['—', lastResult.unattempted || 0, 'Unattempted', '#F5A623'],
          ['🎯', accuracy, 'Accuracy', '#06B6D4'],
        ].map(([icon, val, label, color], i) => (
          <Reveal key={label} variant="up" delay={i * 80}>
            <div className="glass" style={{ padding: 18, textAlign: 'center', borderRadius: 14, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -20, right: -20, width: 70, height: 70, borderRadius: '50%', background: color, filter: 'blur(35px)', opacity: 0.3 }} />
              <div style={{ fontSize: 26, marginBottom: 6, position: 'relative' }}>{icon}</div>
              <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 22, color, position: 'relative' }}>
                <AnimatedNumber value={typeof val === 'number' ? val : parseFloat(val) || 0} suffix={label === 'Accuracy' ? '%' : ''} />
              </div>
              <div style={{ color: 'var(--text-dim)', fontSize: 12, position: 'relative' }}>{label}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal variant="up">
        <div className="glass" style={{ padding: 26, marginBottom: 20, borderRadius: 16 }}>
          <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 16, marginBottom: 18, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 4, height: 20, background: 'var(--aurora)', borderRadius: 2 }} />
            Subject-wise Performance
          </h3>
          {Object.entries(subjectBreakdown).map(([sub, data]) => {
            const pct = data.correct + data.wrong > 0 ? Math.round(data.correct / (data.correct + data.wrong) * 100) : 0;
            const barColor = pct >= 70 ? '#10B981' : pct >= 40 ? '#F5A623' : '#EC4899';
            return (
              <div key={sub} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{sub}</span>
                  <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>{data.correct} correct · {data.wrong} wrong</span>
                </div>
                <div style={{ background: 'var(--surface)', borderRadius: 6, height: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <div style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${barColor}, ${barColor}cc)`, height: '100%', transition: 'width 1.4s cubic-bezier(.22,1,.36,1)', boxShadow: `0 0 12px ${barColor}88` }} />
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>

      <Reveal variant="up">
        <div className="glass" style={{ padding: 26, marginBottom: 20, borderRadius: 16 }}>
          <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 16, marginBottom: 18, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 4, height: 20, background: 'var(--aurora)', borderRadius: 2 }} />
            Answers & Explanations
          </h3>
          {questions.map((q, i) => {
            const userAns = answers[q.id];
            const correct = userAns === q.correct;
            const attempted = userAns !== undefined;
            return (
              <div key={q.id} style={{ padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 6 }}>
                  <span style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 13, minWidth: 30, color: 'var(--text-dim)' }}>Q{i + 1}</span>
                  <span style={{ fontSize: 14, color: 'var(--text-mid)', flex: 1 }}>{q.question}</span>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{!attempted ? '—' : correct ? '✅' : '❌'}</span>
                </div>
                {attempted && !correct && (
                  <div style={{ marginLeft: 40, fontSize: 13, color: 'var(--text-dim)', background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '10px 14px', border: '1px solid var(--border)' }}>
                    <span style={{ color: '#FCA5A5' }}>Your answer: {q.options[userAns]}</span><br />
                    <span style={{ color: '#86EFAC' }}>Correct: {q.options[q.correct]}</span><br />
                    <span style={{ color: 'var(--text-mid)' }}>💡 {q.explanation}</span>
                    <DeepExplain q={q} userAnswer={userAns} />
                  </div>
                )}
                {attempted && correct && (q.videoUrl || q.diagramUrl) && (
                  <div style={{ marginLeft: 40 }}>
                    <DeepExplain q={q} userAnswer={userAns} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Reveal>

      <div style={{ display: 'flex', gap: 14 }}>
        <button onClick={() => setPhase('select')} className="btn-outline" style={{ flex: 1, justifyContent: 'center', padding: '14px' }}>
          Take Another Test
        </button>
        <button onClick={() => window.location.href = '/app/rank'} className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '14px' }}>
          Predict My Rank →
        </button>
      </div>
    </div>
  );
}
