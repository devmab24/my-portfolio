import React, { useEffect, useState } from 'react';
import { ThemeContext, type Theme } from './theme';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

// Storage can throw (private mode, blocked site data); the theme must never crash the app.
const readStoredTheme = (key: string): Theme | null => {
  try {
    const saved = localStorage.getItem(key);
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch {
    return null;
  }
};

const storeTheme = (key: string, theme: Theme) => {
  try {
    localStorage.setItem(key, theme);
  } catch {
    // Not persisted; the toggle still works for this visit.
  }
};

export const ThemeProvider = ({ children, defaultTheme = 'light', storageKey = 'theme' }: ThemeProviderProps) => {
  // Saved preference, else the OS preference, else the default.
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    return (
      readStoredTheme(storageKey) ??
      (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : defaultTheme)
    );
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      storeTheme(storageKey, next);
      return next;
    });
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
