import { useAppSelector } from '@/hooks';
import { Card } from './ui/card';

import {
  FirstColumn,
  SecondColumn,
  ThirdColumn,
  FourthColumn,
} from './CartItemColumns';

function CartItemsList() {
  // Access the array of cart items from Redux state
  const cartItems = useAppSelector((state) => state.cartState.cartItems);

  return (
    <div>
      {cartItems.map((cartItem) => {
        // Destructure fields from each cart item object
        const { cartID, title, price, image, amount, company, productColor } =
          cartItem;

        return (
          <Card
            key={cartID} // Unique key for each item in the list (required by React)
            className="flex flex-col gap-y-4 sm:flex-row flex-wrap p-6 mb-8" // Responsive layout: stacked on mobile, horizontal on larger screens
          >
            {/* Display the image and title */}
            <FirstColumn image={image} title={title} />

            {/* Display the title, company name, and selected color */}
            <SecondColumn
              title={title}
              company={company}
              productColor={productColor}
            />

            {/* Display the quantity selector and cart ID (used for state updates) */}
            <ThirdColumn amount={amount} cartID={cartID} />

            {/* Display the price of the item */}
            <FourthColumn price={price} />
          </Card>
        );
      })}
    </div>
  );
}

export default CartItemsList;
