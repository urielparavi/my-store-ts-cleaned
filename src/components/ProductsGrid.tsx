import { Link, useLoaderData } from 'react-router-dom';
import { CardContent } from '@/components/ui/card';
import { formatAsDollars, type ProductsResponse } from '@/utils';

function ProductsGrid() {
  const { data: products } = useLoaderData() as ProductsResponse;

  return (
    <div className="pt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const { title, price, image } = product.attributes;
        const dollarsAmount = formatAsDollars(price);

        return (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            className="group block rounded-lg bg-white dark:bg-zinc-800 dark:ring-1 dark:ring-zinc-700 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            tabIndex={0}
          >
            <CardContent className="p-4">
              <img
                src={image}
                alt={title}
                className="h-64 md:h-48 w-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="mt-4 text-center">
                <h2 className="text-lg sm:text-xl font-semibold capitalize text-gray-900 dark:text-gray-100 truncate">
                  {title}
                </h2>
                <p className="text-primary font-semibold mt-1 text-lg">
                  {dollarsAmount}
                </p>
              </div>
            </CardContent>
          </Link>
        );
      })}
    </div>
  );
}

export default ProductsGrid;
