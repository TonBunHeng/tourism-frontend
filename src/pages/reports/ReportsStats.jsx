// src/pages/reports/ReportsStats.jsx
import React from 'react';
import { Database, CheckCircle, Star, Download } from 'lucide-react';

export default function ReportsStats({ totalCount, activeCount, avgRating, totalExports }) {
  const stats = [
    {
      label: 'Total Report Items',
      value: totalCount,
      icon: Database,
      color: 'text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]',
      bg: 'bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)]'
    },
    {
      label: 'Active / Verified',
      value: activeCount,
      icon: CheckCircle,
      color: 'text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)]',
      bg: 'bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)]'
    },
    {
      label: 'Average Rating',
      value: avgRating ? `${avgRating} / 5.0` : 'N/A',
      icon: Star,
      color: 'text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)]',
      bg: 'bg-[var(--color-warning-bg)] dark:bg-[var(--color-warning-dark-bg)]'
    },
    {
      label: 'Total Downloads',
      value: totalExports,
      icon: Download,
      color: 'text-[var(--color-purple-text)] dark:text-[var(--color-purple-dark-text)]',
      bg: 'bg-[var(--color-purple-bg)] dark:bg-[var(--color-purple-dark-bg)]'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-6 sm:mb-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={index}
            className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-2xl p-3 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]"
          >
            <div className="flex items-center justify-between gap-1.5 sm:gap-2">
              <div className="min-w-0">
                <p className="text-[11px] sm:text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-medium truncate">
                  {stat.label}
                </p>
                <p className="text-lg sm:text-2xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mt-0.5 sm:mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`p-2 sm:p-3 rounded-xl shrink-0 ${stat.bg}`}>
                <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
