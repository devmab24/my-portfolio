import { describe, expect, it } from 'vitest';
import type { Project } from '@/types/project';
import { cleanProject, projectErrors, slugify, validateProjects } from './validateProjects';

const valid: Project = {
  slug: 'my-project',
  title: 'My Project',
  description: 'Does a thing.',
  tags: ['React'],
  projectType: 'web',
};

describe('projectErrors', () => {
  it('accepts a minimal valid project', () => {
    expect(projectErrors(valid)).toEqual([]);
  });

  it.each([
    ['bad slug', { slug: 'My Project' }, /Slug/],
    ['missing title', { title: ' ' }, /Title/],
    ['missing description', { description: '' }, /Description is required/],
    ['unknown category', { projectType: 'games' as Project['projectType'] }, /category/],
    ['placeholder demo link', { demoUrl: 'https://example.com' }, /placeholder/],
    ['bare github link', { githubUrl: 'https://github.com/' }, /placeholder/],
    ['non-https link', { demoUrl: 'http://site.com' }, /https/],
    ['relative image without slash', { imageSrc: 'image.webp' }, /imageSrc/],
    ['unknown field', { color: 'red' } as Partial<Project>, /Unknown field/],
  ])('rejects %s', (_, change, message) => {
    expect(projectErrors({ ...valid, ...change }).join(' ')).toMatch(message);
  });

  it('requires tags and a real description for published projects, but not drafts', () => {
    const unfinished = { ...valid, description: 'TODO', tags: [] };
    const errors = projectErrors(unfinished).join(' ');
    expect(errors).toMatch(/still says TODO/);
    expect(errors).toMatch(/at least one tag/);
    expect(projectErrors({ ...unfinished, draft: true })).toEqual([]);
  });
});

describe('validateProjects', () => {
  it('flags duplicate slugs', () => {
    const problems = validateProjects([valid, { ...valid, title: 'Copy' }]);
    expect(problems['my-project'].join(' ')).toMatch(/unique/);
  });

  it('rejects non-lists', () => {
    expect(validateProjects({})).toHaveProperty('#list');
  });
});

describe('cleanProject', () => {
  it('trims text, drops empty optional fields and splits list items', () => {
    const cleaned = cleanProject({
      ...valid,
      title: '  My Project  ',
      tags: [' React ', '', 'Node.js'],
      demoUrl: '   ',
      keyFeatures: ['', '  Fast  '],
      featured: false,
      draft: false,
    });
    expect(cleaned).toEqual({
      slug: 'my-project',
      title: 'My Project',
      description: 'Does a thing.',
      tags: ['React', 'Node.js'],
      projectType: 'web',
      keyFeatures: ['Fast'],
    });
  });
});

describe('slugify', () => {
  it('makes URL-safe slugs from titles', () => {
    expect(slugify('AI Image Generator!')).toBe('ai-image-generator');
    expect(slugify('  Café — Résumé Builder ')).toBe('cafe-resume-builder');
  });
});
