import React, { useState, useRef, useEffect } from 'react';

const SR = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;
const TTS = typeof window !== 'undefined' && 'speechSynthesis' in window;

export default function VoiceChat() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [reply, setReply] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const [history, setHistory] = useState([]);
  const recRef = useRef(null);

  const speak = (text) => {
    if (!TTS) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.0; u.pitch = 1.05;
    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
  };

  const start = () => {
    if (!SR) { window.__a12Toast && window.__a12Toast('Voice not supported in this browser', 'error'); return; }
    const rec = new SR();
    rec.lang = 'en-IN'; rec.interimResults = false; rec.continuous = false;
    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setTranscript(text);
      ask(text);
    };
    recRef.current = rec;
    rec.start();
  };

  const stop = () => { recRef.current && recRef.current.stop(); window.speechSynthesis.cancel(); setSpeaking(false); };

  const ask = async (text) => {
    const persona = localStorage.getItem('a12_persona') || 'friendly';
    const newHistory = [...history, { role: 'user', content: text }];
    setHistory(newHistory);
    try {
      const r = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'tutor', persona, messages: newHistory })
      });
      const j = await r.json();
      const answer = j.reply || 'Sorry, could not understand.';
      setReply(answer);
      setHistory([...newHistory, { role: 'assistant', content: answer }]);
      speak(answer.slice(0, 500));
    } catch (e) { setReply('Error: ' + e.message); }
  };

  useEffect(() => () => window.speechSynthesis && window.speechSynthesis.cancel(), []);

  return (
    <div className="page-enter" style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🗣️ Voice Chat</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 32 }}>Talk to your AI tutor — hands-free.</p>

      <div className="glass-strong pulse-glow" style={{ padding: 40, borderRadius: 20, marginBottom: 24 }}>
        <button
          onClick={listening ? stop : start}
          style={{
            width: 160, height: 160, borderRadius: '50%',
            background: listening ? 'linear-gradient(135deg, #EF4444, #EC4899)' : 'var(--aurora)',
            border: 'none', color: 'white', fontSize: 60, cursor: 'pointer',
            boxShadow: listening ? '0 0 60px rgba(239,68,68,0.8)' : 'var(--glow-violet)',
            animation: listening ? 'pulse-glow 1s infinite' : 'none',
          }}>
          {listening ? '⏹' : '🎤'}
        </button>
        <div style={{ marginTop: 20, fontSize: 15, color: 'var(--text-dim)' }}>
          {listening ? 'Listening...' : speaking ? 'AI speaking...' : 'Tap to talk'}
        </div>
      </div>

      {transcript && (
        <div className="glass" style={{ padding: 16, borderRadius: 12, marginBottom: 14, textAlign: 'left' }}>
          <div style={{ fontSize: 12, color: 'var(--violet-2)', fontWeight: 700, marginBottom: 6 }}>YOU</div>
          {transcript}
        </div>
      )}
      {reply && (
        <div className="glass-strong" style={{ padding: 16, borderRadius: 12, textAlign: 'left', whiteSpace: 'pre-wrap' }}>
          <div style={{ fontSize: 12, color: 'var(--pink-2)', fontWeight: 700, marginBottom: 6 }}>AI TUTOR</div>
          {reply}
        </div>
      )}
    </div>
  );
}
