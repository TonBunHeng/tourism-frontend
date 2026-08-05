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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] rounded-3xl max-w-md w-full shadow-2xl border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
          <h3 className="text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] tracking-wide">Confirm {confirmType}</h3>
          <button 
            onClick={onClose}
            className="p-1 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:text-[var(--color-text-primary-light)] dark:hover:text-[var(--color-white)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
            Are you sure you want to <strong className="text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{confirmAction}</strong> this {confirmType.toLowerCase()} request for <strong className="text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{request.user.name}</strong>?
          </p>
          {confirmAction === 'approve' && (
            <div className="p-3 bg-[var(--color-danger-bg)] dark:bg-[var(--color-danger-dark-bg)] border border-[var(--color-danger-border)] dark:border-[var(--color-danger-dark-border)] rounded-md text-xs text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>This action will permanently execute the deletion. This cannot be undone.</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 px-6 py-4 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)]">
          <button 
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] font-medium text-sm transition-colors text-center"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className={`flex-1 py-3 px-4 rounded-md text-[var(--color-white)] font-medium text-sm transition-colors shadow-lg text-center flex items-center justify-center gap-2 cursor-pointer ${
              confirmAction === 'approve'
                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-green-500/25'
                : 'bg-[var(--color-danger-text)] hover:opacity-90 shadow-red-500/25'
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
