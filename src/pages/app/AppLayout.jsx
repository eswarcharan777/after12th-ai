import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet, Navigate } from 'react-router-dom';
import { auth, isFirebaseConfigured, signOut } from '../../firebase';

const nav = [
  { to: '/app/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/app/tutor', icon: '🤖', label: 'AI Tutor' },
  { to: '/app/mocktest', icon: '📝', label: 'Mock Test' },
  { to: '/app/flashcards', icon: '📚', label: 'Flashcards' },
  { to: '/app/pomodoro', icon: '🍅', label: 'Focus Timer' },
  { to: '/app/videos', icon: '🎬', label: 'Video Lessons' },
  { to: '/app/forum', icon: '👥', label: 'Doubt Forum' },
  { to: '/app/rank', icon: '📈', label: 'Rank Predictor' },
  { to: '/app/colleges', icon: '🏫', label: 'College Finder' },
  { to: '/app/branch', icon: '🧭', label: 'Branch Guide' },
  { to: '/app/planner', icon: '📅', label: 'Study Planner' },
];

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('after12th_user') || '{}');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (!user.email) return <Navigate to="/login" replace />;

  const S = {
    layout: {
      display: 'flex', minHeight: '100vh',
      background: 'var(--bg)',
      position: 'relative',
    },
    sidebar: {
      width: 250,
      background: 'rgba(15,21,48,0.7)',
      backdropFilter: 'blur(24px) saturate(150%)',
      WebkitBackdropFilter: 'blur(24px) saturate(150%)',
      borderRight: '1px solid var(--border)',
      color: 'var(--text)',
      display: 'flex', flexDirection: 'column',
      position: isMobile ? 'fixed' : 'sticky',
      top: 0, left: isMobile ? (sidebarOpen ? 0 : -270) : 0,
      height: '100vh', zIndex: 200,
      transition: 'left 0.35s cubic-bezier(.22,1,.36,1)',
      boxShadow: isMobile && sidebarOpen ? '4px 0 30px rgba(0,0,0,0.5)' : 'none',
    },
    logo: {
      padding: '24px 22px 22px',
      borderBottom: '1px solid var(--border)',
      fontFamily: 'Sora',
      fontWeight: 800, fontSize: 21,
      display: 'flex', alignItems: 'center', gap: 10,
    },
    logoMark: {
      width: 36, height: 36, borderRadius: 10,
      background: 'var(--aurora)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 18, boxShadow: 'var(--glow-violet)',
    },
    navItem: (active) => ({
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 22px', margin: '2px 12px', fontSize: 14, fontWeight: 600,
      color: active ? '#fff' : 'var(--text-mid)',
      background: active ? 'linear-gradient(90deg, rgba(139,92,246,0.25), rgba(236,72,153,0.15))' : 'transparent',
      border: active ? '1px solid rgba(139,92,246,0.4)' : '1px solid transparent',
      borderRadius: 10,
      textDecoration: 'none', transition: 'all 0.25s',
      cursor: 'pointer',
      boxShadow: active ? '0 6px 20px rgba(139,92,246,0.25)' : 'none',
    }),
    main: { flex: 1, minWidth: 0, padding: '0', position: 'relative' },
    topbar: {
      background: 'rgba(11,15,31,0.6)',
      backdropFilter: 'blur(20px) saturate(150%)',
      WebkitBackdropFilter: 'blur(20px) saturate(150%)',
      borderBottom: '1px solid var(--border)',
      padding: '0 26px', height: 66,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 100,
    },
    avatar: {
      width: 38, height: 38, borderRadius: '50%',
      background: 'var(--aurora)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Sora', fontWeight: 700, fontSize: 16, color: 'white',
      boxShadow: 'var(--glow-violet)',
    },
    burger: {
      background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
      fontSize: 20, cursor: 'pointer', color: 'var(--text)',
      width: 42, height: 42, borderRadius: 10,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
  };

  return (
    <div style={S.layout}>
      {isMobile && sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 199 }} />
      )}

      <aside style={S.sidebar}>
        <div style={S.logo}>
          <span style={S.logoMark}>🎓</span>
          <span>After12th <span className="shimmer-text">AI</span></span>
        </div>

        <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontSize: 12, color: 'var(--text-faint)', marginBottom: 6, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 600 }}>Welcome back</div>
          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>{user.name}</div>
          <div className="badge badge-violet" style={{ marginTop: 8, fontSize: 10 }}>
            {user.exam || 'NEET'} Aspirant
          </div>
        </div>

        <nav style={{ flex: 1, padding: '12px 0', overflowY: 'auto' }}>
          {nav.map((n, i) => (
            <Link
              key={n.to}
              to={n.to}
              style={{ ...S.navItem(location.pathname === n.to), animation: `slideInLeft 0.4s cubic-bezier(.22,1,.36,1) ${i * 50}ms backwards` }}
              onClick={() => setSidebarOpen(false)}
              onMouseEnter={e => { if (location.pathname !== n.to) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--text)'; } }}
              onMouseLeave={e => { if (location.pathname !== n.to) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-mid)'; } }}
            >
              <span style={{ fontSize: 18 }}>{n.icon}</span>
              {n.label}
            </Link>
          ))}
        </nav>

        <div style={{ padding: '14px 22px', borderTop: '1px solid var(--border)' }}>
          <Link to="/" style={{ ...S.navItem(false), padding: '10px 0', margin: 0 }}>🏠 Back to Website</Link>
          <button
            onClick={async () => {
              try { if (isFirebaseConfigured && auth) await signOut(auth); } catch {}
              localStorage.removeItem('after12th_user');
              navigate('/');
            }}
            style={{ ...S.navItem(false), padding: '10px 0', margin: 0, background: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', color: 'var(--text-faint)', fontSize: 14 }}
          >🚪 Logout</button>
        </div>
      </aside>

      <div style={S.main}>
        <div style={S.topbar}>
          {isMobile && (
            <button onClick={() => setSidebarOpen(o => !o)} style={S.burger}>☰</button>
          )}
          <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 16, color: 'var(--text)' }}>
            {nav.find(n => n.to === location.pathname)?.label || 'Dashboard'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ textAlign: 'right', display: isMobile ? 'none' : 'block' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{user.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{user.exam || 'NEET'} Aspirant</div>
            </div>
            <div style={S.avatar}>{(user.name || 'U')[0].toUpperCase()}</div>
          </div>
        </div>

        <div style={{ padding: '28px' }}>
          <Outlet />
        </div>
      </div>

      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
