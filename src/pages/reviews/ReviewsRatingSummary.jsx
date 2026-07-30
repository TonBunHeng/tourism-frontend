export default function ReviewsRatingSummary({ reviews, renderStars }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
      {[5, 4, 3, 2].map(rating => {
        const count = reviews.filter(r => r.rating === rating).length;
        return (
          <div key={rating} className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-100 dark:border-gray-700 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              {renderStars(rating)}
            </div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{count}</span>
          </div>
        );
      })}
    </div>
  );
}
