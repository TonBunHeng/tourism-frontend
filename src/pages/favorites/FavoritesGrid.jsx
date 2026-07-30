import { Heart, MapPin, Star, Clock, Users, Calendar, Check, Eye, Trash2 } from 'lucide-react';

export const renderStars = (rating) => {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600'} w-4 h-4`}
        />
      ))}
    </div>
  );
};

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
              className={`group relative bg-white dark:bg-gray-800/50 border rounded-xl p-5 hover:shadow-lg transition-all duration-200 lg:hover:scale-[1.02] ${
                isSelected ? 'border-rose-400 dark:border-rose-500 ring-2 ring-rose-400 dark:ring-rose-500' : 'border-gray-100 dark:border-gray-700'
              }`}
            >
              <div className="absolute top-3 left-3 z-10">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggleSelect(favorite.id)}
                  className="w-4 h-4 text-rose-600 border-gray-300 dark:border-gray-600 rounded focus:ring-rose-500 dark:bg-gray-700 dark:checked:bg-rose-600 cursor-pointer"
                />
              </div>

              <div className="absolute top-3 right-3 z-10">
                <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
              </div>

              <div className="flex items-start gap-3 mb-3 mt-2">
                <div className="w-14 h-14 flex-shrink-0 rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 flex items-center justify-center">
                  <FavoriteIcon className="w-7 h-7 text-rose-600 dark:text-rose-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{favorite.name}</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{favorite.location}</span>
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{favorite.description}</p>
              
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 min-w-0">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 flex-shrink-0" />
                  <span>{favorite.rating}</span>
                  <span className="text-gray-400 dark:text-gray-500 truncate">({favorite.reviews})</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 min-w-0">
                  <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{favorite.bestTime}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 min-w-0">
                  <Users className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{favorite.visitors.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 min-w-0">
                  <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{favorite.savedDate}</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full border flex-shrink-0 ${
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
                <div className="flex gap-1 flex-shrink-0">
                  <button
                    onClick={() => onToggleVisited(favorite.id)}
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title={favorite.visited ? 'Mark as not visited' : 'Mark as visited'}
                  >
                    <Check className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={() => onViewDetails(favorite)}
                    className="p-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  </button>
                  <button
                    onClick={() => onDelete(favorite.id)}
                    className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="col-span-full text-center py-12">
          <div className="mb-4 flex justify-center">
            <Heart className="w-12 h-12 text-rose-500 dark:text-rose-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No favorites found</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
