import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';

import ProductsGrid from './ProductsGrid';
import ProductsList from './ProductsList';
import { type ProductsResponse } from '@/utils';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

function ProductsContainer() {
  const { meta } = useLoaderData() as ProductsResponse;
  const totalProducts = meta.pagination.total;

  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  return (
    <>
      <section className="mt-8 px-4 sm:px-0 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h4 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            {totalProducts} product{totalProducts !== 1 && 's'} found
          </h4>
          <div className="flex gap-2">
            <Button
              onClick={() => setLayout('grid')}
              variant="ghost"
              size="icon"
              aria-label="Grid view"
              className={`group rounded-lg px-3 py-2 transition duration-200 ease-in-out
                ${
                  layout === 'grid'
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-transparent text-gray-600 hover:bg-primary/20 hover:text-primary'
                }`}
            >
              <LayoutGrid
                className={`h-5 w-5 transition-colors duration-200 ease-in-out
                  ${
                    layout === 'grid'
                      ? 'text-white'
                      : 'text-gray-600 group-hover:text-primary'
                  }`}
              />
            </Button>
            <Button
              onClick={() => setLayout('list')}
              variant="ghost"
              size="icon"
              aria-label="List view"
              className={`group rounded-lg px-3 py-2 transition duration-200 ease-in-out
                ${
                  layout === 'list'
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-transparent text-gray-600 hover:bg-primary/20 hover:text-primary'
                }`}
            >
              <List
                className={`h-5 w-5 transition-colors duration-200 ease-in-out
                  ${
                    layout === 'list'
                      ? 'text-white'
                      : 'text-gray-600 group-hover:text-primary'
                  }`}
              />
            </Button>
          </div>
        </div>
        <Separator className="mt-5 border-gray-300 dark:border-gray-700" />
      </section>
      <section className="mt-10 px-4 sm:px-0 max-w-7xl mx-auto">
        {totalProducts === 0 ? (
          <p className="text-center text-lg text-gray-500 dark:text-gray-400 mt-20 font-medium">
            Sorry, no products matched your search.
          </p>
        ) : layout === 'grid' ? (
          <ProductsGrid />
        ) : (
          <ProductsList />
        )}
      </section>
    </>
  );
}

export default ProductsContainer;
