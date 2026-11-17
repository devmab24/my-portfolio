import { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import ProjectCard from '@/components/ProjectCard';
import type { ProjectType } from '@/types/project';
import { projects } from '@/content/projects';
import Seo from '@/components/Seo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// The first tab is the one shown when the page opens (see DEFAULT_TAB).
const TABS: { type: ProjectType; label: string; empty: string }[] = [
  {
    type: 'datascience',
    label: 'AI, Data Science & ML',
    empty: 'No AI, data science or machine learning projects match your search criteria.',
  },
  {
    type: 'agentic',
    label: 'Agentic Engineering',
    empty: 'Apps and projects built with AI will be listed here soon.',
  },
  { type: 'web', label: 'Web Projects', empty: 'No web projects match your search criteria.' },
  { type: 'python', label: 'Python Scripts', empty: 'No Python scripts match your search criteria.' },
  { type: 'opensource', label: 'Open Source', empty: 'No open source contributions found.' },
  { type: 'competition', label: 'Competitions', empty: 'No competition projects found.' },
  {
    type: 'mentorship',
    label: 'Mentorship & Trainings',
    empty: 'No mentorship or training engagements match your search criteria.',
  },
];
const DEFAULT_TAB = TABS[0].type;

const allTags = Array.from(new Set(projects.flatMap((project) => project.tags))).sort();

const Projects = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const query = searchQuery.toLowerCase();
  const filtered = (type: ProjectType) =>
    projects.filter(
      (project) =>
        project.projectType === type &&
        (!selectedTag || project.tags.includes(selectedTag)) &&
        (project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query)),
    );

  const clearFilters = () => {
    setSelectedTag(null);
    setSearchQuery('');
  };

  const tagButtonClass = (active: boolean) =>
    `px-3 py-1 text-sm rounded-full transition-colors ${
      active
        ? 'bg-primary text-primary-foreground'
        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
    }`;

  return (
    <>
      <Seo
        title="Projects"
        description="AI, machine learning and computer vision projects by Muhammad Ayuba Bello, alongside software engineering work and mentorship and training engagements."
        path="/projects"
      />
      <div className="flex flex-col min-h-screen">
        <NavBar />

        <main className="flex-grow pt-24">
          <section className="section-spacing">
            <div className="container-custom">
              <AnimatedSection className="space-y-4 mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold">Projects</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Machine learning and computer vision projects, software engineering work, and the
                  mentorship and technical training I contribute to.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={200} className="mb-8 space-y-6">
                <div className="max-w-md mx-auto">
                  <input
                    type="text"
                    placeholder="Search projects..."
                    aria-label="Search projects"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  <button onClick={() => setSelectedTag(null)} className={tagButtonClass(selectedTag === null)}>
                    All
                  </button>
                  {allTags.map((tag) => (
                    <button key={tag} onClick={() => setSelectedTag(tag)} className={tagButtonClass(selectedTag === tag)}>
                      {tag}
                    </button>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <Tabs defaultValue={DEFAULT_TAB} className="w-full">
                  <TabsList className="grid h-auto w-full max-w-4xl mx-auto grid-cols-2 md:grid-cols-4 mb-8">
                    {TABS.map(({ type, label }) => (
                      <TabsTrigger key={type} value={type}>
                        {label}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {TABS.map(({ type, empty }) => {
                    const items = filtered(type);
                    return (
                      // Radix mounts a tab's content when it becomes active; the fade-in plays on
                      // each switch (disabled for users who prefer reduced motion).
                      <TabsContent
                        key={type}
                        value={type}
                        className="data-[state=active]:animate-fade-in motion-reduce:animate-none"
                      >
                        {items.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {items.map((project) => (
                              <ProjectCard key={project.slug} project={project} />
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <p className="text-muted-foreground">{empty}</p>
                            {(selectedTag || searchQuery) && (
                              <button onClick={clearFilters} className="mt-4 text-primary hover:underline">
                                Clear filters
                              </button>
                            )}
                          </div>
                        )}
                      </TabsContent>
                    );
                  })}
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
