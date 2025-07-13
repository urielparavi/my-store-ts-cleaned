import ProductsGrid from './ProductsGrid';
import SectionTitle from './SectionTitle';

function FeaturedProduct() {
  return (
    <section className="pt-24">
      <SectionTitle text="featured products" />
      <ProductsGrid />
    </section>
  );
}
export default FeaturedProduct;
