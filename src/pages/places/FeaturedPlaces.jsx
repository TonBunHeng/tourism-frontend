import { Landmark, Mountain, Building2, Palette, Star, ArrowRight } from 'lucide-react';
import siemReapImg from '../../assets/places_img/SiemReapAngkor.jpg';
import pursatImg from '../../assets/places_img/PursatMountains.jpeg';
import historicalImg from '../../assets/places_img/HistoricalSites.jpeg';
import museumImg from '../../assets/places_img/images.jpeg';

export default function FeaturedPlaces() {
  const featuredPlaces = [
    {
      name: 'Siem Reap Angkor',
      location: 'Siem Reap | Temple | Heritage Site',
      rating: 5.0,
      reviews: 35,
      icon: Landmark,
      image: siemReapImg,
      gradient: 'from-amber-500/80 to-orange-600/80'
    },
    {
      name: 'Pursat Mountains',
      location: 'Pursat | Mountains | Nature Reserve',
      rating: 5.0,
      reviews: 6,
      icon: Mountain,
      image: pursatImg,
      gradient: 'from-emerald-500/80 to-teal-600/80'
    },
    {
      name: 'Historical Sites',
      location: 'Multiple National Sites',
      rating: 5.0,
      reviews: 35,
      icon: Building2,
      image: historicalImg,
      gradient: 'from-purple-500/80 to-indigo-600/80'
    },
    {
      name: 'Cultural Museum',
      location: 'Cultural Heritage Museum',
      rating: 5.0,
      reviews: 35,
      icon: Palette,
      image: museumImg,
      gradient: 'from-rose-500/80 to-pink-600/80'
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
            className="relative overflow-hidden rounded-2xl p-6 text-[var(--color-white)] shadow-lg hover:shadow-xl transition-all duration-300 transform group cursor-pointer h-52 flex flex-col justify-end"
          >
            {/* Background Image */}
            <img
              src={place.image}
              alt={place.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Gradient Overlays */}
            <div className={`absolute inset-0 bg-gradient-to-t ${place.gradient} opacity-40 group-hover:opacity-30 transition-opacity duration-300`}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 group-hover:from-black/90 transition-colors duration-300"></div>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-1 text-white drop-shadow-sm">{place.name}</h3>
              <p className="text-sm text-white/90 mb-3 line-clamp-1">{place.location}</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-black/40 backdrop-blur-md border border-white/20 rounded-full px-3 py-1">
                  <Star className="w-3.5 h-3.5 fill-[var(--color-warning-text)] text-[var(--color-warning-text)] mr-1" />
                  <span className="text-sm font-bold text-white">{place.rating}</span>
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
