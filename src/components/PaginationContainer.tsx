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
  const { meta } = useLoaderData() as ProductsResponseWithParams;
  const { pageCount, page } = meta.pagination;
  const { search, pathname } = useLocation();
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  if (pageCount < 2) return null;

  const renderPagination = pages.map((pageNumber) => {
    const isActive = pageNumber === page;
    const url = constructUrl({ pageNumber, search, pathname });

    return (
      <PaginationItem key={pageNumber}>
        <PaginationLink
          to={url}
          isActive={isActive}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200
            ${
              isActive
                ? 'bg-primary text-white shadow-sm'
                : 'text-muted-foreground hover:bg-accent hover:text-primary'
            }`}
        >
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    );
  });

  const { prevUrl, nextUrl } = constructPrevOrNextUrl({
    currentPage: page,
    pageCount,
    search,
    pathname,
  });

  return (
    <Pagination className="mt-16 overflow-x-auto">
      <PaginationContent className="flex flex-wrap gap-2 justify-center">
        <PaginationItem>
          <PaginationPrevious
            to={prevUrl}
            className="rounded-md px-3 py-1.5 text-sm hover:bg-accent hover:text-primary transition"
          />
        </PaginationItem>
        {renderPagination}
        <PaginationItem>
          <PaginationNext
            to={nextUrl}
            className="rounded-md px-3 py-1.5 text-sm hover:bg-accent hover:text-primary transition"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationContainer;
