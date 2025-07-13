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

// Loader factory function that accepts the Redux store and returns a React Router loader function
export const loader =
  (store: ReduxStore): LoaderFunction =>
  async ({ request }): Promise<OrdersResponse | Response | null> => {
    // Get the current logged-in user from Redux store
    const user = store.getState().userState.user;

    // If no user is found, show a toast notification and redirect to login page
    if (!user) {
      toast({ description: 'Please login to continue' });
      return redirect('/login');
    }

    // Extract query parameters from the request URL and convert them into a plain JS object:
    //
    // 1. new URL(request.url) creates a URL object from the full request URL,
    //    allowing easy access to search parameters.
    //
    // 2. .searchParams.entries() returns an iterator of key-value pairs (e.g. [['page', '2'], ['sort', 'name']]).
    //
    // 3. The spread operator [...] converts the iterator into a real array of pairs,
    //    which is required for the next step.
    //
    // 4. Object.fromEntries(...) takes the array of pairs and turns it into a plain object:
    //    Example: [['page', '2'], ['sort', 'name']] → { page: '2', sort: 'name' }
    //
    // This object (params) can now be passed directly into Axios as query parameters.
    // Axios will automatically turn it back into a query string:
    //    { page: '2', sort: 'name' } → /orders?page=2&sort=name
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    try {
      // Send GET request to '/orders' endpoint with query parameters and user authorization header
      const response = await customFetch.get<OrdersResponse>('/orders', {
        params, // e.g. pagination, sorting params from URL
        headers: {
          Authorization: `Bearer ${user.jwt}`, // send JWT token for authenticated access
        },
      });
      // Return the data from the response (orders and metadata) to be consumed by the component
      return { ...response.data };
    } catch (error) {
      // Log the error and show a toast notification on failure to fetch orders
      console.log(error);
      toast({ description: 'Failed to fetch orders' });
      return null; // Return null to indicate failure or no data
    }
  };

// React component that displays the orders page
function Orders() {
  // Get the loaded data (orders and metadata) from React Router loader data hook
  const { meta } = useLoaderData() as OrdersResponse;
  if (meta.pagination.total < 1) {
    return <SectionTitle text="Please make an order" />;
  }

  return (
    <>
      <SectionTitle text="Your Orders" />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  );
}
export default Orders;
