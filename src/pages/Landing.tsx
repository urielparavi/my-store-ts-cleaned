import { FeaturedProducts, Hero } from '@/components';

// LoaderFunction is a TypeScript type from React Router
// It defines the expected structure of a "loader" function,
// which is used to fetch data before a route/component renders.
// The loader runs on navigation and provides data to the route via useLoaderData()
import { type LoaderFunction } from 'react-router-dom';

// ProductsResponse is a custom TypeScript type that defines the shape of the response
// returned from the /products API endpoint.
// It contains two main fields:
// 1. "data": an array of Product objects
// 2. "meta": metadata information such as pagination details
import { customFetch, type ProductsResponse } from '@/utils';

// Define the API endpoint to fetch featured products
const url = '/products?featured=true';

// Define the loader function to fetch data before the component renders
export const loader: LoaderFunction = async (): Promise<ProductsResponse> => {
  // Make an API call to fetch featured products
  const response = await customFetch<ProductsResponse>(url);

  // Return the data from the API response
  // Using object spread to ensure a new object is returned
  return { ...response.data };
};

// Define the main Landing page component
function Landing() {
  // Access the data returned from the loader
  // Type assertion tells TypeScript to treat the data as ProductsResponse
  // const result = useLoaderData() as ProductsResponse;
  // console.log(result); // Useful for debugging the returned data

  return (
    <>
      {/* Render the Hero section at the top of the landing page */}
      <Hero />

      {/* Render the featured products section */}
      <FeaturedProducts />
    </>
  );
}

// Export the Landing component as the default export
export default Landing;
