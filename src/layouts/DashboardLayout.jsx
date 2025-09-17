import { NavLink, Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const DashboardLayout = () => {
  const linkStyles = "block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200";
  const activeLinkStyles = { backgroundColor: '#4f46e5', color: 'white' };

  return (
    // 1. Wrap in a flex container with fixed screen height
    <div className="flex flex-col h-screen">
      <Header />
      {/* 2. Make the main content area grow and scroll if it overflows */}
      <div className="container mx-auto p-4 flex flex-grow overflow-y-auto">
        <aside className="w-1/4 pr-8">
          <nav className="space-y-2">
            <NavLink to="/dashboard/profile" style={({ isActive }) => isActive ? activeLinkStyles : undefined} className={linkStyles}>My Profile</NavLink>
            <NavLink to="/dashboard/inquiries" style={({ isActive }) => isActive ? activeLinkStyles : undefined} className={linkStyles}>My Inquiries</NavLink>
            <NavLink to="/dashboard/wishlist" style={({ isActive }) => isActive ? activeLinkStyles : undefined} className={linkStyles}>My Wishlist</NavLink>
          </nav>
        </aside>
        <main className="w-3/4">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;