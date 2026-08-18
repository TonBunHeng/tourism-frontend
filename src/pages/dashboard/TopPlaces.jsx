import { Star, Landmark, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TopPlaces({ places, topPlaces }) {
  const navigate = useNavigate();
  const items = (Array.isArray(places) && places.length > 0)
    ? places
    : ((Array.isArray(topPlaces) && topPlaces.length > 0) ? topPlaces : []);

  return (
    <div className="lg:col-span-1 bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h3 className="font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">Top Places</h3>
          <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Highest rated destinations</p>
        </div>
        <button
          onClick={() => navigate('/places')}
          className="text-xs text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium cursor-pointer"
        >
          View All
        </button>
      </div>

      <div className="space-y-3 overflow-y-auto pr-1 flex-1">
        {items.length > 0 ? (
          items.map((place, index) => (
            <div
              key={place.id || index}
              onClick={() => navigate('/places')}
              className="flex items-center gap-3 p-3 rounded-md hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)]/50 transition-colors cursor-pointer"
            >
              <div className="w-11 h-11 rounded-md bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] overflow-hidden flex items-center justify-center flex-shrink-0 border border-gray-200 dark:border-zinc-700">
                {place.image || place.image_url ? (
                  <img src={place.image || place.image_url} alt={place.name} className="w-full h-full object-cover" />
                ) : (
                  <Landmark className="w-5 h-5 text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] truncate">{place.name}</p>
                <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-0.5">
                  <div className="flex items-center gap-0.5 text-amber-500 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{Number(place.rating || 5.0).toFixed(1)}</span>
                  </div>
                  <span>•</span>
                  <span>{place.reviews || 0} reviews</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  index === 0
                    ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-300 dark:border-amber-800'
                    : index === 1
                    ? 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300'
                    : index === 2
                    ? 'bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400'
                    : 'text-gray-400'
                }`}>
                  #{index + 1}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-xs text-gray-400">
            No top places available yet.
          </div>
        )}
      </div>
    </div>
  );
}
