import { Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Route Protection
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';

// Public Pages
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

// User Dashboard Pages
import DashboardHomePage from './pages/dashboard/DashboardHomePage';
import MyInquiriesPage from './pages/dashboard/MyInquiriesPage';
import MyWishlistPage from './pages/dashboard/MyWishlistPage';
import MyProfilePage from './pages/dashboard/MyProfilePage';

// Admin Dashboard Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ManagePropertiesPage from './pages/admin/ManagePropertiesPage';
import AdminLayout from './layouts/AdminLayout';
import ManageInquiriesPage from './pages/admin/ManageInquiriesPage';
import CreatePropertyPage from './pages/admin/CreatePropertyPage';
import EditPropertyPage from './pages/admin/EditPropertyPage';
import SubmitTestimonialPage from './pages/dashboard/SubmitTestimonialPage';
import ManageTestimonialsPage from './pages/admin/ManageTestimonialsPage';
import ManageAppointmentsPage from './pages/admin/ManageAppointmentsPage';
import MyAppointmentsPage from './pages/dashboard/MyAppointmentsPage';

function App() {
  return (
    <Routes>
      {/* --- Public Routes using the Main Layout --- */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="properties" element={<PropertiesPage />} />
        <Route path="properties/:id" element={<PropertyDetailPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegistrationPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password/:token" element={<ResetPasswordPage />} />
      </Route>

      {/* --- Protected User Dashboard Routes --- */}
      <Route path="/dashboard" element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<DashboardHomePage />} />
          <Route path="inquiries" element={<MyInquiriesPage />} />
          <Route path="wishlist" element={<MyWishlistPage />} />
          <Route path="profile" element={<MyProfilePage />} />
          <Route path="submit-testimonial" element={<SubmitTestimonialPage />} />
          <Route path="appointments" element={<MyAppointmentsPage />} />


        </Route>
      </Route>

      {/* --- Protected Admin Dashboard Routes --- */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route element={<AdminLayout />}> {/* Use the new AdminLayout */}
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="properties" element={<ManagePropertiesPage />} />
          <Route path="inquiries" element={<ManageInquiriesPage />} />
          <Route path="properties/create" element={<CreatePropertyPage />} />
          <Route path="properties/edit/:id" element={<EditPropertyPage />} />
          <Route path="testimonials" element={<ManageTestimonialsPage />} />
          <Route path="appointments" element={<ManageAppointmentsPage />} />



        </Route>
      </Route>

      {/* --- Catch-all for 404 Not Found --- */}
      <Route path="*" element={<HomePage />} /> {/* Or a dedicated NotFoundPage */}

    </Routes>
  );
}

export default App;