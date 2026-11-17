/**
 * Writes public/sitemap.xml from the content files. Runs automatically before
 * every build (`prebuild` in package.json), so new projects/posts are included
 * without editing anything here.
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { projects } from '../src/content/projects';
import { posts, hasPosts } from '../src/content/posts';
import { SITE_URL } from '../src/lib/site';

const staticPaths = ['/', '/projects', '/about', '/contact', ...(hasPosts ? ['/blog'] : [])];

const entries: { path: string; lastmod?: string }[] = [
  ...staticPaths.map((path) => ({ path })),
  ...projects.map((p) => ({ path: `/projects/${p.slug}` })),
  ...posts.map((p) => ({ path: `/blog/${p.slug}`, lastmod: p.date })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    ({ path, lastmod }) =>
      `  <url><loc>${SITE_URL}${path}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`,
  )
  .join('\n')}
</urlset>
`;

const out = fileURLToPath(new URL('../public/sitemap.xml', import.meta.url));
writeFileSync(out, xml);
console.log(`sitemap.xml: ${entries.length} URLs`);
