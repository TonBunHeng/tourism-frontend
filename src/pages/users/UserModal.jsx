import { X, ChevronDown } from 'lucide-react';

export default function UserModal({
  isOpen,
  editingUser,
  newUser,
  onNewUserChange,
  onClose,
  onSubmit
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--color-bg-dark-modal)] text-[var(--color-white)] rounded-3xl max-w-lg w-full shadow-2xl border border-[var(--color-modal-border)] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-modal-border)]">
          <h3 className="text-lg font-bold text-[var(--color-white)] tracking-wide">
            {editingUser ? 'Edit User' : 'Add New User'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-[var(--color-text-secondary-dark)] hover:text-[var(--color-white)] hover:bg-[var(--color-surface-hover-dark)] rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={onSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-dark)] mb-1.5">User Name</label>
            <input
              type="text"
              placeholder="e.g., John Doe"
              value={newUser.name}
              onChange={(e) => onNewUserChange({ ...newUser, name: e.target.value })}
              className="w-full bg-[var(--color-input-dark-bg)] border border-[var(--color-border-dark)]/70 rounded-xl px-4 py-3 text-sm text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-dark)] mb-1.5">Email</label>
              <input
                type="email"
                placeholder="e.g., john@email.com"
                value={newUser.email}
                onChange={(e) => onNewUserChange({ ...newUser, email: e.target.value })}
                className="w-full bg-[var(--color-input-dark-bg)] border border-[var(--color-border-dark)]/70 rounded-xl px-4 py-3 text-sm text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-dark)] mb-1.5">Phone</label>
              <input
                type="text"
                placeholder="e.g., +855 12 345 678"
                value={newUser.phone}
                onChange={(e) => onNewUserChange({ ...newUser, phone: e.target.value })}
                className="w-full bg-[var(--color-input-dark-bg)] border border-[var(--color-border-dark)]/70 rounded-xl px-4 py-3 text-sm text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-dark)] mb-1.5">Role</label>
              <div className="relative">
                <select
                  value={newUser.role}
                  onChange={(e) => onNewUserChange({ ...newUser, role: e.target.value })}
                  className="appearance-none w-full bg-[var(--color-input-dark-bg)] border border-[var(--color-border-dark)]/70 rounded-xl px-4 py-3 text-sm text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent cursor-pointer"
                >
                  <option value="User">User</option>
                  <option value="Moderator">Moderator</option>
                  <option value="Admin">Admin</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary-dark)] pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-dark)] mb-1.5">Status</label>
              <div className="relative">
                <select
                  value={newUser.status}
                  onChange={(e) => onNewUserChange({ ...newUser, status: e.target.value })}
                  className="appearance-none w-full bg-[var(--color-input-dark-bg)] border border-[var(--color-border-dark)]/70 rounded-xl px-4 py-3 text-sm text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent cursor-pointer"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary-dark)] pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-dark)] mb-1.5">Subscription</label>
              <div className="relative">
                <select
                  value={newUser.subscription}
                  onChange={(e) => onNewUserChange({ ...newUser, subscription: e.target.value })}
                  className="appearance-none w-full bg-[var(--color-input-dark-bg)] border border-[var(--color-border-dark)]/70 rounded-xl px-4 py-3 text-sm text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent cursor-pointer"
                >
                  <option value="Free">Free</option>
                  <option value="Basic">Basic</option>
                  <option value="Premium">Premium</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary-dark)] pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-dark)] mb-1.5">Location</label>
              <input
                type="text"
                placeholder="e.g., Siem Reap"
                value={newUser.location}
                onChange={(e) => onNewUserChange({ ...newUser, location: e.target.value })}
                className="w-full bg-[var(--color-input-dark-bg)] border border-[var(--color-border-dark)]/70 rounded-xl px-4 py-3 text-sm text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl border border-[var(--color-border-dark)] text-[var(--color-text-secondary-dark)] hover:bg-[var(--color-surface-hover-dark)] font-medium text-sm transition-colors text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-white)] font-medium text-sm transition-colors shadow-lg shadow-[var(--color-primary)]/25 text-center"
            >
              {editingUser ? 'Update User' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
