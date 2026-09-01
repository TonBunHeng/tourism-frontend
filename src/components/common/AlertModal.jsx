import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  CheckCircle2, 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  Trash2, 
  X 
} from 'lucide-react';

export default function AlertModal({
  isOpen,
  type = 'info', // 'success', 'danger', 'warning', 'info', 'error', 'delete'
  title,
  message,
  confirmText,
  cancelText = 'Cancel',
  isConfirm = false,
  onConfirm,
  onClose,
  customIcon = null
}) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose?.();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    onClose?.();
  };

  // Static, clean icon presentation without distracting animations
  const renderIcon = () => {
    if (customIcon) return customIcon;

    switch (type) {
      case 'success':
        return (
          <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 size={26} />
          </div>
        );
      case 'danger':
      case 'delete':
        return (
          <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center">
            <Trash2 size={24} />
          </div>
        );
      case 'error':
        return (
          <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center">
            <AlertCircle size={26} />
          </div>
        );
      case 'warning':
        return (
          <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <AlertTriangle size={26} />
          </div>
        );
      case 'info':
      default:
        return (
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Info size={26} />
          </div>
        );
    }
  };

  const defaultConfirmText = isConfirm 
    ? (type === 'danger' || type === 'delete' ? 'Delete' : 'Confirm')
    : 'OK';

  const finalConfirmText = confirmText || defaultConfirmText;

  const getConfirmButtonClass = () => {
    if (type === 'danger' || type === 'delete' || type === 'error') {
      return 'bg-red-600 hover:bg-red-700 text-white';
    }
    if (type === 'success') {
      return 'bg-emerald-600 hover:bg-emerald-700 text-white';
    }
    if (type === 'warning') {
      return 'bg-amber-600 hover:bg-amber-700 text-white';
    }
    return 'bg-[#003E83] hover:bg-[#002e62] text-white';
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-alert-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="alert-modal-title"
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
          {renderIcon()}
        </div>

        {/* Title */}
        {title && (
          <h3 id="alert-modal-title" className="text-base sm:text-lg font-bold text-gray-900 dark:text-zinc-100 text-center mb-2 tracking-tight">
            {title}
          </h3>
        )}

        {/* Message */}
        {message && (
          <p className="text-gray-600 dark:text-zinc-400 text-center mb-6 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
            {message}
          </p>
        )}

        {/* Buttons */}
        {isConfirm ? (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 active:scale-[0.98] transition-all cursor-pointer text-xs sm:text-sm"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className={`flex-1 px-4 py-2.5 font-semibold rounded-lg active:scale-[0.98] transition-all shadow-sm cursor-pointer text-xs sm:text-sm ${getConfirmButtonClass()}`}
            >
              {finalConfirmText}
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleConfirm}
              className={`w-full px-4 py-2.5 font-semibold rounded-lg active:scale-[0.98] transition-all shadow-sm cursor-pointer text-xs sm:text-sm ${getConfirmButtonClass()}`}
            >
              {finalConfirmText}
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
