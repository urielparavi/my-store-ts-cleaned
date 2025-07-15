import { Header, Loading, Navbar } from '@/components';
import { Outlet, useNavigation } from 'react-router-dom';

function HomeLayout() {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';

  return (
    <>
      <Header />
      <Navbar />
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {isPageLoading ? (
          <Loading />
        ) : (
          <div className="fade-in">
            <Outlet />
          </div>
        )}
      </div>
    </>
  );
}

export default HomeLayout;
