import { MapPinned, Users, MessageSquareText, Star, Tags, Map, CalendarDays, Heart, TrendingUp, TrendingDown } from 'lucide-react';

export default function DashboardStats() {
  const stats = [
    {
      title: 'Total Places',
      value: '1,284',
      change: '+12.5%',
      trend: 'up',
      icon: MapPinned,
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-100 dark:border-blue-800'
    },
    {
      title: 'Total Users',
      value: '8,942',
      change: '+8.3%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-100 dark:border-purple-800'
    },
    {
      title: 'Total Reviews',
      value: '5,231',
      change: '+15.7%',
      trend: 'up',
      icon: MessageSquareText,
      color: 'text-green-600',
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-100 dark:border-green-800'
    },
    {
      title: 'Avg Rating',
      value: '4.8',
      change: '+0.3',
      trend: 'up',
      icon: Star,
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-amber-100 dark:border-amber-800'
    }
  ];

  const stats2 = [
    {
      title: 'Total Categories',
      value: '24',
      change: '+2',
      trend: 'up',
      icon: Tags,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50 dark:bg-indigo-900/20',
      border: 'border-indigo-100 dark:border-indigo-800'
    },
    {
      title: 'Total Provinces',
      value: '25',
      change: '+1',
      trend: 'up',
      icon: Map,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      border: 'border-emerald-100 dark:border-emerald-800'
    },
    {
      title: 'Total Events',
      value: '156',
      change: '+28%',
      trend: 'up',
      icon: CalendarDays,
      color: 'text-rose-600',
      bg: 'bg-rose-50 dark:bg-rose-900/20',
      border: 'border-rose-100 dark:border-rose-800'
    },
    {
      title: 'Total Favorites',
      value: '12,847',
      change: '+22.4%',
      trend: 'up',
      icon: Heart,
      color: 'text-red-500',
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-100 dark:border-red-800'
    }
  ];

  return (
    <>
      {/* Stats Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                  <div className={`flex items-center gap-1 mt-1 text-sm ${stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats2.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                  <div className={`flex items-center gap-1 mt-1 text-sm ${stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
