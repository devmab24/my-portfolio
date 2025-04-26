
import { Project } from './project';

export interface Projects extends Project {}
  
export interface ProjectCardProps {
    project: Projects;
    className?: string;
}
