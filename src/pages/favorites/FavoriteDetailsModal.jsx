import { MapPin, X, Trash2, Clock, Check } from 'lucide-react';
import { renderStars } from './FavoritesGrid';

export default function FavoriteDetailsModal({
  isOpen,
  favorite,
  onClose,
  onDelete,
  onToggleVisited
}) {
  if (!isOpen || !favorite) return null;

  const FavoriteIcon = favorite.icon;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[#111827] text-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600/20 flex items-center justify-center">
              <FavoriteIcon className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">Place Details</h3>
              <p className="text-xs text-gray-400">ID: #{favorite.id}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Place Name</span>
            <p className="text-base font-semibold text-white mt-1">{favorite.name}</p>
            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5" /> {favorite.location}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Category & Status</span>
              <p className="text-sm font-medium text-rose-400 mt-1">{favorite.category}</p>
              <p className="text-xs text-green-400 mt-0.5">{favorite.visited ? 'Visited' : 'To Visit'}</p>
            </div>
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Rating</span>
              <div className="flex items-center gap-1.5 mt-1">
                {renderStars(favorite.rating)}
                <span className="text-sm font-medium text-amber-400">({favorite.rating})</span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{favorite.reviews} reviews</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Best Time & Duration</span>
              <p className="text-sm font-medium text-white mt-1">{favorite.bestTime}</p>
              <p className="text-xs text-gray-400 mt-0.5">{favorite.duration}</p>
            </div>
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Price & Visitors</span>
              <p className="text-sm font-medium text-white mt-1">{favorite.price}</p>
              <p className="text-xs text-gray-400 mt-0.5">{favorite.visitors.toLocaleString()} visitors</p>
            </div>
          </div>

          <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Description</span>
            <p className="text-sm text-gray-300 mt-1 leading-relaxed">{favorite.description}</p>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-1.5">Tags</span>
            <div className="flex flex-wrap gap-1.5">
              {favorite.tags.map((tag, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-[#1f2937] text-gray-300 rounded-lg text-xs border border-gray-800">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-gray-800 bg-[#111827]">
          <button
            type="button"
            onClick={() => {
              const fav = favorite;
              onClose();
              onDelete(fav.id);
            }}
            className="py-2.5 px-4 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 font-medium text-sm transition-colors flex items-center gap-2 border border-red-800/50"
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </button>
          <button
            type="button"
            onClick={() => {
              onToggleVisited(favorite.id);
              onClose();
            }}
            className="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-sm transition-colors flex items-center gap-2"
          >
            {favorite.visited ? <Clock className="w-4 h-4" /> : <Check className="w-4 h-4" />}
            {favorite.visited ? 'Mark as To Visit' : 'Mark as Visited'}
          </button>
        </div>
      </div>
    </div>
  );
}
