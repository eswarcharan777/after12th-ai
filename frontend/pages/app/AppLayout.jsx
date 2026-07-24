import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useLocation, useNavigate, Outlet, Navigate } from 'react-router-dom';
import { auth, isFirebaseConfigured, signOut } from '../../firebase';
import XPBar from '../../components/XPBar';
import ExamPicker from '../../components/ExamPicker';

const nav = [
  { to: '/app/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/app/tutor', icon: '🤖', label: 'AI Tutor' },
  { to: '/app/voice-chat', icon: '🗣️', label: 'Voice Chat' },
  { to: '/app/photo-doubt', icon: '📸', label: 'Photo Doubt' },
  { to: '/app/summarize', icon: '📖', label: 'AI Summarizer' },
  { to: '/app/qgen', icon: '🧪', label: 'Question Gen' },
  { to: '/app/roadmap', icon: '🗺️', label: 'AI Roadmap' },
  { to: '/app/quiz', icon: '🎲', label: 'Daily Quiz' },
  { to: '/app/srs', icon: '🎴', label: 'SRS Flashcards' },
  { to: '/app/adaptive', icon: '🎯', label: 'Adaptive Practice' },
  { to: '/app/heatmap', icon: '📈', label: 'Weakness Heatmap' },
  { to: '/app/mindmap', icon: '🎨', label: 'Mind Maps' },
  { to: '/app/cheatsheet', icon: '📝', label: 'Cheatsheet Gen' },
  { to: '/app/highlighter', icon: '✏️', label: 'Highlighter' },
  { to: '/app/challenges', icon: '🎯', label: 'Daily Challenges' },
  { to: '/app/leaderboard', icon: '🥇', label: 'Leaderboard' },
  { to: '/app/tournament', icon: '🏆', label: 'Tournament' },
  { to: '/app/lootbox', icon: '🎁', label: 'Loot Box' },
  { to: '/app/pet', icon: '🐉', label: 'Study Pet' },
  { to: '/app/skilltree', icon: '📊', label: 'Skill Tree' },
  { to: '/app/badges', icon: '🏅', label: 'Badges' },
  { to: '/app/performance', icon: '📈', label: 'Performance' },
  { to: '/app/scorepredict', icon: '🎯', label: 'Score Predictor' },
  { to: '/app/mistakes', icon: '📉', label: 'Mistake Analysis' },
  { to: '/app/wrapped', icon: '📊', label: 'Year Wrapped' },
  { to: '/app/scorecard', icon: '📸', label: 'Score Card' },
  { to: '/app/certificate', icon: '🎓', label: 'Certificate' },
  { to: '/app/buddy', icon: '💬', label: 'Study Buddy' },
  { to: '/app/rooms', icon: '📺', label: 'Study Rooms' },
  { to: '/app/messages', icon: '💌', label: 'Messages' },
  { to: '/app/discussions', icon: '🎤', label: 'Discussions' },
  { to: '/app/senior', icon: '👨‍🏫', label: 'Ask a Senior' },
  { to: '/app/groups', icon: '🤝', label: 'Group Challenges' },
  { to: '/app/alumni', icon: '👨‍🎓', label: 'Alumni Network' },
  { to: '/app/news', icon: '📣', label: 'Announcements' },
  { to: '/app/calculator', icon: '🧮', label: 'Calculator' },
  { to: '/app/periodic', icon: '🌍', label: 'Periodic Table' },
  { to: '/app/whiteboard', icon: '🎨', label: 'Whiteboard' },
  { to: '/app/molecule', icon: '📐', label: '3D Molecule' },
  { to: '/app/biodiagrams', icon: '🧬', label: 'Bio Diagrams', only: 'NEET' },
  { to: '/app/pyq', icon: '📝', label: 'PYQ Papers' },
  { to: '/app/ncert', icon: '📚', label: 'NCERT Solutions' },
  { to: '/app/articles', icon: '📖', label: 'Concept Articles' },
  { to: '/app/podcast', icon: '📻', label: 'Podcast' },
  { to: '/app/career', icon: '🏢', label: 'Career Explorer' },
  { to: '/app/interview', icon: '🎤', label: 'Mock Interview' },
  { to: '/app/sop', icon: '📝', label: 'SOP Writer' },
  { to: '/app/compare', icon: '🎓', label: 'College Compare' },
  { to: '/app/counselling', icon: '📞', label: 'Book Counselling' },
  { to: '/app/mentorship', icon: '🎯', label: 'Mentorship' },
  { to: '/app/internships', icon: '💼', label: 'Internships' },
  { to: '/app/workshops', icon: '🎟️', label: 'Workshops' },
  { to: '/app/lastminute', icon: '📋', label: 'Last-Min Revision' },
  { to: '/app/examchecklist', icon: '🎯', label: 'Exam Checklist' },
  { to: '/app/calm', icon: '🧠', label: 'Calm Mode' },
  { to: '/app/meditation', icon: '🧘', label: 'Meditation' },
  { to: '/app/examcenter', icon: '📍', label: 'Exam Center' },
  { to: '/app/mood', icon: '🌡️', label: 'Mood Tracker' },
  { to: '/app/hydration', icon: '💧', label: 'Hydration' },
  { to: '/app/story', icon: '🤖', label: 'My Story' },
  { to: '/app/wallpapers', icon: '🖼', label: 'Wallpapers' },
  { to: '/app/books', icon: '🛒', label: 'Books Store' },
  { to: '/app/premium', icon: '💎', label: 'Go Premium' },
  { to: '/app/theme', icon: '🌈', label: 'Themes' },
  { to: '/app/shortcuts', icon: '⌨️', label: 'Shortcuts' },
  { to: '/app/mocktest', icon: '📝', label: 'Mock Test' },
  { to: '/app/flashcards', icon: '📚', label: 'Flashcards' },
  { to: '/app/pomodoro', icon: '🍅', label: 'Focus Timer' },
  { to: '/app/music', icon: '🎵', label: 'Focus Music' },
  { to: '/app/notes', icon: '📝', label: 'Notes' },
  { to: '/app/formulas', icon: '📐', label: 'Formulas' },
  { to: '/app/videos', icon: '🎬', label: 'Video Lessons' },
  { to: '/app/forum', icon: '👥', label: 'Doubt Forum' },
  { to: '/app/rank', icon: '📈', label: 'Rank Predictor' },
  { to: '/app/colleges', icon: '🏫', label: 'College Finder' },
  { to: '/app/branch', icon: '🧭', label: 'Branch Guide' },
  { to: '/app/planner', icon: '📅', label: 'Study Planner' },
  { to: '/app/refer', icon: '🤝', label: 'Refer Friends' },
];

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useMemo(() => JSON.parse(localStorage.getItem('after12th_user') || '{}'), []);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [navQuery, setNavQuery] = useState('');
  const navScrollRef = useRef(null);
  const SCROLL_KEY = 'after12th_sidebar_scroll';

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Restore sidebar scroll after route change so clicking an item doesn't fling us back to Dashboard.
  useEffect(() => {
    const saved = Number(sessionStorage.getItem(SCROLL_KEY) || 0);
    if (navScrollRef.current && saved) {
      navScrollRef.current.scrollTop = saved;
    }
  }, [location.pathname]);

  const handleNavScroll = (e) => {
    sessionStorage.setItem(SCROLL_KEY, String(e.currentTarget.scrollTop));
  };

  if (!user.email) return <Navigate to="/login" replace />;

  const S = {
    layout: {
      display: 'flex', minHeight: '100vh',
      background: 'var(--bg)',
      position: 'relative',
    },
    sidebar: {
      width: 250,
      background: 'rgba(15,21,48,0.94)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
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
      background: 'rgba(11,15,31,0.92)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
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
      <ExamPicker />
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

        <div style={{ padding: '12px 14px 6px' }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: 'var(--text-faint)', pointerEvents: 'none' }}>🔍</span>
            <input
              type="text"
              value={navQuery}
              onChange={e => setNavQuery(e.target.value)}
              placeholder="Search features..."
              aria-label="Search sidebar features"
              style={{
                width: '100%', padding: '9px 30px 9px 34px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border)', borderRadius: 10,
                color: 'var(--text)', fontSize: 13, outline: 'none',
              }}
            />
            {navQuery && (
              <button
                onClick={() => setNavQuery('')}
                aria-label="Clear search"
                style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'var(--text-faint)', cursor: 'pointer', fontSize: 16, padding: '2px 6px' }}
              >×</button>
            )}
          </div>
        </div>

        <nav
          ref={navScrollRef}
          onScroll={handleNavScroll}
          style={{ flex: 1, padding: '12px 0', overflowY: 'auto', contain: 'strict', willChange: 'scroll-position' }}
        >
          {(() => {
            const q = navQuery.trim().toLowerCase();
            const userExam = user.exam || 'NEET';
            const examFiltered = nav.filter(n => !n.only || n.only === userExam);
            const filtered = q ? examFiltered.filter(n => n.label.toLowerCase().includes(q)) : examFiltered;
            if (filtered.length === 0) {
              return <div style={{ padding: '18px 24px', fontSize: 13, color: 'var(--text-faint)' }}>No matches for "{navQuery}"</div>;
            }
            return filtered.map((n) => {
              const active = location.pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`a12-nav-item${active ? ' active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span style={{ fontSize: 18 }}>{n.icon}</span>
                  {n.label}
                </Link>
              );
            });
          })()}
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
            <XPBar compact />
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
        .a12-nav-item {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 22px; margin: 2px 12px;
          font-size: 14px; font-weight: 600;
          color: var(--text-mid);
          background: transparent;
          border: 1px solid transparent;
          border-radius: 10px;
          text-decoration: none;
          cursor: pointer;
          transition: color 0.18s, background 0.18s, border-color 0.18s;
        }
        .a12-nav-item:hover {
          background: rgba(255,255,255,0.04);
          color: var(--text);
        }
        .a12-nav-item.active {
          color: #fff;
          background: linear-gradient(90deg, rgba(139,92,246,0.25), rgba(236,72,153,0.15));
          border-color: rgba(139,92,246,0.4);
          box-shadow: 0 6px 20px rgba(139,92,246,0.25);
        }
        aside { will-change: transform; }
      `}</style>
    </div>
  );
}
