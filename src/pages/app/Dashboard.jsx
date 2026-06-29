import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadUserData, getLocalScores } from '../../userdata';
import Reveal from '../../components/Reveal';
import AnimatedNumber from '../../components/AnimatedNumber';
import ExamCountdown from '../../components/ExamCountdown';
import Achievements from '../../components/Achievements';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('after12th_user') || '{}');
  const [scores, setScores] = useState(getLocalScores());

  useEffect(() => {
    loadUserData().then(d => { if (d.scores) setScores(d.scores); }).catch(() => {});
  }, []);
  const lastScore = scores[scores.length - 1];

  const stats = [
    { label: 'Study Streak', value: 7, suffix: ' 🔥', color: '#EC4899', icon: '🔥' },
    { label: 'Mock Tests Done', value: scores.length || 0, color: '#8B5CF6', icon: '📝' },
    { label: 'Last Score', value: lastScore?.score ?? 0, divider: lastScore?.total, color: '#10B981', icon: '📊' },
    { label: 'Questions Solved', value: (scores.length * 20) || 0, color: '#06B6D4', icon: '✅' },
  ];

  const quickLinks = [
    { to: '/app/tutor', icon: '🤖', label: 'Ask AI Tutor', desc: 'Clear any doubt instantly', color: '#8B5CF6' },
    { to: '/app/mocktest', icon: '📝', label: 'Take Mock Test', desc: 'Practice NTA-pattern questions', color: '#EC4899' },
    { to: '/app/flashcards', icon: '📚', label: 'Flashcards', desc: 'Quick revision card flips', color: '#F5A623' },
    { to: '/app/pomodoro', icon: '🍅', label: 'Focus Timer', desc: '25 min deep work sessions', color: '#EF4444' },
    { to: '/app/rank', icon: '📈', label: 'Predict My Rank', desc: 'Know where you stand', color: '#10B981' },
    { to: '/app/colleges', icon: '🏫', label: 'Find Colleges', desc: 'Shortlist best colleges', color: '#06B6D4' },
    { to: '/app/branch', icon: '🧭', label: 'Branch Guide', desc: 'CSE vs MBBS — get AI advice', color: '#F472B6' },
    { to: '/app/planner', icon: '📅', label: 'Study Planner', desc: 'Get a personalised timetable', color: '#A78BFA' },
  ];

  const tips = [
    '📚 Revise NCERT before bed — spaced repetition improves retention by 40%.',
    '⏱ Take a 10-minute break every hour while studying.',
    '🧬 Biology NCERT diagrams are high-yield — draw them 3 times each.',
    '📐 Solve at least 10 Maths problems daily to build speed.',
    '🔁 Review all wrong answers from your last mock test today.',
  ];

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="page-enter">
      {/* Welcome Banner — glassmorphic + aurora glow */}
      <Reveal variant="up">
        <div className="glass-strong pulse-glow" style={{
          padding: '32px', marginBottom: 28, position: 'relative',
          overflow: 'hidden', borderRadius: 20,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'var(--aurora-soft)', opacity: 0.4, pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ color: 'var(--text-dim)', fontSize: 13, marginBottom: 6, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>{today}</div>
            <h2 style={{ fontFamily: 'Sora', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, marginBottom: 8 }}>
              Good morning, <span className="shimmer-text">{user.name?.split(' ')[0]}</span>! 👋
            </h2>
            <p style={{ color: 'var(--text-mid)', fontSize: 15 }}>
              {user.exam || 'NEET'} aspirant · Keep the momentum going today 💪
            </p>
          </div>
          <Link to="/app/tutor" className="btn-primary" style={{ position: 'relative', zIndex: 1, padding: '13px 26px' }}>
            Ask AI Tutor →
          </Link>
        </div>
      </Reveal>

      {/* Exam Countdown */}
      <Reveal variant="up">
        <ExamCountdown exam={user.exam || 'NEET'} />
      </Reveal>

      {/* Stats — animated numbers + glass */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 18, marginBottom: 32 }}>
        {stats.map((s, i) => (
          <Reveal key={s.label} variant="up" delay={i * 90}>
            <div className="glass" style={{
              padding: '22px',
              borderRadius: 16,
              position: 'relative', overflow: 'hidden',
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = s.color; e.currentTarget.style.boxShadow = `0 12px 30px ${s.color}33`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: s.color, filter: 'blur(40px)', opacity: 0.25 }} />
              <div style={{ fontSize: 28, marginBottom: 10, position: 'relative' }}>{s.icon}</div>
              <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 26, color: s.color, lineHeight: 1, position: 'relative' }}>
                <AnimatedNumber value={s.value} suffix={s.suffix || ''} />
                {s.divider !== undefined && <span style={{ color: 'var(--text-dim)', fontSize: 16, fontWeight: 600 }}> / {s.divider}</span>}
              </div>
              <div style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 8, fontWeight: 500 }}>{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Quick Access */}
      <Reveal variant="up">
        <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 4, height: 22, background: 'var(--aurora)', borderRadius: 2, boxShadow: 'var(--glow-violet)' }} />
          Quick Access
        </h3>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, marginBottom: 32 }}>
        {quickLinks.map((l, i) => (
          <Reveal key={l.to} variant="up" delay={i * 80}>
            <Link to={l.to} className="glass" style={{
              padding: '20px 22px',
              display: 'flex', alignItems: 'center', gap: 16,
              textDecoration: 'none', transition: 'all 0.25s',
              borderRadius: 14,
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = l.color; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 30px ${l.color}33`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{
                width: 50, height: 50, borderRadius: 12,
                background: `linear-gradient(135deg, ${l.color}33 0%, ${l.color}11 100%)`,
                border: `1px solid ${l.color}55`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, flexShrink: 0,
                boxShadow: `0 6px 20px ${l.color}33`,
              }}>{l.icon}</div>
              <div>
                <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{l.label}</div>
                <div style={{ color: 'var(--text-dim)', fontSize: 12, marginTop: 2 }}>{l.desc}</div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* Achievements */}
      <Reveal variant="up">
        <div className="glass" style={{ padding: 26, marginBottom: 24, borderRadius: 16 }}>
          <Achievements />
        </div>
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20 }}>
        {/* Recent Mock Tests */}
        <Reveal variant="left">
          <div className="glass" style={{ padding: 26, borderRadius: 16 }}>
            <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 16, color: 'var(--text)', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 4, height: 20, background: 'var(--aurora)', borderRadius: 2 }} />
              Recent Mock Tests
            </h3>
            {scores.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '28px 0' }}>
                <div style={{ fontSize: 38, marginBottom: 10 }}>📝</div>
                <div style={{ fontSize: 14, marginBottom: 10 }}>No tests taken yet.</div>
                <Link to="/app/mocktest" style={{ color: 'var(--violet-2)', fontWeight: 600, fontSize: 14 }}>Take your first test →</Link>
              </div>
            ) : (
              scores.slice(-5).reverse().map((s, i) => (
                <Reveal key={i} variant="up" delay={i * 70}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>Mock Test #{scores.length - i}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 2 }}>{s.exam} · {new Date(s.date).toLocaleDateString()}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 17, color: s.score >= s.total * 0.6 ? 'var(--green)' : 'var(--pink)' }}>{s.score}/{s.total}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{Math.round(s.score / s.total * 100)}%</div>
                    </div>
                  </div>
                </Reveal>
              ))
            )}
          </div>
        </Reveal>

        {/* Daily Tips */}
        <Reveal variant="right">
          <div className="glass-strong" style={{ padding: 26, borderRadius: 16, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'var(--violet)', filter: 'blur(60px)', opacity: 0.25 }} />
            <div style={{ position: 'absolute', bottom: -30, left: -30, width: 140, height: 140, borderRadius: '50%', background: 'var(--cyan)', filter: 'blur(60px)', opacity: 0.2 }} />

            <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 16, marginBottom: 18, color: 'var(--violet-2)', display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>
              💡 Today's Study Tips
            </h3>
            <div style={{ position: 'relative' }}>
              {tips.map((tip, i) => (
                <Reveal key={i} variant="up" delay={i * 80}>
                  <div style={{ fontSize: 13, color: 'var(--text-mid)', padding: '10px 0', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{tip}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
