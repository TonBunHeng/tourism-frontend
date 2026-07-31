import { Download, Share2 } from 'lucide-react';

export default function RatingsHeader() {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] tracking-tight">
            Ratings & Reviews
          </h1>
          <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
            Manage user reviews and ratings across all destinations
          </p>
        </div>
        <div className="grid grid-cols-2 md:flex gap-2 md:gap-3">
          <button className="flex items-center justify-center gap-1.5 md:gap-2 px-2 md:px-4 py-2.5 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] rounded-xl hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] transition-colors">
            <Download size={18} className="shrink-0"/>
            <span className="font-medium text-xs md:text-sm">Export</span>
          </button>
          <button className="flex items-center justify-center gap-1.5 md:gap-2 px-2 md:px-4 py-2 bg-[var(--color-primary)] text-[var(--color-white)] rounded-xl hover:bg-[var(--color-primary-hover)] transition-colors shadow-lg shadow-[var(--color-primary)]/25">
            <Share2 size={18} className="shrink-0"/>
            <span className="font-medium text-xs md:text-sm">Share Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}
