# Cadet AI API

This directory is the isolated backend project for Cadet AI. Deploy it as a separate Vercel project with **Root Directory** set to `cadet-ai-api`.

## First milestone

- `GET /api/health` — minimal service health check.
- No AI provider calls, database access, user data, or secrets are used yet.

## Local smoke test

Run from this directory with Vercel CLI:

```bash
vercel dev
```

Then request `GET http://localhost:3000/api/health`.

## Vercel configuration

Optional server-side environment variable:

- `CADET_AI_ALLOWED_ORIGINS`: comma-separated exact origins. Defaults to `https://thememecadet.in`.

Do not add an OpenAI API key in this milestone. CORS is not authentication; authentication, authorization, rate limits and spending controls are required before chat endpoints are exposed.
