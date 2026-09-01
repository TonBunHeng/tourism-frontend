import { useNavigate } from 'react-router-dom';
import { LogOut, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import authService from '../../services/authService';

export default function LogoutAlert({ isOpen, onClose, onLogout }) {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authService.logout();
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      if (onLogout) {
        onLogout();
      }
      setIsLoggingOut(false);
      onClose();
      navigate('/login', { replace: true });
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-alert-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-modal-title"
    >
      <div 
        className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl max-w-md w-full mx-4 p-6 relative border border-gray-100 dark:border-zinc-800 animate-alert-popup overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3.5 top-3.5 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-all cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-3.5 animate-alert-icon">
          <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center">
            <LogOut size={22} />
          </div>
        </div>

        {/* Title */}
        <h3 id="logout-modal-title" className="text-base sm:text-lg font-bold text-gray-900 dark:text-zinc-100 text-center mb-2 tracking-tight">
          Confirm Sign Out
        </h3>

        {/* Message */}
        <p className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400 text-center mb-6 leading-relaxed">
          Are you sure you want to log out? Your current administrative session will be terminated.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoggingOut}
            className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 text-xs sm:text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg active:scale-[0.98] transition-all shadow-sm cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5 text-xs sm:text-sm"
          >
            {isLoggingOut ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
