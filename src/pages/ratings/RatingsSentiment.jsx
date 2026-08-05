import { Star, ThumbsUp, MessageSquare, ThumbsDown } from 'lucide-react';

export default function RatingsSentiment({ reviews, ratingDistribution }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6 sm:mb-8">
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-4 sm:p-6 lg:col-span-2">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-4">Rating Distribution</h3>
        <div className="space-y-3">
          {ratingDistribution.map((item) => (
            <div key={item.rating} className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1 w-10 sm:w-16 shrink-0">
                <span className="text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">{item.rating}</span>
                <Star className="w-4 h-4 fill-[var(--color-warning-text)] text-[var(--color-warning-text)]" />
              </div>
              <div className="flex-1 h-2 bg-[var(--color-neutral-badge-bg)] dark:bg-[var(--color-surface-hover-dark)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[var(--color-warning-dark-text)] to-[var(--color-warning-text)] rounded-full transition-all duration-500"
                  style={{
                    width: `${reviews.length > 0 ? (item.count / reviews.length) * 100 : 0}%`
                  }}
                />
              </div>
              <span className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] w-8 sm:w-12 text-right shrink-0">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-4 sm:p-6">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-4">Overall Sentiment</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)] rounded-md">
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-5 h-5 text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)]" />
              <span className="text-sm font-medium text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)]">Positive</span>
            </div>
            <span className="text-sm font-bold text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)]">
              {reviews.length > 0 ? Math.round((reviews.filter(r => r.rating >= 4).length / reviews.length) * 100) : 0}%
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-[var(--color-warning-bg)] dark:bg-[var(--color-warning-dark-bg)] rounded-md">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)]" />
              <span className="text-sm font-medium text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)]">Neutral</span>
            </div>
            <span className="text-sm font-bold text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)]">
              {reviews.length > 0 ? Math.round((reviews.filter(r => r.rating === 3).length / reviews.length) * 100) : 0}%
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-[var(--color-danger-bg)] dark:bg-[var(--color-danger-dark-bg)] rounded-md">
            <div className="flex items-center gap-2">
              <ThumbsDown className="w-5 h-5 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)]" />
              <span className="text-sm font-medium text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)]">Negative</span>
            </div>
            <span className="text-sm font-bold text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)]">
              {reviews.length > 0 ? Math.round((reviews.filter(r => r.rating <= 2).length / reviews.length) * 100) : 0}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
