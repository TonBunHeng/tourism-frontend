import { Search, ChevronDown, Grid3x3, List } from 'lucide-react';

export default function ProvincesToolbar({
  searchTerm,
  onSearchChange,
  selectedType,
  onTypeChange,
  provinceTypes,
  viewMode,
  onViewModeChange
}) {
  return (
    <div className="px-4 md:px-6 py-4 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-lg md:text-xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">All Regions</h2>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]" />
            <input
              type="text"
              placeholder="Search provinces..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 pr-4 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent w-full sm:w-48 text-sm bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]"
            />
          </div>

          <div className="flex gap-3">
            {/* Type Filter */}
            <div className="relative flex-1 sm:flex-none">
              <select
                value={selectedType}
                onChange={(e) => onTypeChange(e.target.value)}
                className="appearance-none w-full pl-4 pr-10 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] text-sm cursor-pointer"
              >
                {provinceTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] pointer-events-none" />
            </div>

            {/* View Toggle */}
            <div className="flex bg-[var(--color-border-light)] dark:bg-[var(--color-surface-hover-dark)] rounded-xl p-1 flex-shrink-0">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] shadow-sm' : 'hover:bg-[var(--color-border-subtle-light)] dark:hover:bg-[var(--color-bg-dark)]'}`}
              >
                <Grid3x3 className="w-4 h-4 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
              </button>
              <button
                onClick={() => onViewModeChange('list')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] shadow-sm' : 'hover:bg-[var(--color-border-subtle-light)] dark:hover:bg-[var(--color-bg-dark)]'}`}
              >
                <List className="w-4 h-4 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
