import { useNavigate } from 'react-router-dom';
import { LogOut, X } from 'lucide-react';
import { useEffect } from 'react';

export default function LogoutAlert({ isOpen, onClose, onLogout }) {
  const navigate = useNavigate();

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

  const handleLogout = () => {
    // Perform logout actions
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
    
    // Call the onLogout callback if provided
    if (onLogout) {
      onLogout();
    }
    
    // Redirect to login page
    navigate('/login');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity"
      onClick={onClose} // Close when clicking the backdrop
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-modal-title"
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 relative animate-in fade-in zoom-in duration-200 border border-gray-100 dark:border-gray-700"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center">
            <LogOut size={32} className="text-red-500 dark:text-red-400" />
          </div>
        </div>

        {/* Title */}
        <h3 id="logout-modal-title" className="text-xl font-bold text-gray-800 dark:text-white text-center mb-2">
          Logout Confirmation
        </h3>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
          Are you sure you want to logout? You will need to login again to access your account.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 px-4 py-2.5 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 focus:ring-4 focus:ring-red-500/20 transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}