// src/pages/reports/ReportsHeader.jsx
import React from 'react';
import { Send, Download, FileSpreadsheet, RotateCcw } from 'lucide-react';

export default function ReportsHeader({
  selectedDay,
  setSelectedDay,
  onSubmitFilter,
  onResetFilter,
  onExportPDF,
  onExportExcel,
  isSubmitting,
  isResetting
}) {

  // Shared class so Submit / Reset / PDF / Excel are consistent in size
  const actionBtnClass =
    'flex items-center justify-center gap-1.5 md:gap-2 w-full sm:w-[100px] px-4 py-2 text-xs md:text-sm font-semibold rounded-md transition-all cursor-pointer disabled:opacity-50 shrink-0';

  return (
    <div className="mb-6 md:mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] tracking-tight">
            Reports Management
          </h1>
          <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
            Export comprehensive tourism data, user engagement metrics, and system statistics
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto">
          {/* Date Filter, Submit & Reset Controls */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap w-full sm:w-auto">

            {/* Date Picker */}
            <input
              type="date"
              value={selectedDay || ''}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="px-3 py-2 text-xs md:text-sm rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none cursor-pointer"
            />

            {/* Submit Button */}
            <button
              onClick={onSubmitFilter}
              disabled={isSubmitting}
              className={`${actionBtnClass} border border-transparent bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white shadow-sm`}
              title="Submit Filter"
            >
              <Send className={`w-4 h-4 shrink-0 ${isSubmitting ? 'animate-spin' : ''}`} />
              <span>Submit</span>
            </button>

            {/* Reset Button */}
            <button
              onClick={onResetFilter}
              disabled={isResetting}
              className={`${actionBtnClass} border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] hover:bg-gray-100 dark:hover:bg-gray-800 text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] shadow-sm`}
              title="Reset Filter"
            >
              <RotateCcw className={`w-4 h-4 shrink-0 ${isResetting ? 'animate-spin' : ''}`} />
              <span>Reset</span>
            </button>
          </div>

          {/* Export PDF & Excel Row */}
          <div className="grid grid-cols-2 gap-2 w-full sm:w-auto sm:flex sm:items-center">
            {/* Export PDF */}
            <button
              onClick={onExportPDF}
              className={`${actionBtnClass} border border-transparent bg-red-600 hover:bg-red-700 text-white shadow-sm`}
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>PDF</span>
            </button>

            {/* Export Excel */}
            <button
              onClick={onExportExcel}
              className={`${actionBtnClass} border border-transparent bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white shadow-sm`}
            >
              <FileSpreadsheet className="w-4 h-4 shrink-0" />
              <span>Excel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}