import { Star, ThumbsUp, ThumbsDown, Check, X, Eye, Clock, Calendar, Image as ImageIcon, MapPin, User } from 'lucide-react';
import { getStatusColor, renderStars } from '../../utils/StatusUtils';

export default function RatingsGrid({
  reviews,
  onStatusChange,
  onViewDetails
}) {
  return (
    <div className="sm:hidden divide-y divide-[var(--color-border-subtle-light)] dark:divide-[var(--color-border-dark)]">
      {reviews.length > 0 ? (
        reviews.map((review) => {
          const avatarUrl = typeof review.avatar === 'string' && review.avatar.length > 0
            ? review.avatar
            : (typeof review.user === 'object' && typeof review.user?.avatar === 'string' ? review.user.avatar : null);
          const userName = typeof review.user === 'object' ? (review.user?.name || review.user_name || 'Traveler') : (review.user_name || review.user || 'Traveler');
          const userVerified = typeof review.user === 'object' ? review.user?.verified : review.is_verified;
          const placeName = typeof review.place === 'object' ? (review.place?.name || review.place_name || 'Attraction') : (review.place_name || review.place || 'Attraction');

          return (
            <div key={review.id} className="p-4 space-y-3">
              {/* Header: User & Status */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-md bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] overflow-hidden flex items-center justify-center flex-shrink-0 border border-gray-100 dark:border-zinc-800">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt={userName} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-5 h-5 text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] truncate">{userName}</p>
                    <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {review.date}
                      </span>
                      {userVerified && (
                        <span className="flex items-center gap-0.5 text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]">
                          <Check className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full border flex-shrink-0 ${getStatusColor(review.status)}`}>
                  <Clock className="w-3 h-3" />
                  {review.status}
                </span>
              </div>

              {/* Place & Rating */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-1 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]" />
                  <span className="truncate">{placeName}</span>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {renderStars(review.rating)}
                </div>
              </div>

              {/* Review Content */}
              <div>
                <p className="text-sm font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{review.title}</p>
                <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] line-clamp-2 mt-0.5">{review.comment}</p>
              </div>

              {/* Actions & Likes */}
              <div className="flex items-center justify-between pt-1 text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-3.5 h-3.5 text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)]" />
                    <span>{review.likes || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsDown className="w-3.5 h-3.5 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)]" />
                    <span>{review.dislikes || 0}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {review.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => onStatusChange(review.id, 'Approved')}
                        className="p-1.5 text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] hover:bg-[var(--color-success-bg)] dark:hover:bg-[var(--color-success-dark-bg)] rounded-lg transition-colors cursor-pointer"
                        title="Approve"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onStatusChange(review.id, 'Rejected')}
                        className="p-1.5 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] rounded-lg transition-colors cursor-pointer"
                        title="Reject"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => onViewDetails(review)}
                    className="p-1.5 text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)] hover:bg-[var(--color-purple-badge-bg)] dark:hover:bg-[var(--color-purple-badge-dark-bg)] rounded-lg transition-colors cursor-pointer"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">No reviews found</h3>
          <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
