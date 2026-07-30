import { User, X, Trash2, Check } from 'lucide-react';
import { getTypeLabel } from './DeletionList';

export default function DeletionDetailsModal({
  isOpen,
  request,
  adminNotes,
  onAdminNotesChange,
  onClose,
  onApprove,
  onReject
}) {
  if (!isOpen || !request) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[#111827] text-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 flex items-center justify-center">
              <User className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">Request Details</h3>
              <p className="text-xs text-gray-400">ID: #{request.id}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">User</span>
            <p className="text-base font-semibold text-white mt-1">{request.user.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{request.user.email} • {request.user.phone}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Request Type</span>
              <p className="text-sm font-medium text-red-400 mt-1">{getTypeLabel(request.type)}</p>
            </div>
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Status & Urgency</span>
              <p className="text-sm font-medium text-white mt-1 capitalize">{request.status} • <span className="uppercase text-orange-400">{request.urgency}</span></p>
            </div>
          </div>

          <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Reason</span>
            <p className="text-sm text-gray-300 mt-1 leading-relaxed">{request.reason}</p>
          </div>

          {request.additionalInfo && (
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Additional Information</span>
              <p className="text-sm text-gray-300 mt-1 leading-relaxed">{request.additionalInfo}</p>
            </div>
          )}

          {request.itemsToDelete && request.itemsToDelete.length > 0 && (
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-2">Items to Delete</span>
              <div className="space-y-2">
                {request.itemsToDelete.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-2 p-3 bg-[#1f2937]/50 rounded-xl border border-gray-800">
                    <div className="flex items-center gap-2 min-w-0">
                      <Trash2 className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.type} • {item.category}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5 block">Admin Notes</span>
            <textarea
              value={adminNotes}
              onChange={(e) => onAdminNotesChange(e.target.value)}
              placeholder="Add admin notes..."
              rows="3"
              className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none transition-all"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-800 bg-[#111827]">
          {request.status === 'pending' ? (
            <>
              <button
                type="button"
                onClick={() => onApprove(request)}
                className="py-2.5 px-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-medium text-sm transition-colors flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Approve
              </button>
              <button
                type="button"
                onClick={() => onReject(request)}
                className="py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium text-sm transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Reject
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-medium text-sm transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
