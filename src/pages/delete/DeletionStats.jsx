import { FileText, Clock, UserX, Trash2 } from 'lucide-react';

export default function DeletionStats({ requests }) {
  const stats = [
    {
      label: 'Total Requests',
      value: requests.length,
      icon: FileText,
      color: 'text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]',
      bg: 'bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)]'
    },
    {
      label: 'Pending',
      value: requests.filter(r => r.status === 'pending').length,
      icon: Clock,
      color: 'text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)]',
      bg: 'bg-[var(--color-warning-bg)] dark:bg-[var(--color-warning-dark-bg)]'
    },
    {
      label: 'Account Deletions',
      value: requests.filter(r => r.type === 'account').length,
      icon: UserX,
      color: 'text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)]',
      bg: 'bg-[var(--color-danger-bg)] dark:bg-[var(--color-danger-dark-bg)]'
    },
    {
      label: 'Item Deletions',
      value: requests.filter(r => r.type === 'item').length,
      icon: Trash2,
      color: 'text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)]',
      bg: 'bg-[var(--color-purple-badge-bg)] dark:bg-[var(--color-purple-badge-dark-bg)]'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div key={index} className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs md:text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-medium truncate">{stat.label}</p>
                <p className="text-xl md:text-2xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mt-1">{stat.value}</p>
              </div>
              <div className={`p-2.5 md:p-3 rounded-md flex-shrink-0 ${stat.bg}`}>
                <IconComponent className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
