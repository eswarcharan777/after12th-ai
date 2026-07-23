import React, { useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import TiltCard from '../components/TiltCard';
import Reveal from '../components/Reveal';
import Typewriter from '../components/Typewriter';

// Lazy-load the heavy Three.js hero so the rest of the page stays light
const Hero3D = lazy(() => import('../components/Hero3D'));

// Error boundary — if WebGL / three.js fails, fall back to flat gradient (never blank page)
class SafeBoundary extends React.Component {
  constructor(p) { super(p); this.state = { failed: false }; }
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(err) { console.warn('Hero3D failed, using fallback:', err); }
  render() { return this.state.failed ? null : this.props.children; }
}

const colors = {
  saffron: '#8B5CF6', navy: '#0B0F1F', green: '#10B981',
  gold: '#F5A623', offwhite: 'rgba(255,255,255,0.04)', gray: '#94A3B8',
  violet: '#8B5CF6', pink: '#EC4899', cyan: '#06B6D4',
};

// ── Hero ──────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      background: `linear-gradient(135deg, ${colors.navy} 0%, #112240 60%, #1a3a6b 100%)`,
      color: 'white', padding: '110px 0 90px', position: 'relative', overflow: 'hidden',
      minHeight: 620,
    }}>
      {/* Decorative blobs that show even if 3D fails */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 480, height: 480, borderRadius: '50%', background: 'rgba(255,107,0,0.10)', filter: 'blur(40px)' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -80, width: 360, height: 360, borderRadius: '50%', background: 'rgba(19,136,8,0.10)', filter: 'blur(40px)' }} />

      {/* 3D animated background */}
      <SafeBoundary>
        <Suspense fallback={null}>
          <Hero3D />
        </Suspense>
      </SafeBoundary>

      {/* Dark vignette so text stays readable over 3D scene */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, rgba(10,22,40,0.25) 0%, rgba(10,22,40,0.75) 70%, rgba(10,22,40,0.92) 100%)',
      }} />

      <div className="container" style={{ position: 'relative', textAlign: 'center', zIndex: 2 }}>
        <div className="badge badge-violet" style={{ marginBottom: 24 }}>
          ✨ AI-Powered · 100% Free Forever
        </div>

        <h1 style={{ fontFamily: 'Sora', fontSize: 'clamp(36px, 6.5vw, 72px)', fontWeight: 800, lineHeight: 1.05, marginBottom: 20, letterSpacing: '-0.02em' }}>
          Crack <Typewriter text="NEET & JEE" speed={110} className="shimmer-text" /><br />
          with Your Personal <span style={{ background: 'var(--aurora)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>AI Tutor</span>
        </h1>

        <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: '#CBD5E1', maxWidth: 600, margin: '0 auto 36px', lineHeight: 1.7 }}>
          The only platform that teaches you concepts, conducts mock tests, predicts your rank, and helps you pick the perfect college — all powered by AI.
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 56 }}>
          <Link to="/login" className="btn-primary" style={{ padding: '15px 34px', fontSize: 16 }}>
            Start Free Today ✨
          </Link>
          <Link to="/neet" className="btn-outline" style={{ padding: '14px 30px', fontSize: 15 }}>
            Explore NEET →
          </Link>
        </div>

        {/* Stats — glassmorphic strip */}
        <div className="glass" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', padding: '20px 24px', maxWidth: 760, margin: '0 auto', gap: 16 }}>
          {[
            ['95+', 'Practice Qs', colors.violet],
            ['53+', 'Colleges', colors.pink],
            ['7', 'AI Tools', colors.cyan],
            ['₹0', 'Forever', '#10B981'],
          ].map(([num, label, c]) => (
            <div key={label} style={{ textAlign: 'center', minWidth: 120 }}>
              <div style={{ fontFamily: 'Sora', fontSize: 30, fontWeight: 800, color: c, lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 6, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Features ──────────────────────────────────────────────────────────────
function Features() {
  const features = [
    { icon: '🤖', title: 'AI Tutor', desc: 'Ask any doubt in Physics, Chemistry, Biology or Maths and get step-by-step explanations in English or Hinglish.', color: '#FF6B00' },
    { icon: '📝', title: 'Mock Tests', desc: 'NTA-pattern full tests with real timer, auto-scoring with NEET +4/-1 and JEE marking schemes, and detailed analysis.', color: '#138808' },
    { icon: '📊', title: 'Rank Predictor', desc: 'Enter your mock scores to get estimated AIR & percentile, mapped to historical NEET/JEE data.', color: '#F5A623' },
    { icon: '🏫', title: 'College Finder', desc: 'Browse 500+ IITs, NITs, AIIMS and medical colleges. Filter by rank, branch, state, and fees.', color: '#6366F1' },
    { icon: '🧭', title: 'Branch Guide', desc: 'Not sure between CSE vs MBBS? Take our quiz and get AI-powered career and branch recommendations.', color: '#EC4899' },
    { icon: '📅', title: 'Smart Planner', desc: 'AI builds a personalised day-by-day study timetable based on your exam date and weak subjects.', color: '#14B8A6' },
  ];

  return (
    <section style={{ padding: '100px 0', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="badge badge-violet" style={{ marginBottom: 16 }}>FEATURES</div>
          <h2 className="section-title">Everything you need to crack the exam</h2>
          <p className="section-subtitle" style={{ margin: '12px auto 0', color: 'var(--text-dim)' }}>
            From subject doubts to admission counselling — one platform, one goal: your success.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, perspective: 1200 }}>
          {features.map((f, i) => (
            <Reveal key={f.title} variant="up" delay={i * 90}>
            <TiltCard style={{
              background: 'var(--surface)', backdropFilter: 'blur(20px)',
              borderRadius: 18, padding: 30,
              border: '1px solid var(--border)', cursor: 'default',
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: `linear-gradient(135deg, ${f.color} 0%, ${f.color}aa 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, marginBottom: 16,
                boxShadow: `0 8px 22px ${f.color}55`,
                transform: 'translateZ(30px)',
              }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'Sora', fontSize: 19, fontWeight: 700, color: 'var(--text)', marginBottom: 10, transform: 'translateZ(20px)' }}>{f.title}</h3>
              <p style={{ color: 'var(--text-dim)', fontSize: 14, lineHeight: 1.7 }}>{f.desc}</p>
            </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── How It Works ──────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { step: '01', title: 'Sign Up Free', desc: 'Create your account in 30 seconds. Tell us your target exam (NEET or JEE) and exam date.' },
    { step: '02', title: 'Study with AI Tutor', desc: 'Ask doubts anytime. Get NCERT-level explanations with exam relevance notes after every concept.' },
    { step: '03', title: 'Take Mock Tests', desc: 'Practice with NTA-pattern papers. Track your score, weak topics, and accuracy trends over time.' },
    { step: '04', title: 'Find Your College', desc: 'Enter your predicted rank and get a personalised shortlist of colleges and branches that suit you.' },
  ];

  return (
    <section style={{ padding: '100px 0', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="badge badge-cyan" style={{ marginBottom: 16 }}>HOW IT WORKS</div>
          <h2 className="section-title">Your journey to the top rank</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 32 }}>
          {steps.map((s, i) => (
            <Reveal key={i} variant="up" delay={i * 120} style={{ position: 'relative', textAlign: 'center' }}>
              <div style={{
                width: 68, height: 68, borderRadius: '50%',
                background: 'var(--aurora)',
                color: 'white', fontFamily: 'Sora', fontWeight: 800, fontSize: 20,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 18px',
                boxShadow: 'var(--glow-violet)',
              }}>{s.step}</div>
              <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 10 }}>{s.title}</h3>
              <p style={{ color: 'var(--text-dim)', fontSize: 14, lineHeight: 1.7 }}>{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Exam Cards ──────────────────────────────────────────────────────────
function ExamCards() {
  return (
    <section style={{ padding: '100px 0', position: 'relative' }}>
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 40 }}>Choose Your Exam Track</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {[
            {
              exam: 'NEET-UG', icon: '🩺', color: '#10B981', bg: 'rgba(16,185,129,0.08)',
              subjects: ['Physics', 'Chemistry', 'Biology'],
              duration: '200 minutes', questions: '200 MCQs', marks: '720 marks',
              link: '/neet',
            },
            {
              exam: 'JEE Main', icon: '⚙️', color: colors.cyan, bg: 'rgba(6,182,212,0.08)',
              subjects: ['Physics', 'Chemistry', 'Mathematics'],
              duration: '180 minutes', questions: '90 Qs', marks: '300 marks',
              link: '/jee',
            },
            {
              exam: 'JEE Advanced', icon: '🏆', color: colors.violet, bg: 'rgba(139,92,246,0.08)',
              subjects: ['Physics', 'Chemistry', 'Mathematics'],
              duration: '3 + 3 hours', questions: 'Variable', marks: '360 marks',
              link: '/jee',
            },
          ].map((e, i) => (
            <Reveal key={e.exam} variant={i === 0 ? 'left' : i === 2 ? 'right' : 'up'} delay={i * 110}>
            <TiltCard maxTilt={8} scale={1.04} style={{ background: e.bg, backdropFilter: 'blur(20px)', borderRadius: 18, padding: 30, border: `1px solid ${e.color}40` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 36 }}>{e.icon}</span>
                <div>
                  <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 20, color: 'var(--text)' }}>{e.exam}</h3>
                  <div style={{ color: e.color, fontSize: 13, fontWeight: 600 }}>Start Preparing Now</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                {e.subjects.map(s => (
                  <span key={s} style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${e.color}50`, color: e.color, padding: '4px 12px', borderRadius: 12, fontSize: 12, fontWeight: 600 }}>{s}</span>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
                {[['⏱', e.duration], ['❓', e.questions], ['📊', e.marks]].map(([icon, val]) => (
                  <div key={val} style={{ fontSize: 13, color: 'var(--text-dim)' }}>{icon} {val}</div>
                ))}
              </div>
              <Link to={e.link} style={{ background: e.color, color: 'white', padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, display: 'inline-block' }}>
                Explore {e.exam} →
              </Link>
            </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────
function Testimonials() {
  const reviews = [
    { name: 'Priya Sharma', exam: 'NEET 2025', rank: 'AIR 423', text: 'The AI tutor explains Biology in such simple language! I cleared all my doubts at 2 AM before my exam. Got into AIIMS Jodhpur!', state: 'Rajasthan' },
    { name: 'Arjun Reddy', exam: 'JEE Main 2025', rank: '98.7 percentile', text: 'Maths was my weakness. The step-by-step AI explanations and daily mock tests helped me improve 40 marks in 6 weeks.', state: 'Telangana' },
    { name: 'Ananya Singh', exam: 'NEET 2025', rank: 'AIR 1240', text: 'After 12th I was confused between MBBS and Biotech. The Branch Guide quiz recommended exactly what suited me. Now at Grant Medical!', state: 'Maharashtra' },
    { name: 'Rahul Kumar', exam: 'JEE Advanced 2025', rank: 'AIR 892', text: 'The College Finder tool helped me shortlist NITs and IITs based on my mock rank. Got CSE at NIT Trichy — my dream!', state: 'Bihar' },
  ];

  return (
    <section style={{ padding: '100px 0', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="badge badge-pink" style={{ marginBottom: 16 }}>SUCCESS STORIES</div>
          <h2 className="section-title">Students who cracked it 🏆</h2>
          <p className="section-subtitle" style={{ margin: '12px auto 0', color: 'var(--text-dim)' }}>Real stories from real students across India</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {reviews.map((r, i) => (
            <Reveal key={i} variant="scale" delay={i * 100}>
            <div className="glass" style={{ padding: 26, transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'var(--violet)'; e.currentTarget.style.boxShadow = 'var(--glow-violet)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ color: colors.gold, fontSize: 18, marginBottom: 12 }}>★★★★★</div>
              <p style={{ color: 'var(--text-mid)', fontSize: 14, lineHeight: 1.7, marginBottom: 18, fontStyle: 'italic' }}>"{r.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--aurora)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Sora', fontWeight: 700, fontSize: 16, boxShadow: 'var(--glow-violet)' }}>
                  {r.name[0]}
                </div>
                <div>
                  <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{r.name}</div>
                  <div style={{ color: colors.gold, fontSize: 12 }}>{r.rank} • {r.exam}</div>
                  <div style={{ color: 'var(--text-faint)', fontSize: 11 }}>📍 {r.state}</div>
                </div>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ──────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    ['Is After12th AI free?', 'Yes — 100% free, forever! Every feature (AI Tutor, unlimited mock tests, rank predictor, college finder, study planner) is unlocked for every student. No premium tier, no credit card, no hidden fees.'],
    ['Does it support Hinglish?', 'Absolutely! The AI tutor is trained to respond in English or Hinglish based on how you ask questions. Type naturally — the way you would ask a friend.'],
    ['How accurate is the Rank Predictor?', 'The rank predictor uses historical NEET/JEE data mapped to score ranges. It gives estimated ranks ±15%. Always treat predictions as guidance, not guarantees — exam conditions vary.'],
    ['Can it help with both NEET and JEE?', 'Yes. You can select your target exam during signup. The AI tutor, question bank, mock tests, and college data are all customised for your chosen exam.'],
    ['Is the college data up to date?', 'We update college cutoffs every year based on official NTA and JoSAA data. Cutoffs shown are from 2024; 2025 data will be added after results are published.'],
    ['Can I use it on mobile?', 'Yes! The platform is mobile-first designed. All features work on phones and tablets. Most Indian students use phones, so we prioritise the mobile experience.'],
  ];

  return (
    <section style={{ padding: '100px 0', position: 'relative' }}>
      <div className="container" style={{ maxWidth: 780 }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="badge badge-gold" style={{ marginBottom: 16 }}>FAQ</div>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>
        {faqs.map(([q, a], i) => (
          <Reveal key={i} variant="up" delay={i * 60}>
          <div className="glass" style={{ marginBottom: 12, overflow: 'hidden' }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 26px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
            >
              <span style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: 15, color: 'var(--text)' }}>{q}</span>
              <span style={{ color: 'var(--violet-2)', fontSize: 22, flexShrink: 0, transition: 'transform 0.25s', transform: open === i ? 'rotate(45deg)' : 'rotate(0)', display: 'inline-block' }}>+</span>
            </button>
            {open === i && (
              <div style={{ padding: '0 26px 20px', color: 'var(--text-dim)', fontSize: 14, lineHeight: 1.7 }}>{a}</div>
            )}
          </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── CTA ──────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section style={{ padding: '100px 0', textAlign: 'center', position: 'relative' }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <Reveal variant="scale">
        <div className="glass-strong pulse-glow" style={{ padding: '60px 40px', borderRadius: 24, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'var(--aurora-soft)', opacity: 0.6, pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <h2 style={{ fontFamily: 'Sora', fontSize: 'clamp(30px, 4.5vw, 48px)', fontWeight: 800, marginBottom: 18, letterSpacing: '-0.02em' }}>
              Your dream college is <span className="shimmer-text">waiting</span>. Start now. 🎯
            </h2>
            <p style={{ fontSize: 17, color: 'var(--text-mid)', marginBottom: 36, maxWidth: 540, margin: '0 auto 36px' }}>
              Join thousands of students using After12th AI to prepare smarter and rank higher.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/login" className="btn-primary" style={{ padding: '15px 34px', fontSize: 16 }}>
                Get Started Free →
              </Link>
              <Link to="/app/tutor" className="btn-outline" style={{ padding: '14px 30px', fontSize: 15 }}>
                Try AI Tutor
              </Link>
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="page-enter">
      <Hero />
      <Features />
      <HowItWorks />
      <ExamCards />
      <Testimonials />
      <FAQ />
      <CTA />
    </div>
  );
}
