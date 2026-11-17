# CLAUDE.md

Personal portfolio site (projects, blog, about, contact) deployed on Vercel at https://devmab.vercel.app.

## Stack

- React 18 + TypeScript, Vite 5 (SWC), React Router 6 (client-side routing; `vercel.json` rewrites all paths to `index.html`)
- Tailwind CSS 3 + shadcn/ui (Radix) components in `src/components/ui/`
- `react-helmet-async` for per-page `<title>`/meta
- Path alias: `@/` → `src/`

## Commands

```bash
npm ci
npm run dev        # http://localhost:8080
npm run build      # sitemap + production build → dist/
npm run lint       # ESLint (currently 0 problems; keep it that way)
npm run typecheck  # strict TypeScript for src/ and the node-side files (vite/tailwind config, scripts/)
npm run check      # lint + typecheck + build — exactly what CI runs
```

CI (`.github/workflows/ci.yml`) runs `npm run lint`, `npm run typecheck` and `npm run build` on every push to `main` and every PR. Dependabot opens grouped dependency PRs monthly.

Use npm only (`package-lock.json`). Do not add or regenerate `bun.lockb`.

## Architecture

The site is **fully static**: there is no backend, database, login or admin area. `docs/IMPLEMENTATION_GUIDE.md` records how it got here; only its optional Phase 7 remains.

- **Content:** `src/content/projects.ts` and `src/content/posts.ts` are the single source of truth: typed arrays imported directly by pages, with no fetching, `useEffect` or loading states. Publishing = edit the file and push.
- **URLs:** projects and posts are addressed by a human-readable `slug` (`/projects/:slug`, `/blog/:slug`).
- **Drafts:** a project with `draft: true` is excluded from every page. Use it for entries whose details aren't known yet.
- **Real data only:** never invent project details (timelines, roles, metrics, features) or use placeholder links. Leave optional fields out; the UI hides empty sections and buttons.
- **Blog:** bodies are Markdown rendered with `react-markdown` + `remark-gfm` (raw HTML is escaped). Never use `dangerouslySetInnerHTML` for content. While `posts` is empty, the Blog nav/footer links and the homepage articles section are hidden.
- **Contact form:** posts to Web3Forms using `VITE_WEB3FORMS_KEY` (see `.env.example`).
- **Theme:** `ThemeProvider` in `src/context/ThemeContext.tsx`; the context and `useTheme` hook live in `src/context/theme.ts` (split so Fast Refresh works). Storage access is wrapped in try/catch.
- **Typography:** blog bodies use Tailwind `prose` classes from `@tailwindcss/typography` (registered in `tailwind.config.ts`).
- **Images:** project images live in `public/project-images/` and are referenced by full path (`/project-images/foo.webp`).
- **SEO:** every page renders `<Seo title description path />` (`src/components/Seo.tsx`); use `noindex` for not-found/empty pages. Site-wide defaults live in `src/lib/site.ts` and are mirrored as static tags in `index.html` (marked `data-static-seo`, removed at startup in `src/main.tsx`). `public/sitemap.xml` is generated from the content files by `npm run sitemap` (runs automatically as `prebuild`) and is git-ignored; don't edit it by hand.

## Rules

- **Do not store site data in `localStorage`.** It lives only in the visitor's browser. Use it only for UI preferences (the theme).
- **No secrets in the client bundle.** Anything prefixed `VITE_` is public. The Web3Forms *access key* is designed to be public; Web3Forms API keys, and any Supabase service or admin keys, must never be committed or bundled.
- Do not add third-party `<script>` tags to `index.html`.
- Strict TypeScript is on. Don't use `any`, `@ts-ignore`/`@ts-expect-error` or non-null assertions (`x!`) to silence errors; fix the types. (The only `!` is `getElementById('root')!` in `src/main.tsx`, where the element is guaranteed by `index.html`.)
- Remove `console.log` before committing. `console.error` inside a `catch` block is fine.
- Images are WebP, at most 1200 px wide and ideally under 300 KB (project images in `public/project-images/`). Give every `<img>` an `alt` and `width`/`height`; use `loading="lazy"` below the fold, and `{...highPriority}` from `src/lib/img.ts` for the main above-the-fold image (React 18 doesn't accept the camelCase `fetchPriority` prop).
- Routes other than `/` are lazy-loaded in `src/App.tsx`; add new pages the same way. Only add a shadcn component (`npx shadcn@latest add <name>`) when it is actually used; unused ones were removed.
- Every page sets a title and description through the shared `<Seo>` component.
- Keep changes small and focused: one topic per branch/PR.

## Before you say a change is done

1. `npm run check` passes (lint, strict typecheck, build).
2. For UI changes, run `npm run dev` and check the affected pages in light and dark mode at phone width.
