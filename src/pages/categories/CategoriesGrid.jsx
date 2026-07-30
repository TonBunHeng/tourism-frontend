import { Eye, Edit, Trash2, Clock, FolderTree } from 'lucide-react';

export const getStatusColor = (status) => {
  return status === "Active" 
    ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800" 
    : "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-700/50 dark:text-gray-400 dark:border-gray-600";
};

export default function CategoriesGrid({
  categories,
  onView,
  onEdit,
  onDelete
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-6">
      {categories.length > 0 ? (
        categories.map((category) => {
          const IconComponent = category.icon || FolderTree;
          return (
            <div 
              key={category.id} 
              className="group relative bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl p-5 hover:shadow-lg transition-all duration-200 lg:hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div 
                    className="w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <IconComponent size={24} style={{ color: category.color }} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{category.name}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{category.placeCount} places</span>
                  </div>
                </div>
                {/* Actions */}
                <div className="flex gap-1 flex-shrink-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => onView(category.id)}
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="View"
                  >
                    <Eye className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button 
                    onClick={() => onEdit(category)}
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button 
                    onClick={() => onDelete(category.id)}
                    className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{category.description}</p>
              <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full border flex-shrink-0 ${getStatusColor(category.status)}`}>
                  <Clock className="w-3 h-3" />
                  {category.status}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500 truncate">Created: {category.createdAt}</span>
              </div>
            </div>
          );
        })
      ) : (
        <div className="col-span-full text-center py-12">
          <div className="flex justify-center mb-4">
            <FolderTree className="w-16 h-16 text-gray-400" />
          </div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">No categories found</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Try adjusting your search</p>
        </div>
      )}
    </div>
  );
}
