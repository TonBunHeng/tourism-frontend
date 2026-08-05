import { Settings as SettingsIcon, Save, RotateCcw, Search, CheckCircle2, RefreshCw } from 'lucide-react';

export default function SettingsHeader({
  saving,
  saveSuccess,
  onSave,
  onReset,
  searchQuery,
  onSearchChange
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 sm:mb-8">
      {/* Title & Description */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] tracking-tight">
          System Settings
        </h1>
        <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
          Smart Tourism Information System Admin Panel Configuration
        </p>
      </div>

      {/* Controls: Search Bar & Actions */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Search Bar */}
        <div className="relative flex-1 md:w-56">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] pointer-events-none" />
          <input
            type="text"
            value={searchQuery || ''}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Search settings..."
            className="w-full pl-9 pr-3 py-2 text-xs md:text-sm rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] transition-all placeholder:text-[var(--color-text-muted-light)]"
          />
        </div>

        {/* Reset Defaults Button */}
        <button
          type="button"
          onClick={onReset}
          disabled={saving}
          className="flex items-center justify-center gap-1.5 md:gap-2 px-4 py-2 text-xs md:text-sm font-semibold border border-[var(--color-warning-border)] dark:border-[var(--color-warning-dark-border)] text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)] rounded-md hover:bg-[var(--color-warning-bg)] dark:hover:bg-[var(--color-warning-dark-bg)] transition-all shrink-0 disabled:opacity-50"
        >
          <RotateCcw className="w-4 h-4 shrink-0" />
          <span>Reset</span>
        </button>

        {/* Save Changes Button */}
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="flex items-center justify-center gap-1.5 md:gap-2 px-4 py-2 text-xs md:text-sm font-semibold rounded-md border border-transparent bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 text-[var(--color-white)] transition-all shadow-lg shadow-[var(--color-primary)]/25 shrink-0"
        >
          {saving ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : saveSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-[var(--color-white)] animate-bounce" />
              <span>Saved!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
