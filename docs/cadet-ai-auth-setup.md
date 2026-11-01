# Cadet AI authentication setup

## Frontend (GitHub Pages)

Set these build-time environment variables in the GitHub Pages workflow before building:

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase publishable/anon key

The publishable/anon key is intended for browser use. Row Level Security must remain enabled. Never put a Supabase service-role/secret key or OpenAI API key in a `NEXT_PUBLIC_*` variable.

## Routes

- `/auth/signup`: creates an account and sends email confirmation when confirmation is enabled.
- `/auth/login`: signs in with email and password.

After successful sign-in the UI navigates to `/cadet-ai`. That workspace route is a subsequent milestone and is not included yet.

## Supabase Auth URL configuration

- Site URL: `https://thememecadet.in`
- Redirect allow-list should include `https://thememecadet.in/**`

## Important deployment note

The current GitHub Pages workflow builds the site but does not yet inject the two public Supabase build variables. Until those variables are configured in GitHub Actions, the auth forms intentionally show a configuration error rather than attempting a request.

Email confirmation should be tested using a real signup after deployment. Confirm that the signup trigger creates exactly one matching row in `public.profiles`.
