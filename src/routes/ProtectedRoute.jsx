import { Navigate, Outlet, useLocation } from 'react-router-dom';
import authService from '../services/authService';

export default function ProtectedRoute() {
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    // Redirect unauthenticated user to login page, preserving attempted destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
