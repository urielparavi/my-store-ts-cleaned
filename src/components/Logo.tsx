import { Link } from 'react-router-dom';
import { Armchair } from 'lucide-react';

const Logo = () => {
  return (
    <Link
      to="/"
      aria-label="Home"
      className="
        hidden lg:flex
        justify-center items-center
        bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
        p-3 rounded-xl
        text-white
        shadow-lg
        hover:scale-110 hover:shadow-2xl
        transition-transform duration-300 ease-in-out
        focus:outline-none focus:ring-4 focus:ring-purple-400
      "
    >
      <Armchair className="w-8 h-8" />
    </Link>
  );
};

export default Logo;
