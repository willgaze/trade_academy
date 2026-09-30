# Trade Academy

A learning platform for plumbing apprentices. Next.js, Prisma, and optional
OpenAI quiz generation.

## Status

The application runs and the core journey works end to end: register or sign
in, browse modules, open a module, open a lesson, record progress.

**There is no curriculum yet.** The seed creates one demo module,
"Introduction to Plumbing", with two placeholder lessons whose `content` is
prose rather than a video URL — so the lesson page correctly reports
"Invalid YouTube URL". Writing real training content is the outstanding work,
and it needs someone qualified to write it.

## Features

Built and working:

- 🔒 Authentication — register and sign in, credentials with bcrypt (NextAuth)
- 📚 Modules and lessons, with ordering and a published flag
- 📊 Per-user progress tracking
- 🎥 YouTube video player on lesson pages
- 📱 Mobile-first dark theme

Built but unproven, because there is no real content to exercise it:

- 🤖 Quiz generation from a video transcript via OpenAI. Optional — without
  `OPENAI_API_KEY` the lesson still renders and simply has no quiz.

## Tech Stack

- **Frontend:** Next.js 16, React 19, TailwindCSS, Radix UI, React Hot Toast
- **Backend:** Next.js API routes, Prisma ORM
- **Database:** PostgreSQL, via `DATABASE_URL` (Neon or any hosted Postgres)
- **Auth:** NextAuth.js v5 (Auth.js), credentials provider
- **AI:** OpenAI, for quiz generation only

## Getting Started

```bash
git clone https://github.com/willgaze/trade_academy.git
cd trade_academy
npm install
```

Create `.env` from the template:

```bash
cp .env.example .env
```

Use `.env`, not `.env.local`. The Prisma CLI reads `.env` only, and Next reads
it too, so one file covers both. A `DATABASE_URL` that lives only in
`.env.local` works in the app and fails every `prisma migrate` command.

Fill in:

| Key | Required | Notes |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string. Use the pooled one on serverless. |
| `NEXTAUTH_SECRET` | Yes | Generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Yes | Must match the port you run on, or sign-in redirects to a dead address |
| `OPENAI_API_KEY` | No | Quiz generation only; everything else works without it |

Create the database and seed it:

```bash
npx prisma migrate dev
npm run seed
```

The seed is idempotent — running it again will not duplicate rows.

Start the server:

```bash
npm run dev
```

Sign in with the seeded account: `test@example.com` / `password123`.

## Known Issues

- **`next-auth` is on a beta release** (`5.0.0-beta.32`). This is deliberate
  and it is not optional: every v4 release carries unpatched critical
  advisories, including an email-normalizer bypass and email misdelivery, so
  v5 is the only version with the fixes. Auth.js has shipped v5 as beta for a
  long time and it is widely used in production, but it is still labelled beta
  and its API can move. Pin it and read the release notes before upgrading.
- There is no seeded admin path for publishing a module. `published` is
  flipped directly in the database for now.

## Deploying

The database is Postgres specifically so this can run on serverless. SQLite
cannot: a Vercel function's filesystem is ephemeral, so there is nowhere to
keep `dev.db`.

1. Create a Postgres database (Neon, Supabase, or similar).
2. Set `DATABASE_URL`, `NEXTAUTH_SECRET` and `NEXTAUTH_URL` in the host's
   environment variables. `NEXTAUTH_URL` must be the deployed domain.
3. Run the migrations against that database: `npx prisma migrate deploy`.
4. Seed it if you want the demo account and the draft curriculum.

Nothing is published by default, so a fresh deployment shows an empty modules
page to a signed-in user. That is intentional.

## Project Structure

```
src/
├── app/              # Next.js app router pages and API routes
├── components/       # React components
└── lib/              # Auth, Prisma client, YouTube/OpenAI helpers
prisma/
├── schema.prisma     # Database schema
├── migrations/       # Migration history
└── seed.js           # Demo data (idempotent)
```

## License

MIT.
