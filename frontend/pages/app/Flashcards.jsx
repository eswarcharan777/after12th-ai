import React, { useState, useEffect, useMemo } from 'react';
import { questionBank } from '../../data/questions';
import Reveal from '../../components/Reveal';

export default function Flashcards() {
  const user = JSON.parse(localStorage.getItem('after12th_user') || '{}');
  const defaultExam = user.exam === 'JEE' ? 'JEE' : 'NEET';

  const [exam, setExam] = useState(defaultExam);
  const [subject, setSubject] = useState('ALL');
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const [review, setReview] = useState(0);
  const [finished, setFinished] = useState(false);

  const subjects = useMemo(() => [...new Set(questionBank[exam].map(q => q.subject))], [exam]);

  const startSession = (count = 10) => {
    const pool = questionBank[exam].filter(q => subject === 'ALL' || q.subject === subject);
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, count);
    setCards(shuffled);
    setIndex(0);
    setFlipped(false);
    setKnown(0);
    setReview(0);
    setFinished(false);
  };

  useEffect(() => { startSession(10); /* eslint-disable-next-line */ }, []);

  const card = cards[index];
  const progressPct = cards.length ? ((index) / cards.length) * 100 : 0;

  const mark = (action) => {
    if (action === 'know') setKnown(k => k + 1);
    else setReview(r => r + 1);
    if (index < cards.length - 1) {
      setIndex(i => i + 1);
      setFlipped(false);
    } else {
      setFinished(true);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (finished) return;
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setFlipped(f => !f); }
      if (e.key === 'ArrowRight' && flipped) mark('know');
      if (e.key === 'ArrowLeft' && flipped) mark('review');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [flipped, index, finished]);

  if (finished) {
    const accuracy = cards.length ? Math.round((known / cards.length) * 100) : 0;
    return (
      <div className="page-enter" style={{ maxWidth: 620, margin: '0 auto' }}>
        <Reveal variant="scale">
          <div className="glass-strong pulse-glow" style={{ padding: 40, borderRadius: 20, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'var(--aurora-soft)', opacity: 0.4 }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 56, marginBottom: 12 }}>🎉</div>
              <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 26, marginBottom: 8, color: 'var(--text)' }}>Session Complete!</h2>
              <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 56, background: 'var(--aurora)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1, marginBottom: 10 }}>
                {accuracy}%
              </div>
              <p style={{ color: 'var(--text-dim)', marginBottom: 24 }}>You knew {known} out of {cards.length} cards</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
                <div className="glass" style={{ padding: 16, borderRadius: 12 }}>
                  <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 28, color: 'var(--green)' }}>{known}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: 1 }}>✅ Known</div>
                </div>
                <div className="glass" style={{ padding: 16, borderRadius: 12 }}>
                  <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 28, color: 'var(--gold)' }}>{review}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: 1 }}>🔄 To Review</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => startSession(10)} className="btn-primary" style={{ padding: '12px 28px' }}>Another Round →</button>
                <button onClick={() => startSession(20)} className="btn-outline" style={{ padding: '12px 24px' }}>20 Cards Round</button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    );
  }

  if (!card) return <div style={{ color: 'var(--text-dim)' }}>Loading...</div>;

  const inputStyle = { padding: '11px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 14, color: 'var(--text)' };

  return (
    <div className="page-enter" style={{ maxWidth: 720, margin: '0 auto' }}>
      <Reveal variant="up">
        <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 28, color: 'var(--text)', marginBottom: 6 }}>📚 Flashcards</h2>
        <p style={{ color: 'var(--text-dim)', marginBottom: 18 }}>Quick revision with spaced flashcards. Use <kbd style={kbd}>Space</kbd> to flip, <kbd style={kbd}>←</kbd>/<kbd style={kbd}>→</kbd> to rate.</p>
      </Reveal>

      {/* Filters */}
      <Reveal variant="up" delay={50}>
        <div className="glass" style={{ padding: 16, marginBottom: 18, borderRadius: 14, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <select value={exam} onChange={e => { setExam(e.target.value); setSubject('ALL'); }} style={inputStyle}>
            <option value="NEET" style={{ background: '#0F1530' }}>NEET</option>
            <option value="JEE" style={{ background: '#0F1530' }}>JEE</option>
          </select>
          <select value={subject} onChange={e => setSubject(e.target.value)} style={inputStyle}>
            <option value="ALL" style={{ background: '#0F1530' }}>All Subjects</option>
            {subjects.map(s => <option key={s} value={s} style={{ background: '#0F1530' }}>{s}</option>)}
          </select>
          <button onClick={() => startSession(10)} className="btn-outline" style={{ padding: '10px 18px' }}>↻ New Round</button>
          <div style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--text-dim)' }}>
            Card {index + 1} of {cards.length}
          </div>
        </div>
      </Reveal>

      {/* Progress bar */}
      <div style={{ height: 4, background: 'var(--surface)', borderRadius: 2, marginBottom: 20, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${progressPct}%`, background: 'var(--aurora)', transition: 'width 0.4s', boxShadow: '0 0 12px rgba(139,92,246,0.6)' }} />
      </div>

      {/* Flashcard */}
      <div onClick={() => setFlipped(f => !f)} style={{
        perspective: 1200, height: 360, marginBottom: 24, cursor: 'pointer',
      }}>
        <div style={{
          position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d',
          transition: 'transform 0.6s cubic-bezier(.22,1,.36,1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
        }}>
          {/* Front */}
          <div className="glass-strong" style={{
            position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
            borderRadius: 20, padding: 32, display: 'flex', flexDirection: 'column',
            justifyContent: 'center', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -30, right: -30, width: 130, height: 130, borderRadius: '50%', background: 'var(--violet)', filter: 'blur(60px)', opacity: 0.25 }} />
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                <span className="badge badge-violet">{card.subject}</span>
                <span className="badge" style={{ color: 'var(--text-dim)' }}>{card.chapter}</span>
                <span className="badge" style={{ color: 'var(--text-dim)' }}>{card.difficulty}</span>
              </div>
              <p style={{ fontSize: 19, color: 'var(--text)', lineHeight: 1.6, fontWeight: 500 }}>{card.question}</p>
              <div style={{ marginTop: 20, fontSize: 12, color: 'var(--text-faint)', letterSpacing: 1, textTransform: 'uppercase' }}>
                💡 Tap card or press Space to reveal answer
              </div>
            </div>
          </div>
          {/* Back */}
          <div className="glass-strong" style={{
            position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
            borderRadius: 20, padding: 32,
            transform: 'rotateY(180deg)',
            display: 'flex', flexDirection: 'column', overflow: 'auto',
          }}>
            <div style={{ position: 'absolute', top: -30, left: -30, width: 130, height: 130, borderRadius: '50%', background: 'var(--cyan)', filter: 'blur(60px)', opacity: 0.25 }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 11, color: 'var(--green)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>✅ Correct Answer</div>
              <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 20, color: 'var(--text)', marginBottom: 18, padding: '12px 16px', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.35)', borderRadius: 12 }}>
                ({['A','B','C','D'][card.correct]}) {card.options[card.correct]}
              </div>
              <div style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>💡 Explanation</div>
              <p style={{ fontSize: 14, color: 'var(--text-mid)', lineHeight: 1.7 }}>{card.explanation}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      {flipped ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <button onClick={() => mark('review')} style={{
            padding: '16px', borderRadius: 14, fontFamily: 'Sora', fontWeight: 700, fontSize: 15, cursor: 'pointer',
            background: 'rgba(245,166,35,0.15)', color: 'var(--gold)', border: '1px solid rgba(245,166,35,0.4)',
          }}>🔄 Review Later <span style={{ opacity: 0.6, fontSize: 12 }}>(←)</span></button>
          <button onClick={() => mark('know')} style={{
            padding: '16px', borderRadius: 14, fontFamily: 'Sora', fontWeight: 700, fontSize: 15, cursor: 'pointer',
            background: 'linear-gradient(135deg, #10B981, #06B6D4)', color: 'white', border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 6px 20px rgba(16,185,129,0.35)',
          }}>✅ I Knew It <span style={{ opacity: 0.7, fontSize: 12 }}>(→)</span></button>
        </div>
      ) : (
        <button onClick={() => setFlipped(true)} className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: 16, justifyContent: 'center' }}>
          Reveal Answer →
        </button>
      )}
    </div>
  );
}

const kbd = {
  display: 'inline-block', padding: '1px 8px', borderRadius: 6,
  background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border)',
  fontSize: 11, color: 'var(--text-mid)', fontFamily: 'monospace',
  margin: '0 2px',
};
