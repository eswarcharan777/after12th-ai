import React, { useState } from 'react';
import { useXP } from '../../xp';
import { fireConfetti } from '../../components/Confetti';

const REWARDS = [
  { rarity: 'common', color: '#94A3B8', items: [
    { type: 'tip', text: '💡 Revise NCERT diagrams 3 times each — they carry huge weight in NEET Biology.' },
    { type: 'tip', text: '💡 Solve at least 10 previous year JEE problems daily to build speed.' },
    { type: 'xp', text: '+20 XP bonus!', amount: 20 },
    { type: 'tip', text: '💡 Sleep 7-8 hours — memory consolidation happens during REM sleep.' },
  ]},
  { rarity: 'rare', color: '#06B6D4', items: [
    { type: 'xp', text: '+75 XP bonus!', amount: 75 },
    { type: 'quote', text: '🌟 "Success is the sum of small efforts, repeated daily." — R. Collier' },
    { type: 'wallpaper', text: '🖼 Aurora Dreams wallpaper unlocked', url: 'aurora' },
  ]},
  { rarity: 'epic', color: '#8B5CF6', items: [
    { type: 'xp', text: '+150 XP bonus!', amount: 150 },
    { type: 'quote', text: '🔥 "The expert in anything was once a beginner." — Helen Hayes' },
    { type: 'wallpaper', text: '🖼 Cosmic Focus wallpaper unlocked', url: 'cosmic' },
  ]},
  { rarity: 'legendary', color: '#F5A623', items: [
    { type: 'xp', text: '🏆 +300 XP MEGA bonus!!', amount: 300 },
  ]},
];

const rollRarity = () => {
  const r = Math.random();
  if (r < 0.02) return 3; // legendary
  if (r < 0.15) return 2; // epic
  if (r < 0.40) return 1; // rare
  return 0; // common
};

export default function LootBox() {
  const { xp, addXP } = useXP();
  const cost = 100;
  const [opening, setOpening] = useState(false);
  const [result, setResult] = useState(null);

  const open = () => {
    if (xp < cost) { window.__a12Toast && window.__a12Toast(`Need ${cost - xp} more XP`, 'warn'); return; }
    addXP(-cost, 'Loot box opened');
    setOpening(true);
    setTimeout(() => {
      const tier = rollRarity();
      const bucket = REWARDS[tier];
      const item = bucket.items[Math.floor(Math.random() * bucket.items.length)];
      setResult({ ...item, rarity: bucket.rarity, color: bucket.color });
      if (item.type === 'xp') addXP(item.amount, 'Loot box XP');
      if (tier >= 2) fireConfetti({ count: 120, duration: 2000 });
      setOpening(false);
    }, 1500);
  };

  return (
    <div className="page-enter" style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🎁 Loot Box</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 24 }}>Spend {cost} XP for a random reward — tips, wallpapers, or bonus XP</p>

      <div className="glass-strong" style={{ padding: 40, borderRadius: 20 }}>
        <div style={{
          fontSize: 120, transition: 'transform 0.5s',
          transform: opening ? 'rotate(720deg) scale(1.3)' : 'scale(1)',
          filter: opening ? 'brightness(1.5) hue-rotate(180deg)' : 'none',
        }}>🎁</div>
        <div style={{ fontSize: 14, color: 'var(--text-dim)', marginBottom: 20 }}>Your XP: {xp}</div>
        <button className="btn-primary" onClick={open} disabled={opening || xp < cost}>
          {opening ? 'Opening...' : `Open for ${cost} XP`}
        </button>

        {result && !opening && (
          <div style={{
            marginTop: 30, padding: 20, borderRadius: 14,
            border: `2px solid ${result.color}`, background: `${result.color}22`,
            animation: 'a12-page-in 0.6s',
          }}>
            <div style={{ fontSize: 13, textTransform: 'uppercase', fontWeight: 800, color: result.color, letterSpacing: 2, marginBottom: 8 }}>
              {result.rarity}
            </div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>{result.text}</div>
          </div>
        )}
      </div>
    </div>
  );
}
