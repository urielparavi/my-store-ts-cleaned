import { useAppSelector } from '@/hooks';
import { formatAsDollars } from '@/utils';
import { Card, CardTitle } from '@/components/ui/card';
import { Separator } from './ui/separator';

// Main component that displays a summary of the cart totals
const CartTotals = () => {
  // Extracting relevant values from Redux cart state
  const { cartTotal, shipping, tax, orderTotal } = useAppSelector(
    (state) => state.cartState
  );

  return (
    <Card className="p-8 bg-muted">
      {/* Display subtotal row */}
      <CartTotalRow label="Subtotal" amount={cartTotal} />

      {/* Display shipping cost row */}
      <CartTotalRow label="Shipping" amount={shipping} />

      {/* Display tax row */}
      <CartTotalRow label="Tax" amount={tax} />

      {/* Order total row inside CardTitle to emphasize it */}
      <CardTitle className="mt-8">
        <CartTotalRow label="Order Total" amount={orderTotal} lastRow />
      </CardTitle>
    </Card>
  );
};

// Sub-component that renders a single row (label and amount)
function CartTotalRow({
  label,
  amount,
  lastRow,
}: {
  label: string; // The label text (e.g., "Tax")
  amount: number; // The numeric value to display, formatted as dollars
  lastRow?: boolean; // Optional flag to skip separator for the last row
}) {
  return (
    <>
      {/* Flex container to display label and formatted amount on opposite sides */}
      <p className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{formatAsDollars(amount)}</span>
      </p>

      {/* Add a separator unless this is the last row */}
      {lastRow ? null : <Separator className="my-2" />}
    </>
  );
}

export default CartTotals;
