import { X, ChevronDown } from 'lucide-react';

export default function EventModal({
  isOpen,
  editingEvent,
  formData,
  onFormDataChange,
  onClose,
  onSubmit,
  categories
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] rounded-3xl max-w-lg w-full shadow-2xl border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
          <h3 className="text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] tracking-wide">
            {editingEvent ? 'Edit Event' : 'Create New Event'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:text-[var(--color-text-primary-light)] dark:hover:text-[var(--color-white)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={onSubmit}>
          <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Event Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => onFormDataChange({ ...formData, title: e.target.value })}
                placeholder="Enter event title"
                className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] dark:placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Category</label>
              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) => onFormDataChange({ ...formData, category: e.target.value })}
                  className="appearance-none w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent cursor-pointer"
                  required
                >
                  {categories.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => onFormDataChange({ ...formData, description: e.target.value })}
                placeholder="Enter event description"
                rows="3"
                className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] dark:placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent resize-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => onFormDataChange({ ...formData, location: e.target.value })}
                placeholder="Enter event location"
                className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] dark:placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent transition-all"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => onFormDataChange({ ...formData, date: e.target.value })}
                  className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Time</label>
                <input
                  type="text"
                  value={formData.time}
                  onChange={(e) => onFormDataChange({ ...formData, time: e.target.value })}
                  placeholder="e.g., 08:00 AM"
                  className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] dark:placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Price</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => onFormDataChange({ ...formData, price: e.target.value })}
                  placeholder="e.g., $45 or Free"
                  className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] dark:placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Organizer</label>
                <input
                  type="text"
                  value={formData.organizer}
                  onChange={(e) => onFormDataChange({ ...formData, organizer: e.target.value })}
                  placeholder="Organizer name"
                  className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] dark:placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-6 py-4 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] font-medium text-sm transition-colors text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-white)] font-medium text-sm transition-colors shadow-lg shadow-[var(--color-primary)]/25 text-center"
            >
              {editingEvent ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
