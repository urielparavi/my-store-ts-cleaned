import { Filters, ProductsContainer, PaginationContainer } from '@/components';
import {
  customFetch,
  type ProductsResponse,
  type ProductsResponseWithParams,
} from '../utils';
import { type LoaderFunction } from 'react-router-dom';

const url = '/products';

export const loader: LoaderFunction = async ({
  request,
}): Promise<ProductsResponseWithParams> => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const response = await customFetch<ProductsResponse>(url, { params });
  return { ...response.data, params };
};

function Products() {
  return (
    <main className="fade-in bg-gray-50 dark:bg-zinc-900 min-h-screen px-2 sm:px-4 md:px-6 lg:px-10 py-8 text-gray-900 dark:text-gray-100 max-w-[100rem] mx-auto">
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </main>
  );
}

export default Products;
