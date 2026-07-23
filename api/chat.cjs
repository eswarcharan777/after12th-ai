// ═════════════════════════════════════════════════════════════════
//  API ENDPOINT: POST /api/chat
//  Handles all AI tutor conversations (Gemini-powered)
//  Used by: AI Tutor, Branch Guide, Study Planner, College Finder
// ═════════════════════════════════════════════════════════════════

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

// Persona tweaks applied on top of the tutor system prompt
const PERSONAS = {
  friendly:     'Speak warmly like a friendly senior. Use encouraging language and light humor.',
  strict:       'Speak like a strict, no-nonsense professor. Be direct, precise, and challenging.',
  motivational:'Speak like a fiery motivational coach. Use powerful energetic language, push the student.',
  chill:        'Speak like a chill, calm friend. Very casual tone, keep it low-pressure.',
};

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

  photo: `You are After12th AI Vision. The user has uploaded a photo of a NEET/JEE question. Read the question carefully, then:
1. State the topic/subject and question type.
2. Solve step-by-step in clear language.
3. Give the final answer clearly boxed like: **Answer: (option/value)**.
4. End with "📝 In the Exam:" section on how this concept appears in NEET/JEE.
If the image is unclear or not a question, say so briefly.`,

  summarize: `You are an expert NEET/JEE note summarizer. Given raw study content, produce clean revision notes with:
- A one-line topic title
- Key concepts as bullet points (max 8)
- Important formulas / reactions in a boxed section
- 3 quick MCQ-style recall questions with answers at the end
Keep it exam-focused, no fluff.`,

  qgen: `You are a NEET/JEE question paper generator. Generate custom MCQ questions based on the user's request.
Reply ONLY with valid JSON (no markdown fences) in this exact format:
{
  "title": "Physics — Kinematics — 5 Questions",
  "questions": [
    {"id": 1, "subject": "Physics", "topic": "Kinematics", "question": "A body moves with...", "options": ["A) 10 m/s", "B) 20 m/s", "C) 30 m/s", "D) 40 m/s"], "correct": 1, "explanation": "Using v = u + at..."}
  ]
}
Difficulty defaults to medium if not specified. Match NEET/JEE style precisely.`,

  roadmap: `You are a personalized roadmap AI for NEET/JEE aspirants. Based on the student's current level, target exam, and time available, build a complete prep roadmap.
Reply ONLY with valid JSON (no markdown fences) in this exact format:
{
  "summary": "You have X months to target NEET. Here is your plan...",
  "phases": [
    {"phase": "Phase 1: Foundation (Month 1-2)", "focus": "Complete Class 11 syllabus", "subjects": ["Physics: Mechanics", "Chemistry: Physical", "Biology: Diversity"], "goals": ["Cover 60% syllabus", "Score 400+ in first mock"]},
    {"phase": "Phase 2: Advanced (Month 3-4)", "focus": "...", "subjects": ["..."], "goals": ["..."]}
  ],
  "dailySchedule": ["6-8 AM: Physics", "9-11 AM: Chemistry", "..."],
  "resources": ["NCERT", "HC Verma", "..."],
  "milestones": ["Month 1: 400+ mock score", "Month 3: 550+"],
  "warning": "One key mistake to avoid based on your profile"
}`,

  explain: `You are After12th AI, an expert NEET/JEE tutor writing a DEEPER explanation for a specific MCQ that a student got wrong (or wants to understand better).
The user message contains JSON like: { "question": "...", "options": ["A","B","C","D"], "correct": 2, "userAnswer": 1, "subject": "Physics", "chapter": "Optics", "baseExplanation": "..." }
Return PLAIN MARKDOWN (no code fences) with this exact structure:

**🧩 Concept**
2-3 sentence intuition of the underlying concept.

**🧮 Step-by-step**
Numbered steps. Show every formula, substitution and unit. Use ASCII math or unicode (√, ², π, Δ, μ).

**❌ Why your answer was wrong**
Address the user's picked option specifically. If userAnswer === correct, skip this section.

**✅ Why the correct answer works**
1-2 lines confirming the right option.

**📝 In the exam**
One tip about how this concept typically appears in NEET/JEE (question type, common trap, weightage).

Keep total under 250 words. No greetings, no sign-offs.`,

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

async function callGemini({ systemPrompt, messages, image }) {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  // Attach image to the last user message for vision mode
  if (image && image.data && contents.length > 0) {
    const last = contents[contents.length - 1];
    last.parts.push({ inlineData: { mimeType: image.mimeType || 'image/jpeg', data: image.data } });
  }

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
  const { messages, mode, image, persona } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  let systemPrompt = SYSTEM_PROMPTS[mode] || SYSTEM_PROMPTS.tutor;
  if ((mode === 'tutor' || !mode) && persona && PERSONAS[persona]) {
    systemPrompt += `\n\nPERSONA: ${PERSONAS[persona]}`;
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return res.json({ reply: DEMO_REPLIES[mode] || DEMO_REPLIES.tutor });
    }

    let reply = await callGemini({ systemPrompt, messages, image });

    // Strip ```json fences if present (for structured modes)
    if (mode && !['tutor', 'photo', 'summarize', 'explain'].includes(mode)) {
      reply = reply.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
    }

    res.json({ reply });
  } catch (err) {
    console.error('Gemini API error:', err.message);
    res.status(500).json({ error: 'AI service error. Please try again.' });
  }
}

module.exports = { chatHandler, GEMINI_MODEL };
