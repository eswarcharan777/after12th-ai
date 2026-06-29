import React, { useState, useEffect } from 'react';
import Reveal from '../../components/Reveal';
import { db, isFirebaseConfigured, doc, getDoc, setDoc } from '../../firebase';

const LS_KEY = 'after12th_notes';

export default function Notes() {
  const user = JSON.parse(localStorage.getItem('after12th_user') || '{}');
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem(LS_KEY) || '[]'));
  const [active, setActive] = useState(null);
  const [draft, setDraft] = useState({ title: '', body: '', tag: 'Personal' });
  const [savedAt, setSavedAt] = useState(null);

  const tags = ['Personal', 'Physics', 'Chemistry', 'Biology', 'Maths', 'Strategy'];
  const tagColors = { Personal: '#A78BFA', Physics: '#06B6D4', Chemistry: '#10B981', Biology: '#EC4899', Maths: '#8B5CF6', Strategy: '#F5A623' };

  // Load from cloud on mount
  useEffect(() => {
    if (!isFirebaseConfigured || !db || !user.uid || user.uid.startsWith('local-') || user.uid === 'demo') return;
    getDoc(doc(db, 'users', user.uid)).then(snap => {
      if (snap.exists() && snap.data().notes) {
        setNotes(snap.data().notes);
        localStorage.setItem(LS_KEY, JSON.stringify(snap.data().notes));
      }
    }).catch(() => {});
  }, []);

  const persist = async (newNotes) => {
    setNotes(newNotes);
    localStorage.setItem(LS_KEY, JSON.stringify(newNotes));
    setSavedAt(new Date());
    if (isFirebaseConfigured && db && user.uid && !user.uid.startsWith('local-') && user.uid !== 'demo') {
      try { await setDoc(doc(db, 'users', user.uid), { notes: newNotes }, { merge: true }); } catch {}
    }
  };

  const createNote = () => {
    const note = { id: Date.now(), title: 'Untitled', body: '', tag: 'Personal', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    const updated = [note, ...notes];
    persist(updated);
    setActive(note.id);
    setDraft({ title: note.title, body: note.body, tag: note.tag });
  };

  const openNote = (n) => {
    setActive(n.id);
    setDraft({ title: n.title, body: n.body, tag: n.tag });
  };

  const saveNote = () => {
    if (!active) return;
    const updated = notes.map(n => n.id === active ? { ...n, ...draft, updatedAt: new Date().toISOString() } : n);
    persist(updated);
  };

  const deleteNote = (id) => {
    if (!confirm('Delete this note?')) return;
    persist(notes.filter(n => n.id !== id));
    if (active === id) setActive(null);
  };

  const inputStyle = { width: '100%', padding: '11px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 14, color: 'var(--text)', fontFamily: 'inherit' };

  return (
    <div className="page-enter">
      <Reveal variant="up">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 28, color: 'var(--text)', marginBottom: 6 }}>📝 Study Notes</h2>
            <p style={{ color: 'var(--text-dim)' }}>Personal notes synced to the cloud. Markdown-friendly.</p>
          </div>
          <button onClick={createNote} className="btn-primary" style={{ padding: '12px 22px' }}>➕ New Note</button>
        </div>
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20, minHeight: 500 }}>
        {/* Notes list */}
        <Reveal variant="left">
          <div className="glass" style={{ padding: 12, borderRadius: 14, maxHeight: 600, overflowY: 'auto' }}>
            {notes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 30, color: 'var(--text-dim)', fontSize: 13 }}>
                No notes yet.<br />Click "New Note" to start.
              </div>
            ) : notes.map(n => {
              const col = tagColors[n.tag] || 'var(--violet)';
              const isActive = active === n.id;
              return (
                <div key={n.id} onClick={() => openNote(n)} style={{
                  padding: '12px 14px', borderRadius: 10, cursor: 'pointer', marginBottom: 6,
                  background: isActive ? 'rgba(139,92,246,0.15)' : 'transparent',
                  border: `1px solid ${isActive ? 'var(--violet)' : 'transparent'}`,
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: col, boxShadow: `0 0 8px ${col}` }} />
                    <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.title || 'Untitled'}</div>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 4 }}>{n.body.slice(0, 50) || 'Empty note'}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-faint)' }}>{new Date(n.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Editor */}
        <Reveal variant="right">
          <div className="glass" style={{ padding: 24, borderRadius: 14, minHeight: 500, display: 'flex', flexDirection: 'column' }}>
            {!active ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'var(--text-dim)' }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>📓</div>
                <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 8 }}>Pick a note or create new</div>
                <div style={{ fontSize: 13 }}>Your notes sync across devices automatically.</div>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
                  <input value={draft.title} onChange={e => setDraft(d => ({ ...d, title: e.target.value }))} onBlur={saveNote} placeholder="Note title..." style={{ ...inputStyle, fontSize: 18, fontWeight: 700, fontFamily: 'Sora' }} />
                  <button onClick={() => deleteNote(active)} title="Delete" style={{ padding: '10px 14px', background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.4)', color: 'var(--pink-2)', borderRadius: 10, cursor: 'pointer', fontSize: 16 }}>🗑</button>
                </div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
                  {tags.map(t => {
                    const col = tagColors[t];
                    const isOn = draft.tag === t;
                    return (
                      <button key={t} onClick={() => { setDraft(d => ({ ...d, tag: t })); setTimeout(saveNote, 100); }} style={{
                        padding: '5px 12px', fontSize: 11, borderRadius: 16, cursor: 'pointer', fontWeight: 600,
                        border: `1px solid ${isOn ? col : 'var(--border)'}`,
                        background: isOn ? `${col}22` : 'rgba(255,255,255,0.03)',
                        color: isOn ? col : 'var(--text-dim)',
                      }}>{t}</button>
                    );
                  })}
                </div>
                <textarea value={draft.body} onChange={e => setDraft(d => ({ ...d, body: e.target.value }))} onBlur={saveNote} placeholder="Start writing... your thoughts, study notes, formulas to remember, anything!" style={{ ...inputStyle, flex: 1, minHeight: 380, resize: 'vertical', lineHeight: 1.7 }} />
                <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 8 }}>
                  {savedAt ? `Saved at ${savedAt.toLocaleTimeString('en-IN')}` : 'Auto-saves on blur'} · {draft.body.length} characters
                </div>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
