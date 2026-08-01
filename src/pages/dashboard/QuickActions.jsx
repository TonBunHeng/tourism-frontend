import { MapPinned, CalendarDays, Users, BarChart3 } from 'lucide-react';

export default function QuickActions() {
  const quickActions = [
    { label: 'Add New Place', icon: MapPinned, color: 'text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]', bg: 'bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)]' },
    { label: 'Create Event', icon: CalendarDays, color: 'text-[var(--color-rose-badge-text)] dark:text-[var(--color-rose-badge-dark-text)]', bg: 'bg-[var(--color-rose-badge-bg)] dark:bg-[var(--color-rose-badge-dark-bg)]' },
    { label: 'Manage Users', icon: Users, color: 'text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)]', bg: 'bg-[var(--color-purple-badge-bg)] dark:bg-[var(--color-purple-badge-dark-bg)]' },
    { label: 'View Reports', icon: BarChart3, color: 'text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)]', bg: 'bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)]' }
  ];

  return (
    <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-2xl shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-6">
      <h3 className="font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className={`p-4 ${action.bg} rounded-xl hover:shadow-md transition-all duration-200 hover:scale-105 transform text-center`}
            >
              <Icon className={`w-6 h-6 ${action.color} mx-auto mb-1`} />
              <span className="text-xs font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
