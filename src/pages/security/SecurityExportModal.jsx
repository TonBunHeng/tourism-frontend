import { useEffect, useState } from 'react';
import {
  X,
  FileText,
  Download,
  FileSpreadsheet,
  Code,
  ShieldCheck,
  Calendar,
  CheckCircle,
  Loader2
} from 'lucide-react';
import securityService from '../../services/securityService';

export default function SecurityExportModal({ isOpen, onClose, alerts = [], meta = {} }) {
  const [downloading, setDownloading] = useState(false);
  const [downloadType, setDownloadType] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 1. Download CSV Report
  const handleDownloadCSV = () => {
    setDownloading(true);
    setDownloadType('csv');

    try {
      const headers = ['ID', 'Target Email', 'Source IP', 'Failed Attempts', 'Type', 'Status', 'Message', 'Timestamp'];
      const rows = alerts.map((alert, index) => [
        index + 1,
        `"${alert.email || ''}"`,
        `"${alert.ip_address || ''}"`,
        alert.attempts || 0,
        `"${alert.type || 'Alert'}"`,
        alert.is_read ? 'Acknowledged' : 'Active Alert',
        `"${(alert.message || '').replace(/"/g, '""')}"`,
        `"${alert.created_at || ''}"`
      ]);

      const csvContent = [
        '# AngkorVerses - Security & Audit Incident Report',
        `# Generated: ${new Date().toISOString()}`,
        `# Total Incidents: ${alerts.length}`,
        '',
        headers.join(','),
        ...rows.map(r => r.join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `security_audit_report_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('CSV Export Error:', err);
    } finally {
      setDownloading(false);
      setDownloadType(null);
      onClose();
    }
  };

  // 2. Download PDF Printable Document
  const handleDownloadPDF = () => {
    setDownloading(true);
    setDownloadType('pdf');

    try {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert('Please allow popups to generate and print the PDF security report.');
        setDownloading(false);
        return;
      }

      const rowsHtml = alerts.map((alert, idx) => `
        <tr style="border-bottom: 1px solid #e2e8f0; font-size: 11px;">
          <td style="padding: 8px 10px; font-family: monospace;">${idx + 1}</td>
          <td style="padding: 8px 10px; font-weight: 600;">${alert.email}</td>
          <td style="padding: 8px 10px; font-family: monospace;">${alert.ip_address || '127.0.0.1'}</td>
          <td style="padding: 8px 10px; text-align: center; color: ${alert.attempts >= 6 ? '#dc2626' : '#d97706'}; font-weight: bold;">
            ${alert.attempts} tries
          </td>
          <td style="padding: 8px 10px;">${alert.is_read ? 'Acknowledged' : '<strong style="color:#dc2626">Active</strong>'}</td>
          <td style="padding: 8px 10px; color: #64748b;">${new Date(alert.created_at).toLocaleString()}</td>
        </tr>
      `).join('');

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>AngkorVerses Security Audit Report</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 30px; color: #0f172a; margin: 0; }
            .header { border-bottom: 2px solid #003E83; padding-bottom: 15px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; }
            .logo { font-size: 22px; font-weight: 800; color: #003E83; letter-spacing: -0.5px; }
            .title { font-size: 14px; font-weight: 600; color: #64748b; margin-top: 4px; }
            .meta { font-size: 11px; color: #64748b; text-align: right; }
            .kpis { display: flex; gap: 15px; margin-bottom: 25px; }
            .kpi-card { flex: 1; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; background: #f8fafc; }
            .kpi-label { font-size: 10px; text-transform: uppercase; font-weight: 700; color: #64748b; }
            .kpi-value { font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 2px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th { background: #f1f5f9; text-align: left; padding: 8px 10px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #475569; }
            .footer { margin-top: 30px; font-size: 10px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="logo">AngkorVerses Platform</div>
              <div class="title">Security Incident & Authentication Audit Report</div>
            </div>
            <div class="meta">
              <div><strong>Report Date:</strong> ${new Date().toLocaleDateString()}</div>
              <div><strong>Generated by:</strong> System Administrator</div>
            </div>
          </div>

          <div class="kpis">
            <div class="kpi-card">
              <div class="kpi-label">Total Incidents</div>
              <div class="kpi-value">${alerts.length}</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">Unread Alerts</div>
              <div class="kpi-value">${meta.unread_count || 0}</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">High Risk (≥6 Failures)</div>
              <div class="kpi-value">${meta.high_risk_count || 0}</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">Blocked IPs</div>
              <div class="kpi-value">${meta.blocked_ips_count || 0}</div>
            </div>
          </div>

          <h3 style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Recorded Security Incidents</h3>
          <table>
            <thead>
              <tr>
                <th style="width: 30px;">#</th>
                <th>Target Account</th>
                <th>Source IP</th>
                <th style="text-align: center;">Failures</th>
                <th>Status</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>

          <div class="footer">
            Confidential Security Document • Generated by AngkorVerses Security Defense System • All passwords Bcrypt protected
          </div>

          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
        </html>
      `;

      printWindow.document.write(htmlContent);
      printWindow.document.close();
    } catch (err) {
      console.error('PDF Generation Error:', err);
    } finally {
      setDownloading(false);
      setDownloadType(null);
      onClose();
    }
  };

  // 3. Download JSON Audit File
  const handleDownloadJSON = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
        report: "AngkorVerses Security Audit Report",
        generated_at: new Date().toISOString(),
        meta,
        alerts
      }, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `security_audit_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (err) {
      console.error('JSON Export Error:', err);
    } finally {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 transition-opacity duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] border border-gray-200 dark:border-zinc-800 rounded-lg shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded bg-blue-50 text-[#003E83] dark:bg-zinc-800 dark:text-blue-400">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-zinc-100">
                Download Security Report
              </h2>
              <p className="text-xs text-gray-500 dark:text-zinc-400">
                Choose your preferred export document format
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300 rounded transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: Options */}
        <div className="p-4 space-y-2.5">
          {/* Option 1: PDF Document */}
          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="w-full p-3 rounded-md border border-gray-200 dark:border-zinc-800 hover:border-[#003E83] dark:hover:border-blue-500 bg-gray-50/50 dark:bg-zinc-800/40 hover:bg-gray-100/70 dark:hover:bg-zinc-800 transition-colors flex items-start gap-3 text-left cursor-pointer group"
          >
            <div className="p-2 rounded bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/40 shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-100">
                  PDF Security Audit Report
                </h4>
                <span className="text-[10px] uppercase font-semibold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/60 px-1.5 py-0.5 rounded border border-red-200 dark:border-red-900/40">
                  PDF
                </span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400 mt-0.5">
                Formatted executive document with KPIs, incident tables, and system defense summary.
              </p>
            </div>
          </button>

          {/* Option 2: CSV Spreadsheet */}
          <button
            type="button"
            onClick={handleDownloadCSV}
            disabled={downloading}
            className="w-full p-3 rounded-md border border-gray-200 dark:border-zinc-800 hover:border-[#003E83] dark:hover:border-blue-500 bg-gray-50/50 dark:bg-zinc-800/40 hover:bg-gray-100/70 dark:hover:bg-zinc-800 transition-colors flex items-start gap-3 text-left cursor-pointer group"
          >
            <div className="p-2 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40 shrink-0">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-100">
                  CSV / Excel Spreadsheet
                </h4>
                <span className="text-[10px] uppercase font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-900/40">
                  CSV
                </span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400 mt-0.5">
                Spreadsheet data with raw timestamps, source IPs, target emails, and failure counters.
              </p>
            </div>
          </button>

          {/* Option 3: JSON Audit Log */}
          <button
            type="button"
            onClick={handleDownloadJSON}
            disabled={downloading}
            className="w-full p-3 rounded-md border border-gray-200 dark:border-zinc-800 hover:border-[#003E83] dark:hover:border-blue-500 bg-gray-50/50 dark:bg-zinc-800/40 hover:bg-gray-100/70 dark:hover:bg-zinc-800 transition-colors flex items-start gap-3 text-left cursor-pointer group"
          >
            <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/40 shrink-0">
              <Code className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-100">
                  JSON Security Audit Log
                </h4>
                <span className="text-[10px] uppercase font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded border border-indigo-200 dark:border-indigo-900/40">
                  JSON
                </span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400 mt-0.5">
                Structured machine-readable logs for SIEM and security analysis tools.
              </p>
            </div>
          </button>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-slate-50/60 dark:bg-zinc-800/40 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-zinc-400">
            {alerts.length} incident records ready to export
          </span>
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-4 rounded-lg bg-slate-200 dark:bg-zinc-700 hover:bg-slate-300 dark:hover:bg-zinc-600 text-xs font-semibold text-slate-700 dark:text-zinc-200 transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
