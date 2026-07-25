// ═══════════════════════════════════════════════════════════════════
// Shared AI call helper. Every feature that hits /api/chat should
// use this so we get consistent timeout, robust JSON extraction and
// clear error handling across the whole app.
// ═══════════════════════════════════════════════════════════════════

const DEFAULT_TIMEOUT_MS = 60_000;   // 60s covers Render cold start + Gemini generation
const JSON_TIMEOUT_MS    = 75_000;   // JSON-heavy prompts need a bit more headroom

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
  if (e.message?.startsWith('HTTP ')) {
    return new Error(`Backend returned ${e.message}. Try again in ~15 seconds.`);
  }
  if (/failed to fetch|network/i.test(e.message || '')) {
    return new Error('Network error. Check your internet and retry.');
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

    if (!r.ok) throw new Error(`HTTP ${r.status}`);

    const j = await r.json();
    if (j.error) throw new Error(j.error);

    const reply = String(j.reply || '').trim();
    if (!reply) throw new Error('empty');

    if (!expectJson) return stripFences(reply);
    return extractJson(reply);
  } catch (e) {
    clearTimeout(timer);
    // Log actual failure to console so we can debug from browser DevTools.
    console.error('[callAI]', mode, e);
    throw friendlyError(e);
  }
}
