import { Heart, Check, Star, MapPin } from 'lucide-react';

export default function FavoritesStats({ favorites }) {
  const stats = [
    {
      label: 'Total Favorites',
      value: favorites.length,
      icon: Heart,
      color: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-900/20'
    },
    {
      label: 'Visited Places',
      value: favorites.filter(f => f.visited).length,
      icon: Check,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      label: 'Average Rating',
      value: favorites.length > 0 ? (favorites.reduce((sum, f) => sum + f.rating, 0) / favorites.length).toFixed(1) : '0.0',
      icon: Star,
      color: 'text-amber-500 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-900/20'
    },
    {
      label: 'Places to Visit',
      value: favorites.filter(f => !f.visited).length,
      icon: MapPin,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium truncate">{stat.label}</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-2.5 md:p-3 rounded-xl flex-shrink-0 ${stat.bg}`}>
                <IconComponent className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
