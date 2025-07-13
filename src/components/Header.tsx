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

  // Get the current logged-in user from the Redux store (null if not logged in)
  const user = useAppSelector((state) => state.userState.user);

  const handleLogout = () => {
    // Clear the shopping cart state and localStorage to reset the cart data
    dispatch(clearCart());

    // Clear the user state and remove user info from localStorage to log out the user
    dispatch(logoutUser());
    toast({ description: 'Logged out' });
    navigate('/');
  };
  return (
    <header>
      <div className="align-element flex justify-center sm:justify-end py-2">
        {/* USER */}
        {user ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-xs sm:text-sm">Hello, {user.username}</p>
            <Button variant="link" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center -mr-4">
            <Button asChild variant="link" size="sm">
              <Link to="/login">Sign in / Guest</Link>
            </Button>

            <Button asChild variant="link" size="sm">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
