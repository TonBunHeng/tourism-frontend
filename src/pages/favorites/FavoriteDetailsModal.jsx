import { MapPin, X, Trash2, Clock, Check } from 'lucide-react';
import { renderStars } from '../../utils/StatusUtils';

export default function FavoriteDetailsModal({
  isOpen,
  favorite,
  onClose,
  onDelete,
  onToggleVisited
}) {
  if (!isOpen || !favorite) return null;

  const FavoriteIcon = favorite.icon;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] rounded-xl max-w-lg w-full shadow-2xl border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-rose-50 dark:bg-[var(--color-rose-badge-dark-bg)] flex items-center justify-center">
              <FavoriteIcon className="w-5 h-5 text-rose-600 dark:text-[var(--color-rose-badge-dark-text)]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] tracking-wide">Place Details</h3>
              <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">ID: #{favorite.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:text-[var(--color-text-primary-light)] dark:hover:text-[var(--color-white)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Place Name</span>
            <p className="text-base font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mt-1">{favorite.name}</p>
            <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5" /> {favorite.location}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 p-3.5 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Category & Status</span>
              <p className="text-sm font-medium text-rose-600 dark:text-[var(--color-rose-badge-dark-text)] mt-1">{favorite.category}</p>
              <p className="text-xs text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] mt-0.5">{favorite.visited ? 'Visited' : 'To Visit'}</p>
            </div>
            <div className="bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 p-3.5 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Rating</span>
              <div className="flex items-center gap-1.5 mt-1">
                {renderStars(favorite.rating)}
                <span className="text-sm font-medium text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)]">({favorite.rating})</span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-0.5">{favorite.reviews} reviews</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 p-3.5 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Best Time & Duration</span>
              <p className="text-sm font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mt-1">{favorite.bestTime}</p>
              <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-0.5">{favorite.duration}</p>
            </div>
            <div className="bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 p-3.5 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Price & Visitors</span>
              <p className="text-sm font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mt-1">{favorite.price}</p>
              <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-0.5">{favorite.visitors.toLocaleString()} visitors</p>
            </div>
          </div>

          <div className="bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 p-3.5 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Description</span>
            <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1 leading-relaxed">{favorite.description}</p>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] block mb-1.5">Tags</span>
            <div className="flex flex-wrap gap-1.5">
              {favorite.tags.map((tag, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-[var(--color-neutral-badge-bg)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] rounded-lg text-xs border border-[var(--color-neutral-badge-border)] dark:border-[var(--color-border-dark)]">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)]">
          <button
            type="button"
            onClick={() => {
              const fav = favorite;
              onClose();
              onDelete(fav.id);
            }}
            className="py-2.5 px-4 rounded-md bg-[var(--color-danger-bg)] dark:bg-[var(--color-danger-dark-bg)] hover:bg-[var(--color-danger-border)] dark:hover:bg-[var(--color-danger-dark-bg)]/80 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] font-medium text-sm transition-colors flex items-center gap-2 border border-[var(--color-danger-border)] dark:border-[var(--color-danger-dark-border)]"
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </button>
          <button
            type="button"
            onClick={() => {
              onToggleVisited(favorite.id);
              onClose();
            }}
            className="py-2.5 px-4 rounded-md bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-white)] font-medium text-sm transition-colors flex items-center gap-2"
          >
            {favorite.visited ? <Clock className="w-4 h-4" /> : <Check className="w-4 h-4" />}
            {favorite.visited ? 'Mark as To Visit' : 'Mark as Visited'}
          </button>
        </div>
      </div>
    </div>
  );
}
