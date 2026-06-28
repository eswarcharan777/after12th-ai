const PptxGenJS = require('pptxgenjs');
const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE';

const C = {
  navy:'0A1628', navy2:'112240', navy3:'1A3A6B',
  saffron:'FF6B00', saffron2:'FF8C33', gold:'F5A623',
  green:'138808', white:'FFFFFF', ice:'CBD5E1',
  muted:'94A3B8', dim:'6B7280',
  card:'1E2D4A', border:'2A3E5F', red:'B91C1C', redText:'FCA5A5', greenText:'86EFAC',
};
const FONT_T = 'Arial Black';
const FONT_B = 'Calibri';

function bg(s){
  s.background = { color: C.navy };
  s.addShape('rect',{ x:0,y:0,w:13.333,h:0.08, fill:{color:C.saffron}, line:{type:'none'} });
  s.addShape('rect',{ x:0,y:7.42,w:13.333,h:0.08, fill:{color:C.saffron}, line:{type:'none'} });
  s.addText('AFTER12TH AI · DECISION LOG', { x:0.5,y:7.05,w:5,h:0.3, fontSize:9, fontFace:FONT_B, bold:true, color:C.muted, charSpacing:4 });
}
function page(s,n,t){ s.addText(`${n} / ${t}`, { x:12,y:7.05,w:1,h:0.3, fontSize:9, fontFace:FONT_B, bold:true, color:C.muted, align:'right' }); }
function card(s,x,y,w,h,fill=C.card){ s.addShape('roundRect',{ x,y,w,h, fill:{color:fill}, line:{color:C.border,width:1}, rectRadius:0.12 }); }
function title(s, t){
  s.addText(t, { x:0.5,y:0.45,w:12,h:0.55, fontSize:32, fontFace:FONT_T, bold:true, color:C.white, charSpacing:2 });
  s.addShape('rect',{ x:0.5,y:1.05,w:1.2,h:0.06, fill:{color:C.saffron}, line:{type:'none'} });
}
function subtitle(s, t){
  s.addText(t, { x:0.5,y:1.18,w:12,h:0.4, fontSize:14, fontFace:FONT_B, italic:true, color:C.muted });
}

// Reusable: a "decision" slide with What / Why / Outcome columns
function decisionSlide(opts) {
  const s = pptx.addSlide(); bg(s);
  title(s, opts.heading);
  if (opts.subtitle) subtitle(s, opts.subtitle);

  // Big number badge
  s.addShape('roundRect',{ x:0.5,y:1.7,w:1.4,h:1.4, fill:{color:C.saffron}, line:{type:'none'}, rectRadius:0.7 });
  s.addText(String(opts.num), { x:0.5,y:1.7,w:1.4,h:1.4, fontSize:60, fontFace:FONT_T, bold:true, color:C.white, align:'center', valign:'middle' });

  // Decision headline
  s.addText(opts.label.toUpperCase(), { x:2.1,y:1.75,w:10.7,h:0.4, fontSize:13, fontFace:FONT_B, bold:true, color:C.gold, charSpacing:3 });
  s.addText(opts.decision, { x:2.1,y:2.15,w:10.7,h:0.95, fontSize:24, fontFace:FONT_T, bold:true, color:C.white });

  // Three columns: WHAT / WHY / OUTCOME
  const cols = [
    { tag:'WHAT', color:C.saffron, body: opts.what },
    { tag:'WHY',  color:C.gold,    body: opts.why },
    { tag:'OUTCOME', color:C.green, body: opts.outcome },
  ];
  cols.forEach((c, i) => {
    const x = 0.5 + i * 4.27;
    card(s, x, 3.4, 4.0, 3.4);
    s.addShape('rect',{ x, y:3.4, w:4.0, h:0.5, fill:{color:c.color}, line:{type:'none'} });
    s.addText(c.tag, { x, y:3.4, w:4.0, h:0.5, fontSize:14, fontFace:FONT_T, bold:true, color:C.navy, align:'center', valign:'middle', charSpacing:4 });
    s.addText(c.body.map(t => ({ text:t, options:{ bullet:{ code:'25A0' }, color:C.saffron } })),
      { x:x+0.25, y:4.05, w:3.5, h:2.7, fontSize:12, fontFace:FONT_B, color:C.ice, paraSpaceAfter:8 });
  });

  return s;
}

const TOTAL = 12;

// ──────────────────────────────────────────────────────────────────
// 1 — TITLE
// ──────────────────────────────────────────────────────────────────
{
  const s = pptx.addSlide();
  s.background = { color: C.navy };
  s.addShape('ellipse',{ x:-2,y:-2,w:6,h:6, fill:{color:C.saffron, transparency:80}, line:{type:'none'} });
  s.addShape('ellipse',{ x:9,y:4,w:7,h:7, fill:{color:C.gold, transparency:88}, line:{type:'none'} });
  s.addShape('rect',{ x:0,y:0,w:13.333,h:0.12, fill:{color:C.saffron}, line:{type:'none'} });

  s.addShape('roundRect',{ x:0.5,y:1.5,w:4.6,h:0.45, fill:{color:C.saffron, transparency:70}, line:{color:C.saffron, width:1.5}, rectRadius:0.22 });
  s.addText('ENGINEERING DECISION LOG', { x:0.5,y:1.5,w:4.6,h:0.45, fontSize:12, fontFace:FONT_B, bold:true, color:C.saffron2, align:'center', valign:'middle', charSpacing:3 });

  s.addText([
    { text:'WHAT I DID ',   options:{ color:C.white,   bold:true } },
    { text:'& ',            options:{ color:C.muted,   bold:true } },
    { text:'WHY',           options:{ color:C.saffron, bold:true } },
  ], { x:0.5,y:2.1,w:12.33,h:1.4, fontSize:74, fontFace:FONT_T, bold:true });

  s.addText('A walkthrough of every engineering choice made on the After12th AI project — and the reasoning behind it.',
    { x:0.5,y:3.7,w:12.33,h:0.9, fontSize:18, fontFace:FONT_B, italic:true, color:C.ice });

  // 4 decision-area chips
  const chips = [
    ['AI MODEL', C.saffron],
    ['AUTH',     C.gold],
    ['DATABASE', C.green],
    ['UI / UX',  '6366F1'],
  ];
  chips.forEach((c, i) => {
    const x = 0.89 + i * (2.95 + 0.3);
    s.addShape('roundRect',{ x, y:5.1, w:2.95, h:0.95, fill:{color:C.card}, line:{color:c[1], width:2}, rectRadius:0.12 });
    s.addText(c[0], { x, y:5.1, w:2.95, h:0.95, fontSize:18, fontFace:FONT_T, bold:true, color:c[1], align:'center', valign:'middle', charSpacing:3 });
  });

  s.addText('Built by Cherry · Engineered with Claude · One session · 8 major decisions',
    { x:0.5,y:6.4,w:12.33,h:0.5, fontSize:14, fontFace:FONT_B, bold:true, italic:true, color:C.gold, align:'center' });
}

// ──────────────────────────────────────────────────────────────────
// 2 — THE STARTING POINT
// ──────────────────────────────────────────────────────────────────
{
  const s = pptx.addSlide(); bg(s);
  page(s, 2, TOTAL);
  title(s, 'THE STARTING POINT');
  subtitle(s, 'What I found when I opened the project for the first time.');

  // Left: state
  card(s, 0.5, 1.7, 6.0, 5.1);
  s.addShape('rect',{ x:0.5,y:1.7,w:6.0,h:0.55, fill:{color:C.gold}, line:{type:'none'} });
  s.addText('WHAT EXISTED', { x:0.5,y:1.7,w:6.0,h:0.55, fontSize:16, fontFace:FONT_T, bold:true, color:C.navy, align:'center', valign:'middle', charSpacing:4 });

  const had = [
    'Marketing HTML pages (index, neet, jee, etc.)',
    'React SPA with 8 routes',
    '35 mock questions + 28 colleges',
    'Server scaffold for Claude API',
    'Pricing UI (display only — no payments)',
    'Login form with localStorage-only auth',
  ];
  s.addText(had.map(t => ({ text:t, options:{ bullet:{ code:'2713' }, color:C.greenText } })),
    { x:0.7,y:2.4,w:5.6,h:4.2, fontSize:14, fontFace:FONT_B, color:C.ice, paraSpaceAfter:8 });

  // Right: gaps
  card(s, 6.83, 1.7, 6.0, 5.1);
  s.addShape('rect',{ x:6.83,y:1.7,w:6.0,h:0.55, fill:{color:C.red}, line:{type:'none'} });
  s.addText('THE GAPS', { x:6.83,y:1.7,w:6.0,h:0.55, fontSize:16, fontFace:FONT_T, bold:true, color:C.white, align:'center', valign:'middle', charSpacing:4 });

  const gaps = [
    'AI tutor required a paid Claude API key',
    'No real user accounts (anyone could "login")',
    'Mock test scores died with browser cache',
    'Footer credited the wrong AI provider',
    'Mojibake emojis in marketing HTML files',
    'React app and HTML site had conflicting flows',
  ];
  s.addText(gaps.map(t => ({ text:t, options:{ bullet:{ code:'2717' }, color:C.redText } })),
    { x:7.03,y:2.4,w:5.6,h:4.2, fontSize:14, fontFace:FONT_B, color:C.ice, paraSpaceAfter:8 });
}

// ──────────────────────────────────────────────────────────────────
// 3 — DECISION 1: Verify before changing
// ──────────────────────────────────────────────────────────────────
{
  const s = decisionSlide({
    heading: 'DECISION #1 · VERIFY FIRST',
    subtitle: 'Before touching code, prove the existing app actually works end-to-end.',
    num: 1,
    label: 'Diagnose before prescribing',
    decision: 'Run the server, hit every endpoint, audit dependencies — then write the report.',
    what: [
      'Booted server.cjs locally',
      'Confirmed Vite build present in dist/',
      'POSTed to /api/chat with each mode',
      'Mapped all 6 React pages to routes',
    ],
    why: [
      'Half the user\'s "missing features" usually already exist',
      'Avoid rewriting code that already works',
      'Catch silent breakage early (api keys, broken builds)',
      'Build trust with concrete proof, not opinions',
    ],
    outcome: [
      'Found project was 95% complete',
      'Only real blocker was a missing API key',
      'Saved hours of unnecessary refactoring',
      'Gave user a clear "what\'s done vs missing" map',
    ],
  });
  page(s, 3, TOTAL);
}

// ──────────────────────────────────────────────────────────────────
// 4 — DECISION 2: Gemini over Claude
// ──────────────────────────────────────────────────────────────────
{
  const s = decisionSlide({
    heading: 'DECISION #2 · GEMINI OVER CLAUDE',
    subtitle: 'Match the AI model to the user\'s budget — not the other way around.',
    num: 2,
    label: 'Free tier > better model, when budget = ₹0',
    decision: 'Swap Anthropic Claude API for Google Gemini 2.5 Flash.',
    what: [
      'Rewrote server.cjs to call generativelanguage.googleapis.com',
      'Used native Node fetch — no extra SDK',
      'Kept same /api/chat contract → zero frontend changes',
      'Added placeholder-key detection for demo fallback',
    ],
    why: [
      'Claude needs ₹400+ minimum + credit card',
      'Gemini = 250 req/day, 10 req/min, FREE forever',
      'User is a student building a portfolio',
      'Answer quality is more than enough for tutoring',
    ],
    outcome: [
      'Same API surface, zero downstream rewrites',
      'Real AI tutor working with ₹0 spend',
      'Easy to switch back later (one function swap)',
      'No vendor lock-in — same demo-mode fallback',
    ],
  });
  page(s, 4, TOTAL);
}

// ──────────────────────────────────────────────────────────────────
// 5 — DECISION 3: Firebase Auth
// ──────────────────────────────────────────────────────────────────
{
  const s = decisionSlide({
    heading: 'DECISION #3 · FIREBASE AUTH',
    subtitle: 'Real accounts beat localStorage — but only if setup stays painless.',
    num: 3,
    label: 'Managed auth over custom backend',
    decision: 'Use Firebase Authentication for Email + Google sign-in.',
    what: [
      'Added firebase npm package',
      'Created src/firebase.js with config + helpers',
      'Rewrote Login.jsx with real auth flow',
      'Added Google SVG logo + friendly error map',
    ],
    why: [
      'Building auth from scratch = 2 weeks + bugs',
      'Firebase = 50,000 monthly users FREE',
      'Industry-standard JWT, password hashing, OAuth',
      'No backend code, no DB, no email service needed',
    ],
    outcome: [
      'Users persist forever (not just this browser)',
      'One-click Google sign-in works on mobile too',
      'Demo mode still available for unconfigured setups',
      'Code paths cleanly fall back if Firebase is off',
    ],
  });
  page(s, 5, TOTAL);
}

// ──────────────────────────────────────────────────────────────────
// 6 — DECISION 4: Firestore + Rules
// ──────────────────────────────────────────────────────────────────
{
  const s = decisionSlide({
    heading: 'DECISION #4 · FIRESTORE + SECURITY RULES',
    subtitle: 'A NoSQL doc store is enough when each user owns one document.',
    num: 4,
    label: 'NoSQL doc per user',
    decision: 'Cloud-sync scores and study plans to Firestore at users/{uid}.',
    what: [
      'Built src/userdata.js — unified read/write helper',
      'Updated Dashboard, MockTest, StudyPlanner',
      'Database in asia-south1 (Mumbai) for speed',
      'Published security rules: uid-only access',
    ],
    why: [
      'localStorage data dies with browser cache',
      'Users expect cross-device sync',
      'Firestore free tier covers thousands of users',
      'Per-user docs = simple model, simple rules',
    ],
    outcome: [
      'Scores follow user across devices automatically',
      'Per-user data isolation — even devs can\'t read',
      'Offline-first: localStorage mirror keeps app fast',
      'Test mode replaced with permanent secure rules',
    ],
  });
  page(s, 6, TOTAL);
}

// ──────────────────────────────────────────────────────────────────
// 7 — DECISION 5: Content expansion
// ──────────────────────────────────────────────────────────────────
{
  const s = decisionSlide({
    heading: 'DECISION #5 · TRIPLE THE CONTENT',
    subtitle: 'Real mock tests need a real question bank — and breadth across chapters.',
    num: 5,
    label: 'Curated coverage beats raw count',
    decision: 'Expand to 95 questions + 53 colleges with explanations.',
    what: [
      'NEET: 20 → 50 (Physics, Chem, Bio + numericals)',
      'JEE: 15 → 45 (added Maths, advanced topics)',
      'Colleges: 28 → 53 (more IITs, NITs, AIIMS, BITS)',
      'Every question has step-by-step explanation',
    ],
    why: [
      '20 questions ≠ a real mock test',
      'Single-chapter coverage made stats meaningless',
      'Students judge a prep app by question depth',
      'Explanations are the differentiator vs free PDFs',
    ],
    outcome: [
      'Mock tests now span 20+ chapters',
      'College finder covers Tier 1 + Tier 2 across India',
      'Rank predictor has real cutoffs to map against',
      'App finally feels like a serious study tool',
    ],
  });
  page(s, 7, TOTAL);
}

// ──────────────────────────────────────────────────────────────────
// 8 — DECISION 6: UI bug audit
// ──────────────────────────────────────────────────────────────────
{
  const s = decisionSlide({
    heading: 'DECISION #6 · BUG AUDIT, NOT BUG HUNT',
    subtitle: 'Read the source for confidence-1 bugs — don\'t hope to spot them at runtime.',
    num: 6,
    label: 'Static review > random clicking',
    decision: 'Audit code for React anti-patterns and stale strings, fix in one pass.',
    what: [
      'navigate() during render → <Navigate /> component',
      'Footer "Powered by Claude" → "Powered by Gemini"',
      'Fake social icons → real <a target="_blank">',
      'Emoji Google logo → real multi-color SVG',
    ],
    why: [
      'Runtime testing misses warning-only bugs',
      'Stale strings damage credibility instantly',
      'cursor: pointer with no link is user-hostile',
      'Polish details signal product quality',
    ],
    outcome: [
      'Zero React render warnings',
      'Footer correctly credits the live AI provider',
      'Social icons actually work on click',
      'Login button looks like a real Google button',
    ],
  });
  page(s, 8, TOTAL);
}

// ──────────────────────────────────────────────────────────────────
// 9 — DECISION 7: HTML + React coexistence
// ──────────────────────────────────────────────────────────────────
{
  const s = decisionSlide({
    heading: 'DECISION #7 · MARKETING + APP COEXIST',
    subtitle: 'Don\'t kill the static HTML site — let it live alongside the React build.',
    num: 7,
    label: 'Two front-ends, one server',
    decision: 'Give Vite a dedicated entry (app.html) so marketing HTML stays untouched.',
    what: [
      'Created app.html as the React mount file',
      'Pointed Vite\'s rollupOptions.input there',
      'Post-build copies dist/app.html → dist/index.html',
      'Kept marketing HTML files at project root',
    ],
    why: [
      'Marketing HTMLs work offline via file://',
      'Vite was choking on emoji-mangled index.html',
      'Server-served React needs index.html as root',
      'One file shouldn\'t do two incompatible jobs',
    ],
    outcome: [
      'npm run build now works cleanly',
      'Server serves React SPA at /',
      'File-explorer users still see marketing site',
      'Both flows point to the same /login route',
    ],
  });
  page(s, 9, TOTAL);
}

// ──────────────────────────────────────────────────────────────────
// 10 — DECISION 8: Mojibake fix
// ──────────────────────────────────────────────────────────────────
{
  const s = decisionSlide({
    heading: 'DECISION #8 · DOUBLE-DECODE REPAIR',
    subtitle: 'Bug investigation: PowerShell\'s default encoding silently corrupted UTF-8.',
    num: 8,
    label: 'Diagnose root cause, don\'t retype',
    decision: 'Reverse the corruption mathematically instead of restoring from backup.',
    what: [
      'Identified: PS Get-Content read UTF-8 as Win-1252',
      'Wrote bytes back garbled (🎓 became "ðŸŽ\\"")',
      'Used Win-1252 GetBytes then UTF-8 GetString',
      'Restored all 6 marketing HTML files',
    ],
    why: [
      'No git history meant no backup to revert',
      'Retyping all emojis is error-prone',
      'Understanding the bug prevents recurrence',
      'A 6-line fix beats 6 file rewrites',
    ],
    outcome: [
      'All emojis restored across 6 files',
      'Title bars, buttons, hamburger menu = clean',
      'User learned why and how to avoid next time',
      'Documented in memory for future sessions',
    ],
  });
  page(s, 10, TOTAL);
}

// ──────────────────────────────────────────────────────────────────
// 11 — ARCHITECTURE SUMMARY
// ──────────────────────────────────────────────────────────────────
{
  const s = pptx.addSlide(); bg(s);
  page(s, 11, TOTAL);
  title(s, 'THE FINAL ARCHITECTURE');
  subtitle(s, 'Every decision above, assembled into a single system.');

  // 3 tier columns
  const tiers = [
    { t:'CLIENT (BROWSER)', col:C.saffron, lines:[
      ['React 18 + Vite',            'UI + routing'],
      ['Firebase Auth SDK',          'Email + Google sign-in'],
      ['userdata.js helper',         'Reads/writes Firestore'],
      ['localStorage mirror',        'Offline cache'],
    ]},
    { t:'SERVER (NODE)', col:C.gold, lines:[
      ['Express 5 + CORS',           'REST API'],
      ['Rate limiter',               '30 req/min/IP'],
      ['/api/chat endpoint',         'Routes to Gemini'],
      ['Demo-mode fallback',         'Works without API key'],
    ]},
    { t:'CLOUD (GOOGLE)', col:C.green, lines:[
      ['Gemini 2.5 Flash',           'AI brain (free tier)'],
      ['Firebase Auth',              'User identity (free)'],
      ['Firestore (Mumbai)',         'NoSQL doc per user'],
      ['Security Rules',             'uid-locked access'],
    ]},
  ];
  tiers.forEach((tier, i) => {
    const x = 0.5 + i * 4.27;
    card(s, x, 1.7, 4.0, 5.1);
    s.addShape('rect',{ x, y:1.7, w:4.0, h:0.55, fill:{color:tier.col}, line:{type:'none'} });
    s.addText(tier.t, { x, y:1.7, w:4.0, h:0.55, fontSize:14, fontFace:FONT_T, bold:true, color:C.navy, align:'center', valign:'middle', charSpacing:3 });

    tier.lines.forEach((ln, j) => {
      const yy = 2.45 + j * 1.05;
      s.addText(ln[0], { x:x+0.25, y:yy, w:3.5, h:0.4, fontSize:13, fontFace:FONT_B, bold:true, color:C.white });
      s.addText(ln[1], { x:x+0.25, y:yy+0.4, w:3.5, h:0.45, fontSize:11, fontFace:FONT_B, italic:true, color:C.muted });
    });
  });
}

// ──────────────────────────────────────────────────────────────────
// 12 — CLOSING
// ──────────────────────────────────────────────────────────────────
{
  const s = pptx.addSlide();
  s.background = { color: C.navy };
  s.addShape('ellipse',{ x:-3,y:4,w:8,h:8, fill:{color:C.saffron, transparency:85}, line:{type:'none'} });
  s.addShape('ellipse',{ x:8,y:-2,w:7,h:7, fill:{color:C.gold, transparency:88}, line:{type:'none'} });
  s.addShape('rect',{ x:0,y:0,w:13.333,h:0.12, fill:{color:C.saffron}, line:{type:'none'} });

  s.addText('8 DECISIONS', { x:0.5,y:1.8,w:12.33,h:1.0, fontSize:80, fontFace:FONT_T, bold:true, color:C.saffron, align:'center', charSpacing:6 });
  s.addText('ONE PRODUCTION-READY APP', { x:0.5,y:2.9,w:12.33,h:0.7, fontSize:36, fontFace:FONT_T, bold:true, color:C.white, align:'center', charSpacing:4 });

  s.addShape('rect',{ x:5.5,y:3.85,w:2.3,h:0.08, fill:{color:C.saffron}, line:{type:'none'} });

  // Recap stats
  const recap = [
    ['8',   'DECISIONS'],
    ['95',  'QUESTIONS'],
    ['53',  'COLLEGES'],
    ['₹0',  'SPEND'],
  ];
  recap.forEach((r, i) => {
    const x = 0.89 + i * (2.95 + 0.3);
    s.addShape('roundRect',{ x, y:4.2, w:2.95, h:1.5, fill:{color:C.card}, line:{color:C.border, width:1}, rectRadius:0.12 });
    s.addText(r[0], { x, y:4.3, w:2.95, h:0.95, fontSize:48, fontFace:FONT_T, bold:true, color:C.saffron, align:'center', valign:'middle' });
    s.addText(r[1], { x, y:5.25, w:2.95, h:0.4, fontSize:12, fontFace:FONT_B, bold:true, color:C.gold, align:'center', charSpacing:3 });
  });

  s.addText('Every choice optimised for: free, secure, simple, reversible.',
    { x:0.5,y:6.05,w:12.33,h:0.5, fontSize:16, fontFace:FONT_B, italic:true, bold:true, color:C.ice, align:'center' });

  s.addText('AFTER12TH AI · Decision Log · 2026', { x:0.5,y:6.95,w:12.33,h:0.4, fontSize:11, fontFace:FONT_B, bold:true, color:C.dim, align:'center', charSpacing:4 });
}

pptx.writeFile({ fileName:'C:\\Users\\Cherry\\after12th-ai\\After12th-AI-Decisions.pptx' })
  .then(() => console.log('Decisions PPT created successfully'))
  .catch(e => { console.error(e); process.exit(1); });
