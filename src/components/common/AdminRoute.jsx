import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const AdminRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  // Check if user is logged in AND has the 'ADMIN' role
  return user && user.role === 'ADMIN' ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;