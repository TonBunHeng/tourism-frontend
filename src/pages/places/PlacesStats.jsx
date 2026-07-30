import { Building2, CheckCircle, Star, TrendingUp } from 'lucide-react';

export default function PlacesStats({ places }) {
  const stats = [
    { label: 'Total Places', value: places.length, icon: Building2, color: '#2563EB' },
    { label: 'Active Sites', value: places.filter(p => p.status === 'Active').length, icon: CheckCircle, color: '#16A34A' },
    { label: 'Average Rating', value: '4.8', icon: Star, color: '#F59E0B' },
    { label: 'Total Reviews', value: '1,234', icon: TrendingUp, color: '#9333EA' }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium truncate">{stat.label}</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
            </div>
            <div
              className="p-2.5 md:p-3 rounded-xl flex-shrink-0"
              style={{ backgroundColor: `${stat.color}15` }}
            >
              <stat.icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: stat.color }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
