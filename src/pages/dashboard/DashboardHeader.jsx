import { RefreshCw, Download } from 'lucide-react';

export default function DashboardHeader({
  timeRange,
  onTimeRangeChange,
  isLoading,
  onRefresh
}) {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
            Welcome back! Here's what's happening with your platform today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-1">
            <button
              onClick={() => onTimeRangeChange('weekly')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${timeRange === 'weekly'
                ? 'bg-[var(--color-primary)] text-[var(--color-white)]'
                : 'text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)]'
                }`}
            >
              Weekly
            </button>
            <button
              onClick={() => onTimeRangeChange('monthly')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${timeRange === 'monthly'
                ? 'bg-[var(--color-primary)] text-[var(--color-white)]'
                : 'text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)]'
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => onTimeRangeChange('yearly')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${timeRange === 'yearly'
                ? 'bg-[var(--color-primary)] text-[var(--color-white)]'
                : 'text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)]'
                }`}
            >
              Yearly
            </button>
          </div>
          <button
            onClick={onRefresh}
            className="p-2.5 bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] transition-colors"
            title="Refresh dashboard"
          >
            <RefreshCw className={`w-5 h-5 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button className="p-2.5 bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] transition-colors" title="Export report">
            <Download className="w-5 h-5 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
          </button>
        </div>
      </div>
    </div>
  );
}
