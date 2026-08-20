import { useNavigate } from 'react-router-dom';
import { LogOut, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import authService from '../../services/authService';

export default function LogoutAlert({ isOpen, onClose, onLogout }) {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Prevent background scrolling when modal is open
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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md transition-opacity"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-modal-title"
    >
      <div 
        className="bg-white dark:bg-zinc-900 rounded-lg shadow-2xl max-w-md w-full mx-4 p-6 relative animate-in fade-in zoom-in duration-200 border border-gray-100 dark:border-zinc-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center animate-pulse-glow-danger">
            <LogOut size={32} className="text-red-500 dark:text-red-400 animate-alert-shake" />
          </div>
        </div>

        {/* Title */}
        <h3 id="logout-modal-title" className="text-xl font-bold text-gray-800 dark:text-zinc-100 text-center mb-2">
          Logout Confirmation
        </h3>

        {/* Message */}
        <p className="text-gray-600 dark:text-zinc-400 text-center mb-6">
          Are you sure you want to logout? You will need to login again to access your account.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoggingOut}
            className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-zinc-300 font-medium rounded-md hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex-1 px-4 py-2.5 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 focus:ring-4 focus:ring-red-500/20 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
