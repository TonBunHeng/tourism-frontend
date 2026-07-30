import { Download, Share2 } from 'lucide-react';

export default function RatingsHeader() {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Ratings & Reviews
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage user reviews and ratings across all destinations
          </p>
        </div>
        <div className="grid grid-cols-2 md:flex gap-2 md:gap-3">
          <button className="flex items-center justify-center gap-1.5 md:gap-2 px-2 md:px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Download size={18} className="shrink-0"/>
            <span className="font-medium text-xs md:text-sm">Export</span>
          </button>
          <button className="flex items-center justify-center gap-1.5 md:gap-2 px-2 md:px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25">
            <Share2 size={18} className="shrink-0"/>
            <span className="font-medium text-xs md:text-sm">Share Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}
