# VEQWERIS

VEQWERIS is a Next.js App Router website. It requires Node.js 20.9 or newer.

## Run locally

Install dependencies from the npm lockfile and start the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The public site runs without
third-party credentials. Optional environment variables are documented in
[.env.example](./.env.example); copy that file to `.env.local` to configure them.

## Verify and run production

```bash
npm run typecheck
npm run build
npm run start
```

The server listens on port 3000 by default. Set `PORT` when the hosting platform
provides a different port. `GET /api/health` returns `{"status":"ok"}` for basic
platform health checks.

## Optional integrations

Google sign-in uses the server-side OAuth flow at `/api/auth/google`. Set
`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI`, and a
cryptographically random `AUTH_SESSION_SECRET` in the deployment environment
(generate one with `node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"`).
Register the callback URL exactly in Google Cloud; use the HTTPS production
URL outside local development. Never commit `.env.local` or real credentials.

`NEXT_PUBLIC_SYSTEMS_APP_URL` optionally points the Systems button to a
separately deployed app. Otherwise it points to this site's `/systems` page.

## Deployment limitations

- Deploy as a Node.js application (or a compatible Next.js platform), not as a
  static export. The site has server-rendered routes and API handlers.
- Account registration and the admin panel currently use demo/local storage
  behavior. Configure a real identity provider before using them for real users.
- Password reset and MFA are not connected to an email or authenticator
  provider yet.
- Admin-managed uploads are stored in `data/uploads.json` on the server and
  media is held as data URLs. This is suitable only for local/demo use; ephemeral
  or multi-instance deployments need persistent object storage and a database.
- `GET /api/health` confirms the app responds; it does not verify external
  services or persistent storage.

## Project scripts

- `npm run dev` — local development server
- `npm run typecheck` — TypeScript validation
- `npm run build` — optimized production build
- `npm run start` — production server (after building)
