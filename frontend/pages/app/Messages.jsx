import React, { useState } from 'react';
const CONVOS = [
  { name: 'Riya M.', avatar: '👩‍🎓', last: 'Yaar this problem is hard 😩', time: '5m' },
  { name: 'Aditya K.', avatar: '🧑‍🎓', last: 'Send me the notes na', time: '1h' },
  { name: 'Study Group', avatar: '👥', last: 'Kavya: Anyone up for revision?', time: '2h' },
];
export default function Messages() {
  const [sel, setSel] = useState(0);
  const [msg, setMsg] = useState('');
  const [msgs, setMsgs] = useState([{ from: 'them', text: CONVOS[0].last }, { from: 'me', text: 'Let me help you!' }]);
  const send = () => { if (!msg) return; setMsgs([...msgs, { from: 'me', text: msg }]); setMsg(''); };
  return (
    <div className="page-enter" style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: '280px 1fr', gap: 14, height: '70vh' }}>
      <div className="glass" style={{ padding: 10, borderRadius: 14, overflowY: 'auto' }}>
        <h3 style={{ padding: 10 }}>💌 Messages</h3>
        {CONVOS.map((c, i) => (
          <div key={i} onClick={() => setSel(i)} style={{ padding: 12, borderRadius: 10, cursor: 'pointer', background: sel === i ? 'rgba(139,92,246,0.15)' : 'transparent', marginBottom: 4 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ fontSize: 28 }}>{c.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{c.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.last}</div>
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-faint)' }}>{c.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="glass" style={{ padding: 16, borderRadius: 14, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ marginBottom: 10 }}>{CONVOS[sel].name}</h3>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start', margin: '8px 0' }}>
              <div style={{ padding: '10px 14px', borderRadius: 14, background: m.from === 'me' ? 'var(--aurora)' : 'var(--surface)', maxWidth: '70%' }}>{m.text}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <input value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Message..." style={{ flex: 1, padding: 10, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }} />
          <button className="btn-primary" onClick={send}>Send</button>
        </div>
      </div>
    </div>
  );
}
