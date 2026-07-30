import { X, Upload, ChevronDown } from 'lucide-react';

export default function GalleryUploadModal({ isOpen, onClose, categories }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[#111827] text-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <h3 className="text-lg font-bold text-white tracking-wide">Upload Media</h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <div className="border-2 border-dashed border-gray-700 bg-[#1f2937]/50 rounded-2xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-200 font-medium text-sm">Drop files here or click to upload</p>
            <p className="text-xs text-gray-400 mt-1">Supports images and videos up to 50MB</p>
            <button type="button" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-colors text-sm shadow-md shadow-blue-500/20">
              Choose Files
            </button>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Category</label>
            <div className="relative">
              <select className="appearance-none w-full bg-[#1f2937] border border-gray-700/70 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer">
                <option className="bg-[#1f2937] text-gray-400">Select category</option>
                {categories.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat} className="bg-[#1f2937] text-white">{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-800 bg-[#111827]">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 font-medium text-sm transition-colors text-center"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors shadow-lg shadow-blue-500/25 text-center"
          >
            Upload Files
          </button>
        </div>
      </div>
    </div>
  );
}
