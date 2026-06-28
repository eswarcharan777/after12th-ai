import React, { useState } from 'react';
import Reveal from '../../components/Reveal';
import AnimatedNumber from '../../components/AnimatedNumber';

const questions = [
  { q: 'What subject excites you the most?', opts: ['Physics & Engineering', 'Biology & Life Sciences', 'Mathematics & Logic', 'Chemistry & Research', 'All equally'] },
  { q: 'What type of work do you prefer?', opts: ['Building software & apps', 'Helping people with health', 'Designing machines & systems', 'Research & discovery', 'Teaching & communication'] },
  { q: 'Which career goal appeals most to you?', opts: ['High-paying tech job (Google, Amazon)', 'Doctor and saving lives (MBBS)', 'Engineer at ISRO / DRDO / L&T', 'Researcher / Scientist', 'Entrepreneur / Own business'] },
  { q: 'How do you feel about studying for 5+ years?', opts: ['Fine, if it leads to great career', 'Yes, especially for MBBS (5.5 yrs)', 'Prefer 4-year BTech', 'Open to any duration', 'Prefer shorter courses'] },
  { q: 'Which environment do you prefer working in?', opts: ['Office / IT company', 'Hospital / Clinic', 'Factory / Manufacturing plant', 'Lab / Research institute', 'Outdoors / Field work'] },
];

export default function BranchGuide() {
  const [phase, setPhase] = useState('quiz');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const select = async (opt) => {
    const updated = [...answers, opt];
    setAnswers(updated);
    if (current < questions.length - 1) { setCurrent(c => c + 1); return; }
    setLoading(true);
    try {
      const prompt = `Student quiz answers:\n${questions.map((q, i) => `Q${i + 1}: ${q.q}\nAnswer: ${updated[i]}`).join('\n\n')}\n\nBased on these answers, recommend the best branch/career for this student.`;
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode: 'branch', messages: [{ role: 'user', content: prompt }] }) });
      const data = await res.json();
      try { setResult(JSON.parse(data.reply)); }
      catch { setResult({ topBranch: 'CSE', reason: data.reply, branches: [{ name: 'CSE', match: 85, scope: 'Very High', avgSalary: '12-25 LPA', description: 'Computer Science Engineering' }], careerPaths: ['Software Engineer', 'Data Scientist'], message: data.reply }); }
    } catch {
      setResult({ topBranch: 'CSE', reason: 'Based on your answers, CSE seems like a strong match.', branches: [{ name: 'CSE', match: 85, scope: 'Very High', avgSalary: '12-25 LPA', description: 'Computer Science - strong job market, high salaries.' }], careerPaths: ['Software Engineer', 'Data Scientist', 'Product Manager'], message: 'Could not connect to AI. Please check your server setup.' });
    }
    setPhase('result');
    setLoading(false);
  };

  const reset = () => { setPhase('quiz'); setCurrent(0); setAnswers([]); setResult(null); };

  const branchColors = { CSE: '#8B5CF6', ECE: '#06B6D4', Mechanical: '#F5A623', MBBS: '#EC4899', Chemical: '#10B981', Civil: '#A78BFA', 'AI & ML': '#8B5CF6', Physics: '#06B6D4' };

  if (phase === 'quiz' || loading) {
    const q = questions[current];
    return (
      <div className="page-enter" style={{ maxWidth: 660, margin: '0 auto' }}>
        <Reveal variant="up">
          <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 28, color: 'var(--text)', marginBottom: 6 }}>🧭 Branch & Career Guide</h2>
          <p style={{ color: 'var(--text-dim)', marginBottom: 24 }}>Answer 5 quick questions. Our AI will suggest the best branch for you.</p>
        </Reveal>

        {loading ? (
          <Reveal variant="scale">
            <div className="glass-strong pulse-glow" style={{ padding: 50, textAlign: 'center', borderRadius: 20, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--aurora-soft)', opacity: 0.4 }} />
              <div style={{ position: 'relative' }}>
                <div style={{ fontSize: 56, marginBottom: 18, animation: 'bounce 2s infinite' }}>🤖</div>
                <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 20, color: 'var(--text)', marginBottom: 10 }}>Analysing your answers...</div>
                <div style={{ color: 'var(--text-dim)' }}>AI is crafting your personalised branch recommendation</div>
              </div>
            </div>
          </Reveal>
        ) : (
          <Reveal variant="scale" key={current}>
            <div className="glass" style={{ padding: 32, borderRadius: 18 }}>
              {/* Progress */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
                {questions.map((_, i) => (
                  <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: i <= current ? 'var(--aurora)' : 'rgba(255,255,255,0.08)', transition: 'all 0.4s', boxShadow: i <= current ? '0 0 12px rgba(139,92,246,0.5)' : 'none' }} />
                ))}
              </div>

              <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 10, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 600 }}>Question {current + 1} of {questions.length}</div>
              <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 22, color: 'var(--text)', marginBottom: 26, lineHeight: 1.4 }}>{q.q}</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {q.opts.map((opt, i) => (
                  <button key={i} onClick={() => select(opt)} style={{
                    padding: '14px 18px', borderRadius: 12, textAlign: 'left',
                    border: '1px solid var(--border)', background: 'rgba(255,255,255,0.03)',
                    color: 'var(--text)', fontSize: 14, cursor: 'pointer', transition: 'all 0.25s',
                    fontFamily: 'inherit', animation: `fadeUp 0.4s ${i * 60}ms backwards`,
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--violet)'; e.currentTarget.style.background = 'rgba(139,92,246,0.15)'; e.currentTarget.style.transform = 'translateX(4px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(139,92,246,0.25)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        )}
        <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }`}</style>
      </div>
    );
  }

  return (
    <div className="page-enter" style={{ maxWidth: 820, margin: '0 auto' }}>
      <Reveal variant="scale">
        <div className="glass-strong pulse-glow" style={{ padding: 36, textAlign: 'center', marginBottom: 26, borderRadius: 20, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'var(--aurora-soft)', opacity: 0.5 }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 56, marginBottom: 10 }}>🎯</div>
            <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 6, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 600 }}>Your AI-recommended branch is</div>
            <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 56, background: 'var(--aurora)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: 14, lineHeight: 1 }}>
              {result.topBranch}
            </div>
            <p style={{ color: 'var(--text-mid)', fontSize: 15, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>{result.reason}</p>
          </div>
        </div>
      </Reveal>

      {result.branches?.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <Reveal variant="up">
            <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 4, height: 22, background: 'var(--aurora)', borderRadius: 2 }} />
              Branch Match Analysis
            </h3>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {result.branches.map((b, i) => {
              const col = branchColors[b.name] || '#8B5CF6';
              return (
                <Reveal key={i} variant="up" delay={i * 100}>
                  <div className="glass" style={{ padding: 22, borderRadius: 14, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: -20, right: -20, width: 90, height: 90, borderRadius: '50%', background: col, filter: 'blur(40px)', opacity: 0.2 }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, position: 'relative' }}>
                      <div>
                        <span style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 18, color: 'var(--text)' }}>{b.name}</span>
                        {i === 0 && <span className="badge badge-violet" style={{ marginLeft: 10, fontSize: 10 }}>TOP PICK</span>}
                      </div>
                      <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 24, color: col }}>
                        <AnimatedNumber value={b.match} suffix="%" />
                      </div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 6, height: 10, overflow: 'hidden', marginBottom: 12, border: '1px solid var(--border)' }}>
                      <div style={{ width: `${b.match}%`, background: `linear-gradient(90deg, ${col}, ${col}cc)`, height: '100%', borderRadius: 6, transition: 'width 1.4s cubic-bezier(.22,1,.36,1)', boxShadow: `0 0 12px ${col}88` }} />
                    </div>
                    <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>📈 Scope: <strong style={{ color: 'var(--text)' }}>{b.scope}</strong></span>
                      <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>💰 Avg Salary: <strong style={{ color: 'var(--green)' }}>{b.avgSalary}</strong></span>
                    </div>
                    {b.description && <p style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 10 }}>{b.description}</p>}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      )}

      {result.careerPaths?.length > 0 && (
        <Reveal variant="up">
          <div className="glass" style={{ padding: 26, marginBottom: 20, borderRadius: 14 }}>
            <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 16, color: 'var(--text)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 4, height: 20, background: 'var(--aurora)', borderRadius: 2 }} />
              Career Paths for You
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {result.careerPaths.map((cp, i) => (
                <span key={i} className="badge badge-violet" style={{ padding: '8px 16px', fontSize: 13, animation: `fadeUp 0.5s ${i * 80}ms backwards` }}>
                  {['🖥️', '🔬', '🏭', '🩺', '📊', '🚀'][i % 6]} {cp}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {result.message && result.topBranch && (
        <Reveal variant="up">
          <div className="glass" style={{ padding: 22, marginBottom: 22, borderRadius: 14, borderColor: 'rgba(6,182,212,0.4)' }}>
            <div style={{ fontWeight: 700, color: 'var(--cyan-2)', marginBottom: 8 }}>💬 AI Advisor says:</div>
            <p style={{ color: 'var(--text-mid)', fontSize: 14, lineHeight: 1.7 }}>{result.message}</p>
          </div>
        </Reveal>
      )}

      <div style={{ display: 'flex', gap: 14 }}>
        <button onClick={reset} className="btn-outline" style={{ flex: 1, justifyContent: 'center', padding: '14px' }}>Retake Quiz</button>
        <a href="/app/colleges" className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '14px', fontFamily: 'Sora' }}>
          Find Colleges for {result.topBranch} →
        </a>
      </div>
    </div>
  );
}
