
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
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
      <Seo path="/" />
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
                  Selected machine learning and computer vision projects demonstrating practical experience in model
                  development, training, and evaluation.
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
                <h2 className="text-3xl md:text-4xl font-bold">Technical Expertise</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  My work combines machine learning, computer vision, and software engineering, from model development
                  and evaluation to building application interfaces and backend services.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    'Python', 'Scikit-learn', 'Pandas', 'NumPy',
                    'TensorFlow', 'Keras', 'OpenCV', 'YOLO',
                    'U-Net', 'FastAPI', 'JavaScript', 'React',
                    'Next.js', 'PostgreSQL', 'SQL', 'Git & GitHub'
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
                  Thoughts, insights, and tutorials on AI, machine learning, and software engineering.
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
                <h2 className="text-3xl md:text-4xl font-bold">Let's Build Something Intelligent</h2>
                <p className="text-muted-foreground">
                  I am interested in AI engineering opportunities, machine learning projects, research collaborations,
                  and software development initiatives that use technology to solve meaningful problems.
                </p>
                <p className="text-muted-foreground">Let's connect and build intelligent solutions.</p>
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
