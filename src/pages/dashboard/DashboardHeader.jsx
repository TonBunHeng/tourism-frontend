import React from 'react';

export default function DashboardHeader({
  timeRange,
  onTimeRangeChange
}) {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
            Welcome back! Here's what's happening with your platform today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-0.5">
            <button
              onClick={() => onTimeRangeChange('weekly')}
              className={`px-3 py-1 text-xs sm:text-sm rounded-md transition-colors cursor-pointer ${timeRange === 'weekly'
                ? 'bg-[var(--color-primary)] text-[var(--color-white)] font-medium'
                : 'text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)]'
                }`}
            >
              Weekly
            </button>
            <button
              onClick={() => onTimeRangeChange('monthly')}
              className={`px-3 py-1 text-xs sm:text-sm rounded-md transition-colors cursor-pointer ${timeRange === 'monthly'
                ? 'bg-[var(--color-primary)] text-[var(--color-white)] font-medium'
                : 'text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)]'
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => onTimeRangeChange('yearly')}
              className={`px-3 py-1 text-xs sm:text-sm rounded-md transition-colors cursor-pointer ${timeRange === 'yearly'
                ? 'bg-[var(--color-primary)] text-[var(--color-white)] font-medium'
                : 'text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)]'
                }`}
            >
              Yearly
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
