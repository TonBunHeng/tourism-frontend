import { Video, Eye, Edit, Trash2, Clock, Heart, HardDrive, Calendar } from 'lucide-react';

const getStatusColor = (status) => {
  return status === 'Published'
    ? 'bg-[var(--color-success-bg)] text-[var(--color-success-text)] border-[var(--color-success-border)] dark:bg-[var(--color-success-dark-bg)] dark:text-[var(--color-success-dark-text)] dark:border-[var(--color-success-dark-border)]'
    : 'bg-[var(--color-neutral-badge-bg)] text-[var(--color-neutral-badge-text)] border-[var(--color-border-subtle-light)] dark:bg-[var(--color-neutral-badge-dark-bg)] dark:text-[var(--color-neutral-badge-dark-text)] dark:border-[var(--color-border-dark)]';
};

export default function GalleryGrid({ media, onPreview, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-6">
      {media.length > 0 ? (
        media.map((item) => (
          <div
            key={item.id}
            className="group relative bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)]/50 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md p-4 sm:p-5 hover:shadow-lg transition-all duration-200 sm:hover:scale-[1.02]"
          >
            {/* Top Media Picture Banner */}
            <div className="relative w-full h-40 mb-3 rounded-lg overflow-hidden border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="w-10 h-10 rounded-full bg-white/90 dark:bg-gray-900/90 flex items-center justify-center shadow-lg">
                    <Video className="w-5 h-5 text-[var(--color-info-text)] ml-0.5" />
                  </div>
                </div>
              )}
            </div>

            {/* Header: Title, Category & Action Buttons */}
            <div className="flex items-start justify-between mb-3 gap-2">
              <div className="min-w-0">
                <h3 className="font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] text-sm line-clamp-1">{item.title}</h3>
                <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full border bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] border-[var(--color-info-border)] dark:border-[var(--color-info-dark-border)]">
                  {item.category}
                </span>
              </div>
              <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shrink-0">
                <button
                  onClick={() => onPreview(item)}
                  className="p-1.5 text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)] hover:bg-[var(--color-purple-badge-bg)] dark:hover:bg-[var(--color-purple-badge-dark-bg)] rounded-lg transition-colors"
                  title="View Details"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onEdit(item)}
                  className="p-1.5 text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] hover:bg-[var(--color-info-bg)] dark:hover:bg-[var(--color-info-dark-bg)] rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-1.5 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Media Metadata Info */}
            <div className="space-y-1.5 text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[var(--color-text-muted-light)]" />
                  {item.uploadDate || (item.created_at ? item.created_at.split("T")[0] : "Recent")}
                </span>
                <span className="flex items-center gap-1">
                  <HardDrive className="w-3.5 h-3.5 text-[var(--color-text-muted-light)]" />
                  {item.size || item.file_size || "N/A"}
                </span>
              </div>
            </div>

            {/* Card Footer: Status Badge & Views/Likes */}
            <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(item.status)}`}>
                <Clock className="w-3 h-3" />
                {item.status}
              </span>
              <div className="flex items-center gap-2 text-xs font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-[var(--color-text-muted-light)]" />
                  {item.views ?? item.views_count ?? 0}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-[var(--color-rose-badge-text)] fill-[var(--color-rose-badge-text)]" />
                  {item.likes ?? item.likes_count ?? 0}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <h3 className="text-lg font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">No media found</h3>
          <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
