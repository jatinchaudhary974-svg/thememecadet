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


## Mock mode

Set the server-side environment variable `CADET_AI_MOCK_MODE=true` to use local simulated responses. Mock mode still requires Supabase authentication and the existing CORS, validation and rate-limit checks, but it does not require or call OpenAI. Responses are explicitly labelled as simulated. Remove or set the flag to `false` to use the existing OpenAI provider (which requires `OPENAI_API_KEY`).

Run the mock response unit tests from this directory with:

```bash
node --test tests/mock-responses.test.cjs
```

Mock responses are rule/template-based demonstrations, not a substitute for live AI or verified current information.
