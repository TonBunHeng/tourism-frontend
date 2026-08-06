import { X, Check, User } from 'lucide-react';
import { renderStars } from '../../utils/StatusUtils';

export default function ReviewDetailsModal({
  isOpen,
  review,
  onClose,
  onStatusChange
}) {
  if (!isOpen || !review) return null;

  const AvatarIcon = review.avatar || (typeof review.user === 'object' && review.user.avatar) || User;
  const userName = typeof review.user === 'object' ? review.user.name : review.user;
  const userVerified = typeof review.user === 'object' ? review.user.verified : review.verified;
  const placeName = typeof review.place === 'object' ? review.place.name : review.place;
  const repliesCount = Array.isArray(review.replies) ? review.replies.length : (review.replies || 0);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] rounded-xl max-w-lg w-full shadow-2xl border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] flex items-center justify-center">
              <AvatarIcon className="w-5 h-5 text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] tracking-wide">Review Details</h3>
              <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">ID: #{review.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:text-[var(--color-text-primary-light)] dark:hover:text-[var(--color-white)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">User</span>
            <p className="text-base font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mt-1 flex items-center gap-2">
              {userName}
              {userVerified && (
                <span className="text-xs px-2 py-0.5 bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] rounded-full border border-[var(--color-info-border)] dark:border-[var(--color-info-dark-border)] inline-flex items-center gap-1">
                  <Check className="w-3 h-3" /> Verified
                </span>
              )}
            </p>
            <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-0.5">{review.date}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 p-3.5 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Place</span>
              <p className="text-sm font-medium text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] mt-1 truncate">{placeName}</p>
              <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-0.5">{review.category}</p>
            </div>
            <div className="bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 p-3.5 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Rating & Status</span>
              <div className="flex items-center gap-1.5 mt-1">
                {renderStars(review.rating)}
                <span className="text-sm font-medium text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)]">({review.rating})</span>
              </div>
              <p className="text-xs text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] mt-0.5">{review.status}</p>
            </div>
          </div>

          <div className="bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 p-3.5 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Review Title</span>
            <p className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mt-1">{review.title}</p>
          </div>

          <div className="bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 p-3.5 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Comment</span>
            <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1 leading-relaxed">{review.comment}</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 p-3 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] text-center">
              <span className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Likes</span>
              <p className="text-base font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mt-0.5">{review.likes}</p>
            </div>
            <div className="bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 p-3 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] text-center">
              <span className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Dislikes</span>
              <p className="text-base font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mt-0.5">{review.dislikes || 0}</p>
            </div>
            <div className="bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 p-3 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] text-center">
              <span className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Replies</span>
              <p className="text-base font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mt-0.5">{repliesCount}</p>
            </div>
          </div>

          {review.images && review.images.length > 0 && (
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] block mb-2">Attached Images</span>
              <div className="flex gap-2 flex-wrap">
                {review.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Review image ${idx + 1}`}
                    className="w-20 h-20 rounded-md object-cover border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)]">
          {review.status === 'Pending' && (
            <button
              type="button"
              onClick={() => {
                onStatusChange(review.id, 'Approved');
                onClose();
              }}
              className="py-2.5 px-4 rounded-md bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)] hover:bg-[var(--color-success-border)] dark:hover:bg-[var(--color-success-dark-bg)]/80 text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] font-medium text-sm transition-colors flex items-center gap-2 border border-[var(--color-success-border)] dark:border-[var(--color-success-dark-border)] cursor-pointer"
            >
              <Check className="w-4 h-4" />
              Approve
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

