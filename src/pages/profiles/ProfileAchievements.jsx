import { Check } from 'lucide-react';

export default function ProfileAchievements({ achievements }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Achievements</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;
          return (
            <div
              key={index}
              className={`text-center p-3 rounded-lg transition-all ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/10 border border-amber-200 dark:border-amber-800'
                  : 'bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 opacity-50'
              }`}
            >
              <div className="mb-1 flex justify-center">
                <Icon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{achievement.name}</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">{achievement.description}</p>
              {achievement.unlocked && (
                <Check className="w-3 h-3 text-amber-500 mx-auto mt-1" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
