import { useLoaderData } from 'react-router-dom';
import { Link, type LoaderFunction } from 'react-router-dom';
import {
  customFetch,
  formatAsDollars,
  type SingleProductResponse,
  type CartItem,
} from '@/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SelectProductAmount, SelectProductColor } from '@/components';
import { Mode } from '@/components/SelectProductAmount';
import { addItem } from '@/features/cart/cartSlice';
import { useDispatch } from 'react-redux';

export const loader: LoaderFunction = async ({
  params,
}): Promise<SingleProductResponse> => {
  const response = await customFetch<SingleProductResponse>(
    `/products/${params.id}`
  );
  return { ...response.data };
};

function SingleProduct() {
  const { data: product } = useLoaderData() as SingleProductResponse;
  const { image, title, price, description, colors, company } =
    product.attributes;
  const dollarsAmount = formatAsDollars(price);
  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();

  const cartProduct: CartItem = {
    cartID: product.id + productColor,
    productID: product.id,
    image,
    title,
    price,
    amount,
    productColor,
    company,
  };

  const addToCart = () => {
    dispatch(addItem(cartProduct));
  };

  return (
    <section className="px-4 py-8 bg-gray-50 dark:bg-zinc-900 min-h-screen text-gray-900 dark:text-gray-100">
      <nav className="flex items-center gap-x-3 text-sm text-gray-600 dark:text-gray-400">
        <Button
          asChild
          variant="link"
          size="sm"
          className="hover:text-orange-600 transition"
        >
          <Link to="/">Home</Link>
        </Button>
        <Separator
          orientation="vertical"
          className="h-4 border-gray-300 dark:border-zinc-700"
        />
        <Button
          asChild
          variant="link"
          size="sm"
          className="hover:text-orange-600 transition"
        >
          <Link to="/products">Products</Link>
        </Button>
      </nav>

      <div className="mt-8 max-w-7xl mx-auto grid gap-y-10 lg:grid-cols-2 lg:gap-x-16">
        <img
          src={image}
          alt={title}
          className="w-full max-w-md h-auto object-cover rounded-lg shadow-md mx-auto lg:max-w-full"
        />
        <div className="flex flex-col">
          <h1 className="capitalize text-4xl font-extrabold text-gray-900 dark:text-gray-100">
            {title}
          </h1>
          <h4 className="text-lg mt-2 font-medium text-gray-700 dark:text-gray-400">
            {company}
          </h4>
          <p className="mt-3 text-xl font-semibold text-orange-600 bg-orange-50 dark:bg-orange-900 inline-block px-3 py-1 rounded-md">
            {dollarsAmount}
          </p>
          <p className="mt-6 leading-relaxed text-gray-700 dark:text-gray-300">
            {description}
          </p>

          <div className="mt-8 space-y-6">
            <SelectProductColor
              colors={colors}
              productColor={productColor}
              setProductColor={setProductColor}
            />
            <SelectProductAmount
              mode={Mode.SingleProduct}
              amount={amount}
              setAmount={setAmount}
            />
          </div>

          <Button
            size="lg"
            className="mt-10 bg-orange-600 hover:bg-orange-700 text-white transition rounded-lg shadow-lg"
            onClick={addToCart}
          >
            Add To Bag
          </Button>
        </div>
      </div>
    </section>
  );
}

export default SingleProduct;
