import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function JEEPrep() {
  const [activeTab, setActiveTab] = useState('main');

  const exams = {
    main: {
      name: 'JEE Main', color: '#6366F1', icon: '⚙️',
      questions: '90 questions', marks: '300 marks', duration: '180 min', sessions: '2 sessions per year',
      pattern: [
        { section: 'Physics', questions: '30 (20 MCQ + 10 Numerical)', marks: '100' },
        { section: 'Chemistry', questions: '30 (20 MCQ + 10 Numerical)', marks: '100' },
        { section: 'Mathematics', questions: '30 (20 MCQ + 10 Numerical)', marks: '100' },
      ],
      eligibility: 'Passed/Appearing in Class 12 with PCM. 75% aggregate (65% for SC/ST). Age: No upper limit.',
    },
    advanced: {
      name: 'JEE Advanced', color: '#FF6B00', icon: '🏆',
      questions: 'Variable (60-66)', marks: '360 marks', duration: '3+3 hours', sessions: 'Top 2.5 lakh JEE Main qualifiers',
      pattern: [
        { section: 'Paper 1 - Physics', questions: 'Single/Multiple/Paragraph/Matrix', marks: '~120' },
        { section: 'Paper 1 - Chemistry', questions: 'Single/Multiple/Paragraph/Matrix', marks: '~120' },
        { section: 'Paper 1 - Mathematics', questions: 'Single/Multiple/Paragraph/Matrix', marks: '~120' },
      ],
      eligibility: 'Must qualify JEE Main. Top 2.5 lakh candidates are eligible. Only 2 attempts in consecutive years.',
    },
  };

  const exam = exams[activeTab];
  const topics = {
    Physics: ['Mechanics', 'Waves & Sound', 'Thermal Physics', 'Electrostatics', 'Magnetism', 'EM Induction', 'Optics', 'Modern Physics', 'Semiconductor'],
    Chemistry: ['Mole Concept', 'Atomic Structure', 'Chemical Bonding', 'Thermodynamics', 'Equilibrium', 'Electrochemistry', 'Organic Chemistry', 'Coordination Chemistry', 'D&F Block'],
    Mathematics: ['Algebra', 'Trigonometry', 'Coordinate Geometry', 'Calculus', 'Vectors 3D', 'Probability', 'Statistics', 'Matrices', 'Complex Numbers'],
  };

  return (
    <div className="page-enter" style={{ background: '#F8F9FC', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)', color: 'white', padding: '60px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Sora', fontSize: 'clamp(28px,5vw,52px)', fontWeight: 800, margin: '0 0 12px' }}>
            ⚙️ JEE Main & Advanced Prep
          </h1>
          <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 560, margin: '0 auto 28px' }}>
            IIT admission starts here. AI-powered Physics, Chemistry & Maths coaching with NTA-pattern tests.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/app/tutor" style={{ background: 'white', color: '#6366F1', padding: '12px 28px', borderRadius: 8, fontFamily: 'Sora', fontWeight: 700, fontSize: 15, display: 'inline-block' }}>Ask AI Tutor 🤖</Link>
            <Link to="/app/mocktest" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '2px solid white', padding: '12px 24px', borderRadius: 8, fontFamily: 'Sora', fontWeight: 700, fontSize: 15, display: 'inline-block' }}>Start Mock Test →</Link>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 20px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32, background: 'white', padding: 6, borderRadius: 12, border: '1px solid #E5E7EB', width: 'fit-content' }}>
          {['main', 'advanced'].map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{
              padding: '10px 24px', border: 'none', borderRadius: 8, cursor: 'pointer',
              background: activeTab === t ? exam.color : 'transparent',
              color: activeTab === t ? 'white' : '#6B7280',
              fontFamily: 'Sora', fontWeight: 700, fontSize: 14,
            }}>
              {t === 'main' ? '⚙️ JEE Main' : '🏆 JEE Advanced'}
            </button>
          ))}
        </div>

        {/* Exam Overview */}
        <div style={{ background: 'white', borderRadius: 16, padding: 28, border: '1px solid #E5E7EB', marginBottom: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 22, color: '#0A1628', marginBottom: 20 }}>
            {exam.icon} {exam.name} Overview
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 24 }}>
            {[['Questions', exam.questions], ['Total Marks', exam.marks], ['Duration', exam.duration], ['Sessions', exam.sessions]].map(([label, val]) => (
              <div key={label} style={{ background: '#F8F9FC', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 16, color: exam.color }}>{val}</div>
                <div style={{ color: '#6B7280', fontSize: 12 }}>{label}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#F0F9FF', borderRadius: 10, padding: 16 }}>
            <span style={{ fontWeight: 700, color: '#0369A1' }}>Eligibility: </span>
            <span style={{ color: '#374151', fontSize: 14 }}>{exam.eligibility}</span>
          </div>
        </div>

        {/* Paper Pattern */}
        <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 22, marginBottom: 16 }}>Paper Pattern</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 40 }}>
          {exam.pattern.map((p, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 12, padding: 20, border: `1px solid ${exam.color}30` }}>
              <div style={{ fontFamily: 'Sora', fontWeight: 700, color: exam.color, marginBottom: 8 }}>{p.section}</div>
              <div style={{ fontSize: 14, color: '#374151', marginBottom: 4 }}>📝 {p.questions}</div>
              <div style={{ fontSize: 14, color: '#374151' }}>📊 Max Marks: {p.marks}</div>
            </div>
          ))}
        </div>

        {/* Topics */}
        <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 22, marginBottom: 20 }}>Key Topics to Master</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 48 }}>
          {Object.entries(topics).map(([sub, topicList]) => {
            const icons = { Physics: '⚡', Chemistry: '🧪', Mathematics: '📐' };
            const cols = { Physics: '#6366F1', Chemistry: '#138808', Mathematics: '#FF6B00' };
            return (
              <div key={sub} style={{ background: 'white', borderRadius: 16, padding: 24, border: '1px solid #E5E7EB' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: 28 }}>{icons[sub]}</span>
                  <span style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 18, color: '#0A1628' }}>{sub}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {topicList.map(t => (
                    <span key={t} style={{ background: cols[sub] + '15', color: cols[sub], fontSize: 12, padding: '4px 10px', borderRadius: 6, fontWeight: 500 }}>{t}</span>
                  ))}
                </div>
                <Link to="/app/tutor" style={{ display: 'block', marginTop: 16, background: cols[sub], color: 'white', padding: '10px', borderRadius: 8, textAlign: 'center', fontWeight: 600, fontSize: 14 }}>
                  Study {sub} with AI →
                </Link>
              </div>
            );
          })}
        </div>

        {/* Strategy */}
        <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', borderRadius: 16, padding: 32, color: 'white' }}>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 22, marginBottom: 20 }}>🎯 Strategy to Score 250+ in JEE Main</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              ['📐', 'Maths = Easy Marks', 'Focus on Calculus, Algebra, and Coordinate Geometry. These 3 contribute 40% of Maths marks.'],
              ['⚗️', 'Chemistry is Scoring', 'Physical & Inorganic Chemistry can be mastered with formulas. Target 80+ in Chemistry.'],
              ['🧠', 'Conceptual Physics', 'Never memorise in Physics — understand derivations. Practice 20 numericals daily.'],
              ['⏱', 'Numerical Questions', 'Integer-type questions have no negative marking. Never skip them in JEE Main!'],
            ].map(([icon, title, tip]) => (
              <div key={title} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 15, color: '#F5A623', marginBottom: 6 }}>{title}</div>
                <div style={{ color: '#CBD5E1', fontSize: 13, lineHeight: 1.7 }}>{tip}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
