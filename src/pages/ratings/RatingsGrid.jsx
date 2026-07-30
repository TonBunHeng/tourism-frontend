import { Star, MapPin, ThumbsUp, Check, X, Eye, Trash2 } from 'lucide-react';

export const getStatusColor = (status) => {
  const colors = {
    'Approved': 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
    'Pending': 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
    'Rejected': 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
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
          className={`${i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600'} ${starSize}`}
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
    <div className="sm:hidden divide-y divide-gray-100 dark:divide-gray-700">
      {reviews.length > 0 ? (
        reviews.map((review) => {
          const AvatarIcon = review.avatar;
          return (
            <div key={review.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center flex-shrink-0">
                  <AvatarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{review.user}</p>
                    <span className={`shrink-0 inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-full border ${getStatusColor(review.status)}`}>
                      {review.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{review.title}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 mt-0.5 min-w-0">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{review.place}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    {renderStars(review.rating)}
                    <span className="flex items-center gap-0.5 text-xs text-gray-500 dark:text-gray-400">
                      <ThumbsUp className="w-3 h-3 text-green-600 dark:text-green-400" />
                      {review.likes}
                    </span>
                    {review.verified && (
                      <span className="text-xs flex items-center gap-0.5 text-blue-600 dark:text-blue-400">
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
                          className="p-1.5 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                          title="Approve"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onStatusChange(review.id, 'Rejected')}
                          className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Reject"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => onViewDetails(review)}
                      className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(review.id)}
                      className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
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
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No reviews found</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
