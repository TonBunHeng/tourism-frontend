import { MessageSquare, Star, Clock, Flag } from 'lucide-react';

export default function ReviewsStats({ reviews }) {
  const stats = [
    {
      label: 'Total Reviews',
      value: reviews.length,
      icon: MessageSquare,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      label: 'Average Rating',
      value: reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : '0.0',
      icon: Star,
      color: 'text-amber-500 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-900/20'
    },
    {
      label: 'Pending Reviews',
      value: reviews.filter(r => r.status === 'Pending').length,
      icon: Clock,
      color: 'text-orange-500 dark:text-orange-400',
      bg: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      label: 'Flagged Reviews',
      value: reviews.filter(r => r.reported).length,
      icon: Flag,
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-900/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium truncate">{stat.label}</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-2.5 sm:p-3 rounded-xl shrink-0 ${stat.bg}`}>
                <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
