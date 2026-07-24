import React from 'react';
import { Link } from 'react-router-dom';

export default function ComingSoon({ title, emoji = '🚧', description, plannedFor = 'a future update' }) {
  return (
    <div className="page-enter" style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', padding: '40px 20px' }}>
      <div style={{ fontSize: 72, marginBottom: 10 }}>{emoji}</div>
      <h1 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 34, marginBottom: 8, background: 'var(--aurora)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        {title}
      </h1>
      <div style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 999, background: 'rgba(245,166,35,0.15)', border: '1px solid rgba(245,166,35,0.4)', color: '#FCD34D', fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 22 }}>
        Coming Soon
      </div>
      {description && (
        <p style={{ color: 'var(--text-dim)', fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
          {description}
        </p>
      )}
      <p style={{ color: 'var(--text-faint)', fontSize: 13, marginBottom: 32 }}>
        We're building this feature for {plannedFor}. In the meantime, explore the other tools already live on After12th AI.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/app/dashboard" className="btn-primary" style={{ padding: '12px 22px' }}>← Back to Dashboard</Link>
        <Link to="/app/tutor" className="btn-outline" style={{ padding: '12px 22px' }}>Try AI Tutor</Link>
      </div>
    </div>
  );
}
