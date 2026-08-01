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
    <div className="lg:col-span-1 bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-2xl shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h3 className="font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">Top Places</h3>
          <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Highest rated destinations</p>
        </div>
        <button className="text-xs text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium">
          View All
        </button>
      </div>
      <div className="space-y-3 overflow-y-auto pr-1 flex-1">
        {topPlaces.map((place, index) => {
          const Icon = place.icon;
          return (
            <div key={index} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)]/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] truncate">{place.name}</p>
                <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-[var(--color-amber-star)] text-[var(--color-amber-star)]" />
                    <span>{place.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{place.reviews} reviews</span>
                  <span>•</span>
                  <span>{place.visits.toLocaleString()} visits</span>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xs font-medium ${index === 0 ? 'text-[var(--color-warning-text)]' :
                  index === 1 ? 'text-[var(--color-text-muted-light)]' :
                    index === 2 ? 'text-[var(--color-warning-text)]' :
                      'text-[var(--color-text-muted-light)]'
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