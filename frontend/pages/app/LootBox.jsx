import React, { useState, useEffect } from 'react';
import { useXP } from '../../xp';
import { fireConfetti } from '../../components/Confetti';

const INV_KEY = 'after12th_lootbox_inventory';
const DAILY_KEY = 'after12th_lootbox_daily';

const REWARDS = [
  { rarity: 'common', color: '#94A3B8', weight: 60, items: [
    { type: 'tip', text: '💡 Revise NCERT diagrams 3× each — they carry huge weight in NEET Biology.' },
    { type: 'tip', text: '💡 Solve 10 previous-year JEE problems daily to build speed.' },
    { type: 'xp', text: '+20 XP bonus', amount: 20 },
    { type: 'tip', text: '💡 Sleep 7–8 hours — memory consolidation happens during REM sleep.' },
    { type: 'tip', text: '💡 Write down 3 mistakes from every mock — review before the next one.' },
    { type: 'xp', text: '+30 XP bonus', amount: 30 },
  ]},
  { rarity: 'rare', color: '#06B6D4', weight: 25, items: [
    { type: 'xp', text: '+75 XP bonus', amount: 75 },
    { type: 'quote', text: '🌟 "Success is the sum of small efforts, repeated daily." — R. Collier' },
    { type: 'quote', text: '🌟 "Discipline equals freedom." — Jocko Willink' },
    { type: 'hint', text: '🎫 +1 Mock Test hint token', tokens: 1 },
    { type: 'freeze', text: '🧊 +1 Streak Freeze (protects your streak for 1 missed day)', freezes: 1 },
  ]},
  { rarity: 'epic', color: '#8B5CF6', weight: 13, items: [
    { type: 'xp', text: '+150 XP bonus', amount: 150 },
    { type: 'hint', text: '🎫 +3 Mock Test hint tokens', tokens: 3 },
    { type: 'freeze', text: '🧊 +2 Streak Freezes', freezes: 2 },
    { type: 'quote', text: '🔥 "The expert in anything was once a beginner." — Helen Hayes' },
  ]},
  { rarity: 'legendary', color: '#F5A623', weight: 2, items: [
    { type: 'xp', text: '🏆 +300 XP MEGA BONUS!', amount: 300 },
    { type: 'hint', text: '🏆 +10 Mock Test hint tokens!', tokens: 10 },
  ]},
];

const rollRarity = () => {
  const totalW = REWARDS.reduce((s, r) => s + r.weight, 0);
  let n = Math.random() * totalW;
  for (let i = 0; i < REWARDS.length; i++) { n -= REWARDS[i].weight; if (n <= 0) return i; }
  return 0;
};

const loadInventory = () => {
  try { return JSON.parse(localStorage.getItem(INV_KEY) || '{"hints":0,"freezes":0,"rewards":[]}'); }
  catch { return { hints: 0, freezes: 0, rewards: [] }; }
};

const saveInventory = (inv) => localStorage.setItem(INV_KEY, JSON.stringify(inv));

const canClaimDaily = () => {
  const last = localStorage.getItem(DAILY_KEY);
  if (!last) return true;
  return new Date(last).toDateString() !== new Date().toDateString();
};

export default function LootBox() {
  const { xp, addXP } = useXP();
  const cost = 50;
  const [opening, setOpening] = useState(false);
  const [result, setResult] = useState(null);
  const [inventory, setInventory] = useState(loadInventory());
  const [dailyOk, setDailyOk] = useState(canClaimDaily());

  useEffect(() => { saveInventory(inventory); }, [inventory]);

  const grant = (item, tier) => {
    if (item.type === 'xp') addXP(item.amount, 'Loot box XP');
    setInventory(prev => {
      const next = { ...prev };
      if (item.type === 'hint') next.hints = (next.hints || 0) + (item.tokens || 1);
      if (item.type === 'freeze') next.freezes = (next.freezes || 0) + (item.freezes || 1);
      next.rewards = [...(prev.rewards || []), { ...item, rarity: REWARDS[tier].rarity, when: Date.now() }].slice(-30);
      return next;
    });
    if (tier >= 2) fireConfetti({ count: 140, duration: 2200 });
  };

  const open = (freeSpin) => {
    if (!freeSpin && xp < cost) {
      window.__a12Toast && window.__a12Toast(`Need ${cost - xp} more XP — try the free daily spin!`, 'warn');
      return;
    }
    if (!freeSpin) addXP(-cost, 'Loot box opened');
    else { localStorage.setItem(DAILY_KEY, new Date().toISOString()); setDailyOk(false); }

    setResult(null);
    setOpening(true);
    setTimeout(() => {
      const tier = rollRarity();
      const bucket = REWARDS[tier];
      const item = bucket.items[Math.floor(Math.random() * bucket.items.length)];
      grant(item, tier);
      setResult({ ...item, rarity: bucket.rarity, color: bucket.color });
      setOpening(false);
    }, 1800);
  };

  return (
    <div className="page-enter" style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🎁 Loot Box</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 22 }}>
        Spend {cost} XP for a random reward — XP, tips, hint tokens or streak freezes.
      </p>

      {/* Inventory strip */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
        <StatChip label="Your XP" value={xp} icon="⚡" />
        <StatChip label="Hint tokens" value={inventory.hints || 0} icon="🎫" />
        <StatChip label="Streak freezes" value={inventory.freezes || 0} icon="🧊" />
      </div>

      <div className="glass-strong" style={{ padding: 40, borderRadius: 20, position: 'relative', overflow: 'hidden' }}>
        {opening && <div className="a12-lb-glow" />}

        <div className={`a12-lb-box${opening ? ' opening' : ''}${result ? ' opened' : ''}`}>
          <div className="a12-lb-lid">🎀</div>
          <div className="a12-lb-body">🎁</div>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginTop: 24 }}>
          <button className="btn-primary" onClick={() => open(false)} disabled={opening || xp < cost}
            style={{ padding: '12px 24px', minWidth: 180 }}>
            {opening ? 'Opening…' : `Open for ${cost} XP`}
          </button>
          {dailyOk && (
            <button className="btn-outline" onClick={() => open(true)} disabled={opening}
              style={{ padding: '12px 24px' }}>
              🎉 Free Daily Spin
            </button>
          )}
        </div>
        {xp < cost && !dailyOk && (
          <div style={{ marginTop: 14, fontSize: 12, color: 'var(--text-faint)' }}>
            Not enough XP. Complete a mock test or daily quiz to earn more.
          </div>
        )}

        {result && !opening && (
          <div style={{
            marginTop: 26, padding: 20, borderRadius: 14,
            border: `2px solid ${result.color}`,
            background: `${result.color}22`,
            animation: 'a12lbReveal 0.6s cubic-bezier(.22,1,.36,1)',
          }}>
            <div style={{ fontSize: 12, textTransform: 'uppercase', fontWeight: 800, color: result.color, letterSpacing: 2, marginBottom: 8 }}>
              {result.rarity} reward
            </div>
            <div style={{ fontSize: 17, fontWeight: 600, color: 'var(--text)' }}>{result.text}</div>
          </div>
        )}
      </div>

      {/* Recent rewards history */}
      {inventory.rewards && inventory.rewards.length > 0 && (
        <div className="glass" style={{ marginTop: 26, padding: 20, borderRadius: 14, textAlign: 'left' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--violet-2)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>
            Recent rewards
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 200, overflowY: 'auto' }}>
            {[...inventory.rewards].reverse().slice(0, 10).map((r, i) => {
              const bucket = REWARDS.find(b => b.rarity === r.rarity) || REWARDS[0];
              return (
                <div key={i} style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: `1px solid ${bucket.color}44`, fontSize: 13, display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <span style={{ color: 'var(--text)' }}>{r.text}</span>
                  <span style={{ color: bucket.color, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, alignSelf: 'center' }}>{r.rarity}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        .a12-lb-box {
          position: relative; width: 160px; height: 160px; margin: 0 auto;
          font-size: 130px; line-height: 1;
        }
        .a12-lb-body {
          position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
          transition: transform 0.4s;
        }
        .a12-lb-lid {
          position: absolute; top: -6px; left: 50%; transform: translateX(-50%);
          font-size: 60px; transition: transform 0.7s cubic-bezier(.5,-0.4,.4,1.6), opacity 0.6s;
        }
        .a12-lb-box.opening { animation: a12lbShake 0.14s ease-in-out infinite; }
        .a12-lb-box.opening .a12-lb-body { transform: scale(1.12); filter: brightness(1.25); }
        .a12-lb-box.opened .a12-lb-lid { transform: translateX(-50%) translateY(-70px) rotate(-25deg); opacity: 0; }
        .a12-lb-box.opened .a12-lb-body { transform: scale(1.15); }
        @keyframes a12lbShake {
          0%,100% { transform: translateX(0) rotate(0); }
          25% { transform: translateX(-4px) rotate(-3deg); }
          75% { transform: translateX(4px) rotate(3deg); }
        }
        .a12-lb-glow {
          position: absolute; top: 50%; left: 50%; width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(245,166,35,0.35) 0%, transparent 70%);
          transform: translate(-50%, -50%); pointer-events: none;
          animation: a12lbPulse 0.6s ease-in-out infinite;
        }
        @keyframes a12lbPulse {
          0%,100% { opacity: 0.4; transform: translate(-50%,-50%) scale(0.9); }
          50% { opacity: 0.9; transform: translate(-50%,-50%) scale(1.1); }
        }
        @keyframes a12lbReveal {
          from { opacity: 0; transform: translateY(14px) scale(0.94); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

function StatChip({ label, value, icon }) {
  return (
    <div style={{ padding: '8px 16px', borderRadius: 999, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
      <span>{icon}</span>
      <span style={{ color: 'var(--text-dim)' }}>{label}:</span>
      <strong style={{ color: 'var(--text)' }}>{value}</strong>
    </div>
  );
}
