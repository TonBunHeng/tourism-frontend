import { UserCheck, UserX, AlertCircle, UserPlus } from 'lucide-react';

export default function CategoryDistribution() {
  const categoryDistribution = [
    { name: 'Temples', count: 0, color: 'bg-blue-500' },
    { name: 'Historical Sites', count: 0, color: 'bg-purple-500' },
    { name: 'Beaches', count: 0, color: 'bg-cyan-500' },
    { name: 'Nature Parks', count: 0, color: 'bg-green-500' },
    { name: 'Markets', count: 0, color: 'bg-amber-500' },
    { name: 'Palaces', count: 0, color: 'bg-rose-500' }
  ];

  const statusCounts = [
    { label: 'Active Users', value: 0, icon: UserCheck, color: 'text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)]', bg: 'bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)]' },
    { label: 'Inactive Users', value: 0, icon: UserX, color: 'text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]', bg: 'bg-[var(--color-border-light)] dark:bg-[var(--color-surface-hover-dark)]' },
    { label: 'Suspended Users', value: 0, icon: AlertCircle, color: 'text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)]', bg: 'bg-[var(--color-danger-bg)] dark:bg-[var(--color-danger-dark-bg)]' },
    { label: 'New This Week', value: 0, icon: UserPlus, color: 'text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]', bg: 'bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)]' }
  ];

  const totalCategoryCount = categoryDistribution.reduce((sum, c) => sum + c.count, 0);

  return (
    <div className="lg:col-span-1 bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">Category Distribution</h3>
          <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Places by category</p>
        </div>
        <button className="text-xs text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium">
          View All
        </button>
      </div>
      <div className="space-y-3">
        {categoryDistribution.map((category, index) => (
          <div key={index}>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">{category.name}</span>
              <span className="text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-medium">{category.count}</span>
            </div>
            <div className="w-full h-2 bg-[var(--color-border-light)] dark:bg-[var(--color-surface-hover-dark)] rounded-full overflow-hidden">
              <div
                className={`h-full ${category.color} rounded-full transition-all duration-500`}
                style={{ width: `${(category.count / totalCategoryCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* User Status Summary */}
      <div className="mt-6 pt-6 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
        <h4 className="text-sm font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-3">User Status</h4>
        <div className="grid grid-cols-2 gap-3">
          {statusCounts.map((status, index) => {
            const Icon = status.icon;
            return (
              <div key={index} className={`p-3 rounded-md ${status.bg}`}>
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${status.color}`} />
                  <div>
                    <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">{status.label}</p>
                    <p className="text-sm font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{status.value.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
