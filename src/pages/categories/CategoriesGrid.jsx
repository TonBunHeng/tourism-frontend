import { Eye, Edit, Trash2, Clock, FolderTree } from 'lucide-react';

export const getStatusColor = (status) => {
  return status === "Active" 
    ? "bg-[var(--color-success-bg)] text-[var(--color-success-text)] border-[var(--color-success-border)] dark:bg-[var(--color-success-dark-bg)] dark:text-[var(--color-success-dark-text)] dark:border-[var(--color-success-dark-border)]" 
    : "bg-[var(--color-neutral-badge-bg)] text-[var(--color-neutral-badge-text)] border-[var(--color-border-subtle-light)] dark:bg-[var(--color-neutral-badge-dark-bg)] dark:text-[var(--color-neutral-badge-dark-text)] dark:border-[var(--color-border-dark)]";
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
              className="group relative bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)]/50 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl p-5 hover:shadow-lg transition-all duration-200 lg:hover:scale-[1.02]"
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
                    <h3 className="font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] text-sm truncate">{category.name}</h3>
                    <span className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">{category.placeCount} places</span>
                  </div>
                </div>
                {/* Actions */}
                <div className="flex gap-1 flex-shrink-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => onView(category.id)}
                    className="p-1.5 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-lg transition-colors"
                    title="View"
                  >
                    <Eye className="w-3.5 h-3.5 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
                  </button>
                  <button 
                    onClick={() => onEdit(category)}
                    className="p-1.5 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-3.5 h-3.5 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
                  </button>
                  <button 
                    onClick={() => onDelete(category.id)}
                    className="p-1.5 hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)]" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-3 line-clamp-2">{category.description}</p>
              <div className="flex items-center justify-between gap-2 pt-3 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full border flex-shrink-0 ${getStatusColor(category.status)}`}>
                  <Clock className="w-3 h-3" />
                  {category.status}
                </span>
                <span className="text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] truncate">Created: {category.createdAt}</span>
              </div>
            </div>
          );
        })
      ) : (
        <div className="col-span-full text-center py-12">
          <div className="flex justify-center mb-4">
            <FolderTree className="w-16 h-16 text-[var(--color-text-muted-light)]" />
          </div>
          <h3 className="text-sm font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">No categories found</h3>
          <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">Try adjusting your search</p>
        </div>
      )}
    </div>
  );
}
