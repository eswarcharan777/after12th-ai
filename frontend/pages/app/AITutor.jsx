import React, { useState, useRef, useEffect } from 'react';

const suggestions = [
  "Explain Newton's laws of motion for NEET",
  "What is the difference between speed and velocity?",
  "Explain cell division - mitosis vs meiosis",
  "How to solve integration problems in JEE?",
  "Best strategy to score 700+ in NEET?",
  "Mole concept kaise samjhe? (in Hinglish)",
  "Which branch is better - CSE or ECE?",
  "Organic chemistry reaction mechanisms",
];

// ── Speech Recognition (input) ───────────────────────────────────────
const SR = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;
const VOICE_SUPPORTED = !!SR;
const TTS_SUPPORTED = typeof window !== 'undefined' && 'speechSynthesis' in window;

function Message({ msg, onSpeak, speaking }) {
  const isUser = msg.role === 'user';
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: 16, animation: 'fadeUp 0.4s cubic-bezier(.22,1,.36,1)' }}>
      {!isUser && (
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--aurora)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0, marginRight: 10, alignSelf: 'flex-end', boxShadow: 'var(--glow-violet)' }}>🤖</div>
      )}
      <div style={{
        maxWidth: '78%', padding: '14px 18px',
        borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        background: isUser ? 'var(--aurora)' : 'rgba(255,255,255,0.05)',
        backdropFilter: isUser ? 'none' : 'blur(20px)',
        border: isUser ? '1px solid rgba(255,255,255,0.15)' : '1px solid var(--border)',
        color: isUser ? 'white' : 'var(--text)',
        boxShadow: isUser ? '0 6px 22px rgba(139,92,246,0.35)' : '0 4px 16px rgba(0,0,0,0.25)',
        fontSize: 14, lineHeight: 1.7,
        whiteSpace: 'pre-wrap', wordBreak: 'break-word',
        position: 'relative',
      }}>
        {msg.content}
        {!isUser && TTS_SUPPORTED && (
          <button
            onClick={() => onSpeak(msg.content)}
            title={speaking ? 'Stop speaking' : 'Listen to this answer'}
            style={{
              position: 'absolute', top: 8, right: 8,
              width: 28, height: 28, borderRadius: '50%',
              background: speaking ? 'var(--aurora)' : 'rgba(255,255,255,0.06)',
              border: '1px solid var(--border-strong)',
              color: 'var(--text)', cursor: 'pointer', fontSize: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
              boxShadow: speaking ? 'var(--glow-violet)' : 'none',
              animation: speaking ? 'pulseScale 1.2s infinite' : 'none',
            }}
          >{speaking ? '⏸' : '🔊'}</button>
        )}
      </div>
      {isUser && (
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, marginLeft: 10, alignSelf: 'flex-end' }}>👤</div>
      )}
    </div>
  );
}

export default function AITutor() {
  const user = JSON.parse(localStorage.getItem('after12th_user') || '{}');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Namaste ${user.name?.split(' ')[0] || 'Student'}! 🙏 I'm your AI Tutor, here to help you prepare for ${user.exam || 'NEET'}.\n\nAsk me anything by typing OR by tapping the 🎤 mic to speak (English / Hindi / Hinglish):\n• Subject doubts (Physics, Chemistry, Biology, Maths)\n• Exam strategy and tips\n• College & branch guidance\n\nTap 🔊 on my replies to hear me speak. 😊` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceLang, setVoiceLang] = useState('en-IN'); // 'en-IN' | 'hi-IN'
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [speakingIdx, setSpeakingIdx] = useState(-1);
  const bottomRef = useRef(null);
  const recogRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  // Cleanup TTS on unmount
  useEffect(() => () => { if (TTS_SUPPORTED) window.speechSynthesis.cancel(); }, []);

  const speak = (text, idx = -2) => {
    if (!TTS_SUPPORTED) return;
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setSpeakingIdx(-1);
      return;
    }
    // Strip emojis & markdown for cleaner speech
    const clean = text.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '').replace(/\*\*/g, '').replace(/[#•·]/g, '');
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = voiceLang;
    u.rate = 0.95;
    u.pitch = 1.05;
    // Try to find an Indian English / Hindi voice
    const voices = window.speechSynthesis.getVoices();
    const pref = voices.find(v => v.lang === voiceLang) || voices.find(v => v.lang.startsWith(voiceLang.split('-')[0]));
    if (pref) u.voice = pref;
    u.onend = () => setSpeakingIdx(-1);
    u.onerror = () => setSpeakingIdx(-1);
    setSpeakingIdx(idx);
    window.speechSynthesis.speak(u);
  };

  const startListening = () => {
    if (!VOICE_SUPPORTED) {
      alert('Voice input is not supported in this browser. Use Chrome or Edge.');
      return;
    }
    if (listening) { recogRef.current?.stop(); return; }
    const recog = new SR();
    recog.lang = voiceLang;
    recog.interimResults = true;
    recog.continuous = false;
    recog.onstart = () => setListening(true);
    recog.onend = () => setListening(false);
    recog.onerror = (e) => { setListening(false); console.warn('Voice error:', e.error); };
    recog.onresult = (e) => {
      let txt = '';
      for (let i = 0; i < e.results.length; i++) txt += e.results[i][0].transcript;
      setInput(txt);
      if (e.results[e.results.length - 1].isFinal) {
        setTimeout(() => { recog.stop(); send(txt); }, 300);
      }
    };
    recogRef.current = recog;
    recog.start();
  };

  const send = async (text) => {
    const userMsg = (text || input).trim();
    if (!userMsg || loading) return;
    setInput('');
    const updated = [...messages, { role: 'user', content: userMsg }];
    setMessages(updated);
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'tutor', messages: updated.map(m => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      const reply = data.reply;
      const next = [...updated, { role: 'assistant', content: reply }];
      setMessages(next);
      if (autoSpeak) setTimeout(() => speak(reply, next.length - 1), 250);
    } catch (err) {
      setMessages([...updated, { role: 'assistant', content: `Sorry, I couldn't connect right now. Error: ${err.message}\n\nPlease make sure the backend server is running with your API key set.` }]);
    } finally {
      setLoading(false);
    }
  };

  const VoiceControls = () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      {VOICE_SUPPORTED ? (
        <select value={voiceLang} onChange={e => setVoiceLang(e.target.value)}
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 10px', fontSize: 12, color: 'var(--text-mid)' }}>
          <option value="en-IN" style={{ background: '#0F1530' }}>🇮🇳 English (India)</option>
          <option value="hi-IN" style={{ background: '#0F1530' }}>🇮🇳 हिन्दी (Hindi)</option>
          <option value="en-US" style={{ background: '#0F1530' }}>🇺🇸 English (US)</option>
        </select>
      ) : (
        <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>Voice needs Chrome/Edge</span>
      )}
      {TTS_SUPPORTED && (
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-mid)', cursor: 'pointer' }}>
          <input type="checkbox" checked={autoSpeak} onChange={e => setAutoSpeak(e.target.checked)} style={{ accentColor: 'var(--violet)' }} />
          Auto-speak replies
        </label>
      )}
    </div>
  );

  return (
    <div className="page-enter" style={{ height: 'calc(100vh - 130px)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div className="glass" style={{ padding: '16px 22px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 14, borderRadius: 16, flexWrap: 'wrap' }}>
        <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'var(--aurora)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, boxShadow: 'var(--glow-violet)' }}>🤖</div>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 16, color: 'var(--text)' }}>After12th AI Tutor</div>
          <div style={{ fontSize: 12, color: 'var(--green)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 10px var(--green)' }} />
            Online · 🎤 Voice + 💬 Text
          </div>
        </div>
        <VoiceControls />
        <button onClick={() => { window.speechSynthesis?.cancel(); setMessages([{ role: 'assistant', content: `Namaste! New chat started. What would you like to learn today? 😊` }]); }}
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: 10, padding: '8px 16px', fontSize: 13, color: 'var(--text-mid)', cursor: 'pointer' }}>
          New Chat
        </button>
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 10, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Try asking:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {suggestions.map((s, i) => (
              <button key={s} onClick={() => send(s)} style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 22,
                padding: '8px 16px', fontSize: 12, color: 'var(--text-mid)', cursor: 'pointer',
                transition: 'all 0.25s', animation: `fadeUp 0.45s ${i * 50}ms backwards`,
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--violet)'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(139,92,246,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-mid)'; e.currentTarget.style.boxShadow = 'none'; }}
              >{s}</button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="glass" style={{ flex: 1, overflowY: 'auto', padding: 22, borderRadius: 16 }}>
        {messages.map((m, i) => (
          <Message key={i} msg={m} onSpeak={(t) => speak(t, i)} speaking={speakingIdx === i} />
        ))}
        {loading && (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--aurora)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, boxShadow: 'var(--glow-violet)' }}>🤖</div>
            <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid var(--border)', padding: '14px 22px', borderRadius: '18px 18px 18px 4px', color: 'var(--text-mid)' }}>
              <span>Thinking</span>
              <span style={{ letterSpacing: 3, animation: 'pulse 1.5s infinite', display: 'inline-block', marginLeft: 4 }}>•••</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Listening indicator */}
      {listening && (
        <div style={{ marginTop: 10, padding: '10px 16px', background: 'rgba(236,72,153,0.15)', border: '1px solid rgba(236,72,153,0.45)', borderRadius: 12, color: 'var(--pink-2)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 10, animation: 'pulseScale 1.2s infinite' }}>
          <span style={{ fontSize: 18 }}>🎤</span>
          <span>Listening... speak now in {voiceLang === 'hi-IN' ? 'Hindi' : 'English'}</span>
        </div>
      )}

      {/* Input row with mic button */}
      <div className="glass" style={{ marginTop: 14, display: 'flex', gap: 8, padding: 10, borderRadius: 14, alignItems: 'center' }}>
        <button
          onClick={startListening}
          title={listening ? 'Stop listening' : 'Tap to speak'}
          disabled={!VOICE_SUPPORTED}
          style={{
            width: 44, height: 44, borderRadius: 10,
            background: listening ? 'linear-gradient(135deg, #EC4899, #EF4444)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${listening ? 'var(--pink)' : 'var(--border)'}`,
            color: listening ? 'white' : (VOICE_SUPPORTED ? 'var(--text)' : 'var(--text-faint)'),
            cursor: VOICE_SUPPORTED ? 'pointer' : 'not-allowed',
            fontSize: 20, flexShrink: 0,
            boxShadow: listening ? '0 0 18px rgba(236,72,153,0.55)' : 'none',
            animation: listening ? 'pulseScale 1.2s infinite' : 'none',
          }}>🎤</button>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder={listening ? '🎤 Listening...' : 'Type or tap 🎤 to speak (English / Hindi / Hinglish)'}
          style={{ flex: 1, border: 'none', padding: '12px 14px', fontSize: 14, outline: 'none', background: 'transparent', color: 'var(--text)' }}
        />
        <button
          onClick={() => send()}
          disabled={loading || !input.trim()}
          className={loading || !input.trim() ? '' : 'btn-primary'}
          style={loading || !input.trim() ? {
            background: 'rgba(255,255,255,0.06)', color: 'var(--text-faint)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '10px 22px', fontSize: 14, fontWeight: 700, cursor: 'not-allowed', fontFamily: 'Sora',
          } : { padding: '10px 24px', fontSize: 14 }}
        >{loading ? '...' : 'Send →'}</button>
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-faint)', textAlign: 'center', marginTop: 8 }}>
        🎤 Voice input · 🔊 Voice output · Powered by Google Gemini · For educational guidance only
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
        @keyframes pulseScale { 0%,100% { transform: scale(1); } 50% { transform: scale(1.08); } }
      `}</style>
    </div>
  );
}
