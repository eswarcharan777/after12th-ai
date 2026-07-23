import React, { useState } from 'react';
export default function ExamCenter() {
  const [city, setCity] = useState('Mumbai');
  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>📍 Exam Center Finder</h1>
      <input value={city} onChange={e => setCity(e.target.value)} placeholder="Your city"
        style={{ padding: 12, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', marginBottom: 16, width: '100%', maxWidth: 300 }} />
      <div className="glass" style={{ padding: 6, borderRadius: 16, overflow: 'hidden' }}>
        <iframe title="Exam Centers" src={`https://maps.google.com/maps?q=NEET+exam+center+${encodeURIComponent(city)}&output=embed`}
          style={{ width: '100%', height: 500, border: 0, borderRadius: 12 }} />
      </div>
    </div>
  );
}
