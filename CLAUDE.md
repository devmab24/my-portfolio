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

## Architecture

The site is **fully static**: there is no backend, database, login or admin area. Remaining cleanup work is tracked in `docs/IMPLEMENTATION_GUIDE.md`; tick its checklist when a phase is done.

- **Content:** `src/content/projects.ts` and `src/content/posts.ts` are the single source of truth: typed arrays imported directly by pages, with no fetching, `useEffect` or loading states. Publishing = edit the file and push.
- **URLs:** projects and posts are addressed by a human-readable `slug` (`/projects/:slug`, `/blog/:slug`).
- **Drafts:** a project with `draft: true` is excluded from every page. Use it for entries whose details aren't known yet.
- **Real data only:** never invent project details (timelines, roles, metrics, features) or use placeholder links. Leave optional fields out; the UI hides empty sections and buttons.
- **Blog:** bodies are Markdown rendered with `react-markdown` + `remark-gfm` (raw HTML is escaped). Never use `dangerouslySetInnerHTML` for content. While `posts` is empty, the Blog nav/footer links and the homepage articles section are hidden.
- **Contact form:** posts to Web3Forms using `VITE_WEB3FORMS_KEY` (see `.env.example`).
- **Images:** project images live in `public/project-images/` and are referenced by full path (`/project-images/foo.webp`).
- **SEO:** every page renders `<Seo title description path />` (`src/components/Seo.tsx`); use `noindex` for not-found/empty pages. Site-wide defaults live in `src/lib/site.ts` and are mirrored as static tags in `index.html` (marked `data-static-seo`, removed at startup in `src/main.tsx`). `public/sitemap.xml` is generated from the content files by `npm run sitemap` (runs automatically as `prebuild`) and is git-ignored; don't edit it by hand.

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
