
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/theme';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-full transition-colors duration-200 focus:outline-none",
        theme === 'dark' 
          ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" 
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        className
      )}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
