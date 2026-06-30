import React, { useState } from 'react';
import Reveal from '../../components/Reveal';

// Evergreen YouTube videos (not live streams — won't expire)
const STATIONS = [
  { id: 'lofi',      name: 'Lofi Hip Hop',      desc: '1 hour lofi for studying',          videoId: 'n61ULEU7CO0', emoji: '🎧', color: '#EC4899' },
  { id: 'lofi2',     name: 'Chill Lofi Mix',    desc: 'Deep focus beats',                  videoId: 'lTRiuFIWV54', emoji: '☕', color: '#8B5CF6' },
  { id: 'rain',      name: 'Rain Sounds',       desc: '10 hours of relaxing rain',         videoId: 'q76bMs-NwRk', emoji: '🌧️', color: '#06B6D4' },
  { id: 'forest',    name: 'Forest Birds',      desc: 'Peaceful forest ambience',          videoId: 'xNN7iTA57jM', emoji: '🌲', color: '#10B981' },
  { id: 'piano',     name: 'Calm Piano',        desc: 'Beautiful instrumental piano',      videoId: '4oStw0r33so', emoji: '🎹', color: '#F5A623' },
  { id: 'classical', name: 'Classical Focus',   desc: 'Mozart, Beethoven for deep work',   videoId: 'BMuknRb7woc', emoji: '🎻', color: '#A78BFA' },
  { id: 'binaural',  name: 'Brain Focus Beats', desc: '40Hz binaural for concentration',   videoId: 'WPni755-Krg', emoji: '🧠', color: '#06B6D4' },
  { id: 'cafe',      name: 'Cafe Ambience',     desc: 'Coffee shop sounds (2 hours)',      videoId: 'BOdLmxy06H0', emoji: '☕', color: '#F5A623' },
  { id: 'ocean',     name: 'Ocean Waves',       desc: 'Calming sea waves',                 videoId: 'V1bFr2SWP1I', emoji: '🌊', color: '#06B6D4' },
  { id: 'fireplace', name: 'Fireplace',         desc: 'Crackling fire sounds',             videoId: 'L_LUpnjgPso', emoji: '🔥', color: '#EF4444' },
];

export default function FocusMusic() {
  const [active, setActive] = useState(STATIONS[0]);

  return (
    <div className="page-enter">
      <Reveal variant="up">
        <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 28, color: 'var(--text)', marginBottom: 6 }}>🎵 Focus Music</h2>
        <p style={{ color: 'var(--text-dim)', marginBottom: 22 }}>Curated sounds to boost concentration. Pairs perfectly with the Pomodoro timer.</p>
      </Reveal>

      {/* Now playing */}
      <Reveal variant="scale">
        <div className="glass-strong pulse-glow" style={{ padding: 24, marginBottom: 22, borderRadius: 18, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'var(--aurora-soft)', opacity: 0.3 }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
              <div style={{
                width: 60, height: 60, borderRadius: 14,
                background: `linear-gradient(135deg, ${active.color}, ${active.color}aa)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 30, boxShadow: `0 8px 24px ${active.color}66`,
              }}>{active.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>● NOW PLAYING</div>
                <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 22, color: 'var(--text)' }}>{active.name}</div>
                <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>{active.desc}</div>
              </div>
            </div>
            <div style={{ borderRadius: 12, overflow: 'hidden', aspectRatio: '16/9', background: '#000' }}>
              <iframe
                key={active.videoId}
                src={`https://www.youtube.com/embed/${active.videoId}?autoplay=1&rel=0`}
                title={active.name}
                width="100%" height="100%"
                style={{ border: 0, display: 'block' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div style={{ textAlign: 'center', marginTop: 10 }}>
              <a
                href={`https://www.youtube.com/watch?v=${active.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 12, color: 'var(--text-faint)', textDecoration: 'underline' }}
              >
                Video not loading? Open on YouTube ↗
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Stations grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
        {STATIONS.map((s, i) => {
          const isOn = s.id === active.id;
          return (
            <Reveal key={s.id} variant="up" delay={i * 50}>
              <div onClick={() => setActive(s)} style={{
                background: isOn ? `${s.color}18` : 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${isOn ? s.color : 'var(--border)'}`,
                boxShadow: isOn ? `0 8px 24px ${s.color}44` : 'none',
                borderRadius: 14, padding: 18, cursor: 'pointer',
                transition: 'all 0.25s',
                display: 'flex', alignItems: 'center', gap: 12,
              }}
                onMouseEnter={e => { if (!isOn) { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = s.color; } }}
                onMouseLeave={e => { if (!isOn) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border)'; } }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: `linear-gradient(135deg, ${s.color}33, ${s.color}11)`,
                  border: `1px solid ${s.color}55`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, flexShrink: 0,
                }}>{s.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 13, color: 'var(--text)' }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-dim)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.desc}</div>
                </div>
                {isOn && <div style={{ fontSize: 18, color: s.color }}>♪</div>}
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal variant="up">
        <div className="glass" style={{ padding: 16, marginTop: 22, borderRadius: 12, fontSize: 12, color: 'var(--text-dim)', textAlign: 'center' }}>
          💡 Tip: Music plays in this tab. Open Pomodoro in another tab for the perfect combo. Mute the tab when timer chime needs to be heard.
        </div>
      </Reveal>
    </div>
  );
}
