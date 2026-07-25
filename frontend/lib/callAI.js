// ═══════════════════════════════════════════════════════════════════
// Shared AI call helper. Every feature that hits /api/chat should
// use this so we get consistent timeout, error handling and JSON
// parsing across the whole app.
//
// Usage:
//   const text = await callAI({ mode: 'tutor', prompt: 'Explain gravity' });
//   const obj  = await callAI({ mode: 'qgen', prompt: '...', expectJson: true });
//   const text = await callAI({ mode: 'photo', messages: [...], image: {mimeType, data} });
// ═══════════════════════════════════════════════════════════════════

const DEFAULT_TIMEOUT_MS = 45_000;

function friendlyError(e) {
  if (e.name === 'AbortError') {
    return new Error('Request timed out. Backend may be waking up — try again in ~15 seconds.');
  }
  if (e.message === 'empty') {
    return new Error('AI returned an empty response. Try rephrasing your input.');
  }
  if (e.message === 'bad-json') {
    return new Error('AI returned an unexpected format. Try a simpler input.');
  }
  if (e.message?.startsWith('HTTP ')) {
    return new Error(`Backend error (${e.message}). Try again in ~15 seconds.`);
  }
  return new Error('Could not reach the AI. Backend may be waking up — retry in ~15 seconds.');
}

function stripFences(s) {
  return String(s || '')
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/, '')
    .trim();
}

export async function callAI({
  mode,
  prompt,
  messages,
  image,
  persona,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  expectJson = false,
}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);

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

    const reply = stripFences(j.reply);
    if (!reply) throw new Error('empty');

    if (!expectJson) return reply;

    try {
      return JSON.parse(reply);
    } catch {
      throw new Error('bad-json');
    }
  } catch (e) {
    clearTimeout(timer);
    throw friendlyError(e);
  }
}
