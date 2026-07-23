import React, { useState, useRef } from 'react';

export default function PhotoDoubt() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [question, setQuestion] = useState('Solve this NEET/JEE question step by step.');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      window.__a12Toast && window.__a12Toast('Image too big — max 5 MB', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      const base64 = e.target.result.split(',')[1];
      setImage({ data: base64, mimeType: file.type });
    };
    reader.readAsDataURL(file);
  };

  const solve = async () => {
    if (!image) { window.__a12Toast && window.__a12Toast('Upload a photo first', 'warn'); return; }
    setLoading(true); setReply('');
    try {
      const r = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'photo', image, messages: [{ role: 'user', content: question }] })
      });
      const j = await r.json();
      setReply(j.reply || j.error || 'No response');
      window.__a12Toast && window.__a12Toast('Solved! 📸', 'success');
    } catch (e) {
      setReply('Error: ' + e.message);
    } finally { setLoading(false); }
  };

  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>📸 Photo Doubt</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 24 }}>Snap or upload a question — Gemini Vision solves it instantly.</p>

      <div className="glass" style={{ padding: 24, borderRadius: 16, marginBottom: 20 }}>
        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
          style={{
            border: '2px dashed var(--border-strong)', borderRadius: 14, padding: 40,
            textAlign: 'center', cursor: 'pointer', background: 'var(--surface)',
          }}>
          {preview ? (
            <img src={preview} alt="preview" style={{ maxWidth: '100%', maxHeight: 320, borderRadius: 10 }} />
          ) : (
            <>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📷</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Click or drop a question photo</div>
              <div style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 6 }}>PNG / JPG · max 5 MB</div>
            </>
          )}
          <input ref={fileRef} type="file" accept="image/*" capture="environment" hidden
            onChange={(e) => handleFile(e.target.files[0])} />
        </div>
        <textarea value={question} onChange={(e) => setQuestion(e.target.value)}
          placeholder="Optional: add a hint or ask about a specific part"
          style={{ width: '100%', marginTop: 14, padding: 12, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', minHeight: 60 }} />
        <button className="btn-primary" onClick={solve} disabled={loading} style={{ marginTop: 14 }}>
          {loading ? 'Solving...' : '✨ Solve with AI Vision'}
        </button>
      </div>

      {reply && (
        <div className="glass" style={{ padding: 24, borderRadius: 16, whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
          {reply}
        </div>
      )}
    </div>
  );
}
