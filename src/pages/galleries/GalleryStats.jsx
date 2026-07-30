import { Image, Video, Eye } from 'lucide-react';

export default function GalleryStats({ mediaItems }) {
  const stats = [
    {
      label: 'Total Media',
      value: mediaItems.length,
      icon: Image,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      label: 'Images',
      value: mediaItems.filter(m => m.type === 'image').length,
      icon: Image,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      label: 'Videos',
      value: mediaItems.filter(m => m.type === 'video').length,
      icon: Video,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      label: 'Total Views',
      value: mediaItems.reduce((sum, m) => sum + m.views, 0).toLocaleString(),
      icon: Eye,
      color: 'text-amber-500 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-900/20'
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
