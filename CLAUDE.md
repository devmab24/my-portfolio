# CLAUDE.md

Personal portfolio site (projects, blog, about, contact) deployed on Vercel at https://devmab.vercel.app.

## Stack

- React 18 + TypeScript, Vite 5 (SWC), React Router 6 (client-side routing; `vercel.json` rewrites all paths to `index.html`)
- Tailwind CSS 3 + shadcn/ui (Radix) components in `src/components/ui/`
- `react-helmet-async` for per-page `<title>`/meta
- Path alias: `@/` → `src/`

## Commands

```bash
npm install
npm run dev        # http://localhost:8080
npm run build      # production build → dist/
npm run lint
npx tsc -p tsconfig.app.json --noEmit   # typecheck (add as `npm run typecheck`, see guide Phase 6)
```

Use npm only (`package-lock.json`). Do not add or regenerate `bun.lockb`.

## Migration in progress

The site is being moved to a **fully static** setup. Follow `docs/IMPLEMENTATION_GUIDE.md` phase by phase, and tick its checklist when a phase is done. Until Phase 3 is finished, expect the legacy pieces below.

**Legacy (being removed, do not extend):**
- `src/integrations/supabase/mockClient.ts`: fake Supabase client backed by `localStorage`. All `supabase.from(...)` calls in pages hit this, not a real database. Its `update()`/`delete()` cannot be chained with `.eq()`, so admin edits fail.
- `src/hooks/supabase/client.ts`: re-exports the mock.
- `src/integrations/supabase/*.json`: unused copies of the mock's seed data.
- Admin area (`AdminContext`, `ProtectedRoute`, `pages/Admin*`, `components/admin/*`) and comments (`components/Comment*`). Its login is not real security.
- `supabase/`: config and a migration for a Supabase project that is no longer used.

**Target architecture (after Phase 3):**
- `src/content/projects.ts` and `src/content/posts.ts` are the single source of truth for content: typed arrays imported directly by pages, with no fetching, `useEffect` or loading states.
- Projects and posts are addressed by a human-readable `slug` (`/projects/:slug`, `/blog/:slug`), not UUIDs.
- Blog bodies are Markdown strings rendered with `react-markdown` (raw HTML is escaped). Never use `dangerouslySetInnerHTML` for content.
- The contact form posts to Web3Forms using `VITE_WEB3FORMS_KEY`.

## Rules

- **Do not store site data in `localStorage`.** It lives only in the visitor's browser. Use it only for UI preferences (the theme).
- **No secrets in the client bundle.** Anything prefixed `VITE_` is public. The Web3Forms *access key* is designed to be public; Web3Forms API keys, and any Supabase service or admin keys, must never be committed or bundled.
- Do not add third-party `<script>` tags to `index.html` (the old `cdn.gpteng.co` script is being removed).
- Remove `console.log` before committing. `console.error` inside a `catch` block is fine.
- Images go in `public/images/` as WebP, ideally under 300 KB each. Give every `<img>` an `alt`, `width`/`height`, and `loading="lazy"` unless it is above the fold.
- Every page sets a title and description through the shared `<Seo>` component (added in Phase 4).
- Don't hand-edit `src/components/ui/*` unless needed. Add new shadcn components with `npx shadcn@latest add <name>`, and only when they're used.
- Keep changes small and phase-scoped. One phase = one branch/PR.

## Before you say a change is done

1. `npm run lint` and the typecheck pass (or, during Phase 6, don't add new errors).
2. `npm run build` succeeds.
3. For UI changes, run `npm run dev` and check the affected pages in light and dark mode at phone width.
