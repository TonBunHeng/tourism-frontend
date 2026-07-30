import { FileText, Clock, UserX, Trash2 } from 'lucide-react';

export default function DeletionStats({ requests }) {
  const stats = [
    {
      label: 'Total Requests',
      value: requests.length,
      icon: FileText,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      label: 'Pending',
      value: requests.filter(r => r.status === 'pending').length,
      icon: Clock,
      color: 'text-amber-500 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-900/20'
    },
    {
      label: 'Account Deletions',
      value: requests.filter(r => r.type === 'account').length,
      icon: UserX,
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-900/20'
    },
    {
      label: 'Item Deletions',
      value: requests.filter(r => r.type === 'item').length,
      icon: Trash2,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-900/20'
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
