
import { Navigate, Outlet } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';

const ProtectedRoute = () => {
  const { isAdmin } = useAdmin();
  

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
