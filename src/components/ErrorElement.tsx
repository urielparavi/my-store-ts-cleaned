import { useRouteError } from 'react-router-dom';

function ErrorElement() {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <h4 className="text-4xl font-bold">There was an error!</h4>
      <p className="mt-4 text-sm text-muted-foreground">
        Please try again later or contact support.
      </p>
    </div>
  );
}

export default ErrorElement;
