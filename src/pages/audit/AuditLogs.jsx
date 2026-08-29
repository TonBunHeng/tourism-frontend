import { useState, useEffect } from 'react';
import {
  ShieldAlert, Search, Download, Filter, Eye, RefreshCw,
  User, Clock, Database, Globe, AlertCircle, FileText
} from 'lucide-react';
import auditLogService from '../../services/auditLogService';

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [meta, setMeta] = useState(null);

  // Detail Modal State
  const [selectedLog, setSelectedLog] = useState(null);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {
        page,
        per_page: 25,
        ...(search && { search }),
        ...(actionFilter && { action: actionFilter }),
      };
      const res = await auditLogService.getAuditLogs(params);
      setLogs(res.data || []);
      setPagination(res.pagination);
      setMeta(res.meta);
    } catch (err) {
      console.error('Failed to fetch audit logs:', err);
      setError(err.response?.data?.message || 'Could not load audit logs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page, actionFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchLogs();
  };

  const handleExport = async () => {
    try {
      const blob = await auditLogService.exportAuditLogs();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `angkorverses_audit_logs_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error('Export error:', err);
      alert('Failed to export audit logs.');
    }
  };

  const getActionBadgeColor = (action) => {
    if (action.includes('delete')) return 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300 border-red-200 dark:border-red-800';
    if (action.includes('create')) return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
    if (action.includes('update') || action.includes('modify')) return 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border-blue-200 dark:border-blue-800';
    if (action.includes('login') || action.includes('auth')) return 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border-purple-200 dark:border-purple-800';
    return 'bg-gray-50 text-gray-700 dark:bg-zinc-800 dark:text-zinc-300 border-gray-200 dark:border-zinc-700';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-zinc-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2.5">
            <ShieldAlert className="w-6 h-6 text-[#003E83] dark:text-blue-400" />
            <span>Audit Logs & System Activity</span>
          </h1>
          <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
            Immutable log of administrative operations, content modifications, and security actions.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={fetchLogs}
            className="p-2 rounded-md border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-zinc-300 text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Refresh logs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleExport}
            className="px-3 py-2 rounded-md bg-[#003E83] hover:bg-[#002e62] text-white text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-white dark:bg-zinc-900 p-3 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-xs">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by user, action, description, or IP address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 border border-gray-200 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-1 focus:ring-[#003E83] focus:border-[#003E83] transition-colors"
          />
        </form>

        <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={actionFilter}
            onChange={(e) => {
              setActionFilter(e.target.value);
              setPage(1);
            }}
            className="w-full md:w-auto px-3 py-2 text-xs bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 border border-gray-200 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-1 focus:ring-[#003E83] focus:border-[#003E83] transition-colors cursor-pointer"
          >
            <option value="">All Actions</option>
            {meta?.unique_actions?.map((act) => (
              <option key={act} value={act}>{act}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 overflow-hidden shadow-xs">
        {loading ? (
          <div className="p-12 text-center text-xs text-gray-400 dark:text-zinc-500 animate-pulse">
            Loading system audit records...
          </div>
        ) : error ? (
          <div className="p-8 text-center text-xs text-red-600 dark:text-red-400">
            {error}
          </div>
        ) : logs.length === 0 ? (
          <div className="p-12 text-center text-xs text-gray-400 dark:text-zinc-500">
            No audit log entries matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 dark:bg-zinc-800/60 border-b border-gray-200 dark:border-zinc-800 text-gray-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Action</th>
                  <th className="px-4 py-3">Entity</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">IP Address</th>
                  <th className="px-4 py-3 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50/70 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="px-4 py-3 text-gray-500 dark:text-zinc-400 whitespace-nowrap">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <User size={13} className="text-gray-400" />
                        <span>{log.user_name || 'System'}</span>
                        {log.user_role && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-gray-100 dark:bg-zinc-800 text-gray-500">
                            {log.user_role}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold border ${getActionBadgeColor(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-zinc-300 whitespace-nowrap">
                      {log.entity_type ? `${log.entity_type} #${log.entity_id || ''}` : '-'}
                    </td>
                    <td className="px-4 py-3 text-gray-700 dark:text-zinc-300 max-w-xs truncate">
                      {log.description || '-'}
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-zinc-400 font-mono text-[11px] whitespace-nowrap">
                      {log.ip_address || '-'}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedLog(log)}
                        className="p-1 text-gray-400 hover:text-[#003E83] dark:hover:text-blue-400 transition-colors cursor-pointer"
                        title="View Full Details"
                      >
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        {pagination && pagination.last_page > 1 && (
          <div className="px-4 py-3 bg-gray-50 dark:bg-zinc-800/40 border-t border-gray-200 dark:border-zinc-800 flex items-center justify-between text-xs text-gray-500">
            <span>
              Page {pagination.current_page} of {pagination.last_page} ({pagination.total} total logs)
            </span>
            <div className="flex items-center gap-1.5">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-2.5 py-1 rounded border border-gray-300 dark:border-zinc-700 disabled:opacity-40 cursor-pointer"
              >
                Previous
              </button>
              <button
                disabled={page >= pagination.last_page}
                onClick={() => setPage((p) => p + 1)}
                className="px-2.5 py-1 rounded border border-gray-300 dark:border-zinc-700 disabled:opacity-40 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Log Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-lg max-w-lg w-full p-5 sm:p-6 shadow-lg border border-gray-200 dark:border-zinc-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-zinc-800">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Audit Record #{selectedLog.id}
              </h3>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-gray-400 hover:text-gray-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-gray-50 dark:bg-zinc-800/50 p-3 rounded-md">
                <div>
                  <span className="text-gray-400 block">Action</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{selectedLog.action}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Timestamp</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {new Date(selectedLog.created_at).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block">Operator</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {selectedLog.user_name} ({selectedLog.user_role})
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block">IP / Client</span>
                  <span className="font-semibold text-gray-900 dark:text-white font-mono">
                    {selectedLog.ip_address}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-gray-400 block mb-1">Description</span>
                <p className="p-2.5 rounded bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-zinc-200">
                  {selectedLog.description || 'No description provided.'}
                </p>
              </div>

              {selectedLog.old_values && (
                <div>
                  <span className="text-gray-400 block mb-1">Previous Values (Before)</span>
                  <pre className="p-2.5 rounded bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-300 font-mono text-[11px] overflow-x-auto">
                    {JSON.stringify(selectedLog.old_values, null, 2)}
                  </pre>
                </div>
              )}

              {selectedLog.new_values && (
                <div>
                  <span className="text-gray-400 block mb-1">New Values (After)</span>
                  <pre className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 font-mono text-[11px] overflow-x-auto">
                    {JSON.stringify(selectedLog.new_values, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            <div className="mt-6 pt-3 border-t border-gray-100 dark:border-zinc-800 flex justify-end">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-1.5 rounded-md bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-xs font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
