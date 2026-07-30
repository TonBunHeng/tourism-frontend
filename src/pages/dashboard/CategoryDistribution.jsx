import { UserCheck, UserX, AlertCircle, UserPlus } from 'lucide-react';

export default function CategoryDistribution() {
  const categoryDistribution = [
    { name: 'Temples', count: 45, color: 'bg-blue-500' },
    { name: 'Historical Sites', count: 32, color: 'bg-purple-500' },
    { name: 'Beaches', count: 18, color: 'bg-cyan-500' },
    { name: 'Nature Parks', count: 15, color: 'bg-green-500' },
    { name: 'Markets', count: 12, color: 'bg-amber-500' },
    { name: 'Palaces', count: 8, color: 'bg-rose-500' }
  ];

  const statusCounts = [
    { label: 'Active Users', value: 7854, icon: UserCheck, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' },
    { label: 'Inactive Users', value: 892, icon: UserX, color: 'text-gray-600 dark:text-gray-400', bg: 'bg-gray-50 dark:bg-gray-700/50' },
    { label: 'Suspended Users', value: 196, icon: AlertCircle, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' },
    { label: 'New This Week', value: 234, icon: UserPlus, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' }
  ];

  const totalCategoryCount = categoryDistribution.reduce((sum, c) => sum + c.count, 0);

  return (
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
                style={{ width: `${(category.count / totalCategoryCount) * 100}%` }}
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
  );
}
