import { formatAsDollars, type ProductsResponse } from '@/utils';
import { Link, useLoaderData } from 'react-router-dom';
import { Card, CardContent } from './ui/card';

function ProductsList() {
  const { data: products } = useLoaderData() as ProductsResponse;

  return (
    <div className="mt-12 grid gap-y-8">
      {products.map((product) => {
        const { title, price, image, company, description } =
          product.attributes;
        const dollarsAmount = formatAsDollars(price);

        return (
          <Link key={product.id} to={`/products/${product.id}`}>
            <Card>
              <CardContent className="p-8 gap-y-4 grid md:grid-cols-3">
                <img
                  src={image}
                  alt={title}
                  className="h-64 w-full md:h-48 md:w-48 rounded-md object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold capitalize">{title}</h2>
                  <h4 className="text-muted-foreground mb-2">{company}</h4>
                  <p className="text-sm text-zinc-700 leading-relaxed tracking-wide italic line-clamp-3">
                    {description}
                  </p>
                </div>
                <p className="text-primary text-lg font-medium md:ml-auto self-start">
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
