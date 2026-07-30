import { X, ChevronDown } from 'lucide-react';

export default function FavoriteModal({
  isOpen,
  newPlace,
  onNewPlaceChange,
  onClose,
  onSubmit
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[#111827] text-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <h3 className="text-lg font-bold text-white tracking-wide">Add New Place</h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={onSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Place Name</label>
            <input
              type="text"
              placeholder="Enter place name"
              value={newPlace.name}
              onChange={(e) => onNewPlaceChange({ ...newPlace, name: e.target.value })}
              className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Category</label>
              <div className="relative">
                <select
                  value={newPlace.category}
                  onChange={(e) => onNewPlaceChange({ ...newPlace, category: e.target.value })}
                  className="appearance-none w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                >
                  <option value="Temple">Temple</option>
                  <option value="Palace">Palace</option>
                  <option value="Beach">Beach</option>
                  <option value="Nature">Nature</option>
                  <option value="Market">Market</option>
                  <option value="Farm">Farm</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Location</label>
              <input
                type="text"
                placeholder="e.g., Siem Reap, Cambodia"
                value={newPlace.location}
                onChange={(e) => onNewPlaceChange({ ...newPlace, location: e.target.value })}
                className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Best Time to Visit</label>
              <input
                type="text"
                placeholder="e.g., Sunrise / Morning"
                value={newPlace.bestTime}
                onChange={(e) => onNewPlaceChange({ ...newPlace, bestTime: e.target.value })}
                className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Price</label>
              <input
                type="text"
                placeholder="e.g., $10 or Free"
                value={newPlace.price}
                onChange={(e) => onNewPlaceChange({ ...newPlace, price: e.target.value })}
                className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Description</label>
            <textarea
              rows="3"
              placeholder="Enter place description"
              value={newPlace.description}
              onChange={(e) => onNewPlaceChange({ ...newPlace, description: e.target.value })}
              className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 font-medium text-sm transition-colors text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors shadow-lg shadow-blue-500/25 text-center"
            >
              Add Place
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
