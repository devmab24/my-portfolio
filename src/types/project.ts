export type ProjectType =
  | 'web'
  | 'python'
  | 'datascience'
  | 'agentic'
  | 'opensource'
  | 'competition'
  | 'mentorship';

export interface Project {
  /** URL id: /projects/<slug>. Lowercase, hyphenated, unique. */
  slug: string;
  title: string;
  description: string;
  /** Path under public/, e.g. '/project-images/foo.webp'. Omit to show a placeholder. */
  imageSrc?: string;
  tags: string[];
  projectType: ProjectType;
  demoUrl?: string;
  githubUrl?: string;
  /** File under public/downloads/, e.g. '/downloads/script.py'. */
  downloadUrl?: string;
  /** Show on the homepage. */
  featured?: boolean;
  timeline?: string;
  role?: string;
  challenges?: string;
  keyFeatures?: string[];
  /** Hidden from the site until the details are filled in. */
  draft?: boolean;
}
