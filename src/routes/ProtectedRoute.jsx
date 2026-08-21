import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import authService from '../services/authService';

export default function ProtectedRoute() {
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(() => authService.isAuthenticated());

  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      const token = authService.getToken();
      if (!token) {
        if (isMounted) {
          setIsAuthorized(false);
          setIsVerifying(false);
        }
        return;
      }

      // If we already have stored admin credentials, allow rendering immediately while verifying with backend
      try {
        const res = await authService.me();
        if (isMounted) {
          if (res.success && authService.hasAdminRole()) {
            setIsAuthorized(true);
          } else {
            authService.clearSession();
            setIsAuthorized(false);
          }
        }
      } catch (err) {
        if (isMounted) {
          authService.clearSession();
          setIsAuthorized(false);
        }
      } finally {
        if (isMounted) {
          setIsVerifying(false);
        }
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  // Initial check: if there is no token at all, redirect to /login immediately
  if (!authService.getToken()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isVerifying && !isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#09090b]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#003E83] border-t-transparent dark:border-blue-500 dark:border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">Verifying session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
