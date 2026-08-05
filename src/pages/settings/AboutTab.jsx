import {
  Info,
  Server,
  Code2,
  Database as DbIcon,
  HardDrive,
  Clock,
  ShieldCheck,
  Cpu,
  Layers
} from 'lucide-react';

export default function AboutTab() {
  const systemInfo = [
    {
      title: 'Application Version',
      value: 'v2.4.0 (Build 2026.08)',
      desc: 'Smart Tourism Information System',
      icon: Info,
      color: 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Laravel Backend API',
      value: 'v11.3.0 (PHP 8.3.4)',
      desc: 'RESTful API & Queue Engine',
      icon: Server,
      color: 'bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400'
    },
    {
      title: 'React Frontend Framework',
      value: 'v19.2.7 (Vite + Tailwind CSS v4)',
      desc: 'Client-side SPA Runtime',
      icon: Code2,
      color: 'bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400'
    },
    {
      title: 'Database Engine',
      value: 'PostgreSQL v16.2 (PostGIS enabled)',
      desc: 'Spatial & Relational Storage',
      icon: DbIcon,
      color: 'bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Section Header */}
      <div>
        <h2 className="text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
          About & System Metrics
        </h2>
        <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
          Read-only specifications, framework versions, host server health, and storage utilization.
        </p>
      </div>

      {/* Card 1: Core Specifications Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {systemInfo.map((info, idx) => {
          const Icon = info.icon;
          return (
            <div
              key={idx}
              className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-4 shadow-xs flex items-center space-x-3.5"
            >
              <div className={`p-3 rounded-md shrink-0 ${info.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] block">
                  {info.title}
                </span>
                <span className="text-xs font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] block truncate mt-0.5">
                  {info.value}
                </span>
                <span className="text-[10px] text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] block truncate mt-0.5">
                  {info.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Card 2: Server Status & Operational Uptime */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] pb-3">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)]" />
            Server Health & Uptime Status
          </h3>
          <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)] text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[var(--color-success-text)] animate-pulse" />
            Healthy & Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/40 p-3 rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
            <span className="text-[10px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] block">Server Host IP</span>
            <span className="font-mono font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mt-0.5 block">103.24.58.12</span>
          </div>

          <div className="bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/40 p-3 rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
            <span className="text-[10px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] block">Current Operational Uptime</span>
            <span className="font-mono font-bold text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] mt-0.5 block">99.98% (42d 18h)</span>
          </div>

          <div className="bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/40 p-3 rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
            <span className="text-[10px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] block">SSL Certificate</span>
            <span className="font-mono font-bold text-[var(--color-primary)] mt-0.5 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Valid (Let's Encrypt)
            </span>
          </div>
        </div>
      </div>

      {/* Card 3: Storage Usage Metric */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] pb-3">
          <HardDrive className="w-4 h-4 text-[var(--color-purple-text)] dark:text-[var(--color-purple-dark-text)]" />
          System Storage Utilization
        </h3>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
              Media & Database Disk Usage
            </span>
            <span className="font-mono font-bold text-[var(--color-purple-text)] dark:text-[var(--color-purple-dark-text)]">
              42.5 GB / 100 GB (42.5% used)
            </span>
          </div>

          <div className="w-full h-3 bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-500"
              style={{ width: '42.5%' }}
            />
          </div>

          <div className="grid grid-cols-3 gap-2 text-[10px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] pt-1">
            <div>• Database: 14.2 GB</div>
            <div>• Uploaded Photos: 23.8 GB</div>
            <div>• System Logs & Cache: 4.5 GB</div>
          </div>
        </div>
      </div>

      {/* Card 4: Last Updated Timestamp */}
      <div className="p-4 rounded-md bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] flex items-center justify-between text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-[var(--color-text-muted-light)]" />
          <span>Last System Build & Settings Update:</span>
        </div>
        <span className="font-mono font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
          August 4, 2026 at 23:27 ICT
        </span>
      </div>
    </div>
  );
}
