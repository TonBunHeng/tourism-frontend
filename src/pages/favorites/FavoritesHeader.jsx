import { RotateCcw, Share2, Plus } from 'lucide-react';

export default function FavoritesHeader({ onReset, onAddNew }) {
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] tracking-tight">
            Favorite Places
          </h1>
          <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
            Manage and organize your favorite destinations
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-3">
          <button 
            onClick={onReset}
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 border border-[var(--color-warning-border)] dark:border-[var(--color-warning-dark-border)] text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)] rounded-xl hover:bg-[var(--color-warning-bg)] dark:hover:bg-[var(--color-warning-dark-bg)] transition-colors hover:border-[var(--color-warning-border)] dark:hover:border-[var(--color-warning-dark-border)]"
          >
            <RotateCcw size={18} className="flex-shrink-0" />
            <span className="font-medium text-xs sm:text-sm truncate">Reset</span>
          </button>
          <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] rounded-xl hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] transition-colors">
            <Share2 size={18} className="flex-shrink-0" />
            <span className="font-medium text-xs sm:text-sm truncate">Share</span>
          </button>
          <button 
            onClick={onAddNew}
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 bg-[var(--color-primary)] text-[var(--color-white)] rounded-xl hover:bg-[var(--color-primary-hover)] transition-colors shadow-lg shadow-[var(--color-primary)]/25"
          >
            <Plus size={18} className="flex-shrink-0" />
            <span className="font-medium text-xs sm:text-sm truncate">Add New</span>
          </button>
        </div>
      </div>
    </div>
  );
}
