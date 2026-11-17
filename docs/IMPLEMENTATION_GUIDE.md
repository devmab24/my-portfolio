# Implementation Guide: Portfolio Cleanup

This guide turns the audit findings into seven small phases. Do them in order. Each phase is one branch and one PR, and the site still builds and deploys after each one.

## The core decision: go fully static

Today the site *pretends* to have a backend. A fake Supabase client stores everything in each visitor's browser, so:

- contact messages never reach the owner
- comments and admin edits are invisible to everyone else
- every visitor who "signs in with GitHub" becomes the owner

**We are removing the pretence rather than rebuilding a backend.** Content (projects, blog posts) becomes typed TypeScript files in the repo. To publish, you edit a file and push, and Vercel deploys. The only dynamic piece left is the contact form, which goes through a free form-to-email service (Web3Forms).

What we drop: the admin dashboard, the fake login, and blog comments. If comments are wanted later, see Phase 7 (Giscus, no backend needed).

## Progress checklist

- [x] Phase 0: Baseline
- [x] Phase 1: Quick security and hygiene fixes (owner still to do step 5: pause/delete the old Supabase project)
- [ ] Phase 2: Contact form that actually emails you
- [ ] Phase 3: Static content and removal of the fake backend
- [ ] Phase 4: SEO basics
- [ ] Phase 5: Performance
- [ ] Phase 6: Code quality and CI
- [ ] Phase 7 (optional): Pre-rendering, comments, tests

---

## Phase 0: Baseline (15 min)

```bash
git checkout -b chore/baseline
npm ci
npm run build                               # should pass
npm run lint 2>&1 | tail -1                 # note the count (was 52 problems)
npx tsc -p tsconfig.app.json --noEmit
```

Write down the lint count and the main JS bundle size from the build output (was ~918 KB / 263 KB gzip). You will compare against them later.

---

## Phase 1: Quick security and hygiene fixes (1 hour)

Branch: `fix/security-hygiene`

1. **Remove the third-party script.** In `index.html`, delete the `cdn.gpteng.co/gptengineer.js` `<script>` and the "DO NOT REMOVE" comment above it.
2. **Remove Lovable tooling.** `npm uninstall lovable-tagger`, then remove the `componentTagger` import and plugin from `vite.config.ts`.
3. **Stop logging passwords.** In `src/pages/AdminLogin.tsx`, delete the `console.log('Submitting login with:', { username, password })` line. (The whole file goes in Phase 3, but this is a live leak until then.)
4. **Delete the hardcoded Supabase URL and anon key** at the top of `src/context/AdminContext.tsx` (unused).
5. **Retire the old Supabase project.** In the Supabase dashboard for project `lemachbekmdprrdtthem`, pause or delete it. If you keep it, rotate its keys, because the anon key is in the git history.
6. **Patch dependencies.**
   ```bash
   npm audit fix          # non-breaking fixes only, NOT --force
   npm audit --omit=dev   # note what's left; most remaining items disappear in Phase 3/5
   ```
7. **One package manager.** `git rm bun.lockb`.
8. **Remove debug logs.** Delete every `console.log(` in `src/` (16 of them). Keep `console.error` inside `catch` blocks.

**Done when:** `npm run build` passes, the site works in `npm run dev`, and `grep -rn "console.log" src` returns nothing.

---

## Phase 2: Contact form that actually emails you (1 hour)

Branch: `feat/contact-web3forms`

1. Get a free access key at https://web3forms.com, sent to the email address you want messages delivered to.
2. Add it locally in `.env.local` (already git-ignored by `*.local`):
   ```
   VITE_WEB3FORMS_KEY=your-access-key
   ```
   Add the same variable in Vercel → Project → Settings → Environment Variables (Production and Preview).

   > The Web3Forms *access key* is designed to be used in the browser. It can only submit to your form. Never commit a Web3Forms *API key*: that is a different, secret credential.
3. Rewrite the submit handler in `src/components/ContactForm.tsx`:

   ```tsx
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     setIsSubmitting(true);
     try {
       const res = await fetch('https://api.web3forms.com/submit', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
         body: JSON.stringify({
           access_key: import.meta.env.VITE_WEB3FORMS_KEY,
           ...formData,                       // name, email (used as reply-to), subject, message
           from_name: 'Portfolio contact form',
           botcheck: botcheck,                // honeypot, see below
         }),
       });
       const result = await res.json();
       if (!result.success) throw new Error(result.message);
       toast({ title: 'Message sent!', description: "Thanks, I'll get back to you soon." });
       setFormData({ name: '', email: '', subject: '', message: '' });
     } catch (error) {
       console.error('Contact form error:', error);
       toast({
         title: 'Message not sent',
         description: 'Something went wrong. Please email me directly at <your address>.',
         variant: 'destructive',
       });
     } finally {
       setIsSubmitting(false);
     }
   };
   ```

4. Add a hidden honeypot field for spam. Real users never see it; bots fill it and Web3Forms drops the message:
   ```tsx
   const [botcheck, setBotcheck] = useState(false);
   // inside the <form>:
   <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off"
          checked={botcheck} onChange={(e) => setBotcheck(e.target.checked)} />
   ```
5. Remove the `supabase` import from `ContactForm.tsx`.
6. Make sure the Contact page also shows a plain `mailto:` link, as a fallback if the service is down.

**Done when:** a test submission from the deployed Preview URL arrives in your inbox, and replying to it goes to the sender's address.

---

## Phase 3: Static content and removal of the fake backend (half a day)

Branch: `refactor/static-content`. This is the largest phase. Work in the order below and run the build after each step.

### 3.1 Create the content files

**`src/content/projects.ts`**

```ts
import type { Project } from '@/types/project';

export const projects: Project[] = [
  {
    slug: 'ai-image-generator',
    title: 'AI Image Generator',
    description: "Generates images from text prompts using OpenAI's image API.",
    imageSrc: '/images/projects/ai-image-generator.webp',
    tags: ['Next.js', 'OpenAI API', 'Vercel'],
    demoUrl: 'https://imaginate-ai-phi.vercel.app',
    githubUrl: 'https://github.com/devmab24/<real-repo>',
    projectType: 'web',
    featured: true,
    timeline: '1 month',
    role: 'Frontend Developer',
    // challenges, key_feature, downloadUrl: optional
  },
  // ...one entry per project
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = projects.filter((p) => p.featured);
```

**`src/content/posts.ts`**

```ts
export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;        // ISO, e.g. '2025-03-15'
  category: string;
  tags: string[];
  imageUrl?: string;
  body: string;        // Markdown
}

export const posts: Post[] = [
  {
    slug: 'building-scalable-react-applications',
    title: 'Building Scalable React Applications',
    excerpt: '...',
    date: '2025-03-15',
    category: 'React',
    tags: ['react', 'architecture'],
    body: `
React has become the go-to library for building modern user interfaces...

## Component Organization
- By feature/domain
- By component type
`,
  },
];

export const publishedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const readTime = (p: Post) => `${Math.max(1, Math.round(p.body.split(/\s+/).length / 200))} min`;
```

Update `src/types/project.ts`: replace `id: string` with `slug: string`. Delete `src/types/projectsCards.ts` and `src/types/comment.ts`, and move `ProjectCardProps` into `ProjectCard.tsx`.

### 3.2 Fill the content, with real data only

Source data is in `src/integrations/supabase/projects.json` and `blog_posts.json`. Convert it into the files above, and fix these while you do it (from the audit):

- [ ] No `https://example.com` demo links. Use the real URL, or leave `demoUrl` out so the button is hidden.
- [ ] No bare `https://github.com` links. Use the real repo URL, or leave `githubUrl` out.
- [ ] Every image and description belongs to the right project (the homepage currently mixes up AI Image Generator, Task Manager and Recipe App).
- [ ] Blog posts: keep only posts you actually wrote and stand behind. Generic filler posts hurt more than an empty blog. Convert the HTML bodies to Markdown.
- [ ] Projects that should appear on the homepage have `featured: true`.

### 3.3 Point the pages at the content

| File | Change |
|---|---|
| `pages/Index.tsx` | Delete the hardcoded `featuredProjects` array and the posts `useEffect`. Import `featuredProjects` and `publishedPosts.slice(0, 3)`. |
| `pages/Projects.tsx` | Replace the fetch/transform/loading state with `import { projects }`. Keep the tab and tag filtering as is. |
| `pages/ProjectDetail.tsx` | `const { slug } = useParams(); const project = getProject(slug!);` If `!project`, render the not-found state. |
| `pages/Blog.tsx` | Use `publishedPosts`. |
| `pages/BlogPost.tsx` | Use `getPost(slug)`. Render the body with Markdown (3.4). Remove `CommentSection`. |
| `components/ProjectCard.tsx` | Link to `/projects/${project.slug}`. |
| `components/BlogCard.tsx` | Take a `Post`, link to `/blog/${post.slug}`, and use `readTime(post)`. |
| `App.tsx` | Routes become `/projects/:slug` and `/blog/:slug`. Remove the admin routes, `AdminProvider` and `ProtectedRoute`. Remove `QueryClientProvider` (unused). |

### 3.4 Safe Markdown rendering

```bash
npm install react-markdown remark-gfm
```

```tsx
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

<article className="prose dark:prose-invert max-w-none">
  <Markdown remarkPlugins={[remarkGfm]}>{post.body}</Markdown>
</article>
```

`react-markdown` escapes raw HTML by default, so this removes the `dangerouslySetInnerHTML` XSS risk. Do **not** add `rehype-raw`. (`@tailwindcss/typography` is already installed for the `prose` classes.)

### 3.5 Delete the fake backend

```bash
git rm -r src/integrations src/hooks/supabase supabase
git rm src/context/AdminContext.tsx src/components/ProtectedRoute.tsx
git rm src/pages/AdminLogin.tsx src/pages/AdminDashboard.tsx
git rm -r src/components/admin
git rm src/components/CommentForm.tsx src/components/CommentItem.tsx \
       src/components/CommentList.tsx src/components/CommentSection.tsx
npm uninstall @supabase/supabase-js @tanstack/react-query recharts
```

Then search for leftovers: `grep -rn "supabase\|useAdmin\|admin" src` should return nothing. Remove any "Admin" link in `NavBar`/`Footer`.

Old links to `/admin/*`, and blog/project URLs with UUIDs, now hit the 404 page. That's acceptable for a portfolio.

**Done when:** build passes, every project card opens its detail page, every blog post renders, there is no `supabase` anywhere in `src`, and DevTools → Application → Local Storage shows only the theme key.

---

## Phase 4: SEO basics (1–2 hours)

Branch: `feat/seo`

1. **`index.html`**: set a real default `<title>` (e.g. `Muhammad Bello — Full-Stack Developer & Data Scientist`) and description, and add an Open Graph / Twitter block:
   ```html
   <meta property="og:type" content="website" />
   <meta property="og:url" content="https://devmab.vercel.app/" />
   <meta property="og:title" content="…" />
   <meta property="og:description" content="…" />
   <meta property="og:image" content="https://devmab.vercel.app/og-image.png" />
   <meta name="twitter:card" content="summary_large_image" />
   ```
2. **Create `public/og-image.png`** (1200×630). It is referenced today but doesn't exist. A simple card with your name, title and photo is enough.
3. **Shared `<Seo>` component** (`src/components/Seo.tsx`):
   ```tsx
   import { Helmet } from 'react-helmet-async';
   const SITE = 'https://devmab.vercel.app';
   export default function Seo({ title, description, path = '', image = '/og-image.png' }:
     { title: string; description: string; path?: string; image?: string }) {
     const full = `${title} | devmab`;
     return (
       <Helmet>
         <title>{full}</title>
         <meta name="description" content={description} />
         <link rel="canonical" href={SITE + path} />
         <meta property="og:title" content={full} />
         <meta property="og:description" content={description} />
         <meta property="og:url" content={SITE + path} />
         <meta property="og:image" content={image.startsWith('http') ? image : SITE + image} />
       </Helmet>
     );
   }
   ```
   Use it on **every** page and replace the existing `<Helmet>` blocks. `ProjectDetail` and `BlogPost` pass the item's title, description and image. `NotFound` adds `<meta name="robots" content="noindex" />`.
4. **`public/robots.txt`**:
   ```
   User-agent: *
   Allow: /
   Sitemap: https://devmab.vercel.app/sitemap.xml
   ```
5. **Sitemap.** Add `scripts/generate-sitemap.ts`, which imports `projects` and `posts` and writes `public/sitemap.xml` with `/`, `/about`, `/projects`, `/blog`, `/contact` and every `/projects/<slug>` and `/blog/<slug>`. Run it before the build:
   ```json
   "prebuild": "npx tsx scripts/generate-sitemap.ts"
   ```
   (`tsx` runs TypeScript directly; add it as a dev dependency.)

**Done when:** each page shows the right tab title, `/robots.txt` and `/sitemap.xml` load on the Preview deploy, and pasting the URL into https://www.opengraph.xyz shows a preview card.

> Crawlers that don't run JavaScript (most link-preview bots) still only see `index.html`'s default tags. Per-page previews need pre-rendering, which is the optional Phase 7.

---

## Phase 5: Performance (2–3 hours)

Branch: `perf/bundle-and-images`

1. **Lazy-load routes** in `App.tsx`:
   ```tsx
   import { lazy, Suspense } from 'react';
   const Projects = lazy(() => import('./pages/Projects'));
   const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
   // ...About, Blog, BlogPost, Contact, NotFound. Keep Index eager (it's the landing page).

   <Suspense fallback={<div className="min-h-screen" />}>
     <Routes>…</Routes>
   </Suspense>
   ```
2. **Delete unused shadcn components.** Run this loop to list them:
   ```bash
   for f in src/components/ui/*.tsx; do n=$(basename $f .tsx)
     grep -rlq "ui/$n['\"]" src --include=*.tsx --exclude-dir=ui || echo "$n"; done
   ```
   `git rm` each listed file. Some ui files import other ui files, so run the loop again until nothing new appears. Then uninstall the packages that only those files used (likely `react-day-picker`, `embla-carousel-react`, `cmdk`, `input-otp`, `vaul`, `react-resizable-panels`, and the matching `@radix-ui/*`). Check with `grep -rn "<package>" src` before each uninstall.
3. **Fix the theme double-up.** `src/components/ui/sonner.tsx` uses `next-themes`, but the app uses its own `ThemeContext`. Switch `sonner.tsx` to `useTheme` from `@/context/ThemeContext`, then `npm uninstall next-themes`. Also consider keeping only one toast system (sonner *or* the Radix toaster).
4. **Images.**
   - Move everything used into `public/images/` (`projects/`, `profile/`), delete the duplicates in `public/` root, and delete unused files (`acme.png`, `caredocs.png`, `peer-to-peer.png`, `self_bg.png`, `ai-image_generator.jpeg` at the root were unreferenced at audit time; re-check with grep first).
   - Convert to WebP at a max width of ~1200 px:
     ```bash
     npx sharp-cli -i "public/images/projects/*.png" -o public/images/projects/ -f webp -q 80 resize 1200
     ```
     Targets: project images under 300 KB, profile photo under 150 KB.
   - Replace the 275 KB `favicon.ico` with a small one (≤ 15 KB) plus `favicon.svg` or `apple-touch-icon.png`.
   - Every `<img>`: `alt`, `width`, `height`, and `loading="lazy"` (except the hero photo, which gets `fetchpriority="high"`).
5. **Old browser data warning.** Run `npx update-browserslist-db@latest`.

**Done when:** the main JS chunk is well under 500 KB (no Vite warning), `public/` is under ~3 MB, and Lighthouse (Chrome DevTools, mobile) scores Performance ≥ 90 on the homepage.

---

## Phase 6: Code quality and CI (2–3 hours)

Branch: `chore/quality`

1. **Scripts and package name** in `package.json`:
   ```json
   "name": "devmab-portfolio",
   "version": "1.0.0",
   "scripts": {
     "typecheck": "tsc -p tsconfig.app.json --noEmit",
     "check": "npm run lint && npm run typecheck && npm run build"
   }
   ```
2. **Fix lint errors.** Most remaining ones are `any` types and the `require()` in `tailwind.config.ts` (switch it to `import animate from 'tailwindcss-animate'`). After Phase 3 and Phase 5 deletions the count should already be much smaller.
3. **Turn on strict TypeScript, one flag at a time**, in `tsconfig.app.json` and `tsconfig.json`. Fix the errors after each flag before moving to the next:
   1. `"strictNullChecks": true`
   2. `"noImplicitAny": true`
   3. `"strict": true`
   4. `"noUnusedLocals": true`, `"noUnusedParameters": true`
4. **CI.** Create `.github/workflows/ci.yml`:
   ```yaml
   name: CI
   on: [push, pull_request]
   jobs:
     check:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with: { node-version: 20, cache: npm }
         - run: npm ci
         - run: npm run lint
         - run: npm run typecheck
         - run: npm run build
   ```
5. **Dependency updates.** Turn on Dependabot (`.github/dependabot.yml`, npm, monthly) so the `npm audit` list doesn't grow back.
6. **Rewrite `README.md`.** Keep it short: what the site is, the live link, the stack, how to run it locally, how to add a project or post (edit `src/content/*.ts`), and the `VITE_WEB3FORMS_KEY` env var. Remove the Supabase/admin claims, the `<YOUR_GIT_URL>` placeholders and the "Last updated: December 2024" line.
7. **Update `CLAUDE.md`.** Delete the "Migration in progress" and "Legacy" sections and change "add as `npm run typecheck`" to just `npm run typecheck`.

**Done when:** `npm run check` passes locally, the CI workflow is green on the PR, and `npm audit --omit=dev` shows no high-severity issues.

---

## Phase 7 (optional, later)

Do these only if they're worth it to you:

- **Pre-rendering for link previews and SEO.** Generate static HTML for each route at build time with `vite-react-ssg` (or move to Astro, which suits a content site). This is the only way to get per-page social preview cards.
- **Comments without a backend.** Giscus stores comments in GitHub Discussions on this repo. It's a single React component (`@giscus/react`) on `BlogPost`.
- **Tests.** Add Vitest with a couple of smoke tests: every project has a unique slug and valid image path, and every post renders without crashing. That catches the kind of data mix-ups the homepage had.
- **Analytics.** Vercel Web Analytics (one component, no cookies) instead of the fake dashboard charts.

---

## Quick reference: audit finding → phase

| Finding | Phase |
|---|---|
| Contact messages never delivered | 2 |
| Fake GitHub sign-in impersonates owner | 3 |
| Admin `update/delete().eq()` crashes | 3 (admin removed) |
| Stale localStorage seed data | 3 |
| Hardcoded `admin`/`password`, localStorage admin bypass | 3 (admin removed) |
| Password logged to console | 1 |
| Leftover Supabase key | 1 |
| `dangerouslySetInnerHTML` on blog | 3.4 |
| 18 `npm audit` vulnerabilities | 1, 3, 5, 6 |
| `gptengineer.js` third-party script | 1 |
| Wrong homepage projects, placeholder links, fake dashboard data | 3.2 |
| Empty `<title>`, missing `og-image.png`, pages without meta | 4 |
| No sitemap/robots | 4 |
| 918 KB single bundle, 33 unused ui components | 5 |
| 1.5–1.8 MB images, duplicates, 275 KB favicon | 5 |
| TS strict off, 52 lint problems, no CI | 6 |
| Duplicate clients/types/lockfiles, `next-themes` + custom theme | 1, 3, 5 |
| Outdated README, package name `vite_react_shadcn_ts` | 6 |
