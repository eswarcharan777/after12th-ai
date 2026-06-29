// ═════════════════════════════════════════════════════════════════
//  API ENDPOINT: POST /api/chat
//  Handles all AI tutor conversations (Gemini-powered)
//  Used by: AI Tutor, Branch Guide, Study Planner, College Finder
// ═════════════════════════════════════════════════════════════════

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

// System prompts for each mode the frontend sends
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
        {"day": "Monday", "subjects": [{"subject": "Physics", "topic": "Mechanics", "hours": 3}], "totalHours": 3}
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
}`,
};

const DEMO_REPLIES = {
  tutor: "Hello! I'm After12th AI. Your Gemini API key is not set yet. Get a FREE key at https://aistudio.google.com/ and add it to the .env file.",
  branch: JSON.stringify({ topBranch: "CSE", reason: "Demo mode - add API key", branches: [{ name: "CSE", match: 90, scope: "Very High", avgSalary: "12-25 LPA", description: "Computer Science Engineering" }], careerPaths: ["Software Engineer"], message: "Please set your GEMINI_API_KEY to get personalized recommendations." }),
  planner: JSON.stringify({ overview: "Demo mode", weeklyPlan: [{ week: 1, theme: "Foundation", days: [{ day: "Monday", subjects: [{ subject: "Physics", topic: "Mechanics", hours: 3 }], totalHours: 3 }] }], tips: ["Set your API key for a personalized plan"], milestones: ["Complete setup"] }),
  college: JSON.stringify({ shortlist: [{ college: "IIT Delhi", branch: "CSE", type: "IIT", location: "New Delhi", nirf: 2, fees: "2.1 LPA", cutoff2024: "General: 54", chance: "Reach", reason: "Set API key for personalized list" }], message: "Demo mode - please configure your API key." }),
};

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
  return data?.candidates?.[0]?.content?.parts?.map(p => p.text).join('\n') || '';
}

// Express handler — used by backend/server.cjs
async function chatHandler(req, res) {
  const { messages, mode } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  const systemPrompt = SYSTEM_PROMPTS[mode] || SYSTEM_PROMPTS.tutor;

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return res.json({ reply: DEMO_REPLIES[mode] || DEMO_REPLIES.tutor });
    }

    let reply = await callGemini({ systemPrompt, messages });

    // Strip ```json fences if present (for non-tutor modes)
    if (mode && mode !== 'tutor') {
      reply = reply.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
    }

    res.json({ reply });
  } catch (err) {
    console.error('Gemini API error:', err.message);
    res.status(500).json({ error: 'AI service error. Please try again.' });
  }
}

module.exports = { chatHandler, GEMINI_MODEL };
