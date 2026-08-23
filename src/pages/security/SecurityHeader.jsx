import { Download } from 'lucide-react';

export default function SecurityHeader({
  onOpenExport
}) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] tracking-tight">
            Security & Audit Center
          </h1>
          <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
            Monitor real-time authentication attacks, threshold violations, and backend security logs
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <button
            type="button"
            onClick={onOpenExport}
            className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs md:text-sm font-semibold rounded-md border border-transparent bg-[var(--color-primary)] text-[var(--color-white)] hover:bg-[var(--color-primary-hover)] transition-all shadow-lg shadow-[var(--color-primary)]/25 shrink-0 cursor-pointer active:scale-95"
            title="Download Security Audit Report"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>Download Data</span>
          </button>
        </div>
      </div>
    </div>
  );
}
