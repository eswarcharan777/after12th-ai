import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  auth, isFirebaseConfigured,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signInWithPopup, GoogleAuthProvider, updateProfile,
} from '../firebase';

export default function Login() {
  const [tab, setTab] = useState('signup');
  const [form, setForm] = useState({ name: '', email: '', exam: 'NEET', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const saveLocalProfile = (user, extra = {}) => {
    // Preserve any previously-locked exam choice for returning users.
    let prev = {};
    try { prev = JSON.parse(localStorage.getItem('after12th_user') || '{}'); } catch {}
    const samePerson = prev.uid === user.uid;
    const profile = {
      uid: user.uid,
      name: user.displayName || extra.name || (user.email || '').split('@')[0],
      email: user.email,
      photoURL: user.photoURL || null,
    };
    if (extra.exam) {
      // Explicit signup pick → lock it in.
      profile.exam = extra.exam;
      profile.examChosen = true;
    } else if (samePerson && (prev.examChosen || prev.exam)) {
      // Returning user on same device (including legacy users who had exam
      // set before the examChosen flag existed) → keep their choice locked.
      profile.exam = prev.exam;
      profile.examChosen = true;
    }
    // Otherwise: leave exam/examChosen unset → ExamPicker will prompt (or hydrate from Firestore).
    localStorage.setItem('after12th_user', JSON.stringify(profile));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) { setError('Please fill all fields'); return; }
    if (tab === 'signup' && !form.name) { setError('Please enter your name'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }

    // Demo fallback if Firebase isn't configured yet
    if (!isFirebaseConfigured) {
      const fake = { uid: 'local-' + Date.now(), email: form.email, displayName: form.name || form.email.split('@')[0], photoURL: null };
      saveLocalProfile(fake, { name: form.name, exam: form.exam });
      navigate('/app/dashboard');
      return;
    }

    setLoading(true);
    try {
      if (tab === 'signup') {
        const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
        if (form.name) await updateProfile(cred.user, { displayName: form.name });
        saveLocalProfile(cred.user, { name: form.name, exam: form.exam });
      } else {
        const cred = await signInWithEmailAndPassword(auth, form.email, form.password);
        saveLocalProfile(cred.user);
      }
      navigate('/app/dashboard');
    } catch (err) {
      const map = {
        'auth/invalid-credential': 'No account with this email/password. Please Sign Up first.',
        'auth/user-not-found': 'This email is not registered. Please Sign Up first.',
        'auth/wrong-password': 'Wrong password.',
        'auth/email-already-in-use': 'Email already registered. Switch to Login.',
        'auth/weak-password': 'Password too weak (min 6 characters).',
        'auth/invalid-email': 'Enter a valid email address.',
        'auth/network-request-failed': 'Network error. Check your internet.',
      };
      setError(map[err.code] || err.message || 'Something went wrong. Try again.');
      // Auto-flip the tab so users act on the guidance instead of retrying.
      if (tab === 'login' && (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential')) {
        setTab('signup');
      } else if (tab === 'signup' && err.code === 'auth/email-already-in-use') {
        setTab('login');
      }
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
    setError('');
    if (!isFirebaseConfigured) {
      setError('Google sign-in needs Firebase setup (see src/firebase.js).');
      return;
    }
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      // Always show account chooser, never silently reuse the last Google session.
      provider.setCustomParameters({ prompt: 'select_account' });
      const cred = await signInWithPopup(auth, provider);
      saveLocalProfile(cred.user);
      navigate('/app/dashboard');
    } catch (err) {
      setError(err.code === 'auth/popup-closed-by-user' ? 'Sign-in cancelled.' : err.message);
    } finally {
      setLoading(false);
    }
  };

  const demoLogin = () => {
    const profile = { uid: 'demo', name: 'Demo Student', email: 'demo@after12th.ai', photoURL: null };
    localStorage.setItem('after12th_user', JSON.stringify(profile));
    navigate('/app/dashboard');
  };

  const S = {
    page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, position: 'relative' },
    box: { background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(28px) saturate(150%)', WebkitBackdropFilter: 'blur(28px) saturate(150%)', borderRadius: 20, padding: 40, width: '100%', maxWidth: 460, border: '1px solid var(--border-strong)', boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 60px rgba(139,92,246,0.15)' },
    logo: { textAlign: 'center', fontFamily: 'Sora', fontWeight: 800, fontSize: 28, color: 'var(--text)', marginBottom: 8 },
    subtitle: { textAlign: 'center', color: 'var(--text-dim)', fontSize: 14, marginBottom: 28 },
    tabs: { display: 'flex', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: 12, padding: 4, marginBottom: 28 },
    tab: (active) => ({ flex: 1, padding: '10px', border: 'none', borderRadius: 9, cursor: 'pointer', fontFamily: 'Sora', fontWeight: 600, fontSize: 14, background: active ? 'var(--aurora)' : 'transparent', color: active ? 'white' : 'var(--text-dim)', transition: 'all 0.25s', boxShadow: active ? '0 4px 16px rgba(139,92,246,0.4)' : 'none' }),
    label: { display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text-mid)', marginBottom: 6 },
    input: { width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 15, outline: 'none', color: 'var(--text)', transition: 'border-color 0.2s' },
    btn: { width: '100%', background: 'var(--aurora)', color: 'white', border: '1px solid rgba(255,255,255,0.15)', padding: '14px', borderRadius: 12, fontFamily: 'Sora', fontWeight: 700, fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: 4, boxShadow: '0 8px 24px rgba(139,92,246,0.4)' },
    google: { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: 'rgba(255,255,255,0.05)', color: 'var(--text)', border: '1px solid var(--border-strong)', padding: '13px', borderRadius: 12, fontWeight: 600, fontSize: 14, cursor: loading ? 'not-allowed' : 'pointer', marginBottom: 12 },
    error: { background: 'rgba(236,72,153,0.12)', color: '#FBBADC', border: '1px solid rgba(236,72,153,0.4)', padding: '10px 14px', borderRadius: 10, fontSize: 13, marginBottom: 16 },
    divider: { textAlign: 'center', color: 'var(--text-faint)', fontSize: 12, margin: '20px 0', letterSpacing: 2, textTransform: 'uppercase' },
    demo: { width: '100%', background: 'rgba(255,255,255,0.03)', color: 'var(--text-mid)', border: '1px solid var(--border)', padding: '12px', borderRadius: 12, fontWeight: 600, fontSize: 14, cursor: 'pointer' },
    notice: { background: 'rgba(245,166,35,0.10)', color: '#FCD34D', border: '1px solid rgba(245,166,35,0.3)', padding: '10px 12px', borderRadius: 10, fontSize: 12, marginBottom: 16, textAlign: 'center' },
  };

  return (
    <div style={S.page}>
      <div style={S.box}>
        <div style={S.logo}>🎓 After12th <span className="shimmer-text">AI</span></div>
        <div style={S.subtitle}>AI-Powered NEET & JEE Preparation</div>

        {!isFirebaseConfigured && (
          <div style={S.notice}>
            ⚠️ Firebase not configured yet — using local demo mode. Set up Firebase in <code>src/firebase.js</code> for real accounts.
          </div>
        )}

        <div style={S.tabs}>
          <button style={S.tab(tab === 'signup')} onClick={() => setTab('signup')}>Sign Up Free</button>
          <button style={S.tab(tab === 'login')} onClick={() => setTab('login')}>Login</button>
        </div>

        {error && <div style={S.error}>{error}</div>}

        <button onClick={googleSignIn} style={S.google} disabled={loading}>
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 7.1 29.6 5 24 5 16.3 5 9.7 9.3 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.5 0 10.5-2.1 14.3-5.5l-6.6-5.6C29.7 34.5 27 35.5 24 35.5c-5.3 0-9.7-3.1-11.3-7.5l-6.6 5.1C9.4 39.4 16.1 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.5l6.6 5.6C40.4 36 44 30.5 44 24c0-1.3-.1-2.4-.4-3.5z"/>
          </svg>
          Continue with Google
        </button>

        <div style={S.divider}>— or with email —</div>

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {tab === 'signup' && (
            <div>
              <label style={S.label}>Full Name</label>
              <input style={S.input} name="name" placeholder="Rahul Kumar" value={form.name} onChange={handle} disabled={loading} />
            </div>
          )}
          <div>
            <label style={S.label}>Email</label>
            <input style={S.input} name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handle} disabled={loading} />
          </div>
          {tab === 'signup' && (
            <div>
              <label style={S.label}>Target Exam</label>
              <select style={S.input} name="exam" value={form.exam} onChange={handle} disabled={loading}>
                <option value="NEET">NEET-UG (Medical)</option>
                <option value="JEE">JEE Main & Advanced (Engineering)</option>
              </select>
            </div>
          )}
          <div>
            <label style={S.label}>Password</label>
            <input style={S.input} name="password" type="password" placeholder="••••••••" value={form.password} onChange={handle} disabled={loading} />
          </div>
          <button type="submit" style={S.btn} disabled={loading}>
            {loading ? 'Please wait…' : (tab === 'login' ? 'Login →' : 'Create Free Account →')}
          </button>
        </form>

        <div style={S.divider}>— or —</div>
        <button onClick={demoLogin} style={S.demo}>👤 Continue as Demo Student (no signup)</button>

        <p style={{ textAlign: 'center', color: 'var(--text-faint)', fontSize: 12, marginTop: 20 }}>
          By continuing, you agree to our Terms of Service and Privacy Policy.<br />
          100% free · No credit card required.
        </p>
      </div>
    </div>
  );
}
