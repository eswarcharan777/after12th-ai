import React from 'react';
const JOBS = [
  { role: 'Research Intern', org: 'IISc Bangalore', stipend: '₹15k/mo', tag: 'Research' },
  { role: 'Frontend Intern', org: 'Zomato', stipend: '₹25k/mo', tag: 'Tech' },
  { role: 'Medical Research', org: 'AIIMS', stipend: 'Unpaid', tag: 'Med' },
  { role: 'Content Writer', org: 'Toppr', stipend: '₹10k/mo', tag: 'Content' },
];
export default function Internships() {
  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 20 }}>💼 Internship Database</h1>
      {JOBS.map((j, i) => (
        <div key={i} className="glass" style={{ padding: 20, borderRadius: 14, marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <h3>{j.role}</h3>
            <div style={{ color: 'var(--text-dim)', fontSize: 13 }}>{j.org} · {j.stipend}</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <span className="badge badge-cyan">{j.tag}</span>
            <a href={`https://internshala.com/internships/${j.tag.toLowerCase()}`} target="_blank" rel="noopener" className="btn-primary" style={{ fontSize: 13 }}>Apply</a>
          </div>
        </div>
      ))}
    </div>
  );
}
