
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';
import { hasPosts } from '@/content/posts';

type NavLink = {
  name: string;
  path: string;
  icon?: React.ReactNode;
}

const links: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
  ...(hasPosts ? [{ name: 'Blog', path: '/blog' }] : []),
  { name: 'Contact', path: '/contact' },
];

const MENU_ID = 'mobile-menu';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the menu after navigating.
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // While open: Escape closes, the page behind doesn't scroll, focus moves into the menu.
  // On close: focus returns to the menu button.
  useEffect(() => {
    if (!isOpen) {
      if (wasOpen.current) openButtonRef.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    closeButtonRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 px-4 lg:px-8',
          isScrolled
            ? 'glass-nav py-3'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-bold relative group z-10"
          >
            <span className="transition-colors duration-300">Portfolio</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" aria-hidden="true"></span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'relative py-1 transition-colors duration-300 hover:text-primary group flex items-center',
                  location.pathname === link.path ? 'text-primary' : ''
                )}
              >
                {link.icon && link.icon}
                {link.name}
                <span
                  className={cn(
                    'absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full',
                    location.pathname === link.path ? 'w-full' : 'w-0'
                  )}
                  aria-hidden="true"
                ></span>
              </Link>
            ))}
            <ThemeToggle />
          </div>

          <div className="flex md:hidden items-center space-x-4">
            <ThemeToggle />
            <button
              ref={openButtonRef}
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-md transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              aria-label="Open menu"
              aria-expanded={isOpen}
              aria-controls={MENU_ID}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu. Rendered outside <nav>: the scrolled nav's backdrop-blur would otherwise
          become the containing block for these fixed elements and clip them to the nav bar. */}
      <div className="md:hidden">
        {/* Backdrop: fades in, closes the menu when tapped. */}
        <div
          className={cn(
            'fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ease-out motion-reduce:transition-none',
            isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          )}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer: slides in from the right. `invisible` (after the slide-out finishes) keeps the
            closed menu out of the tab order and away from screen readers. */}
        <aside
          id={MENU_ID}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className={cn(
            'fixed top-0 right-0 z-[70] flex h-full w-72 max-w-[80vw] flex-col border-l border-border/50 bg-background shadow-2xl',
            // Arbitrary property instead of an arbitrary "ease" value: tailwindcss-animate also
            // defines ease utilities, which makes that form ambiguous and Tailwind drops it.
            'transition-[transform,visibility] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
            isOpen ? 'visible translate-x-0' : 'invisible translate-x-full'
          )}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
            <span className="text-lg font-semibold">Menu</span>
            <button
              ref={closeButtonRef}
              onClick={() => setIsOpen(false)}
              className="p-2 -mr-2 rounded-md transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <ul className="flex flex-col gap-1 p-4 text-lg">
            {links.map((link, index) => (
              <li
                key={link.path}
                className={cn(
                  'transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none',
                  isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                )}
                // Staggered entrance: each link follows the previous one by 50ms.
                style={{ transitionDelay: isOpen ? `${100 + index * 50}ms` : '0ms' }}
              >
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                  className={cn(
                    'flex items-center rounded-md px-3 py-3 transition-colors duration-200 hover:bg-secondary hover:text-primary',
                    location.pathname === link.path ? 'bg-primary/10 text-primary font-medium' : ''
                  )}
                >
                  {link.icon && link.icon}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
};

export default NavBar;
