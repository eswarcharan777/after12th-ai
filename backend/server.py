"""
After12th AI — Python backend
Mirrors server.cjs feature-for-feature using Flask + Gemini.
Run:  py -3.11 server.py
"""

import os
import json
import requests
from flask import Flask, request, jsonify, send_from_directory, abort
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
GEMINI_MODEL   = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
PORT           = int(os.getenv("PORT", "3001"))

KEY_IS_PLACEHOLDER = (not GEMINI_API_KEY) or GEMINI_API_KEY == "your_gemini_api_key_here"

DIST_DIR = os.path.join(os.path.dirname(__file__), "dist")

app = Flask(__name__, static_folder=None)
CORS(app)

# Rate limit: 30 requests / minute / IP
limiter = Limiter(
    key_func=get_remote_address,
    app=app,
    default_limits=[],
    storage_uri="memory://",
)

SYSTEM_PROMPTS = {
    "tutor": (
        "You are After12th AI, a friendly, patient and expert tutor for Indian students preparing for NEET and JEE exams.\n"
        "- Explain concepts step by step in simple, clear language suitable for Class 12 students.\n"
        "- Support both English and Hinglish (mix of Hindi and English is fine).\n"
        "- Cover Physics, Chemistry, Biology (for NEET) and Maths (for JEE).\n"
        "- Also answer questions about college admissions, branch selection, and career paths.\n"
        '- After explaining a concept, always add a section starting with "📝 In the Exam:" that tells how this topic appears in NEET/JEE, typical question types, and marks weightage.\n'
        "- Be encouraging, motivating, and concise. Use bullet points and structure your answers clearly.\n"
        "- Never make up specific cutoff ranks or admission data — say you don't have exact current data."
    ),
    "branch": (
        "You are a career counselor for Indian students. Based on the student's quiz answers, recommend the best engineering/medical branch for them.\n"
        "Reply ONLY with valid JSON (no markdown fences) in this exact format:\n"
        '{ "topBranch": "CSE", "reason": "...", "branches": [{"name": "CSE", "match": 95, "scope": "Very High", "avgSalary": "12-25 LPA", "description": "..."}], '
        '"careerPaths": ["Software Engineer"], "message": "..." }'
    ),
    "planner": (
        "You are a study planner AI for Indian competitive exam students. Create a structured day-by-day study timetable.\n"
        "Reply ONLY with valid JSON (no markdown fences) in this exact format:\n"
        '{ "overview": "...", "weeklyPlan": [{"week": 1, "theme": "Foundation", '
        '"days": [{"day": "Monday", "subjects": [{"subject": "Physics", "topic": "Mechanics", "hours": 3}], "totalHours": 3}]}], '
        '"tips": ["..."], "milestones": ["..."] }'
    ),
    "college": (
        "You are a college admissions advisor for India. Based on the student's predicted rank and preferences, recommend colleges.\n"
        "Reply ONLY with valid JSON (no markdown fences) in this exact format:\n"
        '{ "shortlist": [{"college": "IIT Bombay", "branch": "CSE", "type": "IIT", "location": "Mumbai", '
        '"nirf": 3, "fees": "2.3 LPA", "cutoff2024": "General: 67", "chance": "Reach", "reason": "..."}], '
        '"message": "..." }'
    ),
}

DEMO_REPLIES = {
    "tutor": (
        "Hello! I'm After12th AI. Your Gemini API key is not set yet. Get a FREE key at "
        "https://aistudio.google.com/ and add it to the .env file. Once set up, I can help you "
        "with Physics, Chemistry, Biology, Maths, and all your NEET/JEE doubts!"
    ),
    "branch": json.dumps({
        "topBranch": "CSE",
        "reason": "Demo mode - add API key",
        "branches": [{"name": "CSE", "match": 90, "scope": "Very High", "avgSalary": "12-25 LPA",
                      "description": "Computer Science Engineering"}],
        "careerPaths": ["Software Engineer"],
        "message": "Please set your GEMINI_API_KEY to get personalized recommendations.",
    }),
    "planner": json.dumps({
        "overview": "Demo mode",
        "weeklyPlan": [{"week": 1, "theme": "Foundation",
                        "days": [{"day": "Monday",
                                  "subjects": [{"subject": "Physics", "topic": "Mechanics", "hours": 3}],
                                  "totalHours": 3}]}],
        "tips": ["Set your API key for a personalized plan"],
        "milestones": ["Complete setup"],
    }),
    "college": json.dumps({
        "shortlist": [{"college": "IIT Delhi", "branch": "CSE", "type": "IIT",
                       "location": "New Delhi", "nirf": 2, "fees": "2.1 LPA",
                       "cutoff2024": "General: 54", "chance": "Reach",
                       "reason": "Set API key for personalized list"}],
        "message": "Demo mode - please configure your API key.",
    }),
}


def call_gemini(system_prompt: str, messages: list) -> str:
    """Call the Gemini REST API and return the text reply."""
    url = (
        f"https://generativelanguage.googleapis.com/v1beta/models/"
        f"{GEMINI_MODEL}:generateContent?key={GEMINI_API_KEY}"
    )
    contents = [
        {
            "role": "model" if m.get("role") == "assistant" else "user",
            "parts": [{"text": m.get("content", "")}],
        }
        for m in messages
    ]
    body = {
        "systemInstruction": {"parts": [{"text": system_prompt}]},
        "contents": contents,
        "generationConfig": {"maxOutputTokens": 2048, "temperature": 0.7},
    }

    resp = requests.post(url, json=body, timeout=60)
    if not resp.ok:
        raise RuntimeError(f"Gemini API {resp.status_code}: {resp.text[:200]}")

    data = resp.json()
    candidates = data.get("candidates", [])
    if not candidates:
        return ""
    parts = candidates[0].get("content", {}).get("parts", [])
    return "\n".join(p.get("text", "") for p in parts)


@app.post("/api/chat")
@limiter.limit("30 per minute")
def chat():
    payload = request.get_json(silent=True) or {}
    messages = payload.get("messages")
    mode     = payload.get("mode") or "tutor"

    if not isinstance(messages, list) or not messages:
        return jsonify({"error": "messages array is required"}), 400

    system_prompt = SYSTEM_PROMPTS.get(mode, SYSTEM_PROMPTS["tutor"])

    # Demo mode if no real API key
    if KEY_IS_PLACEHOLDER:
        reply = DEMO_REPLIES.get(mode, DEMO_REPLIES["tutor"])
        return jsonify({"reply": reply})

    try:
        reply = call_gemini(system_prompt, messages)
        if mode != "tutor":
            # Strip ```json fences if present
            cleaned = reply.strip()
            if cleaned.startswith("```"):
                cleaned = cleaned.split("```", 2)[-1]
                if cleaned.startswith("json"):
                    cleaned = cleaned[4:]
                cleaned = cleaned.rstrip("`").strip()
            reply = cleaned
        return jsonify({"reply": reply})
    except Exception as err:
        print(f"Gemini API error: {err}")
        return jsonify({"error": "AI service error. Please try again."}), 500


# ── Serve built React frontend ──────────────────────────────────────────
@app.get("/")
def root():
    return send_from_directory(DIST_DIR, "index.html")


@app.get("/<path:path>")
def serve_static_or_spa(path):
    file_path = os.path.join(DIST_DIR, path)
    if os.path.isfile(file_path):
        return send_from_directory(DIST_DIR, path)
    # SPA fallback — let React Router handle the route
    return send_from_directory(DIST_DIR, "index.html")


if __name__ == "__main__":
    key_status = "❌ Not set (get FREE key at https://aistudio.google.com/)" if KEY_IS_PLACEHOLDER else "✅ Set"
    print(f"\n🚀 After12th AI server running on http://localhost:{PORT}")
    print(f"🤖 Provider: Google Gemini ({GEMINI_MODEL})")
    print(f"🔑 API key: {key_status}\n")
    app.run(host="0.0.0.0", port=PORT, debug=False)
