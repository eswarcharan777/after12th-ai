import React, { useState } from 'react';
const TOPICS = ['NEET Biology', 'JEE Physics', 'Chemistry Doubts', 'Study Motivation', 'College Life', 'Career Advice'];
const SEED = [
  { id: 1, topic: 'NEET Biology', title: 'Best trick for Genetics numericals?', author: 'Riya', replies: 12, likes: 45, time: '2h' },
  { id: 2, topic: 'JEE Physics', title: 'Rotation problems approach — need help', author: 'Aditya', replies: 8, likes: 22, time: '5h' },
  { id: 3, topic: 'Study Motivation', title: 'Lost motivation after low mock score — what do?', author: 'Karan', replies: 34, likes: 89, time: '1d' },
];
export default function Discussions() {
  const [topic, setTopic] = useState('All');
  const list = topic === 'All' ? SEED : SEED.filter(s => s.topic === topic);
  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 20 }}>🎤 Discussion Threads</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {['All', ...TOPICS].map(t => (
          <button key={t} onClick={() => setTopic(t)} className={topic === t ? 'btn-primary' : 'btn-outline'} style={{ fontSize: 13 }}>{t}</button>
        ))}
      </div>
      {list.map(p => (
        <div key={p.id} className="glass" style={{ padding: 20, borderRadius: 14, marginBottom: 12 }}>
          <div className="badge badge-violet" style={{ marginBottom: 8 }}>{p.topic}</div>
          <h3>{p.title}</h3>
          <div style={{ color: 'var(--text-dim)', fontSize: 12, marginTop: 8 }}>
            by {p.author} · {p.time} ago · 💬 {p.replies} · ❤️ {p.likes}
          </div>
        </div>
      ))}
    </div>
  );
}
