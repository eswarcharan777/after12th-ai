import React, { useState } from 'react';
import { colleges } from '../../data/colleges';
import Reveal from '../../components/Reveal';

const allStates = [...new Set(colleges.map(c => c.state))].sort();

export default function CollegeFinder() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ exam: 'ALL', type: 'ALL', state: 'ALL', maxFees: 1000000, category: 'General' });
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [rank, setRank] = useState('');
  const [selectedCollege, setSelectedCollege] = useState(null);

  const setFilter = (key, val) => setFilters(p => ({ ...p, [key]: val }));

  const filtered = colleges.filter(c => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.city.toLowerCase().includes(search.toLowerCase()) || c.state.toLowerCase().includes(search.toLowerCase());
    const matchExam = filters.exam === 'ALL' || c.exam === filters.exam || (filters.exam === 'JEE_MAIN' && (c.exam === 'JEE_MAIN' || c.exam === 'JEE_ADV'));
    const matchType = filters.type === 'ALL' || c.type === filters.type;
    const matchState = filters.state === 'ALL' || c.state === filters.state;
    const matchFees = c.fees <= filters.maxFees;
    return matchSearch && matchExam && matchType && matchState && matchFees;
  }).sort((a, b) => a.nirf - b.nirf);

  const getAIShortlist = async () => {
    if (!rank) return;
    setAiLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'college', messages: [{ role: 'user', content: `My predicted rank is ${rank} in ${filters.exam === 'NEET' ? 'NEET' : 'JEE Main'}. Category: ${filters.category}. State preference: ${filters.state === 'ALL' ? 'Any state in India' : filters.state}. Fees budget: ₹${(filters.maxFees / 100000).toFixed(1)}L/year. Please recommend top 6 colleges for me.` }] })
      });
      const data = await res.json();
      try { setAiResult(JSON.parse(data.reply)); } catch { setAiResult({ message: data.reply, shortlist: [] }); }
    } catch { setAiResult({ message: 'Could not connect to AI. Please check server.', shortlist: [] }); }
    finally { setAiLoading(false); }
  };

  const typeColors = { IIT: '#8B5CF6', NIT: '#06B6D4', IIIT: '#14B8A6', AIIMS: '#EC4899', 'Government Medical': '#10B981', Private: '#F5A623', 'State Govt': '#A78BFA' };

  const inputStyle = { padding: '11px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 14, color: 'var(--text)' };

  return (
    <div className="page-enter">
      <Reveal variant="up">
        <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 28, color: 'var(--text)', marginBottom: 6 }}>🏫 College Finder</h2>
        <p style={{ color: 'var(--text-dim)', marginBottom: 22 }}>Search and filter {colleges.length}+ top colleges. Get AI-powered shortlisting based on your rank.</p>
      </Reveal>

      {/* AI Shortlist */}
      <Reveal variant="scale">
        <div className="glass-strong pulse-glow" style={{ padding: 26, marginBottom: 24, position: 'relative', overflow: 'hidden', borderRadius: 18 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'var(--aurora-soft)', opacity: 0.4, pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 16, marginBottom: 14, color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: 10 }}>🤖 AI College Shortlisting</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div>
                <label style={{ fontSize: 11, color: 'var(--text-dim)', display: 'block', marginBottom: 4, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Your Rank</label>
                <input value={rank} onChange={e => { setRank(e.target.value); setAiResult(null); }} placeholder="e.g. 5000" type="number" style={{ ...inputStyle, width: 140 }} />
              </div>
              <div>
                <label style={{ fontSize: 11, color: 'var(--text-dim)', display: 'block', marginBottom: 4, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Exam</label>
                <select value={filters.exam} onChange={e => setFilter('exam', e.target.value)} style={inputStyle}>
                  <option value="NEET" style={{ background: '#0F1530' }}>NEET</option>
                  <option value="JEE_MAIN" style={{ background: '#0F1530' }}>JEE Main</option>
                  <option value="JEE_ADV" style={{ background: '#0F1530' }}>JEE Advanced</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, color: 'var(--text-dim)', display: 'block', marginBottom: 4, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Category</label>
                <select value={filters.category} onChange={e => setFilter('category', e.target.value)} style={inputStyle}>
                  {['General', 'OBC', 'SC', 'ST', 'EWS'].map(c => <option key={c} style={{ background: '#0F1530' }}>{c}</option>)}
                </select>
              </div>
              <button onClick={getAIShortlist} disabled={!rank || aiLoading} className={rank && !aiLoading ? 'btn-primary' : ''}
                style={!rank || aiLoading ? { background: 'rgba(255,255,255,0.06)', color: 'var(--text-faint)', border: '1px solid var(--border)', padding: '11px 24px', borderRadius: 10, fontFamily: 'Sora', fontWeight: 700, fontSize: 14, cursor: 'not-allowed' } : { padding: '11px 26px', fontSize: 14 }}>
                {aiLoading ? 'Finding...' : 'Get AI Shortlist →'}
              </button>
            </div>
            {aiResult && (
              <div style={{ marginTop: 22 }}>
                <p style={{ color: 'var(--text-mid)', fontSize: 14, marginBottom: 14 }}>{aiResult.message}</p>
                {aiResult.shortlist?.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
                    {aiResult.shortlist.map((c, i) => (
                      <div key={i} className="glass" style={{ padding: 16, borderRadius: 12 }}>
                        <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>{c.college}</div>
                        <div style={{ color: 'var(--text-dim)', fontSize: 13, marginBottom: 4 }}>{c.branch} · {c.type}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>📍 {c.location}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>Fees: {c.fees} · Cutoff: {c.cutoff2024}</div>
                        <div style={{ marginTop: 6, fontSize: 12, fontWeight: 700, color: c.chance === 'Safe' ? 'var(--green)' : c.chance === 'Moderate' ? 'var(--gold)' : 'var(--pink-2)' }}>
                          {c.chance === 'Safe' ? '🟢' : c.chance === 'Moderate' ? '🟡' : '🔴'} {c.chance}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Reveal>

      {/* Filters */}
      <Reveal variant="up">
        <div className="glass" style={{ padding: 20, marginBottom: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 12, borderRadius: 14 }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search college / city..." style={inputStyle} />
          <select value={filters.type} onChange={e => setFilter('type', e.target.value)} style={inputStyle}>
            <option value="ALL" style={{ background: '#0F1530' }}>All Types</option>
            {['IIT', 'NIT', 'IIIT', 'AIIMS', 'Government Medical', 'Private', 'State Govt'].map(t => <option key={t} style={{ background: '#0F1530' }}>{t}</option>)}
          </select>
          <select value={filters.state} onChange={e => setFilter('state', e.target.value)} style={inputStyle}>
            <option value="ALL" style={{ background: '#0F1530' }}>All States</option>
            {allStates.map(s => <option key={s} style={{ background: '#0F1530' }}>{s}</option>)}
          </select>
          <div>
            <label style={{ fontSize: 11, color: 'var(--text-dim)', display: 'block', marginBottom: 4, fontWeight: 600 }}>Max Fees: ₹{(filters.maxFees / 100000).toFixed(1)}L</label>
            <input type="range" min="10000" max="600000" step="10000" value={filters.maxFees} onChange={e => setFilter('maxFees', Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--violet)' }} />
          </div>
        </div>
      </Reveal>

      <div style={{ marginBottom: 16, color: 'var(--text-dim)', fontSize: 14 }}>
        Showing <strong style={{ color: 'var(--violet-2)' }}>{filtered.length}</strong> colleges · Sorted by NIRF rank
      </div>

      {/* College List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: 16 }}>
        {filtered.map((c, i) => (
          <Reveal key={c.id} variant="up" delay={(i % 6) * 60}>
            <div onClick={() => setSelectedCollege(selectedCollege?.id === c.id ? null : c)}
              className="glass" style={{
                padding: 22, cursor: 'pointer', transition: 'all 0.3s', borderRadius: 14,
                border: `1px solid ${selectedCollege?.id === c.id ? 'var(--violet)' : 'var(--border)'}`,
                boxShadow: selectedCollege?.id === c.id ? 'var(--glow-violet)' : 'none',
              }}
              onMouseEnter={e => { if (selectedCollege?.id !== c.id) { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'var(--border-strong)'; } }}
              onMouseLeave={e => { if (selectedCollege?.id !== c.id) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border)'; } }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 4 }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>📍 {c.city}, {c.state}</div>
                </div>
                <span style={{ background: (typeColors[c.type] || '#6B7280') + '22', color: typeColors[c.type] || 'var(--text-dim)', padding: '4px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700, border: `1px solid ${(typeColors[c.type] || '#6B7280')}44` }}>{c.type}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
                <div style={{ textAlign: 'center', background: 'rgba(139,92,246,0.10)', borderRadius: 10, padding: 10, border: '1px solid rgba(139,92,246,0.25)' }}>
                  <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 16, color: 'var(--violet-2)' }}>#{c.nirf}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: 1 }}>NIRF</div>
                </div>
                <div style={{ textAlign: 'center', background: 'rgba(6,182,212,0.10)', borderRadius: 10, padding: 10, border: '1px solid rgba(6,182,212,0.25)' }}>
                  <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 14, color: 'var(--cyan-2)' }}>₹{(c.fees / 100000).toFixed(1)}L</div>
                  <div style={{ fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: 1 }}>Fees/yr</div>
                </div>
                <div style={{ textAlign: 'center', background: 'rgba(16,185,129,0.10)', borderRadius: 10, padding: 10, border: '1px solid rgba(16,185,129,0.25)' }}>
                  <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 14, color: 'var(--green)' }}>{c.cutoffs.General}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: 1 }}>Gen Cutoff</div>
                </div>
              </div>

              {selectedCollege?.id === c.id && (
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14, marginTop: 4 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--violet-2)', marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase' }}>Cutoffs 2024 by Category</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6, marginBottom: 12 }}>
                    {Object.entries(c.cutoffs).map(([cat, cut]) => (
                      <div key={cat} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '6px 4px', border: '1px solid var(--border)' }}>
                        <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text)' }}>{cut}</div>
                        <div style={{ fontSize: 10, color: 'var(--text-dim)' }}>{cat}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--violet-2)', marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase' }}>Branches</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {c.branches.map(b => (
                      <span key={b} style={{ background: 'rgba(16,185,129,0.10)', color: 'var(--green)', fontSize: 11, padding: '3px 9px', borderRadius: 8, border: '1px solid rgba(16,185,129,0.25)' }}>{b}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
