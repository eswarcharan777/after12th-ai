import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { colleges } from '../data/colleges';

export default function CollegesPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');

  const filtered = colleges.filter(c =>
    (filter === 'ALL' || c.type === filter) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.state.toLowerCase().includes(search.toLowerCase()))
  );

  const types = ['ALL', 'IIT', 'NIT', 'IIIT', 'AIIMS', 'Government Medical', 'Private'];
  const typeColors = { IIT: '#FF6B00', NIT: '#6366F1', IIIT: '#14B8A6', AIIMS: '#EF4444', 'Government Medical': '#138808', Private: '#F5A623' };

  return (
    <div className="page-enter" style={{ background: '#F8F9FC', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1a3a6b 100%)', color: 'white', padding: '60px 0 40px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Sora', fontSize: 'clamp(28px,5vw,48px)', fontWeight: 800, marginBottom: 12 }}>🏫 College Directory</h1>
          <p style={{ opacity: 0.85, fontSize: 17, marginBottom: 28 }}>Explore 28+ top colleges — IITs, NITs, AIIMS, and more. Compare cutoffs, fees, and branches.</p>
          <div style={{ maxWidth: 480, margin: '0 auto', position: 'relative' }}>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search college or state..."
              style={{ width: '100%', padding: '14px 20px', borderRadius: 10, border: 'none', fontSize: 15, outline: 'none' }}
            />
            <span style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 20 }}>🔍</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '32px 20px' }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)} style={{
              padding: '8px 18px', borderRadius: 20, border: `2px solid ${filter === t ? typeColors[t] || '#FF6B00' : '#E5E7EB'}`,
              background: filter === t ? typeColors[t] || '#FF6B00' : 'white',
              color: filter === t ? 'white' : '#374151',
              fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s',
            }}>{t}</button>
          ))}
        </div>

        <div style={{ marginBottom: 16, color: '#6B7280', fontSize: 14 }}>
          Showing {filtered.length} colleges {filter !== 'ALL' ? `(${filter})` : ''}
        </div>

        {/* College Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20, marginBottom: 48 }}>
          {filtered.map(c => (
            <div key={c.id} style={{ background: 'white', borderRadius: 16, padding: 24, border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                  <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 16, color: '#0A1628', marginBottom: 4 }}>{c.name}</h3>
                  <div style={{ color: '#6B7280', fontSize: 13 }}>📍 {c.city}, {c.state}</div>
                </div>
                <div style={{
                  background: (typeColors[c.type] || '#6B7280') + '18',
                  color: typeColors[c.type] || '#6B7280',
                  padding: '4px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700,
                }}>{c.type}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
                <div style={{ background: '#F8F9FC', borderRadius: 8, padding: '10px 12px', fontSize: 12 }}>
                  <div style={{ color: '#6B7280', marginBottom: 2 }}>NIRF Rank</div>
                  <div style={{ fontFamily: 'Sora', fontWeight: 700, color: '#FF6B00', fontSize: 16 }}>#{c.nirf}</div>
                </div>
                <div style={{ background: '#F8F9FC', borderRadius: 8, padding: '10px 12px', fontSize: 12 }}>
                  <div style={{ color: '#6B7280', marginBottom: 2 }}>Fees/Year</div>
                  <div style={{ fontFamily: 'Sora', fontWeight: 700, color: '#0A1628', fontSize: 15 }}>₹{(c.fees / 100000).toFixed(1)}L</div>
                </div>
              </div>

              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 6, fontWeight: 600 }}>Cutoff 2024 (General AIR / Rank)</div>
                <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 14, color: '#138808' }}>
                  General: {c.cutoffs.General} | OBC: {c.cutoffs.OBC}
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 6, fontWeight: 600 }}>Available Branches</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {c.branches.slice(0, 4).map(b => (
                    <span key={b} style={{ background: '#F3F4F6', color: '#374151', fontSize: 11, padding: '2px 8px', borderRadius: 4 }}>{b}</span>
                  ))}
                  {c.branches.length > 4 && <span style={{ color: '#6B7280', fontSize: 11 }}>+{c.branches.length - 4} more</span>}
                </div>
              </div>

              <Link to="/app/rank" style={{
                display: 'block', textAlign: 'center',
                background: typeColors[c.type] || '#FF6B00', color: 'white',
                padding: '10px', borderRadius: 8, fontWeight: 600, fontSize: 13,
              }}>Check My Eligibility →</Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #FF6B00, #FF8C33)', borderRadius: 16, padding: 32, textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 24, marginBottom: 12 }}>
            Want personalised college recommendations?
          </h2>
          <p style={{ opacity: 0.9, marginBottom: 20 }}>Take a mock test, get your predicted rank, and our AI will suggest the best colleges for you.</p>
          <Link to="/app/rank" style={{ background: 'white', color: '#FF6B00', padding: '12px 28px', borderRadius: 8, fontFamily: 'Sora', fontWeight: 700, fontSize: 15, display: 'inline-block' }}>
            Predict My Rank & Find Colleges →
          </Link>
        </div>
      </div>
    </div>
  );
}
