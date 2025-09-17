import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const MainLayout = () => {
  return (
    // Change 1: Set a fixed screen height
    <div className="flex flex-col h-screen">
      <Header />
      {/* Change 2: Allow the main content area to scroll vertically */}
      <main className="flex-grow overflow-y-auto">
        <div className="container mx-auto p-4"> {/* Optional: Add a container for padding */}
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;