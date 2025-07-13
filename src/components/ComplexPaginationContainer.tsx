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
  const { meta } = useLoaderData() as OrdersResponse;
  const { pageCount, page } = meta.pagination;
  const { search, pathname } = useLocation();

  if (pageCount < 2) return null;

  const constructButton = ({
    pageNumber,
    isActive,
  }: {
    pageNumber: number;
    isActive: boolean;
  }): React.ReactNode => {
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
  };

  const constructEllipsis = (key: string): React.ReactNode => {
    return (
      <PaginationItem key={key}>
        <PaginationEllipsis className="text-muted-foreground" />
      </PaginationItem>
    );
  };

  const renderPagination = () => {
    let pages: React.ReactNode[] = [];
    pages.push(constructButton({ pageNumber: 1, isActive: page === 1 }));
    if (page > 2) pages.push(constructEllipsis('dots-1'));
    if (page !== 1 && page !== pageCount)
      pages.push(constructButton({ pageNumber: page, isActive: true }));
    if (page < pageCount - 1) pages.push(constructEllipsis('dots-2'));
    pages.push(
      constructButton({ pageNumber: pageCount, isActive: page === pageCount })
    );
    return pages;
  };

  const { prevUrl, nextUrl } = constructPrevOrNextUrl({
    currentPage: page,
    pageCount,
    search,
    pathname,
  });

  return (
    <Pagination className="mt-16 overflow-x-auto px-4">
      <PaginationContent className="flex flex-wrap gap-2 justify-center">
        <PaginationItem>
          <PaginationPrevious
            to={prevUrl}
            className="rounded-md px-3 py-1.5 text-sm hover:bg-accent hover:text-primary transition"
          />
        </PaginationItem>

        {renderPagination()}

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

export default ComplexPaginationContainer;

// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
//   PaginationEllipsis,
// } from '@/components/ui/pagination';

// import {
//   type OrdersResponse,
//   constructUrl,
//   constructPrevOrNextUrl,
// } from '@/utils';

// import { useLoaderData, useLocation } from 'react-router-dom';

// function ComplexPaginationContainer() {
//   const { meta } = useLoaderData() as OrdersResponse;
//   const { pageCount, page } = meta.pagination;
//   const { search, pathname } = useLocation();

//   if (pageCount < 2) return null;

//   const constructButton = ({
//     pageNumber,
//     isActive,
//   }: {
//     pageNumber: number;
//     isActive: boolean;
//   }): React.ReactNode => {
//     const url = constructUrl({ pageNumber, search, pathname });
//     return (
//       <PaginationItem key={pageNumber} className="snap-start">
//         <PaginationLink
//           to={url}
//           isActive={isActive}
//           className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200
//             ${
//               isActive
//                 ? 'bg-primary text-white shadow-sm'
//                 : 'text-muted-foreground hover:bg-accent hover:text-primary'
//             }`}
//         >
//           {pageNumber}
//         </PaginationLink>
//       </PaginationItem>
//     );
//   };

//   const constructEllipsis = (key: string): React.ReactNode => {
//     return (
//       <PaginationItem key={key} className="snap-start">
//         <PaginationEllipsis className="text-muted-foreground" />
//       </PaginationItem>
//     );
//   };

//   const renderPagination = () => {
//     let pages: React.ReactNode[] = [];
//     pages.push(constructButton({ pageNumber: 1, isActive: page === 1 }));
//     if (page > 2) pages.push(constructEllipsis('dots-1'));
//     if (page !== 1 && page !== pageCount)
//       pages.push(constructButton({ pageNumber: page, isActive: true }));
//     if (page < pageCount - 1) pages.push(constructEllipsis('dots-2'));
//     pages.push(
//       constructButton({ pageNumber: pageCount, isActive: page === pageCount })
//     );
//     return pages;
//   };

//   const { prevUrl, nextUrl } = constructPrevOrNextUrl({
//     currentPage: page,
//     pageCount,
//     search,
//     pathname,
//   });

//   return (
//     <div className="mt-16 overflow-x-auto">
//       <Pagination className="w-max min-w-full px-4">
//         <PaginationContent className="flex gap-2 snap-x snap-mandatory overflow-x-auto">
//           <PaginationItem className="snap-start shrink-0">
//             <PaginationPrevious
//               to={prevUrl}
//               className="rounded-md px-3 py-1.5 text-sm hover:bg-accent hover:text-primary transition"
//             />
//           </PaginationItem>

//           {renderPagination()}

//           <PaginationItem className="snap-start shrink-0">
//             <PaginationNext
//               to={nextUrl}
//               className="rounded-md px-3 py-1.5 text-sm hover:bg-accent hover:text-primary transition"
//             />
//           </PaginationItem>
//         </PaginationContent>
//       </Pagination>
//     </div>
//   );
// }

// export default ComplexPaginationContainer;
