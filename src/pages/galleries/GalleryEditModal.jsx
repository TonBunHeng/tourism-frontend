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
      <div className="bg-[#111827] text-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <h3 className="text-lg font-bold text-white tracking-wide">Edit Media</h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Title</label>
            <input
              type="text"
              value={editingMedia.title}
              onChange={(e) => onEditingMediaChange({ ...editingMedia, title: e.target.value })}
              className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Category</label>
            <div className="relative">
              <select
                value={editingMedia.category}
                onChange={(e) => onEditingMediaChange({ ...editingMedia, category: e.target.value })}
                className="appearance-none w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              >
                {categories.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat} className="bg-[#1f2937] text-white">{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Status</label>
            <div className="relative">
              <select
                value={editingMedia.status}
                onChange={(e) => onEditingMediaChange({ ...editingMedia, status: e.target.value })}
                className="appearance-none w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              >
                <option value="Published" className="bg-[#1f2937] text-white">Published</option>
                <option value="Draft" className="bg-[#1f2937] text-white">Draft</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 font-medium text-sm transition-colors text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors shadow-lg shadow-blue-500/25 text-center"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
