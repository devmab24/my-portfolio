import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';
import { useAdmin } from '@/context/AdminContext';

type NavLink = {
  name: string;
  path: string;
  icon?: React.ReactNode;
}

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAdmin } = useAdmin();

  const navLinks: NavLink[] = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const links = isAdmin 
    ? [...navLinks, { name: 'Admin', path: '/admin/dashboard', icon: <Shield className="h-4 w-4 mr-1" /> }] 
    : navLinks;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
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
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'fixed inset-0 bg-background/95 backdrop-blur-sm z-40 transform transition-transform duration-300 ease-in-out md:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-lg">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'relative py-1 transition-colors duration-300 hover:text-primary flex items-center',
                location.pathname === link.path ? 'text-primary' : ''
              )}
            >
              {link.icon && link.icon}
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
