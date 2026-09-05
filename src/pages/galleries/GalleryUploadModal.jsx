import { useState, useRef, useEffect } from 'react';
import { X, Upload, Trash2, Video, Image as ImageIcon, AlertCircle } from 'lucide-react';
import uploadService from '../../services/uploadService';
import { validateImageFile, DANGEROUS_EXTENSIONS } from '../../utils/fileValidation';

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);

    // Security check for dangerous extensions
    const fileName = file.name || '';
    const lastDot = fileName.lastIndexOf('.');
    const ext = lastDot !== -1 ? fileName.slice(lastDot).toLowerCase() : '';
    if (DANGEROUS_EXTENSIONS.includes(ext)) {
      setUploadError(`File type "${ext}" is blocked for security.`);
      if (e.target) e.target.value = '';
      return;
    }

    const isVideo = file.type.startsWith('video/') || /\.(mp4|mov|avi|webm|mkv)$/i.test(file.name);
    
    if (!isVideo) {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        setUploadError(validation.error);
        if (e.target) e.target.value = '';
        return;
      }
    } else {
      // Max 25MB for video
      if (file.size > 25 * 1024 * 1024) {
        setUploadError('Video file size exceeds the maximum allowed limit of 25 MB.');
        if (e.target) e.target.value = '';
        return;
      }
    }

    setMediaType(isVideo ? 'video' : 'image');
    if (!title) {
      setTitle(file.name.replace(/\.[^/.]+$/, ''));
    }

    // Instant local preview via Blob URL
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
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !fileUrl) return;

    const newMedia = {
      id: Date.now(),
      title,
      category,
      type: mediaType,
      url: fileUrl,
      fileSize,
      dimensions,
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
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-alert-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] rounded-xl max-w-lg w-full shadow-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden animate-alert-popup flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-blue-50 text-[#003E83] dark:bg-zinc-800 dark:text-blue-400">
              {mediaType === 'video' ? <Video className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-zinc-100">
              Upload Media (Photo / Video)
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-all active:scale-90 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {uploadError && (
              <div className="p-3 rounded bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 flex items-center gap-2 text-red-700 dark:text-red-400 text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{uploadError}</span>
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
                className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-gray-300 dark:border-zinc-700 rounded-md px-3.5 py-2.5 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-1 focus:ring-[#003E83] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-gray-300 dark:border-zinc-700 rounded-md px-3.5 py-2.5 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-1 focus:ring-[#003E83] transition-colors cursor-pointer"
              >
                {categories.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Media Upload Area */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">
                Upload File (JPG, PNG, WEBP, MP4)
              </label>

              {fileUrl ? (
                <div className="relative w-full h-44 rounded-md overflow-hidden border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 flex items-center justify-center group mb-2">
                  {mediaType === 'video' ? (
                    <video src={fileUrl} className="w-full h-full object-cover" controls />
                  ) : (
                    <img src={fileUrl} alt="Preview" className="w-full h-full object-cover" />
                  )}

                  <div className="absolute top-2 right-2 flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-2.5 py-1 bg-white/90 dark:bg-zinc-900/90 text-xs font-medium rounded border border-gray-200 dark:border-zinc-700 shadow-sm hover:bg-white transition-colors cursor-pointer"
                    >
                      Replace
                    </button>
                    <button
                      type="button"
                      onClick={() => setFileUrl('')}
                      className="p-1 bg-red-600 hover:bg-red-700 text-white rounded shadow-sm transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/40 rounded-md p-6 text-center hover:border-[#003E83] transition-colors cursor-pointer mb-2"
                >
                  <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1.5" />
                  <p className="text-gray-800 dark:text-zinc-200 font-medium text-xs">
                    {isUploading ? 'Uploading to storage...' : 'Click to select image or video'}
                  </p>
                  <p className="text-[11px] text-gray-500 dark:text-zinc-400 mt-0.5">
                    Images up to 5MB (JPG, PNG, WEBP), Videos up to 25MB (MP4)
                  </p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,video/mp4"
                className="hidden"
                onChange={handleFileSelect}
              />

              <input
                type="text"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                placeholder="Or enter image/video URL (https://...)"
                className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-gray-300 dark:border-zinc-700 rounded-md px-3 py-2 text-xs text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-1 focus:ring-[#003E83] transition-colors"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 px-6 py-4 border-t border-gray-200 dark:border-zinc-800 bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-md border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 font-medium text-xs sm:text-sm transition-colors text-center cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={!title.trim() || !fileUrl || isUploading}
              className="flex-1 py-2.5 px-4 rounded-md bg-[#003E83] hover:bg-[#002e62] text-white font-medium text-xs sm:text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-center cursor-pointer"
            >
              {isUploading ? 'Uploading Media...' : 'Upload Media'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
