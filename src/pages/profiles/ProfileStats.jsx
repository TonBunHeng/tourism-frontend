export default function ProfileStats({ userStats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {userStats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-3 md:p-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate">{stat.label}</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-0.5">{stat.value}</p>
              </div>
              <div className={`p-2 md:p-2.5 rounded-lg flex-shrink-0 ${stat.bg}`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
