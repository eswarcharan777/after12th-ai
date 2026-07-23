import React, { useState, useMemo } from 'react';
import { colleges } from '../../data/colleges';

const CATEGORIES = ['General', 'OBC', 'SC', 'ST', 'EWS'];
const MAX_SLOTS = 3;

export default function CollegeCompare() {
  const [category, setCategory] = useState('General');
  const [slots, setSlots] = useState(() => {
    const ids = [1, 2, 18]; // IIT Bombay, IIT Delhi, AIIMS Delhi as defaults
    return ids.map(id => colleges.find(c => c.id === id)?.name).filter(Boolean);
  });
  const [query, setQuery] = useState('');

  const options = useMemo(() => {
    const q = query.trim().toLowerCase();
    return colleges
      .filter(c => !q || c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q) || c.type.toLowerCase().includes(q))
      .slice(0, 30);
  }, [query]);

  const picked = slots.map(n => colleges.find(c => c.name === n)).filter(Boolean);

  const addCollege = (name) => {
    if (slots.includes(name)) return;
    if (slots.length >= MAX_SLOTS) return;
    setSlots([...slots, name]);
    setQuery('');
  };
  const removeCollege = (name) => setSlots(slots.filter(n => n !== name));

  const rows = [
    { key: 'type',      label: 'Type',            fmt: c => c.type },
    { key: 'location',  label: 'Location',        fmt: c => `${c.city}, ${c.state}` },
    { key: 'nirf',      label: 'NIRF Rank',       fmt: c => `#${c.nirf}` },
    { key: 'fees',      label: 'Fees / year',     fmt: c => c.fees >= 100000 ? `₹${(c.fees / 100000).toFixed(2)} L` : `₹${c.fees.toLocaleString()}` },
    { key: 'exam',      label: 'Entrance Exam',   fmt: c => ({ JEE_ADV: 'JEE Advanced', JEE_MAIN: 'JEE Main', NEET: 'NEET-UG' }[c.exam] || c.exam) },
    { key: 'branches',  label: 'Branches',        fmt: c => c.branches.slice(0, 4).join(', ') + (c.branches.length > 4 ? '...' : '') },
    { key: 'cutoff',    label: `Cutoff (${category})`, fmt: c => (c.cutoffs[category] ?? c.cutoffs.General).toLocaleString() },
  ];

  return (
    <div className="page-enter" style={{ maxWidth: 1100, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 6 }}>🎓 College Comparison</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>Compare up to {MAX_SLOTS} colleges side-by-side across NIRF rank, fees, cutoffs, branches and more.</p>

      <div className="glass" style={{ padding: 16, borderRadius: 12, marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 12 }}>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={slots.length >= MAX_SLOTS ? `Remove one to add more (max ${MAX_SLOTS})` : 'Search colleges by name, city or type...'}
            disabled={slots.length >= MAX_SLOTS}
            style={{ flex: 1, minWidth: 240, padding: 10, borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
          />
          <select value={category} onChange={e => setCategory(e.target.value)} style={{ padding: 10, borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}>
            {CATEGORIES.map(c => <option key={c} style={{ background: '#0F1530' }}>{c}</option>)}
          </select>
        </div>
        {query && slots.length < MAX_SLOTS && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', maxHeight: 200, overflowY: 'auto' }}>
            {options.length === 0 && <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>No matches.</span>}
            {options.map(c => (
              <button key={c.id} onClick={() => addCollege(c.name)}
                style={{ fontSize: 12, padding: '6px 12px', borderRadius: 999, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', cursor: 'pointer' }}>
                + {c.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {picked.length === 0 ? (
        <div className="glass" style={{ padding: 40, borderRadius: 12, textAlign: 'center', color: 'var(--text-dim)' }}>
          Search for a college above to start comparing.
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, minWidth: 640 }}>
            <thead>
              <tr>
                <th style={thStyle}></th>
                {picked.map(c => (
                  <th key={c.id} style={{ ...thStyle, textAlign: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                      <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{c.name}</div>
                      <button onClick={() => removeCollege(c.name)} title="Remove"
                        style={{ fontSize: 10, padding: '2px 8px', borderRadius: 999, background: 'rgba(239,68,68,0.15)', border: '1px solid #EF4444', color: '#FCA5A5', cursor: 'pointer' }}>✕ Remove</button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.key} style={{ background: i % 2 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                  <td style={{ ...tdStyle, fontWeight: 700, color: 'var(--violet-2)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>{r.label}</td>
                  {picked.map(c => (
                    <td key={c.id} style={{ ...tdStyle, textAlign: 'center', fontSize: 13, color: 'var(--text)' }}>{r.fmt(c)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const thStyle = { padding: '14px 12px', borderBottom: '1px solid var(--border)', textAlign: 'left', fontSize: 12, color: 'var(--text-dim)', fontWeight: 600 };
const tdStyle = { padding: '12px', borderBottom: '1px solid var(--border)' };
