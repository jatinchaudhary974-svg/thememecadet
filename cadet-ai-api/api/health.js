const DEFAULT_ALLOWED_ORIGINS = ["https://thememecadet.in"];

function getAllowedOrigins() {
  const configured = process.env.CADET_AI_ALLOWED_ORIGINS;
  if (!configured) return DEFAULT_ALLOWED_ORIGINS;
  return configured.split(",").map((origin) => origin.trim()).filter(Boolean);
}

export default function handler(req, res) {
  const allowedOrigins = getAllowedOrigins();
  const requestOrigin = req.headers.origin;
  const originIsAllowed = Boolean(requestOrigin && allowedOrigins.includes(requestOrigin));

  if (req.method === "OPTIONS") {
    if (!originIsAllowed) {
      return res.status(403).end();
    }
    res.setHeader("Access-Control-Allow-Origin", requestOrigin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Max-Age", "600");
    return res.status(204).end();
  }

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET, OPTIONS");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (requestOrigin && !originIsAllowed) {
    return res.status(403).json({ error: "Origin not allowed" });
  }

  if (originIsAllowed) {
    res.setHeader("Access-Control-Allow-Origin", requestOrigin);
    res.setHeader("Vary", "Origin");
  }

  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({
    status: "ok",
    service: "cadet-ai-api",
  });
}
