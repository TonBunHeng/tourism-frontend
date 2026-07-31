import { X, ChevronDown } from 'lucide-react';

export default function GalleryEditModal({
  isOpen,
  editingMedia,
  onEditingMediaChange,
  onClose,
  onSubmit,
  categories
}) {
  if (!isOpen || !editingMedia) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--color-bg-dark-modal)] text-[var(--color-white)] rounded-3xl max-w-lg w-full shadow-2xl border border-[var(--color-border-dark)] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border-dark)]">
          <h3 className="text-lg font-bold text-[var(--color-white)] tracking-wide">Edit Media</h3>
          <button
            onClick={onClose}
            className="p-1 text-[var(--color-text-secondary-dark)] hover:text-[var(--color-white)] hover:bg-[var(--color-surface-hover-dark)] rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-dark)] mb-1.5">Title</label>
            <input
              type="text"
              value={editingMedia.title}
              onChange={(e) => onEditingMediaChange({ ...editingMedia, title: e.target.value })}
              className="w-full bg-[var(--color-bg-dark)] border border-[var(--color-border-dark)] rounded-xl px-4 py-3 text-sm text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-dark)] mb-1.5">Category</label>
            <div className="relative">
              <select
                value={editingMedia.category}
                onChange={(e) => onEditingMediaChange({ ...editingMedia, category: e.target.value })}
                className="appearance-none w-full bg-[var(--color-bg-dark)] border border-[var(--color-border-dark)] rounded-xl px-4 py-3 text-sm text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent cursor-pointer"
              >
                {categories.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat} className="bg-[var(--color-bg-dark)] text-[var(--color-white)]">{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary-dark)] pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-dark)] mb-1.5">Status</label>
            <div className="relative">
              <select
                value={editingMedia.status}
                onChange={(e) => onEditingMediaChange({ ...editingMedia, status: e.target.value })}
                className="appearance-none w-full bg-[var(--color-bg-dark)] border border-[var(--color-border-dark)] rounded-xl px-4 py-3 text-sm text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent cursor-pointer"
              >
                <option value="Published" className="bg-[var(--color-bg-dark)] text-[var(--color-white)]">Published</option>
                <option value="Draft" className="bg-[var(--color-bg-dark)] text-[var(--color-white)]">Draft</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary-dark)] pointer-events-none" />
            </div>
          </div>

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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
