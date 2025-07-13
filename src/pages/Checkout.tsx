import { useAppSelector } from '@/hooks';
import { CheckoutForm, SectionTitle, CartTotals } from '@/components';
import { LoaderFunction, redirect } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { type ReduxStore } from '@/store';

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
    return (
      <div className="text-center mt-24 text-gray-500 dark:text-gray-400 fade-in">
        <SectionTitle text="Your cart is empty" />
      </div>
    );
  }

  return (
    <section className="bg-gray-50 dark:bg-zinc-900 min-h-screen py-12 px-6 fade-in text-gray-900 dark:text-gray-100">
      <SectionTitle
        text="Place your order"
        className="text-3xl font-extrabold mb-10"
      />

      <div className="mt-10 grid gap-12 md:grid-cols-2 items-start max-w-6xl mx-auto">
        <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg transition-shadow hover:shadow-xl focus-within:shadow-xl">
          <CheckoutForm />
        </div>
        <aside className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg transition-shadow hover:shadow-xl focus-within:shadow-xl">
          <CartTotals />
        </aside>
      </div>
    </section>
  );
}

export default Checkout;
