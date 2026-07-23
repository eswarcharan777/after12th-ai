import React from 'react';
import { useXP } from '../xp';

export default function XPBar({ compact = false }) {
  const { xp, level, progress, currentLevelBase, nextLevelBase } = useXP();
  if (compact) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="badge badge-violet" style={{ fontSize: 11 }}>LVL {level}</span>
        <div style={{ width: 90, height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: 'var(--aurora)', transition: 'width 0.5s' }} />
        </div>
      </div>
    );
  }
  return (
    <div className="glass" style={{ padding: 16, borderRadius: 14, marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' }}>
        <div>
          <span className="badge badge-violet">LEVEL {level}</span>
          <span style={{ marginLeft: 10, fontWeight: 700 }}>{xp} XP</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{nextLevelBase - xp} XP to level {level + 1}</div>
      </div>
      <div style={{ width: '100%', height: 10, background: 'rgba(255,255,255,0.08)', borderRadius: 5, overflow: 'hidden' }}>
        <div style={{ width: `${progress}%`, height: '100%', background: 'var(--aurora)', boxShadow: '0 0 20px rgba(139,92,246,0.6)', transition: 'width 0.6s' }} />
      </div>
    </div>
  );
}
