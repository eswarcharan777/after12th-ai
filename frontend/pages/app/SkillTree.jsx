import React from 'react';
import { useXP } from '../../xp';

const TREE = {
  Physics: [
    { name: 'Kinematics', unlock: 1, prereq: [] },
    { name: 'Newton\'s Laws', unlock: 3, prereq: ['Kinematics'] },
    { name: 'Work & Energy', unlock: 5, prereq: ['Newton\'s Laws'] },
    { name: 'Rotation', unlock: 8, prereq: ['Work & Energy'] },
    { name: 'Thermodynamics', unlock: 10, prereq: ['Work & Energy'] },
    { name: 'Electromagnetism', unlock: 13, prereq: ['Thermodynamics'] },
    { name: 'Modern Physics', unlock: 16, prereq: ['Electromagnetism'] },
  ],
  Chemistry: [
    { name: 'Atomic Structure', unlock: 1, prereq: [] },
    { name: 'Bonding', unlock: 3, prereq: ['Atomic Structure'] },
    { name: 'Physical Chem', unlock: 6, prereq: ['Bonding'] },
    { name: 'Organic Basics', unlock: 8, prereq: ['Bonding'] },
    { name: 'Reaction Mechanisms', unlock: 12, prereq: ['Organic Basics'] },
    { name: 'Coordination', unlock: 15, prereq: ['Physical Chem'] },
  ],
};

export default function SkillTree() {
  const { level } = useXP();
  const user = JSON.parse(localStorage.getItem('after12th_user') || '{}');
  const isJEE = user.exam === 'JEE';

  const subjectKeys = ['Physics', 'Chemistry'];

  return (
    <div className="page-enter" style={{ maxWidth: 1000, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>📊 Skill Tree</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 24 }}>Unlock chapters by leveling up · Currently Level {level}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20 }}>
        {subjectKeys.map(sub => (
          <div key={sub} className="glass" style={{ padding: 22, borderRadius: 16 }}>
            <h3 style={{ fontFamily: 'Sora', fontWeight: 800, marginBottom: 16 }}>{sub}</h3>
            {TREE[sub].map((node, i) => {
              const unlocked = level >= node.unlock;
              return (
                <div key={node.name} style={{ position: 'relative', paddingLeft: 26, paddingBottom: 20 }}>
                  {i < TREE[sub].length - 1 && (
                    <div style={{ position: 'absolute', left: 11, top: 26, bottom: 0, width: 2, background: unlocked ? 'var(--violet)' : 'var(--border)' }} />
                  )}
                  <div style={{
                    position: 'absolute', left: 0, top: 4, width: 24, height: 24, borderRadius: '50%',
                    background: unlocked ? 'var(--aurora)' : 'var(--surface)',
                    border: `2px solid ${unlocked ? 'var(--violet)' : 'var(--border)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'white', fontWeight: 800,
                    boxShadow: unlocked ? 'var(--glow-violet)' : 'none',
                  }}>{unlocked ? '✓' : '🔒'}</div>
                  <div style={{ fontWeight: 700, color: unlocked ? 'var(--text)' : 'var(--text-faint)' }}>{node.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>
                    {unlocked ? 'Unlocked!' : `Level ${node.unlock} required`}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
