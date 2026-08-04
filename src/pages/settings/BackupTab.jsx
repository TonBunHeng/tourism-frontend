import { useState } from 'react';
import {
  Database,
  Download,
  Upload,
  Clock,
  Play,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  FileSpreadsheet,
  X
} from 'lucide-react';

export default function BackupTab({ settings, setSettings }) {
  const [backups, setBackups] = useState([
    {
      id: '1',
      name: 'smart_tourism_db_2026-08-04_full.sql',
      size: '142.8 MB',
      date: '2026-08-04 18:00:00',
      type: 'Scheduled Full Backup',
      status: 'Completed'
    },
    {
      id: '2',
      name: 'smart_tourism_db_2026-08-03_full.sql',
      size: '141.2 MB',
      date: '2026-08-03 18:00:00',
      type: 'Scheduled Full Backup',
      status: 'Completed'
    },
    {
      id: '3',
      name: 'smart_tourism_db_2026-08-01_manual.sql',
      size: '139.5 MB',
      date: '2026-08-01 10:24:15',
      type: 'Manual System Snapshot',
      status: 'Completed'
    }
  ]);

  const [creatingBackup, setCreatingBackup] = useState(false);
  const [restoreModalOpen, setRestoreModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [restoring, setRestoring] = useState(false);
  const [notification, setNotification] = useState(null);

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
      const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
      const newBackup = {
        id: Date.now().toString(),
        name: `smart_tourism_db_${timestamp}_manual.sql`,
        size: '143.2 MB',
        date: now.toLocaleString(),
        type: 'Manual System Snapshot',
        status: 'Completed'
      };

      setBackups((prev) => [newBackup, ...prev]);
      setCreatingBackup(false);
      setNotification({ type: 'success', message: 'New system backup created successfully!' });
      setTimeout(() => setNotification(null), 4000);
    }, 2000);
  };

  const handleDeleteBackup = (id) => {
    if (window.confirm('Are you sure you want to delete this backup file?')) {
      setBackups((prev) => prev.filter((b) => b.id !== id));
      setNotification({ type: 'info', message: 'Backup file removed from storage.' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleRestoreSubmit = () => {
    if (!selectedFile) return;
    setRestoring(true);
    setTimeout(() => {
      setRestoring(false);
      setRestoreModalOpen(false);
      setSelectedFile(null);
      setNotification({ type: 'success', message: 'Database successfully restored from backup file!' });
      setTimeout(() => setNotification(null), 4000);
    }, 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Section Header */}
      <div>
        <h2 className="text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
          Database Backup & Restore
        </h2>
        <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
          Manage system snapshots, automate scheduled database backups, and restore system state.
        </p>
      </div>

      {notification && (
        <div
          className={`p-3 rounded-xl text-xs flex items-center justify-between shadow-xs ${
            notification.type === 'success'
              ? 'bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)] text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] border border-[var(--color-success-border)] dark:border-[var(--color-success-dark-border)]'
              : 'bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] border border-[var(--color-info-border)] dark:border-[var(--color-info-dark-border)]'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-[var(--color-text-muted-light)] hover:text-[var(--color-text-secondary-light)]">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Card 1: Action Controls (Create, Restore, Schedule) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Create Backup */}
        <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-xl border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center space-x-2 text-[var(--color-primary)] mb-1">
              <Database className="w-4 h-4" />
              <h3 className="text-xs font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                Manual Backup
              </h3>
            </div>
            <p className="text-[11px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
              Generate a full database snapshot immediately.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCreateBackup}
            disabled={creatingBackup}
            className="w-full py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 text-[var(--color-white)] text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[var(--color-primary)]/25"
          >
            {creatingBackup ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Generating Dump...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Create Backup Now</span>
              </>
            )}
          </button>
        </div>

        {/* Restore Backup */}
        <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-xl border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center space-x-2 text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)] mb-1">
              <Upload className="w-4 h-4" />
              <h3 className="text-xs font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                Restore Database
              </h3>
            </div>
            <p className="text-[11px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
              Restore system records from an uploaded `.sql` file.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setRestoreModalOpen(true)}
            className="w-full py-2 bg-[var(--color-warning-bg)] dark:bg-[var(--color-warning-dark-bg)] text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)] border border-[var(--color-warning-border)] dark:border-[var(--color-warning-dark-border)] hover:bg-[var(--color-warning-hover-border)]/20 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload & Restore</span>
          </button>
        </div>

        {/* Automatic Backup Schedule */}
        <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-xl border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center space-x-2 text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] mb-1">
              <Clock className="w-4 h-4" />
              <h3 className="text-xs font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                Auto Backup Schedule
              </h3>
            </div>
            <p className="text-[11px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
              Automate periodic background backups.
            </p>
          </div>

          <select
            value={settings.backupSchedule || 'daily'}
            onChange={(e) => handleChange('backupSchedule', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)]"
          >
            <option value="daily">Daily Backup (At 00:00 UTC)</option>
            <option value="weekly">Weekly Backup (Sundays)</option>
            <option value="monthly">Monthly Backup (1st of month)</option>
            <option value="disabled">Disabled (Manual only)</option>
          </select>
        </div>
      </div>

      {/* Card 2: Backup History Table */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-xl border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] pb-3">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-[var(--color-primary)]" />
            Backup History Logs
          </h3>
          <span className="text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Total Logs: {backups.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
            <thead className="bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)] uppercase text-[10px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-semibold border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
              <tr>
                <th className="py-2.5 px-3">File Name</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Size</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-subtle-light)] dark:divide-[var(--color-border-dark)]">
              {backups.map((b) => (
                <tr key={b.id} className="hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)]/50 transition-colors">
                  <td className="py-3 px-3 font-mono font-medium text-[var(--color-primary)] truncate max-w-[200px]">
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
                        onClick={() => alert(`Downloading ${b.name}...`)}
                        className="p-1 text-[var(--color-text-muted-light)] hover:text-[var(--color-primary)]"
                        title="Download Backup"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteBackup(b.id)}
                        className="p-1 text-[var(--color-text-muted-light)] hover:text-[var(--color-danger-text)] dark:hover:text-[var(--color-danger-dark-text)]"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-modal-overlay)] backdrop-blur-xs animate-in fade-in">
          <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)] rounded-2xl p-6 max-w-md w-full border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] shadow-xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
              <h4 className="text-sm font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)]" /> Restore Database File
              </h4>
              <button
                onClick={() => setRestoreModalOpen(false)}
                className="text-[var(--color-text-muted-light)] hover:text-[var(--color-text-secondary-light)] dark:hover:text-[var(--color-text-secondary-dark)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-[var(--color-warning-bg)] dark:bg-[var(--color-warning-dark-bg)] border border-[var(--color-warning-border)] dark:border-[var(--color-warning-dark-border)] rounded-xl text-xs text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)] space-y-1">
              <span className="font-bold block">⚠️ Warning: Irreversible Action</span>
              <p className="text-[11px] leading-relaxed">
                Restoring a database snapshot will overwrite all current system records, tourist reviews, and activity logs with the uploaded dump data.
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
                className="px-4 py-2 bg-[var(--color-neutral-badge-bg)] hover:bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)] text-xs font-medium rounded-lg text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRestoreSubmit}
                disabled={!selectedFile || restoring}
                className="px-4 py-2 bg-[var(--color-warning-text)] dark:bg-[var(--color-warning-dark-text)] hover:opacity-90 disabled:opacity-50 text-[var(--color-white)] text-xs font-semibold rounded-lg flex items-center gap-1.5"
              >
                {restoring ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                <span>{restoring ? 'Restoring...' : 'Confirm & Restore'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
