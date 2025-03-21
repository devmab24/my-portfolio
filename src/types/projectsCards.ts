export interface Projects {
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
    project: Projects;
    className?: string;
}