import { formatAsDollars } from '@/utils';
import { useAppDispatch } from '@/hooks';
import { Button } from './ui/button';
import { editItem, removeItem } from '@/features/cart/cartSlice';
import SelectProductAmount from './SelectProductAmount';
import { Mode } from './SelectProductAmount';

export const FirstColumn = ({
  image,
  title,
}: {
  image: string;
  title: string;
}) => {
  return (
    <img
      src={image}
      alt={title}
      className="
        w-full
        h-64
        mb-4
        sm:mb-0
        sm:h-32 sm:w-32
        rounded-xl 
        object-cover 
        shadow-sm 
        hover:shadow-md 
        transition-all
      "
    />
  );
};

export const SecondColumn = ({
  title,
  company,
  productColor,
}: {
  title: string;
  company: string;
  productColor: string;
}) => {
  return (
    <div className="sm:ml-4 md:ml-12 sm:w-48 space-y-2">
      <h3 className="capitalize font-medium text-base">{title}</h3>
      <h4 className="capitalize text-sm text-muted-foreground">{company}</h4>
      <div className="flex items-center gap-x-2 pt-1">
        <span className="text-sm capitalize text-muted-foreground">Color:</span>
        <span
          className="rounded-full ring-1 ring-muted-foreground/20"
          style={{
            width: '16px',
            height: '16px',
            backgroundColor: productColor,
          }}
        />
      </div>
    </div>
  );
};

export const ThirdColumn = ({
  amount,
  cartID,
}: {
  amount: number;
  cartID: string;
}) => {
  const dispatch = useAppDispatch();

  const removeItemFromTheCart = () => {
    dispatch(removeItem(cartID));
  };

  const setAmount = (value: number) => {
    dispatch(editItem({ cartID, amount: value }));
  };

  return (
    <div className="flex flex-col items-start gap-2 mt-4 sm:mt-0 sm:self-start">
      <SelectProductAmount
        amount={amount}
        setAmount={setAmount}
        mode={Mode.CartItem}
      />
      <Button
        variant="link"
        className="text-destructive hover:text-destructive/70 p-0 text-sm"
        onClick={removeItemFromTheCart}
      >
        Remove
      </Button>
    </div>
  );
};
export const FourthColumn = ({ price }: { price: string }) => {
  return (
    <p className="font-semibold text-base text-right sm:ml-auto text-muted-foreground">
      {formatAsDollars(price)}
    </p>
  );
};
