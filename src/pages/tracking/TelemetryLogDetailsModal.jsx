import React from 'react';
import { createPortal } from 'react-dom';
import { X, Activity, ShieldCheck, ShieldAlert, Clock, User, Globe, Server, FileCode, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function TelemetryLogDetailsModal({
  log,
  onClose
}) {
  if (!log) return null;

  const riskLevel = log.risk_level || (log.action?.includes('security') || log.action?.includes('reject') ? 'high' : 'normal');

  const getRiskBadge = () => {
    switch (riskLevel) {
      case 'high':
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 border border-red-200 dark:border-red-800">
            <ShieldAlert size={14} /> High Security Risk
          </span>
        );
      case 'medium':
      case 'caution':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <AlertTriangle size={14} /> Caution Alert
          </span>
        );
      case 'normal':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck size={14} /> Normal Operation
          </span>
        );
    }
  };

  const jsonPayload = {
    event_id: log.id || 'EVT-9921820',
    timestamp: log.created_at || new Date().toISOString(),
    actor: {
      user_id: log.user_id || 42,
      user_name: log.user_name || 'System User',
      user_role: log.user_role || 'admin',
      ip_address: log.ip_address || '127.0.0.1',
      user_agent: log.user_agent || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
    },
    action_context: {
      category: log.category || 'Authentication',
      description: log.description || 'Action performed',
      route: log.path || '/api/v1/auth/session',
      method: log.method || 'POST',
      response_time_ms: log.latency_ms || 42,
      status_code: log.status_code || 200
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-alert-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col relative border border-gray-200 dark:border-zinc-800 animate-alert-popup overflow-hidden text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/40 relative flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Activity size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Telemetry Event Payload
                </h3>
                {getRiskBadge()}
              </div>
              <p className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">
                Event ID #{log.id || 'EVT-9921820'} • Recorded {new Date(log.created_at || Date.now()).toLocaleString()}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-gray-50 dark:bg-zinc-800/40 rounded-xl border border-gray-100 dark:border-zinc-800 space-y-1">
              <span className="text-gray-400 text-[10px] uppercase font-semibold block">User / Actor</span>
              <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
                <User size={13} className="text-indigo-600 dark:text-indigo-400" />
                {log.user_name || 'System User'} ({log.user_role})
              </span>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-zinc-800/40 rounded-xl border border-gray-100 dark:border-zinc-800 space-y-1">
              <span className="text-gray-400 text-[10px] uppercase font-semibold block">IP Address & Origin</span>
              <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-1.5 font-mono">
                <Globe size={13} className="text-blue-600 dark:text-blue-400" />
                {log.ip_address || '127.0.0.1'} (Cambodia ISP)
              </span>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-zinc-800/40 rounded-xl border border-gray-100 dark:border-zinc-800 space-y-1">
              <span className="text-gray-400 text-[10px] uppercase font-semibold block">Event Category</span>
              <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
                <Server size={13} className="text-emerald-600 dark:text-emerald-400" />
                {log.category || 'Authentication & Session'}
              </span>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-zinc-800/40 rounded-xl border border-gray-100 dark:border-zinc-800 space-y-1">
              <span className="text-gray-400 text-[10px] uppercase font-semibold block">Response Speed & Status</span>
              <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-1.5 font-mono">
                <Clock size={13} className="text-purple-600 dark:text-purple-400" />
                {log.latency_ms || 38}ms • Status {log.status_code || 200} OK
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-gray-50 dark:bg-zinc-800/40 rounded-xl border border-gray-100 dark:border-zinc-800">
            <span className="text-gray-400 text-[10px] uppercase font-semibold block mb-1">Description</span>
            <p className="text-gray-900 dark:text-white font-medium">{log.description}</p>
          </div>

          {/* JSON Tree View */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                <FileCode size={14} className="text-indigo-600 dark:text-indigo-400" />
                Full JSON Telemetry Packet
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(JSON.stringify(jsonPayload, null, 2))}
                className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline font-semibold cursor-pointer"
              >
                Copy Raw JSON
              </button>
            </div>
            <pre className="p-4 bg-gray-900 text-emerald-400 rounded-xl text-[11px] font-mono overflow-x-auto border border-gray-800 leading-relaxed">
              {JSON.stringify(jsonPayload, null, 2)}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/40 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs transition-all cursor-pointer"
          >
            Close Payload View
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
