import { X, Send } from 'lucide-react';

export default function ReviewReplyModal({
  isOpen,
  review,
  onClose,
  replyText,
  onReplyTextChange,
  onSendReply
}) {
  if (!isOpen || !review) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[#111827] text-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <h3 className="text-lg font-bold text-white tracking-wide">Reply to Review</h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="p-3.5 bg-[#1f2937]/50 rounded-2xl border border-gray-800">
            <p className="text-xs text-gray-400 mb-1">Review by {review.user.name}</p>
            <p className="text-sm text-gray-300 line-clamp-2">{review.comment}</p>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Your Reply</label>
            <textarea
              value={replyText}
              onChange={(e) => onReplyTextChange(e.target.value)}
              placeholder="Write your response as Admin..."
              rows="4"
              className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-800 bg-[#111827]">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 font-medium text-sm transition-colors text-center"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSendReply(review.id)}
            className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors shadow-lg shadow-blue-500/25 text-center flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send Reply
          </button>
        </div>
      </div>
    </div>
  );
}
