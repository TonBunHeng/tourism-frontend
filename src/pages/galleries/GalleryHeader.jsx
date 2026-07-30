import { Upload } from 'lucide-react';

export default function GalleryHeader({ onUploadClick }) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Media Gallery
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage and organize all media files
          </p>
        </div>
        <button
          onClick={onUploadClick}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25 w-full sm:w-auto"
        >
          <Upload size={18} className="shrink-0" />
          <span className="font-medium">Upload Media</span>
        </button>
      </div>
    </div>
  );
}
