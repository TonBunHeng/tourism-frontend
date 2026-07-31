import { Plus } from 'lucide-react';

export default function EventsHeader({ onCreateClick }) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] tracking-tight">
            Events & Festivals
          </h1>
          <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
            Manage cultural events, festivals, and activities across Cambodia
          </p>
        </div>
        <button
          onClick={onCreateClick}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-[var(--color-white)] rounded-xl hover:bg-[var(--color-primary-hover)] transition-colors shadow-lg shadow-[var(--color-primary)]/25 w-full sm:w-auto"
        >
          <Plus size={18} className="shrink-0" />
          <span className="font-medium">Create Event</span>
        </button>
      </div>
    </div>
  );
}
