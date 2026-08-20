import React from 'react';
import {
  MapPin,
  Star,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Landmark,
  Check,
  Calendar,
  User
} from 'lucide-react';
import { renderStars } from '../../utils/StatusUtils';

export default function FavoritesList({
  favorites = [],
  selectedFavorites = [],
  setSelectedFavorites,
  onToggleSelect,
  onSelectAll,
  isAllSelected = false,
  onToggleVisited,
  onToggleStatus,
  onDelete,
  onViewDetails,
  onView,
  startIndex = 0
}) {
  const handleToggleVisit = (id) => {
    if (onToggleVisited) onToggleVisited(id);
    else if (onToggleStatus) onToggleStatus(id);
  };

  const handleView = (favorite) => {
    if (onView) onView(favorite);
    else if (onViewDetails) onViewDetails(favorite);
  };

  const handleDelete = (id) => {
    if (onDelete) onDelete(id);
  };

  const handleSelectOne = (id) => {
    if (onToggleSelect) {
      onToggleSelect(id);
    } else if (setSelectedFavorites) {
      setSelectedFavorites(prev =>
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
    }
  };

  if (!favorites || favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--color-rose-badge-bg)] dark:bg-[var(--color-rose-badge-dark-bg)] text-[var(--color-rose-badge-text)] dark:text-[var(--color-rose-badge-dark-text)] flex items-center justify-center mb-4 border border-[var(--color-rose-badge-border)] dark:border-[var(--color-rose-badge-dark-border)]">
          <Landmark className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">
          No Favorite Destinations Found
        </h3>
        <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] max-w-md">
          No user favorites match your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-[var(--color-border-subtle-light)] dark:divide-[var(--color-border-dark)]">
        <thead className="bg-[var(--color-surface-hover-light)]/50 dark:bg-[var(--color-surface-hover-dark)]/50">
          <tr>
            <th className="w-10 px-4 py-3 text-center">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={onSelectAll}
                aria-label="Select all favorites"
                className="w-4 h-4 rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)] border-gray-300 dark:border-zinc-600 cursor-pointer"
              />
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">
              #
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">
              Place & Destination
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">
              Favorited By (Traveler)
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">
              Place Rating
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">
              Status
            </th>
            <th className="px-5 py-3 text-right text-xs font-semibold text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] divide-y divide-[var(--color-border-subtle-light)] dark:divide-[var(--color-border-dark)]">
          {favorites.map((favorite, index) => {
            const IconComponent = favorite.icon || Landmark;
            const isVisited = Boolean(favorite.visited || favorite.status === 'Visited');
            const isSelected = selectedFavorites.includes(favorite.id);
            const ratingVal = Number(favorite.rating || favorite.place?.rating || 5.0).toFixed(1);
            const reviewsCount = favorite.reviewsCount ?? favorite.reviews ?? favorite.place?.reviews_count ?? 0;

            const userInfo = favorite.user || {};
            const userName = userInfo.name || favorite.user_name || 'Traveler';
            const userAvatar = userInfo.avatar || favorite.user_avatar || null;
            const userEmail = userInfo.email || favorite.user_email || 'user@angkorverses.com';
            const userVerified = Boolean(userInfo.verified);
            const savedDate = favorite.saved_date || (favorite.created_at ? new Date(favorite.created_at).toLocaleDateString() : 'Recent');

            return (
              <tr
                key={favorite.id}
                className={`hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)]/50 transition-colors group ${
                  isSelected ? 'bg-[var(--color-primary)]/5 dark:bg-[var(--color-primary)]/10' : ''
                }`}
              >
                <td className="px-4 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleSelectOne(favorite.id)}
                    aria-label={`Select ${favorite.name}`}
                    className="w-4 h-4 rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)] border-gray-300 dark:border-zinc-600 cursor-pointer"
                  />
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-mono">
                  {startIndex + index + 1}
                </td>
                <td className="px-5 py-4 min-w-[220px]">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg overflow-hidden bg-slate-100 dark:bg-zinc-800 shrink-0 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] flex items-center justify-center">
                      {favorite.image ? (
                        <img
                          src={favorite.image}
                          alt={favorite.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=600';
                          }}
                        />
                      ) : (
                        <IconComponent className="w-5 h-5 text-[var(--color-primary)] opacity-50" />
                      )}
                    </div>
                    <div className="min-w-0 max-w-xs">
                      <p
                        onClick={() => handleView(favorite)}
                        className="text-sm font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] truncate cursor-pointer hover:text-[var(--color-primary)] dark:hover:text-[var(--color-info-dark-text)]"
                      >
                        {favorite.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className="px-2 py-0.2 text-[10px] font-semibold rounded-full bg-[var(--color-rose-badge-bg)] dark:bg-[var(--color-rose-badge-dark-bg)] text-[var(--color-rose-badge-text)] dark:text-[var(--color-rose-badge-dark-text)] border border-[var(--color-rose-badge-border)] dark:border-[var(--color-rose-badge-dark-border)]">
                          {favorite.category}
                        </span>
                        <p className="text-[11px] text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] flex items-center gap-1 truncate">
                          <MapPin className="w-3 h-3 text-[var(--color-rose-badge-text)] shrink-0" />
                          <span className="truncate">{favorite.location}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Traveler / User info column */}
                <td className="px-5 py-4 min-w-[200px]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] flex items-center justify-center font-bold text-xs shrink-0 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden">
                      {userAvatar ? (
                        <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] truncate">
                          {userName}
                        </span>
                        {userVerified && (
                          <span className="text-[9px] text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] font-semibold bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] px-1 rounded-full">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] truncate">
                        {userEmail}
                      </p>
                      <span className="text-[10px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] flex items-center gap-1 mt-0.5">
                        <Calendar className="w-2.5 h-2.5" /> Saved: {savedDate}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Rating Column */}
                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    {renderStars(favorite.rating || favorite.place?.rating)}
                    <span className="text-xs font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                      {ratingVal}
                    </span>
                    <span className="text-[11px] text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]">
                      ({reviewsCount})
                    </span>
                  </div>
                </td>

                {/* Status Column */}
                <td className="px-5 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full border ${
                      isVisited
                        ? 'bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)] text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] border-[var(--color-success-border)] dark:border-[var(--color-success-dark-border)]'
                        : 'bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] border-[var(--color-info-border)] dark:border-[var(--color-info-dark-border)]'
                    }`}
                  >
                    {isVisited ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" /> Visited
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3" /> To Visit
                      </>
                    )}
                  </span>
                </td>

                {/* Actions Column */}
                <td className="px-5 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => handleToggleVisit(favorite.id)}
                      className="p-1.5 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:text-[var(--color-success-text)] rounded-lg transition-colors cursor-pointer"
                      title={isVisited ? 'Mark as to visit' : 'Mark as visited'}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleView(favorite)}
                      className="p-1.5 text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)] hover:bg-[var(--color-purple-badge-bg)] dark:hover:bg-[var(--color-purple-badge-dark-bg)] rounded-lg transition-colors cursor-pointer"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(favorite.id || favorite.place_id)}
                      className="p-1.5 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] rounded-lg transition-colors cursor-pointer"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
