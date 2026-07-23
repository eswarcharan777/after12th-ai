import React, { useState } from 'react';
export default function CounsellingBook() {
  const [f, setF] = useState({ name: '', phone: '', date: '', topic: 'Career choice' });
  const submit = () => { window.__a12Toast?.('Booking confirmed! Zoom link will be emailed.', 'success'); };
  const inp = { width: '100%', padding: 12, marginBottom: 10, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' };
  return (
    <div className="page-enter" style={{ maxWidth: 600, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>📞 Book Counselling</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>Free 30-min Zoom session</p>
      <div className="glass" style={{ padding: 24, borderRadius: 14 }}>
        <input placeholder="Full name" value={f.name} onChange={e => setF({...f, name: e.target.value})} style={inp} />
        <input placeholder="Phone" value={f.phone} onChange={e => setF({...f, phone: e.target.value})} style={inp} />
        <input type="date" value={f.date} onChange={e => setF({...f, date: e.target.value})} style={inp} />
        <select value={f.topic} onChange={e => setF({...f, topic: e.target.value})} style={inp}>
          <option>Career choice</option><option>Exam strategy</option><option>College selection</option><option>Study plan</option>
        </select>
        <button className="btn-primary" onClick={submit} style={{ width: '100%' }}>Book Free Session</button>
      </div>
    </div>
  );
}
