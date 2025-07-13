import { ActionFunction, Form, redirect } from 'react-router-dom';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';
import { customFetch, formatAsDollars, type Checkout } from '@/utils';
import { toast } from '@/components/ui/use-toast';
import { clearCart } from '../features/cart/cartSlice';
import { ReduxStore } from '@/store';
import { Card } from './ui/card';

export const action =
  (store: ReduxStore): ActionFunction =>
  async ({ request }): Promise<null | Response> => {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;

    if (!name || !address) {
      toast({ description: 'Please fill out all fields' });
      return null;
    }

    const user = store.getState().userState.user;
    if (!user) {
      toast({ description: 'Please login to place an order' });
      return redirect('/login');
    }

    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;

    const info: Checkout = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatAsDollars(orderTotal),
      cartItems,
      numItemsInCart,
    };

    try {
      await customFetch.post(
        '/orders',
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      );
      store.dispatch(clearCart());
      toast({ description: 'Order placed' });
      return redirect('/orders');
    } catch (error) {
      toast({ description: 'Order failed' });
      return null;
    }
  };

function CheckoutForm() {
  return (
    <Card className="w-full max-w-3xl mx-auto p-6 sm:p-8 shadow-sm border rounded-xl bg-white dark:bg-zinc-800">
      <Form method="post" className="flex flex-col gap-y-6">
        <h4 className="text-xl font-semibold text-primary mb-2">
          Shipping Information
        </h4>
        <FormInput label="first name" name="name" type="text" />
        <FormInput label="address" name="address" type="text" />
        <SubmitBtn text="Place Your Order" className="mt-4" />
      </Form>
    </Card>
  );
}

export default CheckoutForm;
