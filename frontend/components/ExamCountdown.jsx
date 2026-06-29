import React, { useEffect, useState } from 'react';

// Default upcoming exam dates (update these each year)
const DEFAULT_DATES = {
  NEET: '2027-05-02T09:00:00',
  JEE:  '2027-01-22T09:00:00',
};

function calcParts(target) {
  const now = Date.now();
  const t = new Date(target).getTime();
  const diff = Math.max(0, t - now);
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: diff <= 0,
  };
}

export default function ExamCountdown({ exam = 'NEET' }) {
  const storageKey = `after12th_examdate_${exam}`;
  const [target, setTarget] = useState(() => localStorage.getItem(storageKey) || DEFAULT_DATES[exam] || DEFAULT_DATES.NEET);
  const [parts, setParts] = useState(() => calcParts(target));
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setParts(calcParts(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const saveDate = (val) => {
    if (!val) return;
    const iso = new Date(val + 'T09:00:00').toISOString();
    setTarget(iso);
    localStorage.setItem(storageKey, iso);
    setEditing(false);
  };

  const examLabel = exam === 'JEE' ? 'JEE Main' : 'NEET-UG';
  const examIcon = exam === 'JEE' ? '⚙️' : '🩺';
  const dateStr = new Date(target).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="glass-strong pulse-glow" style={{ padding: 26, marginBottom: 28, borderRadius: 20, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'var(--aurora-soft)', opacity: 0.4, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'var(--violet)', filter: 'blur(60px)', opacity: 0.3 }} />
      <div style={{ position: 'absolute', bottom: -30, left: -30, width: 130, height: 130, borderRadius: '50%', background: 'var(--cyan)', filter: 'blur(60px)', opacity: 0.25 }} />

      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--text-dim)', letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 600, marginBottom: 6 }}>⏰ Countdown to</div>
          <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 22, color: 'var(--text)' }}>
            {examIcon} {examLabel} {new Date(target).getFullYear()}
          </div>
          {!editing ? (
            <div style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 4 }}>
              {dateStr} · <button onClick={() => setEditing(true)} style={{ background: 'none', border: 'none', color: 'var(--violet-2)', cursor: 'pointer', fontSize: 13, padding: 0, textDecoration: 'underline' }}>Change date</button>
            </div>
          ) : (
            <div style={{ marginTop: 6, display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="date" defaultValue={target.split('T')[0]} onChange={e => saveDate(e.target.value)}
                style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-strong)', borderRadius: 8, fontSize: 13, color: 'var(--text)' }} />
              <button onClick={() => setEditing(false)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: 12 }}>Cancel</button>
            </div>
          )}
        </div>
        {parts.expired ? (
          <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 28, background: 'var(--aurora)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            🎯 GO TIME! GIVE YOUR BEST!
          </div>
        ) : (
          <div style={{ fontSize: 13, color: 'var(--text-dim)', textAlign: 'right' }}>
            ~{Math.round(parts.days / 7)} weeks of focused prep
          </div>
        )}
      </div>

      {!parts.expired && (
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {[
            ['DAYS',    parts.days],
            ['HOURS',   parts.hours],
            ['MINUTES', parts.minutes],
            ['SECONDS', parts.seconds],
          ].map(([label, val], i) => (
            <div key={label} style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--border)',
              borderRadius: 14,
              padding: '18px 12px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div key={val} style={{
                fontFamily: 'Sora',
                fontWeight: 800,
                fontSize: 'clamp(28px, 5vw, 44px)',
                background: 'var(--aurora)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1,
                animation: i === 3 ? 'tick 1s ease' : 'none',
              }}>{String(val).padStart(2, '0')}</div>
              <div style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: 8, letterSpacing: 2, fontWeight: 700 }}>{label}</div>
            </div>
          ))}
        </div>
      )}

      <style>{`@keyframes tick { 0% { transform: scale(1); } 50% { transform: scale(1.15); filter: brightness(1.3); } 100% { transform: scale(1); } }`}</style>
    </div>
  );
}
