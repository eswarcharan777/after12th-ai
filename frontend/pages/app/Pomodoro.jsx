import React, { useState, useEffect, useRef } from 'react';
import Reveal from '../../components/Reveal';
import AnimatedNumber from '../../components/AnimatedNumber';

const PRESETS = {
  classic:  { focus: 25, short: 5,  long: 15, label: 'Classic 25/5' },
  long:     { focus: 50, short: 10, long: 20, label: 'Deep Work 50/10' },
  sprint:   { focus: 15, short: 3,  long: 10, label: 'Sprint 15/3' },
};

const STORAGE = {
  totalMinutes: 'after12th_pomo_total',
  sessionsToday: 'after12th_pomo_sessions',
  lastDate: 'after12th_pomo_lastdate',
};

function getTodayMinutes() {
  const today = new Date().toDateString();
  if (localStorage.getItem(STORAGE.lastDate) !== today) {
    localStorage.setItem(STORAGE.lastDate, today);
    localStorage.setItem(STORAGE.sessionsToday, '0');
    return 0;
  }
  return Number(localStorage.getItem(STORAGE.sessionsToday) || 0);
}

export default function Pomodoro() {
  const [preset, setPreset] = useState('classic');
  const cfg = PRESETS[preset];

  const [phase, setPhase] = useState('focus');     // 'focus' | 'short' | 'long'
  const [timeLeft, setTimeLeft] = useState(cfg.focus * 60);
  const [running, setRunning] = useState(false);
  const [cycle, setCycle] = useState(0);            // completed focus cycles
  const [todayMinutes, setTodayMinutes] = useState(getTodayMinutes());
  const [totalMinutes, setTotalMinutes] = useState(Number(localStorage.getItem(STORAGE.totalMinutes) || 0));

  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  // Reset timer when preset or phase changes
  useEffect(() => {
    const target = phase === 'focus' ? cfg.focus : phase === 'short' ? cfg.short : cfg.long;
    setTimeLeft(target * 60);
  }, [phase, preset]);

  // Tick
  useEffect(() => {
    if (!running) { clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          // Phase complete
          completePhase();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running, phase]);

  // Update document title with countdown
  useEffect(() => {
    if (running) document.title = `${formatTime(timeLeft)} • ${phase === 'focus' ? '🍅 Focus' : '☕ Break'} | After12th AI`;
    else document.title = 'Pomodoro Timer | After12th AI';
    return () => { document.title = 'After12th AI'; };
  }, [timeLeft, running, phase]);

  const completePhase = () => {
    setRunning(false);
    // Play sound
    if (audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.play().catch(() => {}); }
    // Browser notification if granted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(phase === 'focus' ? '🍅 Focus done! Take a break.' : '☕ Break done! Back to work.', {
        body: phase === 'focus' ? `+${cfg.focus} minutes of focus logged!` : 'Hit start when ready.',
        icon: '/pwa-icon.svg',
      });
    }
    if (phase === 'focus') {
      // Log the minutes
      const newToday = todayMinutes + cfg.focus;
      const newTotal = totalMinutes + cfg.focus;
      setTodayMinutes(newToday);
      setTotalMinutes(newTotal);
      localStorage.setItem(STORAGE.sessionsToday, String(newToday));
      localStorage.setItem(STORAGE.totalMinutes, String(newTotal));
      // After 4 focus cycles → long break, else short
      const next = (cycle + 1) % 4 === 0 ? 'long' : 'short';
      setCycle(c => c + 1);
      setPhase(next);
    } else {
      setPhase('focus');
    }
  };

  const startTimer = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    setRunning(true);
  };

  const resetTimer = () => {
    setRunning(false);
    const target = phase === 'focus' ? cfg.focus : phase === 'short' ? cfg.short : cfg.long;
    setTimeLeft(target * 60);
  };

  const skipPhase = () => {
    clearInterval(intervalRef.current);
    completePhase();
  };

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const targetSeconds = (phase === 'focus' ? cfg.focus : phase === 'short' ? cfg.short : cfg.long) * 60;
  const progress = ((targetSeconds - timeLeft) / targetSeconds) * 100;

  const phaseColor = phase === 'focus' ? 'var(--violet)' : phase === 'short' ? 'var(--cyan)' : 'var(--gold)';
  const phaseLabel = phase === 'focus' ? '🍅 Focus Time' : phase === 'short' ? '☕ Short Break' : '🌴 Long Break';
  const phaseMessage = phase === 'focus' ? 'Stay focused. Phone in another room.' : phase === 'short' ? 'Stretch, hydrate, breathe.' : 'Step away, you earned it.';

  // SVG circle math
  const radius = 130;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <div className="page-enter">
      <Reveal variant="up">
        <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 28, color: 'var(--text)', marginBottom: 6 }}>🍅 Pomodoro Study Timer</h2>
        <p style={{ color: 'var(--text-dim)', marginBottom: 28 }}>Focused study sessions with regular breaks. Proven technique used by 10x students.</p>
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 280px', gap: 24, maxWidth: 880 }}>
        {/* Timer Card */}
        <Reveal variant="scale">
          <div className="glass-strong" style={{ padding: 36, borderRadius: 24, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: phaseColor, filter: 'blur(80px)', opacity: 0.25 }} />
            <div style={{ position: 'absolute', bottom: -30, left: -30, width: 160, height: 160, borderRadius: '50%', background: 'var(--pink)', filter: 'blur(70px)', opacity: 0.18 }} />

            <div style={{ position: 'relative' }}>
              <div className="badge" style={{ marginBottom: 18, background: `${phaseColor}22`, border: `1px solid ${phaseColor}55`, color: phaseColor }}>
                {phaseLabel}
              </div>

              {/* Circular Progress */}
              <div style={{ position: 'relative', width: 280, height: 280, margin: '0 auto 20px' }}>
                <svg width="280" height="280" viewBox="0 0 280 280" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="140" cy="140" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                  <circle cx="140" cy="140" r={radius} fill="none"
                    stroke="url(#pomoGrad)"
                    strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    style={{ transition: 'stroke-dashoffset 1s linear', filter: `drop-shadow(0 0 12px ${phaseColor})` }}
                  />
                  <defs>
                    <linearGradient id="pomoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="50%" stopColor="#EC4899" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 56, background: 'var(--aurora)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>
                    {formatTime(timeLeft)}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 8, textAlign: 'center', maxWidth: 220, lineHeight: 1.5 }}>
                    {phaseMessage}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                {!running ? (
                  <button onClick={startTimer} className="btn-primary" style={{ padding: '14px 36px', fontSize: 16, minWidth: 140, justifyContent: 'center' }}>
                    ▶ {timeLeft === targetSeconds ? 'Start' : 'Resume'}
                  </button>
                ) : (
                  <button onClick={() => setRunning(false)} style={{
                    padding: '14px 36px', fontSize: 16, minWidth: 140,
                    background: 'rgba(236,72,153,0.18)', color: 'var(--pink-2)',
                    border: '1px solid rgba(236,72,153,0.5)', borderRadius: 12, fontFamily: 'Sora', fontWeight: 700, cursor: 'pointer',
                  }}>⏸ Pause</button>
                )}
                <button onClick={resetTimer} className="btn-outline" style={{ padding: '14px 24px', justifyContent: 'center' }}>↻ Reset</button>
                <button onClick={skipPhase} className="btn-outline" style={{ padding: '14px 24px', justifyContent: 'center' }}>⏭ Skip</button>
              </div>

              {/* Cycle dots */}
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 22 }}>
                {[0, 1, 2, 3].map(i => (
                  <div key={i} style={{
                    width: 12, height: 12, borderRadius: '50%',
                    background: i < (cycle % 4) ? 'var(--aurora)' : 'rgba(255,255,255,0.1)',
                    boxShadow: i < (cycle % 4) ? 'var(--glow-violet)' : 'none',
                    transition: 'all 0.4s',
                  }} />
                ))}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 8, letterSpacing: 1, textTransform: 'uppercase' }}>
                Cycle {(cycle % 4) + 1} of 4 → Long break after 4 cycles
              </div>
            </div>
          </div>
        </Reveal>

        {/* Sidebar — presets + stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Reveal variant="right">
            <div className="glass" style={{ padding: 22, borderRadius: 16 }}>
              <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 14, letterSpacing: 1, textTransform: 'uppercase' }}>⏱ Preset</div>
              {Object.entries(PRESETS).map(([k, p]) => {
                const active = preset === k;
                return (
                  <button key={k} onClick={() => { setPreset(k); setRunning(false); setPhase('focus'); }} style={{
                    width: '100%', padding: '12px 14px', marginBottom: 8,
                    border: `1px solid ${active ? 'var(--violet)' : 'var(--border)'}`,
                    background: active ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.03)',
                    color: active ? 'var(--violet-2)' : 'var(--text-mid)',
                    borderRadius: 10, fontSize: 13, fontFamily: 'inherit', fontWeight: 600, cursor: 'pointer',
                    textAlign: 'left', transition: 'all 0.2s',
                  }}>{p.label}</button>
                );
              })}
            </div>
          </Reveal>

          <Reveal variant="right" delay={100}>
            <div className="glass" style={{ padding: 22, borderRadius: 16 }}>
              <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 14, letterSpacing: 1, textTransform: 'uppercase' }}>📊 Your Stats</div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Today</div>
                <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 28, background: 'var(--aurora)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  <AnimatedNumber value={todayMinutes} suffix=" min" />
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>All Time</div>
                <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 22, color: 'var(--text)' }}>
                  <AnimatedNumber value={totalMinutes} suffix=" min" />
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 2 }}>
                  = {(totalMinutes / 60).toFixed(1)} hours of deep focus
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal variant="right" delay={200}>
            <div className="glass" style={{ padding: 18, borderRadius: 14, borderColor: 'rgba(245,166,35,0.3)' }}>
              <div style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>💡 Pro Tip</div>
              <div style={{ fontSize: 12, color: 'var(--text-mid)', lineHeight: 1.6 }}>
                Put your phone in airplane mode during focus blocks. The 25 min sprint feels short — your brain learns to FLOW.
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Hidden audio for chime */}
      <audio ref={audioRef} preload="auto">
        <source src="data:audio/wav;base64,UklGRjQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=" type="audio/wav" />
      </audio>
    </div>
  );
}
