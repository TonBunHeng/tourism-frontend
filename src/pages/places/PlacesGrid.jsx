import { Star, MapPin, CheckCircle, Eye, Edit, Trash2 } from 'lucide-react';

export default function PlacesGrid({ places, onViewPlace, onEditPlace, onDeletePlace }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-6">
      {places.length > 0 ? (
        places.map((place) => (
          <div key={place.id} className="bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl p-4 hover:shadow-lg transition-all duration-200 group">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
                  <place.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{place.name}</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{place.category}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">{place.rating}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-start gap-1 mb-3">
              <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5" />
              <span className="line-clamp-2">{place.address}</span>
            </p>
            <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 flex-shrink-0">
                <CheckCircle className="w-3 h-3" />
                {place.status}
              </span>
              <div className="flex items-center gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onViewPlace(place.id)}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  title="View"
                >
                  <Eye className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={() => onEditPlace(place)}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  title="Edit"
                >
                  <Edit className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={() => onDeletePlace(place.id)}
                  className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <div className="text-6xl mb-4">📍</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No places found</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
