import { NavLink, Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useTranslation } from 'react-i18next'; // 1. Import the hook

const DashboardLayout = () => {
  const { t } = useTranslation(); // 2. Get the t function
  const linkStyles = "block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200";
  const activeLinkStyles = { backgroundColor: '#4f46e5', color: 'white' };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="container mx-auto p-4 flex flex-grow overflow-y-auto">
        <aside className="w-1/4 pr-8">
          <nav className="space-y-2">
            {/* 3. Use the t() function for all links */}
            <NavLink to="/dashboard/profile" style={({ isActive }) => isActive ? activeLinkStyles : undefined} className={linkStyles}>{t('myProfile')}</NavLink>
            <NavLink to="/dashboard/inquiries" style={({ isActive }) => isActive ? activeLinkStyles : undefined} className={linkStyles}>{t('myInquiries')}</NavLink>
            <NavLink to="/dashboard/wishlist" style={({ isActive }) => isActive ? activeLinkStyles : undefined} className={linkStyles}>{t('myWishlist')}</NavLink>
            <NavLink to="/dashboard/appointments" style={({ isActive }) => isActive ? activeLinkStyles : undefined} className={linkStyles}>{t('myAppointments')}</NavLink>

            <NavLink to="/dashboard/submit-testimonial" style={({ isActive }) => isActive ? activeLinkStyles : undefined} className={linkStyles}>{t('submitTestimonialLink')}</NavLink>
            

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