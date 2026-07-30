import { RotateCcw, Download, Shield } from 'lucide-react';

export default function DeletionHeader({ onReset }) {
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Deletion Requests
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage account deletion and item removal requests from users
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-3">
          <button 
            onClick={onReset}
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors hover:border-amber-300 dark:hover:border-amber-700"
          >
            <RotateCcw size={18} className="flex-shrink-0" />
            <span className="font-medium text-xs sm:text-sm truncate">Reset</span>
          </button>
          <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Download size={18} className="flex-shrink-0" />
            <span className="font-medium text-xs sm:text-sm truncate">Export</span>
          </button>
          <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25">
            <Shield size={18} className="flex-shrink-0" />
            <span className="font-medium text-xs sm:text-sm truncate">Bulk Actions</span>
          </button>
        </div>
      </div>
    </div>
  );
}
