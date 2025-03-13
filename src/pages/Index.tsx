
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import AnimatedSection from '@/components/AnimatedSection';
import ProjectCard, { Project } from '@/components/ProjectCard';
import BlogCard, { BlogPost } from '@/components/BlogCard';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

// Sample data
const featuredProjects: Project[] = [
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
];

const recentPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Building Scalable React Applications',
    excerpt: 'Learn how to structure and build React applications that scale well as your project grows.',
    date: 'Mar 15, 2023',
    author: 'John Doe',
    category: 'React',
    tags: ['React', 'Architecture', 'JavaScript'],
    readTime: '5 min',
  },
  {
    id: 'post-2',
    title: 'The Future of Web Development',
    excerpt: 'Exploring emerging technologies and trends that will shape the future of web development.',
    date: 'Feb 28, 2023',
    author: 'John Doe',
    category: 'Web',
    tags: ['Future', 'Trends', 'Technology'],
    readTime: '7 min',
  },
];

const Index = () => {
  return (
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
              
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
  );
};

export default Index;
