import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LanguageToggle } from '../i18n';

const S = {
  nav: {
    position: 'sticky', top: 0, zIndex: 100,
    background: 'rgba(11,15,31,0.65)',
    backdropFilter: 'blur(20px) saturate(150%)',
    WebkitBackdropFilter: 'blur(20px) saturate(150%)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  inner: {
    maxWidth: 1200, margin: '0 auto', padding: '0 24px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    height: 68,
  },
  logo: {
    display: 'flex', alignItems: 'center', gap: 10,
    fontFamily: 'Sora, sans-serif', fontWeight: 800,
    fontSize: 22, color: 'var(--text)', textDecoration: 'none',
  },
  logoMark: {
    width: 36, height: 36, borderRadius: 10,
    background: 'var(--aurora)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 20, boxShadow: 'var(--glow-violet)',
  },
  links: { display: 'flex', alignItems: 'center', gap: 6 },
  link: {
    fontSize: 14, fontWeight: 600, color: 'var(--text-mid)',
    textDecoration: 'none', padding: '8px 14px', borderRadius: 10,
    transition: 'all 0.2s',
  },
  activeLink: { color: 'var(--text)', background: 'rgba(255,255,255,0.06)' },
  cta: {
    background: 'var(--aurora)', color: 'white',
    padding: '10px 22px', borderRadius: 12,
    fontSize: 14, fontWeight: 700,
    textDecoration: 'none', transition: 'all 0.25s',
    boxShadow: '0 6px 20px rgba(139,92,246,0.4)',
    border: '1px solid rgba(255,255,255,0.15)',
    marginLeft: 8,
  },
  hamburger: {
    background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
    fontSize: 22, cursor: 'pointer', color: 'var(--text)',
    width: 44, height: 44, borderRadius: 10,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  mobileMenu: {
    background: 'rgba(11,15,31,0.95)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid var(--border)',
    padding: '16px 24px',
    display: 'flex', flexDirection: 'column', gap: 8,
  },
};

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 880);
  const isLoggedIn = !!localStorage.getItem('after12th_user');
  const isApp = location.pathname.startsWith('/app');

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 880);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('after12th_user');
    navigate('/');
  };

  const navLinks = isApp
    ? [
        { to: '/app/dashboard', label: 'Dashboard' },
        { to: '/app/tutor', label: 'AI Tutor' },
        { to: '/app/mocktest', label: 'Mock Test' },
        { to: '/app/rank', label: 'Rank' },
        { to: '/app/colleges', label: 'Colleges' },
        { to: '/app/planner', label: 'Planner' },
      ]
    : [
        { to: '/neet', label: 'NEET' },
        { to: '/jee', label: 'JEE' },
        { to: '/colleges-info', label: 'Colleges' },
        { to: '/blog', label: 'Blog', external: true },
        { to: '/pricing', label: 'Pricing' },
        { to: '/about', label: 'About' },
      ];

  return (
    <>
      <nav style={S.nav}>
        <div style={S.inner}>
          <Link to="/" style={S.logo}>
            <span style={S.logoMark}>🎓</span>
            <span>After12th <span className="shimmer-text" style={{ fontWeight: 800 }}>AI</span></span>
          </Link>

          {!isMobile && (
            <div style={S.links}>
              {navLinks.map(l => l.external ? (
                <a key={l.to} href={l.to} style={S.link}>{l.label}</a>
              ) : (
                <Link
                  key={l.to} to={l.to}
                  style={{ ...S.link, ...(location.pathname === l.to ? S.activeLink : {}) }}
                >
                  {l.label}
                </Link>
              ))}
              <LanguageToggle style={{ marginLeft: 4 }} />
              {isLoggedIn ? (
                <>
                  {!isApp && <Link to="/app/dashboard" style={S.cta}>Dashboard</Link>}
                  {isApp && (
                    <button onClick={handleLogout} style={{ ...S.cta, background: 'transparent', boxShadow: 'none', border: '1px solid var(--border-strong)' }}>
                      Logout
                    </button>
                  )}
                </>
              ) : (
                <Link to="/login" style={S.cta}>Start Free</Link>
              )}
            </div>
          )}

          {isMobile && (
            <button style={S.hamburger} onClick={() => setMenuOpen(m => !m)}>
              {menuOpen ? '✕' : '☰'}
            </button>
          )}
        </div>

        {isMobile && menuOpen && (
          <div style={S.mobileMenu}>
            {navLinks.map(l => l.external ? (
              <a key={l.to} href={l.to} style={{ ...S.link, fontSize: 15, padding: '12px 14px' }} onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ) : (
              <Link
                key={l.to} to={l.to}
                style={{ ...S.link, fontSize: 15, padding: '12px 14px' }}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            {isLoggedIn
              ? <button onClick={() => { handleLogout(); setMenuOpen(false); }} style={{ ...S.cta, textAlign: 'center', marginTop: 8 }}>Logout</button>
              : <Link to="/login" style={{ ...S.cta, textAlign: 'center', marginTop: 8 }} onClick={() => setMenuOpen(false)}>Start Free</Link>
            }
          </div>
        )}
      </nav>
    </>
  );
}
