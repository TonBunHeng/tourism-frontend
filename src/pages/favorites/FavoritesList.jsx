import { MapPin, Check, Clock, Eye, Trash2, Heart } from 'lucide-react';
import { renderStars } from '../../utils/StatusUtils';

export default function FavoritesList({
  favorites,
  selectedFavorites,
  onToggleSelect,
  onSelectAll,
  isAllSelected,
  onToggleVisited,
  onViewDetails,
  onDelete,
  startIndex = 0
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-[var(--color-border-subtle-light)] dark:divide-[var(--color-border-dark)]">
        <thead className="bg-[var(--color-surface-hover-light)]/50 dark:bg-[var(--color-surface-hover-dark)]/50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={onSelectAll}
                className="w-4 h-4 text-[var(--color-rose-badge-text)] border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded focus:ring-[var(--color-input)] dark:bg-[var(--color-bg-dark)] dark:checked:bg-[var(--color-rose-badge-text)] cursor-pointer"
              />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">#</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">Place</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">Rating</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] divide-y divide-[var(--color-border-subtle-light)] dark:divide-[var(--color-border-dark)]">
          {favorites.length > 0 ? (
            favorites.map((favorite, index) => {
              const FavoriteIcon = favorite.icon;
              return (
                <tr key={favorite.id} className="hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)]/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedFavorites.includes(favorite.id)}
                      onChange={() => onToggleSelect(favorite.id)}
                      className="w-4 h-4 text-[var(--color-rose-badge-text)] border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded focus:ring-[var(--color-input)] dark:bg-[var(--color-bg-dark)] dark:checked:bg-[var(--color-rose-badge-text)] cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-mono">
                    {String(startIndex + index + 1).padStart(2, '0')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-[var(--color-rose-badge-bg)] dark:bg-[var(--color-rose-badge-dark-bg)] flex items-center justify-center flex-shrink-0">
                        <FavoriteIcon className="w-5 h-5 text-[var(--color-rose-badge-text)] dark:text-[var(--color-rose-badge-dark-text)]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{favorite.name}</p>
                        <p className="text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {favorite.location}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-[var(--color-rose-badge-bg)] dark:bg-[var(--color-rose-badge-dark-bg)] text-[var(--color-rose-badge-text)] dark:text-[var(--color-rose-badge-dark-text)] border border-[var(--color-rose-badge-border)] dark:border-[var(--color-rose-badge-dark-border)]">
                      {favorite.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {renderStars(favorite.rating)}
                      <span className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] ml-1">({favorite.reviews})</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${favorite.visited
                      ? 'bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)] text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] border-[var(--color-success-border)] dark:border-[var(--color-success-dark-border)]'
                      : 'bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] border-[var(--color-info-border)] dark:border-[var(--color-info-dark-border)]'
                      }`}>
                      {favorite.visited ? (
                        <><Check className="w-3 h-3" /> Visited</>
                      ) : (
                        <><Clock className="w-3 h-3" /> To Visit</>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onToggleVisited(favorite.id)}
                        className="p-1.5 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-lg transition-colors cursor-pointer"
                        title={favorite.visited ? 'Mark as not visited' : 'Mark as visited'}
                      >
                        <Check className="w-4 h-4 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onViewDetails(favorite)}
                        className="p-1.5 text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)] hover:bg-[var(--color-purple-badge-bg)] dark:hover:bg-[var(--color-purple-badge-dark-bg)] rounded-lg transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(favorite.id)}
                        className="p-1.5 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] rounded-lg transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-12">
                <div className="mb-4 flex justify-center">
                  <Heart className="w-12 h-12 text-[var(--color-rose-badge-text)] dark:text-[var(--color-rose-badge-dark-text)]" />
                </div>
                <h3 className="text-lg font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">No favorites found</h3>
                <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Try adjusting your search or filter criteria</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
