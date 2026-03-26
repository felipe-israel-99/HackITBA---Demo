@AGENTS.md

# Todo App - HackITBA Demo

## Overview
Todo list app para demostrar Claude Code en HackITBA. Stack: Next.js 16 + Supabase + Tailwind CSS 4 + TypeScript.

## Tech Stack
- **Framework**: Next.js 16.2 (App Router, Turbopack)
- **UI**: React 19, Tailwind CSS 4
- **Backend**: Supabase (Auth + Postgres + RLS)
- **Deploy**: Vercel
- **Testing**: Playwright MCP

## Project Structure
```
src/
├── app/
│   ├── globals.css          # Tailwind theme config
│   ├── layout.tsx           # Root layout (Geist font)
│   └── page.tsx             # Entry point - auth check, renders LoginForm or TodoApp
├── components/
│   ├── LoginForm.tsx        # Email/password login and signup
│   ├── TodoApp.tsx          # Main app: header, filters (all/active/completed), todo list
│   ├── TodoItem.tsx         # Single todo: toggle complete, delete
│   └── AddTodo.tsx          # Form to create new todos
└── lib/
    ├── supabase.ts          # Lazy singleton Supabase client (getSupabase())
    └── types.ts             # Todo interface
supabase/
└── migrations/              # SQL migrations pushed with `npx supabase db push`
```

## Database Schema
Table `public.todos` with RLS enabled (each user only sees their own data):
- `id` uuid (PK, auto-generated)
- `user_id` uuid (FK → auth.users, cascade delete)
- `title` text (not null)
- `is_complete` boolean (default false)
- `created_at` timestamptz (default now())

## Key Patterns

### Supabase Client
Use `getSupabase()` from `@/lib/supabase` — it's a lazy singleton, never import at module top-level as a value. This avoids build errors during SSR.

### Auth Flow
`page.tsx` checks auth state via `getSupabase().auth.getUser()` and `onAuthStateChange`. Shows `LoginForm` if no user, `TodoApp` if authenticated.

### Adding DB Columns
1. `npx supabase migration new <name>` → creates SQL file in `supabase/migrations/`
2. Write ALTER TABLE in the migration file
3. `SUPABASE_ACCESS_TOKEN=<token> npx supabase db push` to apply
4. Update `Todo` interface in `src/lib/types.ts`
5. Update components that use the new field

## Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon/public key
- Both set in `.env.local` (local) and Vercel env vars (production)

## Commands
- `npm run dev` — dev server on localhost:3000
- `npm run build` — production build
- `npx vercel --prod` — deploy to production
- `SUPABASE_ACCESS_TOKEN=<token> npx supabase db push` — apply migrations

## Deployment
- **URL**: https://hackitba-nine.vercel.app
- **Vercel project**: felipes-projects-7ee1b425/hackitba
- **Supabase project ref**: ynprmtmbviktkssfwysc

## Demo Context
This app intentionally lacks **priority levels** and **due dates** — these are features designed to be added live during the HackITBA demo using Claude Code. See `DEMO_PROMPTS.md` for the exact prompts.
