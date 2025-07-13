import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks';

import { logoutUser } from '../features/user/userSlice';
import { clearCart } from '../features/cart/cartSlice';
import { useToast } from './ui/use-toast';

function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const user = useAppSelector((state) => state.userState.user);

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(logoutUser());
    toast({ description: 'Logged out' });
    navigate('/');
  };

  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-center sm:justify-end items-center">
        {user ? (
          <div className="flex items-center gap-6 text-gray-700 dark:text-gray-300">
            <p className="text-sm font-medium">
              Hello, <span className="font-semibold">{user.username}</span>
            </p>
            <Button
              variant="link"
              size="sm"
              onClick={handleLogout}
              className="text-orange-600 hover:text-orange-700 dark:hover:text-orange-400 transition"
            >
              Logout
            </Button>
          </div>
        ) : (
          <nav className="flex gap-8 text-gray-600 dark:text-gray-400 text-sm font-medium">
            <Button
              asChild
              variant="link"
              size="sm"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <Link to="/login">Sign in / Guest</Link>
            </Button>
            <Button
              asChild
              variant="link"
              size="sm"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <Link to="/register">Register</Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
