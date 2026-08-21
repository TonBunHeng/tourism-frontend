import { useState, useRef } from 'react';
import { X, Upload, ChevronDown, Trash2, Video, Image as ImageIcon } from 'lucide-react';
import uploadService from '../../services/uploadService';

export default function GalleryUploadModal({ isOpen, onClose, categories = [], onAddMedia }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories.find(c => c !== 'All') || 'Temple');
  const [fileUrl, setFileUrl] = useState('');
  const [mediaType, setMediaType] = useState('image');
  const [fileSize, setFileSize] = useState('2.4 MB');
  const [dimensions, setDimensions] = useState('1920x1080');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    const isVideo = file.type.startsWith('video/') || /\.(mp4|mov|avi|webm|mkv)$/i.test(file.name);
    setMediaType(isVideo ? 'video' : 'image');
    if (!title) {
      setTitle(file.name.replace(/\.[^/.]+$/, ''));
    }

    // Instant local preview via Blob URL (no memory freeze)
    const localBlobUrl = URL.createObjectURL(file);
    setFileUrl(localBlobUrl);

    // Format human-readable file size
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    setFileSize(`${sizeInMB} MB`);

    // Upload to backend project storage
    setIsUploading(true);
    try {
      const res = await uploadService.uploadFile(file, 'gallery');
      if (res.success && res.data?.url) {
        setFileUrl(res.data.url);
        if (res.data.type) setMediaType(res.data.type);
        if (res.data.file_size) setFileSize(res.data.file_size);
        if (res.data.dimensions) setDimensions(res.data.dimensions);
      }
    } catch (err) {
      console.warn('Backend file upload fallback to local preview:', err);
      // Keep local preview so user can still submit or retry
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !fileUrl) return;

    const newMedia = {
      id: Date.now(),
      title: title.trim(),
      type: mediaType,
      url: fileUrl,
      media_url: fileUrl,
      category,
      file_size: fileSize,
      size: fileSize,
      dimensions,
      tags: [category.toLowerCase(), mediaType],
      views: 0,
      likes: 0,
      status: 'Published'
    };

    if (onAddMedia) {
      onAddMedia(newMedia);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] rounded-xl max-w-lg w-full shadow-2xl border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
              {mediaType === 'video' ? <Video className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
            </div>
            <h3 className="text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] tracking-wide">
              Upload Media (Photo / Video)
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:text-[var(--color-text-primary-light)] dark:hover:text-[var(--color-white)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {uploadError && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs">
                {uploadError}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">
                Media Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter media title or caption"
                className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Media Type</label>
                <div className="relative">
                  <select
                    value={mediaType}
                    onChange={(e) => setMediaType(e.target.value)}
                    className="appearance-none w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent cursor-pointer"
                  >
                    <option value="image">Image / Picture</option>
                    <option value="video">Video Clip</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Category</label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="appearance-none w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent cursor-pointer"
                  >
                    {categories.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                Media File (Picture / Video) *
              </label>

              {fileUrl ? (
                <div className="relative w-full h-44 rounded-lg overflow-hidden border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] group shadow-sm bg-black/10 flex items-center justify-center">
                  {mediaType === 'video' ? (
                    <video src={fileUrl} className="w-full h-full object-cover" controls autoPlay muted loop />
                  ) : (
                    <img src={fileUrl} alt="Upload Preview" className="w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-auto">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-md text-xs font-medium shadow-lg transition-colors cursor-pointer"
                    >
                      Change File
                    </button>
                    <button
                      type="button"
                      onClick={() => setFileUrl('')}
                      className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs flex items-center gap-1 font-medium shadow-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove File
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 rounded-lg p-6 text-center hover:border-[var(--color-primary)] transition-colors cursor-pointer block"
                >
                  <Upload className="w-8 h-8 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mx-auto mb-2" />
                  <p className="text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] font-medium text-xs">
                    {isUploading ? 'Uploading media to backend server...' : 'Drop picture/video here or click to upload'}
                  </p>
                  <p className="text-[11px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-0.5">Supports PNG, JPG, WEBP, MP4, MOV up to 500 MB</p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={handleFileSelect}
              />

              <input
                type="text"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                placeholder="Or enter image/video URL (https://...)"
                className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md px-4 py-2.5 text-xs text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 px-6 py-4 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] font-medium text-sm transition-colors text-center cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={!title.trim() || !fileUrl || isUploading}
              className="flex-1 py-3 px-4 rounded-md bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-white)] font-medium text-sm transition-colors shadow-lg shadow-[var(--color-primary)]/25 disabled:opacity-50 disabled:cursor-not-allowed text-center cursor-pointer"
            >
              {isUploading ? 'Uploading Media...' : 'Upload Media'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
