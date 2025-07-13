import { useAppSelector } from '@/hooks';
import { Card } from './ui/card';
import {
  FirstColumn,
  SecondColumn,
  ThirdColumn,
  FourthColumn,
} from './CartItemColumns';

function CartItemsList() {
  const cartItems = useAppSelector((state) => state.cartState.cartItems);

  return (
    <div className="space-y-6">
      {cartItems.map((cartItem) => {
        const { cartID, title, price, image, amount, company, productColor } =
          cartItem;

        return (
          <Card
            key={cartID}
            className="
              grid 
              grid-cols-1 
              sm:grid-cols-[auto_1fr] 
              lg:grid-cols-[auto_1fr_80px_100px] 
              gap-4 
              items-center 
              p-4 sm:p-6 
              shadow-sm hover:shadow-md 
              transition-all
            "
          >
            <div className="row-start-1 row-end-2 sm:row-span-2 lg:row-auto">
              <FirstColumn image={image} title={title} />
            </div>
            <div className="sm:ml-4 lg:ml-0">
              <SecondColumn
                title={title}
                company={company}
                productColor={productColor}
              />
            </div>
            <div className="sm:col-span-2 lg:col-auto justify-self-start lg:justify-self-center">
              <ThirdColumn amount={amount} cartID={cartID} />
            </div>
            <div className="sm:col-span-2 lg:col-auto justify-self-end">
              <FourthColumn price={price} />
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default CartItemsList;
