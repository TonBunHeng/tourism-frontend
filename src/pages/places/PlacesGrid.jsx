import { Star, MapPin, CheckCircle, Eye, Edit, Trash2 } from 'lucide-react';

export default function PlacesGrid({ places, onViewPlace, onEditPlace, onDeletePlace }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-6">
      {places.length > 0 ? (
        places.map((place) => (
          <div key={place.id} className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)]/50 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl p-4 hover:shadow-lg transition-all duration-200 group">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-gradient-to-br from-[var(--color-info-bg)] to-[var(--color-purple-badge-bg)] dark:from-[var(--color-info-dark-bg)] dark:to-[var(--color-purple-badge-dark-bg)] flex items-center justify-center">
                  <place.icon className="w-5 h-5 text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] text-sm truncate">{place.name}</h3>
                  <span className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">{place.category}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star className="w-3 h-3 fill-[var(--color-warning-text)] text-[var(--color-warning-text)]" />
                <span className="text-sm font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{place.rating}</span>
              </div>
            </div>
            <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] flex items-start gap-1 mb-3">
              <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5" />
              <span className="line-clamp-2">{place.address}</span>
            </p>
            <div className="flex items-center justify-between gap-2 pt-3 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)] text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] border border-[var(--color-success-border)] dark:border-[var(--color-success-dark-border)] flex-shrink-0">
                <CheckCircle className="w-3 h-3" />
                {place.status}
              </span>
              <div className="flex items-center gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onViewPlace(place.id)}
                  className="p-1.5 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-lg"
                  title="View"
                >
                  <Eye className="w-3.5 h-3.5 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
                </button>
                <button
                  onClick={() => onEditPlace(place)}
                  className="p-1.5 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-lg"
                  title="Edit"
                >
                  <Edit className="w-3.5 h-3.5 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
                </button>
                <button
                  onClick={() => onDeletePlace(place.id)}
                  className="p-1.5 hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] rounded-lg"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)]" />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <div className="text-6xl mb-4">📍</div>
          <h3 className="text-lg font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">No places found</h3>
          <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
