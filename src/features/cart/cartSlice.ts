// Import necessary utilities from Redux Toolkit and your project
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type CartItem, type CartState } from '@/utils';
import { toast } from '@/components/ui/use-toast';

// Define the default cart state
const defaultState: CartState = {
  cartItems: [], // Array of items in the cart
  numItemsInCart: 0, // Total number of items (quantities summed)
  cartTotal: 0, // Total price of items (before tax/shipping)
  shipping: 500, // Fixed shipping fee
  tax: 0, // Tax amount (calculated later)
  orderTotal: 0, // Final total including tax and shipping
};

// Retrieve the cart state from localStorage, or fallback to default state
const getCartFromLocalStorage = (): CartState => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : defaultState;
};

// Create a slice for the cart using Redux Toolkit
const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage(), // Initialize from localStorage
  reducers: {
    // Add an item to the cart
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newCartItem = action.payload;

      // Check if item with same cartID already exists
      const item = state.cartItems.find((i) => i.cartID === newCartItem.cartID);
      if (item) {
        // If item exists, just update the quantity
        item.amount += newCartItem.amount;
      } else {
        // Otherwise, add the new item
        state.cartItems.push(newCartItem);
      }

      // Update item count and total price
      state.numItemsInCart += newCartItem.amount;
      state.cartTotal += Number(newCartItem.price) * newCartItem.amount;

      // Recalculate tax, shipping and total order price
      cartSlice.caseReducers.calculateTotals(state);
      // state.tax = 0.1 * state.cartTotal; // Apply 10% tax
      // state.orderTotal = state.cartTotal + state.shipping + state.tax;
      // localStorage.setItem('cart', JSON.stringify(state)); // Save updated cart to localStorage

      // Show toast notification to user
      toast({ description: 'Item added to cart' });
    },

    // Clear all items in the cart – for example when the user logs out
    // We reset the state to the default initial values
    clearCart: () => {
      localStorage.setItem('cart', JSON.stringify(defaultState)); // Reset cart in localStorage
      return defaultState; // Reset Redux state to default
    },

    // Remove a single item from the cart
    removeItem: (state, action: PayloadAction<string>) => {
      const cartID = action.payload; // Get the cartID of the item to remove

      // Find the item in the cart with the matching cartID
      const cartItem = state.cartItems.find((i) => i.cartID === cartID);
      if (!cartItem) return; // If the item doesn't exist, exit early

      // Remove the item from the cartItems array
      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID);

      // Decrease the total number of items in the cart
      // Example: if item.amount = 2, and total was 5 => now it's 3
      state.numItemsInCart -= cartItem.amount;

      // Decrease the total cart price by the item's total cost
      // Example: if price = '200' and amount = 2 => cartTotal -= 400
      // If cartTotal was 1200 before, it becomes 800 after
      state.cartTotal -= Number(cartItem.price) * cartItem.amount;

      // Recalculate tax, shipping, orderTotal, and update localStorage
      cartSlice.caseReducers.calculateTotals(state);

      // Show a success toast notification to the user
      toast({ description: 'Item removed from the cart' });
    },

    // Edit an existing item in the cart (e.g., change quantity)
    editItem: (
      state,
      action: PayloadAction<{ cartID: string; amount: number }>
    ) => {
      // Extract the cartID and new amount from the dispatched action
      const { cartID, amount } = action.payload;

      // Find the item in the cart with the matching cartID
      const cartItem = state.cartItems.find((i) => i.cartID === cartID);
      if (!cartItem) return; // If item is not found, exit early

      // Update the total number of items in the cart based on the quantity change
      // Example (increase): numItemsInCart = 5, new amount = 7 → 5 + (7 - 5) = 7
      // Example (decrease): numItemsInCart = 5, new amount = 2 → 5 + (2 - 5) = 2
      state.numItemsInCart += amount - cartItem.amount;

      // Update the cart's total price based on price and quantity difference
      // Example (increase): price = "20", amount from 2 → 5 → cartTotal += 20 * (5 - 2) = 60
      // Example (decrease): price = "15", amount from 4 → 1 → cartTotal += 15 * (1 - 4) = -45
      state.cartTotal += Number(cartItem.price) * (amount - cartItem.amount);

      // Apply the new amount to the item
      // (the `amount` value originally comes from the `cartProduct` object,
      // passed via action.payload.amount when dispatching `editItem`)
      cartItem.amount = amount;

      // Recalculate tax, shipping, and order total
      cartSlice.caseReducers.calculateTotals(state);

      // Show a toast message to notify the user
      toast({ description: 'Amount Updated' });
    },

    // Recalculate totals whenever the cart changes
    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal; // Apply 10% tax
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem('cart', JSON.stringify(state)); // Save updated cart to localStorage
    },
  },
});

// Export the action creators for use in components
export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

// Export the reducer to add to the Redux store
export default cartSlice.reducer;
