import { fireEvent, render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { ThemeProvider } from '@/context/ThemeContext';
import { featuredProjects, projects } from '@/content/projects';
import Index from './Index';
import Projects from './Projects';
import ProjectDetail from './ProjectDetail';
import About from './About';
import Blog from './Blog';
import BlogPost from './BlogPost';
import Contact from './Contact';
import NotFound from './NotFound';

const renderAt = (path: string) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </MemoryRouter>
    </HelmetProvider>,
  );

// Text the old ProjectDetail page showed for every project, regardless of the facts.
const INVENTED_CLAIMS = [/Top 5%/, /2,500\+/, /10K\+/, /stability by 40%/, /ensemble model/i];

describe('pages render', () => {
  it('home: featured projects link to real project pages, no blog section while empty', () => {
    renderAt('/');
    for (const project of featuredProjects) {
      const links = screen.getAllByRole('link', { name: new RegExp(project.title) });
      expect(links.some((a) => a.getAttribute('href') === `/projects/${project.slug}`)).toBe(true);
    }
    expect(screen.queryByText('Recent Articles')).toBeNull();
    expect(screen.queryByRole('link', { name: 'Blog' })).toBeNull();
  });

  it('projects: opens on the AI tab, and every web project is one click away', () => {
    renderAt('/projects');
    expect(screen.getByRole('heading', { level: 1, name: 'Projects' })).toBeTruthy();

    const tabs = screen.getAllByRole('tab');
    expect(tabs[0].textContent).toBe('AI, Data Science & ML');
    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
    for (const project of projects.filter((p) => p.projectType === 'datascience')) {
      expect(screen.getByRole('heading', { name: project.title })).toBeTruthy();
    }

    fireEvent.mouseDown(screen.getByRole('tab', { name: 'Web Projects' }), { button: 0 });
    for (const project of projects.filter((p) => p.projectType === 'web')) {
      expect(screen.getByRole('heading', { name: project.title })).toBeTruthy();
    }
  });

  it('projects: shows the renamed AI tab and the Mentorship & Trainings tab with their entries', () => {
    renderAt('/projects');
    expect(screen.queryByRole('tab', { name: 'Data Science & ML' })).toBeNull();

    const tabEntries = (label: string, type: string) => {
      // Radix tabs activate on mouse down (left button).
      fireEvent.mouseDown(screen.getByRole('tab', { name: label }), { button: 0 });
      const panel = screen.getByRole('tabpanel');
      const titles = Array.from(panel.querySelectorAll('h3')).map((h) => h.textContent);
      expect(titles).toEqual(projects.filter((p) => p.projectType === type).map((p) => p.title));
      return titles;
    };

    expect(tabEntries('AI, Data Science & ML', 'datascience')).toContain('UAV-Based Object Detection');

    // Agentic Engineering sits right after the AI tab and shows its empty state until projects are added.
    const labels = screen.getAllByRole('tab').map((t) => t.textContent);
    expect(labels.slice(0, 2)).toEqual(['AI, Data Science & ML', 'Agentic Engineering']);
    tabEntries('Agentic Engineering', 'agentic');
    if (!projects.some((p) => p.projectType === 'agentic')) {
      expect(screen.getByText('Apps and projects built with AI will be listed here soon.')).toBeTruthy();
    }
    expect(tabEntries('Mentorship & Trainings', 'mentorship')).toEqual([
      'WQU Skills Hub',
      'AI/ML Instruction',
      'Digital Tools Orientation',
      'Computer Science Teaching',
    ]);
  });

  it('mentorship entries use engagement wording, not product wording', () => {
    renderAt('/projects/wqu-skills-hub');
    expect(screen.getByRole('heading', { name: 'Responsibilities & Activities' })).toBeTruthy();
    expect(screen.getByText('Topics')).toBeTruthy();
    expect(screen.queryByText('Tech Stack')).toBeNull();
    expect(screen.queryByText('Interested in a similar project?')).toBeNull();
  });

  it.each(projects.map((p) => [p.slug, p] as const))('project page %s shows only real data', (slug, project) => {
    const { container } = renderAt(`/projects/${slug}`);
    expect(screen.getByRole('heading', { level: 1, name: project.title })).toBeTruthy();
    for (const claim of INVENTED_CLAIMS) expect(container.textContent).not.toMatch(claim);
    if (!project.timeline) expect(screen.queryByText('Timeline')).toBeNull();
    if (!project.role) expect(screen.queryByText('Role')).toBeNull();
    if (!project.demoUrl) expect(screen.queryByRole('link', { name: /Live Demo/ })).toBeNull();
    if (!project.githubUrl) expect(screen.queryByRole('link', { name: /View Code/ })).toBeNull();
  });

  it('unknown and draft project slugs show "Project Not Found"', () => {
    renderAt('/projects/caredocs');
    expect(screen.getByRole('heading', { name: 'Project Not Found' })).toBeTruthy();
  });

  it('blog: shows the empty state while there are no posts', () => {
    renderAt('/blog');
    expect(screen.getByText(/No articles yet/)).toBeTruthy();
  });

  it('unknown blog post shows "Article Not Found"', () => {
    renderAt('/blog/building-scalable-react-applications');
    expect(screen.getByRole('heading', { name: 'Article Not Found' })).toBeTruthy();
  });

  it('about and contact render', () => {
    renderAt('/about');
    expect(screen.getAllByRole('heading', { level: 1 }).length).toBe(1);
    renderAt('/contact');
    expect(screen.getByRole('heading', { name: 'Contact Me' })).toBeTruthy();
  });

  it('unknown routes show the 404 page', () => {
    renderAt('/no/such/page');
    expect(screen.getByRole('heading', { name: '404' })).toBeTruthy();
  });
});
