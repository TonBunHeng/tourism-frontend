import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function RatingsHeader({ onOpenAnalytics }) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] tracking-tight">
            Ratings & Reviews
          </h1>
          <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
            Monitor tourist ratings, moderate traveler reviews, and analyze destination sentiment
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenAnalytics}
          className="flex items-center justify-center gap-1.5 md:gap-2 px-4 py-2 text-xs md:text-sm font-semibold rounded-md border border-transparent bg-[var(--color-primary)] text-[var(--color-white)] hover:bg-[var(--color-primary-hover)] transition-all shadow-lg shadow-[var(--color-primary)]/25 shrink-0 w-full sm:w-auto cursor-pointer active:scale-95"
        >
          <BarChart3 className="w-4 h-4 shrink-0" />
          <span>Ratings Analytics</span>
        </button>
      </div>
    </div>
  );
}
