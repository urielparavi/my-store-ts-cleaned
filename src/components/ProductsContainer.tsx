import { useLoaderData } from 'react-router-dom';
import ProductsGrid from './ProductsGrid';
import ProductsList from './ProductsList';
import { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { type ProductsResponse } from '@/utils';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

function ProductsContainer() {
  // Extract metadata from loader data and cast the type
  const { meta } = useLoaderData() as ProductsResponse;

  // Get the total number of products from pagination info
  const totalProducts = meta.pagination.total;

  // State to control layout view mode: 'grid' or 'list'
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  return (
    <>
      {/* Header Section */}
      <section>
        <div className="flex justify-between items-center mt-8">
          {/* Display total number of products with plural logic */}
          <h4 className="font-medium text-md">
            {totalProducts} product{totalProducts > 1 && 's'}
          </h4>

          {/* Layout toggle buttons (Grid / List) */}
          <div className="flex gap-x-4">
            {/* Grid view button */}
            <Button
              onClick={() => setLayout('grid')}
              variant={layout === 'grid' ? 'default' : 'ghost'} // highlight if selected
              size="icon"
            >
              <LayoutGrid />
            </Button>

            {/* List view button */}
            <Button
              onClick={() => setLayout('list')}
              variant={layout === 'list' ? 'default' : 'ghost'} // highlight if selected
              size="icon"
            >
              <List />
            </Button>
          </div>
        </div>

        {/* Horizontal line separator */}
        <Separator className="mt-4" />
      </section>

      {/* Main Product Display Section */}
      <div>
        {/* Show message if no products are available */}
        {totalProducts === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, no products matched your search...
          </h5>
        ) : layout === 'grid' ? (
          // Render Grid layout if selected
          <ProductsGrid />
        ) : (
          // Otherwise, render List layout
          <ProductsList />
        )}
      </div>
    </>
  );
}

export default ProductsContainer;
