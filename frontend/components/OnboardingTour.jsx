import React, { useState, useEffect } from 'react';
const STEPS = [
  { title: 'Welcome to After12th AI! 👋', body: 'Let me show you around in 5 quick steps.' },
  { title: '🤖 AI Tutor', body: 'Ask any question about NEET/JEE — get instant AI explanations.' },
  { title: '📝 Mock Tests', body: 'Practice NTA-pattern tests. Your scores feed the Weakness Heatmap.' },
  { title: '🎴 SRS Flashcards', body: 'Anki-style spaced repetition — remember more, forget less.' },
  { title: '🎯 Daily Challenges', body: 'Complete 3 tasks daily to earn XP and level up!' },
];
export default function OnboardingTour() {
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(false);
  useEffect(() => { if (!localStorage.getItem('a12_tour_done')) setShow(true); }, []);
  const finish = () => { localStorage.setItem('a12_tour_done', '1'); setShow(false); };
  if (!show) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', zIndex: 100000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-strong pulse-glow" style={{ padding: 40, borderRadius: 20, maxWidth: 500, width: '90%', textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: 'var(--violet-2)', fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>STEP {step + 1} / {STEPS.length}</div>
        <h2 style={{ fontFamily: 'Sora', marginBottom: 12 }}>{STEPS[step].title}</h2>
        <p style={{ color: 'var(--text-mid)', marginBottom: 24 }}>{STEPS[step].body}</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button className="btn-outline" onClick={finish}>Skip</button>
          {step < STEPS.length - 1 ? (
            <button className="btn-primary" onClick={() => setStep(s => s + 1)}>Next →</button>
          ) : (
            <button className="btn-primary" onClick={finish}>Start! 🚀</button>
          )}
        </div>
      </div>
    </div>
  );
}
