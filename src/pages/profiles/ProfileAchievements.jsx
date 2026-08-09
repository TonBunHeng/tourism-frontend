import { Check } from 'lucide-react';

export default function ProfileAchievements({ achievements }) {
  return (
    <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md p-4 md:p-5 shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
      <h3 className="font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-3">Achievements</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;
          return (
            <div
              key={index}
              className={`text-center p-3 rounded-lg transition-all ${
                achievement.unlocked
                  ? 'bg-[var(--color-warning-bg)] dark:bg-[var(--color-warning-dark-bg)] border border-[var(--color-warning-border)] dark:border-[var(--color-warning-dark-border)]'
                  : 'bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] opacity-50'
              }`}
            >
              <div className="mb-1 flex justify-center">
                <Icon className="w-6 h-6 text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)]" />
              </div>
              <p className="text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">{achievement.name}</p>
              <p className="text-[10px] text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] mt-0.5">{achievement.description}</p>
              {achievement.unlocked && (
                <Check className="w-3 h-3 text-[var(--color-warning-text)] mx-auto mt-1" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
