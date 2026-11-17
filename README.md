# devmab — Portfolio

Personal portfolio of **Muhammad Ayuba Bello**, full-stack developer and data scientist: projects, an about page, and a contact form.

**Live site:** https://devmab.vercel.app

## Stack

- React 18 + TypeScript, built with Vite
- Tailwind CSS + shadcn/ui components
- React Router (client-side routing), react-helmet-async (per-page SEO tags)
- Content lives in typed files in the repo; there is no backend or database
- Contact form delivered by email via [Web3Forms](https://web3forms.com)
- Hosted on Vercel; CI on GitHub Actions

## Run locally

Requires Node.js 20+ (CI uses 24).

```bash
git clone https://github.com/devmab24/my-portfolio.git
cd my-portfolio
npm ci
cp .env.example .env.local   # then add your Web3Forms access key
npm run dev                  # http://localhost:8080
```

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Generate `sitemap.xml`, then build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (strict) |
| `npm run check` | Lint + typecheck + build — the same checks CI runs |

### Environment variables

| Name | Where | Notes |
|---|---|---|
| `VITE_WEB3FORMS_KEY` | `.env.local` and Vercel (type **Config**) | Web3Forms *access key*. It is designed to be public: it can only submit to your form. Without it the form shows "Message not sent". |

## Editing content

Publishing is: edit a file, push to `main`, Vercel deploys.

**Projects:** `src/content/projects.ts`

- Each entry has a `slug` (its URL: `/projects/<slug>`), `title`, `description`, `tags` and `projectType` (`web`, `datascience`, `python`, `opensource` or `competition`).
- Optional: `imageSrc`, `demoUrl`, `githubUrl`, `downloadUrl`, `timeline`, `role`, `challenges`, `keyFeatures`. Leave out anything you don't have; empty sections and buttons are hidden.
- `featured: true` shows the project on the homepage.
- `draft: true` hides the project everywhere until it's ready.
- Images go in `public/project-images/` as WebP (about 1200 px wide).
- Downloadable files go in `public/downloads/`, linked as `downloadUrl: '/downloads/<file>'`.

**Blog posts:** `src/content/posts.ts`

- Add an entry with `slug`, `title`, `excerpt`, `date` (`YYYY-MM-DD`), `category`, `tags`, and a Markdown `body`.
- The Blog link and the homepage articles section appear automatically once there is at least one post.

New pages, projects and posts are added to `sitemap.xml` automatically on the next build.

## Project structure

```
src/
  content/      projects.ts, posts.ts — all site content
  pages/        one component per route (lazy-loaded except the homepage)
  components/   shared components; ui/ holds the shadcn components in use
  lib/          site.ts (SEO defaults), img.ts, utils.ts
scripts/        generate-sitemap.ts (runs before every build)
public/         static files: images, CV, favicon, og-image, robots.txt
docs/           IMPLEMENTATION_GUIDE.md — record of the 2026 cleanup
```

## Contact

- LinkedIn: https://linkedin.com/in/devmab/
- GitHub: https://github.com/devmab24
- Email: talk2muhammadbello@gmail.com
