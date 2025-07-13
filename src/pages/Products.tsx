import { Filters, ProductsContainer, PaginationContainer } from '@/components';
import {
  customFetch,
  type ProductsResponse,
  type ProductsResponseWithParams,
} from '../utils';
import { type LoaderFunction } from 'react-router-dom';

// Define the API endpoint
const url = '/products';

// Define the loader function to fetch product data before rendering the page
export const loader: LoaderFunction = async ({
  // 'request' holds info about the incoming request, including the full URL.
  // Access query params via 'request.url'.
  // This loader runs before the route's component renders.
  // Must be set in the router to be triggered.
  request,
}): Promise<ProductsResponseWithParams> => {
  // console.log(request.url);

  // Converts query string parameters into a plain object
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
    // 'new URL(request.url)' creates a URL object from the request
    // '.searchParams.entries()' gets an iterator of [key, value] pairs from the query string
    // '...' (spread operator) converts the iterator into an array
  ]);

  // 'Object.fromEntries()' converts the array of [key, value] pairs into an object
  // Example: ?category=books&price=100 → { category: 'books', price: '100' }

  // console.log(params); // Example: domain/products?search=chair → {search: 'chair'}

  // Axios automatically converts the 'params' object into a URL query string,
  // appends it to the base URL, and encodes the values properly.
  // This simplifies requests by avoiding manual URL construction.
  // It also ensures the query parameters are correctly formatted and safe to send.
  // For example:
  // If url = '/products' and params = { category: 'books', price: '100' }
  // Axios sends a GET request to: '/products?category=books&price=100'
  const response = await customFetch<ProductsResponse>(url, {
    params,
  }); // Send GET request to /products

  return { ...response.data, params }; // Return the product data
};

// Define the main Products page component
function Products() {
  return (
    <>
      {/* Filter controls (e.g., category, price range) */}
      <Filters />

      {/* Displays the list/grid of products */}
      <ProductsContainer />

      {/* Pagination controls (e.g., next/previous page) */}
      <PaginationContainer />
    </>
  );
}
export default Products;
