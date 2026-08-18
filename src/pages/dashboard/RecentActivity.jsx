import { Landmark, MessageSquare, Image, User, Calendar, Bell } from 'lucide-react';

export default function RecentActivity({ activities, recentPlaces }) {
  const getIcon = (type) => {
    switch (type) {
      case 'place':
        return Landmark;
      case 'review':
        return MessageSquare;
      case 'gallery':
        return Image;
      case 'user':
        return User;
      case 'event':
        return Calendar;
      default:
        return Bell;
    }
  };

  const getBadgeStyle = (type) => {
    switch (type) {
      case 'place':
        return 'bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]';
      case 'review':
        return 'bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)] text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)]';
      case 'gallery':
        return 'bg-[var(--color-warning-bg)] dark:bg-[var(--color-warning-dark-bg)] text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)]';
      case 'user':
        return 'bg-[var(--color-purple-badge-bg)] dark:bg-[var(--color-purple-badge-dark-bg)] text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)]';
      default:
        return 'bg-[var(--color-rose-badge-bg)] dark:bg-[var(--color-rose-badge-dark-bg)] text-[var(--color-rose-badge-text)] dark:text-[var(--color-rose-badge-dark-text)]';
    }
  };

  const list = Array.isArray(activities) && activities.length > 0
    ? activities
    : (Array.isArray(recentPlaces) ? recentPlaces.map(rp => ({
        id: rp.id,
        user: 'Admin',
        type: 'place',
        action: 'Added new place',
        target: rp.name,
        time: 'Recently'
      })) : []);

  return (
    <div className="lg:col-span-1 bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h3 className="font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">Recent Activity</h3>
          <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Latest platform updates</p>
        </div>
      </div>

      <div className="space-y-3 overflow-y-auto pr-1 flex-1">
        {list.length > 0 ? (
          list.map((activity, idx) => {
            const Icon = getIcon(activity.type);
            return (
              <div key={activity.id || idx} className="flex items-start gap-3 p-3 rounded-md hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)]/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[var(--color-purple-badge-bg)] dark:bg-[var(--color-purple-badge-dark-bg)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)]" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p className="text-sm font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] truncate">{activity.user}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold flex-shrink-0 ${getBadgeStyle(activity.type)}`}>
                      {activity.type}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] leading-relaxed line-clamp-1">
                    {activity.action} <span className="font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{activity.target}</span>
                  </p>
                  <p className="text-[11px] text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">{activity.time}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-xs text-gray-400">
            No recent activity yet.
          </div>
        )}
      </div>
    </div>
  );
}
