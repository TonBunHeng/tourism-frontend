import { RotateCcw, Save, RefreshCw, Check } from 'lucide-react';

export default function SettingsHeader({ saving, saveSuccess, onSave, onReset }) {
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] tracking-tight">
            System Settings
          </h1>
          <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
            Configure and manage system preferences
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onReset}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-[var(--color-warning-border)] dark:border-[var(--color-warning-dark-border)] text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)] rounded-xl hover:bg-[var(--color-warning-bg)] dark:hover:bg-[var(--color-warning-dark-bg)] transition-colors hover:border-[var(--color-warning-hover-border)] dark:hover:border-[var(--color-warning-dark-hover-border)]"
          >
            <RotateCcw size={20} />
            <span className="font-medium">Reset</span>
          </button>
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-[var(--color-white)] rounded-xl hover:bg-[var(--color-primary-hover)] transition-colors shadow-lg shadow-[var(--color-primary)]/25"
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={20} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
      {saveSuccess && (
        <div className="mt-4 p-3 bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)] border border-[var(--color-success-border)] dark:border-[var(--color-success-dark-border)] rounded-xl flex items-center gap-2 text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)]">
          <Check className="w-5 h-5 flex-shrink-0" />
          <span>Settings saved successfully!</span>
        </div>
      )}
    </div>
  );
}
