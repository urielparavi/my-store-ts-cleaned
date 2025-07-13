import { links } from '@/utils';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '@/hooks';
function NavLinks() {
  const user = useAppSelector((state) => state.userState.user);

  return (
    <div className="hidden lg:flex justify-center items-center gap-x-4">
      {links.map((link) => {
        // Check if the current link is a restricted route (only for logged-in users)
        const restrictedRoutes =
          link.href === 'checkout' || link.href === 'orders';

        // If it's a restricted route and the user is not logged in, don't render the link
        if (restrictedRoutes && !user) return null;
        return (
          <NavLink
            to={link.href}
            className={({ isActive }) => {
              return `capitalize font-light tracking-wide ${
                isActive ? 'text-primary' : ''
              }`;
            }}
            key={link.label}
          >
            {link.label}
          </NavLink>
        );
      })}
    </div>
  );
}
export default NavLinks;
