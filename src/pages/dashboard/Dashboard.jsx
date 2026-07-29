import { useState } from 'react';
import { MapPinned, Tags, Map, CalendarDays, Users, MessageSquareText, Star, Heart, TrendingUp, TrendingDown, ArrowUpRight, RefreshCw, Download, UserPlus, UserCheck, UserX, AlertCircle, BarChart3, User, Building, Landmark, Waves } from 'lucide-react';

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('weekly');
  const [isLoading, setIsLoading] = useState(false);

  // Dashboard statistics data
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

  // Recent activity data with icon-based avatars
  const recentActivity = [
    {
      id: 1,
      user: 'Sokha P.',
      action: 'Added new place',
      target: 'Angkor Wat Temple',
      time: '2 minutes ago',
      icon: User,
      type: 'place'
    },
    {
      id: 2,
      user: 'David C.',
      action: 'Submitted a review',
      target: 'Royal Palace',
      time: '15 minutes ago',
      icon: User,
      type: 'review'
    },
    {
      id: 3,
      user: 'Maria L.',
      action: 'Registered new account',
      target: 'New User',
      time: '1 hour ago',
      icon: User,
      type: 'user'
    },
    {
      id: 4,
      user: 'James R.',
      action: 'Uploaded gallery images',
      target: 'Koh Rong Island',
      time: '3 hours ago',
      icon: User,
      type: 'gallery'
    },
    {
      id: 5,
      user: 'Sophie N.',
      action: 'Created new event',
      target: 'Water Festival 2024',
      time: '5 hours ago',
      icon: User,
      type: 'event'
    }
  ];

  // Top places data with icons
  const topPlaces = [
    { name: 'Angkor Wat', rating: 4.9, reviews: 1256, visits: 45231, icon: Landmark },
    { name: 'Royal Palace', rating: 4.8, reviews: 876, visits: 23456, icon: Building },
    { name: 'Bayon Temple', rating: 4.8, reviews: 654, visits: 18923, icon: Landmark },
    { name: 'Koh Rong Island', rating: 4.7, reviews: 543, visits: 15678, icon: Waves },
    { name: 'Tonle Sap Lake', rating: 4.6, reviews: 432, visits: 12345, icon: Waves }
  ];

  // User growth data
  const userGrowth = [
    { month: 'Jan', users: 1200 },
    { month: 'Feb', users: 1500 },
    { month: 'Mar', users: 1800 },
    { month: 'Apr', users: 2100 },
    { month: 'May', users: 2500 },
    { month: 'Jun', users: 2900 }
  ];

  // Category distribution
  const categoryDistribution = [
    { name: 'Temples', count: 45, color: 'bg-blue-500' },
    { name: 'Historical Sites', count: 32, color: 'bg-purple-500' },
    { name: 'Beaches', count: 18, color: 'bg-cyan-500' },
    { name: 'Nature Parks', count: 15, color: 'bg-green-500' },
    { name: 'Markets', count: 12, color: 'bg-amber-500' },
    { name: 'Palaces', count: 8, color: 'bg-rose-500' }
  ];

  // Status counts
  const statusCounts = [
    { label: 'Active Users', value: 7854, icon: UserCheck, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' },
    { label: 'Inactive Users', value: 892, icon: UserX, color: 'text-gray-600 dark:text-gray-400', bg: 'bg-gray-50 dark:bg-gray-700/50' },
    { label: 'Suspended Users', value: 196, icon: AlertCircle, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' },
    { label: 'New This Week', value: 234, icon: UserPlus, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' }
  ];

  // Quick actions
  const quickActions = [
    { label: 'Add New Place', icon: MapPinned, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Create Event', icon: CalendarDays, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-900/20' },
    { label: 'Manage Users', icon: Users, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { label: 'View Reports', icon: BarChart3, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' }
  ];

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Welcome back! Here's what's happening with your platform today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-1">
              <button
                onClick={() => setTimeRange('weekly')}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${timeRange === 'weekly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setTimeRange('monthly')}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${timeRange === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setTimeRange('yearly')}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${timeRange === 'yearly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
              >
                Yearly
              </button>
            </div>
            <button
              onClick={handleRefresh}
              className="p-2.5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <RefreshCw className={`w-5 h-5 text-gray-600 dark:text-gray-400 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button className="p-2.5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>

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

      {/* Charts and Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* User Growth Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">User Growth</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Monthly active users</p>
            </div>
            <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-1">
              <span>View Details</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="h-48 flex items-end gap-2">
            {userGrowth.map((item, index) => {
              const maxValue = Math.max(...userGrowth.map(d => d.users));
              const height = (item.users / maxValue) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-lg transition-all duration-500 hover:from-blue-600 hover:to-blue-500"
                    style={{ height: `${height}%`, minHeight: '20px' }}
                  >
                    <div className="opacity-0 hover:opacity-100 transition-opacity text-center text-white text-xs font-medium pt-1">
                      {item.users}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{item.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  className={`p-4 ${action.bg} rounded-xl hover:shadow-md transition-all duration-200 hover:scale-105 transform text-center`}
                >
                  <Icon className={`w-6 h-6 ${action.color} mx-auto mb-1`} />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Latest platform updates</p>
            </div>
            <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{activity.user}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold flex-shrink-0 ${
                        activity.type === 'place' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                        activity.type === 'review' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                        activity.type === 'user' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' :
                        activity.type === 'gallery' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                        'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400'
                      }`}>
                        {activity.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                      {activity.action} <span className="font-medium text-gray-900 dark:text-white">{activity.target}</span>
                    </p>
                    <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Places */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Top Places</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Highest rated destinations</p>
            </div>
            <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {topPlaces.map((place, index) => {
              const Icon = place.icon;
              return (
                <div key={index} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{place.name}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{place.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{place.reviews} reviews</span>
                      <span>•</span>
                      <span>{place.visits.toLocaleString()} visits</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-medium ${index === 0 ? 'text-amber-500' :
                      index === 1 ? 'text-gray-400' :
                        index === 2 ? 'text-amber-600' :
                          'text-gray-400'
                      }`}>
                      #{index + 1}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Category Distribution</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Places by category</p>
            </div>
            <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {categoryDistribution.map((category, index) => (
              <div key={index}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-700 dark:text-gray-300">{category.name}</span>
                  <span className="text-gray-500 dark:text-gray-400 font-medium">{category.count}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${category.color} rounded-full transition-all duration-500`}
                    style={{ width: `${(category.count / categoryDistribution.reduce((sum, c) => sum + c.count, 0)) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* User Status Summary */}
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">User Status</h4>
            <div className="grid grid-cols-2 gap-3">
              {statusCounts.map((status, index) => {
                const Icon = status.icon;
                return (
                  <div key={index} className={`p-3 rounded-xl ${status.bg}`}>
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${status.color}`} />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{status.label}</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{status.value.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}