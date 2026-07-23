import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(180deg, transparent 0%, rgba(11,15,31,0.95) 60%)',
      borderTop: '1px solid var(--border)',
      color: 'var(--text)', padding: '56px 0 28px',
      position: 'relative',
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'var(--aurora)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, boxShadow: 'var(--glow-violet)',
              }}>🎓</span>
              <span style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 22 }}>
                After12th <span className="shimmer-text">AI</span>
              </span>
            </div>
            <p style={{ color: 'var(--text-dim)', fontSize: 14, lineHeight: 1.7 }}>
              AI-powered NEET & JEE prep for every Indian student. Free. Forever.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              {[
                ['📘', 'https://facebook.com'],
                ['📸', 'https://instagram.com'],
                ['🐦', 'https://twitter.com'],
                ['▶️', 'https://youtube.com'],
              ].map(([icon, url], i) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer" style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, transition: 'all 0.2s', textDecoration: 'none',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--violet)'; e.currentTarget.style.boxShadow = 'var(--glow-violet)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
                >{icon}</a>
              ))}
            </div>
          </div>

          {[
            { title: 'Exams', items: [['NEET Preparation', '/neet'], ['JEE Main', '/jee'], ['JEE Advanced', '/jee'], ['Mock Tests', '/app/mocktest']] },
            { title: 'Platform', items: [['AI Tutor', '/app/tutor'], ['Rank Predictor', '/app/rank'], ['College Finder', '/app/colleges'], ['Study Planner', '/app/planner']] },
            { title: 'Company', items: [['About Us', '/about'], ['Pricing', '/pricing'], ['Contact', '/about#contact'], ['Privacy', '/about']] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontWeight: 700, marginBottom: 16, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--violet-2)' }}>
                {col.title}
              </div>
              {col.items.map(([label, to]) => (
                <div key={label} style={{ marginBottom: 10 }}>
                  <Link to={to} style={{ color: 'var(--text-dim)', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
                  >{label}</Link>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--border-strong), transparent)', marginBottom: 20 }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <div style={{ color: 'var(--text-faint)', fontSize: 13 }}>
            © 2026 After12th AI · Made with 💜 for India's students
          </div>
          <div style={{ color: 'var(--text-faint)', fontSize: 13 }}>
            Powered by Google Gemini · Secured by Firebase
          </div>
        </div>
      </div>
    </footer>
  );
}
