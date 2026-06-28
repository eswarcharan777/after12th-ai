const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { error: 'Too many requests. Please wait a moment.' },
});

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

async function callGemini({ systemPrompt, messages }) {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const body = {
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents,
    generationConfig: { maxOutputTokens: 2048, temperature: 0.7 },
  };

  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Gemini API ${resp.status}: ${errText}`);
  }

  const data = await resp.json();
  const reply = data?.candidates?.[0]?.content?.parts?.map(p => p.text).join('\n') || '';
  return reply;
}

app.post('/api/chat', chatLimiter, async (req, res) => {
  const { messages, mode } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  const SYSTEM_PROMPTS = {
    tutor: `You are After12th AI, a friendly, patient and expert tutor for Indian students preparing for NEET and JEE exams.
- Explain concepts step by step in simple, clear language suitable for Class 12 students.
- Support both English and Hinglish (mix of Hindi and English is fine).
- Cover Physics, Chemistry, Biology (for NEET) and Maths (for JEE).
- Also answer questions about college admissions, branch selection, and career paths.
- After explaining a concept, always add a section starting with "📝 In the Exam:" that tells how this topic appears in NEET/JEE, typical question types, and marks weightage.
- Be encouraging, motivating, and concise. Use bullet points and structure your answers clearly.
- Never make up specific cutoff ranks or admission data — say you don't have exact current data.`,

    branch: `You are a career counselor for Indian students. Based on the student's quiz answers, recommend the best engineering/medical branch for them.
Reply ONLY with valid JSON (no markdown fences) in this exact format:
{
  "topBranch": "CSE",
  "reason": "Your analytical skills and interest in technology make CSE ideal...",
  "branches": [
    {"name": "CSE", "match": 95, "scope": "Very High", "avgSalary": "12-25 LPA", "description": "..."},
    {"name": "ECE", "match": 80, "scope": "High", "avgSalary": "8-18 LPA", "description": "..."},
    {"name": "Mechanical", "match": 60, "scope": "Moderate", "avgSalary": "6-14 LPA", "description": "..."}
  ],
  "careerPaths": ["Software Engineer", "Data Scientist", "Product Manager"],
  "message": "Based on your interests and strengths, here's what we recommend..."
}`,

    planner: `You are a study planner AI for Indian competitive exam students. Create a structured day-by-day study timetable.
Reply ONLY with valid JSON (no markdown fences) in this exact format:
{
  "overview": "Your personalized study plan for the next 8 weeks...",
  "weeklyPlan": [
    {
      "week": 1,
      "theme": "Foundation Building",
      "days": [
        {"day": "Monday", "subjects": [{"subject": "Physics", "topic": "Mechanics", "hours": 3}, {"subject": "Chemistry", "topic": "Organic - Basics", "hours": 2}], "totalHours": 5},
        {"day": "Tuesday", "subjects": [{"subject": "Biology", "topic": "Cell Biology", "hours": 3}, {"subject": "Revision", "topic": "Previous day topics", "hours": 1}], "totalHours": 4}
      ]
    }
  ],
  "tips": ["Take a 10-minute break every hour", "Solve previous year questions daily"],
  "milestones": ["Week 2: Complete all Physics chapters", "Week 4: First full mock test"]
}`,

    college: `You are a college admissions advisor for India. Based on the student's predicted rank and preferences, recommend colleges.
Reply ONLY with valid JSON (no markdown fences) in this exact format:
{
  "shortlist": [
    {
      "college": "IIT Bombay",
      "branch": "Computer Science",
      "type": "IIT",
      "location": "Mumbai, Maharashtra",
      "nirf": 3,
      "fees": "2.3 LPA",
      "cutoff2024": "General: 67, OBC: 198, SC: 485",
      "chance": "Reach",
      "reason": "Top choice if rank improves"
    }
  ],
  "message": "Based on your rank, here are colleges you can target..."
}`
  };

  const systemPrompt = SYSTEM_PROMPTS[mode] || SYSTEM_PROMPTS.tutor;

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      const demoReplies = {
        tutor: "Hello! I'm After12th AI. Your Gemini API key is not set yet. Get a FREE key at https://aistudio.google.com/ and add it to the .env file. Once set up, I can help you with Physics, Chemistry, Biology, Maths, and all your NEET/JEE doubts!",
        branch: JSON.stringify({ topBranch: "CSE", reason: "Demo mode - add API key", branches: [{ name: "CSE", match: 90, scope: "Very High", avgSalary: "12-25 LPA", description: "Computer Science Engineering" }], careerPaths: ["Software Engineer"], message: "Please set your GEMINI_API_KEY to get personalized recommendations." }),
        planner: JSON.stringify({ overview: "Demo mode", weeklyPlan: [{ week: 1, theme: "Foundation", days: [{ day: "Monday", subjects: [{ subject: "Physics", topic: "Mechanics", hours: 3 }], totalHours: 3 }] }], tips: ["Set your API key for a personalized plan"], milestones: ["Complete setup"] }),
        college: JSON.stringify({ shortlist: [{ college: "IIT Delhi", branch: "CSE", type: "IIT", location: "New Delhi", nirf: 2, fees: "2.1 LPA", cutoff2024: "General: 54", chance: "Reach", reason: "Set API key for personalized list" }], message: "Demo mode - please configure your API key." })
      };
      return res.json({ reply: demoReplies[mode] || demoReplies.tutor });
    }

    let reply = await callGemini({ systemPrompt, messages });

    if (mode && mode !== 'tutor') {
      reply = reply.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
    }

    res.json({ reply });
  } catch (err) {
    console.error('Gemini API error:', err.message);
    res.status(500).json({ error: 'AI service error. Please try again.' });
  }
});

const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));
app.get('/{*splat}', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🚀 After12th AI server running on http://localhost:${PORT}`);
  console.log(`🤖 Provider: Google Gemini (${GEMINI_MODEL})`);
  const k = process.env.GEMINI_API_KEY;
  const keySet = k && k !== 'your_gemini_api_key_here';
  console.log(`🔑 API key: ${keySet ? '✅ Set' : '❌ Not set (get FREE key at https://aistudio.google.com/)'}\n`);
});
