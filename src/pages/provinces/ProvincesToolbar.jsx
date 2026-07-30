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
    <div className="px-4 md:px-6 py-4 border-b border-gray-100 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">All Regions</h2>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search provinces..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-48 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex gap-3">
            {/* Type Filter */}
            <div className="relative flex-1 sm:flex-none">
              <select
                value={selectedType}
                onChange={(e) => onTypeChange(e.target.value)}
                className="appearance-none w-full pl-4 pr-10 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm cursor-pointer"
              >
                {provinceTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* View Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1 flex-shrink-0">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}`}
              >
                <Grid3x3 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>
              <button
                onClick={() => onViewModeChange('list')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}`}
              >
                <List className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
