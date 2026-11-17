/**
 * Blog posts. Edit this file and push to publish.
 *
 * While `posts` is empty the Blog link (nav, footer) and the homepage
 * "Recent Articles" section are hidden automatically.
 *
 * Example entry:
 * {
 *   slug: 'my-first-post',
 *   title: 'My First Post',
 *   excerpt: 'One or two sentences shown on cards.',
 *   date: '2026-12-01',
 *   category: 'React',
 *   tags: ['react'],
 *   body: `
 * Intro paragraph in **Markdown**.
 *
 * ## A heading
 * - a list item
 * `,
 * },
 */
export interface Post {
  /** URL id: /blog/<slug>. Lowercase, hyphenated, unique. */
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date, e.g. '2026-12-01'. */
  date: string;
  category: string;
  tags: string[];
  /** Path under public/ or an https URL. */
  imageUrl?: string;
  /** Markdown. Raw HTML is escaped, not rendered. */
  body: string;
}

export const posts: Post[] = [];

export const hasPosts = posts.length > 0;

export const publishedPosts: Post[] = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string | undefined): Post | undefined =>
  posts.find((p) => p.slug === slug);

export const readTime = (post: Post): string =>
  `${Math.max(1, Math.round(post.body.trim().split(/\s+/).length / 200))} min`;

export const formatDate = (iso: string): string =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
