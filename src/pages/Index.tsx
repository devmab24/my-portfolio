
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Hero from '@/components/Hero';
import AnimatedSection from '@/components/AnimatedSection';
import ProjectCard from '@/components/ProjectCard';
import BlogCard from '@/components/BlogCard';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { featuredProjects } from '@/content/projects';
import { hasPosts, publishedPosts } from '@/content/posts';

const recentPosts = publishedPosts.slice(0, 2);

const Index = () => {
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
                    <ProjectCard key={project.slug} project={project} />
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
          
          {/* Recent Blog Posts (hidden until there is at least one post) */}
          {hasPosts && (
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
                    <BlogCard key={post.slug} post={post} />
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
          )}
          
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
