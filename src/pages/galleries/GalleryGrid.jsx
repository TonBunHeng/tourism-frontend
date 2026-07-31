import { Video, Image, Eye, Edit, Trash2, Clock, Heart } from 'lucide-react';

export const getStatusColor = (status) => {
  return status === 'Published'
    ? 'bg-[var(--color-success-bg)] text-[var(--color-success-text)] border-[var(--color-success-border)] dark:bg-[var(--color-success-dark-bg)] dark:text-[var(--color-success-dark-text)] dark:border-[var(--color-success-dark-border)]'
    : 'bg-[var(--color-neutral-badge-bg)] text-[var(--color-neutral-badge-text)] border-[var(--color-border-subtle-light)] dark:bg-[var(--color-neutral-badge-dark-bg)] dark:text-[var(--color-neutral-badge-dark-text)] dark:border-[var(--color-border-dark)]';
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
            className="group relative bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)]/50 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 sm:hover:scale-[1.02]"
          >
            <div className="relative aspect-square bg-[var(--color-border-light)] dark:bg-[var(--color-surface-hover-dark)]">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-[var(--color-white)]/90 dark:bg-[var(--color-bg-dark)]/90 flex items-center justify-center">
                    <Video className="w-5 h-5 sm:w-8 sm:h-8 text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] ml-0.5 sm:ml-1" />
                  </div>
                </div>
              )}
              {/* Actions */}
              <div className="absolute top-2 right-2 flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onPreview(item)}
                  className="p-1.5 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg transition-colors"
                  title="View Details"
                >
                  <Eye className="w-3.5 h-3.5 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
                </button>
                <button
                  onClick={() => onEdit(item)}
                  className="p-1.5 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit className="w-3.5 h-3.5 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-1.5 hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)]" />
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
                <h3 className="font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] text-sm line-clamp-1">{item.title}</h3>
                <span className="hidden sm:inline text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] shrink-0">{item.size}</span>
              </div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-xs px-2 py-0.5 bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] rounded-full border border-[var(--color-info-border)] dark:border-[var(--color-info-dark-border)]">
                  {item.category}
                </span>
                <div className="flex items-center gap-1 text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                  <Eye className="w-3 h-3" />
                  {item.views}
                </div>
                <div className="flex items-center gap-1 text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                  <Heart className="w-3 h-3" />
                  {item.likes}
                </div>
              </div>
              <div className="hidden sm:flex items-center justify-between text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]">
                <span>{item.uploadedBy}</span>
                <span>{item.uploadDate}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <div className="text-6xl mb-4">🖼️</div>
          <h3 className="text-lg font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">No media found</h3>
          <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
