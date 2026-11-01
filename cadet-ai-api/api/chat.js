const DEFAULT_ALLOWED_ORIGINS = ["https://thememecadet.in"];
const { generateMockResponse } = require("./mock-responses.js");

const MODULE_INSTRUCTIONS = {
  defence: "You are Cadet AI's Defence Assistant. Help with defence careers, NDA, CDS, AFCAT, SSB awareness and preparation. Be accurate, distinguish official facts from general guidance, and advise checking current official notifications for dates, eligibility and rules. Never help with violence, weapons or operational harm.",
  study: "You are Cadet AI's Study Assistant. Explain concepts clearly, adapt to the learner's level, use step-by-step reasoning, and offer practice questions when useful. Encourage learning rather than simply dumping answers.",
  knowledge: "You are Cadet AI's TMC Knowledge Assistant. You may explain the general identity and mission of The Meme Cadet, but do not invent private company facts, current metrics, unpublished resources or policies. State when you do not know.",
  companion: "You are Cadet AI's Companion. Help users plan, reflect and take practical next steps. Be supportive, realistic and non-judgmental. Avoid unhealthy pressure or extreme routines."
};

const requestCounts = new Map();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 20;

function allowedOrigins() {
  const configured = process.env.CADET_AI_ALLOWED_ORIGINS;
  return configured
    ? configured.split(",").map((value) => value.trim()).filter(Boolean)
    : DEFAULT_ALLOWED_ORIGINS;
}

function applyCors(req, res) {
  const origin = req.headers.origin;
  const allowed = allowedOrigins();
  if (req.method === "OPTIONS") {
    if (!origin || !allowed.includes(origin)) return false;
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Max-Age", "600");
    return true;
  }
  if (origin && !allowed.includes(origin)) return false;
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  return true;
}

function checkTemporaryRateLimit(userId) {
  const now = Date.now();
  const entry = requestCounts.get(userId);
  if (!entry || now - entry.startedAt >= WINDOW_MS) {
    requestCounts.set(userId, { startedAt: now, count: 1 });
    return true;
  }
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) return false;
  entry.count += 1;
  return true;
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") {
    if (!applyCors(req, res)) return res.status(403).end();
    return res.status(204).end();
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!applyCors(req, res)) return res.status(403).json({ error: "Origin not allowed" });

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const mockMode = process.env.CADET_AI_MOCK_MODE === "true";
  if (!supabaseUrl || !supabaseAnonKey) {
    return res.status(503).json({ error: "Cadet AI chat is not configured yet." });
  }

  const authorization = req.headers.authorization || "";
  const accessToken = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
  if (!accessToken || accessToken.length > 5000) {
    return res.status(401).json({ error: "Please sign in again to continue." });
  }

  let user;
  try {
    const authResponse = await fetch(`${supabaseUrl.replace(/\/$/, "")}/auth/v1/user`, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!authResponse.ok) return res.status(401).json({ error: "Your session is invalid or expired. Please sign in again." });
    user = await authResponse.json();
    if (!user?.id) return res.status(401).json({ error: "Unable to verify your account." });
  } catch {
    return res.status(502).json({ error: "Could not verify your account right now." });
  }

  if (!checkTemporaryRateLimit(user.id)) {
    return res.status(429).json({ error: "You've reached the current chat limit. Please try again later." });
  }

  const body = req.body || {};
  const moduleId = typeof body.module === "string" ? body.module : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const history = Array.isArray(body.history) ? body.history.slice(-10) : [];
  if (!MODULE_INSTRUCTIONS[moduleId]) return res.status(400).json({ error: "Choose a valid Cadet AI module." });
  if (!message || message.length > 4000) return res.status(400).json({ error: "Message must be between 1 and 4000 characters." });
  const safeHistory = [];
  for (const item of history) {
    if (!item || !["user", "assistant"].includes(item.role) || typeof item.content !== "string") continue;
    const content = item.content.trim();
    if (content && content.length <= 4000) safeHistory.push({ role: item.role, content });
  }

  if (mockMode) {
    const answer = generateMockResponse(moduleId, message, safeHistory);
    return res.status(200).json({ answer, module: moduleId, mode: "mock" });
  }

  if (!openaiKey) {
    return res.status(503).json({ error: "Cadet AI chat is not configured yet." });
  }

  try {
    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openaiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: MODULE_INSTRUCTIONS[moduleId] },
          ...safeHistory,
          { role: "user", content: message },
        ],
        max_tokens: 700,
        temperature: 0.5,
      }),
    });

    if (!aiResponse.ok) {
      const status = aiResponse.status;
      if (status === 429) return res.status(429).json({ error: "Cadet AI is busy. Please try again shortly." });
      if (status === 401 || status === 403) return res.status(503).json({ error: "AI service configuration needs attention." });
      return res.status(502).json({ error: "Cadet AI could not complete that response. Please try again." });
    }

    const payload = await aiResponse.json();
    const answer = payload.choices?.[0]?.message?.content?.trim();
    if (!answer) return res.status(502).json({ error: "Cadet AI returned an empty response. Please try again." });
    return res.status(200).json({ answer, module: moduleId, mode: "live" });
  } catch {
    return res.status(502).json({ error: "Cadet AI is temporarily unavailable. Please try again." });
  }
}
