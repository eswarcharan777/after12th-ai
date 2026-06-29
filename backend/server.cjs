// ═════════════════════════════════════════════════════════════════
//  AFTER12TH AI — BACKEND SERVER (Node.js + Express)
//
//  Entry point for the API server.
//  Loads /api/chat endpoint and serves the built React app.
//
//  Run locally:  node backend/server.cjs
//  Deployed on: Render.com (auto-deploys from GitHub)
// ═════════════════════════════════════════════════════════════════

const express = require('express');
const path = require('path');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// ── Import API endpoints from /api folder ────────────────────────
const { chatHandler, GEMINI_MODEL } = require('../api/chat.cjs');

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ───────────────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: '2mb' }));

// Rate limit: 30 requests / minute / IP
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { error: 'Too many requests. Please wait a moment.' },
});

// ── API Routes ───────────────────────────────────────────────────
app.post('/api/chat', chatLimiter, chatHandler);

// ── Serve built React frontend ───────────────────────────────────
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));
app.get('/{*splat}', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// ── Start server ─────────────────────────────────────────────────
app.listen(PORT, () => {
  const k = process.env.GEMINI_API_KEY;
  const keySet = k && k !== 'your_gemini_api_key_here';
  console.log(`\n🚀 After12th AI server running on http://localhost:${PORT}`);
  console.log(`🤖 Provider: Google Gemini (${GEMINI_MODEL})`);
  console.log(`🔑 API key: ${keySet ? '✅ Set' : '❌ Not set (get FREE key at https://aistudio.google.com/)'}\n`);
});
