// Type for building a URL with updated page number and existing query string
type ConstructUrlParams = {
  pageNumber: number;
  search: string;
  pathname: string;
};

// Builds a new URL with all current filters, but replaces the 'page' parameter
export const constructUrl = ({
  pageNumber,
  search,
  pathname,
}: ConstructUrlParams) => {
  // Create a URLSearchParams instance to work with the query string parameters
  const searchParams = new URLSearchParams(search);

  // Set (or update) the 'page' parameter to the desired page number
  searchParams.set('page', pageNumber.toString());
  // console.log(searchParams.toString());

  // Return the full URL by combining the pathname and the updated query string
  return `${pathname}?${searchParams.toString()}`;

  // For Example:
  // const pageNumber = 3;
  // const pathname = '/products';
  // const search = 'category=chairs&shipping=on';

  // URLSearchParams is used to parse and manipulate query strings
  // const params = new URLSearchParams(search);

  // Set or update the 'page' parameter in the query string
  // params.set('page', String(pageNumber));

  // category=chairs&shipping=on&page=3

  // Return full URL with path and updated query string
  // return `${pathname}?${params.toString()}`;

  // '/products?category=chairs&shipping=on&page=3';
};

// Type for building the "previous" and "next" pagination URLs
type ConstructPrevOrNextParams = {
  currentPage: number;
  pageCount: number;
  search: string;
  pathname: string;
};

// Builds the URLs for the "Previous" and "Next" pagination buttons
export const constructPrevOrNextUrl = ({
  currentPage,
  pageCount,
  search,
  pathname,
}: ConstructPrevOrNextParams): { prevUrl: string; nextUrl: string } => {
  // Calculate the previous page number by subtracting 1 from the current page
  // If the result is less than 1, wrap around to the last page (circular pagination)
  let prevPage = currentPage - 1;
  if (prevPage < 1) prevPage = pageCount;

  // Generate the full URL for the previous page, keeping other query parameters
  const prevUrl = constructUrl({ pageNumber: prevPage, search, pathname });
  // Example: '/products?category=chairs&shipping=on&page=3'

  // Calculate the next page number by adding 1 to the current page
  // If the result exceeds the total number of pages, wrap around to the first page
  let nextPage = currentPage + 1;
  if (nextPage > pageCount) nextPage = 1;

  // Generate the full URL for the next page
  const nextUrl = constructUrl({ pageNumber: nextPage, search, pathname });

  // Return both previous and next URLs
  return { prevUrl, nextUrl };
};
