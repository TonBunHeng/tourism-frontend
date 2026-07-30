import { Calendar, Check, Image as ImageIcon, MapPin, ThumbsUp, ThumbsDown, Clock, X, Eye, Trash2 } from 'lucide-react';
import { getStatusColor, renderStars } from './RatingsGrid';

export default function RatingsTable({
  reviews,
  onStatusChange,
  onViewDetails,
  onDelete
}) {
  return (
    <div className="hidden sm:block overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50/50 dark:bg-gray-700/50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">#</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Review</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Place</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rating</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Likes</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
          {reviews.length > 0 ? (
            reviews.map((review, index) => {
              const AvatarIcon = review.avatar;
              return (
                <tr key={review.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-400">
                    {String(index + 1).padStart(2, '0')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center flex-shrink-0">
                        <AvatarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{review.user}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">{review.title}</p>
                        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                          <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {review.date}
                          </span>
                          {review.verified && (
                            <span className="text-xs flex items-center gap-0.5 text-blue-600 dark:text-blue-400">
                              <Check className="w-3 h-3" />
                              Verified
                            </span>
                          )}
                          {review.images && review.images.length > 0 && (
                            <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                              <ImageIcon className="w-3 h-3" /> {review.images.length} photos
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
                      {review.place}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderStars(review.rating)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        <ThumbsUp className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                        <span>{review.likes}</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <ThumbsDown className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                        <span>{review.dislikes}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(review.status)}`}>
                      <Clock className="w-3 h-3" />
                      {review.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-1">
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
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-12">
                <div className="text-6xl mb-4">⭐</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No reviews found</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
