import { Theme } from '@/features/theme/themeSlice';

// Define and export a function that applies the selected theme to the document
export function applyTheme(theme: Theme) {
  // Get the root HTML element (<html>)
  const root = window.document.documentElement;

  // Remove any existing theme classes ('light' or 'dark') before applying a new one
  root.classList.remove('light', 'dark');

  // If the selected theme is 'system', detect the user's system color scheme
  if (theme === 'system') {
    // Use matchMedia to check if the system prefers dark mode
    const systemTheme = window.matchMedia('(prefers-color-scheme:dark)').matches
      ? 'dark' // If system prefers dark mode, use 'dark'
      : 'light'; // Otherwise, use 'light'

    // Add the detected system theme class to the root element
    root.classList.add(systemTheme);

    // Exit the function early since the theme has been applied
    return;
  }

  // If theme is not 'system', directly apply the selected theme class
  root.classList.add(theme);
}
