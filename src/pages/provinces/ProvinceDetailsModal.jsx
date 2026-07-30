import { X, Check, Users, Navigation, Star, Edit, Building } from 'lucide-react';

export default function ProvinceDetailsModal({ province, onClose, onEditProvince }) {
  if (!province) return null;

  const IconComponent = province.icon || Building;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[#111827] text-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
              <IconComponent className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">Province Details</h3>
              <p className="text-xs text-gray-400">ID: #{province.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Province Name</span>
            <p className="text-base font-semibold text-white mt-1">{province.name}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Type</span>
              <p className="text-sm font-medium text-blue-400 mt-1">{province.type}</p>
            </div>
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Status</span>
              <p className="text-sm font-medium text-green-400 mt-1 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                {province.status}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Population</span>
              <p className="text-sm font-medium text-white mt-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-gray-400" />
                {province.population}
              </p>
            </div>
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Area</span>
              <p className="text-sm font-medium text-white mt-1 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-gray-400" />
                {province.area}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Districts & Communes</span>
              <p className="text-sm font-medium text-white mt-1">
                {province.districts} Districts, {province.communes} Communes
              </p>
            </div>
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Rating & Places</span>
              <p className="text-sm font-medium text-amber-400 mt-1 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {province.rating} ({province.places} places)
              </p>
            </div>
          </div>

          <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Description</span>
            <p className="text-sm text-gray-300 mt-1">{province.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-800 bg-[#111827]">
          <button
            type="button"
            onClick={() => {
              const provId = province.id;
              onClose();
              onEditProvince(provId);
            }}
            className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit Province
          </button>
        </div>
      </div>
    </div>
  );
}
