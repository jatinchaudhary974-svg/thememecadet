# Cadet AI — Foundation Architecture

## Hosting decision

- GitHub Pages remains the existing public website host for `thememecadet.in`.
- Vercel will host the Cadet AI backend only.
- The current Vercel project that deploys the full Next.js site is a preview/verification deployment. Do not attach the production custom domain to it.
- Do not change DNS or replace the existing GitHub Pages deployment as part of this foundation work.

## Proposed deployment shape

1. Keep the existing Next.js website and its GitHub Pages workflow as the static frontend.
2. Add an isolated `cadet-ai-api/` subproject in this repository.
3. Create a separate Vercel project connected to this repository, with its Root Directory set to `cadet-ai-api`.
4. Put serverless API handlers and provider integration inside that subproject. The browser calls the Vercel API URL; provider credentials remain server-side.
5. Configure CORS to allow only the production website origin (and explicitly approved preview origins when needed).

This separation avoids mixing Next.js static export requirements for GitHub Pages with server-side API routes. It also avoids changing the current website's build output just to add an API.

## Security and cost controls required before launch

- Never expose provider API keys in client-side code or public environment variables.
- Validate request bodies and cap input/output sizes.
- Add per-IP and per-session rate limits with safe defaults.
- Add a daily request/token budget and provider-side spending alerts or hard limits where available.
- Return generic client errors; do not leak stack traces, secrets, or provider responses containing internal details.
- Add basic request IDs and privacy-conscious operational logs; do not log full private conversations by default.
- Keep database integration optional until a concrete feature requires persistence. The existing `mongodb` package alone does not mean a database connection is configured.

## Decisions still required

- Cadet AI's first user-facing job and supported audience.
- AI provider/model and a maximum cost target.
- Whether chat history must persist. If not, begin without a database.
- Exact production and preview origins allowed by CORS.

## Safe rollout sequence

1. Verify this architecture and the separate Vercel project setup.
2. Implement a minimal health endpoint in the isolated API subproject.
3. Deploy it to a Vercel preview URL and verify it without touching the public website.
4. Add the AI provider adapter and request validation after the provider/cost decision.
5. Connect the website UI only after API security, rate limits, and spending controls pass review.
6. Merge to `main` only after checks and explicit owner approval.

## Existing deployment note

The repository currently has a GitHub Pages workflow that uploads `./out`, while `next.config.js` declares `output: 'standalone'`. This is a build-configuration mismatch worth checking in CI. Do not make an unverified workflow change in this architecture-only step; inspect the latest GitHub Actions status and confirm how the current public site is built before changing it.
