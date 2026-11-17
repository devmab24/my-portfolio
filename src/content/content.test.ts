import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { allProjects, featuredProjects, getProject, projects } from './projects';
import { validateProjects } from './validateProjects';
import { getPost, posts, readTime } from './posts';

const PUBLIC_DIR = join(process.cwd(), 'public');
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
// Links that look real but go nowhere useful (what the site used to have).
const PLACEHOLDER_LINK = /example\.com|^https?:\/\/(www\.)?github\.com\/?$|supabase\.co/i;

const publicFileExists = (url: string) => existsSync(join(PUBLIC_DIR, url));

describe('projects content', () => {
  it('projects.json passes the same validation the admin uses (drafts included)', () => {
    expect(validateProjects(allProjects)).toEqual({});
  });

  it('has at least one published and one featured project', () => {
    expect(projects.length).toBeGreaterThan(0);
    expect(featuredProjects.length).toBeGreaterThan(0);
  });

  it('uses unique, URL-safe slugs', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug, slug).toMatch(SLUG);
  });

  it.each(projects.map((p) => [p.slug, p] as const))('%s has a title, description and tags', (_, p) => {
    expect(p.title.trim()).not.toBe('');
    expect(p.description.trim()).not.toBe('');
    expect(p.description).not.toMatch(/\bTODO\b/);
    expect(p.tags.length).toBeGreaterThan(0);
  });

  it.each(projects.flatMap((p) => (p.imageSrc ? [[p.slug, p.imageSrc] as const] : [])))(
    '%s image exists in public/ (%s)',
    (_, src) => {
      expect(src.startsWith('/'), 'image paths must start with /').toBe(true);
      expect(publicFileExists(src), `missing file public${src}`).toBe(true);
    },
  );

  it.each(projects.flatMap((p) => (p.downloadUrl?.startsWith('/') ? [[p.slug, p.downloadUrl] as const] : [])))(
    '%s download exists in public/ (%s)',
    (_, url) => expect(publicFileExists(url), `missing file public${url}`).toBe(true),
  );

  it('has no placeholder or non-https external links', () => {
    for (const p of projects) {
      for (const url of [p.demoUrl, p.githubUrl].filter((u): u is string => Boolean(u))) {
        expect(url, `${p.slug}: ${url}`).not.toMatch(PLACEHOLDER_LINK);
        expect(url, `${p.slug}: ${url}`).toMatch(/^https:\/\//);
      }
    }
  });

  it('keeps drafts off the site', () => {
    expect(projects.some((p) => p.draft)).toBe(false);
    expect(getProject('caredocs')).toBeUndefined();
  });

  it('finds published projects by slug and rejects unknown ones', () => {
    expect(getProject(projects[0].slug)).toBe(projects[0]);
    expect(getProject('does-not-exist')).toBeUndefined();
    expect(getProject(undefined)).toBeUndefined();
  });
});

describe('posts content', () => {
  it('uses unique, URL-safe slugs and valid ISO dates', () => {
    const slugs = posts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const post of posts) {
      expect(post.slug).toMatch(SLUG);
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(post.date))).toBe(false);
      expect(post.body.trim()).not.toBe('');
    }
  });

  it('rejects unknown post slugs', () => {
    expect(getPost('does-not-exist')).toBeUndefined();
  });

  it('estimates at least one minute of reading time', () => {
    const post = { slug: 'x', title: 'x', excerpt: 'x', date: '2026-01-01', category: 'x', tags: [], body: 'one two' };
    expect(readTime(post)).toBe('1 min');
    expect(readTime({ ...post, body: 'word '.repeat(1000) })).toBe('5 min');
  });
});
