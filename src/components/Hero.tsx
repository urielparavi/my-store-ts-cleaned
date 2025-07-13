import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import HeroCarousel from './HeroCarousel';

function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl">
          Find Your Next Favorite Product Right Here
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8">
          Discover the latest trends and exclusive deals on our platform. Shop
          with confidence and enjoy a seamless shopping experience.
        </p>
        <Button asChild size="lg" className="mt-10">
          <Link to="/products">Our Products</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  );
}
export default Hero;
