import { Eye, Edit, Trash2, Users, Navigation, Building2, Home, Star, Clock, Building } from 'lucide-react';

export const getStatusColor = (status) => {
  return status === 'Active'
    ? 'bg-[var(--color-success-bg)] text-[var(--color-success-text)] border-[var(--color-success-border)] dark:bg-[var(--color-success-dark-bg)] dark:text-[var(--color-success-dark-text)] dark:border-[var(--color-success-dark-border)]'
    : 'bg-[var(--color-neutral-badge-bg)] text-[var(--color-neutral-badge-text)] border-[var(--color-border-subtle-light)] dark:bg-[var(--color-neutral-badge-dark-bg)] dark:text-[var(--color-neutral-badge-dark-text)] dark:border-[var(--color-border-dark)]';
};

export const getTypeBadgeColor = (type) => {
  const colors = {
    'Capital City': 'bg-[var(--color-purple-badge-bg)] text-[var(--color-purple-badge-text)] border-[var(--color-purple-badge-border)] dark:bg-[var(--color-purple-badge-dark-bg)] dark:text-[var(--color-purple-badge-dark-text)] dark:border-[var(--color-purple-badge-dark-border)]',
    'Province': 'bg-[var(--color-info-bg)] text-[var(--color-info-text)] border-[var(--color-info-border)] dark:bg-[var(--color-info-dark-bg)] dark:text-[var(--color-info-dark-text)] dark:border-[var(--color-info-dark-border)]',
    'Municipality': 'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)] border-[var(--color-warning-border)] dark:bg-[var(--color-warning-dark-bg)] dark:text-[var(--color-warning-dark-text)] dark:border-[var(--color-warning-dark-border)]'
  };
  return colors[type] || 'bg-[var(--color-neutral-badge-bg)] text-[var(--color-neutral-badge-text)] border-[var(--color-border-subtle-light)] dark:bg-[var(--color-neutral-badge-dark-bg)] dark:text-[var(--color-neutral-badge-dark-text)] dark:border-[var(--color-border-dark)]';
};

export default function ProvincesGrid({ provinces, onViewProvince, onEditProvince, onDeleteProvince }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-6">
      {provinces.length > 0 ? (
        provinces.map((province) => {
          const IconComponent = province.icon || Building;
          return (
            <div
              key={province.id}
              className="group relative bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)]/50 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl p-5 hover:shadow-lg transition-all duration-200 lg:hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-[var(--color-info-bg)] to-[var(--color-purple-badge-bg)] dark:from-[var(--color-info-dark-bg)] dark:to-[var(--color-purple-badge-dark-bg)] flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] text-sm truncate">{province.name}</h3>
                    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full border ${getTypeBadgeColor(province.type)}`}>
                      {province.type}
                    </span>
                  </div>
                </div>
                {/* Actions: always visible on touch/mobile, fade in on hover for pointer devices */}
                <div className="flex gap-1 flex-shrink-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onViewProvince(province.id)}
                    className="p-1.5 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-lg transition-colors"
                    title="View"
                  >
                    <Eye className="w-3.5 h-3.5 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
                  </button>
                  <button
                    onClick={() => onEditProvince(province.id)}
                    className="p-1.5 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-3.5 h-3.5 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
                  </button>
                  <button
                    onClick={() => onDeleteProvince(province.id)}
                    className="p-1.5 hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)]" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-3 line-clamp-2">{province.description}</p>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] min-w-0">
                  <Users className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{province.population}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] min-w-0">
                  <Navigation className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{province.area}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] min-w-0">
                  <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{province.districts} Districts</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] min-w-0">
                  <Home className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{province.places} Places</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-3 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Star className="w-3.5 h-3.5 fill-[var(--color-warning-text)] text-[var(--color-warning-text)]" />
                  <span className="text-sm font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{province.rating}</span>
                </div>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full border flex-shrink-0 ${getStatusColor(province.status)}`}>
                  <Clock className="w-3 h-3" />
                  {province.status}
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <div className="col-span-full text-center py-12">
          <div className="text-6xl mb-4">🗺️</div>
          <h3 className="text-lg font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">No provinces found</h3>
          <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
