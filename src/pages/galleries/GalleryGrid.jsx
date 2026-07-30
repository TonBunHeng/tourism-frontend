import { Video, Image, Eye, Edit, Trash2, Clock, Heart } from 'lucide-react';

export const getStatusColor = (status) => {
  return status === 'Published'
    ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
    : 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-700/50 dark:text-gray-400 dark:border-gray-600';
};

export const getTypeIcon = (type) => {
  return type === 'video' ? Video : Image;
};

export default function GalleryGrid({ media, onPreview, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6">
      {media.length > 0 ? (
        media.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 sm:hover:scale-[1.02]"
          >
            <div className="relative aspect-square bg-gray-100 dark:bg-gray-700">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-white/90 dark:bg-gray-800/90 flex items-center justify-center">
                    <Video className="w-5 h-5 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400 ml-0.5 sm:ml-1" />
                  </div>
                </div>
              )}
              {/* Actions */}
              <div className="absolute top-2 right-2 flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onPreview(item)}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg transition-colors"
                  title="View Details"
                >
                  <Eye className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={() => onEdit(item)}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                </button>
              </div>
              <div className="absolute bottom-2 left-2">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border ${getStatusColor(item.status)}`}>
                  <Clock className="w-3 h-3" />
                  <span className="hidden xs:inline">{item.status}</span>
                </span>
              </div>
            </div>
            <div className="p-3 sm:p-4">
              <div className="flex items-start justify-between mb-2 gap-2">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">{item.title}</h3>
                <span className="hidden sm:inline text-xs text-gray-400 dark:text-gray-500 shrink-0">{item.size}</span>
              </div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-xs px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full border border-blue-100 dark:border-blue-800">
                  {item.category}
                </span>
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <Eye className="w-3 h-3" />
                  {item.views}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <Heart className="w-3 h-3" />
                  {item.likes}
                </div>
              </div>
              <div className="hidden sm:flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
                <span>{item.uploadedBy}</span>
                <span>{item.uploadDate}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <div className="text-6xl mb-4">🖼️</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No media found</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
