import React from 'react';
import { Link } from 'react-router-dom';

export default function NEETPrep() {
  const subjects = [
    { name: 'Physics', icon: '⚡', questions: 45, chapters: 29, color: '#6366F1', topics: ['Mechanics', 'Thermodynamics', 'Optics', 'Electrostatics', 'Modern Physics', 'Waves', 'Magnetism'] },
    { name: 'Chemistry', icon: '🧪', questions: 45, chapters: 29, color: '#138808', topics: ['Physical Chemistry', 'Inorganic Chemistry', 'Organic Chemistry', 'Mole Concept', 'Equilibrium', 'Electrochemistry'] },
    { name: 'Biology', icon: '🧬', questions: 90, chapters: 38, color: '#EC4899', topics: ['Cell Biology', 'Genetics', 'Human Physiology', 'Plant Physiology', 'Ecology', 'Biotechnology', 'Reproduction'] },
  ];

  const syllabus = {
    Physics: ['Physical World & Measurement', 'Kinematics', 'Laws of Motion', 'Work Energy Power', 'Rotational Motion', 'Gravitation', 'Thermodynamics', 'Oscillations & Waves', 'Electrostatics', 'Current Electricity', 'Magnetic Effects', 'Electromagnetic Induction', 'Optics', 'Dual Nature of Matter', 'Atoms & Nuclei', 'Electronic Devices'],
    Chemistry: ['Some Basic Concepts', 'Atomic Structure', 'Chemical Bonding', 'States of Matter', 'Thermodynamics', 'Equilibrium', 'Redox Reactions', 'Hydrogen', 'S-block Elements', 'P-block Elements', 'D&F Block Elements', 'Coordination Compounds', 'Organic Chemistry Basics', 'Hydrocarbons', 'Haloalkanes', 'Alcohols Phenols Ethers', 'Aldehydes Ketones', 'Carboxylic Acids', 'Amines', 'Biomolecules', 'Polymers'],
    Biology: ['Cell Theory', 'Biological Classification', 'Plant Kingdom', 'Animal Kingdom', 'Morphology of Plants', 'Anatomy of Plants', 'Cell Division', 'Transport in Plants', 'Mineral Nutrition', 'Photosynthesis', 'Respiration', 'Plant Growth', 'Digestion', 'Breathing & Gas Exchange', 'Body Fluids', 'Locomotion', 'Neural Control', 'Chemical Coordination', 'Reproduction', 'Genetics', 'Molecular Basis of Inheritance', 'Evolution', 'Human Health', 'Microbes', 'Biotechnology', 'Organisms & Environment', 'Ecosystem', 'Biodiversity'],
  };

  const [activeSub, setActiveSub] = React.useState('Biology');

  return (
    <div className="page-enter" style={{ background: '#F8F9FC', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #138808 0%, #1a5c14 100%)', color: 'white', padding: '60px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span style={{ background: 'rgba(255,255,255,0.15)', padding: '4px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>NEET-UG PREPARATION</span>
          <h1 style={{ fontFamily: 'Sora', fontSize: 'clamp(28px,5vw,52px)', fontWeight: 800, margin: '16px 0 12px' }}>
            🩺 Crack NEET-UG with AI
          </h1>
          <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 560, margin: '0 auto 28px' }}>
            700+ marks target. AI-powered concept learning, 10,000+ MCQs, and rank prediction based on real NEET data.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/app/tutor" style={{ background: 'white', color: '#138808', padding: '12px 28px', borderRadius: 8, fontFamily: 'Sora', fontWeight: 700, fontSize: 15, display: 'inline-block' }}>Ask AI Tutor 🤖</Link>
            <Link to="/app/mocktest" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '2px solid white', padding: '12px 24px', borderRadius: 8, fontFamily: 'Sora', fontWeight: 700, fontSize: 15, display: 'inline-block' }}>Take Mock Test →</Link>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 20px' }}>
        {/* Exam Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 48 }}>
          {[['200', 'Total Questions'], ['720', 'Total Marks'], ['+4/-1', 'Marking Scheme'], ['200 min', 'Exam Duration'], ['13 lakh+', 'Students Appear'], ['~1 lakh', 'MBBS Seats']].map(([val, label]) => (
            <div key={label} style={{ background: 'white', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 24, color: '#138808' }}>{val}</div>
              <div style={{ color: '#6B7280', fontSize: 13 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Subjects */}
        <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 26, marginBottom: 20 }}>Subject-wise Preparation</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 48 }}>
          {subjects.map(s => (
            <div key={s.name} style={{ background: 'white', borderRadius: 16, padding: 24, border: `1px solid ${s.color}30`, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 32 }}>{s.icon}</span>
                <div>
                  <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 18, color: '#0A1628' }}>{s.name}</div>
                  <div style={{ color: '#6B7280', fontSize: 13 }}>{s.questions} questions • {s.chapters} chapters</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {s.topics.map(t => (
                  <span key={t} style={{ background: s.color + '15', color: s.color, fontSize: 11, padding: '3px 8px', borderRadius: 6, fontWeight: 500 }}>{t}</span>
                ))}
              </div>
              <Link to="/app/tutor" style={{ display: 'block', marginTop: 16, background: s.color, color: 'white', padding: '10px', borderRadius: 8, textAlign: 'center', fontWeight: 600, fontSize: 14 }}>
                Study {s.name} with AI →
              </Link>
            </div>
          ))}
        </div>

        {/* Syllabus */}
        <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 26, marginBottom: 20 }}>Complete Syllabus</h2>
        <div style={{ background: 'white', borderRadius: 16, padding: 28, border: '1px solid #E5E7EB', marginBottom: 48 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
            {Object.keys(syllabus).map(sub => (
              <button key={sub} onClick={() => setActiveSub(sub)} style={{
                padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer',
                background: activeSub === sub ? '#138808' : '#F3F4F6',
                color: activeSub === sub ? 'white' : '#374151',
                fontWeight: 600, fontSize: 14, fontFamily: 'Sora',
              }}>{sub}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8 }}>
            {syllabus[activeSub].map((ch, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#F8F9FC', borderRadius: 8 }}>
                <span style={{ color: '#138808', fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: 13, color: '#374151' }}>{ch}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', borderRadius: 16, padding: 32, color: 'white' }}>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 22, marginBottom: 20 }}>🎯 Expert Tips to Score 650+</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              ['📚', 'NCERT First', 'Read NCERT Biology line by line. 80% of NEET questions come directly from NCERT text.'],
              ['🔄', 'Revise Daily', 'Revise previous day topics every morning for 30 minutes before starting new chapters.'],
              ['📝', 'Mock Tests', 'Give at least 3 full-length mock tests per week. Analyse every mistake carefully.'],
              ['⏱', 'Time Management', 'In NEET, attempt Biology first (easier marks), then Chemistry, then Physics.'],
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
