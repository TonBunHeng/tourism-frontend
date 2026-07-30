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
      <div className="bg-[#111827] text-white rounded-3xl max-w-md w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <h3 className="text-lg font-bold text-white tracking-wide">Confirm {confirmType}</h3>
          <button 
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-300">
            Are you sure you want to <strong className="text-white">{confirmAction}</strong> this {confirmType.toLowerCase()} request for <strong className="text-white">{request.user.name}</strong>?
          </p>
          {confirmAction === 'approve' && (
            <div className="p-3 bg-red-900/20 border border-red-800/50 rounded-xl text-xs text-red-400 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>This action will permanently execute the deletion. This cannot be undone.</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-800 bg-[#111827]">
          <button 
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 font-medium text-sm transition-colors text-center"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className={`flex-1 py-3 px-4 rounded-xl text-white font-medium text-sm transition-colors shadow-lg text-center flex items-center justify-center gap-2 ${
              confirmAction === 'approve'
                ? 'bg-green-600 hover:bg-green-500 shadow-green-500/25'
                : 'bg-red-600 hover:bg-red-500 shadow-red-500/25'
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
