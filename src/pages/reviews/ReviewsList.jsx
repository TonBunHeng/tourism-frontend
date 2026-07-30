import {
  Check,
  Star,
  Flag,
  MapPin,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Award,
  Bot,
  Eye,
  X,
  Reply,
  Trash2,
  FileText
} from 'lucide-react';

export const getStatusColor = (status) => {
  const colors = {
    'Published': 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
    'Pending': 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
    'Flagged': 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
    'Archived': 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-700/50 dark:text-gray-400 dark:border-gray-600'
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

export default function ReviewsList({
  reviews,
  onViewDetails,
  onStatusChange,
  onOpenReplyModal,
  onDelete
}) {
  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-700">
      {reviews.length > 0 ? (
        reviews.map((review) => {
          const UserAvatar = review.user.avatar;
          return (
            <div key={review.id} className="p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center flex-shrink-0">
                  <UserAvatar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
                </div>

                {/* Review Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{review.user.name}</span>
                        {review.user.verified && (
                          <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full border border-blue-200 dark:border-blue-800 inline-flex items-center gap-1">
                            <Check className="w-3 h-3" /> Verified
                          </span>
                        )}
                        <span className="text-xs text-gray-400 dark:text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        {renderStars(review.rating)}
                        <span className="text-xs text-gray-500 dark:text-gray-400">({review.rating}.0)</span>
                        <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:inline">•</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{review.place.name}</span>
                        <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:inline">•</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {review.place.location}
                        </span>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 flex-wrap shrink-0">
                      <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(review.status)}`}>
                        {review.status}
                      </span>
                      {review.featured && (
                        <span className="px-2.5 py-0.5 text-xs font-medium rounded-full border bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> Featured
                        </span>
                      )}
                      {review.reported && (
                        <span className="px-2.5 py-0.5 text-xs font-medium rounded-full border bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800 flex items-center gap-1">
                          <Flag className="w-3 h-3" />
                          Reported
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Status badges: mobile row */}
                  <div className="flex sm:hidden items-center gap-2 flex-wrap mt-2">
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(review.status)}`}>
                      {review.status}
                    </span>
                    {review.featured && (
                      <span className="px-2.5 py-0.5 text-xs font-medium rounded-full border bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                        Featured
                      </span>
                    )}
                    {review.reported && (
                      <span className="px-2.5 py-0.5 text-xs font-medium rounded-full border bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800 flex items-center gap-1">
                        <Flag className="w-3 h-3" />
                        Reported
                      </span>
                    )}
                  </div>

                  <h4 className="font-medium text-gray-900 dark:text-white mt-2 sm:mt-1">{review.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{review.comment}</p>

                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {review.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`Review image ${idx + 1}`}
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 mt-3 flex-wrap">
                    <button className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{review.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                      <ThumbsDown className="w-3.5 h-3.5" />
                      <span>{review.dislikes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{review.replies.length} replies</span>
                    </button>
                    {review.helpful > 0 && (
                      <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" />
                        {review.helpful} found helpful
                      </span>
                    )}
                  </div>

                  {/* Replies */}
                  {review.replies.length > 0 && (
                    <div className="mt-3 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                      {review.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start gap-2 mt-2">
                          <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs flex-shrink-0">
                            <Bot className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{reply.user}</span>
                              <span className="text-xs text-gray-400 dark:text-gray-500">{reply.date}</span>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">{reply.comment}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Actions: mobile row */}
                  <div className="flex sm:hidden items-center gap-1 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <button
                      onClick={() => onViewDetails(review)}
                      className="p-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </button>
                    {review.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => onStatusChange(review.id, 'Published')}
                          className="p-1.5 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                          title="Approve"
                        >
                          <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </button>
                        <button
                          onClick={() => onStatusChange(review.id, 'Archived')}
                          className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Archive"
                        >
                          <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => onOpenReplyModal(review)}
                      className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Reply"
                    >
                      <Reply className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </button>
                    <button
                      onClick={() => onDelete(review.id)}
                      className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                </div>

                {/* Actions: desktop sidebar */}
                <div className="hidden sm:flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  <button
                    onClick={() => onViewDetails(review)}
                    className="p-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </button>
                  {review.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => onStatusChange(review.id, 'Published')}
                        className="p-1.5 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                        title="Approve"
                      >
                        <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </button>
                      <button
                        onClick={() => onStatusChange(review.id, 'Archived')}
                        className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Archive"
                      >
                        <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => onOpenReplyModal(review)}
                    className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    title="Reply"
                  >
                    <Reply className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </button>
                  <button
                    onClick={() => onDelete(review.id)}
                    className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <FileText className="w-16 h-16 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No reviews found</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
