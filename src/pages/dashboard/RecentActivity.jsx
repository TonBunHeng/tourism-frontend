import { User } from 'lucide-react';

export default function RecentActivity() {
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
    },
  ];

  return (
    <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Latest platform updates</p>
        </div>
        <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
          View All
        </button>
      </div>

      {/* flex-1 និង overflow-y-auto ធ្វើឱ្យវាលាតពេញ និងអាច Scroll មើលបានពេលទិន្នន័យច្រើន */}
      <div className="space-y-3 overflow-y-auto pr-1 flex-1">
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
                  <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold flex-shrink-0 ${activity.type === 'place' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
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
  );
}