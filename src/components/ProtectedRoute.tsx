
import { Navigate, Outlet } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';

const ProtectedRoute = () => {
  const { isAdmin } = useAdmin();
  
  console.log('ProtectedRoute check:', { isAdmin });

  if (!isAdmin) {
    console.log('Not admin, redirecting to login');
    return <Navigate to="/admin/login" replace />;
  }

  console.log('Is admin, rendering outlet');
  return <Outlet />;
};

export default ProtectedRoute;
