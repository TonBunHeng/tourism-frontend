import { X, Upload, ChevronDown } from 'lucide-react';

export default function GalleryUploadModal({ isOpen, onClose, categories }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] rounded-3xl max-w-lg w-full shadow-2xl border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
          <h3 className="text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] tracking-wide">Upload Media</h3>
          <button
            onClick={onClose}
            className="p-1 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:text-[var(--color-text-primary-light)] dark:hover:text-[var(--color-white)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <div className="border-2 border-dashed border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 rounded-2xl p-8 text-center hover:border-[var(--color-input)] transition-colors cursor-pointer">
            <Upload className="w-10 h-10 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mx-auto mb-3" />
            <p className="text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] font-medium text-sm">Drop files here or click to upload</p>
            <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">Supports images and videos up to 50MB</p>
            <button type="button" className="mt-4 px-4 py-2 bg-[var(--color-primary)] text-[var(--color-white)] rounded-xl hover:bg-[var(--color-primary-hover)] transition-colors text-sm shadow-md shadow-[var(--color-primary)]/20">
              Choose Files
            </button>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Category</label>
            <div className="relative">
              <select className="appearance-none w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent cursor-pointer">
                <option className="bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Select category</option>
                {categories.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat} className="bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)]">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] font-medium text-sm transition-colors text-center"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-white)] font-medium text-sm transition-colors shadow-lg shadow-[var(--color-primary)]/25 text-center"
          >
            Upload Files
          </button>
        </div>
      </div>
    </div>
  );
}
