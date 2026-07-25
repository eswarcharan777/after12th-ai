import React, { useState, useRef } from 'react';

const COLORS = ['#8B5CF6', '#EC4899', '#06B6D4', '#F5A623', '#10B981', '#F472B6', '#3B82F6', '#EF4444'];

export default function MindMap() {
  const [topic, setTopic] = useState('Photosynthesis');
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const svgRef = useRef(null);

  const generate = async () => {
    setLoading(true); setMap(null); setError('');
    const prompt = `Create a mind map for the NEET/JEE topic "${topic}".
Reply ONLY with strict JSON (no markdown fences, no commentary) in this exact shape:
{
  "center": "${topic}",
  "branches": [
    { "label": "sub-topic short name (max 3 words)", "children": ["short detail 1 (max 5 words)", "detail 2", "detail 3", "detail 4"] }
  ]
}
Give exactly 6 branches. Each branch has exactly 4 children. Keep every label short.`;
    try {
      const r = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'qgen', messages: [{ role: 'user', content: prompt }] }),
      });
      const j = await r.json();
      const cleaned = (j.reply || '').replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
      const parsed = JSON.parse(cleaned);
      if (!parsed.center || !Array.isArray(parsed.branches)) throw new Error('bad shape');
      setMap(parsed);
      window.__a12Toast && window.__a12Toast('Mind map ready 🎨', 'success');
    } catch (e) {
      setError('AI service is waking up — please retry in 15 seconds.');
    } finally { setLoading(false); }
  };

  const download = (kind) => {
    if (!svgRef.current) return;
    const svg = svgRef.current;
    const serialized = new XMLSerializer().serializeToString(svg);
    if (kind === 'svg') {
      const blob = new Blob([serialized], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = `mindmap-${topic}.svg`; a.click();
      URL.revokeObjectURL(url);
    } else if (kind === 'pdf') {
      // Print-to-PDF via browser dialog — no external libraries, works on every browser.
      const w = window.open('', '_blank', 'width=1100,height=800');
      w.document.write(`<!DOCTYPE html><html><head><title>Mind Map — ${topic}</title>
        <style>
          body{margin:0;padding:20px;background:#0B0F1F;font-family:sans-serif}
          h1{color:#fff;font-family:sans-serif;text-align:center;margin:0 0 16px}
          @media print{@page{size:landscape;margin:10mm}body{background:#fff}h1{color:#000}svg text{fill:#000!important}}
        </style></head><body>
        <h1>Mind Map — ${topic}</h1>${serialized}
        <script>window.onload=()=>{setTimeout(()=>window.print(),300)}</script>
      </body></html>`);
      w.document.close();
    }
  };

  return (
    <div className="page-enter" style={{ maxWidth: 1100, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Sora', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🎨 Mind Maps</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 24 }}>AI-generated concept maps you can download as PDF or SVG.</p>

      <div className="glass" style={{ padding: 20, borderRadius: 14, marginBottom: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="Enter a topic..."
          style={{ flex: 1, minWidth: 240, padding: 12, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }} />
        <button className="btn-primary" onClick={generate} disabled={loading || !topic.trim()}>
          {loading ? 'Generating...' : '✨ Generate'}
        </button>
        {map && (
          <>
            <button className="btn-outline" onClick={() => download('pdf')}>📄 Download PDF</button>
            <button className="btn-outline" onClick={() => download('svg')}>🖼️ Download SVG</button>
          </>
        )}
      </div>

      {error && <div style={{ padding: 14, background: 'rgba(239,68,68,0.12)', border: '1px solid #EF4444', color: '#FCA5A5', borderRadius: 10, fontSize: 13, marginBottom: 16 }}>{error}</div>}
      {loading && <div className="glass" style={{ padding: 22, borderRadius: 14, color: 'var(--text-dim)', textAlign: 'center' }}>🤖 Building a fresh mind map for <strong style={{ color: 'var(--text)' }}>{topic}</strong>…</div>}

      {map && (
        <div className="glass" style={{ padding: 20, borderRadius: 16, overflowX: 'auto' }}>
          <MindMapSvg ref={svgRef} data={map} />
        </div>
      )}
    </div>
  );
}

// ─── Clean SVG mind map: fixed geometry, no overlaps ──────────────────
const MindMapSvg = React.forwardRef(({ data }, ref) => {
  const W = 1200, H = 780;
  const cx = W / 2, cy = H / 2;
  const branches = data.branches.slice(0, 8);
  const N = branches.length;
  const R = 340; // distance from center to branch node

  // Wrap long text into up to 2 tspan lines (max ~18 chars each)
  const wrap = (text, maxLen = 18) => {
    const words = String(text).split(/\s+/);
    const lines = [];
    let cur = '';
    for (const w of words) {
      if ((cur + ' ' + w).trim().length > maxLen) { lines.push(cur.trim()); cur = w; }
      else cur = (cur + ' ' + w).trim();
      if (lines.length >= 2) break;
    }
    if (cur && lines.length < 2) lines.push(cur.trim());
    return lines;
  };

  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', minWidth: 900, background: 'transparent' }}>
      <defs>
        <radialGradient id="mm-center" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </radialGradient>
      </defs>

      {/* connector lines */}
      {branches.map((_, i) => {
        const angle = -Math.PI / 2 + (i / N) * 2 * Math.PI;
        const bx = cx + R * Math.cos(angle);
        const by = cy + R * Math.sin(angle);
        return <line key={`l${i}`} x1={cx} y1={cy} x2={bx} y2={by} stroke={COLORS[i % COLORS.length]} strokeWidth="2" strokeOpacity="0.55" strokeDasharray="4 4" />;
      })}

      {/* center bubble */}
      <g>
        <circle cx={cx} cy={cy} r="78" fill="url(#mm-center)" stroke="#F0ABFC" strokeWidth="2" />
        {wrap(data.center, 14).map((line, i, arr) => (
          <text key={i} x={cx} y={cy - (arr.length - 1) * 10 + i * 22 + 6} textAnchor="middle"
            fill="#fff" fontFamily="Sora, sans-serif" fontWeight="800" fontSize="18">{line}</text>
        ))}
      </g>

      {/* branch nodes + their child text */}
      {branches.map((b, i) => {
        const angle = -Math.PI / 2 + (i / N) * 2 * Math.PI;
        const bx = cx + R * Math.cos(angle);
        const by = cy + R * Math.sin(angle);
        const color = COLORS[i % COLORS.length];
        const isLeft = Math.cos(angle) < -0.35;
        const isRight = Math.cos(angle) > 0.35;
        const isTop = Math.sin(angle) < -0.55;
        const isBottom = Math.sin(angle) > 0.55;

        // Where child text goes relative to the branch node
        let tx = bx, ty = by, anchor = 'middle';
        if (isLeft) { tx = bx - 105; anchor = 'end'; }
        else if (isRight) { tx = bx + 105; anchor = 'start'; }
        else if (isTop) { ty = by - 78; anchor = 'middle'; }
        else if (isBottom) { ty = by + 78; anchor = 'middle'; }

        return (
          <g key={i}>
            {/* branch label pill */}
            <rect x={bx - 95} y={by - 22} width="190" height="44" rx="12" ry="12"
              fill={color} stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
            {wrap(b.label, 20).map((line, li, arr) => (
              <text key={li} x={bx} y={by + (li - (arr.length - 1) / 2) * 14 + 4} textAnchor="middle"
                fill="#fff" fontFamily="Sora, sans-serif" fontWeight="700" fontSize="13">{line}</text>
            ))}

            {/* children list */}
            {(b.children || []).slice(0, 4).map((c, j) => {
              const yOffset = isTop ? -(j + 1) * 20 : isBottom ? (j + 1) * 20 : (j - 1.5) * 20;
              return (
                <text key={j} x={tx} y={ty + yOffset + 4} textAnchor={anchor}
                  fill="#E5E7EB" fontFamily="DM Sans, sans-serif" fontSize="12">
                  • {String(c).length > 34 ? String(c).slice(0, 32) + '…' : c}
                </text>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
});
