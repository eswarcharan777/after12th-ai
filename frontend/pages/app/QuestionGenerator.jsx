import React, { useState } from 'react';

export default function QuestionGenerator() {
  const [subject, setSubject] = useState('Physics');
  const [topic, setTopic] = useState('Kinematics');
  const [count, setCount] = useState(5);
  const [difficulty, setDifficulty] = useState('medium');
  const [exam, setExam] = useState('NEET');
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true); setQuestions(null); setAnswers({}); setShowAll(false);
    const prompt = `Generate ${count} ${difficulty}-difficulty ${exam} MCQ questions on ${subject} — topic: ${topic}.`;
    try {
      const r = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'qgen', messages: [{ role: 'user', content: prompt }] })
      });
      const j = await r.json();
      const parsed = JSON.parse(j.reply);
      setQuestions(parsed);
      window.__a12Toast && window.__a12Toast(`${parsed.questions.length} questions ready!`, 'success');
    } catch (e) {
      window.__a12Toast && window.__a12Toast('Generation failed — try again', 'error');
    } finally { setLoading(false); }
  };

  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🧪 AI Question Generator</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 24 }}>Build your own custom mock test on any topic.</p>

      <div className="glass" style={{ padding: 24, borderRadius: 16, marginBottom: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
        <label>Exam
          <select value={exam} onChange={(e) => setExam(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}>
            <option>NEET</option><option>JEE</option>
          </select>
        </label>
        <label>Subject
          <select value={subject} onChange={(e) => setSubject(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}>
            <option>Physics</option><option>Chemistry</option><option>Biology</option><option>Maths</option>
          </select>
        </label>
        <label>Topic
          <input value={topic} onChange={(e) => setTopic(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }} />
        </label>
        <label>Count
          <input type="number" min="1" max="20" value={count} onChange={(e) => setCount(+e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }} />
        </label>
        <label>Difficulty
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}>
            <option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option>
          </select>
        </label>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <button className="btn-primary" onClick={generate} disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Generating...' : '✨ Generate'}
          </button>
        </div>
      </div>

      {questions && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontFamily: 'Sora', fontWeight: 700 }}>{questions.title}</h3>
            <button className="btn-outline" onClick={() => setShowAll(!showAll)}>
              {showAll ? 'Hide answers' : 'Reveal all answers'}
            </button>
          </div>
          {questions.questions.map((q) => (
            <div key={q.id} className="glass" style={{ padding: 20, borderRadius: 14, marginBottom: 14 }}>
              <div style={{ color: 'var(--violet-2)', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Q{q.id} · {q.subject}</div>
              <div style={{ fontWeight: 600, marginBottom: 12 }}>{q.question}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {q.options.map((opt, i) => {
                  const picked = answers[q.id] === i;
                  const isCorrect = i === q.correct;
                  const show = showAll || picked;
                  return (
                    <button key={i} onClick={() => setAnswers({ ...answers, [q.id]: i })}
                      style={{
                        padding: '10px 14px', borderRadius: 10, textAlign: 'left',
                        background: show && isCorrect ? 'rgba(16,185,129,0.15)' : picked ? 'rgba(239,68,68,0.15)' : 'var(--surface)',
                        border: `1px solid ${show && isCorrect ? 'var(--green)' : picked ? '#EF4444' : 'var(--border)'}`,
                        color: 'var(--text)',
                      }}>
                      {opt} {show && isCorrect && ' ✓'}
                    </button>
                  );
                })}
              </div>
              {(showAll || answers[q.id] !== undefined) && (
                <div style={{ marginTop: 12, padding: 12, borderRadius: 8, background: 'rgba(139,92,246,0.08)', fontSize: 14, color: 'var(--text-mid)' }}>
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
