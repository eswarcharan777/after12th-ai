import React from 'react';
const PLANS = [
  { name: 'Free', price: '₹0', color: '#94A3B8', features: ['AI Tutor (limited)', 'Mock Tests', 'Basic Analytics'], cta: 'Current' },
  { name: 'Pro', price: '₹299/mo', color: '#8B5CF6', features: ['Unlimited AI Tutor', 'Photo Doubt', 'Voice Chat', 'Advanced Analytics', 'Priority Support'], cta: 'Upgrade', popular: true },
  { name: 'Premium', price: '₹999/mo', color: '#F5A623', features: ['Everything in Pro', '1-on-1 Mentor calls', 'Custom Roadmap', 'Interview Practice', 'Certificate'], cta: 'Get Premium' },
];
export default function Premium() {
  return (
    <div className="page-enter" style={{ maxWidth: 1000, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 36, fontWeight: 800, marginBottom: 8, textAlign: 'center' }}>🎓 Upgrade to Pro</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 30, textAlign: 'center' }}>Unlock unlimited AI features · Cancel anytime</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {PLANS.map(p => (
          <div key={p.name} className={p.popular ? 'glass-strong pulse-glow' : 'glass'} style={{ padding: 28, borderRadius: 20, border: `2px solid ${p.color}`, position: 'relative' }}>
            {p.popular && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--aurora)', padding: '4px 14px', borderRadius: 20, fontSize: 11, fontWeight: 800 }}>MOST POPULAR</div>}
            <h3 style={{ fontFamily: 'Sora', color: p.color }}>{p.name}</h3>
            <div style={{ fontSize: 36, fontWeight: 900, margin: '10px 0' }}>{p.price}</div>
            {p.features.map(f => <div key={f} style={{ padding: '6px 0' }}>✓ {f}</div>)}
            <button className={p.popular ? 'btn-primary' : 'btn-outline'} onClick={() => window.__a12Toast?.('Razorpay integration coming soon', 'info')} style={{ width: '100%', marginTop: 20 }}>{p.cta}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
