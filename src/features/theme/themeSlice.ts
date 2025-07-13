import { applyTheme } from '@/utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Theme type, which can be one of three string values
export type Theme = 'dark' | 'light' | 'system';

// Define the shape of the theme state
type ThemeState = {
  theme: Theme;
};

// Initialize the theme by reading from localStorage and applying it to the page
const initializeTheme = (): Theme => {
  // Try to get the saved theme from localStorage (fallback is 'system')
  const theme = localStorage.getItem('theme') as Theme | 'system';

  // Apply the theme to the page (e.g., add/remove CSS classes)
  applyTheme(theme);

  // Return the theme to be used as initial Redux state
  return theme;
};

// Set the initial state of the Redux slice using the value returned from initializeTheme()
const initialState: ThemeState = {
  theme: initializeTheme(),
};

// Create the Redux slice for theme management
const themeSlice = createSlice({
  // Name of the slice (used internally by Redux)
  name: 'theme',

  // Initial state of this slice
  initialState,

  // Define the reducer functions (actions)
  reducers: {
    // Action to update the theme
    setTheme: (state, action: PayloadAction<Theme>) => {
      // Update the theme value in the Redux state
      state.theme = action.payload;

      // Apply the new theme to the page
      applyTheme(action.payload);

      // Save the selected theme to localStorage for future visits
      localStorage.setItem('theme', action.payload);
    },
  },
});

// Export only the reducer function to be added to the Redux store
export default themeSlice.reducer;

// Extract the setTheme action creator from the theme slice to dispatch it elsewhere in the app
export const { setTheme } = themeSlice.actions;
