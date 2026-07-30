import { X, Check, Trash2 } from 'lucide-react';
import { renderStars } from './RatingsGrid';

export default function ReviewDetailsModal({
  isOpen,
  review,
  onClose,
  onStatusChange,
  onDelete
}) {
  if (!isOpen || !review) return null;

  const AvatarIcon = review.avatar;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[#111827] text-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
              <AvatarIcon className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">Review Details</h3>
              <p className="text-xs text-gray-400">ID: #{review.id}</p>
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
            <p className="text-base font-semibold text-white mt-1 flex items-center gap-2">
              {review.user}
              {review.verified && (
                <span className="text-xs px-2 py-0.5 bg-blue-900/30 text-blue-400 rounded-full border border-blue-800 inline-flex items-center gap-1">
                  <Check className="w-3 h-3" /> Verified
                </span>
              )}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{review.date}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Place</span>
              <p className="text-sm font-medium text-blue-400 mt-1 truncate">{review.place}</p>
              <p className="text-xs text-gray-400 mt-0.5">{review.category}</p>
            </div>
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Rating & Status</span>
              <div className="flex items-center gap-1.5 mt-1">
                {renderStars(review.rating)}
                <span className="text-sm font-medium text-amber-400">({review.rating})</span>
              </div>
              <p className="text-xs text-green-400 mt-0.5">{review.status}</p>
            </div>
          </div>

          <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Review Title</span>
            <p className="text-sm font-semibold text-white mt-1">{review.title}</p>
          </div>

          <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Comment</span>
            <p className="text-sm text-gray-300 mt-1 leading-relaxed">{review.comment}</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#1f2937]/50 p-3 rounded-2xl border border-gray-800 text-center">
              <span className="text-xs text-gray-400">Likes</span>
              <p className="text-base font-bold text-white mt-0.5">{review.likes}</p>
            </div>
            <div className="bg-[#1f2937]/50 p-3 rounded-2xl border border-gray-800 text-center">
              <span className="text-xs text-gray-400">Dislikes</span>
              <p className="text-base font-bold text-white mt-0.5">{review.dislikes}</p>
            </div>
            <div className="bg-[#1f2937]/50 p-3 rounded-2xl border border-gray-800 text-center">
              <span className="text-xs text-gray-400">Replies</span>
              <p className="text-base font-bold text-white mt-0.5">{review.replies}</p>
            </div>
          </div>

          {review.images && review.images.length > 0 && (
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-2">Attached Images</span>
              <div className="flex gap-2 flex-wrap">
                {review.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Review image ${idx + 1}`}
                    className="w-20 h-20 rounded-xl object-cover border border-gray-800"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-800 bg-[#111827]">
          {review.status === 'Pending' && (
            <button
              type="button"
              onClick={() => {
                onStatusChange(review.id, 'Approved');
                onClose();
              }}
              className="py-2.5 px-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-medium text-sm transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Approve
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              const revId = review.id;
              onClose();
              onDelete(revId);
            }}
            className="py-2.5 px-4 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 font-medium text-sm transition-colors flex items-center gap-2 border border-red-800/50"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
