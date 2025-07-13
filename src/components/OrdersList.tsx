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
  // Get the loaded orders and pagination meta from React Router's loader
  const { data: orders, meta } = useLoaderData() as OrdersResponse;

  return (
    <div className="mt-16">
      {/* Show total number of orders */}
      <h4 className="mb-4 capitalize">
        total orders : {meta.pagination.total}
      </h4>
      {/* Table container starts here */}
      <Table>
        {/* Caption shown under the table */}
        <TableCaption>A list of your recent orders.</TableCaption>
        {/* Table headers */}
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            {/* Order name */}
            <TableHead>Address</TableHead>
            {/* Shipping address */}
            <TableHead className="w-[100px]">Products</TableHead>
            {/* Number of products */}
            <TableHead className="w-[100px]">Cost</TableHead>
            {/* Total cost */}
            <TableHead>Date</TableHead>
            {/* Order creation date */}
          </TableRow>
        </TableHeader>
        {/* Table rows - one per order */}
        <TableBody>
          {orders.map((order) => {
            // Destructure values from the order's attributes
            const { name, address, numItemsInCart, orderTotal, createdAt } =
              order.attributes;
            return (
              <TableRow key={order.id}>
                {/* Render each field inside its own table cell */}
                <TableCell>{name}</TableCell>
                <TableCell>{address}</TableCell>
                <TableCell className="text-center">{numItemsInCart}</TableCell>
                <TableCell>{orderTotal}</TableCell>
                {/* Convert ISO date string to readable format (e.g. "2024-07-12T14:23:15.000Z" → "Fri Jul 12 2024") */}
                <TableCell>{new Date(createdAt).toDateString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
export default OrdersList;
