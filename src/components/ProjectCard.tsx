import { ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ProjectCardProps } from '@/types/projectsCards';

const SUPABASE_BUCKET_URL = "https://lemachbekmdprrdtthem.supabase.co/storage/v1/object/public/project-images";

const ProjectCard = ({ project, className }: ProjectCardProps) => {
  const imageSrc = project.imageSrc
  ? `${SUPABASE_BUCKET_URL}/${project.imageSrc.replace(/^\/+/, '')}`
  : "/default-placeholder.png"; // Fallback image

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
            {project.githubUrl && (
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={(e) => e.stopPropagation()}
                aria-label="View on GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {project.imageSrc && (
              <a 
                href={project.imageSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={(e) => e.stopPropagation()}
                aria-label="View live demo"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
          <div className="h-full flex items-center justify-center bg-muted">
            {/* Display dynamic project image conditionally */}
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


// const ProjectCard = ({ project, className }: ProjectCardProps) => {
//   // Ensure correct image URL formatting
//   const imageSrc = project.imageSrc
//     ? `${SUPABASE_BUCKET_URL}/${project.imageSrc.replace(/^\/+/, '')}`
//     : "/default-placeholder.png"; // Fallback image

//   return (
//     <article 
//       className={cn(
//         "group rounded-xl overflow-hidden border border-border/40 hover-card-animation",
//         project.featured ? "col-span-2 row-span-2" : "",
//         className
//       )}
//     >
//       <Link to={`/projects/${project.id}`} className="block h-full">
//         <div className="relative h-48 overflow-hidden">
//           <div className="absolute inset-0 bg-primary/10" />
//           <div className="absolute top-2 right-2 z-10 flex space-x-2">
//             {project.githubUrl && (
//               <a 
//                 href={project.githubUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors"
//                 onClick={(e) => e.stopPropagation()}
//                 aria-label="View on GitHub"
//               >
//                 <Github className="h-4 w-4" />
//               </a>
//             )}
//             {project.demoUrl && (
//               <a 
//                 href={project.demoUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors"
//                 onClick={(e) => e.stopPropagation()}
//                 aria-label="View live demo"
//               >
//                 <ExternalLink className="h-4 w-4" />
//               </a>
//             )}
//           </div>
//           {/* Display dynamic project image */}
//           <img 
//             src={imageSrc} 
//             alt={project.title} 
//             className="w-full h-full object-cover object-center rounded-lg"
//             loading="lazy"
//           />
//         </div>
        
//         <div className="p-4 space-y-3">
//           <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
//             {project.title}
//           </h3>
          
//           <p className="text-muted-foreground text-sm line-clamp-2">
//             {project.description}
//           </p>
          
//           <div className="flex flex-wrap gap-2 pt-2">
//             {project.tags.map((tag, index) => (
//               <span 
//                 key={index}
//                 className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </div>
//       </Link>
//     </article>
//   );
// };

export default ProjectCard;