import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, ExternalLink, Github } from 'lucide-react';
import Seo from '@/components/Seo';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { getProject } from '@/content/projects';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProject(slug);

  if (!project) {
    return (
      <div className="flex flex-col min-h-screen">
        <Seo title="Project not found" path={`/projects/${slug ?? ''}`} noindex />
        <NavBar />
        <main className="flex-grow pt-24">
          <div className="container-custom py-24 text-center">
            <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The project you're looking for doesn't exist or has been removed.
            </p>
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
      <Seo
        title={project.title}
        description={project.description}
        path={`/projects/${project.slug}`}
        image={project.imageSrc}
      />
      <NavBar />

      <main className="flex-grow pt-24">
        <article className="section-spacing">
          <div className="container-custom">
            {/* Header */}
            <AnimatedSection className="mb-12">
              <Link
                to="/projects"
                className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>

              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
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
                  {project.downloadUrl && (
                    <a
                      href={project.downloadUrl}
                      download
                      className="inline-flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium transition-all hover:bg-secondary/80"
                    >
                      Download
                      <Download className="ml-2 h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </AnimatedSection>

            {/* Image */}
            <AnimatedSection delay={200} className="mb-12">
              <div className="rounded-xl overflow-hidden border border-border/40 shadow-lg">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  {project.imageSrc ? (
                    <img src={project.imageSrc} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-6xl" aria-hidden="true">
                      🖥️
                    </span>
                  )}
                </div>
              </div>
            </AnimatedSection>

            {/* Content */}
            <AnimatedSection delay={300} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
                  <p className="text-muted-foreground">{project.description}</p>
                </section>

                {project.challenges && (
                  <section>
                    <h2 className="text-2xl font-semibold mb-4">Challenges & Solutions</h2>
                    <p className="text-muted-foreground">{project.challenges}</p>
                  </section>
                )}

                {project.keyFeatures && project.keyFeatures.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {project.keyFeatures.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>

              <div className="space-y-8">
                <section className="p-6 rounded-xl border border-border/40 bg-card">
                  <h3 className="text-lg font-medium mb-4">Project Details</h3>
                  <div className="space-y-4">
                    {project.timeline && (
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Timeline</h4>
                        {project.timeline}
                      </div>
                    )}
                    {project.role && (
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Role</h4>
                        {project.role}
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-sm">
                            {tag}
                          </span>
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
