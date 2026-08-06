import { Plus } from 'lucide-react';

export default function UsersHeader({ onAddUser }) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] tracking-tight">
            User Management
          </h1>
          <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
            Manage and monitor all platform users
          </p>
        </div>
        <div className="grid grid-cols-1 md:flex gap-1.5 md:gap-1.5">
          <button
            onClick={onAddUser}
            className="flex items-center justify-center gap-1.5 md:gap-2 px-4 py-2 text-xs md:text-sm font-semibold rounded-md border border-transparent bg-[var(--color-primary)] text-[var(--color-white)] hover:bg-[var(--color-primary-hover)] transition-all shadow-lg shadow-[var(--color-primary)]/25 shrink-0 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span>Add New User</span>
          </button>
        </div>
      </div>
    </div>
  );
}
