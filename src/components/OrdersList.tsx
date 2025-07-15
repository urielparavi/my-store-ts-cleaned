import { useLoaderData } from 'react-router-dom';

import { type OrdersResponse } from '@/utils';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function OrdersList() {
  const { data: orders, meta } = useLoaderData() as OrdersResponse;

  return (
    <div className="mt-16 max-w-full overflow-x-auto px-0 sm:px-4 lg:px-6">
      <h4 className="mb-6 text-xl font-semibold capitalize tracking-wide text-gray-900 dark:text-gray-100">
        Total orders:{' '}
        <span className="text-primary dark:text-orange-400">
          {meta.pagination.total}
        </span>
      </h4>
      <Table className="w-full bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-gray-200 dark:border-zinc-700">
        <TableCaption className="text-sm text-gray-500 dark:text-gray-400">
          A list of your recent orders.
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-zinc-800">
            <TableHead className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
              Name
            </TableHead>
            <TableHead className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 max-w-xs">
              Address
            </TableHead>
            <TableHead className="w-[100px] px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
              Products
            </TableHead>
            <TableHead className="w-[100px] px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
              Cost
            </TableHead>
            <TableHead className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
              Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-6 text-gray-500 dark:text-gray-400"
              >
                No orders found.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => {
              const { name, address, numItemsInCart, orderTotal, createdAt } =
                order.attributes;

              const cleanOrderTotal = orderTotal.replace(/[^0-9.]/g, '');
              const cost = parseFloat(cleanOrderTotal);

              return (
                <TableRow
                  key={order.id}
                  className="even:bg-gray-50 odd:bg-white dark:even:bg-zinc-800 dark:odd:bg-zinc-900 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                >
                  <TableCell className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                    {name}
                  </TableCell>
                  <TableCell className="max-w-xs truncate px-4 py-3 text-gray-700 dark:text-gray-300">
                    {address}
                  </TableCell>
                  <TableCell className="text-center px-4 py-3 text-gray-900 dark:text-gray-100 font-semibold">
                    {numItemsInCart}
                  </TableCell>
                  <TableCell className="text-right px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">
                    {isNaN(cost) ? '-' : `$${cost.toFixed(2)}`}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {new Date(createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default OrdersList;
