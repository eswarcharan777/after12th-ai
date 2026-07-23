const PptxGenJS = require('pptxgenjs');
const pptx = new PptxGenJS();

pptx.layout = 'LAYOUT_WIDE'; // 13.333 x 7.5

// Brand palette
const C = {
  navy:   '0A1628',
  navy2:  '112240',
  navy3:  '1A3A6B',
  saffron:'FF6B00',
  saffron2:'FF8C33',
  gold:   'F5A623',
  green:  '138808',
  white:  'FFFFFF',
  ice:    'CBD5E1',
  muted:  '94A3B8',
  dim:    '6B7280',
  card:   '1E2D4A',
  border: '2A3E5F',
};

const FONT_TITLE = 'Arial Black';
const FONT_BODY  = 'Calibri';

// Helper to add the dark background + accent strip
function bg(slide) {
  slide.background = { color: C.navy };
  // top thin saffron strip
  slide.addShape('rect', { x: 0, y: 0, w: 13.333, h: 0.08, fill: { color: C.saffron }, line: { type: 'none' } });
  // bottom thin saffron strip
  slide.addShape('rect', { x: 0, y: 7.42, w: 13.333, h: 0.08, fill: { color: C.saffron }, line: { type: 'none' } });
  // footer brand
  slide.addText('AFTER12TH AI', { x: 0.5, y: 7.05, w: 4, h: 0.3, fontSize: 9, fontFace: FONT_BODY, bold: true, color: C.muted, charSpacing: 4 });
}

function pageNum(slide, n, total) {
  slide.addText(`${n} / ${total}`, { x: 12.0, y: 7.05, w: 1, h: 0.3, fontSize: 9, fontFace: FONT_BODY, bold: true, color: C.muted, align: 'right' });
}

function card(slide, x, y, w, h, fill = C.card) {
  slide.addShape('roundRect', { x, y, w, h, fill: { color: fill }, line: { color: C.border, width: 1 }, rectRadius: 0.12 });
}

function iconCircle(slide, x, y, size, color, glyph) {
  slide.addShape('ellipse', { x, y, w: size, h: size, fill: { color }, line: { type: 'none' } });
  slide.addText(glyph, { x, y, w: size, h: size, fontSize: size * 28, fontFace: 'Arial', bold: true, color: C.white, align: 'center', valign: 'middle' });
}

const TOTAL = 12;
let pageIdx = 0;
function newPage() { pageIdx++; return pageIdx; }

// ──────────────────────────────────────────────────────────────────────
// SLIDE 1 — TITLE
// ──────────────────────────────────────────────────────────────────────
{
  const s = pptx.addSlide();
  s.background = { color: C.navy };
  // big saffron circle decoration
  s.addShape('ellipse', { x: -2, y: -2, w: 6, h: 6, fill: { color: C.saffron, transparency: 80 }, line: { type: 'none' } });
  s.addShape('ellipse', { x: 9, y: 4, w: 7, h: 7, fill: { color: C.gold, transparency: 88 }, line: { type: 'none' } });
  // top strip tricolor mini
  s.addShape('rect', { x: 0, y: 0, w: 13.333, h: 0.12, fill: { color: C.saffron }, line: { type: 'none' } });

  // Badge
  s.addShape('roundRect', { x: 0.5, y: 1.5, w: 3.6, h: 0.45, fill: { color: C.saffron, transparency: 70 }, line: { color: C.saffron, width: 1.5 }, rectRadius: 0.22 });
  s.addText('AI-POWERED EDTECH PROJECT', { x: 0.5, y: 1.5, w: 3.6, h: 0.45, fontSize: 11, fontFace: FONT_BODY, bold: true, color: C.saffron2, align: 'center', valign: 'middle', charSpacing: 3 });

  // Title — composed as a single mixed-color text block (no overlap)
  s.addText([
    { text: 'AFTER12TH ', options: { color: C.white, bold: true } },
    { text: 'AI',         options: { color: C.saffron, bold: true } },
  ], { x: 0.5, y: 2.1, w: 12.33, h: 1.3, fontSize: 80, fontFace: FONT_TITLE, bold: true });

  s.addText('Crack NEET & JEE with Your Personal AI Tutor', { x: 0.5, y: 3.5, w: 12.33, h: 0.6, fontSize: 24, fontFace: FONT_BODY, italic: true, color: C.ice });

  // Stat row
  const stats = [
    ['95',  'Questions'],
    ['53',  'Colleges'],
    ['7',   'AI Features'],
    ['100%','Free Stack'],
  ];
  // 4 stat cards centered: 4 × 2.7 + 3 × 0.25 = 11.55, start at 0.89
  stats.forEach((st, i) => {
    const x = 0.89 + i * (2.7 + 0.25);
    s.addShape('roundRect', { x, y: 4.6, w: 2.7, h: 1.5, fill: { color: C.card }, line: { color: C.border, width: 1 }, rectRadius: 0.15 });
    s.addText(st[0], { x, y: 4.7, w: 2.7, h: 0.85, fontSize: 44, fontFace: FONT_TITLE, bold: true, color: C.saffron, align: 'center' });
    s.addText(st[1].toUpperCase(), { x, y: 5.55, w: 2.7, h: 0.4, fontSize: 12, fontFace: FONT_BODY, bold: true, color: C.muted, align: 'center', charSpacing: 3 });
  });

  s.addText('Built by Cherry • Powered by Google Gemini • Secured by Firebase', { x: 0.7, y: 6.5, w: 12, h: 0.4, fontSize: 13, fontFace: FONT_BODY, bold: true, color: C.gold, align: 'center' });
}

// ──────────────────────────────────────────────────────────────────────
// SLIDE 2 — PROJECT OVERVIEW
// ──────────────────────────────────────────────────────────────────────
{
  const s = pptx.addSlide();
  bg(s);
  const n = newPage(); pageNum(s, n, TOTAL);

  s.addText('PROJECT OVERVIEW', { x: 0.5, y: 0.45, w: 12, h: 0.55, fontSize: 32, fontFace: FONT_TITLE, bold: true, color: C.white, charSpacing: 2 });
  s.addShape('rect', { x: 0.5, y: 1.05, w: 1.2, h: 0.06, fill: { color: C.saffron }, line: { type: 'none' } });

  // Left half — what is it
  s.addText('WHAT IS AFTER12TH AI?', { x: 0.5, y: 1.4, w: 6, h: 0.4, fontSize: 16, fontFace: FONT_BODY, bold: true, color: C.saffron, charSpacing: 2 });
  s.addText(
    'A complete full-stack web platform built for Indian Class 12 students preparing for NEET (medical) and JEE (engineering) — combining AI tutoring, mock tests, rank prediction, and college guidance in one place.',
    { x: 0.5, y: 1.85, w: 6.0, h: 1.8, fontSize: 15, fontFace: FONT_BODY, color: C.ice, paraSpaceAfter: 6 }
  );

  s.addText('THE PROBLEM IT SOLVES', { x: 0.5, y: 3.85, w: 6, h: 0.4, fontSize: 16, fontFace: FONT_BODY, bold: true, color: C.saffron, charSpacing: 2 });
  const probs = [
    '17M+ Indian students take NEET/JEE every year',
    'Coaching costs ₹2-5 lakhs and excludes most',
    'No single platform teaches AND guides admissions',
    'Hinglish-friendly AI mentorship is rare',
  ];
  s.addText(probs.map(t => ({ text: t, options: { bullet: { code: '25A0' }, color: C.ice } })),
    { x: 0.5, y: 4.3, w: 6, h: 2.4, fontSize: 14, fontFace: FONT_BODY, color: C.ice, paraSpaceAfter: 8 });

  // Right half — image-ish stat grid
  card(s, 7.0, 1.4, 5.8, 5.4);
  s.addText('AT A GLANCE', { x: 7.0, y: 1.55, w: 5.8, h: 0.4, fontSize: 14, fontFace: FONT_BODY, bold: true, color: C.gold, align: 'center', charSpacing: 3 });

  const grid = [
    ['TARGET',  'NEET + JEE'],
    ['LANG',    'English + Hinglish'],
    ['TIER',    'Free → ₹499/mo'],
    ['REGION',  'India (Mumbai DB)'],
    ['AUTH',    'Google + Email'],
    ['SYNC',    'Cross-Device Cloud'],
  ];
  grid.forEach((g, i) => {
    const col = i % 2; const row = Math.floor(i / 2);
    const x = 7.2 + col * 2.85;
    const y = 2.15 + row * 1.45;
    s.addShape('roundRect', { x, y, w: 2.65, h: 1.25, fill: { color: C.navy3 }, line: { color: C.border, width: 1 }, rectRadius: 0.1 });
    s.addText(g[0], { x, y: y + 0.1, w: 2.65, h: 0.35, fontSize: 11, fontFace: FONT_BODY, bold: true, color: C.gold, align: 'center', charSpacing: 3 });
    s.addText(g[1], { x, y: y + 0.5, w: 2.65, h: 0.65, fontSize: 16, fontFace: FONT_TITLE, bold: true, color: C.white, align: 'center', valign: 'middle' });
  });
}

// ──────────────────────────────────────────────────────────────────────
// SLIDE 3 — TECH STACK
// ──────────────────────────────────────────────────────────────────────
{
  const s = pptx.addSlide();
  bg(s);
  const n = newPage(); pageNum(s, n, TOTAL);

  s.addText('TECH STACK', { x: 0.5, y: 0.45, w: 12, h: 0.55, fontSize: 32, fontFace: FONT_TITLE, bold: true, color: C.white, charSpacing: 2 });
  s.addShape('rect', { x: 0.5, y: 1.05, w: 1.2, h: 0.06, fill: { color: C.saffron }, line: { type: 'none' } });

  s.addText('Modern, scalable, and 100% on free tiers.', { x: 0.5, y: 1.18, w: 11, h: 0.4, fontSize: 14, fontFace: FONT_BODY, italic: true, color: C.muted });

  const tiers = [
    { title: 'FRONTEND', color: C.saffron, items: [
        ['React 18', 'UI component framework'],
        ['Vite 5', 'Lightning-fast bundler'],
        ['React Router 6', 'Client-side routing'],
        ['Plain CSS', 'Custom design system'],
    ]},
    { title: 'BACKEND', color: C.gold, items: [
        ['Node.js + Express', 'API server (server.cjs)'],
        ['Express Rate Limit', '30 req/min protection'],
        ['CORS + dotenv', 'Standard middleware'],
        ['Native fetch', 'Calls Gemini API'],
    ]},
    { title: 'CLOUD & AI', color: C.green, items: [
        ['Google Gemini 2.5 Flash', 'Free AI brain'],
        ['Firebase Auth', 'Email + Google sign-in'],
        ['Firestore (Mumbai)', 'NoSQL cloud database'],
        ['Security Rules', 'Per-user data isolation'],
    ]},
  ];

  tiers.forEach((t, i) => {
    const x = 0.5 + i * 4.27;
    const w = 4.0;
    card(s, x, 1.8, w, 5.0);
    // header
    s.addShape('rect', { x, y: 1.8, w, h: 0.55, fill: { color: t.color }, line: { type: 'none' } });
    s.addText(t.title, { x, y: 1.8, w, h: 0.55, fontSize: 16, fontFace: FONT_TITLE, bold: true, color: C.navy, align: 'center', valign: 'middle', charSpacing: 4 });
    // items
    t.items.forEach((it, j) => {
      const yy = 2.6 + j * 1.0;
      s.addText(it[0], { x: x + 0.25, y: yy, w: w - 0.5, h: 0.4, fontSize: 14, fontFace: FONT_BODY, bold: true, color: C.white });
      s.addText(it[1], { x: x + 0.25, y: yy + 0.4, w: w - 0.5, h: 0.4, fontSize: 11, fontFace: FONT_BODY, color: C.muted, italic: true });
    });
  });
}

// ──────────────────────────────────────────────────────────────────────
// SLIDE 4 — WHAT WAS BUILT TODAY (BIG HEADLINE)
// ──────────────────────────────────────────────────────────────────────
{
  const s = pptx.addSlide();
  bg(s);
  const n = newPage(); pageNum(s, n, TOTAL);

  s.addText('BUILT IN ONE SESSION', { x: 0.5, y: 0.45, w: 12, h: 0.55, fontSize: 32, fontFace: FONT_TITLE, bold: true, color: C.white, charSpacing: 2 });
  s.addShape('rect', { x: 0.5, y: 1.05, w: 1.2, h: 0.06, fill: { color: C.saffron }, line: { type: 'none' } });

  s.addText('From "is this complete?" to a secure, cloud-connected production app.', { x: 0.5, y: 1.18, w: 12, h: 0.4, fontSize: 14, fontFace: FONT_BODY, italic: true, color: C.muted });

  const items = [
    { icon: '✓', color: C.green,   t: 'AI SWAP',          d: 'Replaced paid Claude API with FREE Google Gemini' },
    { icon: '✓', color: C.green,   t: 'REAL AUTH',         d: 'Firebase Email + Google one-click sign-in' },
    { icon: '✓', color: C.green,   t: 'CLOUD SYNC',        d: 'Firestore stores progress across devices' },
    { icon: '✓', color: C.green,   t: 'SECURITY RULES',    d: 'Per-user data isolation (production-grade)' },
    { icon: '✓', color: C.saffron, t: 'CONTENT × 3',       d: '20→50 NEET Qs · 15→45 JEE Qs · 28→53 colleges' },
    { icon: '✓', color: C.saffron, t: 'INTERACTIVE FAQ',   d: '8-Q accordion with smooth animations' },
    { icon: '✓', color: C.saffron, t: 'UI BUG FIXES',      d: 'Footer credit, Google logo, mojibake, redirect bug' },
    { icon: '✓', color: C.saffron, t: 'BUILD PIPELINE',    d: 'Marketing HTML + React app coexist cleanly' },
  ];

  items.forEach((it, i) => {
    const col = i % 2; const row = Math.floor(i / 2);
    const x = 0.5 + col * 6.27;
    const y = 1.9 + row * 1.27;
    card(s, x, y, 6.0, 1.1);
    // tick circle
    s.addShape('ellipse', { x: x + 0.2, y: y + 0.3, w: 0.5, h: 0.5, fill: { color: it.color }, line: { type: 'none' } });
    s.addText(it.icon, { x: x + 0.2, y: y + 0.3, w: 0.5, h: 0.5, fontSize: 22, fontFace: FONT_TITLE, bold: true, color: C.white, align: 'center', valign: 'middle' });
    s.addText(it.t, { x: x + 0.85, y: y + 0.18, w: 5.0, h: 0.4, fontSize: 14, fontFace: FONT_TITLE, bold: true, color: C.white, charSpacing: 2 });
    s.addText(it.d, { x: x + 0.85, y: y + 0.58, w: 5.0, h: 0.4, fontSize: 12, fontFace: FONT_BODY, color: C.ice });
  });
}

// ──────────────────────────────────────────────────────────────────────
// SLIDE 5 — AI SWAP DETAIL
// ──────────────────────────────────────────────────────────────────────
{
  const s = pptx.addSlide();
  bg(s);
  const n = newPage(); pageNum(s, n, TOTAL);

  s.addText('AI: PAID → FREE', { x: 0.5, y: 0.45, w: 12, h: 0.55, fontSize: 32, fontFace: FONT_TITLE, bold: true, color: C.white, charSpacing: 2 });
  s.addShape('rect', { x: 0.5, y: 1.05, w: 1.2, h: 0.06, fill: { color: C.saffron }, line: { type: 'none' } });

  // BEFORE card
  card(s, 0.5, 1.5, 6.0, 5.3, '3B1F1F');
  s.addShape('rect', { x: 0.5, y: 1.5, w: 6.0, h: 0.55, fill: { color: 'B91C1C' }, line: { type: 'none' } });
  s.addText('BEFORE', { x: 0.5, y: 1.5, w: 6.0, h: 0.55, fontSize: 18, fontFace: FONT_TITLE, bold: true, color: C.white, align: 'center', valign: 'middle', charSpacing: 4 });

  s.addText('Anthropic Claude API', { x: 0.7, y: 2.3, w: 5.6, h: 0.5, fontSize: 22, fontFace: FONT_TITLE, bold: true, color: C.white });
  const beforeBullets = [
    'Required a paid Anthropic account',
    '~$5 minimum top-up to activate',
    '$3 per 1M input tokens, $15 per 1M output',
    'Credit card mandatory',
    'Blocker for student users',
  ];
  s.addText(beforeBullets.map(t => ({ text: t, options: { bullet: { code: '2717' }, color: 'FCA5A5' } })),
    { x: 0.7, y: 3.0, w: 5.6, h: 3.5, fontSize: 14, fontFace: FONT_BODY, color: C.ice, paraSpaceAfter: 10 });

  // AFTER card
  card(s, 6.83, 1.5, 6.0, 5.3, '0F2E1F');
  s.addShape('rect', { x: 6.83, y: 1.5, w: 6.0, h: 0.55, fill: { color: C.green }, line: { type: 'none' } });
  s.addText('AFTER', { x: 6.83, y: 1.5, w: 6.0, h: 0.55, fontSize: 18, fontFace: FONT_TITLE, bold: true, color: C.white, align: 'center', valign: 'middle', charSpacing: 4 });

  s.addText('Google Gemini 2.5 Flash', { x: 7.03, y: 2.3, w: 5.6, h: 0.5, fontSize: 22, fontFace: FONT_TITLE, bold: true, color: C.white });
  const afterBullets = [
    'Completely FREE — no credit card',
    '10 requests / minute',
    '250 requests / day',
    '1M tokens / minute',
    'Production-quality answers',
  ];
  s.addText(afterBullets.map(t => ({ text: t, options: { bullet: { code: '2713' }, color: '86EFAC' } })),
    { x: 7.03, y: 3.0, w: 5.6, h: 3.5, fontSize: 14, fontFace: FONT_BODY, color: C.ice, paraSpaceAfter: 10 });
}

// ──────────────────────────────────────────────────────────────────────
// SLIDE 6 — AUTH & CLOUD ARCHITECTURE
// ──────────────────────────────────────────────────────────────────────
{
  const s = pptx.addSlide();
  bg(s);
  const n = newPage(); pageNum(s, n, TOTAL);

  s.addText('AUTH & CLOUD SYNC', { x: 0.5, y: 0.45, w: 12, h: 0.55, fontSize: 32, fontFace: FONT_TITLE, bold: true, color: C.white, charSpacing: 2 });
  s.addShape('rect', { x: 0.5, y: 1.05, w: 1.2, h: 0.06, fill: { color: C.saffron }, line: { type: 'none' } });

  // Flow diagram boxes — 4 cards width 2.7 with 0.3 gap and 0.4 reserved for arrows
  const BOX_W = 2.7, BOX_H = 2.0, BOX_Y = 1.7, ARROW_W = 0.4;
  const totalRowW = 4 * BOX_W + 3 * ARROW_W;
  const startX = (13.333 - totalRowW) / 2; // center the row
  const boxes = [
    { t: 'USER', d: 'Signs in via\nGoogle or Email', col: C.saffron },
    { t: 'FIREBASE\nAUTH', d: 'Issues JWT\nfor user', col: C.gold },
    { t: 'APP', d: 'Writes mock\nscores + plans', col: C.saffron2 },
    { t: 'FIRESTORE\n(MUMBAI)', d: 'Stores in\nusers/{uid}', col: C.green },
  ];

  boxes.forEach((b, i) => {
    const x = startX + i * (BOX_W + ARROW_W);
    card(s, x, BOX_Y, BOX_W, BOX_H);
    s.addShape('rect', { x, y: BOX_Y, w: BOX_W, h: 0.4, fill: { color: b.col }, line: { type: 'none' } });
    s.addText((i + 1).toString(), { x: x + 0.1, y: BOX_Y + 0.04, w: 0.4, h: 0.32, fontSize: 14, fontFace: FONT_TITLE, bold: true, color: C.navy, align: 'center' });
    s.addText(b.t, { x, y: BOX_Y + 0.5, w: BOX_W, h: 0.7, fontSize: 16, fontFace: FONT_TITLE, bold: true, color: C.white, align: 'center', valign: 'middle' });
    s.addText(b.d, { x, y: BOX_Y + 1.2, w: BOX_W, h: 0.7, fontSize: 11, fontFace: FONT_BODY, color: C.ice, align: 'center', valign: 'middle' });

    if (i < 3) {
      const ax = x + BOX_W + 0.02;
      s.addShape('rightArrow', { x: ax, y: BOX_Y + BOX_H/2 - 0.18, w: ARROW_W - 0.04, h: 0.36, fill: { color: C.saffron }, line: { type: 'none' } });
    }
  });

  // Security highlight
  card(s, 0.5, 4.0, 12.33, 2.8, C.navy2);
  s.addText('🔒 SECURITY RULES — PUBLISHED & LIVE', { x: 0.7, y: 4.15, w: 12, h: 0.4, fontSize: 16, fontFace: FONT_BODY, bold: true, color: C.gold, charSpacing: 2 });

  const ruleBullets = [
    'Only authenticated users can read or write',
    'Each user can ONLY access users/{their-own-uid}',
    'Anonymous visitors and other users are blocked',
    'Default-deny everything else (no random collection writes)',
    'No 30-day expiry — production-grade, permanent',
  ];
  s.addText(ruleBullets.map(t => ({ text: t, options: { bullet: { code: '2192' }, color: C.saffron } })),
    { x: 0.7, y: 4.65, w: 12, h: 2.0, fontSize: 13, fontFace: FONT_BODY, color: C.ice, paraSpaceAfter: 4 });
}

// ──────────────────────────────────────────────────────────────────────
// SLIDE 7 — CURRENT FEATURES
// ──────────────────────────────────────────────────────────────────────
{
  const s = pptx.addSlide();
  bg(s);
  const n = newPage(); pageNum(s, n, TOTAL);

  s.addText('CURRENT FEATURES', { x: 0.5, y: 0.45, w: 12, h: 0.55, fontSize: 32, fontFace: FONT_TITLE, bold: true, color: C.white, charSpacing: 2 });
  s.addShape('rect', { x: 0.5, y: 1.05, w: 1.2, h: 0.06, fill: { color: C.saffron }, line: { type: 'none' } });

  const feats = [
    { e: '🤖', t: 'AI TUTOR',       d: 'Step-by-step explanations in English or Hinglish for Physics, Chemistry, Biology & Maths.', col: C.saffron },
    { e: '📝', t: 'MOCK TESTS',     d: 'NTA-pattern tests with timer, NEET +4/-1 scoring and detailed analysis after submission.', col: C.gold },
    { e: '📈', t: 'RANK PREDICTOR', d: 'Enter your mock score to estimate AIR & percentile from historical NEET/JEE cutoffs.', col: C.green },
    { e: '🏫', t: 'COLLEGE FINDER', d: '53 colleges with NIRF, fees, cutoffs and branch filters for rank-based shortlisting.', col: '6366F1' },
    { e: '🧭', t: 'BRANCH GUIDE',   d: 'Aptitude quiz that uses AI to recommend the best engineering or medical branch.', col: 'EC4899' },
    { e: '📅', t: 'STUDY PLANNER',  d: 'AI-generated personalised weekly timetable based on exam date and weak subjects.', col: '14B8A6' },
  ];

  feats.forEach((f, i) => {
    const col = i % 3; const row = Math.floor(i / 3);
    const x = 0.5 + col * 4.27;
    const y = 1.6 + row * 2.65;
    card(s, x, y, 4.0, 2.45);
    s.addShape('ellipse', { x: x + 0.3, y: y + 0.3, w: 0.7, h: 0.7, fill: { color: f.col }, line: { type: 'none' } });
    s.addText(f.e, { x: x + 0.3, y: y + 0.3, w: 0.7, h: 0.7, fontSize: 22, fontFace: 'Arial', align: 'center', valign: 'middle' });
    s.addText(f.t, { x: x + 1.15, y: y + 0.35, w: 2.8, h: 0.55, fontSize: 16, fontFace: FONT_TITLE, bold: true, color: C.white, charSpacing: 2 });
    s.addText(f.d, { x: x + 0.3, y: y + 1.15, w: 3.5, h: 1.2, fontSize: 12, fontFace: FONT_BODY, color: C.ice });
  });
}

// ──────────────────────────────────────────────────────────────────────
// SLIDE 8 — CONTENT EXPANSION (BEFORE / AFTER)
// ──────────────────────────────────────────────────────────────────────
{
  const s = pptx.addSlide();
  bg(s);
  const n = newPage(); pageNum(s, n, TOTAL);

  s.addText('CONTENT EXPANSION', { x: 0.5, y: 0.45, w: 12, h: 0.55, fontSize: 32, fontFace: FONT_TITLE, bold: true, color: C.white, charSpacing: 2 });
  s.addShape('rect', { x: 0.5, y: 1.05, w: 1.2, h: 0.06, fill: { color: C.saffron }, line: { type: 'none' } });

  // Big stat boxes — questions, colleges
  const stats = [
    { label: 'NEET QUESTIONS', before: '20', after: '50', growth: '+150%' },
    { label: 'JEE QUESTIONS',  before: '15', after: '45', growth: '+200%' },
    { label: 'COLLEGES',       before: '28', after: '53', growth: '+89%' },
  ];

  stats.forEach((st, i) => {
    const x = 0.5 + i * 4.27;
    card(s, x, 1.7, 4.0, 3.4);
    s.addText(st.label, { x, y: 1.85, w: 4.0, h: 0.45, fontSize: 14, fontFace: FONT_BODY, bold: true, color: C.gold, align: 'center', charSpacing: 3 });

    // before / after row
    s.addText(st.before, { x: x + 0.1, y: 2.4, w: 1.6, h: 1.0, fontSize: 56, fontFace: FONT_TITLE, bold: true, color: C.muted, align: 'center', valign: 'middle' });
    s.addText('BEFORE', { x: x + 0.1, y: 3.35, w: 1.6, h: 0.3, fontSize: 10, fontFace: FONT_BODY, bold: true, color: C.dim, align: 'center', charSpacing: 2 });

    s.addShape('rightArrow', { x: x + 1.75, y: 2.78, w: 0.5, h: 0.34, fill: { color: C.saffron }, line: { type: 'none' } });

    s.addText(st.after, { x: x + 2.3, y: 2.4, w: 1.6, h: 1.0, fontSize: 56, fontFace: FONT_TITLE, bold: true, color: C.saffron, align: 'center', valign: 'middle' });
    s.addText('AFTER', { x: x + 2.3, y: 3.35, w: 1.6, h: 0.3, fontSize: 10, fontFace: FONT_BODY, bold: true, color: C.saffron2, align: 'center', charSpacing: 2 });

    s.addShape('roundRect', { x: x + 0.8, y: 4.1, w: 2.4, h: 0.65, fill: { color: C.green }, line: { type: 'none' }, rectRadius: 0.1 });
    s.addText(st.growth, { x: x + 0.8, y: 4.1, w: 2.4, h: 0.65, fontSize: 18, fontFace: FONT_TITLE, bold: true, color: C.white, align: 'center', valign: 'middle' });
  });

  // Bottom — coverage chips
  card(s, 0.5, 5.4, 12.33, 1.45);
  s.addText('TOPICS COVERED', { x: 0.7, y: 5.5, w: 12, h: 0.3, fontSize: 11, fontFace: FONT_BODY, bold: true, color: C.gold, charSpacing: 3 });

  const topics = ['Mechanics', 'Optics', 'Thermodynamics', 'Modern Physics', 'Organic Chem', 'Inorganic', 'Physical Chem', 'Cell Biology', 'Genetics', 'Calculus', 'Trigonometry', 'Vectors', 'IITs', 'NITs', 'AIIMS', 'BITS'];
  topics.forEach((t, i) => {
    const col = i % 8; const row = Math.floor(i / 8);
    const x = 0.7 + col * 1.49;
    const y = 5.85 + row * 0.45;
    s.addShape('roundRect', { x, y, w: 1.4, h: 0.36, fill: { color: C.navy3 }, line: { color: C.saffron, width: 0.75 }, rectRadius: 0.18 });
    s.addText(t, { x, y, w: 1.4, h: 0.36, fontSize: 9, fontFace: FONT_BODY, bold: true, color: C.ice, align: 'center', valign: 'middle' });
  });
}

// ──────────────────────────────────────────────────────────────────────
// SLIDE 9 — UI/UX FIXES
// ──────────────────────────────────────────────────────────────────────
{
  const s = pptx.addSlide();
  bg(s);
  const n = newPage(); pageNum(s, n, TOTAL);

  s.addText('UI / UX POLISH', { x: 0.5, y: 0.45, w: 12, h: 0.55, fontSize: 32, fontFace: FONT_TITLE, bold: true, color: C.white, charSpacing: 2 });
  s.addShape('rect', { x: 0.5, y: 1.05, w: 1.2, h: 0.06, fill: { color: C.saffron }, line: { type: 'none' } });

  s.addText('Six high-confidence bugs identified and fixed in one pass.', { x: 0.5, y: 1.18, w: 12, h: 0.4, fontSize: 14, fontFace: FONT_BODY, italic: true, color: C.muted });

  const bugs = [
    { t: 'NAVIGATE-IN-RENDER',   b: 'AppLayout called navigate() during render (React anti-pattern)',  f: 'Replaced with <Navigate> declarative component' },
    { t: 'WRONG AI CREDIT',      b: 'Footer credited "Powered by Claude AI (Anthropic)"',              f: 'Updated to "Powered by Google Gemini AI"' },
    { t: 'FAKE SOCIAL ICONS',    b: 'cursor: pointer but no href — clicks did nothing',                f: 'Wrapped in real <a> tags opening in new tabs' },
    { t: 'EMOJI GOOGLE LOGO',    b: 'Login button used blue-circle emoji instead of Google G',         f: 'Replaced with the official multi-color SVG' },
    { t: 'FAQ DEFAULT-OPEN',     b: 'First question pre-expanded contradicted "Click to expand"',      f: 'All questions now start collapsed' },
    { t: 'EMOJI MOJIBAKE',       b: 'PowerShell\'s Get-Content corrupted UTF-8 emojis in HTML files',  f: 'Double-decode repair via WIN-1252 → UTF-8' },
  ];

  bugs.forEach((bg2, i) => {
    const y = 1.7 + i * 0.86;
    card(s, 0.5, y, 12.33, 0.74);
    s.addShape('rect', { x: 0.5, y, w: 0.08, h: 0.74, fill: { color: C.saffron }, line: { type: 'none' } });
    s.addText(bg2.t, { x: 0.75, y: y + 0.06, w: 3.0, h: 0.65, fontSize: 13, fontFace: FONT_TITLE, bold: true, color: C.gold, valign: 'middle', charSpacing: 2 });
    s.addText(bg2.b, { x: 3.85, y: y + 0.04, w: 5.0, h: 0.32, fontSize: 11, fontFace: FONT_BODY, color: 'FCA5A5', italic: true });
    s.addText(bg2.f, { x: 3.85, y: y + 0.38, w: 5.0, h: 0.32, fontSize: 11, fontFace: FONT_BODY, color: '86EFAC' });
    s.addShape('roundRect', { x: 9.0, y: y + 0.18, w: 3.6, h: 0.4, fill: { color: C.green }, line: { type: 'none' }, rectRadius: 0.06 });
    s.addText('FIXED ✓', { x: 9.0, y: y + 0.18, w: 3.6, h: 0.4, fontSize: 12, fontFace: FONT_TITLE, bold: true, color: C.white, align: 'center', valign: 'middle', charSpacing: 2 });
  });
}

// ──────────────────────────────────────────────────────────────────────
// SLIDE 10 — FUTURE ROADMAP
// ──────────────────────────────────────────────────────────────────────
{
  const s = pptx.addSlide();
  bg(s);
  const n = newPage(); pageNum(s, n, TOTAL);

  s.addText('FUTURE ROADMAP', { x: 0.5, y: 0.45, w: 12, h: 0.55, fontSize: 32, fontFace: FONT_TITLE, bold: true, color: C.white, charSpacing: 2 });
  s.addShape('rect', { x: 0.5, y: 1.05, w: 1.2, h: 0.06, fill: { color: C.saffron }, line: { type: 'none' } });

  s.addText('Where After12th AI is going next.', { x: 0.5, y: 1.18, w: 12, h: 0.4, fontSize: 14, fontFace: FONT_BODY, italic: true, color: C.muted });

  const future = [
    { p: 'Q1',  t: 'DEPLOY ONLINE',         d: 'Vercel + Render free hosting → real public URL', col: C.saffron },
    { p: 'Q1',  t: 'RAZORPAY PAYMENTS',     d: 'Real UPI / card flow for Premium ₹499 plan',     col: C.saffron },
    { p: 'Q2',  t: 'MOBILE PWA',            d: 'Installable on phones, offline mock tests',      col: C.gold },
    { p: 'Q2',  t: '500+ QUESTIONS',        d: 'Chapter-wise practice, previous year papers',   col: C.gold },
    { p: 'Q2',  t: 'EXAM COUNTDOWN',        d: 'Daily widget, milestone notifications',          col: C.gold },
    { p: 'Q3',  t: 'AI VOICE TUTOR',        d: 'Speak doubts in Hindi/Hinglish, voice replies',  col: C.green },
    { p: 'Q3',  t: 'PEER DOUBT FORUM',      d: 'Students answer students — gamified karma',      col: C.green },
    { p: 'Q3',  t: 'VIDEO LESSONS',         d: 'Curated NCERT + concept videos per chapter',     col: C.green },
    { p: 'Q4',  t: 'PARENT DASHBOARD',      d: 'Weekly progress reports for guardians',          col: '6366F1' },
  ];

  future.forEach((it, i) => {
    const col = i % 3; const row = Math.floor(i / 3);
    const x = 0.5 + col * 4.27;
    const y = 1.65 + row * 1.75;
    card(s, x, y, 4.0, 1.55);
    // quarter chip
    s.addShape('roundRect', { x: x + 0.25, y: y + 0.2, w: 0.65, h: 0.35, fill: { color: it.col }, line: { type: 'none' }, rectRadius: 0.05 });
    s.addText(it.p, { x: x + 0.25, y: y + 0.2, w: 0.65, h: 0.35, fontSize: 11, fontFace: FONT_TITLE, bold: true, color: C.navy, align: 'center', valign: 'middle', charSpacing: 1 });

    s.addText(it.t, { x: x + 1.0, y: y + 0.16, w: 2.9, h: 0.45, fontSize: 14, fontFace: FONT_TITLE, bold: true, color: C.white, charSpacing: 2 });
    s.addText(it.d, { x: x + 0.25, y: y + 0.7, w: 3.55, h: 0.75, fontSize: 11, fontFace: FONT_BODY, color: C.ice });
  });
}

// ──────────────────────────────────────────────────────────────────────
// SLIDE 11 — IMPACT
// ──────────────────────────────────────────────────────────────────────
{
  const s = pptx.addSlide();
  bg(s);
  const n = newPage(); pageNum(s, n, TOTAL);

  s.addText('THE IMPACT', { x: 0.5, y: 0.45, w: 12, h: 0.55, fontSize: 32, fontFace: FONT_TITLE, bold: true, color: C.white, charSpacing: 2 });
  s.addShape('rect', { x: 0.5, y: 1.05, w: 1.2, h: 0.06, fill: { color: C.saffron }, line: { type: 'none' } });

  s.addText('Why this matters for Indian students.', { x: 0.5, y: 1.18, w: 12, h: 0.4, fontSize: 14, fontFace: FONT_BODY, italic: true, color: C.muted });

  // Big stats row
  const big = [
    { v: '₹0',       l: 'COST TO RUN',       sub: 'Free tiers across the stack' },
    { v: '17M+',     l: 'POTENTIAL USERS',   sub: 'NEET + JEE aspirants yearly' },
    { v: '24/7',     l: 'AI AVAILABILITY',   sub: 'No tuition timings, no waiting' },
    { v: '< 2s',     l: 'AVG RESPONSE',      sub: 'Gemini 2.5 Flash latency' },
  ];

  big.forEach((b, i) => {
    const x = 0.5 + i * 3.21;
    card(s, x, 1.75, 2.95, 2.3);
    s.addText(b.v, { x, y: 1.9, w: 2.95, h: 1.1, fontSize: 60, fontFace: FONT_TITLE, bold: true, color: C.saffron, align: 'center', valign: 'middle' });
    s.addText(b.l, { x, y: 2.95, w: 2.95, h: 0.35, fontSize: 11, fontFace: FONT_BODY, bold: true, color: C.gold, align: 'center', charSpacing: 3 });
    s.addText(b.sub, { x, y: 3.3, w: 2.95, h: 0.6, fontSize: 11, fontFace: FONT_BODY, color: C.muted, align: 'center', italic: true });
  });

  // Quote / mission
  card(s, 0.5, 4.4, 12.33, 2.4, C.navy2);
  s.addText('“', { x: 0.7, y: 4.4, w: 1.2, h: 1.2, fontSize: 100, fontFace: FONT_TITLE, bold: true, color: C.saffron });
  s.addText(
    'Every Indian student — regardless of city, background, or budget — deserves a personal mentor for the most important exams of their life.',
    { x: 2.0, y: 4.6, w: 10.5, h: 1.4, fontSize: 20, fontFace: FONT_BODY, italic: true, bold: true, color: C.white }
  );
  s.addText('— After12th AI Mission', { x: 2.0, y: 6.0, w: 10.5, h: 0.5, fontSize: 14, fontFace: FONT_BODY, bold: true, color: C.gold });
}

// ──────────────────────────────────────────────────────────────────────
// SLIDE 12 — THANK YOU / CLOSING
// ──────────────────────────────────────────────────────────────────────
{
  const s = pptx.addSlide();
  s.background = { color: C.navy };
  // decorations
  s.addShape('ellipse', { x: -3, y: 4, w: 8, h: 8, fill: { color: C.saffron, transparency: 85 }, line: { type: 'none' } });
  s.addShape('ellipse', { x: 8, y: -2, w: 7, h: 7, fill: { color: C.gold, transparency: 88 }, line: { type: 'none' } });
  s.addShape('rect', { x: 0, y: 0, w: 13.333, h: 0.12, fill: { color: C.saffron }, line: { type: 'none' } });

  s.addText('THANK YOU', { x: 0.5, y: 2.4, w: 12.33, h: 1.5, fontSize: 110, fontFace: FONT_TITLE, bold: true, color: C.white, align: 'center', charSpacing: 6 });
  s.addShape('rect', { x: 5.5, y: 3.9, w: 2.3, h: 0.08, fill: { color: C.saffron }, line: { type: 'none' } });

  s.addText('After12th AI — Built with ❤ for India\'s students', { x: 0.5, y: 4.2, w: 12.33, h: 0.5, fontSize: 20, fontFace: FONT_BODY, italic: true, color: C.ice, align: 'center' });

  // tech credit row
  const credits = [
    ['REACT',     C.saffron],
    ['NODE.JS',   C.gold],
    ['GEMINI AI', C.green],
    ['FIREBASE',  '6366F1'],
    ['VITE',      'EC4899'],
  ];
  credits.forEach((c, i) => {
    const x = 1.8 + i * 2.0;
    s.addShape('roundRect', { x, y: 5.4, w: 1.85, h: 0.6, fill: { color: C.navy }, line: { color: c[1], width: 2 }, rectRadius: 0.1 });
    s.addText(c[0], { x, y: 5.4, w: 1.85, h: 0.6, fontSize: 14, fontFace: FONT_TITLE, bold: true, color: c[1], align: 'center', valign: 'middle', charSpacing: 3 });
  });

  s.addText('Run locally → cd C:\\Users\\Cherry\\after12th-ai → node server.cjs → http://localhost:3001', { x: 0.5, y: 6.5, w: 12.33, h: 0.4, fontSize: 12, fontFace: 'Consolas', color: C.muted, align: 'center' });
  s.addText('© 2026 After12th AI', { x: 0.5, y: 6.95, w: 12.33, h: 0.4, fontSize: 11, fontFace: FONT_BODY, bold: true, color: C.dim, align: 'center', charSpacing: 4 });
}

pptx.writeFile({ fileName: 'C:\\Users\\Cherry\\after12th-ai\\After12th-AI-Project.pptx' })
  .then(() => console.log('PPT created successfully'))
  .catch(e => { console.error(e); process.exit(1); });
