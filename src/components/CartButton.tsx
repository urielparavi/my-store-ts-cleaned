import { useAppSelector } from '@/hooks';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

function CartButton() {
  const numItemsInCart = useAppSelector(
    (state) => state.cartState.numItemsInCart
  );

  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className="relative group transition-transform hover:scale-105 focus:scale-105 focus:outline-none"
      aria-label={`Shopping cart with ${numItemsInCart} items`}
    >
      <Link to="/cart" className="flex items-center justify-center relative">
        <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-gray-300 transition-colors group-hover:text-primary" />
        {numItemsInCart > 0 && (
          <span
            className="
              absolute top-0 right-0
              -translate-y-1/2 translate-x-1/2
              bg-primary text-white text-[0.65rem] font-semibold
              rounded-full h-4 w-4
              flex items-center justify-center
              shadow-sm
              pointer-events-none
              select-none
            "
          >
            {numItemsInCart > 99 ? '99+' : numItemsInCart}
          </span>
        )}
      </Link>
    </Button>
  );
}

export default CartButton;
