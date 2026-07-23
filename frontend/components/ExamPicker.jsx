import React, { useEffect, useState } from 'react';

const ASKED_KEY = 'after12th_exam_asked_this_session';

export default function ExamPicker() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem('after12th_user');
    if (!raw) return;
    let u; try { u = JSON.parse(raw); } catch { return; }
    setUser(u);
    // Show once per browser session after login
    if (!sessionStorage.getItem(ASKED_KEY)) {
      setOpen(true);
    }
  }, []);

  const pick = (exam) => {
    if (user) {
      const next = { ...user, exam };
      localStorage.setItem('after12th_user', JSON.stringify(next));
    }
    sessionStorage.setItem(ASKED_KEY, '1');
    setOpen(false);
    // Nudge components that read user.exam to refresh
    if (typeof window !== 'undefined' && window.__a12Toast) {
      window.__a12Toast(`Target set: ${exam === 'NEET' ? 'NEET-UG' : 'JEE Main & Advanced'} 🎯`, 'success');
    }
    // Small reload for pages that memoise user.exam at mount
    setTimeout(() => window.location.reload(), 400);
  };

  if (!open || !user) return null;

  const currentExam = user.exam || 'NEET';

  return (
    <div style={S.backdrop} role="dialog" aria-modal="true" aria-labelledby="exam-picker-title">
      <div style={S.modal}>
        <div style={{ fontSize: 46, textAlign: 'center', marginBottom: 8 }}>🎯</div>
        <h2 id="exam-picker-title" style={S.title}>Which exam are you targeting?</h2>
        <p style={S.sub}>
          Welcome{user.name ? `, ${user.name.split(' ')[0]}` : ''}! Pick your target so we show
          the right mock tests, rank predictor, and college shortlist.
        </p>

        <div style={S.grid}>
          <button
            style={{ ...S.card, ...(currentExam === 'NEET' ? S.cardActive : {}) }}
            onClick={() => pick('NEET')}>
            <div style={{ fontSize: 40 }}>🩺</div>
            <div style={S.cardTitle}>NEET-UG</div>
            <div style={S.cardBody}>Medical entrance — MBBS, BDS, AIIMS, JIPMER, State Govt.</div>
            <div style={S.cardMeta}>Physics · Chemistry · Biology</div>
          </button>

          <button
            style={{ ...S.card, ...(currentExam === 'JEE' ? S.cardActive : {}) }}
            onClick={() => pick('JEE')}>
            <div style={{ fontSize: 40 }}>⚙️</div>
            <div style={S.cardTitle}>JEE Main & Advanced</div>
            <div style={S.cardBody}>Engineering — IITs, NITs, IIITs, BITS, top private colleges.</div>
            <div style={S.cardMeta}>Physics · Chemistry · Maths</div>
          </button>
        </div>

        <p style={S.foot}>You can change this later from your dashboard.</p>
      </div>
    </div>
  );
}

const S = {
  backdrop: {
    position: 'fixed', inset: 0, zIndex: 10000,
    background: 'rgba(6,8,18,0.72)',
    backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    animation: 'fadeIn 220ms ease-out',
  },
  modal: {
    background: 'linear-gradient(160deg, rgba(30,20,60,0.95), rgba(15,10,40,0.95))',
    border: '1px solid rgba(139,92,246,0.35)',
    borderRadius: 22, padding: 32, width: '100%', maxWidth: 620,
    boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 80px rgba(139,92,246,0.2)',
    color: 'var(--text)',
  },
  title: {
    fontFamily: 'Sora', fontWeight: 800, fontSize: 24, textAlign: 'center',
    marginBottom: 8, background: 'linear-gradient(90deg, #C4B5FD, #F0ABFC)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
  },
  sub: { textAlign: 'center', color: 'var(--text-dim)', fontSize: 14, marginBottom: 22, lineHeight: 1.5 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 14 },
  card: {
    background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)',
    borderRadius: 16, padding: 20, textAlign: 'center', cursor: 'pointer',
    transition: 'all 0.22s', color: 'var(--text)',
  },
  cardActive: { borderColor: 'var(--violet)', background: 'rgba(139,92,246,0.15)', boxShadow: '0 8px 30px rgba(139,92,246,0.35)' },
  cardTitle: { fontFamily: 'Sora', fontWeight: 700, fontSize: 17, margin: '10px 0 6px' },
  cardBody: { fontSize: 12.5, color: 'var(--text-dim)', lineHeight: 1.5, marginBottom: 10 },
  cardMeta: { fontSize: 11, color: 'var(--violet-2)', fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase' },
  foot: { textAlign: 'center', color: 'var(--text-faint)', fontSize: 12, marginTop: 20 },
};
