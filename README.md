# 🎓 After12th AI

> Free AI-powered NEET & JEE preparation platform for Indian students.
> **Live:** https://after12th-ai.vercel.app

---

## 📁 Project Structure

```
after12th-ai/
├── 📂 frontend/          → React UI (deployed to Vercel)
├── 📂 backend/           → Node.js server (deployed to Render)
├── 📂 api/               → API endpoint handlers
├── 📂 public/            → Static files (icons, robots.txt, sitemap.xml)
├── 📄 app.html           → React entry HTML
├── 📄 package.json
├── 📄 vite.config.js     → Frontend build config
└── 📄 vercel.json        → Vercel routing rules
```

Each folder has its own README explaining what's inside:
- 🎨 [`frontend/README.md`](frontend/README.md) — React UI code
- 🤖 [`backend/README.md`](backend/README.md) — Node.js server
- 📡 [`api/README.md`](api/README.md) — API endpoints

---

## 🚀 Features (20+)

| Category | Features |
|---|---|
| **🤖 AI** | AI Tutor (text + voice in English/Hindi/Hinglish), AI Branch Guide, AI Study Planner, AI College Shortlister |
| **📝 Practice** | 180+ mock test questions, Daily Quiz, Flashcards, Previous Year coverage |
| **📊 Tools** | Rank Predictor, College Finder (113+ colleges), Pomodoro Timer, Focus Music (8 stations) |
| **📚 Content** | 30+ video lessons, 100+ formula references, Notes/Journal |
| **👥 Social** | Peer Doubt Forum, Refer-a-Friend system |
| **🎮 Gamification** | 15 Achievements, Streak tracker, Study Calendar (GitHub-style heatmap), XP system |
| **⚙️ Infra** | Firebase Auth (Email + Google), Firestore cloud sync, PWA installable, SEO + sitemap |

---

## 🛠 Tech Stack

**Frontend (React)**
- React 18 + Vite 5
- React Router 6
- Three.js (3D hero)
- Aurora dark theme

**Backend (Node.js)**
- Express 4
- Gemini 2.5 Flash (free tier)
- Rate limiting

**Cloud Services (all free tier)**
- 🌐 Vercel — frontend hosting
- 🖥 Render — backend hosting
- 🔥 Firebase Auth — user accounts
- ☁️ Firestore — user data (Mumbai region)
- 🤖 Google Gemini — AI brain

**Total monthly cost: ₹0** 💰

---

## 🚀 Run Locally

### Prerequisites
- Node.js 18+
- A Google Gemini API key (free): https://aistudio.google.com/

### Setup
```bash
# 1. Clone the repo
git clone https://github.com/eswarcharan777/after12th-ai.git
cd after12th-ai

# 2. Install dependencies
npm install

# 3. Add your Gemini API key
# Create a .env file with:
# GEMINI_API_KEY=your_key_here

# 4. Build frontend
npm run build

# 5. Start backend
node backend/server.cjs

# 6. Open
# http://localhost:3001
```

---

## 🌍 Deployment

### Frontend → Vercel
- Auto-deploys on `git push` to `main`
- Build command: `npm run build`
- Output dir: `dist`
- Live URL: `https://after12th-ai.vercel.app`

### Backend → Render
- Auto-deploys on `git push` to `main`
- Build command: `npm install`
- Start command: `node backend/server.cjs`
- Live URL: `https://after12th-ai.onrender.com`
- Required env var: `GEMINI_API_KEY`

### Routing
The `vercel.json` rewrites `/api/*` → Render backend so the frontend can transparently call APIs:
```
USER → Vercel (frontend)
         ↓ /api/chat
       Vercel rewrites to → Render (backend)
         ↓
       Gemini AI
```

---

## 👤 Author

Built with 💜 by **S. Eswar Charan** ([@eswarcharan777](https://github.com/eswarcharan777)) for India's NEET & JEE students.

---

## 📜 License

100% free. No license restrictions on use. Just don't claim it as your own work.
