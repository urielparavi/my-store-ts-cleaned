import { links } from '@/utils';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '@/hooks';

function NavLinks() {
  const user = useAppSelector((state) => state.userState.user);

  return (
    <div className="hidden lg:flex justify-center items-center gap-x-6">
      {links.map((link) => {
        const restrictedRoutes =
          link.href === 'checkout' || link.href === 'orders';

        if (restrictedRoutes && !user) return null;

        return (
          <NavLink
            to={link.href}
            key={link.label}
            className={({ isActive }) =>
              `capitalize font-medium tracking-wide transition-colors duration-200 ${
                isActive
                  ? 'text-primary underline underline-offset-4 decoration-2'
                  : 'text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary'
              }`
            }
          >
            {link.label}
          </NavLink>
        );
      })}
    </div>
  );
}

export default NavLinks;
