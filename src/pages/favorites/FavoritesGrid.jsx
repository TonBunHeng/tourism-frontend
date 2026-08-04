import { Heart, MapPin, Star, Clock, Users, Calendar, Check, Eye, Trash2 } from 'lucide-react';



export default function FavoritesGrid({
  favorites,
  selectedFavorites,
  onToggleSelect,
  onToggleVisited,
  onViewDetails,
  onDelete
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-6">
      {favorites.length > 0 ? (
        favorites.map((favorite) => {
          const FavoriteIcon = favorite.icon;
          const isSelected = selectedFavorites.includes(favorite.id);
          return (
            <div
              key={favorite.id}
              className={`group relative bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)]/50 border rounded-xl p-5 hover:shadow-lg transition-all duration-200 lg:hover:scale-[1.02] ${isSelected ? 'border-[var(--color-rose-badge-text)] dark:border-[var(--color-rose-badge-dark-text)] ring-2 ring-[var(--color-rose-badge-text)] dark:ring-[var(--color-rose-badge-dark-text)]' : 'border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]'
                }`}
            >
              <div className="absolute top-3 left-3 z-10">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggleSelect(favorite.id)}
                  className="w-4 h-4 text-[var(--color-rose-badge-text)] border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded focus:ring-[var(--color-input)] dark:bg-[var(--color-bg-dark)] dark:checked:bg-[var(--color-rose-badge-text)] cursor-pointer"
                />
              </div>

              <div className="absolute top-3 right-3 z-10">
                <Heart className="w-5 h-5 fill-[var(--color-rose-badge-text)] text-[var(--color-rose-badge-text)]" />
              </div>

              <div className="flex items-start gap-3 mb-3 mt-2">
                <div className="w-14 h-14 flex-shrink-0 rounded-xl bg-[var(--color-rose-badge-bg)] dark:bg-[var(--color-rose-badge-dark-bg)] flex items-center justify-center">
                  <FavoriteIcon className="w-7 h-7 text-[var(--color-rose-badge-text)] dark:text-[var(--color-rose-badge-dark-text)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] text-sm truncate">{favorite.name}</h3>
                  <span className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] flex items-center gap-1">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{favorite.location}</span>
                  </span>
                </div>
              </div>

              <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-3 line-clamp-2">{favorite.description}</p>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] min-w-0">
                  <Star className="w-3.5 h-3.5 fill-[var(--color-amber-star)] text-[var(--color-amber-star)] flex-shrink-0" />
                  <span>{favorite.rating}</span>
                  <span className="text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] truncate">({favorite.reviews})</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] min-w-0">
                  <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{favorite.bestTime}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] min-w-0">
                  <Users className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{favorite.visitors.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] min-w-0">
                  <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{favorite.savedDate}</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-3 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full border flex-shrink-0 ${favorite.visited
                    ? 'bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)] text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] border-[var(--color-success-border)] dark:border-[var(--color-success-dark-border)]'
                    : 'bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] border-[var(--color-info-border)] dark:border-[var(--color-info-dark-border)]'
                  }`}>
                  {favorite.visited ? (
                    <><Check className="w-3 h-3" /> Visited</>
                  ) : (
                    <><Clock className="w-3 h-3" /> To Visit</>
                  )}
                </span>
                <div className="flex gap-1 flex-shrink-0">
                  <button
                    onClick={() => onToggleVisited(favorite.id)}
                    className="p-1.5 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-lg transition-colors"
                    title={favorite.visited ? 'Mark as not visited' : 'Mark as visited'}
                  >
                    <Check className="w-3.5 h-3.5 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
                  </button>
                  <button
                    onClick={() => onViewDetails(favorite)}
                    className="p-1.5 hover:bg-[var(--color-purple-badge-bg)] dark:hover:bg-[var(--color-purple-badge-dark-bg)] rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-3.5 h-3.5 text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)]" />
                  </button>
                  <button
                    onClick={() => onDelete(favorite.id)}
                    className="p-1.5 hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] rounded-lg transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)]" />
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="col-span-full text-center py-12">
          <div className="mb-4 flex justify-center">
            <Heart className="w-12 h-12 text-[var(--color-rose-badge-text)] dark:text-[var(--color-rose-badge-dark-text)]" />
          </div>
          <h3 className="text-lg font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">No favorites found</h3>
          <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
