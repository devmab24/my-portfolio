
import { ExternalLink, Github, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ProjectCardProps } from '@/types/projectsCards';
import { Button } from '@/components/ui/button';

const SUPABASE_BUCKET_URL = "https://lemachbekmdprrdtthem.supabase.co/storage/v1/object/public/project-images";

const ProjectCard = ({ project, className }: ProjectCardProps) => {
  const imageSrc = project.imageSrc
    ? `${SUPABASE_BUCKET_URL}/${project.imageSrc.replace(/^\/+/, '')}`
    : "/default-placeholder.png";

  const handleDownload = async () => {
    if (project.downloadUrl) {
      window.open(project.downloadUrl, '_blank');
    }
  };

  return (
    <article 
      className={cn(
        "group rounded-xl overflow-hidden border border-border/40 hover-card-animation",
        project.featured ? "col-span-2 row-span-2" : "",
        className
      )}
    >
      <Link to={`/projects/${project.id}`} className="block h-full">
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-primary/10" />
          <div className="absolute top-2 right-2 z-10 flex space-x-2">
            {project.projectType === 'python' && project.downloadUrl && (
              <Button
                size="icon"
                variant="secondary"
                className="bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDownload();
                }}
                aria-label="Download Python script"
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
            {project.githubUrl && (
              <Button
                size="icon"
                variant="secondary"
                className="bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(project.githubUrl, '_blank');
                }}
                aria-label="View on GitHub"
              >
                <Github className="h-4 w-4" />
              </Button>
            )}
            {project.demoUrl && (
              <Button
                size="icon"
                variant="secondary"
                className="bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(project.demoUrl, '_blank');
                }}
                aria-label="View live demo"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="h-full flex items-center justify-center bg-muted">
            {imageSrc ? (
              <img 
                src={imageSrc} 
                alt={project.title} 
                className="w-full h-full object-cover object-center rounded-lg"
                loading="lazy"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-muted">
                <span className="text-4xl">🖥️</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          
          <p className="text-muted-foreground text-sm line-clamp-2">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProjectCard;
