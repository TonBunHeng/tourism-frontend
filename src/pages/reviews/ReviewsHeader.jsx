import { RotateCcw, Download, BarChart2 } from 'lucide-react';

export default function ReviewsHeader({ onReset }) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] tracking-tight">
            Reviews Management
          </h1>
          <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
            Manage and moderate user reviews across all destinations
          </p>
        </div>
        <div className="grid grid-cols-2 md:flex gap-2 md:gap-2">
          <button
            onClick={onReset}
            className="flex items-center justify-center gap-2 md:gap-2 px-4 py-2 text-xs md:text-sm font-semibold border border-[var(--color-warning-border)] dark:border-[var(--color-warning-dark-border)] text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)] rounded-md hover:bg-[var(--color-warning-bg)] dark:hover:bg-[var(--color-warning-dark-bg)] transition-all shrink-0"
          >
            <RotateCcw className="w-4 h-4 shrink-0" />
            <span>Reset</span>
          </button>
          <button className="flex items-center justify-center gap-1.5 md:gap-2 px-4 py-2 text-xs md:text-sm font-semibold rounded-md border border-transparent bg-[var(--color-primary)] text-[var(--color-white)] hover:bg-[var(--color-primary-hover)] transition-all shadow-lg shadow-[var(--color-primary)]/25 shrink-0">
            <BarChart2 className="w-4 h-4 shrink-0" />
            <span>Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
}
