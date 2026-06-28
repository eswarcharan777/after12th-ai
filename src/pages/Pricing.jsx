import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQS = [
  ['Is everything really free?', 'Yes — 100% free, forever. No hidden fees, no premium tier, no credit card. All features are unlocked for every student.'],
  ['Why is it free?', 'After12th AI exists to help every Indian student — regardless of city, background, or budget — crack NEET & JEE. Quality exam prep should not be a privilege.'],
  ['Will you start charging later?', 'No. The free tiers from Google Gemini and Firebase cover our running costs at scale. We have no plans to introduce paid tiers.'],
  ['Are there any usage limits?', 'Fair-use only. The AI tutor handles 10 requests/min and 250/day per project — more than enough for serious daily prep.'],
  ['Will my data be safe?', 'Absolutely. We use industry-standard Firebase Auth for accounts and Firestore security rules so only YOU can read your own progress.'],
  ['Is Hinglish support really good?', 'Yes! Our AI tutor handles English, Hindi, and Hinglish naturally — ask questions however you\'re most comfortable.'],
  ['Does it work on mobile?', 'Yes. The platform is fully responsive and works on any modern browser — Android, iPhone, tablet, laptop.'],
  ['How do I report a bug or suggest a feature?', 'Use the social links in the footer or open an issue on our GitHub. Student feedback shapes the roadmap directly.'],
];

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid var(--border)', padding: '4px 0' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'transparent', border: 'none', cursor: 'pointer',
          padding: '20px 4px', textAlign: 'left',
          fontFamily: 'Sora', fontWeight: 700, fontSize: 15, color: 'var(--text)',
        }}>
        <span>Q: {q}</span>
        <span style={{
          fontSize: 24, color: 'var(--violet-2)', fontWeight: 700,
          transition: 'transform 0.25s', transform: open ? 'rotate(45deg)' : 'rotate(0)',
          display: 'inline-block', lineHeight: 1,
        }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? 280 : 0, overflow: 'hidden',
        transition: 'max-height 0.3s ease, padding 0.3s',
        padding: open ? '0 4px 20px' : '0 4px',
      }}>
        <div style={{ color: 'var(--text-dim)', fontSize: 14, lineHeight: 1.7 }}>{a}</div>
      </div>
    </div>
  );
}

export default function Pricing() {
  const [openIdx, setOpenIdx] = useState(-1);

  const features = [
    '🤖 Unlimited AI Tutor (Physics, Chemistry, Biology, Maths)',
    '📝 Unlimited NTA-pattern Mock Tests',
    '📊 Advanced Rank Predictor',
    '🏫 Full College Finder (50+ colleges with cutoffs)',
    '🧭 AI Branch Guide Quiz',
    '📅 Personalised AI Study Planner',
    '☁️ Cloud-synced progress across devices',
    '🗣️ Hinglish + English support',
    '🔒 Secure private account (Firebase Auth)',
    '🎓 Every NEET/JEE feature — no paywalls',
  ];

  return (
    <div className="page-enter" style={{ minHeight: '100vh' }}>
      <div style={{ padding: '80px 0 40px', textAlign: 'center', position: 'relative' }}>
        <div className="container">
          <div className="badge badge-green" style={{ marginBottom: 18 }}>100% FREE FOREVER</div>
          <h1 className="section-title" style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}>
            Built for Every Indian Student
          </h1>
          <p style={{ color: 'var(--text-dim)', fontSize: 17, maxWidth: 640, margin: '14px auto 0', lineHeight: 1.7 }}>
            No subscriptions. No premium tiers. No credit card. Every NEET & JEE feature is free for every student — because quality prep should not depend on your family's income.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 20px' }}>
        {/* Single FREE plan card — glassmorphic */}
        <div className="glass-strong pulse-glow" style={{ maxWidth: 720, margin: '0 auto 48px', padding: 44, position: 'relative', textAlign: 'center', borderRadius: 24, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'var(--aurora-soft)', opacity: 0.5, pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: -28, left: '50%', transform: 'translateX(-50%)', background: 'var(--aurora)', color: 'white', padding: '6px 22px', borderRadius: 14, fontSize: 11, fontWeight: 800, letterSpacing: 2, boxShadow: 'var(--glow-violet)' }}>
              FOREVER FREE
            </div>
            <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 26, color: 'var(--text)', marginBottom: 12, marginTop: 8 }}>The After12th AI Plan</div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 72, background: 'var(--aurora)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>₹0</span>
              <span style={{ color: 'var(--text-dim)', fontSize: 16 }}>/ forever</span>
            </div>
            <p style={{ color: 'var(--text-dim)', fontSize: 14, marginBottom: 32 }}>One plan. Everything unlocked. Always.</p>

            <div style={{ textAlign: 'left', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: '10px 20px', marginBottom: 32, padding: '0 12px' }}>
              {features.map((f, i) => (
                <div key={i} style={{ fontSize: 14, color: 'var(--text-mid)', display: 'flex', gap: 10 }}>
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <Link to="/login" className="btn-primary" style={{ padding: '15px 38px', fontSize: 16 }}>
              Start Learning Free →
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="glass" style={{ padding: '36px 36px 20px' }}>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 26, marginBottom: 6, textAlign: 'center', color: 'var(--text)' }}>Frequently Asked Questions</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: 14, marginBottom: 22 }}>Click a question to expand</p>
          {FAQS.map(([q, a], i) => (
            <FaqItem key={q} q={q} a={a} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </div>
  );
}
