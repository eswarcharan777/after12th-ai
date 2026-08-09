// ═══════════════════════════════════════════════════════════════════
// Shared AI call helper. Every feature that hits /api/chat should
// use this so we get consistent timeout, robust JSON extraction and
// clear error handling across the whole app.
// ═══════════════════════════════════════════════════════════════════

const DEFAULT_TIMEOUT_MS = 90_000;   // 90s — covers worst-case Render cold start + Gemini generation
const JSON_TIMEOUT_MS    = 90_000;   // JSON modes get the full 90s too
const WARMUP_TIMEOUT_MS  = 45_000;   // silent warmup fires on app open

// Fire-and-forget warmup — wakes the sleeping Render dyno so the user's
// first real click doesn't hit a 30-60s cold start.
let warmupInFlight = false;
let warmupDone = false;
export function warmupAI() {
  if (warmupDone || warmupInFlight) return;
  warmupInFlight = true;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), WARMUP_TIMEOUT_MS);
  fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mode: 'tutor', messages: [{ role: 'user', content: 'ping' }] }),
    signal: ctrl.signal,
  }).then(r => {
    clearTimeout(timer);
    warmupInFlight = false;
    if (r.ok) warmupDone = true;
  }).catch(() => {
    clearTimeout(timer);
    warmupInFlight = false;
  });
}

function friendlyError(e) {
  if (e.name === 'AbortError') {
    return new Error('Request timed out. The backend may be waking up — please try again in ~15 seconds.');
  }
  if (e.message === 'empty') {
    return new Error('AI returned an empty response. Try rephrasing your input and retry.');
  }
  if (e.message === 'bad-json') {
    return new Error('AI returned an unexpected format. Try a simpler input and retry.');
  }
  if (/failed to fetch|network|load failed/i.test(e.message || '')) {
    return new Error('Network error. Check your internet and retry.');
  }
  // If the error already carries a Gemini-specific message (rate limit,
  // model not found, safety block, etc.), pass it straight through so the
  // user sees the actual reason instead of a masked generic one.
  if (e.message?.startsWith('Gemini ') || e.message?.includes('quota') ||
      e.message?.includes('SAFETY') || e.message?.includes('API key')) {
    return new Error(e.message);
  }
  if (e.message?.startsWith('HTTP ')) {
    return new Error(`Backend returned ${e.message}. Try again in ~15 seconds.`);
  }
  return new Error('Could not reach the AI. The backend may be waking up — retry in ~15 seconds.');
}

// Strip common markdown code fences AND any prose surrounding a JSON block.
function stripFences(s) {
  return String(s || '')
    .replace(/^```(?:json|javascript|js)?\s*/i, '')
    .replace(/\s*```\s*$/, '')
    .trim();
}

// Robust JSON extractor: handles fences, leading/trailing prose, extra text.
// Returns the parsed object, or throws 'bad-json'.
function extractJson(raw) {
  const cleaned = stripFences(raw);

  // First try: direct parse (fastest path — clean JSON).
  try { return JSON.parse(cleaned); } catch {}

  // Second try: locate the first `{` … matching `}` (or `[` … `]`) in the string
  // even if surrounded by prose. Handles cases like "Here's the JSON: { ... }".
  const firstBrace = cleaned.indexOf('{');
  const firstBracket = cleaned.indexOf('[');
  let start = -1, openCh = '', closeCh = '';
  if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
    start = firstBrace; openCh = '{'; closeCh = '}';
  } else if (firstBracket !== -1) {
    start = firstBracket; openCh = '['; closeCh = ']';
  }
  if (start === -1) throw new Error('bad-json');

  // Walk the string tracking string literals so we skip braces inside strings.
  let depth = 0, inStr = false, escape = false;
  for (let i = start; i < cleaned.length; i++) {
    const ch = cleaned[i];
    if (inStr) {
      if (escape) { escape = false; continue; }
      if (ch === '\\') { escape = true; continue; }
      if (ch === '"') inStr = false;
      continue;
    }
    if (ch === '"') { inStr = true; continue; }
    if (ch === openCh) depth++;
    else if (ch === closeCh) {
      depth--;
      if (depth === 0) {
        const candidate = cleaned.slice(start, i + 1);
        try { return JSON.parse(candidate); } catch { throw new Error('bad-json'); }
      }
    }
  }
  throw new Error('bad-json');
}

async function doFetch({ mode, prompt, messages, image, persona, expectJson, ms }) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);

  const body = {
    mode,
    messages: messages || [{ role: 'user', content: prompt || '' }],
  };
  if (image) body.image = image;
  if (persona) body.persona = persona;

  try {
    const r = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    clearTimeout(timer);

    // Read the JSON body FIRST — even on 4xx/5xx the server sends a helpful
    // { error: "..." } we want to surface to the user (e.g. Gemini quota / model / key errors).
    let j = {};
    try { j = await r.json(); } catch {}

    if (!r.ok) {
      const detail = j.error ? String(j.error) : `HTTP ${r.status}`;
      const err = new Error(detail);
      err.status = r.status;
      throw err;
    }
    if (j.error) throw new Error(j.error);

    const reply = String(j.reply || '').trim();
    if (!reply) throw new Error('empty');

    if (!expectJson) return stripFences(reply);
    return extractJson(reply);
  } finally {
    clearTimeout(timer);
  }
}

// Errors that are worth retrying once (network / cold-start / server flap).
// Bad-input errors (bad-json, empty) should NOT retry.
function isTransient(err) {
  if (err.name === 'AbortError') return true;
  if (/failed to fetch|network|load failed/i.test(err.message || '')) return true;
  if (err.message?.startsWith('HTTP 5')) return true;
  if (err.message?.startsWith('HTTP 429')) return true;
  return false;
}

export async function callAI({
  mode,
  prompt,
  messages,
  image,
  persona,
  timeoutMs,
  expectJson = false,
}) {
  const ms = timeoutMs || (expectJson ? JSON_TIMEOUT_MS : DEFAULT_TIMEOUT_MS);
  const args = { mode, prompt, messages, image, persona, expectJson, ms };

  try {
    return await doFetch(args);
  } catch (firstErr) {
    if (!isTransient(firstErr)) {
      console.error('[callAI]', mode, firstErr);
      throw friendlyError(firstErr);
    }
    // Auto-retry once after a short delay — usually clears the cold-start hiccup.
    console.warn('[callAI] transient error, retrying once:', mode, firstErr.message);
    await new Promise(res => setTimeout(res, 1500));
    try {
      return await doFetch(args);
    } catch (secondErr) {
      console.error('[callAI] retry also failed:', mode, secondErr);
      throw friendlyError(secondErr);
    }
  }
}
