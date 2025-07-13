import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`

// Create a custom version of useDispatch with the correct AppDispatch type.
// This gives TypeScript full knowledge of what actions can be dispatched,
// including support for async actions (thunks) if you use them.
// Now you can use `useAppDispatch()` throughout your app with full type safety.
export const useAppDispatch: () => AppDispatch = useDispatch;

// Create a custom version of useSelector that is typed to your RootState.
// This ensures that when you access state in your components,
// TypeScript knows exactly what shape the state has, giving you autocomplete and error checking.
// Use `useAppSelector()` instead of plain `useSelector()` in your components.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
