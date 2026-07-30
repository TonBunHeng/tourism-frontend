import { Eye, X, Edit } from 'lucide-react';

export default function GalleryPreviewModal({ isOpen, media, onClose, onEdit }) {
  if (!isOpen || !media) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[#111827] text-white rounded-3xl max-w-2xl w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
              <Eye className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">Media Preview</h3>
              <p className="text-xs text-gray-400">ID: #{media.id}</p>
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
          <div className="rounded-2xl overflow-hidden bg-black/40 border border-gray-800 flex items-center justify-center max-h-[300px]">
            <img
              src={media.url}
              alt={media.title}
              className="w-full h-full object-contain max-h-[300px]"
            />
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Title</span>
            <p className="text-base font-semibold text-white mt-1">{media.title}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Category & Type</span>
              <p className="text-sm font-medium text-blue-400 mt-1">{media.category} · <span className="capitalize">{media.type}</span></p>
            </div>
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Status</span>
              <p className="text-sm font-medium text-green-400 mt-1">{media.status}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Dimensions & Size</span>
              <p className="text-sm font-medium text-white mt-1">{media.dimensions}</p>
              <p className="text-xs text-gray-400 mt-0.5">{media.size}</p>
            </div>
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Engagement</span>
              <p className="text-sm font-medium text-amber-400 mt-1">{media.views.toLocaleString()} views · {media.likes} likes</p>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-1.5">Tags</span>
            <div className="flex flex-wrap gap-1.5">
              {media.tags.map((tag, idx) => (
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
              const item = media;
              onClose();
              onEdit(item);
            }}
            className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit Media
          </button>
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
