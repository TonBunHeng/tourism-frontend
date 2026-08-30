import { useState } from 'react';
import {
  Database,
  Download,
  Upload,
  Play,
  Trash2,
  AlertTriangle,
  RefreshCw,
  FileSpreadsheet,
  Zap,
  X
} from 'lucide-react';
import { useAlert } from '../../context/AlertContext';

export default function BackupTab({ settings, setSettings }) {
  const { showConfirm, showSuccess, showInfo } = useAlert();
  const [backups, setBackups] = useState([
    {
      id: '1',
      name: 'angkorverses_db_2026-08-30_full.sql',
      size: '148.4 MB',
      date: '2026-08-30 02:00:00 ICT',
      type: 'Automated Daily Snapshot',
      status: 'Completed'
    },
    {
      id: '2',
      name: 'angkorverses_db_2026-08-29_full.sql',
      size: '146.9 MB',
      date: '2026-08-29 02:00:00 ICT',
      type: 'Automated Daily Snapshot',
      status: 'Completed'
    },
    {
      id: '3',
      name: 'angkorverses_db_2026-08-25_manual.sql',
      size: '144.1 MB',
      date: '2026-08-25 14:18:22 ICT',
      type: 'Manual System Snapshot',
      status: 'Completed'
    }
  ]);

  const [creatingBackup, setCreatingBackup] = useState(false);
  const [clearingCache, setClearingCache] = useState(false);
  const [purgingTemp, setPurgingTemp] = useState(false);
  const [optimizingDb, setOptimizingDb] = useState(false);

  const [restoreModalOpen, setRestoreModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [restoring, setRestoring] = useState(false);

  const handleChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateBackup = () => {
    setCreatingBackup(true);
    setTimeout(() => {
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0];
      const timeStr = now.toTimeString().split(' ')[0];
      const newBackup = {
        id: String(Date.now()),
        name: `angkorverses_db_${dateStr}_manual.sql`,
        size: '149.2 MB',
        date: `${dateStr} ${timeStr} ICT`,
        type: 'Manual System Snapshot',
        status: 'Completed'
      };

      setBackups([newBackup, ...backups]);
      setCreatingBackup(false);
      showSuccess(`Database snapshot "${newBackup.name}" (149.2 MB) generated and stored successfully.`, 'Backup Created');
    }, 1800);
  };

  const handleDeleteBackup = async (id) => {
    const target = backups.find((b) => b.id === id);
    const confirmed = await showConfirm({
      title: 'Delete Backup Snapshot',
      message: `Are you sure you want to permanently remove "${target?.name || 'this backup file'}"?`,
      confirmText: 'Delete Snapshot',
      type: 'danger'
    });

    if (confirmed) {
      setBackups(backups.filter((b) => b.id !== id));
      showSuccess('Backup file has been removed from server storage.', 'Deleted');
    }
  };

  const handleRestoreSubmit = () => {
    if (!selectedFile) return;
    setRestoring(true);
    setTimeout(() => {
      setRestoring(false);
      setRestoreModalOpen(false);
      setSelectedFile(null);
      showSuccess(`Database state restored successfully from "${selectedFile.name}".`, 'Database Restored');
    }, 2200);
  };

  const handleClearCache = () => {
    setClearingCache(true);
    setTimeout(() => {
      setClearingCache(false);
      showSuccess('Application configuration, route cache, and compiled views have been purged.', 'Cache Cleared');
    }, 1200);
  };

  const handlePurgeTemp = () => {
    setPurgingTemp(true);
    setTimeout(() => {
      setPurgingTemp(false);
      showSuccess('Temporary upload artifacts and cached thumbnail fragments have been purged (2.4 GB reclaimed).', 'Storage Cleaned');
    }, 1400);
  };

  const handleOptimizeDb = () => {
    setOptimizingDb(true);
    setTimeout(() => {
      setOptimizingDb(false);
      showSuccess('All database tables, spatial indexes, and foreign key relations optimized.', 'Database Optimized');
    }, 1600);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Section Header */}
      <div>
        <h2 className="text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
          Backup, Restore & Maintenance
        </h2>
        <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
          Automate relational database snapshots, restore backups, configure retention, and run system cache cleanups.
        </p>
      </div>

      {/* Card 1: Snapshot Actions & Automation Schedule */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] pb-4">
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2">
              <Database className="w-4 h-4 text-[var(--color-primary)]" />
              Database Snapshots & Disaster Recovery
            </h3>
            <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-0.5">
              Exports full SQL dumps of places, categories, reviews, events, users, and audit logs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setRestoreModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] transition-all cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Restore from SQL</span>
            </button>

            <button
              type="button"
              onClick={handleCreateBackup}
              disabled={creatingBackup}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-md bg-[#003E83] hover:bg-[#002e62] text-white shadow-xs transition-all cursor-pointer disabled:opacity-50"
            >
              {creatingBackup ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{creatingBackup ? 'Creating Snapshot...' : 'Create Snapshot Now'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              Automated Snapshot Frequency
            </label>
            <select
              value={settings.backupSchedule || 'daily'}
              onChange={(e) => handleChange('backupSchedule', e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)]"
            >
              <option value="daily">Daily at 02:00 AM (ICT)</option>
              <option value="weekly">Weekly (Sunday Midnight)</option>
              <option value="monthly">Monthly (1st of month)</option>
              <option value="disabled">Disabled (Manual Only)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              Snapshot Retention Policy
            </label>
            <select
              value={settings.backupRetention || '30'}
              onChange={(e) => handleChange('backupRetention', e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)]"
            >
              <option value="7">Retain last 7 days</option>
              <option value="14">Retain last 14 days</option>
              <option value="30">Retain last 30 days (Recommended)</option>
              <option value="90">Retain last 90 days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Card 2: Administrative Maintenance & Cache Tools */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] pb-3">
          <Zap className="w-4 h-4 text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)]" />
          System Maintenance & Cache Operations
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-surface-hover-light)]/40 dark:bg-[var(--color-surface-hover-dark)]/20 flex flex-col justify-between space-y-3">
            <div>
              <h4 className="text-xs font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                Purge System Cache
              </h4>
              <p className="text-[11px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
                Flushes Laravel config, routes, and compiled templates.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClearCache}
              disabled={clearingCache}
              className="w-full py-1.5 text-xs font-semibold rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-primary)] hover:bg-[var(--color-info-bg)] transition-all cursor-pointer disabled:opacity-50"
            >
              {clearingCache ? 'Flushing...' : 'Clear Cache'}
            </button>
          </div>

          <div className="p-4 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-surface-hover-light)]/40 dark:bg-[var(--color-surface-hover-dark)]/20 flex flex-col justify-between space-y-3">
            <div>
              <h4 className="text-xs font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                Purge Temp Uploads
              </h4>
              <p className="text-[11px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
                Reclaims disk space by purging unlinked temp images.
              </p>
            </div>
            <button
              type="button"
              onClick={handlePurgeTemp}
              disabled={purgingTemp}
              className="w-full py-1.5 text-xs font-semibold rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-primary)] hover:bg-[var(--color-info-bg)] transition-all cursor-pointer disabled:opacity-50"
            >
              {purgingTemp ? 'Purging...' : 'Purge Temp Files'}
            </button>
          </div>

          <div className="p-4 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-surface-hover-light)]/40 dark:bg-[var(--color-surface-hover-dark)]/20 flex flex-col justify-between space-y-3">
            <div>
              <h4 className="text-xs font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                Optimize Database
              </h4>
              <p className="text-[11px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
                Defragments tables and updates query analyzer stats.
              </p>
            </div>
            <button
              type="button"
              onClick={handleOptimizeDb}
              disabled={optimizingDb}
              className="w-full py-1.5 text-xs font-semibold rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-primary)] hover:bg-[var(--color-info-bg)] transition-all cursor-pointer disabled:opacity-50"
            >
              {optimizingDb ? 'Optimizing...' : 'Optimize Tables'}
            </button>
          </div>
        </div>
      </div>

      {/* Card 3: Snapshot History Table */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] pb-3">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-[var(--color-primary)]" />
            Stored Backup Snapshots
          </h3>
          <span className="text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
            Total Archives: {backups.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
            <thead className="bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)] uppercase text-[10px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-semibold border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
              <tr>
                <th className="py-2.5 px-3">Archive File Name</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Size</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-subtle-light)] dark:divide-[var(--color-border-dark)]">
              {backups.map((b) => (
                <tr key={b.id} className="hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)]/50 transition-colors">
                  <td className="py-3 px-3 font-mono font-medium text-[var(--color-primary)] truncate max-w-[220px]">
                    {b.name}
                  </td>
                  <td className="py-3 px-3 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">{b.type}</td>
                  <td className="py-3 px-3 text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]">{b.date}</td>
                  <td className="py-3 px-3 font-medium">{b.size}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)] text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)]">
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => showInfo(`Preparing download for backup archive "${b.name}" (${b.size}).`, 'Download Started')}
                        className="p-1 text-[var(--color-text-muted-light)] hover:text-[var(--color-primary)] cursor-pointer"
                        title="Download Backup"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteBackup(b.id)}
                        className="p-1 text-[var(--color-text-muted-light)] hover:text-[var(--color-danger-text)] dark:hover:text-[var(--color-danger-dark-text)] cursor-pointer"
                        title="Delete Backup"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Restore Warning Modal */}
      {restoreModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 transition-opacity duration-150">
          <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)] rounded-lg p-6 max-w-md w-full border border-gray-200 dark:border-zinc-800 shadow-lg space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
              <h4 className="text-sm font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)]" /> Restore Database File
              </h4>
              <button
                type="button"
                onClick={() => setRestoreModalOpen(false)}
                className="text-[var(--color-text-muted-light)] hover:text-[var(--color-text-secondary-light)] dark:hover:text-[var(--color-text-secondary-dark)] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-[var(--color-warning-bg)] dark:bg-[var(--color-warning-dark-bg)] border border-[var(--color-warning-border)] dark:border-[var(--color-warning-dark-border)] rounded-md text-xs text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)] space-y-1">
              <span className="font-bold block">⚠️ Caution: Irreversible Database Overwrite</span>
              <p className="text-[11px] leading-relaxed">
                Restoring a snapshot will replace all active tourist records, review submissions, and media references with the data from the chosen dump file.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
                Select Database Dump File (.sql)
              </label>
              <input
                type="file"
                accept=".sql,.dump,.gz"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="w-full text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[var(--color-neutral-badge-bg)] file:text-[var(--color-neutral-badge-text)] dark:file:bg-[var(--color-surface-hover-dark)] dark:file:text-[var(--color-white)] hover:file:bg-[var(--color-surface-hover-light)]"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setRestoreModalOpen(false)}
                className="px-4 py-2 bg-[var(--color-neutral-badge-bg)] hover:bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)] text-xs font-semibold rounded-md border border-transparent text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRestoreSubmit}
                disabled={!selectedFile || restoring}
                className="px-4 py-2 bg-[var(--color-warning-text)] dark:bg-[var(--color-warning-dark-text)] hover:opacity-90 disabled:opacity-50 text-white text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                {restoring ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                <span>{restoring ? 'Restoring Database...' : 'Confirm & Restore'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
