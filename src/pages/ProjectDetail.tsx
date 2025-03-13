import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { Project } from '@/components/ProjectCard';

// Sample projects data (in a real app, this would be fetched from an API)
const projects: Record<string, Project> = {
  'project-1': {
    id: 'project-1',
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce platform built with React, Node.js, and MongoDB with full payment integration.',
    imageSrc: '/placeholder.svg',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
  },
  'project-2': {
    id: 'project-2',
    title: 'Task Management App',
    description: 'A productivity application for managing tasks and projects with collaborative features.',
    imageSrc: '/placeholder.svg',
    tags: ['React', 'Firebase', 'Tailwind CSS'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  'project-3': {
    id: 'project-3',
    title: 'AI Image Generator',
    description: "An application that generates images using OpenAI's DALL-E model.",
    imageSrc: '/placeholder.svg',
    tags: ['Next.js', 'OpenAI API', 'Vercel'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = id ? projects[id] : null;

  if (!project) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow pt-24">
          <div className="container-custom py-24 text-center">
            <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist or has been removed.</p>
            <Link to="/projects" className="text-primary hover:underline inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-grow pt-24">
        <article className="section-spacing">
          <div className="container-custom">
            {/* Project Header */}
            <AnimatedSection className="mb-12">
              <Link to="/projects" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
              
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4 pt-2">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium transition-all hover:brightness-110"
                    >
                      Live Demo
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  )}
                  
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium transition-all hover:bg-secondary/80"
                    >
                      View Code
                      <Github className="ml-2 h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </AnimatedSection>
            
            {/* Project Image */}
            <AnimatedSection delay={200} className="mb-12">
              <div className="rounded-xl overflow-hidden border border-border/40 shadow-lg">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <span className="text-6xl">🖥️</span>
                </div>
              </div>
            </AnimatedSection>
            
            {/* Project Content */}
            <AnimatedSection delay={300} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
                  <p className="text-muted-foreground">
                    {project.description}
                  </p>
                  <p className="text-muted-foreground mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisi nunc pretium nisi, eget ultrices nisi nunc eu nisi. Sed euismod, urna eu tincidunt consectetur, nisi nunc pretium nisi, eget ultrices nisi nunc eu nisi.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Challenges & Solutions</h2>
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisi nunc pretium nisi, eget ultrices nisi nunc eu nisi. Sed euismod, urna eu tincidunt consectetur, nisi nunc pretium nisi, eget ultrices nisi nunc eu nisi.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Feature one with detailed explanation</li>
                    <li>Feature two with detailed explanation</li>
                    <li>Feature three with detailed explanation</li>
                    <li>Feature four with detailed explanation</li>
                  </ul>
                </section>
              </div>
              
              <div className="space-y-8">
                <section className="p-6 rounded-xl border border-border/40 bg-card">
                  <h3 className="text-lg font-medium mb-4">Project Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Timeline</h4>
                      <p>3 months</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Role</h4>
                      <p>Full-stack Developer</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {project.tags.map((tag, index) => (
                          <span key={index} className="text-sm">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
                
                <section className="p-6 rounded-xl border border-border/40 bg-card">
                  <h3 className="text-lg font-medium mb-4">Interested in a similar project?</h3>
                  <p className="text-muted-foreground mb-4">Let's discuss how I can help bring your ideas to life.</p>
                  <Link 
                    to="/contact"
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium transition-all hover:brightness-110"
                  >
                    Get in Touch
                  </Link>
                </section>
              </div>
            </AnimatedSection>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;
