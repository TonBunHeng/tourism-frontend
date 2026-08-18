import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/authService';

export default function PublicRoute() {
  const isAuthenticated = authService.isAuthenticated();

  if (isAuthenticated) {
    // If already logged in, redirect away from login/auth pages to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
