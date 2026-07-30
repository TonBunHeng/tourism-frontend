import { Search, Grid3x3, List, ChevronDown, X } from 'lucide-react';

export default function UsersToolbar({
  totalCount,
  viewMode,
  onViewModeChange,
  searchTerm,
  onSearchChange,
  selectedRole,
  onRoleChange,
  roles,
  selectedStatus,
  onStatusChange,
  statuses,
  selectedSubscription,
  onSubscriptionChange,
  subscriptions,
  sortBy,
  onSortChange,
  onClearFilters
}) {
  const hasActiveFilters = searchTerm || selectedRole !== 'All' || selectedStatus !== 'All' || selectedSubscription !== 'All';

  return (
    <div className="px-4 sm:px-6 py-4 border-b border-gray-100 dark:border-gray-700">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">All Users</h2>
            <span className="text-sm text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2.5 py-0.5 rounded-full">
              {totalCount}
            </span>
          </div>

          {/* View Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1 shrink-0">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}`}
              title="Grid View"
            >
              <Grid3x3 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}`}
              title="List View"
            >
              <List className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
          {/* Role Filter */}
          <div className="relative">
            <select
              value={selectedRole}
              onChange={(e) => onRoleChange(e.target.value)}
              className="appearance-none w-full pl-4 pr-9 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm cursor-pointer"
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="appearance-none w-full pl-4 pr-9 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm cursor-pointer"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Subscription Filter */}
          <div className="relative">
            <select
              value={selectedSubscription}
              onChange={(e) => onSubscriptionChange(e.target.value)}
              className="appearance-none w-full pl-4 pr-9 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm cursor-pointer"
            >
              {subscriptions.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Sort By */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none w-full pl-4 pr-9 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="most_reviews">Most Reviews</option>
              <option value="most_active">Most Active</option>
              <option value="most_favorites">Most Favorites</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="col-span-2 sm:col-span-1 px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors flex items-center justify-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
