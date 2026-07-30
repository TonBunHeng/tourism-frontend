// src/utils/Theme.js

/**
 * Get initial theme from localStorage or fallback to system preference.
 * @returns {'light' | 'dark' | 'system'}
 */
export const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light';
};

/**
 * Apply selected theme to HTML document element and save in localStorage.
 * @param {'light' | 'dark' | 'system'} theme 
 */
export const applyTheme = (theme) => {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;

  if (theme === 'dark') {
    root.classList.add('dark');
  } else if (theme === 'light') {
    root.classList.remove('dark');
  } else if (theme === 'system') {
    const isSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isSystemDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }

  try {
    localStorage.setItem('theme', theme);
  } catch (e) {
    console.error('Failed to save theme in localStorage', e);
  }
};

/**
 * Toggle theme between 'light' and 'dark'.
 * @param {'light' | 'dark'} currentTheme 
 * @returns {'light' | 'dark'}
 */
export const toggleTheme = (currentTheme) => {
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  return nextTheme;
};

/**
 * Initialize theme on application startup.
 */
export const initTheme = () => {
  const theme = getInitialTheme();
  applyTheme(theme);
  return theme;
};
