import { X, AlertTriangle, Check } from 'lucide-react';

export default function DeletionConfirmModal({
  isOpen,
  request,
  confirmAction,
  confirmType,
  onClose,
  onConfirm
}) {
  if (!isOpen || !request) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-opacity duration-150">
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] rounded-lg max-w-md w-full shadow-lg border border-gray-200 dark:border-zinc-800 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-zinc-800">
          <h3 className="text-base font-bold text-gray-900 dark:text-zinc-100">Confirm {confirmType}</h3>
          <button 
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300 rounded transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-600 dark:text-zinc-300">
            Are you sure you want to <strong className="text-gray-900 dark:text-white">{confirmAction}</strong> this {confirmType.toLowerCase()} request for <strong className="text-gray-900 dark:text-white">{request.user.name}</strong>?
          </p>
          {confirmAction === 'approve' && (
            <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 rounded-md text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>This action will permanently execute the deletion. This cannot be undone.</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2.5 px-6 py-4 border-t border-gray-200 dark:border-zinc-800 bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)]">
          <button 
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-md border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 font-medium text-sm transition-colors text-center cursor-pointer"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className={`flex-1 py-2.5 px-4 rounded-md text-white font-medium text-sm transition-colors text-center flex items-center justify-center gap-2 cursor-pointer ${
              confirmAction === 'approve'
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {confirmAction === 'approve' ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
            Confirm {confirmAction === 'approve' ? 'Approve' : 'Reject'}
          </button>
        </div>
      </div>
    </div>
  );
}
