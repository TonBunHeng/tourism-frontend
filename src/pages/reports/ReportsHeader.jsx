// src/pages/reports/ReportsHeader.jsx
import { useRef } from 'react';
import { Send, Download, FileSpreadsheet, RotateCcw, BarChart2, Calendar } from 'lucide-react';

export default function ReportsHeader({
  selectedDay,
  setSelectedDay,
  onSubmitFilter,
  onResetFilter,
  onExportPDF,
  onExportExcel,
  onOpenAnalytics,
  isSubmitting,
  isResetting
}) {
  const dateInputRef = useRef(null);

  const handleOpenPicker = () => {
    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === 'function') {
        try {
          dateInputRef.current.showPicker();
        } catch {
          dateInputRef.current.focus();
        }
      } else {
        dateInputRef.current.focus();
      }
    }
  };

  // Shared class so Submit / Reset / PDF / Excel are consistent in size
  const actionBtnClass =
    'flex items-center justify-center gap-1.5 md:gap-2 w-full sm:w-[100px] px-4 py-2 text-xs md:text-sm font-semibold rounded-md transition-all cursor-pointer active:scale-95 disabled:opacity-50 shrink-0';

  return (
    <div className="mb-6 md:mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] tracking-tight">
            Reports Management
          </h1>
          <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
            Export comprehensive tourism data, user engagement metrics
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto">
          {/* Reports Analytics Button */}
          <button
            onClick={onOpenAnalytics}
            className="flex items-center justify-center gap-1.5 md:gap-2 px-4 py-2 text-xs md:text-sm font-semibold rounded-md border border-transparent bg-[var(--color-primary)] text-[var(--color-white)] hover:bg-[var(--color-primary-hover)] transition-all shadow-lg shadow-[var(--color-primary)]/25 shrink-0 cursor-pointer active:scale-95"
          >
            <BarChart2 className="w-4 h-4 shrink-0" />
            <span>Analytics</span>
          </button>

          {/* Date Filter, Submit & Reset Controls */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap w-full sm:w-auto">

            {/* Styled Date Picker Button */}
            <div
              onClick={handleOpenPicker}
              className="relative flex items-center justify-center gap-1.5 md:gap-2 px-4 py-2 text-xs md:text-sm font-semibold rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] hover:bg-gray-100 dark:hover:bg-gray-800 text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] transition-all shrink-0 cursor-pointer active:scale-95 shadow-sm"
            >
              <input
                ref={dateInputRef}
                type="date"
                value={selectedDay || ''}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                title={selectedDay ? `Selected Date: ${selectedDay}` : 'Select Date Filter'}
              />
              <Calendar className={`w-4 h-4 shrink-0 ${selectedDay ? 'text-[var(--color-primary)] dark:text-sky-400 font-bold' : 'text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]'}`} />
              <span className={selectedDay ? 'font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]' : 'text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]'}>
                {selectedDay || 'Date'}
              </span>
            </div>

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
              className={`${actionBtnClass} border border-transparent bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm`}
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