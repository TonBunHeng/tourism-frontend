import { Star, ThumbsUp, MessageSquare, ThumbsDown } from 'lucide-react';

export default function RatingsSentiment({ reviews, ratingDistribution }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6 sm:mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6 lg:col-span-2">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Rating Distribution</h3>
        <div className="space-y-3">
          {ratingDistribution.map((item) => (
            <div key={item.rating} className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1 w-10 sm:w-16 shrink-0">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.rating}</span>
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${reviews.length > 0 ? (item.count / reviews.length) * 100 : 0}%`
                  }}
                />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 w-8 sm:w-12 text-right shrink-0">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Overall Sentiment</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-700 dark:text-green-400">Positive</span>
            </div>
            <span className="text-sm font-bold text-green-700 dark:text-green-400">
              {reviews.length > 0 ? Math.round((reviews.filter(r => r.rating >= 4).length / reviews.length) * 100) : 0}%
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span className="text-sm font-medium text-amber-700 dark:text-amber-400">Neutral</span>
            </div>
            <span className="text-sm font-bold text-amber-700 dark:text-amber-400">
              {reviews.length > 0 ? Math.round((reviews.filter(r => r.rating === 3).length / reviews.length) * 100) : 0}%
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <div className="flex items-center gap-2">
              <ThumbsDown className="w-5 h-5 text-red-600 dark:text-red-400" />
              <span className="text-sm font-medium text-red-700 dark:text-red-400">Negative</span>
            </div>
            <span className="text-sm font-bold text-red-700 dark:text-red-400">
              {reviews.length > 0 ? Math.round((reviews.filter(r => r.rating <= 2).length / reviews.length) * 100) : 0}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
