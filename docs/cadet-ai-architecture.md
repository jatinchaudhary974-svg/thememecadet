# Cadet AI — Product and Foundation Architecture v1

## Locked product decisions

- Product: one unified Cadet AI with four modular capabilities: Defence Assistant, Study Assistant, TMC Knowledge Assistant, and Cadet Companion.
- AI provider: OpenAI API. Select the specific model only after a cost/quality evaluation; do not hard-code a model choice into the product architecture.
- Access: open to visitors. Anonymous visitors may use session-only conversations; signing in is required to save and retrieve account conversation history.
- Language: adaptive. Detect and respond in the user's language, with an explicit override available in the interface.
- Conversation history: account-based persistence for signed-in users. Users must be able to view and delete their own conversations. Do not store anonymous conversations permanently.
- Hosting: GitHub Pages remains the existing public website host. Vercel hosts a separate Cadet AI API project. Do not change DNS or move the public site.

## Hosting and repository layout

- Existing website remains the static frontend on GitHub Pages.
- `cadet-ai-api/` is an isolated Vercel subproject. Configure a separate Vercel project with Root Directory `cadet-ai-api`.
- API routes and provider integration live only inside that subproject.
- The current Vercel project that deployed the full Next.js site is a preview/verification deployment; do not attach the production custom domain to it.
- CORS must allow only the exact production website origin and explicitly approved preview origins. CORS is not authentication and must not be treated as an access-control boundary.

## Product capabilities

1. Defence Assistant: NDA/CDS/AFCAT information, exam preparation guidance, SSB awareness and defence knowledge. Time-sensitive or official exam claims require authoritative source verification.
2. Study Assistant: concept explanations, doubt solving, practice questions and revision support.
3. TMC Knowledge Assistant: answer from approved TMC pages and resources; distinguish retrieved facts from general model knowledge.
4. Cadet Companion: planning, reflection, learning guidance and sustainable study support.

A single orchestration layer classifies intent and routes requests to modular capability instructions. Avoid a multi-agent architecture in v1; use one provider integration and deterministic routing.

## Account and conversation architecture

- Public access does not mean permanent anonymous storage. Anonymous visitors get temporary, session-only use.
- Account sign-in is required to persist conversation history. Choose an authentication provider and implement secure server-side session verification before enabling account history.
- Enforce ownership checks on every conversation read, update and delete operation.
- Provide clear notice about what is stored, a conversation deletion control, and a privacy policy before persistent history launches.
- Do not store secrets or unnecessary sensitive personal data in conversation metadata.
- Database is now required for account-based history, but only introduce the minimum collections/tables needed after the authentication and database choices are approved. The existing `mongodb` package alone does not prove a MongoDB connection is configured.

## Security and spending controls required before AI launch

- Keep OpenAI API keys server-side in Vercel environment variables; never expose them in browser bundles or public-prefixed variables.
- Validate request bodies, enforce input/output limits, and reject malformed requests.
- Add per-IP and per-account rate limits, abuse controls, and a daily request/token budget.
- Configure provider-side spending alerts or hard limits where available; application budgets are also required.
- Return generic client errors; never leak stack traces, secrets, or internal provider responses.
- Use request IDs and privacy-conscious operational logs; do not log full conversation contents by default.
- Treat CORS as browser policy only, not as a substitute for authentication, authorization, or rate limiting.

## First implementation milestone — API foundation

Implemented in this branch:
- A minimal `GET /api/health` endpoint in the isolated `cadet-ai-api/` subproject.
- It returns only service status and a non-sensitive service identifier.
- It does not call OpenAI, access a database, accept chat content, or require secrets.
- It handles preflight requests and uses an explicit allowlist of configured origins.

Deployment verification:
1. Create a separate Vercel project from this repository.
2. Set Root Directory to `cadet-ai-api`.
3. Add `CADet_AI_ALLOWED_ORIGINS` as a server-side environment variable containing comma-separated exact origins, e.g. `https://thememecadet.in,https://www.thememecadet.in` only if both are actually used. The endpoint defaults to the canonical `https://thememecadet.in`.
4. Deploy a preview and test `GET /api/health` and an allowed-origin preflight.
5. Do not connect the website UI or add the OpenAI key in this milestone.

## Next decisions before account history and AI chat

- Select authentication provider and account model.
- Confirm database provider and retention/deletion policy.
- Set an explicit monthly and daily API spending ceiling.
- Select the OpenAI model based on measured quality, latency and cost.
- Confirm whether guest usage needs a request quota and what that quota should be.

## Safe rollout

1. Review this architecture and health endpoint PR.
2. Create and verify the separate Vercel API project using a preview deployment.
3. Implement authentication and account-scoped conversation persistence.
4. Add OpenAI integration, adaptive language handling, request validation, rate limits and budgets.
5. Add curated TMC knowledge retrieval and the four capability routes/instructions.
6. Connect the public website only after security, privacy, cost and mobile tests pass.
7. Merge to `main` only after checks and explicit owner approval.

## Existing GitHub Pages workflow note

The repository workflow uploads `./out`, while `next.config.js` declares `output: 'standalone'`. This is a potential build-configuration mismatch. Do not modify the existing website workflow as part of the API subproject; inspect the latest GitHub Actions results and verify the current live deployment process separately.
