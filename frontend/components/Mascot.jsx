import React, { useState, useEffect } from 'react';
const TIPS = [
  'Hi! I\'m Hoot, your study buddy 🦉',
  'Take a 5-minute break every hour!',
  'You got this! Keep grinding 💪',
  'Try the Adaptive Practice for weak topics',
  'Drink water! 💧',
  'Great work today! Come back tomorrow',
];
export default function Mascot() {
  const [tip, setTip] = useState(TIPS[0]); const [open, setOpen] = useState(false);
  useEffect(() => { const t = setInterval(() => setTip(TIPS[Math.floor(Math.random() * TIPS.length)]), 30000); return () => clearInterval(t); }, []);
  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>
      {open && (
        <div className="glass-strong" style={{ padding: 14, borderRadius: 14, marginBottom: 10, maxWidth: 240, animation: 'a12-page-in 0.3s' }}>
          <div style={{ fontSize: 13 }}>{tip}</div>
        </div>
      )}
      <button onClick={() => setOpen(o => !o)} style={{
        width: 60, height: 60, borderRadius: '50%', background: 'var(--aurora)', border: 'none',
        fontSize: 36, cursor: 'pointer', boxShadow: 'var(--glow-violet)',
        animation: 'a12-float 3s ease-in-out infinite',
      }}>🦉</button>
    </div>
  );
}
