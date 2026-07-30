import { ArrowUpRight } from 'lucide-react';

export default function UserGrowthChart() {
  const userGrowth = [
    { month: 'Jan', users: 1200 },
    { month: 'Feb', users: 1500 },
    { month: 'Mar', users: 1800 },
    { month: 'Apr', users: 2100 },
    { month: 'May', users: 2500 },
    { month: 'Jun', users: 2900 }
  ];

  return (
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
  );
}
