import React from 'react';
import { Eye, Edit, Trash2, Clock, Layers, FolderTree } from 'lucide-react';
import { getStatusColor } from '../../utils/StatusUtils';

export default function CategoriesList({
  categories = [],
  onView,
  onEdit,
  onDelete,
  onViewCategory,
  onEditCategory,
  onDeleteCategory,
  startIndex = 0
}) {
  const handleView = onView || onViewCategory || (() => {});
  const handleEdit = onEdit || onEditCategory || (() => {});
  const handleDeleteItem = onDelete || onDeleteCategory || (() => {});

  const safeCategories = categories || [];

  return (
    <>
      {/* Mobile Card List View (sm:hidden) */}
      <div className="sm:hidden divide-y divide-[var(--color-border-subtle-light)] dark:divide-[var(--color-border-dark)]">
        {safeCategories.length > 0 ? (
          safeCategories.map((category) => (
            <div key={category.id} className="p-4 flex flex-col gap-3 hover:bg-[var(--color-surface-hover-light)]/50 dark:hover:bg-[var(--color-surface-hover-dark)]/30 transition-colors">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: category.color || '#8B5CF6' }}
                    title={`Color Theme: ${category.color || '#8B5CF6'}`}
                  />
                  <p className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] truncate">
                    {category.name}
                  </p>
                </div>
                <span className={`shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-semibold rounded-full border ${getStatusColor(category.status)}`}>
                  <Clock className="w-3 h-3" />
                  {category.status}
                </span>
              </div>

              {category.description && (
                <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] line-clamp-2 leading-relaxed">
                  {category.description}
                </p>
              )}

              <div className="flex items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                  <Layers className="w-3.5 h-3.5 text-[var(--color-text-muted-light)]" />
                  <span className="font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                    {category.placeCount ?? category.places_count ?? 0}
                  </span>
                  <span>places</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleView(category)}
                    className="p-1.5 text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)] hover:bg-[var(--color-purple-badge-bg)] dark:hover:bg-[var(--color-purple-badge-dark-bg)] rounded-lg transition-colors cursor-pointer"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEdit(category)}
                    className="p-1.5 text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] hover:bg-[var(--color-info-bg)] dark:hover:bg-[var(--color-info-dark-bg)] rounded-lg transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(category.id)}
                    className="p-1.5 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] rounded-lg transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">No categories found</h3>
            <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Desktop Table View (hidden sm:block) */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full divide-y divide-[var(--color-border-subtle-light)] dark:divide-[var(--color-border-dark)]">
          <thead className="bg-[var(--color-surface-hover-light)]/50 dark:bg-[var(--color-surface-hover-dark)]/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">Places</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] divide-y divide-[var(--color-border-subtle-light)] dark:divide-[var(--color-border-dark)]">
            {safeCategories.length > 0 ? (
              safeCategories.map((category, index) => (
                <tr key={category.id} className="hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)]/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-mono">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                        style={{ backgroundColor: category.color || '#8B5CF6' }}
                        title={`Color Theme: ${category.color || '#8B5CF6'}`}
                      />
                      <p className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                        {category.name}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] max-w-xs truncate">
                    {category.description || '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]" />
                      <span className="text-sm font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                        {category.placeCount ?? category.places_count ?? 0}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(category.status)}`}>
                      <Clock className="w-3 h-3" />
                      {category.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleView(category)}
                        className="p-1.5 text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)] hover:bg-[var(--color-purple-badge-bg)] dark:hover:bg-[var(--color-purple-badge-dark-bg)] rounded-lg transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEdit(category)}
                        className="p-1.5 text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] hover:bg-[var(--color-info-bg)] dark:hover:bg-[var(--color-info-dark-bg)] rounded-lg transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(category.id)}
                        className="p-1.5 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] rounded-lg transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-12">
                  <h3 className="text-lg font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">No categories found</h3>
                  <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Try adjusting your search or filter criteria</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
