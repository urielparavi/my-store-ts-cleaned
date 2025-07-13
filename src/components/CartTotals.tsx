import { useAppSelector } from '@/hooks';
import { formatAsDollars } from '@/utils';
import { Card, CardTitle } from '@/components/ui/card';
import { Separator } from './ui/separator';

const CartTotals = () => {
  const { cartTotal, shipping, tax, orderTotal } = useAppSelector(
    (state) => state.cartState
  );

  return (
    <Card className="p-6 sm:p-8 bg-muted rounded-xl border shadow-sm w-full max-w-md mx-auto">
      <CartTotalRow label="Subtotal" amount={cartTotal} />
      <CartTotalRow label="Shipping" amount={shipping} />
      <CartTotalRow label="Tax" amount={tax} />
      <CardTitle className="pt-6 text-lg font-bold text-primary">
        <CartTotalRow label="Order Total" amount={orderTotal} lastRow />
      </CardTitle>
    </Card>
  );
};

function CartTotalRow({
  label,
  amount,
  lastRow,
}: {
  label: string;
  amount: number;
  lastRow?: boolean;
}) {
  return (
    <>
      <p className="flex justify-between text-base font-medium text-muted-foreground">
        <span>{label}</span>
        <span className="text-right">{formatAsDollars(amount)}</span>
      </p>
      {lastRow ? null : <Separator className="my-3" />}
    </>
  );
}

export default CartTotals;
