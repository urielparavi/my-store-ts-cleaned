import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  ProductsResponseWithParams,
  constructUrl,
  constructPrevOrNextUrl,
} from '@/utils';

import { useLoaderData, useLocation } from 'react-router-dom';

function PaginationContainer() {
  // Get data returned by the route's loader function
  const { meta } = useLoaderData() as ProductsResponseWithParams;

  // Destructure pagination info: total number of pages and current page
  const { pageCount, page } = meta.pagination;

  // useLocation is a React Router hook that provides access to the current URL location.
  // This line extracts the URL's query string (`search`) and path (`pathname`) from the location object.
  const { search, pathname } = useLocation();
  // Example:
  // pathname: "/products"
  // search: "?category=all&sort=price&company=Artifex&page=2"

  // Create an array of all available page numbers (e.g. [1, 2, 3])
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  // If there's only one page, no need to show pagination
  if (pageCount < 2) return null;

  // Render page links for each available page
  const renderPagination = pages.map((pageNumber) => {
    // Determine if the current page number is the active one
    const isActive = pageNumber === page;

    // Generate the URL for the current page, preserving other query parameters
    const url = constructUrl({ pageNumber, search, pathname });
    // Example result: "/products?page=2&category=all&company=Artifex&order=a-z&price=100000"

    // Render a pagination link for each available page (e.g., 1, 2, 3...) with an active state for the current page
    return (
      <PaginationItem key={pageNumber}>
        <PaginationLink to={url} isActive={isActive}>
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    );
  });

  // Generate URLs for the "Previous" and "Next" buttons
  const { prevUrl, nextUrl } = constructPrevOrNextUrl({
    currentPage: page,
    pageCount,
    search,
    pathname,
  });

  // Render the full pagination component: previous button, page number links, and next button
  // - PaginationPrevious links to the previous page
  // - renderPagination maps and renders all page number links
  // - PaginationNext links to the next page
  return (
    <Pagination className="mt-16">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious to={prevUrl} />
        </PaginationItem>
        {renderPagination}
        <PaginationItem>
          <PaginationNext to={nextUrl} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationContainer;
