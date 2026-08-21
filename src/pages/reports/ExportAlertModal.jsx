import { useEffect } from 'react';
import { FileText, FileSpreadsheet, X } from 'lucide-react';

export default function ExportAlertModal({ isOpen, format, activeTab, recordCount, onClose, onConfirm }) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isPDF = format === 'pdf';
  const tabName = activeTab ? (activeTab.charAt(0).toUpperCase() + activeTab.slice(1)) : 'Data';

  const handleExport = () => {
    onConfirm();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
    >
      <div
        className="bg-white dark:bg-zinc-900 rounded-lg shadow-2xl max-w-md w-full mx-4 p-6 relative animate-in fade-in zoom-in duration-200 border border-gray-100 dark:border-zinc-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          {isPDF ? (
            <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center animate-pulse-glow-danger">
              <FileText size={32} className="text-red-500 dark:text-red-400 animate-alert-pop" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center animate-pulse-glow-success">
              <FileSpreadsheet size={32} className="text-emerald-600 dark:text-emerald-400 animate-alert-pop" />
            </div>
          )}
        </div>

        {/* Title */}
        <h3 id="export-modal-title" className="text-xl font-bold text-gray-800 dark:text-zinc-100 text-center mb-2">
          {isPDF ? 'Export PDF Confirmation' : 'Export Excel Confirmation'}
        </h3>

        {/* Message */}
        <p className="text-gray-600 dark:text-zinc-400 text-center mb-6">
          Are you sure you want to export the <strong className="text-gray-800 dark:text-zinc-100">{tabName}</strong> dataset ({recordCount} items) as a {isPDF ? 'PDF' : 'Excel'} file?
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-zinc-300 font-medium rounded-md hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className={`flex-1 px-4 py-2.5 text-white font-medium rounded-md transition-all cursor-pointer ${
              isPDF
                ? 'bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-500/20'
                : 'bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-500/20'
            }`}
          >
            {isPDF ? 'Export PDF' : 'Export Excel'}
          </button>
        </div>
      </div>
    </div>
  );
}
