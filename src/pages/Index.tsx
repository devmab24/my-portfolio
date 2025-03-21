
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import AnimatedSection from '@/components/AnimatedSection';
import ProjectCard, { Project } from '@/components/ProjectCard';
import BlogCard, { BlogPost } from '@/components/BlogCard';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { supabase } from '@/hooks/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Helmet } from "react-helmet-async";


// Sample data for featured projects
const featuredProjects: Project[] = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce platform built with React, Node.js, and MongoDB with full payment integration.',
    imageSrc: '/E-commerce_platform.png',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    demoUrl: 'https://checkoutly.vercel.app',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: 'project-2',
    title: 'AI Image Generator',
    description: 'A productivity application for managing tasks and projects with collaborative features.',
    imageSrc: '/tasks_management.png',
    tags: ['React', 'Firebase', 'Tailwind CSS'],
    demoUrl: 'https://imaginate-ai-phi.vercel.app',
    githubUrl: 'https://github.com',
  },
  {
    id: 'project-3',
    title: 'Recipe Sharing App',
    description: "An application that generates images using OpenAI's DALL-E model.",
    imageSrc: '/recipe-sharing-app.jpeg',
    tags: ['Next.js', 'OpenAI API', 'Vercel'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
];

const Index = () => {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        setIsLoadingPosts(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*, post_categories(name)')
          .order('created_at', { ascending: false })
          .limit(2);
        
        if (error) {
          throw error;
        }

        // Transform data to match BlogPost interface
        const transformedPosts: BlogPost[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          excerpt: item.excerpt,
          date: new Date(item.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
          author: 'John Doe', // This would ideally come from a profiles table
          category: item.post_categories?.name || 'Uncategorized',
          tags: item.tags || [],
          readTime: `${Math.ceil(item.content.length / 1000)} min`,
          imageUrl: item.image_url,
        }));

        setRecentPosts(transformedPosts);
      } catch (error) {
        console.error('Error fetching recent posts:', error);
        toast({
          title: 'Error',
          description: 'Failed to load blog posts. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsLoadingPosts(false);
      }
    };

    fetchRecentPosts();
  }, [toast]);

  return (
    <>
      <Helmet>
        <title>devmab | Home</title>
        <meta name="description" content="Welcome to my portfolio homepage." />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <Hero />
          
          {/* Featured Projects */}
          <section className="section-spacing bg-muted/30">
            <div className="container-custom">
              <AnimatedSection className="space-y-2 mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  A selection of my recent work, showcasing my skills and expertise in software development.
                </p>
              </AnimatedSection>
              
              <AnimatedSection delay={200}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
                
                <div className="mt-12 text-center">
                  <Link 
                    to="/projects"
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    View All Projects
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </section>
          
          {/* Skills Section */}
          <section className="section-spacing">
            <div className="container-custom">
              <AnimatedSection className="space-y-2 mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Technical Skills</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  My toolbox of technologies and skills that I use to bring ideas to life.
                </p>
              </AnimatedSection>
              
              <AnimatedSection delay={200}>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    'JavaScript', 'TypeScript', 'React', 'Next.js', 
                    'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 
                    'GraphQL', 'Docker', 'Git', 'CI/CD',
                    'TailwindCSS', 'AWS', 'Firebase', 'Redux'
                  ].map((skill, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-lg bg-card border border-border/40 text-center hover-card-animation"
                    >
                      <span className="font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </section>
          
          {/* Recent Blog Posts */}
          <section className="section-spacing bg-muted/30">
            <div className="container-custom">
              <AnimatedSection className="space-y-2 mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Recent Articles</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Thoughts, insights, and tutorials on software development and design.
                </p>
              </AnimatedSection>
              
              <AnimatedSection delay={200}>
                {isLoadingPosts ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                ) : recentPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recentPosts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No blog posts found. Check back later!</p>
                  </div>
                )}
                
                <div className="mt-12 text-center">
                  <Link 
                    to="/blog"
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    Read All Articles
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </section>
          
          {/* Contact CTA */}
          <section className="section-spacing bg-gradient-to-b from-background to-muted/30">
            <div className="container-custom">
              <AnimatedSection className="text-center space-y-6 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold">Let's Work Together</h2>
                <p className="text-muted-foreground">
                  Have a project in mind or interested in collaborating? Let's connect and bring your ideas to life.
                </p>
                <div className="pt-4">
                  <Link 
                    to="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium transition-all hover:brightness-110 active:translate-y-0.5"
                  >
                    Get in Touch
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
