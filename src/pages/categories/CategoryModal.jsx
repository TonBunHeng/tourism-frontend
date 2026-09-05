import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function CategoryModal({
  isOpen,
  editingCategory,
  formData = {},
  onFormDataChange,
  onFormChange,
  onClose,
  onSubmit
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose?.();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const data = formData || {};

  const updateForm = (updated) => {
    if (onFormDataChange) {
      onFormDataChange(updated);
    } else if (onFormChange) {
      onFormChange(updated);
    }
  };

  const colors = ["#8B5CF6", "#EC4899", "#3B82F6", "#F59E0B", "#10B981", "#EF4444", "#6366F1", "#14B8A6"];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(e);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-alert-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] rounded-xl max-w-lg w-full shadow-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden animate-alert-popup flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-zinc-800 shrink-0">
          <h3 className="text-base font-bold text-gray-900 dark:text-zinc-100">
            {editingCategory ? "Edit Category" : "Add New Category"}
          </h3>
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-all active:scale-90 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleFormSubmit}>
          <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Category Name *</label>
              <input
                type="text"
                value={data.name || ''}
                onChange={(e) => updateForm({ ...data, name: e.target.value })}
                placeholder="e.g. Temple, Beach, Mountain, Waterfall"
                className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] dark:placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Status</label>
              <select
                value={data.status || 'Active'}
                onChange={(e) => updateForm({ ...data, status: e.target.value })}
                className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all cursor-pointer"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Description</label>
              <textarea
                value={data.description || ''}
                onChange={(e) => updateForm({ ...data, description: e.target.value })}
                placeholder="Enter description for this category..."
                rows="3"
                className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] dark:placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Color Theme</label>
              <div className="flex gap-2 flex-wrap pt-1">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => updateForm({ ...data, color })}
                    className={`w-7 h-7 rounded-full border-2 transition-colors cursor-pointer ${data.color === color ? "border-[#003E83] dark:border-white ring-2 ring-[#003E83]/40" : "border-transparent"}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 px-6 py-4 border-t border-gray-200 dark:border-zinc-800 bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)]">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-md border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 font-medium text-sm transition-colors text-center cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={!data?.name?.trim()}
              className="flex-1 py-2.5 px-4 rounded-md bg-[#003E83] hover:bg-[#002e62] text-white font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-center cursor-pointer"
            >
              {editingCategory ? "Update Category" : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
