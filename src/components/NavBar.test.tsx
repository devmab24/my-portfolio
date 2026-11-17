import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { ThemeProvider } from '@/context/ThemeContext';
import NavBar from './NavBar';

const renderNav = () =>
  render(
    <MemoryRouter initialEntries={['/projects']}>
      <ThemeProvider>
        <NavBar />
      </ThemeProvider>
    </MemoryRouter>,
  );

// The drawer stays in the DOM so it can slide; closed = translated off-screen + invisible.
const drawer = () => screen.getByRole('dialog', { hidden: true, name: 'Site menu' });
const isOpen = () => drawer().classList.contains('translate-x-0') && drawer().classList.contains('visible');
const isClosed = () => drawer().classList.contains('translate-x-full') && drawer().classList.contains('invisible');
const openMenu = () => fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));

describe('mobile menu', () => {
  it('starts closed, off-screen to the right and hidden from keyboard/screen readers', () => {
    renderNav();
    expect(isClosed()).toBe(true);
    expect(screen.getByRole('button', { name: 'Open menu' }).getAttribute('aria-expanded')).toBe('false');
  });

  it('slides in from the right with a partial width, and focuses the close button', () => {
    renderNav();
    openMenu();
    expect(isOpen()).toBe(true);
    expect(drawer().className).toMatch(/\bright-0\b/);
    expect(drawer().className).toMatch(/\bw-72\b/);
    expect(drawer().className).toMatch(/max-w-\[80vw\]/);
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Close menu' }));
    expect(screen.getByRole('button', { name: 'Open menu' }).getAttribute('aria-expanded')).toBe('true');
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('closes with the close icon and returns focus to the menu button', () => {
    renderNav();
    openMenu();
    fireEvent.click(screen.getByRole('button', { name: 'Close menu' }));
    expect(isClosed()).toBe(true);
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Open menu' }));
    expect(document.body.style.overflow).toBe('');
  });

  it('closes on Escape', () => {
    renderNav();
    openMenu();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(isClosed()).toBe(true);
  });

  it('closes when the backdrop is tapped', () => {
    renderNav();
    openMenu();
    const backdrop = drawer().previousElementSibling as HTMLElement;
    fireEvent.click(backdrop);
    expect(isClosed()).toBe(true);
  });

  it('closes when a link is chosen, including the current page', () => {
    renderNav();
    openMenu();
    const current = Array.from(drawer().querySelectorAll('a')).find((a) => a.getAttribute('aria-current') === 'page');
    expect(current?.textContent).toBe('Projects');
    fireEvent.click(current as HTMLAnchorElement);
    expect(isClosed()).toBe(true);
  });
});
