import ProductsGrid from './ProductsGrid';
import SectionTitle from './SectionTitle';

function FeaturedProduct() {
  return (
    <section className="pt-24 align-element">
      <SectionTitle text="featured products" />
      <ProductsGrid />
    </section>
  );
}

export default FeaturedProduct;
