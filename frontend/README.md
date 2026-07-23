# 🎨 Frontend — After12th AI

This folder contains all the **React UI code** for the After12th AI platform.

## 📂 Folder Structure

```
frontend/
├── App.jsx                ← Main app router (all routes defined here)
├── main.jsx               ← React app entry point
├── firebase.js            ← Firebase config (Auth + Firestore)
├── userdata.js            ← Cloud-sync helpers
├── i18n.jsx               ← Hindi/English language switcher
├── index.css              ← Global Aurora theme styles
│
├── components/            ← Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Hero3D.jsx              (3D landing hero)
│   ├── TiltCard.jsx
│   ├── Reveal.jsx              (scroll animations)
│   ├── ScrollProgress.jsx
│   ├── AnimatedNumber.jsx
│   ├── ExamCountdown.jsx
│   ├── InstallPrompt.jsx       (PWA install)
│   ├── Streak.jsx
│   ├── StudyCalendar.jsx
│   └── Achievements.jsx
│
├── pages/                 ← Page components
│   ├── Home.jsx                (landing page)
│   ├── Login.jsx
│   ├── Pricing.jsx
│   ├── About.jsx
│   ├── NEETPrep.jsx
│   ├── JEEPrep.jsx
│   ├── CollegesPage.jsx
│   │
│   └── app/                    ← Logged-in app pages
│       ├── AppLayout.jsx       (sidebar layout)
│       ├── Dashboard.jsx
│       ├── AITutor.jsx         (chat with Gemini AI + voice)
│       ├── MockTest.jsx
│       ├── DailyQuiz.jsx
│       ├── Flashcards.jsx
│       ├── Pomodoro.jsx
│       ├── FocusMusic.jsx
│       ├── Notes.jsx
│       ├── Formulas.jsx
│       ├── Videos.jsx
│       ├── Forum.jsx
│       ├── RankPredictor.jsx
│       ├── CollegeFinder.jsx
│       ├── BranchGuide.jsx
│       ├── StudyPlanner.jsx
│       └── Refer.jsx
│
└── data/                  ← Static data (offline)
    ├── questions.js            (180 mock test questions)
    ├── colleges.js             (113 colleges with cutoffs)
    └── videos.js               (30 curated YouTube videos)
```

## 🛠 Tech Stack

- **React 18** — UI library
- **Vite 5** — build tool & dev server
- **React Router 6** — client-side routing
- **Firebase Auth** — email + Google sign-in
- **Firestore** — cloud database (NoSQL)
- **Three.js + React Three Fiber** — 3D hero scene
- **vite-plugin-pwa** — installable app (manifest + service worker)

## 🚀 How it runs

1. Vite bundles all this code into `dist/`
2. `dist/` is deployed to **Vercel** (frontend hosting)
3. When users visit `https://after12th-ai.vercel.app`, they download this React app
4. The app then calls `/api/chat` for AI features → Vercel routes to the backend on Render

## 🎨 Theme

The whole frontend uses the **Aurora Scholar** theme:
- Background: Deep navy `#0B0F1F`
- Primary: Electric violet `#8B5CF6`
- Accents: Hot pink `#EC4899` + cyan `#06B6D4`
- Cards: Glassmorphism with `backdrop-filter: blur()`
- Animations: Scroll-triggered reveals, count-up numbers, pulse glows
