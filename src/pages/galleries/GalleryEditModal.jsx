import { X, ChevronDown, Upload, Trash2 } from 'lucide-react';

export default function GalleryEditModal({
  isOpen,
  editingMedia,
  onEditingMediaChange,
  onClose,
  onSubmit,
  categories
}) {
  if (!isOpen || !editingMedia) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const isVideo = file.type.startsWith('video/');
      const reader = new FileReader();
      reader.onloadend = () => {
        onEditingMediaChange({
          ...editingMedia,
          url: reader.result,
          type: isVideo ? 'video' : 'image'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] rounded-xl max-w-lg w-full shadow-2xl border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
          <h3 className="text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] tracking-wide">Edit Media</h3>
          <button
            onClick={onClose}
            className="p-1 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:text-[var(--color-text-primary-light)] dark:hover:text-[var(--color-white)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Title</label>
            <input
              type="text"
              value={editingMedia.title}
              onChange={(e) => onEditingMediaChange({ ...editingMedia, title: e.target.value })}
              className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Picture / Video Upload & Preview Field */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Media File (Picture / Video)</label>

            {editingMedia.url ? (
              <div className="relative w-full h-44 rounded-lg overflow-hidden border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] group shadow-sm">
                {editingMedia.type === 'video' ? (
                  <video src={editingMedia.url} className="w-full h-full object-cover" controls />
                ) : (
                  <img src={editingMedia.url} alt={editingMedia.title} className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <label className="p-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-md text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-md transition-colors">
                    <Upload className="w-4 h-4" />
                    Change Media
                    <input type="file" accept="image/*,video/*" className="hidden" onChange={handleFileChange} />
                  </label>
                  <button
                    type="button"
                    onClick={() => onEditingMediaChange({ ...editingMedia, url: '' })}
                    className="p-2.5 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs font-medium flex items-center gap-1 cursor-pointer shadow-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <label className="border-2 border-dashed border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 rounded-lg p-6 text-center hover:border-[var(--color-primary)] transition-colors cursor-pointer block">
                <Upload className="w-8 h-8 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mx-auto mb-2" />
                <p className="text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] font-medium text-xs">Drop picture/video here or click to upload</p>
                <input type="file" accept="image/*,video/*" className="hidden" onChange={handleFileChange} />
              </label>
            )}

            <input
              type="url"
              value={editingMedia.url}
              onChange={(e) => onEditingMediaChange({ ...editingMedia, url: e.target.value })}
              placeholder="Or enter media URL (https://...)"
              className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md px-4 py-2.5 text-xs text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Media Type</label>
              <div className="relative">
                <select
                  value={editingMedia.type || 'image'}
                  onChange={(e) => onEditingMediaChange({ ...editingMedia, type: e.target.value })}
                  className="appearance-none w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent cursor-pointer"
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Category</label>
              <div className="relative">
                <select
                  value={editingMedia.category}
                  onChange={(e) => onEditingMediaChange({ ...editingMedia, category: e.target.value })}
                  className="appearance-none w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent cursor-pointer"
                >
                  {categories.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] pointer-events-none" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Status</label>
            <div className="relative">
              <select
                value={editingMedia.status}
                onChange={(e) => onEditingMediaChange({ ...editingMedia, status: e.target.value })}
                className="appearance-none w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent cursor-pointer"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] font-medium text-sm transition-colors text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-md bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-white)] font-medium text-sm transition-colors shadow-lg shadow-[var(--color-primary)]/25 text-center"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
