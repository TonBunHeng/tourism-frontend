import { useRef } from 'react';
import { X, ChevronDown, Building } from 'lucide-react';

export default function ProvinceModal({
  isOpen,
  onClose,
  editingProvince,
  onSave,
  provinceTypes
}) {
  const formRef = useRef(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data = {
        name: formData.get('name'),
        type: formData.get('type'),
        population: formData.get('population'),
        area: formData.get('area'),
        districts: parseInt(formData.get('districts')) || 0,
        communes: parseInt(formData.get('communes')) || 0,
        description: formData.get('description'),
        icon: Building
      };
      onSave(data);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[#111827] text-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <h3 className="text-lg font-bold text-white tracking-wide">
            {editingProvince ? 'Edit Province' : 'Add New Province'}
          </h3>
          <button 
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Province Name</label>
              <input
                name="name"
                type="text"
                defaultValue={editingProvince?.name || ''}
                placeholder="Enter province name"
                className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Type</label>
              <div className="relative">
                <select
                  name="type"
                  defaultValue={editingProvince?.type || 'Province'}
                  className="appearance-none w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                  required
                >
                  {provinceTypes.filter(t => t !== 'All').map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Population</label>
                <input
                  name="population"
                  type="text"
                  defaultValue={editingProvince?.population || ''}
                  placeholder="e.g., 2,129,371"
                  className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Area</label>
                <input
                  name="area"
                  type="text"
                  defaultValue={editingProvince?.area || ''}
                  placeholder="e.g., 678.46 km²"
                  className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Districts</label>
                <input
                  name="districts"
                  type="number"
                  defaultValue={editingProvince?.districts || ''}
                  placeholder="Number of districts"
                  className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Communes</label>
                <input
                  name="communes"
                  type="number"
                  defaultValue={editingProvince?.communes || ''}
                  placeholder="Number of communes"
                  className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Description</label>
              <textarea
                name="description"
                defaultValue={editingProvince?.description || ''}
                placeholder="Enter province description"
                rows="3"
                className="w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-800 bg-[#111827]">
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
              {editingProvince ? 'Update Province' : 'Add Province'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
