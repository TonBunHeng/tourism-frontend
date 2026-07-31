import { Landmark, Mountain, Building2, Palette, Star, ArrowRight } from 'lucide-react';

export default function FeaturedPlaces() {
  const featuredPlaces = [
    {
      name: 'Siem Reap Angkor',
      location: 'Siem Reap | Temple | Heritage Site',
      rating: 5.0,
      reviews: 35,
      icon: Landmark,
      gradient: 'from-amber-500 to-orange-600'
    },
    {
      name: 'Pursat Mountains',
      location: 'Pursat | Mountains | Nature Reserve',
      rating: 5.0,
      reviews: 6,
      icon: Mountain,
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      name: 'Historical Sites',
      location: 'Multiple National Sites',
      rating: 5.0,
      reviews: 35,
      icon: Building2,
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      name: 'Cultural Museum',
      location: 'Cultural Heritage Museum',
      rating: 5.0,
      reviews: 35,
      icon: Palette,
      gradient: 'from-rose-500 to-pink-600'
    }
  ];

  return (
    <div className="mb-6 md:mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">Featured Places</h2>
        <button className="flex items-center gap-1 text-sm text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] hover:text-[var(--color-primary-hover)] font-medium">
          <span>View All</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {featuredPlaces.map((place, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${place.gradient} p-6 text-[var(--color-white)] shadow-lg hover:shadow-xl transition-all duration-300 md:hover:scale-105 transform group cursor-pointer`}
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
            <div className="relative z-10">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <place.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-1">{place.name}</h3>
              <p className="text-sm text-white/90 mb-3 line-clamp-1">{place.location}</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <Star className="w-3 h-3 fill-[var(--color-warning-text)] text-[var(--color-warning-text)] mr-1" />
                  <span className="text-sm font-bold">{place.rating}</span>
                  <span className="text-xs ml-1 text-white/80">({place.reviews})</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
