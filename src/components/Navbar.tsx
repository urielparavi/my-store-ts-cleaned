import Logo from './Logo';
import LinksDropdown from './LinksDropdown';
import NavLinks from './NavLinks';
import ModeToggle from './ModeToggle';
import CartButton from './CartButton';

function Navbar() {
  return (
    <nav className="bg-muted/90 backdrop-blur-md shadow-md sticky top-0 z-50 py-4">
      <div className="container mx-auto flex items-center justify-between gap-6 px-4">
        <Logo />
        <LinksDropdown />
        <NavLinks />
        <div className="flex items-center gap-4">
          <ModeToggle />
          <CartButton />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
