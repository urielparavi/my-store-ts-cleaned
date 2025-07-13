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
    return <SectionTitle text="Empty cart" />;
  }

  return (
    <>
      <SectionTitle text="Shopping cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals />

          <Button asChild className="mt-8 w-full">
            {user ? (
              <Link to="/checkout">Proceed To Checkout</Link>
            ) : (
              <Link to="/login">Please Login</Link>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
export default Cart;
/* 
             Use `asChild` to make the child element (<Link>) act as the actual button element.
             This allows you to apply all Button styles and behaviors directly to the <Link>,
             without nesting a <Link> inside a <button>, which is invalid HTML.       
           */
