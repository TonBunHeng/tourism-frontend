import React from 'react';
import { Code2, Activity, HardDrive, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function AboutTab() {
  const systemMetrics = {
    appVersion: 'v2.4.0-release',
    laravelVersion: 'v11.3.1',
    reactVersion: 'v19.2.7',
    databaseVersion: 'PostgreSQL 16.2',
    serverStatus: 'Healthy / Online',
    uptime: '99.98%',
    cpuUsage: '14%',
    memoryUsage: '2.1 GB / 8.0 GB (26.2%)',
    storageUsed: 42.5,
    storageTotal: 100,
    lastUpdated: 'August 4, 2026 - 14:30:00 UTC',
    environment: 'Production'
  };

  const storagePercentage = Math.round((systemMetrics.storageUsed / systemMetrics.storageTotal) * 100);

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      <div>
        <h2 className="text-base md:text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)]">
          System Overview & Diagnostics
        </h2>
        <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
          Read-only specifications, framework versions, server health status, and storage usage metrics.
        </p>
      </div>

      {/* System Health Status Banner */}
      <div className="bg-gradient-to-br from-[#003E83] to-[#001D40] text-[var(--color-white)] rounded-xl p-4 md:p-5 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-10 pointer-events-none">
          <ShieldCheck className="w-48 h-48" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[var(--color-brand-teal)] border border-white/20">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-brand-teal)]">
                  System Health
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  <CheckCircle2 className="w-3 h-3" /> {systemMetrics.serverStatus}
                </span>
              </div>
              <h3 className="text-lg font-extrabold tracking-tight mt-0.5">
                Smart Tourism Information System
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-medium text-blue-100 border-t md:border-t-0 border-white/10 pt-2.5 md:pt-0">
            <div>
              <span className="block text-[10px] text-[var(--color-brand-teal)] uppercase tracking-wider font-bold">Uptime</span>
              <span className="text-xs font-bold text-white">{systemMetrics.uptime}</span>
            </div>
            <div className="w-px h-6 bg-white/15 hidden md:block" />
            <div>
              <span className="block text-[10px] text-[var(--color-brand-teal)] uppercase tracking-wider font-bold">Environment</span>
              <span className="text-xs font-bold text-white">{systemMetrics.environment}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Software & Framework Versions Grid */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-xl p-4 md:p-5 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] shadow-xs space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)] dark:text-[var(--color-brand-teal)] flex items-center gap-1.5">
          <Code2 className="w-3.5 h-3.5" /> Core Software Specifications
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-lg bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-input-dark-bg)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
            <span className="text-xs font-semibold text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] block mb-0.5">
              Application Version
            </span>
            <span className="text-sm font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)] font-mono">
              {systemMetrics.appVersion}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-input-dark-bg)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
            <span className="text-xs font-semibold text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] block mb-0.5">
              Backend Framework
            </span>
            <span className="text-sm font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)] font-mono">
              {systemMetrics.laravelVersion}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-input-dark-bg)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
            <span className="text-xs font-semibold text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] block mb-0.5">
              Frontend Engine
            </span>
            <span className="text-sm font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)] font-mono">
              {systemMetrics.reactVersion}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-input-dark-bg)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
            <span className="text-xs font-semibold text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] block mb-0.5">
              Database Engine
            </span>
            <span className="text-sm font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)] font-mono">
              {systemMetrics.databaseVersion}
            </span>
          </div>
        </div>
      </div>

      {/* Resource Metrics & Storage Card */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-xl p-4 md:p-5 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] shadow-xs space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)] dark:text-[var(--color-brand-teal)] flex items-center gap-1.5">
          <HardDrive className="w-3.5 h-3.5" /> Server Storage & Resource Usage
        </h3>

        {/* Storage Progress Bar */}
        <div>
          <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
            <span className="text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)] flex items-center gap-1">
              Disk Storage Consumption
            </span>
            <span className="text-[var(--color-primary)] dark:text-[var(--color-brand-teal)]">
              {systemMetrics.storageUsed} GB / {systemMetrics.storageTotal} GB ({storagePercentage}%)
            </span>
          </div>
          <div className="h-2.5 w-full bg-[var(--color-border-subtle-light)] dark:bg-[var(--color-border-dark)] rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-[var(--color-primary)] dark:bg-[var(--color-brand-teal)] rounded-full transition-all duration-500"
              style={{ width: `${storagePercentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-input-dark-bg)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
            <span className="text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">CPU Load</span>
            <span className="text-xs md:text-sm font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)]">{systemMetrics.cpuUsage}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-input-dark-bg)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
            <span className="text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">RAM Allocated</span>
            <span className="text-xs md:text-sm font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)]">{systemMetrics.memoryUsage}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-input-dark-bg)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
            <span className="text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Last System Update</span>
            <span className="text-xs font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[var(--color-text-muted-light)] dark:text-[var(--color-text-muted-dark)]" /> {systemMetrics.lastUpdated}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
