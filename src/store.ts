import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './features/theme/themeSlice';
import cartReducer from './features/cart/cartSlice';
import userReducer from './features/user/userSlice';
// ...

// Create the Redux store using configureStore from Redux Toolkit.
// We combine multiple reducers (called "slices") to manage different parts of the global state.
export const store = configureStore({
  reducer: {
    themeState: themeReducer, // Handles theme-related state (e.g., dark mode)
    cartState: cartReducer, // Handles shopping cart state
    userState: userReducer, // Handles user-related state (e.g., login info)
  },
});

// Define the RootState type by extracting the return type of store.getState().
// This represents the entire Redux state structure in our app.
// It will look like:
// {
//   themeState: ThemeStateType;
//   cartState: CartStateType;
//   userState: UserStateType;
// }
export type RootState = ReturnType<typeof store.getState>;

// Define the AppDispatch type based on store.dispatch.
// This allows us to get full type safety when dispatching actions (including thunks).
export type AppDispatch = typeof store.dispatch;

// Define a type for the store object that includes getState and dispatch.
// We can use this when we need a typed reference to the store itself.
export type ReduxStore = {
  getState: () => RootState;
  dispatch: AppDispatch;
};
