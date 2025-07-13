import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';

import {
  type OrdersResponse,
  constructUrl,
  constructPrevOrNextUrl,
} from '@/utils';

import { useLoaderData, useLocation } from 'react-router-dom';

function ComplexPaginationContainer() {
  // Get data returned from the route's loader
  const { meta } = useLoaderData() as OrdersResponse;

  // Destructure pagination info from the metadata returned by the loader
  // 'pageCount' is the total number of pages available
  // 'page' is the current active page number the user is on
  const { pageCount, page } = meta.pagination;

  // useLocation provides information about the current URL
  const { search, pathname } = useLocation();
  // Example:
  // pathname = "/orders"
  // search = "?status=delivered&sort=desc&page=3"

  // This generates an array of page numbers [1, 2, 3, ...]
  // (Not actually used in this implementation)
  // const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  // If there's only one page, there's no need for pagination
  if (pageCount < 2) return null;

  // Helper to render a numbered pagination button (with active state)
  // This function only defines the structure of a single pagination button.
  // It returns JSX that represents one page link, but it doesn't render anything by itself.
  // The actual rendering happens when this function is called inside `renderPagination`.
  const constructButton = ({
    pageNumber,
    isActive,
  }: {
    pageNumber: number;
    isActive: boolean;
    // React.ReactNode represents anything that can be rendered in JSX.
    // This includes JSX elements, strings, numbers, null, undefined, booleans (ignored), and arrays of these.
    // In short: if it can appear between JSX tags (e.g., <div>{...}</div>), it's a valid ReactNode.
  }): React.ReactNode => {
    // Generate the URL for a specific page number while preserving existing query parameters
    // For example: if current search = "?status=delivered&sort=desc&page=3"
    // and pageNumber = 5 => the result will be "/orders?status=delivered&sort=desc&page=5"
    const url = constructUrl({ pageNumber, search, pathname });
    return (
      // Render a pagination item (a single page link)
      // - `key={pageNumber}` ensures unique identification in React's render
      // - `to={url}` defines the navigation target (e.g., "/orders?page=3")
      // - `isActive={isActive}` highlights the current active page
      // - `{pageNumber}` displays the visible number in the button
      <PaginationItem key={pageNumber}>
        <PaginationLink to={url} isActive={isActive}>
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    );
  };

  // Helper to render an ellipsis ("...") between page numbers
  const constructEllipsis = (key: string): React.ReactNode => {
    return (
      <PaginationItem key={key}>
        <PaginationEllipsis />
      </PaginationItem>
    );
  };

  // Core pagination rendering logic
  // Displays first page, current page (if not first/last), last page, and ellipses if needed
  const renderPagination = () => {
    let pages: React.ReactNode[] = [];

    // Always show the first page
    pages.push(constructButton({ pageNumber: 1, isActive: page === 1 }));

    // Show ellipsis if there's a gap between first and current
    if (page > 2) {
      // Add an ellipsis ("...") to indicate a gap between page buttons
      // The 'dots-1' key uniquely identifies this ellipsis element for React's reconciliation process
      pages.push(constructEllipsis('dots-1'));
    }

    // Show the current page if it's not first or last
    if (page !== 1 && page !== pageCount) {
      pages.push(constructButton({ pageNumber: page, isActive: true }));
    }

    // Show ellipsis if there's a gap between current and last
    if (page < pageCount - 1) {
      pages.push(constructEllipsis('dots-2'));
    }

    // Always show the last page
    pages.push(
      constructButton({ pageNumber: pageCount, isActive: page === pageCount })
    );

    return pages;
  };

  // Generate links for "Previous" and "Next" buttons
  const { prevUrl, nextUrl } = constructPrevOrNextUrl({
    currentPage: page,
    pageCount,
    search,
    pathname,
  });

  // Render the full pagination component
  return (
    <Pagination className="mt-16">
      <PaginationContent>
        {/* Previous page button */}
        <PaginationItem>
          <PaginationPrevious to={prevUrl} />
        </PaginationItem>

        {/* Render dynamic page numbers with ellipses */}
        {renderPagination()}

        {/* Next page button */}
        <PaginationItem>
          <PaginationNext to={nextUrl} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default ComplexPaginationContainer;
