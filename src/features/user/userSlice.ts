import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from '@/components/ui/use-toast';

// Define the shape of the User object
export type User = {
  username: string;
  jwt: string;
};

// Define the shape of the Redux state for user
type UserState = {
  user: User | null;
};

// Utility function to retrieve the user from localStorage
const getUserFromLocalStorage = (): User | null => {
  const user = localStorage.getItem('user');
  if (!user) return null;
  return JSON.parse(user); // Convert JSON string back to object
};

// Initial state, trying to load user from localStorage if available
const initialState: UserState = {
  user: getUserFromLocalStorage(),
};

// Create the user slice using Redux Toolkit
const userSlice = createSlice({
  name: 'user', // The name of this slice in the Redux store
  initialState, // The initial state defined above
  reducers: {
    // Action to log in a user
    loginUser: (state, action: PayloadAction<User>) => {
      // PayloadAction<T> is a Redux Toolkit type representing an action
      // that carries a payload of type T, e.g. user data or any other info.
      const user = action.payload;
      state.user = user; // Set the user in Redux state
      localStorage.setItem('user', JSON.stringify(user)); // Persist user to localStorage

      // Show a different toast message for demo user
      if (user.username === 'demo user') {
        toast({ description: 'Welcome Guest User' });
        return;
      }

      toast({ description: 'Login Successful' }); // Show success toast
    },

    // Action to log out the user
    logoutUser: (state) => {
      state.user = null; // Clear the user from Redux state
      localStorage.removeItem('user'); // Remove user from localStorage
    },
  },
});

// Export the actions so you can dispatch them from components
export const { loginUser, logoutUser } = userSlice.actions;

// Export the reducer to include it in the Redux store
export default userSlice.reducer;
