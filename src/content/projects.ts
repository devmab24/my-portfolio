import type { Project } from '@/types/project';
import data from './projects.json';

/**
 * Projects live in projects.json, the site's "database". Edit them with the local
 * admin (`npm run dev`, then open http://localhost:8080/admin) or by hand, then
 * commit and push to publish.
 *
 * Rules (enforced by the admin's validation and by src/content/content.test.ts):
 * - Only real links. Leave demoUrl / githubUrl / downloadUrl out rather than using
 *   placeholders; the buttons hide automatically.
 * - Only real details. Sections without data (timeline, role, challenges,
 *   keyFeatures) are hidden, never filled with invented text.
 * - `draft: true` keeps an entry off the site until it's complete.
 * - Image Resizer: its script is lost; add it to public/downloads/ and set
 *   downloadUrl to '/downloads/image_resizer.py' to show a Download button.
 */
// JSON imports are typed loosely (projectType: string); the shape is checked by
// validateProjects() in the admin and in the test suite.
export const allProjects = data as unknown as Project[];

export const projects: Project[] = allProjects.filter((p) => !p.draft);

export const featuredProjects: Project[] = projects.filter((p) => p.featured);

export const getProject = (slug: string | undefined): Project | undefined =>
  projects.find((p) => p.slug === slug);
