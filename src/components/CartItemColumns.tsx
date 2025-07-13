import { formatAsDollars } from '@/utils';
import { useAppDispatch } from '@/hooks';
import { Button } from './ui/button';
import { editItem, removeItem } from '@/features/cart/cartSlice';
import SelectProductAmount from './SelectProductAmount';
import { Mode } from './SelectProductAmount';

// FirstColumn renders the product image
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
      className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
    />
  );
};

// SecondColumn renders product title, company name, and selected color
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
    <div className="sm:ml-4 md:ml-12 sm:w-48">
      {/* Product title */}
      <h3 className="capitalize font-medium">{title}</h3>
      {/* Company name */}
      <h4 className="mt-2 capitalize text-sm">{company}</h4>
      {/* Selected color indicator */}
      <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
        color :
        <span
          style={{
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            backgroundColor: productColor,
          }}
        ></span>
      </p>
    </div>
  );
};

// ThirdColumn handles quantity selection and item removal
export const ThirdColumn = ({
  amount,
  cartID,
}: {
  amount: number;
  cartID: string;
}) => {
  const dispatch = useAppDispatch();

  // Dispatch action to remove item from cart
  const removeItemFromTheCart = () => {
    dispatch(removeItem(cartID));
  };

  // Dispatch action to update item quantity in cart
  const setAmount = (value: number) => {
    dispatch(editItem({ cartID, amount: value }));
  };

  return (
    <div>
      {/* Quantity selector component for cart item */}
      <SelectProductAmount
        amount={amount}
        setAmount={setAmount}
        mode={Mode.CartItem}
      />
      {/* Remove button with link style */}
      <Button variant="link" className="-ml-4" onClick={removeItemFromTheCart}>
        Remove
      </Button>
    </div>
  );
};

// FourthColumn renders the product price formatted as currency
export const FourthColumn = ({ price }: { price: string }) => {
  return <p className="font-medium sm:ml-auto">{formatAsDollars(price)}</p>;
};
