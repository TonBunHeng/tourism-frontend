import { MapPin, Check, Clock, Eye, Trash2, Heart } from 'lucide-react';
import { renderStars } from './FavoritesGrid';

export default function FavoritesList({
  favorites,
  selectedFavorites,
  onToggleSelect,
  onSelectAll,
  isAllSelected,
  onToggleVisited,
  onViewDetails,
  onDelete
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50/50 dark:bg-gray-700/50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={onSelectAll}
                className="w-4 h-4 text-rose-600 border-gray-300 dark:border-gray-600 rounded focus:ring-rose-500 dark:bg-gray-700 dark:checked:bg-rose-600 cursor-pointer"
              />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">#</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Place</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rating</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
          {favorites.length > 0 ? (
            favorites.map((favorite, index) => {
              const FavoriteIcon = favorite.icon;
              return (
                <tr key={favorite.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedFavorites.includes(favorite.id)}
                      onChange={() => onToggleSelect(favorite.id)}
                      className="w-4 h-4 text-rose-600 border-gray-300 dark:border-gray-600 rounded focus:ring-rose-500 dark:bg-gray-700 dark:checked:bg-rose-600 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-400">
                    {String(index + 1).padStart(2, '0')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 flex items-center justify-center flex-shrink-0">
                        <FavoriteIcon className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{favorite.name}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {favorite.location}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border border-rose-100 dark:border-rose-800">
                      {favorite.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {renderStars(favorite.rating)}
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({favorite.reviews})</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${
                      favorite.visited 
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' 
                        : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800'
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
                        onClick={() => onToggleVisited(favorite.id)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title={favorite.visited ? 'Mark as not visited' : 'Mark as visited'}
                      >
                        <Check className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                      <button
                        onClick={() => onViewDetails(favorite)}
                        className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(favorite.id)}
                        className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
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
                  <Heart className="w-12 h-12 text-rose-500 dark:text-rose-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No favorites found</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
