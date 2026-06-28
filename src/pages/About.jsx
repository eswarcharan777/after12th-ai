import React, { useState } from 'react';

export default function About() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const submit = e => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="page-enter" style={{ background: '#F8F9FC', minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1a3a6b 100%)', color: 'white', padding: '60px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Sora', fontSize: 'clamp(28px,5vw,48px)', fontWeight: 800, marginBottom: 12 }}>About After12th AI</h1>
          <p style={{ opacity: 0.85, fontSize: 17, maxWidth: 560, margin: '0 auto' }}>
            Built for India's most critical moment — the 2-3 months after Class 12.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 20px', maxWidth: 900 }}>
        <div style={{ background: 'white', borderRadius: 16, padding: 36, marginBottom: 32, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 24, color: '#0A1628', marginBottom: 16 }}>Our Mission</h2>
          <p style={{ color: '#374151', fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
            Every year, 13 lakh+ students appear for NEET and 12 lakh+ for JEE Main. Most of them spend the crucial 2-3 month gap after 12th board exams searching Google for guidance — scattered, expensive coaching centres or overwhelmed by free content that lacks direction.
          </p>
          <p style={{ color: '#374151', fontSize: 16, lineHeight: 1.8 }}>
            After12th AI was built to change this. We combine the power of Claude AI (Anthropic) with India-specific exam data to give every student — regardless of their city or economic background — a personal mentor, 24/7.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 40 }}>
          {[
            ['🎓', 'Student First', 'Every feature is designed around what an Indian Class 12 student actually needs.'],
            ['🤖', 'AI Powered', 'Powered by Claude AI — one of the most capable and safe AI models available.'],
            ['🇮🇳', 'Made for India', 'Hinglish support, Indian college data, NTA-pattern questions, and NCERT alignment.'],
            ['🔒', 'Safe & Private', 'Your data is private. We follow DPDP Act and never sell your information.'],
          ].map(([icon, title, desc]) => (
            <div key={title} style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid #E5E7EB', textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{icon}</div>
              <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 16, color: '#0A1628', marginBottom: 8 }}>{title}</div>
              <div style={{ color: '#6B7280', fontSize: 13, lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div id="contact" style={{ background: 'white', borderRadius: 16, padding: 36, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 24, color: '#0A1628', marginBottom: 8 }}>Contact Us</h2>
          <p style={{ color: '#6B7280', marginBottom: 24 }}>Have a question or suggestion? We'd love to hear from you.</p>
          {sent ? (
            <div style={{ background: '#E8F5E9', color: '#138808', padding: '16px 20px', borderRadius: 10, fontSize: 15, fontWeight: 600 }}>
              ✅ Thank you! We'll get back to you within 24 hours.
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <input placeholder="Your Name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  style={{ padding: '12px 14px', border: '1.5px solid #E5E7EB', borderRadius: 8, fontSize: 15 }} required />
                <input type="email" placeholder="Email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  style={{ padding: '12px 14px', border: '1.5px solid #E5E7EB', borderRadius: 8, fontSize: 15 }} required />
              </div>
              <textarea placeholder="Your message..." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                rows={5} style={{ padding: '12px 14px', border: '1.5px solid #E5E7EB', borderRadius: 8, fontSize: 15, resize: 'vertical' }} required />
              <button type="submit" style={{ background: '#FF6B00', color: 'white', border: 'none', padding: '14px', borderRadius: 8, fontFamily: 'Sora', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
                Send Message →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
