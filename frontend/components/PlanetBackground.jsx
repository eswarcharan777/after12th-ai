import React from 'react';

// Slow-orbiting planet + moon in the site background
export default function PlanetBackground() {
  return (
    <div aria-hidden style={{
      position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden',
    }}>
      {/* Distant big planet — top right */}
      <div style={{
        position: 'absolute', top: '-120px', right: '-140px',
        width: 460, height: 460, borderRadius: '50%',
        background: 'radial-gradient(circle at 32% 32%, #A78BFA 0%, #8B5CF6 35%, #4C1D95 70%, #1E1B4B 100%)',
        boxShadow: '0 0 120px rgba(139,92,246,0.55), inset -40px -30px 90px rgba(0,0,0,0.55), inset 30px 20px 80px rgba(236,72,153,0.35)',
        opacity: 0.85,
        animation: 'a12-planet-spin 90s linear infinite',
      }}>
        {/* Planet ring */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 640, height: 120, borderRadius: '50%',
          transform: 'translate(-50%, -50%) rotate(-25deg)',
          border: '2px solid rgba(236,72,153,0.35)',
          boxShadow: '0 0 40px rgba(236,72,153,0.35), inset 0 0 30px rgba(139,92,246,0.4)',
        }} />
      </div>

      {/* Small orbiting moon — bottom left */}
      <div style={{
        position: 'absolute', bottom: '10%', left: '-60px',
        width: 180, height: 180, borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #22D3EE 0%, #06B6D4 45%, #0E7490 100%)',
        boxShadow: '0 0 60px rgba(6,182,212,0.55), inset -20px -15px 40px rgba(0,0,0,0.5)',
        opacity: 0.75,
        animation: 'a12-planet-drift 40s ease-in-out infinite alternate',
      }} />

      {/* Tiny distant planet — mid left */}
      <div style={{
        position: 'absolute', top: '55%', left: '8%',
        width: 60, height: 60, borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #F472B6 0%, #EC4899 50%, #831843 100%)',
        boxShadow: '0 0 30px rgba(236,72,153,0.6)',
        opacity: 0.7,
        animation: 'a12-planet-drift 55s ease-in-out infinite alternate-reverse',
      }} />
    </div>
  );
}
