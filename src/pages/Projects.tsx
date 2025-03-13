
import { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import ProjectCard, { Project } from '@/components/ProjectCard';

// Sample projects data
const allProjects: Project[] = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce platform built with React, Node.js, and MongoDB with full payment integration.',
    imageSrc: '/placeholder.svg',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: 'project-2',
    title: 'Task Management App',
    description: 'A productivity application for managing tasks and projects with collaborative features.',
    imageSrc: '/placeholder.svg',
    tags: ['React', 'Firebase', 'Tailwind CSS'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    id: 'project-3',
    title: 'AI Image Generator',
    description: "An application that generates images using OpenAI's DALL-E model.",
    imageSrc: '/placeholder.svg',
    tags: ['Next.js', 'OpenAI API', 'Vercel'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    id: 'project-4',
    title: 'Personal Finance Dashboard',
    description: 'A dashboard for tracking personal finances, investments, and budget planning.',
    imageSrc: '/placeholder.svg',
    tags: ['React', 'D3.js', 'Firebase'],
    githubUrl: 'https://github.com',
  },
  {
    id: 'project-5',
    title: 'Recipe Sharing Platform',
    description: 'A platform for food enthusiasts to share and discover recipes from around the world.',
    imageSrc: '/placeholder.svg',
    tags: ['Vue.js', 'Express', 'PostgreSQL'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    id: 'project-6',
    title: 'Real-time Chat Application',
    description: 'A real-time chat application with features like message reactions, threads, and file sharing.',
    imageSrc: '/placeholder.svg',
    tags: ['React', 'Socket.io', 'Express'],
    githubUrl: 'https://github.com',
  },
];

// Extract unique tags for filter
const allTags = Array.from(
  new Set(allProjects.flatMap(project => project.tags))
).sort();

const Projects = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter projects based on selected tag and search query
  const filteredProjects = allProjects.filter(project => {
    const matchesTag = selectedTag ? project.tags.includes(selectedTag) : true;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-grow pt-24">
        <section className="section-spacing">
          <div className="container-custom">
            <AnimatedSection className="space-y-4 mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold">Projects</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A showcase of my technical projects and software development work.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={200} className="mb-8 space-y-6">
              {/* Search Input */}
              <div className="max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              
              {/* Filter Tags */}
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedTag === null
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  All
                </button>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      selectedTag === tag
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={300}>
              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No projects match your search criteria.</p>
                  <button
                    onClick={() => {
                      setSelectedTag(null);
                      setSearchQuery('');
                    }}
                    className="mt-4 text-primary hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </AnimatedSection>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;
