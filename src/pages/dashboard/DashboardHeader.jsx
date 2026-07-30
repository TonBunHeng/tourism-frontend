import { RefreshCw, Download } from 'lucide-react';

export default function DashboardHeader({
  timeRange,
  onTimeRangeChange,
  isLoading,
  onRefresh
}) {
  return (
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
              onClick={() => onTimeRangeChange('weekly')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${timeRange === 'weekly'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
            >
              Weekly
            </button>
            <button
              onClick={() => onTimeRangeChange('monthly')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${timeRange === 'monthly'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => onTimeRangeChange('yearly')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${timeRange === 'yearly'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
            >
              Yearly
            </button>
          </div>
          <button
            onClick={onRefresh}
            className="p-2.5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            title="Refresh dashboard"
          >
            <RefreshCw className={`w-5 h-5 text-gray-600 dark:text-gray-400 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button className="p-2.5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" title="Export report">
            <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
