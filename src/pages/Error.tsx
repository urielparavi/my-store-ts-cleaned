import { useRouteError, Link, isRouteErrorResponse } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function Error() {
  // Retrieve the error thrown during routing using React Router's hook
  const error = useRouteError();
  console.log(error); // Log the error for debugging purposes

  // Check if the error is a valid RouteErrorResponse and if the status is 404 (Not Found)
  // `isRouteErrorResponse` is a Type Predicate – it tells TypeScript that `error` is of type RouteErrorResponse
  // if it returns true`
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <main className="grid min-h-[100vh] place-items-center px-8">
        <div className="text-center">
          {/* Display a large 404 error code */}
          <p className="text-9xl font-semibold text-primary">404</p>

          {/* Error title */}
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Page Not Found
          </h1>

          {/* Short explanation message */}
          <p className="mt-6 text-lg leading-7">
            Sorry, we could not find the page you are looking for.
          </p>

          {/* Button that navigates back to the home page */}
          <div className="mt-10">
            <Button asChild size="lg" variant="secondary">
              <Link to="/">Go back home</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // Fallback UI for all other error types
  return (
    <main className="grid min-h-[100vh] place-items-center px-8">
      <h4 className="text-center font-bold text-4xl">There was an error...</h4>
    </main>
  );
}

export default Error;
