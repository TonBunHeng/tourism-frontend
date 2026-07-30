import { MapPinned, CalendarDays, Users, BarChart3 } from 'lucide-react';

export default function QuickActions() {
  const quickActions = [
    { label: 'Add New Place', icon: MapPinned, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Create Event', icon: CalendarDays, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-900/20' },
    { label: 'Manage Users', icon: Users, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { label: 'View Reports', icon: BarChart3, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' }
  ];

  return (
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
  );
}
