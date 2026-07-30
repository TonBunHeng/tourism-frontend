import { Star, Landmark, Building, Waves } from 'lucide-react';

export default function TopPlaces() {
  const topPlaces = [
    { name: 'Angkor Wat', rating: 4.9, reviews: 1256, visits: 45231, icon: Landmark },
    { name: 'Royal Palace', rating: 4.8, reviews: 876, visits: 23456, icon: Building },
    { name: 'Bayon Temple', rating: 4.8, reviews: 654, visits: 18923, icon: Landmark },
    { name: 'Koh Rong Island', rating: 4.7, reviews: 543, visits: 15678, icon: Waves },
    { name: 'Tonle Sap Lake', rating: 4.6, reviews: 432, visits: 12345, icon: Waves }
  ];

  return (
    <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Top Places</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Highest rated destinations</p>
        </div>
        <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
          View All
        </button>
      </div>
      <div className="space-y-3 overflow-y-auto pr-1 flex-1">
        {topPlaces.map((place, index) => {
          const Icon = place.icon;
          return (
            <div key={index} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{place.name}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{place.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{place.reviews} reviews</span>
                  <span>•</span>
                  <span>{place.visits.toLocaleString()} visits</span>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xs font-medium ${index === 0 ? 'text-amber-500' :
                  index === 1 ? 'text-gray-400' :
                    index === 2 ? 'text-amber-600' :
                      'text-gray-400'
                  }`}>
                  #{index + 1}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}