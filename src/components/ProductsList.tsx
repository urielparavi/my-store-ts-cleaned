import { formatAsDollars, type ProductsResponse } from '@/utils';
import { Link, useLoaderData } from 'react-router-dom';
import { Card, CardContent } from './ui/card';

function ProductsList() {
  const { data: products } = useLoaderData() as ProductsResponse;

  return (
    <div className="mt-12 flex flex-col gap-y-8 max-w-7xl mx-auto px-4 sm:px-0">
      {products.map((product) => {
        const { title, price, image, company, description } =
          product.attributes;
        const dollarsAmount = formatAsDollars(price);

        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="group block rounded-lg shadow-md bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
            tabIndex={0}
          >
            <Card>
              <CardContent className="p-6 md:p-8 grid md:grid-cols-3 gap-6 items-start">
                <img
                  src={image}
                  alt={title}
                  className="h-64 w-full md:h-48 md:w-48 rounded-md object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="flex flex-col justify-start">
                  <h2 className="text-xl font-semibold capitalize text-gray-900 dark:text-gray-100 truncate">
                    {title}
                  </h2>
                  <h4 className="text-muted-foreground mb-2 text-sm font-medium">
                    {company}
                  </h4>
                  <p className="text-sm text-zinc-700 dark:text-zinc-400 leading-relaxed tracking-wide italic line-clamp-3">
                    {description}
                  </p>
                </div>
                <p className="text-primary text-lg font-semibold md:ml-auto self-start">
                  {dollarsAmount}
                </p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

export default ProductsList;
