import { X, Layers, Check, Edit, FolderTree } from 'lucide-react';

export default function CategoryDetailsModal({
  isOpen,
  category,
  onClose,
  onEdit
}) {
  if (!isOpen || !category) return null;

  const IconComponent = category.icon || FolderTree;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[#111827] text-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${category.color}20` }}
            >
              <IconComponent className="w-5 h-5" style={{ color: category.color }} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">Category Details</h3>
              <p className="text-xs text-gray-400">ID: #{category.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Category Name</span>
            <p className="text-base font-semibold text-white mt-1">{category.name}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Places</span>
              <p className="text-sm font-medium text-blue-400 mt-1 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                {category.placeCount} places
              </p>
            </div>
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Status</span>
              <p className="text-sm font-medium text-green-400 mt-1 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                {category.status}
              </p>
            </div>
          </div>

          <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Description</span>
            <p className="text-sm text-gray-300 mt-1">{category.description}</p>
          </div>

          <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Created Date</span>
            <p className="text-sm text-gray-300 mt-1">{category.createdAt}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-800 bg-[#111827]">
          <button
            type="button"
            onClick={() => {
              const cat = category;
              onClose();
              onEdit(cat);
            }}
            className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit Category
          </button>
        </div>
      </div>
    </div>
  );
}
