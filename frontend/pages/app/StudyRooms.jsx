import React, { useState } from 'react';
const ROOMS = [
  { id: 1, name: 'NEET Grinders 🔥', users: 24, subject: 'Biology', focus: '25 min' },
  { id: 2, name: 'JEE Physics Squad', users: 12, subject: 'Physics', focus: '45 min' },
  { id: 3, name: 'Chem Study Room', users: 8, subject: 'Chemistry', focus: '25 min' },
  { id: 4, name: 'Quiet Focus 🎧', users: 31, subject: 'All', focus: '50 min' },
];
export default function StudyRooms() {
  const [inRoom, setInRoom] = useState(null);
  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 20 }}>📺 Live Study Rooms</h1>
      {inRoom ? (
        <div className="glass-strong pulse-glow" style={{ padding: 30, borderRadius: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div><h3>{inRoom.name}</h3><div>{inRoom.users} studying now · Timer: {inRoom.focus}</div></div>
            <button className="btn-outline" onClick={() => setInRoom(null)}>Leave</button>
          </div>
          <div className="glass" style={{ padding: 16, borderRadius: 10, marginTop: 20, minHeight: 200 }}>
            <div style={{ fontSize: 12, color: 'var(--violet-2)', fontWeight: 700, marginBottom: 8 }}>ROOM CHAT</div>
            <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>Chat is quiet · Focus mode active 🤫</div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
          {ROOMS.map(r => (
            <div key={r.id} className="glass" style={{ padding: 20, borderRadius: 14 }}>
              <h3>{r.name}</h3>
              <div style={{ color: 'var(--text-dim)', fontSize: 13, marginBottom: 12 }}>{r.subject} · {r.focus} timer</div>
              <div className="badge badge-green" style={{ marginBottom: 12 }}>🟢 {r.users} online</div>
              <button className="btn-primary" onClick={() => setInRoom(r)} style={{ width: '100%' }}>Join Room →</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
