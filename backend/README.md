# 🤖 Backend — After12th AI

This folder contains the **Node.js / Express backend server** that powers the AI tutor.

## 📂 Files

```
backend/
├── server.cjs           ← Main Node.js Express server (USED IN PRODUCTION)
└── server.py            ← Python Flask backend (alternative)
```

## 🚀 How it works

The backend is a thin proxy between the React frontend and Google's Gemini AI:

```
USER → React App (Vercel)
            ↓ POST /api/chat
        Backend (Render) ← YOU ARE HERE
            ↓ HTTPS
        Google Gemini API
            ↓ AI Response
        Back to user
```

## 🛠 Tech Stack

- **Node.js 24** — runtime
- **Express 4** — web framework
- **express-rate-limit** — 30 req/min/IP protection
- **CORS** — cross-origin requests allowed
- **dotenv** — loads `GEMINI_API_KEY` from `.env`
- **Native fetch** — calls Gemini REST API (no extra SDK)

## ▶ Run locally

```bash
# From project root:
node backend/server.cjs

# Or via npm script:
npm start
```

You should see:
```
🚀 After12th AI server running on http://localhost:3001
🤖 Provider: Google Gemini (gemini-2.5-flash)
🔑 API key: ✅ Set
```

## 🌍 Deployed

The live backend runs on **Render.com** at:
```
https://after12th-ai.onrender.com
```

It auto-redeploys every time code is pushed to GitHub `main` branch.

### Render Start Command:
```
node backend/server.cjs
```

### Environment Variables (set in Render dashboard):
- `GEMINI_API_KEY` — your Google Gemini API key
- `PORT` — auto-set by Render

## 🐍 Python alternative

`server.py` is a Flask-based equivalent of `server.cjs`. Same endpoints, same behavior.

To run it:
```bash
pip install -r ../requirements.txt
python backend/server.py
```

## 🔌 API Endpoints

This server exposes exactly ONE endpoint to the public:

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/chat` | AI tutor — see `api/chat.cjs` |

The handler logic lives in `../api/chat.cjs` for clean separation.
