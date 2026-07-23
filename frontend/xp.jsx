import React, { createContext, useContext, useEffect, useState } from 'react';

const KEY = 'a12_xp_state';
const XPCtx = createContext(null);

const levelFor = (xp) => Math.floor(Math.sqrt(xp / 40)) + 1;
const xpForLevel = (lvl) => (lvl - 1) ** 2 * 40;
const nextLevelXp = (xp) => xpForLevel(levelFor(xp) + 1);

const initial = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || { xp: 0, log: [], streak: 0 }; }
  catch { return { xp: 0, log: [], streak: 0 }; }
};

export function XPProvider({ children }) {
  const [state, setState] = useState(initial);

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(state)); }, [state]);

  const addXP = (amount, source = 'action') => {
    setState(s => {
      const prevLvl = levelFor(s.xp);
      const newXp = s.xp + amount;
      const newLvl = levelFor(newXp);
      if (newLvl > prevLvl && typeof window !== 'undefined' && window.__a12Toast) {
        window.__a12Toast(`🎉 Level ${newLvl}! Keep going!`, 'success');
      } else if (typeof window !== 'undefined' && window.__a12Toast) {
        window.__a12Toast(`+${amount} XP · ${source}`, 'info');
      }
      return { ...s, xp: newXp, log: [{ ts: Date.now(), amount, source }, ...s.log].slice(0, 50) };
    });
  };

  const level = levelFor(state.xp);
  const currentLevelBase = xpForLevel(level);
  const nextLevelBase = nextLevelXp(state.xp);
  const progress = ((state.xp - currentLevelBase) / (nextLevelBase - currentLevelBase)) * 100;

  if (typeof window !== 'undefined') window.__a12AddXP = addXP;

  return (
    <XPCtx.Provider value={{ xp: state.xp, level, addXP, progress, log: state.log, currentLevelBase, nextLevelBase }}>
      {children}
    </XPCtx.Provider>
  );
}

export function useXP() {
  const v = useContext(XPCtx);
  return v || { xp: 0, level: 1, progress: 0, addXP: () => {}, log: [], currentLevelBase: 0, nextLevelBase: 40 };
}
