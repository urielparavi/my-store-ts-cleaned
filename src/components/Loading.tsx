import { Skeleton } from './ui/skeleton';

function Loading() {
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => {
        // Array.from() creates a new array instance from an iterable or array-like object.
        // In this case, we use it with an object having a 'length' property to create an array of a specific size.
        // For example, Array.from({ length: 3 }) creates an array like [undefined, undefined, undefined]
        // This allows us to easily iterate a fixed number of times with .map().
        return (
          <div key={index} className="flex flex-col space-y-3">
            {/* Each skeleton card is a vertical flex container */}
            {/* key={index}: unique identifier for React rendering */}
            {/* space-y-3: vertical spacing between image and text */}
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 mx-auto w-[250px]" />
              <Skeleton className="h-4 mx-auto w-[250px]" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Loading;
