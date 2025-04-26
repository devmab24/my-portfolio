
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import ProjectCard from '@/components/ProjectCard';
import { Project } from '@/types/project';
import { supabase } from '@/hooks/supabase/client';
import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  // Extract unique tags for filter
  const allTags = Array.from(
    new Set(projects.flatMap(project => project.tags))
  ).sort();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select('*');
        
        if (error) {
          throw error;
        }

        // Transform data to match Project interface
        const transformedProjects: Project[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          imageSrc: item.image_url || '/placeholder.svg',
          tags: item.tags,
          demoUrl: item.demo_url,
          githubUrl: item.github_url,
          featured: item.featured,
          projectType: item.project_type || 'web',
          downloadUrl: item.download_url,
        }));

        setProjects(transformedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast({
          title: 'Error',
          description: 'Failed to load projects. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [toast]);

  // Filter projects based on selected tag, search query, and project type
  const getFilteredProjects = (type: 'web' | 'python') => {
    return projects.filter(project => {
      const matchesTag = selectedTag ? project.tags.includes(selectedTag) : true;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = project.projectType === type;
      return matchesTag && matchesSearch && matchesType;
    });
  };

  return (
    <>
      <Helmet>
        <title>devmab | Projects</title>
        <meta name="description" content="Projects page" />
      </Helmet>
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
                <Tabs defaultValue="web" className="w-full">
                  <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                    <TabsTrigger value="web">Web Projects</TabsTrigger>
                    <TabsTrigger value="python">Python Scripts</TabsTrigger>
                  </TabsList>

                  <TabsContent value="web">
                    {isLoading ? (
                      <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                      </div>
                    ) : getFilteredProjects('web').length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getFilteredProjects('web').map(project => (
                          <ProjectCard key={project.id} project={project} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">No web projects match your search criteria.</p>
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
                  </TabsContent>

                  <TabsContent value="python">
                    {isLoading ? (
                      <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                      </div>
                    ) : getFilteredProjects('python').length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getFilteredProjects('python').map(project => (
                          <ProjectCard key={project.id} project={project} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">No Python scripts match your search criteria.</p>
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
                  </TabsContent>
                </Tabs>
              </AnimatedSection>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Projects;
