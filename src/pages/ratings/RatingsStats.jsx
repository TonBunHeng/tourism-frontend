import { MessageSquare, Star, ThumbsUp, Clock } from 'lucide-react';

export default function RatingsStats({ reviews = [] }) {
  const safeReviews = Array.isArray(reviews) ? reviews : [];
  const total = safeReviews.length;
  const avgRating = total > 0
    ? (safeReviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0) / total).toFixed(1)
    : '0.0';
  const totalLikes = safeReviews.reduce((sum, r) => sum + (Number(r.likes) || 0), 0);
  const pending = safeReviews.filter(r => r.status === 'Pending').length;

  const stats = [
    {
      label: 'Total Reviews',
      value: total.toLocaleString(),
      icon: MessageSquare,
      color: 'text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]',
      bg: 'bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)]'
    },
    {
      label: 'Average Rating',
      value: avgRating,
      icon: Star,
      color: 'text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)]',
      bg: 'bg-[var(--color-warning-bg)] dark:bg-[var(--color-warning-dark-bg)]'
    },
    {
      label: 'Total Likes',
      value: totalLikes.toLocaleString(),
      icon: ThumbsUp,
      color: 'text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)]',
      bg: 'bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)]'
    },
    {
      label: 'Pending Reviews',
      value: pending.toLocaleString(),
      icon: Clock,
      color: 'text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)]',
      bg: 'bg-[var(--color-warning-bg)] dark:bg-[var(--color-warning-dark-bg)]'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div key={index} className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-medium truncate">{stat.label}</p>
                <p className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mt-1">{stat.value}</p>
              </div>
              <div className={`p-2.5 sm:p-3 rounded-md shrink-0 ${stat.bg}`}>
                <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
