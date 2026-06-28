import React, { useState, useMemo } from 'react';
import { videos, getSubjects, getChapters } from '../../data/videos';
import Reveal from '../../components/Reveal';

export default function Videos() {
  const user = JSON.parse(localStorage.getItem('after12th_user') || '{}');
  const [exam, setExam] = useState(user.exam || 'ALL');
  const [subject, setSubject] = useState('ALL');
  const [chapter, setChapter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [playing, setPlaying] = useState(null);

  const subjects = useMemo(() => getSubjects(exam), [exam]);
  const chapters = useMemo(() => getChapters(exam, subject), [exam, subject]);

  const filtered = useMemo(() => videos.filter(v => {
    if (exam !== 'ALL' && v.exam !== exam) return false;
    if (subject !== 'ALL' && v.subject !== subject) return false;
    if (chapter !== 'ALL' && v.chapter !== chapter) return false;
    if (search) {
      const q = search.toLowerCase();
      return v.title.toLowerCase().includes(q) || v.chapter.toLowerCase().includes(q) || v.creator.toLowerCase().includes(q);
    }
    return true;
  }), [exam, subject, chapter, search]);

  const inputStyle = { padding: '11px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 14, color: 'var(--text)' };

  return (
    <div className="page-enter">
      <Reveal variant="up">
        <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 28, color: 'var(--text)', marginBottom: 6 }}>🎬 Video Lessons</h2>
        <p style={{ color: 'var(--text-dim)', marginBottom: 22 }}>Curated NEET & JEE concept videos from top educators. {videos.length} lessons available.</p>
      </Reveal>

      {/* Filters */}
      <Reveal variant="up" delay={80}>
        <div className="glass" style={{ padding: 20, marginBottom: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 12, borderRadius: 14 }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search topic..." style={inputStyle} />
          <select value={exam} onChange={e => { setExam(e.target.value); setSubject('ALL'); setChapter('ALL'); }} style={inputStyle}>
            <option value="ALL" style={{ background: '#0F1530' }}>All Exams</option>
            <option value="NEET" style={{ background: '#0F1530' }}>NEET</option>
            <option value="JEE" style={{ background: '#0F1530' }}>JEE</option>
          </select>
          <select value={subject} onChange={e => { setSubject(e.target.value); setChapter('ALL'); }} style={inputStyle}>
            <option value="ALL" style={{ background: '#0F1530' }}>All Subjects</option>
            {subjects.map(s => <option key={s} value={s} style={{ background: '#0F1530' }}>{s}</option>)}
          </select>
          <select value={chapter} onChange={e => setChapter(e.target.value)} style={inputStyle}>
            <option value="ALL" style={{ background: '#0F1530' }}>All Chapters</option>
            {chapters.map(c => <option key={c} value={c} style={{ background: '#0F1530' }}>{c}</option>)}
          </select>
        </div>
      </Reveal>

      <div style={{ marginBottom: 18, color: 'var(--text-dim)', fontSize: 14 }}>
        Showing <strong style={{ color: 'var(--violet-2)' }}>{filtered.length}</strong> videos
      </div>

      {/* Video Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 18 }}>
        {filtered.length === 0 && (
          <Reveal variant="scale">
            <div className="glass" style={{ padding: 40, textAlign: 'center', gridColumn: '1 / -1' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
              <div style={{ color: 'var(--text-dim)', fontSize: 14 }}>No videos match your filters. Try changing them.</div>
            </div>
          </Reveal>
        )}
        {filtered.map((v, i) => (
          <Reveal key={v.id} variant="up" delay={(i % 6) * 60}>
            <div className="glass" style={{ borderRadius: 16, overflow: 'hidden', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'var(--violet)'; e.currentTarget.style.boxShadow = '0 14px 36px rgba(139,92,246,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ position: 'relative', cursor: 'pointer', aspectRatio: '16/9', background: '#000' }}
                onClick={() => setPlaying(playing === v.id ? null : v.id)}>
                {playing === v.id ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${v.videoId}?autoplay=1&rel=0`}
                    title={v.title}
                    width="100%" height="100%"
                    style={{ border: 0, display: 'block' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img src={v.thumbnail} alt={v.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => { e.currentTarget.style.display = 'none'; }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%)' }} />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 64, height: 64, borderRadius: '50%', background: 'var(--aurora)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, boxShadow: 'var(--glow-violet)', transition: 'transform 0.3s' }}>▶</div>
                    <div style={{ position: 'absolute', bottom: 8, right: 10, background: 'rgba(0,0,0,0.8)', color: 'white', padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{v.duration}</div>
                  </>
                )}
              </div>
              <div style={{ padding: 18 }}>
                <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
                  <span className="badge badge-violet" style={{ fontSize: 10 }}>{v.exam}</span>
                  <span className="badge badge-cyan" style={{ fontSize: 10 }}>{v.subject}</span>
                  <span className="badge" style={{ fontSize: 10, color: 'var(--text-dim)' }}>{v.chapter}</span>
                </div>
                <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 8, lineHeight: 1.4 }}>{v.title}</h3>
                <div style={{ fontSize: 12, color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>👤</span> {v.creator}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
