import { Activity } from 'lucide-react';

export default function ProfileActivity({ recentActivity = [] }) {
  const safeActivities = Array.isArray(recentActivity) ? recentActivity : [];

  return (
    <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md p-4 md:p-5 shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">Recent Activity</h3>
      </div>
      <div className="space-y-2.5">
        {safeActivities.length > 0 ? (
          safeActivities.map((activity, index) => {
            const Icon = activity.icon || Activity;
            return (
              <div key={activity.id || index} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)]/50 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-border-light)] dark:bg-[var(--color-surface-hover-dark)] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] truncate">
                    {activity.action} <span className="font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{activity.target}</span>
                  </p>
                </div>
                <span className="text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] flex-shrink-0">{activity.time}</span>
              </div>
            );
          })
        ) : (
          <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] py-2">No recent activities recorded.</p>
        )}
      </div>
    </div>
  );
}
