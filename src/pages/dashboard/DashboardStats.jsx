import { MapPinned, Users, MessageSquareText, Star, Tags, Map, CalendarDays, Heart, TrendingUp, TrendingDown } from 'lucide-react';

export default function DashboardStats({ apiStats }) {
  const stats = [
    {
      title: 'Total Places',
      value: apiStats?.total_places !== undefined ? apiStats.total_places.toLocaleString() : '0',
      subtext: 'Registered heritage & attractions',
      change: '+0%',
      trend: 'up',
      icon: MapPinned,
      color: 'text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]',
      bg: 'bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)]',
      border: 'border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]'
    },
    {
      title: 'Total Users',
      value: apiStats?.total_users !== undefined ? apiStats.total_users.toLocaleString() : '0',
      subtext: 'Registered traveler accounts',
      change: '+0%',
      trend: 'up',
      icon: Users,
      color: 'text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)]',
      bg: 'bg-[var(--color-purple-badge-bg)] dark:bg-[var(--color-purple-badge-dark-bg)]',
      border: 'border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]'
    },
    {
      title: 'Total Reviews',
      value: apiStats?.total_reviews !== undefined ? apiStats.total_reviews.toLocaleString() : '0',
      subtext: 'Traveler feedback entries',
      change: '+0%',
      trend: 'up',
      icon: MessageSquareText,
      color: 'text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)]',
      bg: 'bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)]',
      border: 'border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]'
    },
    {
      title: 'Avg Rating',
      value: apiStats?.avg_rating !== undefined ? `${apiStats.avg_rating} ★` : '0.0 ★',
      subtext: 'Destination score out of 5.0',
      change: '+0.0',
      trend: 'up',
      icon: Star,
      color: 'text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)]',
      bg: 'bg-[var(--color-warning-bg)] dark:bg-[var(--color-warning-dark-bg)]',
      border: 'border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]'
    }
  ];

  const stats2 = [
    {
      title: 'Total Categories',
      value: apiStats?.total_categories !== undefined ? apiStats.total_categories.toLocaleString() : '0',
      subtext: 'Organized destination types',
      change: '+0',
      trend: 'up',
      icon: Tags,
      color: 'text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)]',
      bg: 'bg-[var(--color-purple-badge-bg)] dark:bg-[var(--color-purple-badge-dark-bg)]',
      border: 'border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]'
    },
    {
      title: 'Total Provinces',
      value: apiStats?.total_provinces !== undefined ? apiStats.total_provinces.toLocaleString() : '0',
      subtext: 'Active tourism regions',
      change: '+0',
      trend: 'up',
      icon: Map,
      color: 'text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)]',
      bg: 'bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)]',
      border: 'border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]'
    },
    {
      title: 'Total Events',
      value: apiStats?.total_events !== undefined ? apiStats.total_events.toLocaleString() : '0',
      subtext: 'Scheduled festivals & events',
      change: '+0%',
      trend: 'up',
      icon: CalendarDays,
      color: 'text-[var(--color-rose-badge-text)] dark:text-[var(--color-rose-badge-dark-text)]',
      bg: 'bg-[var(--color-rose-badge-bg)] dark:bg-[var(--color-rose-badge-dark-bg)]',
      border: 'border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]'
    },
    {
      title: 'Total Favorites',
      value: apiStats?.total_favorites !== undefined ? apiStats.total_favorites.toLocaleString() : '0',
      subtext: 'Saved wishlist destinations',
      change: '+0%',
      trend: 'up',
      icon: Heart,
      color: 'text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)]',
      bg: 'bg-[var(--color-danger-bg)] dark:bg-[var(--color-danger-dark-bg)]',
      border: 'border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]'
    }
  ];

  return (
    <>
      {/* Stats Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg p-4 shadow-xs border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-medium truncate">
                    {stat.title}
                  </p>
                  <p className="text-lg md:text-xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mt-1 tracking-tight">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-2 rounded-md shrink-0 ${stat.bg}`}>
                  <Icon className={`w-4 h-4 md:w-5 md:h-5 ${stat.color}`} />
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
                <p className="text-[11px] text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] truncate">
                  {stat.subtext}
                </p>
                <div className={`flex items-center gap-0.5 text-xs font-semibold shrink-0 ml-2 ${
                  stat.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  <span>{stat.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {stats2.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg p-4 shadow-xs border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-medium truncate">
                    {stat.title}
                  </p>
                  <p className="text-lg md:text-xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mt-1 tracking-tight">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-2 rounded-md shrink-0 ${stat.bg}`}>
                  <Icon className={`w-4 h-4 md:w-5 md:h-5 ${stat.color}`} />
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
                <p className="text-[11px] text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] truncate">
                  {stat.subtext}
                </p>
                <div className={`flex items-center gap-0.5 text-xs font-semibold shrink-0 ml-2 ${
                  stat.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  <span>{stat.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
