import { LoaderFunction, redirect, useLoaderData } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { customFetch } from '@/utils';
import {
  OrdersList,
  ComplexPaginationContainer,
  SectionTitle,
} from '@/components';
import { ReduxStore } from '@/store';
import { type OrdersResponse } from '@/utils';

export const loader =
  (store: ReduxStore): LoaderFunction =>
  async ({ request }): Promise<OrdersResponse | Response | null> => {
    const user = store.getState().userState.user;

    if (!user) {
      toast({ description: 'Please login to continue' });
      return redirect('/login');
    }

    const params = Object.fromEntries(
      new URL(request.url).searchParams.entries()
    );

    try {
      const response = await customFetch.get<OrdersResponse>('/orders', {
        params,
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      });
      return { ...response.data };
    } catch (error) {
      console.error(error);
      toast({ description: 'Failed to fetch orders' });
      return null;
    }
  };

function Orders() {
  const { meta } = useLoaderData() as OrdersResponse;

  if (meta.pagination.total < 1) {
    return (
      <div className="fade-in flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-zinc-900 px-4 text-gray-700 dark:text-gray-300">
        <SectionTitle text="Please make an order" className="mb-4" />
        <p className="text-center max-w-md">
          You don&apos;t have any orders yet. Start shopping now to see your
          orders here!
        </p>
      </div>
    );
  }

  return (
    <main className="fade-in min-h-screen bg-gray-50 dark:bg-zinc-900 px-4 sm:px-6 py-12 text-gray-900 dark:text-gray-100">
      <SectionTitle text="Your Orders" className="mb-8 text-3xl font-bold" />
      <div className="w-full max-w-[95%] sm:max-w-4xl lg:max-w-7xl mx-auto bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-4 sm:p-6">
        <OrdersList />
        <div className="mt-6">
          <ComplexPaginationContainer />
        </div>
      </div>
    </main>
  );
}

export default Orders;
