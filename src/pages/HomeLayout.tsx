import { Header, Loading, Navbar } from '@/components';
import { Outlet, useNavigation } from 'react-router-dom';

function HomeLayout() {
  const navigation = useNavigation(); // Access the current navigation state: 'idle', 'loading', or 'submitting'

  const isPageLoading = navigation.state === 'loading'; // Determine if a new route is currently loading

  return (
    <>
      <Header />
      <Navbar />
      <div className="align-element py-20">
        {/* Show loading spinner while a new page is loading, otherwise show the routed component */}
        {isPageLoading ? <Loading /> : <Outlet />}
      </div>
    </>
  );
}

export default HomeLayout;
