import ProductsGrid from './ProductsGrid';
import SectionTitle from './SectionTitle';

function FeaturedProduct() {
  return (
    <section className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle text="featured products" />
      <ProductsGrid />
    </section>
  );
}

export default FeaturedProduct;
