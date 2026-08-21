import { X, Edit } from 'lucide-react';

export default function GalleryPreviewModal({ isOpen, media, onClose, onEdit }) {
  if (!isOpen || !media) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] rounded-xl max-w-lg w-full shadow-2xl border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
          <div>
            <h3 className="text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] tracking-wide">Media Preview</h3>
            <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">ID: #{media.id}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:text-[var(--color-text-primary-light)] dark:hover:text-[var(--color-white)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {media.url && (
            <div className="w-full h-56 rounded-lg overflow-hidden border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] shadow-sm bg-black flex items-center justify-center">
              {media.type === 'video' ? (
                <video
                  src={media.url}
                  controls
                  playsInline
                  preload="auto"
                  className="w-full h-full object-contain bg-black"
                >
                  <source src={media.url} type="video/mp4" />
                  Your browser does not support playing this video.
                </video>
              ) : (
                <img
                  src={media.url}
                  alt={media.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )}

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Title</span>
            <p className="text-base font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mt-1">{media.title}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 p-3.5 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Category & Type</span>
              <p className="text-sm font-medium text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] mt-1">{media.category} · <span className="capitalize font-semibold">{media.type}</span></p>
            </div>
            <div className="bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 p-3.5 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Status</span>
              <p className="text-sm font-medium text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] mt-1">{media.status}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 p-3.5 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Dimensions & Size</span>
              <p className="text-sm font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mt-1">{media.dimensions || '1920x1080'}</p>
              <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-0.5">{media.size || media.file_size || '2.4 MB'}</p>
            </div>
            <div className="bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 p-3.5 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Engagement</span>
              <p className="text-sm font-medium text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)] mt-1">{(media.views || 0).toLocaleString()} views · {media.likes || 0} likes</p>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] block mb-1.5">Tags</span>
            <div className="flex flex-wrap gap-1.5">
              {media.tags?.map((tag, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-[var(--color-neutral-badge-bg)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] rounded-lg text-xs border border-[var(--color-neutral-badge-border)] dark:border-[var(--color-border-dark)]">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)]">
          <button
            type="button"
            onClick={() => {
              const item = media;
              onClose();
              if (onEdit) onEdit(item);
            }}
            className="py-2.5 px-4 rounded-md bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-white)] font-medium text-sm transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Edit className="w-4 h-4" />
            Edit Media
          </button>
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 rounded-md bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)] hover:bg-[var(--color-border-subtle-light)] dark:hover:bg-[var(--color-border-dark)] text-[var(--color-text-secondary-light)] dark:text-[var(--color-white)] font-medium text-sm transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
