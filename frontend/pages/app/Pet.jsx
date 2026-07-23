import React from 'react';
import { useXP } from '../../xp';

const STAGES = [
  { min: 0, emoji: '🥚', name: 'Egg', desc: 'Study more to hatch me!' },
  { min: 5, emoji: '🐣', name: 'Hatchling', desc: 'Just born! Feed me knowledge.' },
  { min: 10, emoji: '🐥', name: 'Chick', desc: 'Learning to walk...' },
  { min: 15, emoji: '🦎', name: 'Baby Dragon', desc: 'Growing wings!' },
  { min: 20, emoji: '🐲', name: 'Dragon Cub', desc: 'Breathing tiny sparks!' },
  { min: 25, emoji: '🐉', name: 'Study Dragon', desc: 'Wise and powerful!' },
  { min: 30, emoji: '🔥🐉', name: 'Ancient Dragon', desc: 'Legendary study warrior!' },
];

export default function Pet() {
  const { level, xp } = useXP();
  const stage = [...STAGES].reverse().find(s => level >= s.min) || STAGES[0];
  const nextStage = STAGES.find(s => s.min > level);

  return (
    <div className="page-enter" style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🐉 Your Study Pet</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 30 }}>Grows as you study · Level {level} · {xp} XP</p>

      <div className="glass-strong pulse-glow" style={{ padding: 50, borderRadius: 24 }}>
        <div style={{
          fontSize: 140, animation: 'a12-float 3s ease-in-out infinite', display: 'inline-block',
          filter: `drop-shadow(0 0 30px rgba(139,92,246,${0.2 + level * 0.03}))`,
        }}>{stage.emoji}</div>
        <h2 style={{ fontFamily: 'Sora', fontSize: 26, fontWeight: 800, marginTop: 14 }}>{stage.name}</h2>
        <p style={{ color: 'var(--text-dim)', marginTop: 8 }}>{stage.desc}</p>

        {nextStage && (
          <div style={{ marginTop: 20, padding: 14, background: 'rgba(139,92,246,0.1)', borderRadius: 12 }}>
            <div style={{ fontSize: 12, color: 'var(--violet-2)', fontWeight: 700 }}>NEXT EVOLUTION</div>
            <div style={{ fontSize: 40, marginTop: 6 }}>{nextStage.emoji}</div>
            <div style={{ fontSize: 14, marginTop: 4 }}>{nextStage.name} @ Level {nextStage.min}</div>
            <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 4 }}>{nextStage.min - level} more level{nextStage.min - level !== 1 ? 's' : ''} to go</div>
          </div>
        )}
      </div>
    </div>
  );
}
