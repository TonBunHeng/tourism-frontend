import { ShieldAlert, ArrowLeft, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

export default function Forbidden() {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const role = currentUser?.role || 'Unknown Role';

  const handleLogout = async () => {
    try {
      await authService.logout();
    } finally {
      authService.clearSession();
      navigate('/login', { replace: true });
    }
  };

  const handleBackToDashboard = () => {
    // If the user has any admin privileges, navigate to /dashboard
    if (authService.hasAdminRole()) {
      navigate('/dashboard', { replace: true });
    } else {
      handleLogout();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-6 sm:p-8 text-center shadow-sm">
        {/* Simple static icon badge */}
        <div className="w-14 h-14 mx-auto rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center mb-4">
          <ShieldAlert size={28} />
        </div>

        <span className="inline-block px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/60 rounded mb-2">
          403 Forbidden
        </span>

        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-zinc-100 mb-2">
          Access Denied
        </h1>

        <p className="text-sm text-gray-600 dark:text-zinc-400 mb-4 leading-relaxed">
          Your account role <span className="font-semibold text-gray-800 dark:text-zinc-200">({role})</span> does not have sufficient administrative privileges to access this area.
        </p>

        <div className="bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-800 rounded-md p-3 text-xs text-gray-500 dark:text-zinc-400 mb-6 text-left">
          <p className="font-medium text-gray-700 dark:text-zinc-300 mb-0.5">Authorization Notice:</p>
          <p>If you believe this is an error, contact your Super Administrator to upgrade your account permissions.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5">
          {authService.hasAdminRole() && (
            <button
              type="button"
              onClick={handleBackToDashboard}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#003E83] hover:bg-[#002e62] text-white text-sm font-medium rounded-md transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span>Back to Dashboard</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleLogout}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 border border-gray-300 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-200 text-sm font-medium rounded-md transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
