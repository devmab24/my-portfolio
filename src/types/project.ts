
export interface Project {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  projectType?: 'web' | 'python' | 'datascience' |  'opensource';
  downloadUrl?: string;
  challenges?: string;
  key_feature?: string[];
  timeline: string;
  role: string;
}
