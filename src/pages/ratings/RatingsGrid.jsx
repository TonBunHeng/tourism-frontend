import { Star, MapPin, ThumbsUp, Check, X, Eye, Trash2 } from 'lucide-react';

export const getStatusColor = (status) => {
  const colors = {
    'Approved': 'bg-[var(--color-success-bg)] text-[var(--color-success-text)] border-[var(--color-success-border)] dark:bg-[var(--color-success-dark-bg)] dark:text-[var(--color-success-dark-text)] dark:border-[var(--color-success-dark-border)]',
    'Pending': 'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)] border-[var(--color-warning-border)] dark:bg-[var(--color-warning-dark-bg)] dark:text-[var(--color-warning-dark-text)] dark:border-[var(--color-warning-dark-border)]',
    'Rejected': 'bg-[var(--color-danger-bg)] text-[var(--color-danger-text)] border-[var(--color-danger-border)] dark:bg-[var(--color-danger-dark-bg)] dark:text-[var(--color-danger-dark-text)] dark:border-[var(--color-danger-dark-border)]'
  };
  return colors[status] || colors['Pending'];
};

export const renderStars = (rating, size = 'sm') => {
  const starSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${i < rating ? 'fill-[var(--color-warning-text)] text-[var(--color-warning-text)]' : 'text-[var(--color-border-subtle-light)] dark:text-[var(--color-border-dark)]'} ${starSize}`}
        />
      ))}
    </div>
  );
};

export default function RatingsGrid({
  reviews,
  onStatusChange,
  onViewDetails,
  onDelete
}) {
  return (
    <div className="sm:hidden divide-y divide-[var(--color-border-subtle-light)] dark:divide-[var(--color-border-dark)]">
      {reviews.length > 0 ? (
        reviews.map((review) => {
          const AvatarIcon = review.avatar;
          return (
            <div key={review.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-info-bg)] to-[var(--color-purple-badge-bg)] dark:from-[var(--color-info-dark-bg)] dark:to-[var(--color-purple-badge-dark-bg)] flex items-center justify-center flex-shrink-0">
                  <AvatarIcon className="w-5 h-5 text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] truncate">{review.user}</p>
                    <span className={`shrink-0 inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-full border ${getStatusColor(review.status)}`}>
                      {review.status}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] truncate">{review.title}</p>
                  <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] mt-0.5 min-w-0">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{review.place}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    {renderStars(review.rating)}
                    <span className="flex items-center gap-0.5 text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                      <ThumbsUp className="w-3 h-3 text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)]" />
                      {review.likes}
                    </span>
                    {review.verified && (
                      <span className="text-xs flex items-center gap-0.5 text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]">
                        <Check className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    {review.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => onStatusChange(review.id, 'Approved')}
                          className="p-1.5 text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] hover:bg-[var(--color-success-bg)] dark:hover:bg-[var(--color-success-dark-bg)] rounded-lg transition-colors"
                          title="Approve"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onStatusChange(review.id, 'Rejected')}
                          className="p-1.5 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] rounded-lg transition-colors"
                          title="Reject"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => onViewDetails(review)}
                      className="p-1.5 text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)] hover:bg-[var(--color-purple-badge-bg)] dark:hover:bg-[var(--color-purple-badge-dark-bg)] rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(review.id)}
                      className="p-1.5 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⭐</div>
          <h3 className="text-lg font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">No reviews found</h3>
          <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
