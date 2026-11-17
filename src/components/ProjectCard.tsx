import { ExternalLink, Github, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { Project } from '@/types/project';
import { Button } from '@/components/ui/button';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const openExternal = (e: React.MouseEvent, url: string) => {
  e.preventDefault();
  e.stopPropagation();
  window.open(url, '_blank', 'noopener,noreferrer');
};

const actionButtonClass =
  'bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground';

const ProjectCard = ({ project, className }: ProjectCardProps) => {
  return (
    <article
      className={cn(
        'group rounded-xl overflow-hidden border border-border/40 hover-card-animation',
        className,
      )}
    >
      <Link to={`/projects/${project.slug}`} className="block h-full">
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-primary/10" />
          <div className="absolute top-2 right-2 z-10 flex space-x-2">
            {project.downloadUrl && (
              <Button
                size="icon"
                variant="secondary"
                className={actionButtonClass}
                onClick={(e) => openExternal(e, project.downloadUrl!)}
                aria-label={`Download ${project.title}`}
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
            {project.githubUrl && (
              <Button
                size="icon"
                variant="secondary"
                className={actionButtonClass}
                onClick={(e) => openExternal(e, project.githubUrl!)}
                aria-label={`View ${project.title} on GitHub`}
              >
                <Github className="h-4 w-4" />
              </Button>
            )}
            {project.demoUrl && (
              <Button
                size="icon"
                variant="secondary"
                className={actionButtonClass}
                onClick={(e) => openExternal(e, project.demoUrl!)}
                aria-label={`View ${project.title} live demo`}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="h-full flex items-center justify-center bg-muted">
            {project.imageSrc ? (
              <img
                src={project.imageSrc}
                alt={project.title}
                width={384}
                height={192}
                className="w-full h-full object-cover object-center rounded-lg"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <span className="text-4xl" aria-hidden="true">
                🖥️
              </span>
            )}
          </div>
        </div>

        <div className="p-4 space-y-3">
          <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
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
