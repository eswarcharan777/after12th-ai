// Unified user-data layer: writes to Firestore when configured & signed in,
// falls back to localStorage otherwise. All app code should use these
// helpers instead of touching localStorage directly so progress can sync
// across devices.

import { db, doc, getDoc, setDoc, isFirebaseConfigured } from './firebase';

const LS_KEYS = {
  scores: 'after12th_scores',
  plan: 'after12th_plan',
  profile: 'after12th_user',
};

function getUid() {
  try {
    const u = JSON.parse(localStorage.getItem(LS_KEYS.profile) || '{}');
    return u.uid || null;
  } catch { return null; }
}

function useCloud() {
  return !!(isFirebaseConfigured && db && getUid() && !getUid().startsWith('local-') && getUid() !== 'demo');
}

// ── Read ──────────────────────────────────────────────────────────────────
export async function loadUserData() {
  // Always return localStorage values immediately (fast UI), then merge cloud
  const local = {
    scores: JSON.parse(localStorage.getItem(LS_KEYS.scores) || '[]'),
    plan: JSON.parse(localStorage.getItem(LS_KEYS.plan) || 'null'),
  };

  if (!useCloud()) return local;

  try {
    const snap = await getDoc(doc(db, 'users', getUid()));
    if (snap.exists()) {
      const cloud = snap.data();
      // Cloud wins — and we mirror it to localStorage for offline use
      const merged = {
        scores: cloud.scores || local.scores || [],
        plan: cloud.plan || local.plan || null,
      };
      localStorage.setItem(LS_KEYS.scores, JSON.stringify(merged.scores));
      if (merged.plan) localStorage.setItem(LS_KEYS.plan, JSON.stringify(merged.plan));
      return merged;
    }
  } catch (err) {
    console.warn('Cloud read failed, using local:', err.message);
  }
  return local;
}

// ── Write helpers ────────────────────────────────────────────────────────
export async function saveScores(scores) {
  localStorage.setItem(LS_KEYS.scores, JSON.stringify(scores));
  if (!useCloud()) return;
  try {
    await setDoc(doc(db, 'users', getUid()), { scores }, { merge: true });
  } catch (err) {
    console.warn('Cloud save (scores) failed:', err.message);
  }
}

export async function appendScore(score) {
  const existing = JSON.parse(localStorage.getItem(LS_KEYS.scores) || '[]');
  const updated = [...existing, { ...score, at: Date.now() }];
  await saveScores(updated);
  return updated;
}

export async function savePlan(plan) {
  localStorage.setItem(LS_KEYS.plan, JSON.stringify(plan));
  if (!useCloud()) return;
  try {
    await setDoc(doc(db, 'users', getUid()), { plan }, { merge: true });
  } catch (err) {
    console.warn('Cloud save (plan) failed:', err.message);
  }
}

export function getLocalScores() {
  return JSON.parse(localStorage.getItem(LS_KEYS.scores) || '[]');
}

export function getLocalPlan() {
  return JSON.parse(localStorage.getItem(LS_KEYS.plan) || 'null');
}

export { useCloud };
