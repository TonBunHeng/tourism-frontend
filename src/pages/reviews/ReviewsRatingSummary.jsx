export default function ReviewsRatingSummary({ reviews, renderStars }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
      {[5, 4, 3, 2].map(rating => {
        const count = reviews.filter(r => r.rating === rating).length;
        return (
          <div key={rating} className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md p-3 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              {renderStars(rating)}
            </div>
            <span className="text-sm font-semibold text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">{count}</span>
          </div>
        );
      })}
    </div>
  );
}
