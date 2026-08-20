import React from 'react';
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  Check,
  X,
  Eye,
  Clock,
  Calendar,
  Image as ImageIcon,
  MapPin,
  User,
  Reply,
  Trash2,
  MessageSquare
} from 'lucide-react';
import { getStatusColor, renderStars } from '../../utils/StatusUtils';

export default function RatingsTable({
  reviews = [],
  isLoading = false,
  onStatusChange,
  onViewDetails,
  onView,
  onReply,
  onDelete,
  startIndex = 0
}) {
  const handleView = (review) => {
    if (onView) onView(review);
    else if (onViewDetails) onViewDetails(review);
  };

  const safeReviews = reviews || [];

  if (isLoading) {
    return (
      <div className="p-12 text-center text-slate-500 dark:text-zinc-400 font-medium">
        Loading ratings and reviews...
      </div>
    );
  }

  return (
    <>
      {/* Mobile Card List View (sm:hidden) */}
      <div className="sm:hidden divide-y divide-[var(--color-border-subtle-light)] dark:divide-[var(--color-border-dark)]">
        {safeReviews.length > 0 ? (
          safeReviews.map((review) => {
            const avatarUrl = typeof review.avatar === 'string' && review.avatar.length > 0
              ? review.avatar
              : (typeof review.user === 'object' && typeof review.user?.avatar === 'string' ? review.user.avatar : null);
            const userName = typeof review.user === 'object' ? (review.user?.name || review.user_name || 'Traveler') : (review.user_name || review.user || 'Traveler');
            const userVerified = typeof review.user === 'object' ? review.user?.verified : review.is_verified;
            const placeName = typeof review.place === 'object' ? (review.place?.name || review.place_name || 'Attraction') : (review.place_name || review.place || 'Attraction');
            const reviewDate = review.created_at ? new Date(review.created_at).toLocaleDateString() : (review.date || 'Recent');

            return (
              <div key={review.id} className="p-4 flex flex-col gap-3 hover:bg-[var(--color-surface-hover-light)]/50 dark:hover:bg-[var(--color-surface-hover-dark)]/30 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] overflow-hidden flex items-center justify-center shrink-0 border border-gray-100 dark:border-zinc-800">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt={userName} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-5 h-5 text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] truncate">{userName}</p>
                        {userVerified && (
                          <span className="text-[10px] flex items-center gap-0.5 text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] px-1.5 py-0.5 rounded-full font-semibold">
                            <Check className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                        <span className="truncate">{placeName}</span>
                      </p>
                    </div>
                  </div>

                  <span className={`shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full border ${getStatusColor(review.status)}`}>
                    <Clock className="w-3 h-3" />
                    {review.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                    <span className="text-xs font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] ml-1">
                      {Number(review.rating || 0).toFixed(1)}
                    </span>
                  </div>
                  <span className="text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]">
                    • {reviewDate}
                  </span>
                </div>

                <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] line-clamp-2 leading-relaxed">
                  {review.comment || review.title || 'No comment provided.'}
                </p>

                <div className="flex items-center justify-between gap-2 pt-1 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
                  <div className="flex items-center gap-3 text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                    <span className="flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
                      <ThumbsUp className="w-3.5 h-3.5" /> {review.likes || 0}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-rose-500">
                      <ThumbsDown className="w-3.5 h-3.5" /> {review.dislikes || 0}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {review.status === 'Pending' && onStatusChange && (
                      <>
                        <button
                          type="button"
                          onClick={() => onStatusChange(review.id, 'Approved')}
                          className="p-1.5 text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] hover:bg-[var(--color-success-bg)] dark:hover:bg-[var(--color-success-dark-bg)] rounded-lg transition-colors cursor-pointer"
                          title="Approve Review"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onStatusChange(review.id, 'Rejected')}
                          className="p-1.5 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] rounded-lg transition-colors cursor-pointer"
                          title="Reject Review"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    {onReply && (
                      <button
                        type="button"
                        onClick={() => onReply(review)}
                        className="p-1.5 text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] hover:bg-[var(--color-info-bg)] dark:hover:bg-[var(--color-info-dark-bg)] rounded-lg transition-colors cursor-pointer"
                        title="Reply"
                      >
                        <Reply className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleView(review)}
                      className="p-1.5 text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)] hover:bg-[var(--color-purple-badge-bg)] dark:hover:bg-[var(--color-purple-badge-dark-bg)] rounded-lg transition-colors cursor-pointer"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {onDelete && (
                      <button
                        type="button"
                        onClick={() => onDelete(review.id)}
                        className="p-1.5 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] rounded-lg transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-16 px-4">
            <div className="w-16 h-16 rounded-full bg-[var(--color-warning-bg)] dark:bg-[var(--color-warning-dark-bg)] flex items-center justify-center text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)] mb-4">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="text-base md:text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">
              No reviews found
            </h3>
            <p className="text-xs md:text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] max-w-sm">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>

      {/* Desktop Table View (hidden sm:block) */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full divide-y divide-[var(--color-border-subtle-light)] dark:divide-[var(--color-border-dark)]">
          <thead className="bg-[var(--color-surface-hover-light)]/50 dark:bg-[var(--color-surface-hover-dark)]/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">
                Review & User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">
                Place
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">
                Engagement
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] divide-y divide-[var(--color-border-subtle-light)] dark:divide-[var(--color-border-dark)]">
            {safeReviews.length > 0 ? (
              safeReviews.map((review, index) => {
                const avatarUrl = typeof review.avatar === 'string' && review.avatar.length > 0
                  ? review.avatar
                  : (typeof review.user === 'object' && typeof review.user?.avatar === 'string' ? review.user.avatar : null);
                const userName = typeof review.user === 'object' ? (review.user?.name || review.user_name || 'Traveler') : (review.user_name || review.user || 'Traveler');
                const userVerified = typeof review.user === 'object' ? review.user?.verified : review.is_verified;
                const placeName = typeof review.place === 'object' ? (review.place?.name || review.place_name || 'Attraction') : (review.place_name || review.place || 'Attraction');
                const reviewDate = review.created_at ? new Date(review.created_at).toLocaleDateString() : (review.date || 'Recent');

                return (
                  <tr key={review.id} className="hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)]/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-mono">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-6 py-4 min-w-[260px]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] overflow-hidden flex items-center justify-center shrink-0 border border-gray-100 dark:border-zinc-800">
                          {avatarUrl ? (
                            <img src={avatarUrl} alt={userName} className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-5 h-5 text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] truncate">{userName}</p>
                            {userVerified && (
                              <span className="text-[10px] flex items-center gap-0.5 text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] px-1.5 py-0.5 rounded-full font-semibold">
                                <Check className="w-2.5 h-2.5" />
                                Verified
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] line-clamp-1 mt-0.5">{review.title || review.comment}</p>
                          <div className="flex items-center gap-2 mt-1 text-[11px] text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {reviewDate}
                            </span>
                            {review.images && review.images.length > 0 && (
                              <span className="flex items-center gap-1 text-[var(--color-primary)] font-medium">
                                <ImageIcon className="w-3 h-3" /> {review.images.length} photos
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                      <div className="flex items-center gap-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span className="truncate max-w-[160px]">{placeName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                        <span className="text-xs font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] ml-1">
                          {Number(review.rating || 0).toFixed(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          {review.likes || 0}
                        </span>
                        <span className="flex items-center gap-1 font-medium text-rose-500">
                          <ThumbsDown className="w-3.5 h-3.5" />
                          {review.dislikes || 0}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(review.status)}`}>
                        <Clock className="w-3 h-3" />
                        {review.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex items-center justify-end gap-1">
                        {review.status === 'Pending' && onStatusChange && (
                          <>
                            <button
                              type="button"
                              onClick={() => onStatusChange(review.id, 'Approved')}
                              className="p-1.5 text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] hover:bg-[var(--color-success-bg)] dark:hover:bg-[var(--color-success-dark-bg)] rounded-lg transition-colors cursor-pointer"
                              title="Approve Review"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onStatusChange(review.id, 'Rejected')}
                              className="p-1.5 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] rounded-lg transition-colors cursor-pointer"
                              title="Reject Review"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {onReply && (
                          <button
                            type="button"
                            onClick={() => onReply(review)}
                            className="p-1.5 text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] hover:bg-[var(--color-info-bg)] dark:hover:bg-[var(--color-info-dark-bg)] rounded-lg transition-colors cursor-pointer"
                            title="Reply to Review"
                          >
                            <Reply className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleView(review)}
                          className="p-1.5 text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)] hover:bg-[var(--color-purple-badge-bg)] dark:hover:bg-[var(--color-purple-badge-dark-bg)] rounded-lg transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {onDelete && (
                          <button
                            type="button"
                            onClick={() => onDelete(review.id)}
                            className="p-1.5 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] rounded-lg transition-colors cursor-pointer"
                            title="Delete Review"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-16">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[var(--color-warning-bg)] dark:bg-[var(--color-warning-dark-bg)] flex items-center justify-center text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)] mb-4">
                      <MessageSquare className="w-8 h-8" />
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">
                      No reviews found
                    </h3>
                    <p className="text-xs md:text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] max-w-sm">
                      Try adjusting your search or filter criteria.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
