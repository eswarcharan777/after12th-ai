import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { colleges } from '../../data/colleges';
import Reveal from '../../components/Reveal';
import AnimatedNumber from '../../components/AnimatedNumber';

const rankMap = {
  NEET: [
    { minScore: 680, maxScore: 720, minRank: 1, maxRank: 100, percentile: '99.99' },
    { minScore: 650, maxScore: 679, minRank: 100, maxRank: 500, percentile: '99.9' },
    { minScore: 620, maxScore: 649, minRank: 500, maxRank: 1500, percentile: '99.8' },
    { minScore: 590, maxScore: 619, minRank: 1500, maxRank: 3500, percentile: '99.7' },
    { minScore: 560, maxScore: 589, minRank: 3500, maxRank: 7000, percentile: '99.5' },
    { minScore: 530, maxScore: 559, minRank: 7000, maxRank: 12000, percentile: '99.0' },
    { minScore: 500, maxScore: 529, minRank: 12000, maxRank: 20000, percentile: '98.5' },
    { minScore: 470, maxScore: 499, minRank: 20000, maxRank: 30000, percentile: '97.5' },
    { minScore: 440, maxScore: 469, minRank: 30000, maxRank: 45000, percentile: '96' },
    { minScore: 400, maxScore: 439, minRank: 45000, maxRank: 70000, percentile: '94' },
    { minScore: 350, maxScore: 399, minRank: 70000, maxRank: 100000, percentile: '91' },
    { minScore: 300, maxScore: 349, minRank: 100000, maxRank: 150000, percentile: '87' },
    { minScore: 0, maxScore: 299, minRank: 150000, maxRank: 1300000, percentile: '<87' },
  ],
  JEE: [
    { minScore: 280, maxScore: 300, minRank: 1, maxRank: 100, percentile: '99.99' },
    { minScore: 250, maxScore: 279, minRank: 100, maxRank: 500, percentile: '99.9' },
    { minScore: 220, maxScore: 249, minRank: 500, maxRank: 2000, percentile: '99.8' },
    { minScore: 200, maxScore: 219, minRank: 2000, maxRank: 5000, percentile: '99.6' },
    { minScore: 175, maxScore: 199, minRank: 5000, maxRank: 10000, percentile: '99.2' },
    { minScore: 150, maxScore: 174, minRank: 10000, maxRank: 20000, percentile: '98.5' },
    { minScore: 120, maxScore: 149, minRank: 20000, maxRank: 40000, percentile: '97' },
    { minScore: 100, maxScore: 119, minRank: 40000, maxRank: 70000, percentile: '95' },
    { minScore: 75, maxScore: 99, minRank: 70000, maxRank: 120000, percentile: '90' },
    { minScore: 0, maxScore: 74, minRank: 120000, maxRank: 1200000, percentile: '<90' },
  ],
};

function predictRank(score, exam) {
  const map = rankMap[exam] || rankMap.NEET;
  const band = map.find(b => score >= b.minScore && score <= b.maxScore);
  if (!band) return null;
  const estimatedRank = Math.round((band.minRank + band.maxRank) / 2);
  return { ...band, estimatedRank };
}

export default function RankPredictor() {
  const user = JSON.parse(localStorage.getItem('after12th_user') || '{}');
  const savedScores = JSON.parse(localStorage.getItem('after12th_scores') || '[]');
  const lastScore = savedScores[savedScores.length - 1];

  const [exam, setExam] = useState(user.exam === 'JEE' ? 'JEE' : 'NEET');
  const [score, setScore] = useState(lastScore?.score || '');
  const [category, setCategory] = useState('General');
  const [result, setResult] = useState(null);

  const maxScore = exam === 'NEET' ? 720 : 300;

  const predict = () => {
    const s = Number(score);
    if (!s || s < 0 || s > maxScore) return;
    const pred = predictRank(s, exam);
    if (!pred) return;
    const eligible = colleges
      .filter(c => c.exam === (exam === 'NEET' ? 'NEET' : 'JEE_MAIN') || c.exam === (exam === 'JEE' ? 'JEE_ADV' : 'NEET'))
      .filter(c => {
        const cutoff = c.cutoffs[category] || c.cutoffs.General;
        return pred.estimatedRank <= cutoff * 1.5;
      })
      .sort((a, b) => a.nirf - b.nirf)
      .slice(0, 8);
    setResult({ ...pred, eligible, score: s, category });
  };

  const inputStyle = { width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 14, color: 'var(--text)' };

  return (
    <div className="page-enter">
      <Reveal variant="up">
        <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 28, color: 'var(--text)', marginBottom: 6 }}>📈 Rank Predictor</h2>
        <p style={{ color: 'var(--text-dim)', marginBottom: 12 }}>Enter your score to get estimated rank & percentile.</p>
        <div style={{ background: 'rgba(245,166,35,0.10)', border: '1px solid rgba(245,166,35,0.35)', borderRadius: 10, padding: '10px 16px', marginBottom: 24, fontSize: 13, color: 'var(--gold)' }}>
          ⚠️ Estimates only — based on 2024 cutoff data. Actual ranks vary. Not a guarantee of admission.
        </div>
      </Reveal>

      <Reveal variant="up" delay={100}>
        <div className="glass" style={{ padding: 28, marginBottom: 24, maxWidth: 600, borderRadius: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text-mid)', marginBottom: 8 }}>Exam</label>
              <select value={exam} onChange={e => { setExam(e.target.value); setResult(null); }} style={inputStyle}>
                <option value="NEET" style={{ background: '#0F1530' }}>NEET-UG</option>
                <option value="JEE" style={{ background: '#0F1530' }}>JEE Main</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text-mid)', marginBottom: 8 }}>Category</label>
              <select value={category} onChange={e => { setCategory(e.target.value); setResult(null); }} style={inputStyle}>
                {['General', 'OBC', 'SC', 'ST', 'EWS'].map(c => <option key={c} style={{ background: '#0F1530' }}>{c}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 22 }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text-mid)', marginBottom: 8 }}>
              Your Score (out of {maxScore})
              {lastScore && <span style={{ color: 'var(--text-faint)', fontWeight: 400 }}> · Last mock: {lastScore.score}</span>}
            </label>
            <input type="number" min="0" max={maxScore} value={score}
              onChange={e => { setScore(e.target.value); setResult(null); }}
              placeholder={`Enter score (0–${maxScore})`}
              style={inputStyle} />
            <input type="range" min="0" max={maxScore} value={score || 0}
              onChange={e => { setScore(e.target.value); setResult(null); }}
              style={{ width: '100%', marginTop: 12, accentColor: 'var(--violet)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-faint)' }}>
              <span>0</span><span>{maxScore / 2}</span><span>{maxScore}</span>
            </div>
          </div>

          <button onClick={predict} disabled={!score}
            className={score ? 'btn-primary' : ''}
            style={!score ? {
              width: '100%', background: 'rgba(255,255,255,0.05)', color: 'var(--text-faint)', border: '1px solid var(--border)',
              padding: '14px', borderRadius: 12, fontFamily: 'Sora', fontWeight: 700, fontSize: 16, cursor: 'not-allowed',
            } : { width: '100%', padding: '14px', justifyContent: 'center', fontSize: 16 }}>
            Predict My Rank →
          </button>
        </div>
      </Reveal>

      {result && (
        <div className="page-enter">
          <Reveal variant="scale">
            <div className="glass-strong pulse-glow" style={{ padding: 36, marginBottom: 24, textAlign: 'center', borderRadius: 20, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--aurora-soft)', opacity: 0.5, pointerEvents: 'none' }} />
              <div style={{ position: 'relative' }}>
                <div style={{ fontSize: 14, color: 'var(--text-dim)', marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Your Estimated Rank for {exam}</div>
                <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 64, background: 'var(--aurora)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: 6, lineHeight: 1 }}>
                  #<AnimatedNumber value={result.estimatedRank} />
                </div>
                <div style={{ color: 'var(--text-dim)', marginBottom: 22 }}>
                  Range: #{result.minRank.toLocaleString()} – #{result.maxRank.toLocaleString()} · Percentile: ~{result.percentile}
                </div>
                <div style={{ display: 'flex', gap: 28, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {[
                    [result.score, 'Your Score'],
                    [result.percentile, 'Percentile'],
                    [result.category, 'Category'],
                  ].map(([v, l]) => (
                    <div key={l}><div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 22, color: 'var(--text)' }}>{v}</div><div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{l}</div></div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {result.eligible.length > 0 ? (
            <div>
              <Reveal variant="up">
                <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 22, color: 'var(--text)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 4, height: 24, background: 'var(--aurora)', borderRadius: 2 }} />
                  Colleges you may be eligible for
                </h3>
                <p style={{ color: 'var(--text-dim)', fontSize: 13, marginBottom: 18 }}>Based on 2024 cutoffs. Actual eligibility depends on many factors.</p>
              </Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: 16 }}>
                {result.eligible.map((c, i) => {
                  const cutoff = c.cutoffs[result.category] || c.cutoffs.General;
                  const chance = result.estimatedRank <= cutoff ? { t: '🟢 Good Chance', col: 'var(--green)' } : result.estimatedRank <= cutoff * 1.3 ? { t: '🟡 Possible', col: 'var(--gold)' } : { t: '🔴 Reach', col: 'var(--pink)' };
                  return (
                    <Reveal key={c.id} variant="up" delay={i * 70}>
                      <div className="glass" style={{ padding: 22, borderRadius: 14, transition: 'all 0.3s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--violet)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(139,92,246,0.25)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                          <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>{c.name}</div>
                          <span style={{ fontSize: 11, fontWeight: 700, color: chance.col, whiteSpace: 'nowrap' }}>{chance.t}</span>
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 4 }}>📍 {c.city}, {c.state}</div>
                        <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 8 }}>NIRF #{c.nirf} · ₹{(c.fees / 100000).toFixed(1)}L/year</div>
                        <div style={{ fontSize: 12, color: 'var(--text-mid)' }}>2024 Cutoff ({result.category}): <strong style={{ color: 'var(--violet-2)' }}>{cutoff}</strong></div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          ) : (
            <Reveal variant="scale">
              <div className="glass" style={{ padding: 28, textAlign: 'center', borderColor: 'rgba(236,72,153,0.4)' }}>
                <div style={{ fontSize: 40, marginBottom: 14 }}>💪</div>
                <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 18, color: 'var(--pink-2)', marginBottom: 10 }}>Score needs improvement</div>
                <div style={{ color: 'var(--text-dim)', fontSize: 14, marginBottom: 18 }}>
                  Keep practising with mock tests. The AI Tutor can help you target weak areas.
                </div>
                <Link to="/app/tutor" className="btn-primary" style={{ padding: '12px 26px', fontSize: 14 }}>Study with AI Tutor →</Link>
              </div>
            </Reveal>
          )}
        </div>
      )}
    </div>
  );
}
