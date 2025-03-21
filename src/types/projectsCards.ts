export interface Project {
    id: string;
    title: string;
    description: string;
    imageSrc: string;
    tags: string[];
    demoUrl?: string;
    githubUrl?: string;
    featured?: boolean;
}
  
export interface ProjectCardProps {
    project: Project;
    className?: string;
}