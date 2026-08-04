// src/pages/reports/ExportToast.jsx
import React, { useEffect } from 'react';
import { CheckCircle2, FileSpreadsheet, FileText, X } from 'lucide-react';

export default function ExportToast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isPDF = toast.format === 'pdf';

  return (
    <div className="fixed top-5 right-5 z-[9999] flex items-center gap-3 p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-2xl animate-toast-in max-w-sm w-full">
      <div className={`p-2.5 rounded-xl shrink-0 ${
        isPDF
          ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'
          : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
      }`}>
        {isPDF ? <FileText className="w-5 h-5" /> : <FileSpreadsheet className="w-5 h-5" />}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">
            {isPDF ? 'PDF Exported Successfully' : 'Excel Exported Successfully'}
          </h4>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate font-mono">
          {toast.filename}
        </p>
      </div>

      <button
        onClick={onClose}
        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shrink-0 cursor-pointer"
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}
