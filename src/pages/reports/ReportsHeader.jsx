// src/pages/reports/ReportsHeader.jsx
import React from 'react';
import { RotateCcw, Download, FileSpreadsheet, Calendar, ChevronDown } from 'lucide-react';

export default function ReportsHeader({
  dateRange,
  setDateRange,
  onExportPDF,
  onExportExcel,
  onRefresh,
  isLoading
}) {
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
          {/* Date & Reset Controls */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Date Range Selector */}
            <div className="relative flex-1 sm:flex-initial flex items-center px-3 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] rounded-xl hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] transition-colors">
              <Calendar size={16} className="mr-1.5 shrink-0 text-gray-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full bg-transparent pr-4 focus:outline-none cursor-pointer text-xs sm:text-sm font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]"
              >
                <option value="all" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">All Time</option>
                <option value="today" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Today</option>
                <option value="7days" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Last 7 Days</option>
                <option value="30days" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Last 30 Days</option>
                <option value="ytd" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Year To Date</option>
              </select>
              <ChevronDown size={14} className="absolute right-2 pointer-events-none text-gray-400" />
            </div>

            {/* Reset / Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="flex items-center justify-center gap-1.5 px-3 py-2 border border-[var(--color-warning-border)] dark:border-[var(--color-warning-dark-border)] text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)] rounded-xl hover:bg-[var(--color-warning-bg)] dark:hover:bg-[var(--color-warning-dark-bg)] transition-colors cursor-pointer disabled:opacity-50 shrink-0"
              title="Reset & Refresh"
            >
              <RotateCcw size={16} className={`shrink-0 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="font-medium text-xs sm:text-sm">Reset</span>
            </button>
          </div>

          {/* Export PDF & Excel Row */}
          <div className="grid grid-cols-2 gap-2 w-full sm:w-auto sm:flex sm:items-center">
            {/* Export PDF */}
            <button
              onClick={onExportPDF}
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-red-600 hover:bg-red-700 text-white font-medium text-xs sm:text-sm rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              <Download size={16} className="shrink-0" />
              <span>PDF</span>
            </button>

            {/* Export Excel */}
            <button
              onClick={onExportExcel}
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium text-xs sm:text-sm rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              <FileSpreadsheet size={16} className="shrink-0" />
              <span>Excel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
