import React, { useState, useEffect } from 'react';
import { savePlan, loadUserData } from '../../userdata';
import Reveal from '../../components/Reveal';

const subjectsByExam = {
  NEET: ['Physics', 'Chemistry', 'Biology'],
  JEE: ['Physics', 'Chemistry', 'Mathematics'],
};

export default function StudyPlanner() {
  const user = JSON.parse(localStorage.getItem('after12th_user') || '{}');
  const exam = user.exam || 'NEET';

  const [form, setForm] = useState({ examDate: '', level: 'Intermediate (Syllabus partially done)', weakSubjects: [], hoursPerDay: 6 });
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUserData().then(d => { if (d.plan) setPlan(d.plan); }).catch(() => {});
  }, []);

  const subjects = subjectsByExam[exam] || subjectsByExam.NEET;

  const toggleWeak = (sub) => setForm(p => ({ ...p, weakSubjects: p.weakSubjects.includes(sub) ? p.weakSubjects.filter(s => s !== sub) : [...p.weakSubjects, sub] }));

  const generate = async () => {
    if (!form.examDate) return;
    setLoading(true); setPlan(null);
    const daysLeft = Math.ceil((new Date(form.examDate) - new Date()) / (1000 * 60 * 60 * 24));
    try {
      const res = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'planner', messages: [{ role: 'user', content: `Create a study plan for:\n- Exam: ${exam}\n- Exam date: ${form.examDate} (${daysLeft} days from now)\n- Current level: ${form.level}\n- Weak subjects: ${form.weakSubjects.join(', ') || 'None specified'}\n- Available study hours per day: ${form.hoursPerDay} hours\n- Subjects to cover: ${subjects.join(', ')}\n\nGenerate a realistic weekly plan for the first 2 weeks, with daily subject distribution.` }] })
      });
      const data = await res.json();
      let parsed;
      try { parsed = JSON.parse(data.reply); }
      catch { parsed = { overview: data.reply, weeklyPlan: [], tips: [], milestones: [] }; }
      setPlan(parsed); savePlan(parsed);
    } catch {
      setPlan({
        overview: 'Could not connect to AI. Please check your server setup and API key.',
        weeklyPlan: [{ week: 1, theme: 'Foundation Building', days: [
          { day: 'Monday', subjects: [{ subject: 'Physics', topic: 'Mechanics', hours: 3 }, { subject: 'Chemistry', topic: 'Mole Concept', hours: 2 }], totalHours: 5 },
          { day: 'Tuesday', subjects: [{ subject: 'Biology', topic: 'Cell Biology', hours: 3 }, { subject: 'Revision', topic: 'Monday topics', hours: 1 }], totalHours: 4 },
        ]}],
        tips: ['Study Physics first when mind is fresh', 'Revise NCERT diagrams daily'],
        milestones: ['Week 2: Complete syllabus review']
      });
    } finally { setLoading(false); }
  };

  const subjectColors = { Physics: '#06B6D4', Chemistry: '#10B981', Biology: '#EC4899', Mathematics: '#8B5CF6', Revision: '#F5A623', 'Mock Test': '#14B8A6', 'Mock Test Practice': '#14B8A6', 'Full Revision': '#F5A623', 'Rest & Light Study': '#94A3B8' };

  const inputStyle = { width: '100%', padding: '11px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 14, color: 'var(--text)' };

  return (
    <div className="page-enter">
      <Reveal variant="up">
        <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 28, color: 'var(--text)', marginBottom: 6 }}>📅 Smart Study Planner</h2>
        <p style={{ color: 'var(--text-dim)', marginBottom: 24 }}>Tell us about your situation. AI will build a personalised day-by-day timetable.</p>
      </Reveal>

      {/* Form */}
      <Reveal variant="up" delay={100}>
        <div className="glass" style={{ padding: 28, marginBottom: 24, maxWidth: 640, borderRadius: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text-mid)', marginBottom: 8 }}>Target Exam</label>
              <div style={{ ...inputStyle, display: 'flex', alignItems: 'center' }}>
                {exam} {exam === 'NEET' ? '🩺' : '⚙️'}
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text-mid)', marginBottom: 8 }}>Exam Date *</label>
              <input type="date" value={form.examDate} onChange={e => setForm(p => ({ ...p, examDate: e.target.value }))} min={new Date().toISOString().split('T')[0]} style={inputStyle} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 22 }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text-mid)', marginBottom: 8 }}>Current Level</label>
              <select value={form.level} onChange={e => setForm(p => ({ ...p, level: e.target.value }))} style={inputStyle}>
                <option style={{ background: '#0F1530' }}>Beginner (Just started)</option>
                <option style={{ background: '#0F1530' }}>Intermediate (Syllabus partially done)</option>
                <option style={{ background: '#0F1530' }}>Advanced (Most topics done, need revision)</option>
                <option style={{ background: '#0F1530' }}>Revision Mode (Full syllabus done)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text-mid)', marginBottom: 8 }}>
                Study Hours/Day: <strong style={{ color: 'var(--violet-2)' }}>{form.hoursPerDay} hrs</strong>
              </label>
              <input type="range" min={2} max={12} value={form.hoursPerDay} onChange={e => setForm(p => ({ ...p, hoursPerDay: Number(e.target.value) }))} style={{ width: '100%', accentColor: 'var(--violet)', marginTop: 10 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-faint)', marginTop: 2 }}>
                <span>2 hrs</span><span>7 hrs</span><span>12 hrs</span>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text-mid)', marginBottom: 12 }}>Weak Subjects (select all that apply)</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {subjects.map(sub => {
                const active = form.weakSubjects.includes(sub);
                const col = subjectColors[sub] || '#8B5CF6';
                return (
                  <button key={sub} onClick={() => toggleWeak(sub)} style={{
                    padding: '9px 22px', borderRadius: 22,
                    border: `1px solid ${active ? col : 'var(--border)'}`,
                    background: active ? `${col}22` : 'rgba(255,255,255,0.03)',
                    color: active ? col : 'var(--text-mid)',
                    fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all 0.25s',
                    boxShadow: active ? `0 6px 18px ${col}33` : 'none',
                  }}>{sub}</button>
                );
              })}
            </div>
          </div>

          <button onClick={generate} disabled={!form.examDate || loading} className={form.examDate && !loading ? 'btn-primary' : ''}
            style={!form.examDate || loading ? {
              width: '100%', background: 'rgba(255,255,255,0.05)', color: 'var(--text-faint)', border: '1px solid var(--border)',
              padding: '14px', borderRadius: 12, fontFamily: 'Sora', fontWeight: 700, fontSize: 16, cursor: 'not-allowed',
            } : { width: '100%', justifyContent: 'center', padding: '14px', fontSize: 16 }}>
            {loading ? '🤖 Building Your Plan...' : 'Generate My Study Plan →'}
          </button>
        </div>
      </Reveal>

      {/* Plan Results */}
      {plan && (
        <div className="page-enter">
          {plan.overview && (
            <Reveal variant="scale">
              <div className="glass-strong pulse-glow" style={{ padding: 26, marginBottom: 24, borderRadius: 18, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'var(--aurora-soft)', opacity: 0.4 }} />
                <div style={{ position: 'relative' }}>
                  <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 16, color: 'var(--gold)', marginBottom: 10, letterSpacing: 1.5, textTransform: 'uppercase' }}>📋 Your Study Plan Overview</div>
                  <p style={{ color: 'var(--text-mid)', fontSize: 14, lineHeight: 1.7 }}>{plan.overview}</p>
                </div>
              </div>
            </Reveal>
          )}

          {plan.weeklyPlan?.map((week, wi) => (
            <Reveal key={wi} variant="up" delay={wi * 120}>
              <div className="glass" style={{ padding: 26, marginBottom: 20, borderRadius: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--aurora)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Sora', fontWeight: 800, color: 'white', fontSize: 16, boxShadow: 'var(--glow-violet)' }}>W{week.week}</div>
                  <div>
                    <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 17, color: 'var(--text)' }}>Week {week.week}</div>
                    {week.theme && <div style={{ color: 'var(--text-dim)', fontSize: 13 }}>{week.theme}</div>}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 12 }}>
                  {week.days?.map((day, di) => (
                    <Reveal key={di} variant="up" delay={di * 50}>
                      <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 14, border: '1px solid var(--border)' }}>
                        <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
                          <span>{day.day}</span>
                          <span style={{ fontSize: 12, color: 'var(--violet-2)', fontWeight: 600 }}>{day.totalHours}h</span>
                        </div>
                        {day.subjects?.map((s, si) => {
                          const col = subjectColors[s.subject] || '#8B5CF6';
                          return (
                            <div key={si} style={{ marginBottom: 6, padding: '7px 10px', borderRadius: 8, background: `${col}18`, border: `1px solid ${col}33` }}>
                              <div style={{ fontSize: 12, fontWeight: 700, color: col }}>{s.subject}</div>
                              <div style={{ fontSize: 11, color: 'var(--text-mid)' }}>{s.topic} · {s.hours}h</div>
                            </div>
                          );
                        })}
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}

          {plan.tips?.length > 0 && (
            <Reveal variant="up">
              <div className="glass" style={{ padding: 26, marginBottom: 20, borderRadius: 14, borderColor: 'rgba(16,185,129,0.35)' }}>
                <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 16, color: 'var(--green)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>💡 Study Tips</div>
                {plan.tips.map((tip, i) => (
                  <Reveal key={i} variant="up" delay={i * 70}>
                    <div style={{ fontSize: 14, color: 'var(--text-mid)', padding: '7px 0', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--green)', fontWeight: 700, marginTop: 1 }}>✓</span> {tip}
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          )}

          {plan.milestones?.length > 0 && (
            <Reveal variant="up">
              <div className="glass" style={{ padding: 26, borderRadius: 14 }}>
                <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 16, color: 'var(--text)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 4, height: 20, background: 'var(--aurora)', borderRadius: 2 }} />
                  🎯 Milestones
                </div>
                {plan.milestones.map((m, i) => (
                  <Reveal key={i} variant="left" delay={i * 90}>
                    <div style={{ padding: '12px 0', borderBottom: '1px solid var(--border)', display: 'flex', gap: 14, alignItems: 'center' }}>
                      <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--aurora)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'white', flexShrink: 0, boxShadow: 'var(--glow-violet)' }}>{i + 1}</div>
                      <span style={{ fontSize: 14, color: 'var(--text-mid)' }}>{m}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      )}
    </div>
  );
}
