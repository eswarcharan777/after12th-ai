import React, { useState } from 'react';
import Reveal from '../../components/Reveal';
import AnimatedNumber from '../../components/AnimatedNumber';

const SITE_URL = 'https://after12th-ai.vercel.app';
const SHARE_MESSAGES = {
  whatsapp: `🎓 Free AI tutor for NEET & JEE — I'm using this!\n\n✨ Personal AI Tutor (Hindi + English)\n✨ 180+ mock test questions\n✨ Rank predictor & college finder\n✨ 100% free forever\n\nTry it: ${SITE_URL}`,
  twitter: `Just found a 100% FREE AI tutor for NEET & JEE 🎓\n\n• AI explains doubts in English + Hindi\n• 180+ mock questions\n• Rank predictor + college finder\n\n${SITE_URL}\n\n#NEET2027 #JEE2027 #EdTech`,
  email: `Subject: Free AI Tutor for NEET/JEE — you should try this\n\nHi,\n\nI found this free AI-powered NEET/JEE prep platform that's actually really good. Has AI tutor, mock tests, rank predictor, college finder — all completely free.\n\nGive it a try: ${SITE_URL}\n\nLet me know what you think!\n`,
  linkedin: `Sharing a great free resource for Indian students preparing for NEET & JEE!\n\nAfter12th AI is a 100% free AI tutoring platform with:\n• AI Tutor (English + Hindi + Hinglish)\n• 180+ mock test questions\n• Rank predictor\n• College finder (113+ colleges)\n• Study planner\n\nNo paywalls. Built for India.\n\nCheck it out: ${SITE_URL}\n\n#NEET #JEE #EducationForAll #IndiaTech`,
};

function StatCard({ label, value, icon, color, suffix }) {
  return (
    <div className="glass" style={{ padding: 22, borderRadius: 14, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -20, right: -20, width: 70, height: 70, borderRadius: '50%', background: color, filter: 'blur(40px)', opacity: 0.25 }} />
      <div style={{ fontSize: 32, marginBottom: 8, position: 'relative' }}>{icon}</div>
      <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 28, color, position: 'relative', lineHeight: 1 }}>
        <AnimatedNumber value={value} suffix={suffix || ''} />
      </div>
      <div style={{ color: 'var(--text-dim)', fontSize: 12, marginTop: 6, position: 'relative', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>{label}</div>
    </div>
  );
}

export default function Refer() {
  const user = JSON.parse(localStorage.getItem('after12th_user') || '{}');
  const refCode = (user.uid || 'GUEST').substring(0, 8).toUpperCase();
  const refLink = `${SITE_URL}?ref=${refCode}`;
  const [copied, setCopied] = useState('');

  const copy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(''), 2000);
    });
  };

  const share = (platform) => {
    const msg = encodeURIComponent(SHARE_MESSAGES[platform]);
    const urls = {
      whatsapp: `https://wa.me/?text=${msg}`,
      twitter: `https://twitter.com/intent/tweet?text=${msg}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE_URL)}`,
      email: `mailto:?subject=${encodeURIComponent('Free AI Tutor for NEET/JEE')}&body=${msg}`,
    };
    window.open(urls[platform], '_blank');
  };

  // Local stats (will be cloud-tracked in v2)
  const referredCount = Number(localStorage.getItem('after12th_referred') || 0);

  return (
    <div className="page-enter">
      <Reveal variant="up">
        <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 28, color: 'var(--text)', marginBottom: 6 }}>🤝 Refer a Friend</h2>
        <p style={{ color: 'var(--text-dim)', marginBottom: 24 }}>Help your friends crack NEET/JEE for free. Share After12th AI with anyone.</p>
      </Reveal>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 26, maxWidth: 700 }}>
        <Reveal variant="up" delay={0}><StatCard label="Friends Invited" value={referredCount} icon="👥" color="#8B5CF6" /></Reveal>
        <Reveal variant="up" delay={80}><StatCard label="Total Students Helped" value="10K+" icon="🎓" color="#10B981" /></Reveal>
        <Reveal variant="up" delay={160}><StatCard label="Your Karma" value={referredCount * 10} suffix=" pts" icon="✨" color="#F5A623" /></Reveal>
      </div>

      {/* Referral link */}
      <Reveal variant="scale">
        <div className="glass-strong pulse-glow" style={{ padding: 28, marginBottom: 24, borderRadius: 18, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'var(--aurora-soft)', opacity: 0.4 }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 700, marginBottom: 10, letterSpacing: 1.5, textTransform: 'uppercase' }}>YOUR REFERRAL LINK</div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 14 }}>
              <code style={{
                flex: 1, minWidth: 240, padding: '14px 18px',
                background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)',
                borderRadius: 12, color: 'var(--violet-2)', fontFamily: 'Consolas, monospace',
                fontSize: 14, overflow: 'auto', whiteSpace: 'nowrap',
              }}>{refLink}</code>
              <button onClick={() => copy(refLink, 'link')} className="btn-primary" style={{ padding: '14px 22px', minWidth: 120, justifyContent: 'center' }}>
                {copied === 'link' ? '✓ Copied!' : '📋 Copy Link'}
              </button>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-mid)' }}>
              Share this link anywhere. When friends sign up, they get the same free access — no paywalls.
            </div>
          </div>
        </div>
      </Reveal>

      {/* Quick share buttons */}
      <Reveal variant="up">
        <div className="glass" style={{ padding: 26, marginBottom: 24, borderRadius: 16 }}>
          <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 16, color: 'var(--text)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 4, height: 20, background: 'var(--aurora)', borderRadius: 2 }} />
            Share on Social Media
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
            {[
              { id: 'whatsapp', label: '💬 WhatsApp',   color: '#25D366' },
              { id: 'twitter',  label: '🐦 Twitter / X', color: '#1DA1F2' },
              { id: 'linkedin', label: '💼 LinkedIn',    color: '#0A66C2' },
              { id: 'email',    label: '✉️ Email',       color: '#EA4335' },
            ].map(p => (
              <button key={p.id} onClick={() => share(p.id)} style={{
                padding: '14px 18px', borderRadius: 12, fontFamily: 'Sora', fontWeight: 700, fontSize: 14, cursor: 'pointer',
                background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}55`,
                transition: 'all 0.25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = `${p.color}33`; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${p.color}55`; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${p.color}18`; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >{p.label}</button>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Copy templates */}
      <Reveal variant="up">
        <div className="glass" style={{ padding: 26, borderRadius: 16 }}>
          <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 16, color: 'var(--text)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 4, height: 20, background: 'var(--aurora)', borderRadius: 2 }} />
            Copy Pre-written Messages
          </div>
          {[
            { id: 'whatsapp', label: 'WhatsApp Message' },
            { id: 'twitter',  label: 'Twitter Post' },
            { id: 'linkedin', label: 'LinkedIn Post' },
            { id: 'email',    label: 'Email Template' },
          ].map(t => (
            <div key={t.id} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-mid)' }}>{t.label}</div>
                <button onClick={() => copy(SHARE_MESSAGES[t.id], t.id)} style={{
                  padding: '5px 12px', fontSize: 11, fontWeight: 700,
                  background: copied === t.id ? 'var(--green)' : 'rgba(139,92,246,0.15)',
                  color: copied === t.id ? 'white' : 'var(--violet-2)',
                  border: `1px solid ${copied === t.id ? 'var(--green)' : 'rgba(139,92,246,0.35)'}`,
                  borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s',
                }}>{copied === t.id ? '✓ Copied!' : '📋 Copy'}</button>
              </div>
              <pre style={{
                margin: 0, padding: 14, borderRadius: 10,
                background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)',
                fontFamily: 'inherit', fontSize: 13, color: 'var(--text-mid)',
                whiteSpace: 'pre-wrap', wordBreak: 'break-word', lineHeight: 1.6,
                maxHeight: 140, overflow: 'auto',
              }}>{SHARE_MESSAGES[t.id]}</pre>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
