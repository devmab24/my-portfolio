import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Project } from '@/types/project';
import Admin from './Admin';

const PROJECTS: Project[] = [
  { slug: 'first-app', title: 'First App', description: 'One.', tags: ['React'], projectType: 'web' },
  { slug: 'second-app', title: 'Second App', description: 'Two.', tags: ['Vue'], projectType: 'web' },
];

let saved: Project[] | null;
const scrollIntoView = vi.fn();

beforeEach(() => {
  saved = null;
  Element.prototype.scrollIntoView = scrollIntoView;
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: string, init?: RequestInit) => {
      if (url.endsWith('/images')) return new Response(JSON.stringify([]));
      if (init?.method === 'PUT') {
        saved = JSON.parse(String(init.body));
        return new Response(JSON.stringify({ projects: saved }));
      }
      return new Response(JSON.stringify(PROJECTS));
    }),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  scrollIntoView.mockClear();
});

const renderAdmin = () =>
  render(
    <HelmetProvider>
      <MemoryRouter>
        <Admin />
      </MemoryRouter>
    </HelmetProvider>,
  );

describe('Admin', () => {
  it('edit opens the form filled in, scrolls it into view and saves the change', async () => {
    renderAdmin();
    fireEvent.click(await screen.findByRole('button', { name: 'Edit Second App' }));

    const form = screen.getByRole('form', { name: 'Project form' });
    expect(scrollIntoView).toHaveBeenCalled();
    const title = screen.getByDisplayValue('Second App');
    expect(document.activeElement).toBe(title);

    fireEvent.change(title, { target: { value: 'Second App v2' } });
    fireEvent.submit(form);

    await waitFor(() => expect(saved).not.toBeNull());
    expect(saved?.map((p) => p.title)).toEqual(['First App', 'Second App v2']);
    expect(saved?.[1].slug).toBe('second-app');
  });

  it('delete removes the project after confirmation', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    renderAdmin();
    fireEvent.click(await screen.findByRole('button', { name: 'Delete First App' }));

    await waitFor(() => expect(saved).not.toBeNull());
    expect(saved?.map((p) => p.slug)).toEqual(['second-app']);
  });

  it('delete does nothing when cancelled', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    renderAdmin();
    fireEvent.click(await screen.findByRole('button', { name: 'Delete First App' }));
    expect(saved).toBeNull();
  });
});
