import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import authService from '../services/authService';
import Forbidden from '../pages/error/Forbidden';

/**
 * ProtectedRoute Guard
 * 
 * Enforces frontend authentication and role-based access.
 * If unauthenticated: redirects to /login with return location state.
 * If authenticated but lacks role permission: renders 403 Forbidden page.
 * 
 * Note: Frontend guards ensure UI navigation security. Real authorization
 * must always be enforced independently on the backend API.
 */
export default function ProtectedRoute({ allowedRoles = ['Super Admin', 'Admin', 'Guide / Editor'] }) {
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(true);
  const [authStatus, setAuthStatus] = useState({
    isAuthenticated: false,
    isAllowedRole: false,
  });

  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      const token = authService.getToken();
      if (!token) {
        if (isMounted) {
          setAuthStatus({ isAuthenticated: false, isAllowedRole: false });
          setIsVerifying(false);
        }
        return;
      }

      // Check current cached user first for quick responsiveness
      const currentUser = authService.getCurrentUser();
      if (currentUser?.role) {
        const isAllowed = allowedRoles.includes(currentUser.role);
        if (isMounted) {
          setAuthStatus({
            isAuthenticated: true,
            isAllowedRole: isAllowed,
          });
        }
      }

      try {
        // Authoritative server-side verification with backend
        const res = await authService.me();
        if (isMounted) {
          const user = res?.data?.user || res?.data;
          if (res?.success && user) {
            const isAllowed = allowedRoles.includes(user.role);
            setAuthStatus({
              isAuthenticated: true,
              isAllowedRole: isAllowed,
            });
          } else {
            authService.clearSession();
            setAuthStatus({ isAuthenticated: false, isAllowedRole: false });
          }
        }
      } catch (err) {
        if (isMounted) {
          // If server rejects token as invalid (401), session is cleared
          if (!authService.getToken()) {
            setAuthStatus({ isAuthenticated: false, isAllowedRole: false });
          }
        }
      } finally {
        if (isMounted) {
          setIsVerifying(false);
        }
      }
    };

    verifyAuth();

    const handleStorageChange = () => {
      if (!authService.getToken()) {
        setAuthStatus({ isAuthenticated: false, isAllowedRole: false });
        setIsVerifying(false);
      } else {
        const u = authService.getCurrentUser();
        if (u) {
          setAuthStatus({
            isAuthenticated: true,
            isAllowedRole: allowedRoles.includes(u.role),
          });
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('user-profile-updated', handleStorageChange);

    return () => {
      isMounted = false;
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('user-profile-updated', handleStorageChange);
    };
  }, [location.pathname, allowedRoles]);

  // Initial check: if no token exists, redirect to /login immediately
  if (!authService.getToken()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Simple, clean verification screen while validating session
  if (isVerifying && !authStatus.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-2.5">
          <div className="w-7 h-7 border-2 border-[#003E83] border-t-transparent dark:border-blue-500 dark:border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-medium text-gray-500 dark:text-zinc-400">Verifying session...</p>
        </div>
      </div>
    );
  }

  // Not authenticated -> redirect to login
  if (!authStatus.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authenticated, but unauthorized for this specific role -> render 403 Forbidden
  if (!authStatus.isAllowedRole) {
    return <Forbidden />;
  }

  return <Outlet />;
}
