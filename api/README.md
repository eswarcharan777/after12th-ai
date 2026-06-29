# 📡 API — After12th AI

This folder contains the **API endpoint handlers**. Each file is a separate logical endpoint that the backend (`backend/server.cjs`) wires into Express.

## 📂 Files

```
api/
└── chat.cjs           ← POST /api/chat — AI tutor (Gemini)
```

## 🔌 Endpoints

### `POST /api/chat`

The single AI endpoint powering 4 different frontend features.

**File:** [`api/chat.cjs`](./chat.cjs)

#### Request
```http
POST /api/chat
Content-Type: application/json

{
  "mode": "tutor",
  "messages": [
    { "role": "user", "content": "Explain Newton's laws" }
  ]
}
```

#### Modes
The `mode` field controls which system prompt the AI uses:

| Mode | Used by | Returns |
|---|---|---|
| `tutor` | AI Tutor page | Plain text answer (with 📝 In the Exam: section) |
| `branch` | Branch Guide quiz | JSON object with branch recommendations |
| `planner` | Study Planner | JSON object with weekly plan |
| `college` | College Finder | JSON object with college shortlist |

#### Response
```json
{ "reply": "Newton's first law states that..." }
```

Or on error:
```json
{ "error": "AI service error. Please try again." }
```

#### Demo Mode
If `GEMINI_API_KEY` env var is not set, the endpoint returns helpful placeholder responses without calling Gemini. This allows the frontend to remain functional during local dev without an API key.

#### Rate Limiting
30 requests per minute per IP. After that, returns:
```json
{ "error": "Too many requests. Please wait a moment." }
```

## 🛠 Tech

- **Gemini Model:** `gemini-2.5-flash` (Google's free tier)
- **Provider URL:** `https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent`
- **Max tokens:** 2048 per response
- **Temperature:** 0.7

## 🆓 Cost

Google Gemini's free tier handles this app's traffic for **₹0**:
- 10 requests / minute
- 250 requests / day
- 1M tokens / minute

Get your free key: https://aistudio.google.com/

## 🔮 Future endpoints

When we add new server-side features, they go here as new files:
- `api/auth.cjs` — custom auth flows (if needed beyond Firebase)
- `api/payments.cjs` — Razorpay webhook (when monetization is added)
- `api/notifications.cjs` — push notification triggers
- `api/analytics.cjs` — track custom events
