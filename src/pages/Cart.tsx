import { useAppSelector } from '@/hooks';
import { CartItemsList, SectionTitle, CartTotals } from '@/components';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function Cart() {
  const user = useAppSelector((state) => state.userState.user);
  const numItemsInCart = useAppSelector(
    (state) => state.cartState.numItemsInCart
  );

  if (numItemsInCart === 0) {
    return (
      <SectionTitle
        text="Your cart is empty"
        className="text-center text-xl text-gray-500 mt-20 fade-in"
      />
    );
  }

  return (
    <section className="fade-in">
      <SectionTitle
        text="Shopping Cart"
        className="text-3xl font-extrabold text-gray-900"
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList />
        </div>

        <aside className="lg:col-span-4 lg:pl-6">
          <CartTotals />

          <Button
            asChild
            className="mt-8 w-full bg-orange-600 hover:bg-orange-700 transition-colors"
          >
            {user ? (
              <Link
                to="/checkout"
                className="block text-center text-white font-semibold py-3"
              >
                Proceed To Checkout
              </Link>
            ) : (
              <Link
                to="/login"
                className="block text-center text-white font-semibold py-3"
              >
                Please Login
              </Link>
            )}
          </Button>
        </aside>
      </div>
    </section>
  );
}

export default Cart;
