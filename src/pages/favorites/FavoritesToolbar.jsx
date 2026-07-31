import { Search, ChevronDown, Grid3x3, List, X, Trash2, Check } from 'lucide-react';

export default function FavoritesToolbar({
  totalCount,
  selectedCount,
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  selectedStatus,
  onStatusChange,
  statuses,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onClearFilters,
  onBulkDelete,
  onBulkMarkVisited,
  onDeselectAll
}) {
  const hasActiveFilters = searchTerm || selectedCategory !== 'All' || selectedStatus !== 'All';

  return (
    <div className="px-4 md:px-6 py-4 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-lg md:text-xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">All Favorites</h2>
          <span className="text-sm text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] bg-[var(--color-border-light)] dark:bg-[var(--color-surface-hover-dark)] px-2.5 py-0.5 rounded-full">
            {totalCount}
          </span>
          {selectedCount > 0 && (
            <span className="text-sm text-[var(--color-rose-badge-text)] dark:text-[var(--color-rose-badge-dark-text)] bg-[var(--color-rose-badge-bg)] dark:bg-[var(--color-rose-badge-dark-bg)] px-2.5 py-0.5 rounded-full">
              {selectedCount} selected
            </span>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {/* Search */}
          <div className="relative flex-1 min-w-[140px] sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]" />
            <input
              type="text"
              placeholder="Search favorites..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent sm:w-40 text-sm bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] text-sm cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] text-sm cursor-pointer"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] pointer-events-none" />
          </div>

          {/* Sort By */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] text-sm cursor-pointer"
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
              <option value="most_reviews">Most Reviews</option>
              <option value="most_visitors">Most Visitors</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] pointer-events-none" />
          </div>

          {/* View Toggle */}
          <div className="flex bg-[var(--color-border-light)] dark:bg-[var(--color-surface-hover-dark)] rounded-xl p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] shadow-sm' : 'hover:bg-[var(--color-border-subtle-light)] dark:hover:bg-[var(--color-bg-dark)]'}`}
              title="Grid View"
            >
              <Grid3x3 className="w-4 h-4 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] shadow-sm' : 'hover:bg-[var(--color-border-subtle-light)] dark:hover:bg-[var(--color-bg-dark)]'}`}
              title="List View"
            >
              <List className="w-4 h-4 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
            </button>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="px-3 py-2 text-sm text-[var(--color-rose-badge-text)] dark:text-[var(--color-rose-badge-dark-text)] hover:bg-[var(--color-rose-badge-bg)] dark:hover:bg-[var(--color-rose-badge-dark-bg)] rounded-xl transition-colors flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedCount > 0 && (
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] flex-wrap">
          <span className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
            {selectedCount} place(s) selected
          </span>
          <button
            onClick={onBulkDelete}
            className="px-3 py-1.5 text-sm text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] rounded-lg transition-colors flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </button>
          <button
            onClick={onBulkMarkVisited}
            className="px-3 py-1.5 text-sm text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] hover:bg-[var(--color-success-bg)] dark:hover:bg-[var(--color-success-dark-bg)] rounded-lg transition-colors flex items-center gap-1"
          >
            <Check className="w-4 h-4" />
            Mark as Visited
          </button>
          <button
            onClick={onDeselectAll}
            className="px-3 py-1.5 text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-lg transition-colors"
          >
            Deselect All
          </button>
        </div>
      )}
    </div>
  );
}
