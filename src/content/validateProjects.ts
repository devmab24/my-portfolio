import type { Project, ProjectType } from '@/types/project';

/**
 * Rules for project data, shared by the local admin (before saving), the dev-server
 * save endpoint (before writing projects.json) and the test suite.
 */
export const PROJECT_TYPES: { value: ProjectType; label: string }[] = [
  { value: 'web', label: 'Web Projects' },
  { value: 'datascience', label: 'AI, Data Science & ML' },
  { value: 'agentic', label: 'Agentic Engineering' },
  { value: 'python', label: 'Python Scripts' },
  { value: 'opensource', label: 'Open Source' },
  { value: 'competition', label: 'Competitions' },
  { value: 'mentorship', label: 'Mentorship & Trainings' },
];

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PLACEHOLDER_LINK = /example\.com|^https?:\/\/(www\.)?github\.com\/?$|supabase\.co/i;
const KNOWN_KEYS = new Set<keyof Project>([
  'slug', 'title', 'description', 'imageSrc', 'tags', 'projectType', 'demoUrl', 'githubUrl',
  'downloadUrl', 'featured', 'timeline', 'role', 'challenges', 'keyFeatures', 'draft',
]);

export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const isString = (v: unknown): v is string => typeof v === 'string';
const isStringArray = (v: unknown): v is string[] => Array.isArray(v) && v.every(isString);

/** Problems with one project, as human-readable messages. Empty = valid. */
export function projectErrors(p: Partial<Project>): string[] {
  const errors: string[] = [];
  const published = !p.draft;

  if (!isString(p.slug) || !SLUG_PATTERN.test(p.slug)) {
    errors.push('Slug must be lowercase letters, numbers and hyphens (e.g. "my-project").');
  }
  if (!isString(p.title) || !p.title.trim()) errors.push('Title is required.');
  if (!isString(p.description) || !p.description.trim()) errors.push('Description is required.');
  if (!PROJECT_TYPES.some((t) => t.value === p.projectType)) errors.push('Pick a category.');
  if (!isStringArray(p.tags)) errors.push('Tags must be a list of words.');

  if (published) {
    if (isString(p.description) && /\bTODO\b/.test(p.description)) {
      errors.push('Description still says TODO. Fill it in or keep the project as a draft.');
    }
    if (isStringArray(p.tags) && p.tags.length === 0) errors.push('Add at least one tag (or keep it as a draft).');
  }

  for (const key of ['demoUrl', 'githubUrl'] as const) {
    const url = p[key];
    if (url === undefined) continue;
    if (!isString(url) || !/^https:\/\/\S+$/.test(url)) errors.push(`${key} must be a full https:// link.`);
    else if (PLACEHOLDER_LINK.test(url)) errors.push(`${key} looks like a placeholder (${url}). Use the real link or leave it empty.`);
  }
  for (const key of ['imageSrc', 'downloadUrl'] as const) {
    const path = p[key];
    if (path !== undefined && (!isString(path) || !/^(\/\S+|https:\/\/\S+)$/.test(path))) {
      errors.push(`${key} must be a path starting with / (a file in public/) or an https:// link.`);
    }
  }
  for (const key of ['timeline', 'role', 'challenges'] as const) {
    if (p[key] !== undefined && !isString(p[key])) errors.push(`${key} must be text.`);
  }
  if (p.keyFeatures !== undefined && !isStringArray(p.keyFeatures)) errors.push('Key features must be a list.');
  for (const key of ['featured', 'draft'] as const) {
    if (p[key] !== undefined && typeof p[key] !== 'boolean') errors.push(`${key} must be true or false.`);
  }
  for (const key of Object.keys(p)) {
    if (!KNOWN_KEYS.has(key as keyof Project)) errors.push(`Unknown field "${key}".`);
  }
  return errors;
}

/** Problems with the whole list, keyed by slug (or "#index" when the slug is unusable). */
export function validateProjects(list: unknown): Record<string, string[]> {
  if (!Array.isArray(list)) return { '#list': ['Projects must be a list.'] };
  const problems: Record<string, string[]> = {};
  const seen = new Map<string, number>();
  list.forEach((item, i) => {
    const key = item && typeof item === 'object' && isString((item as Project).slug) && (item as Project).slug
      ? (item as Project).slug
      : `#${i + 1}`;
    const errors = item && typeof item === 'object' ? projectErrors(item as Partial<Project>) : ['Not a project.'];
    if (seen.has(key)) errors.push(`Slug "${key}" is used by another project; slugs must be unique.`);
    seen.set(key, i);
    if (errors.length) problems[key] = [...(problems[key] ?? []), ...errors];
  });
  return problems;
}

/**
 * Normalises a project before saving: trims text, drops empty optional fields
 * (so the site hides those sections) and keeps a stable key order in the JSON.
 */
export function cleanProject(p: Project): Project {
  const text = (v?: string) => (v && v.trim() ? v.trim() : undefined);
  const list = (v?: string[]) => {
    const items = (v ?? []).map((s) => s.trim()).filter(Boolean);
    return items.length ? items : undefined;
  };
  const out: Project = {
    slug: p.slug.trim(),
    title: p.title.trim(),
    description: p.description.trim(),
    imageSrc: text(p.imageSrc),
    tags: list(p.tags) ?? [],
    projectType: p.projectType,
    demoUrl: text(p.demoUrl),
    githubUrl: text(p.githubUrl),
    downloadUrl: text(p.downloadUrl),
    featured: p.featured || undefined,
    timeline: text(p.timeline),
    role: text(p.role),
    challenges: text(p.challenges),
    keyFeatures: list(p.keyFeatures),
    draft: p.draft || undefined,
  };
  return Object.fromEntries(Object.entries(out).filter(([, v]) => v !== undefined)) as unknown as Project;
}
