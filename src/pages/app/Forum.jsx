import React, { useState, useEffect, useCallback } from 'react';
import {
  db, isFirebaseConfigured,
  collection, addDoc, getDocs, doc, getDoc, query, orderBy, limit, where, serverTimestamp, increment, updateDoc,
} from '../../firebase';
import Reveal from '../../components/Reveal';

const SUBJECTS = ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Strategy', 'Career', 'Other'];

function timeAgo(date) {
  if (!date) return 'just now';
  const d = date.toDate ? date.toDate() : new Date(date);
  const sec = Math.floor((Date.now() - d.getTime()) / 1000);
  if (sec < 60) return 'just now';
  if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
  if (sec < 86400) return `${Math.floor(sec / 3600)}h ago`;
  return `${Math.floor(sec / 86400)}d ago`;
}

export default function Forum() {
  const user = JSON.parse(localStorage.getItem('after12th_user') || '{}');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [showAsk, setShowAsk] = useState(false);
  const [openPost, setOpenPost] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerText, setAnswerText] = useState('');
  const [posting, setPosting] = useState(false);
  const [form, setForm] = useState({ title: '', body: '', subject: 'Physics' });

  const inputStyle = { width: '100%', padding: '11px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 14, color: 'var(--text)' };

  const loadPosts = useCallback(async () => {
    setLoading(true);
    if (!isFirebaseConfigured || !db) {
      // Demo fallback — show example posts
      setPosts([
        { id: 'demo1', title: 'How to remember NCERT diagrams better?', body: 'I keep forgetting the diagrams. Any tips?', subject: 'Biology', authorName: 'Demo Student', createdAt: { toDate: () => new Date(Date.now() - 3600000) }, answersCount: 3 },
        { id: 'demo2', title: 'JEE Main strategy for last 60 days', body: 'I have 60 days. PCM strategy please.', subject: 'Strategy', authorName: 'Aspirant', createdAt: { toDate: () => new Date(Date.now() - 86400000) }, answersCount: 5 },
      ]);
      setLoading(false);
      return;
    }
    try {
      const q = query(collection(db, 'forum_posts'), orderBy('createdAt', 'desc'), limit(50));
      const snap = await getDocs(q);
      setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.warn('Forum load failed:', e.message);
      setPosts([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  const askPost = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) return;
    if (!isFirebaseConfigured || !db || !user.uid) { alert('Please log in with a real account to post.'); return; }
    setPosting(true);
    try {
      await addDoc(collection(db, 'forum_posts'), {
        title: form.title.trim(),
        body: form.body.trim(),
        subject: form.subject,
        authorUid: user.uid,
        authorName: user.name || 'Student',
        createdAt: serverTimestamp(),
        answersCount: 0,
      });
      setForm({ title: '', body: '', subject: 'Physics' });
      setShowAsk(false);
      await loadPosts();
    } catch (e) {
      alert('Failed to post: ' + e.message);
    }
    setPosting(false);
  };

  const openThread = async (post) => {
    setOpenPost(post);
    setAnswers([]);
    if (!isFirebaseConfigured || !db) {
      setAnswers([
        { id: 'a1', body: 'Practice 5 diagrams every morning for 21 days. Spaced repetition is key.', authorName: 'Topper Anjali', createdAt: { toDate: () => new Date(Date.now() - 1800000) } },
      ]);
      return;
    }
    try {
      const q = query(collection(db, 'forum_posts', post.id, 'answers'), orderBy('createdAt', 'asc'));
      const snap = await getDocs(q);
      setAnswers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) { console.warn(e.message); }
  };

  const postAnswer = async (e) => {
    e.preventDefault();
    if (!answerText.trim() || !openPost) return;
    if (!isFirebaseConfigured || !db || !user.uid) { alert('Please log in with a real account to reply.'); return; }
    setPosting(true);
    try {
      await addDoc(collection(db, 'forum_posts', openPost.id, 'answers'), {
        body: answerText.trim(),
        authorUid: user.uid,
        authorName: user.name || 'Student',
        createdAt: serverTimestamp(),
      });
      await updateDoc(doc(db, 'forum_posts', openPost.id), { answersCount: increment(1) });
      setAnswerText('');
      await openThread(openPost);
      await loadPosts();
    } catch (e) {
      alert('Failed to post answer: ' + e.message);
    }
    setPosting(false);
  };

  const filtered = filter === 'ALL' ? posts : posts.filter(p => p.subject === filter);
  const subjectColors = { Physics: '#06B6D4', Chemistry: '#10B981', Biology: '#EC4899', Mathematics: '#8B5CF6', Strategy: '#F5A623', Career: '#A78BFA', Other: '#94A3B8' };

  // ── Single thread view ──────────────────────────────────────
  if (openPost) {
    const col = subjectColors[openPost.subject] || '#8B5CF6';
    return (
      <div className="page-enter" style={{ maxWidth: 820, margin: '0 auto' }}>
        <button onClick={() => setOpenPost(null)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'var(--text-mid)', padding: '8px 16px', borderRadius: 10, cursor: 'pointer', fontSize: 13, marginBottom: 20 }}>
          ← Back to forum
        </button>

        <Reveal variant="up">
          <div className="glass" style={{ padding: 28, borderRadius: 18, marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -30, right: -30, width: 110, height: 110, borderRadius: '50%', background: col, filter: 'blur(50px)', opacity: 0.2 }} />
            <div style={{ display: 'flex', gap: 8, marginBottom: 12, position: 'relative' }}>
              <span style={{ background: `${col}22`, color: col, border: `1px solid ${col}55`, padding: '4px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700 }}>{openPost.subject}</span>
              <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>by {openPost.authorName} · {timeAgo(openPost.createdAt)}</span>
            </div>
            <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 22, color: 'var(--text)', marginBottom: 14, position: 'relative' }}>{openPost.title}</h2>
            <p style={{ color: 'var(--text-mid)', fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap', position: 'relative' }}>{openPost.body}</p>
          </div>
        </Reveal>

        <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 17, color: 'var(--text)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 4, height: 22, background: 'var(--aurora)', borderRadius: 2 }} />
          {answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}
        </h3>

        {answers.length === 0 ? (
          <Reveal variant="up">
            <div className="glass" style={{ padding: 28, textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>💭</div>
              <div style={{ color: 'var(--text-dim)' }}>No answers yet. Be the first to help!</div>
            </div>
          </Reveal>
        ) : answers.map((a, i) => (
          <Reveal key={a.id} variant="up" delay={i * 60}>
            <div className="glass" style={{ padding: 22, marginBottom: 12, borderRadius: 14 }}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'center' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--aurora)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Sora', fontWeight: 800, color: 'white', fontSize: 14, boxShadow: 'var(--glow-violet)' }}>
                  {(a.authorName || 'A')[0].toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>{a.authorName}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{timeAgo(a.createdAt)}</div>
                </div>
              </div>
              <p style={{ color: 'var(--text-mid)', fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{a.body}</p>
            </div>
          </Reveal>
        ))}

        <Reveal variant="up">
          <form onSubmit={postAnswer} className="glass" style={{ padding: 22, marginTop: 20, borderRadius: 14 }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text-mid)', marginBottom: 8 }}>Your Answer</label>
            <textarea value={answerText} onChange={e => setAnswerText(e.target.value)}
              placeholder="Share your solution, tip, or insight..." rows={4}
              style={{ ...inputStyle, fontFamily: 'inherit', resize: 'vertical', minHeight: 90 }} />
            <button type="submit" className="btn-primary" disabled={posting || !answerText.trim()}
              style={{ marginTop: 12, padding: '12px 26px', fontSize: 14 }}>
              {posting ? 'Posting...' : 'Post Answer →'}
            </button>
          </form>
        </Reveal>
      </div>
    );
  }

  // ── List view ───────────────────────────────────────────────
  return (
    <div className="page-enter">
      <Reveal variant="up">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 22 }}>
          <div>
            <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 28, color: 'var(--text)', marginBottom: 6 }}>👥 Peer Doubt Forum</h2>
            <p style={{ color: 'var(--text-dim)' }}>Ask doubts. Help peers. Learn together with India's NEET/JEE community.</p>
          </div>
          <button onClick={() => setShowAsk(s => !s)} className="btn-primary" style={{ padding: '12px 24px', fontSize: 14 }}>
            {showAsk ? '✕ Cancel' : '➕ Ask a Doubt'}
          </button>
        </div>
      </Reveal>

      {showAsk && (
        <Reveal variant="scale">
          <form onSubmit={askPost} className="glass-strong pulse-glow" style={{ padding: 26, marginBottom: 24, borderRadius: 18, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'var(--aurora-soft)', opacity: 0.3, pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 17, color: 'var(--text)', marginBottom: 16 }}>Ask the Community</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: 12, marginBottom: 12 }}>
                <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                  placeholder="Your question in 1 line..." style={inputStyle} required />
                <select value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} style={inputStyle}>
                  {SUBJECTS.map(s => <option key={s} value={s} style={{ background: '#0F1530' }}>{s}</option>)}
                </select>
              </div>
              <textarea value={form.body} onChange={e => setForm(p => ({ ...p, body: e.target.value }))}
                placeholder="Add details — what have you tried, where are you stuck..." rows={4}
                style={{ ...inputStyle, fontFamily: 'inherit', resize: 'vertical', minHeight: 100, marginBottom: 12 }} required />
              <button type="submit" disabled={posting} className="btn-primary" style={{ padding: '12px 30px', fontSize: 14 }}>
                {posting ? 'Posting...' : 'Post Doubt →'}
              </button>
            </div>
          </form>
        </Reveal>
      )}

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {['ALL', ...SUBJECTS].map(s => {
          const active = filter === s;
          return (
            <button key={s} onClick={() => setFilter(s)} style={{
              padding: '7px 16px', borderRadius: 22, fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.25s',
              border: `1px solid ${active ? 'var(--violet)' : 'var(--border)'}`,
              background: active ? 'rgba(139,92,246,0.18)' : 'rgba(255,255,255,0.03)',
              color: active ? 'var(--violet-2)' : 'var(--text-mid)',
              boxShadow: active ? '0 4px 14px rgba(139,92,246,0.25)' : 'none',
            }}>{s}</button>
          );
        })}
      </div>

      {!isFirebaseConfigured && (
        <Reveal variant="up">
          <div className="glass" style={{ padding: 16, marginBottom: 16, borderColor: 'rgba(245,166,35,0.4)' }}>
            <span style={{ fontSize: 13, color: 'var(--gold)' }}>⚠️ Showing demo posts — Firebase not configured for forum.</span>
          </div>
        </Reveal>
      )}

      {/* Posts list */}
      {loading ? (
        <Reveal variant="up">
          <div className="glass" style={{ padding: 40, textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>💭</div>
            <div style={{ color: 'var(--text-dim)' }}>Loading discussions...</div>
          </div>
        </Reveal>
      ) : filtered.length === 0 ? (
        <Reveal variant="scale">
          <div className="glass" style={{ padding: 40, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🙋</div>
            <div style={{ color: 'var(--text)', fontFamily: 'Sora', fontWeight: 700, marginBottom: 6 }}>No doubts here yet!</div>
            <div style={{ color: 'var(--text-dim)', fontSize: 14 }}>Be the first to start a discussion.</div>
          </div>
        </Reveal>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map((p, i) => {
            const col = subjectColors[p.subject] || '#8B5CF6';
            return (
              <Reveal key={p.id} variant="up" delay={i * 50}>
                <div onClick={() => openThread(p)} className="glass" style={{
                  padding: 22, cursor: 'pointer', borderRadius: 14, transition: 'all 0.3s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'var(--violet)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(139,92,246,0.25)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 240 }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
                        <span style={{ background: `${col}22`, color: col, border: `1px solid ${col}55`, padding: '3px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700 }}>{p.subject}</span>
                        <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>by {p.authorName} · {timeAgo(p.createdAt)}</span>
                      </div>
                      <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 16, color: 'var(--text)', marginBottom: 6 }}>{p.title}</h3>
                      <p style={{ color: 'var(--text-dim)', fontSize: 13, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.body}</p>
                    </div>
                    <div style={{ textAlign: 'center', minWidth: 70 }}>
                      <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 22, color: 'var(--violet-2)' }}>{p.answersCount || 0}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: 1, textTransform: 'uppercase' }}>Answers</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      )}
    </div>
  );
}
