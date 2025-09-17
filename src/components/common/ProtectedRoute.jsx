import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  // 1. If the user is NOT logged in, redirect them to the login page.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. If the user IS logged in but IS an ADMIN, redirect them to the admin dashboard.
  if (user.role === 'ADMIN') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // 3. If the user is logged in and IS NOT an admin (i.e., a BUYER), allow access.
  return <Outlet />;
};

export default ProtectedRoute;