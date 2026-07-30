import { X } from 'lucide-react';

export default function CategoryModal({
  isOpen,
  editingCategory,
  formData,
  onFormDataChange,
  onClose,
  onSubmit
}) {
  if (!isOpen) return null;

  const colors = ["#8B5CF6", "#EC4899", "#3B82F6", "#F59E0B", "#10B981", "#EF4444", "#6366F1", "#14B8A6"];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[#111827] text-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <h3 className="text-lg font-bold text-white tracking-wide">
            {editingCategory ? "Edit Category" : "Add New Category"}
          </h3>
          <button 
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={onSubmit}>
          <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Category Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
                placeholder="Enter category name"
                className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Status</label>
              <select
                value={formData.status}
                onChange={(e) => onFormDataChange({ ...formData, status: e.target.value })}
                className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
              >
                <option value="Active" className="bg-[#1f2937] text-white">Active</option>
                <option value="Inactive" className="bg-[#1f2937] text-white">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => onFormDataChange({ ...formData, description: e.target.value })}
                placeholder="Enter category description"
                rows="3"
                className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Color Theme</label>
              <div className="flex gap-2 flex-wrap pt-1">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => onFormDataChange({ ...formData, color })}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${formData.color === color ? "border-white scale-110 shadow-lg" : "border-transparent hover:scale-105"}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-800 bg-[#111827]">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 font-medium text-sm transition-colors text-center"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={!formData.name.trim() || !formData.description.trim()}
              className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed text-center"
            >
              {editingCategory ? "Update Category" : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
