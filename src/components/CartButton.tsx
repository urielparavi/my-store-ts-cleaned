import { useAppSelector } from '@/hooks';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

function CartButton() {
  // Using a custom Redux hook to select data from the Redux store
  const numItemsInCart = useAppSelector(
    // The selector function receives the entire Redux state
    (state) =>
      // Returns the value of numItemsInCart from the cartState slice
      state.cartState.numItemsInCart
  );
  // Now, numItemsInCart holds the current number of items in the shopping cart

  return (
    <Button
      asChild
      variant="outline"
      size="icon"
      className="flex justify-center items-center relative"
    >
      <Link to="/cart">
        <ShoppingCart />
        <span className="absolute -top-3 -right-3 bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
          {numItemsInCart}
        </span>
      </Link>
    </Button>
  );
}
export default CartButton;
