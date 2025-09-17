import { NavLink, Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useTranslation } from 'react-i18next'; // 1. Import the hook

const AdminLayout = () => {
  const { t } = useTranslation(); // 2. Get the t function
  const linkStyles = "block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200";
  const activeLinkStyles = { backgroundColor: '#4f46e5', color: 'white' };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 flex">
        <aside className="w-1/4 pr-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-500">Admin Menu</h2>
          <nav className="space-y-2">
            {/* 3. Use the t() function for all links and remove duplicates */}
            <NavLink to="/admin/dashboard" end style={({ isActive }) => isActive ? activeLinkStyles : undefined} className={linkStyles}>{t('adminDashboard')}</NavLink>
            <NavLink to="/admin/properties" style={({ isActive }) => isActive ? activeLinkStyles : undefined} className={linkStyles}>{t('manageProperties')}</NavLink>
            <NavLink to="/admin/inquiries" style={({ isActive }) => isActive ? activeLinkStyles : undefined} className={linkStyles}>{t('manageInquiries')}</NavLink>
          </nav>
        </aside>
        <main className="w-3/4">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AdminLayout;