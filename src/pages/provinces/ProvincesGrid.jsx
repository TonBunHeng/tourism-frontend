import { Eye, Edit, Trash2, Users, Navigation, Building2, Home, Star, Clock, Building } from 'lucide-react';

export const getStatusColor = (status) => {
  return status === 'Active' 
    ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' 
    : 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-700/50 dark:text-gray-400 dark:border-gray-600';
};

export const getTypeBadgeColor = (type) => {
  const colors = {
    'Capital City': 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800',
    'Province': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
    'Municipality': 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800'
  };
  return colors[type] || 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700/50 dark:text-gray-400 dark:border-gray-600';
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
              className="group relative bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl p-5 hover:shadow-lg transition-all duration-200 lg:hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{province.name}</h3>
                    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full border ${getTypeBadgeColor(province.type)}`}>
                      {province.type}
                    </span>
                  </div>
                </div>
                {/* Actions: always visible on touch/mobile, fade in on hover for pointer devices */}
                <div className="flex gap-1 flex-shrink-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => onViewProvince(province.id)}
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="View"
                  >
                    <Eye className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button 
                    onClick={() => onEditProvince(province.id)}
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button 
                    onClick={() => onDeleteProvince(province.id)}
                    className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                  </button>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{province.description}</p>
              
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 min-w-0">
                  <Users className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{province.population}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 min-w-0">
                  <Navigation className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{province.area}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 min-w-0">
                  <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{province.districts} Districts</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 min-w-0">
                  <Home className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{province.places} Places</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{province.rating}</span>
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
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No provinces found</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
