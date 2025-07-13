import { ActionFunction, Form, redirect } from 'react-router-dom';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';
import { customFetch, formatAsDollars, type Checkout } from '@/utils';
import { toast } from '@/components/ui/use-toast';
import { clearCart } from '../features/cart/cartSlice';
import { ReduxStore } from '@/store';

/*
  We use an action factory (a function that returns an ActionFunction) 
  instead of a plain action because we need access to the Redux store 
  inside the action.

  React Router actions/loaders do not support React hooks or context, 
  so we can't use useSelector or useDispatch directly.

  By passing the Redux store as a parameter, we can:
  - Access user/cart state via store.getState()
  - Dispatch actions like clearCart()

  In this specific case, we needed access to the user and cart state 
  in order to submit the order and clear the cart after a successful checkout.
*/

// Action factory that injects the Redux store, allowing access to state and dispatch
export const action =
  (store: ReduxStore): ActionFunction =>
  async ({ request }): Promise<null | Response> => {
    // Extract form data submitted from the <Form />
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;

    // Basic validation: ensure required fields are not empty
    if (!name || !address) {
      toast({ description: 'Please fill out all fields' });
      return null;
    }

    // Retrieve the authenticated user from Redux store
    const user = store.getState().userState.user;
    if (!user) {
      toast({ description: 'Please login to place an order' });
      return redirect('/login'); // Redirect to login if not authenticated
    }

    // Extract cart information from Redux store
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;

    // Build the checkout payload object
    const info: Checkout = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatAsDollars(orderTotal),
      cartItems,
      numItemsInCart,
    };

    try {
      // Send POST request to /orders endpoint with order data and auth token
      await customFetch.post(
        '/orders',
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      );
      // Clear cart after successful order and show a toast message
      store.dispatch(clearCart());
      toast({ description: 'Order placed' });

      // Redirect to the orders page
      return redirect('/orders');
    } catch (error) {
      // Handle API error with a toast notification
      toast({ description: 'Order failed' });
      return null;
    }
  };

// React component that renders the checkout form
function CheckoutForm() {
  return (
    <Form method="post" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl mb-4">Shipping Information</h4>
      {/* Input for user's name */}
      <FormInput label="first name" name="name" type="text" />

      {/* Input for shipping address */}
      <FormInput label="address" name="address" type="text" />

      {/* Submit button to place the order */}
      <SubmitBtn text="Place Your Order" className="mt-4" />
    </Form>
  );
}

export default CheckoutForm;
