// src/pages/reports/ReportsHeader.jsx
import React from 'react';
import { RotateCcw, Download, FileSpreadsheet, Calendar, ChevronDown } from 'lucide-react';

export default function ReportsHeader({
  dateRange,
  setDateRange,
  selectedDay,
  setSelectedDay,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  onExportPDF,
  onExportExcel,
  onRefresh,
  isLoading
}) {
  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  const years = ['2026', '2025', '2024', '2023'];

  // Shared class so Reset / PDF / Excel are always the same size
  const actionBtnClass =
    'flex items-center justify-center gap-1.5 md:gap-2 w-full sm:w-[110px] px-4 py-2 text-xs md:text-sm font-semibold rounded-md transition-all cursor-pointer disabled:opacity-50 shrink-0';

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
          {/* Date Filter & Reset Controls */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap w-full sm:w-auto">
            {/* Main Select Mode: All Time / By Day / By Month / By Year */}
            <div className="relative flex-1 sm:flex-initial flex items-center px-3 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] rounded-md bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] transition-colors">
              <Calendar className="w-4 h-4 mr-1.5 shrink-0 text-gray-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full bg-transparent pr-4 focus:outline-none cursor-pointer text-xs md:text-sm font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]"
              >
                <option value="all" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">All Time</option>
                <option value="day" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">By Day</option>
                <option value="month" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">By Month</option>
                <option value="year" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">By Year</option>
              </select>
              <ChevronDown size={14} className="absolute right-2 pointer-events-none text-gray-400" />
            </div>

            {/* Sub-selector for Day */}
            {dateRange === 'day' && (
              <input
                type="date"
                value={selectedDay || ''}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="px-3 py-2 text-xs md:text-sm rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none cursor-pointer"
              />
            )}

            {/* Sub-selector for Month */}
            {dateRange === 'month' && (
              <div className="relative flex items-center px-3 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] rounded-md">
                <select
                  value={selectedMonth || ''}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="bg-transparent pr-4 focus:outline-none cursor-pointer text-xs md:text-sm font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]"
                >
                  <option value="" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Select Month</option>
                  {months.map((m) => (
                    <option key={m.value} value={m.value} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                      {m.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2 pointer-events-none text-gray-400" />
              </div>
            )}

            {/* Sub-selector for Year */}
            {dateRange === 'year' && (
              <div className="relative flex items-center px-3 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] rounded-md">
                <select
                  value={selectedYear || ''}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="bg-transparent pr-4 focus:outline-none cursor-pointer text-xs md:text-sm font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]"
                >
                  <option value="" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Select Year</option>
                  {years.map((y) => (
                    <option key={y} value={y} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                      {y}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2 pointer-events-none text-gray-400" />
              </div>
            )}

            {/* Reset / Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className={`${actionBtnClass} border border-[var(--color-warning-border)] dark:border-[var(--color-warning-dark-border)] text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)] hover:bg-[var(--color-warning-bg)] dark:hover:bg-[var(--color-warning-dark-bg)]`}
              title="Reset & Refresh"
            >
              <RotateCcw className={`w-4 h-4 shrink-0 ${isLoading ? 'animate-spin' : ''}`} />
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