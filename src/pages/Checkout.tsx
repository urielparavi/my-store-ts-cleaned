import { useAppSelector } from '@/hooks';
import { CheckoutForm, SectionTitle, CartTotals } from '@/components';
import { LoaderFunction, redirect } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { type ReduxStore } from '@/store';

/*
  This loader enforces user authentication by accessing the Redux store.

  Unlike typical loaders that fetch external data (e.g., products),
  this loader needs to check if a user exists in the Redux state 
  before allowing access to protected routes (e.g., /checkout).

  Since React Router loaders run outside the React component tree and
  do not support React hooks like useSelector,
  we pass the Redux store as a parameter to the loader factory function.

  Inside the returned loader function, we directly access the current user state.

  If no user is found:
    - A toast notification is shown prompting login.
    - The user is redirected to the login page.

  If the user is authenticated, the loader returns null, allowing normal routing.
*/
export const loader =
  (store: ReduxStore): LoaderFunction =>
  async (): Promise<Response | null> => {
    const user = store.getState().userState.user;

    if (!user) {
      toast({ description: 'Please login to continue' });
      return redirect('/login');
    }

    return null;
  };

function Checkout() {
  const cartTotal = useAppSelector((state) => state.cartState.cartTotal);

  if (cartTotal === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }

  return (
    <>
      <SectionTitle text="Place your order" />
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
}
export default Checkout;
