import React, { useState } from 'react';
export default function SOPWriter() {
  const [f, setF] = useState({ name: '', program: 'MS Computer Science', school: 'MIT', achievements: '', goals: '' });
  const [sop, setSop] = useState(''); const [loading, setLoading] = useState(false);
  const go = async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'tutor', messages: [{ role: 'user', content: `Write a compelling 600-word Statement of Purpose for ${f.name} applying to ${f.program} at ${f.school}. Achievements: ${f.achievements}. Career goals: ${f.goals}. Use strong opening hook, specific stories, and end with why this school.` }] }) });
      setSop((await r.json()).reply);
    } catch { setSop('Error'); } finally { setLoading(false); }
  };
  const inp = { width: '100%', padding: 10, marginBottom: 10, borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' };
  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>📝 SOP Writer</h1>
      <div className="glass" style={{ padding: 20, borderRadius: 14, marginBottom: 20 }}>
        <input placeholder="Your name" value={f.name} onChange={e => setF({...f, name: e.target.value})} style={inp} />
        <input placeholder="Program" value={f.program} onChange={e => setF({...f, program: e.target.value})} style={inp} />
        <input placeholder="School/University" value={f.school} onChange={e => setF({...f, school: e.target.value})} style={inp} />
        <textarea placeholder="Key achievements" value={f.achievements} onChange={e => setF({...f, achievements: e.target.value})} style={{...inp, minHeight: 80}} />
        <textarea placeholder="Career goals" value={f.goals} onChange={e => setF({...f, goals: e.target.value})} style={{...inp, minHeight: 80}} />
        <button className="btn-primary" onClick={go} disabled={loading}>{loading ? 'Writing...' : '✨ Generate SOP'}</button>
      </div>
      {sop && <div className="glass-strong" style={{ padding: 24, borderRadius: 14, whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>{sop}</div>}
    </div>
  );
}
