import React, { useState } from 'react';
import { Database, Download, RefreshCw, Calendar, Loader2, HardDrive, Trash2, CheckCircle2, FileSpreadsheet } from 'lucide-react';

export default function BackupTab({ settings, setSettings }) {
  const [creatingBackup, setCreatingBackup] = useState(false);
  const [backupSuccessMsg, setBackupSuccessMsg] = useState(null);
  const [restoreModalFile, setRestoreModalFile] = useState(null);
  const [restoring, setRestoring] = useState(false);
  const [restoreSuccessMsg, setRestoreSuccessMsg] = useState(null);

  const [backupHistory, setBackupHistory] = useState([
    {
      id: 'bk-2026-08-04-01',
      filename: 'tourism_db_backup_2026_08_04.sql.gz',
      date: '2026-08-04 02:00:00',
      size: '48.2 MB',
      type: 'Database Only',
      status: 'Completed'
    },
    {
      id: 'bk-2026-08-01-01',
      filename: 'tourism_full_backup_2026_08_01.tar.gz',
      date: '2026-08-01 00:00:00',
      size: '342.6 MB',
      type: 'Full System & Storage',
      status: 'Completed'
    },
    {
      id: 'bk-2026-07-25-01',
      filename: 'tourism_db_backup_2026_07_25.sql.gz',
      date: '2026-07-25 02:00:00',
      size: '46.8 MB',
      type: 'Database Only',
      status: 'Completed'
    }
  ]);

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateBackup = () => {
    setCreatingBackup(true);
    setBackupSuccessMsg(null);

    setTimeout(() => {
      const now = new Date();
      const timestamp = now.toISOString().slice(0, 10).replace(/-/g, '_');
      const timeStr = now.toTimeString().slice(0, 8);

      const newBackupItem = {
        id: `bk-${Date.now()}`,
        filename: `tourism_db_backup_${timestamp}.sql.gz`,
        date: `${now.toISOString().slice(0, 10)} ${timeStr}`,
        size: '49.1 MB',
        type: 'Database Only',
        status: 'Completed'
      };

      setBackupHistory((prev) => [newBackupItem, ...prev]);
      setCreatingBackup(false);
      setBackupSuccessMsg('New backup archive generated successfully!');
      setTimeout(() => setBackupSuccessMsg(null), 4000);
    }, 2000);
  };

  const handleDeleteBackup = (id) => {
    setBackupHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const triggerRestoreConfirm = (item) => {
    setRestoreModalFile(item);
  };

  const handleConfirmRestore = () => {
    setRestoring(true);
    setTimeout(() => {
      setRestoring(false);
      setRestoreSuccessMsg(`Database restored successfully from ${restoreModalFile.filename}!`);
      setRestoreModalFile(null);
      setTimeout(() => setRestoreSuccessMsg(null), 4000);
    }, 2000);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      <div>
        <h2 className="text-base md:text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)]">
          Database & System Backup
        </h2>
        <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
          Generate system backups, manage automated schedules, and restore data from snapshots.
        </p>
      </div>

      {backupSuccessMsg && (
        <div className="p-3 rounded-xl bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)] border border-[var(--color-success-border)] dark:border-[var(--color-success-dark-border)] text-xs font-semibold text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{backupSuccessMsg}</span>
        </div>
      )}

      {restoreSuccessMsg && (
        <div className="p-3 rounded-xl bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] border border-[var(--color-info-border)] dark:border-[var(--color-info-dark-border)] text-xs font-semibold text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{restoreSuccessMsg}</span>
        </div>
      )}

      {/* Immediate Actions & Automated Schedule Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Create Backup Now */}
        <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-xl p-4 md:p-5 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)] dark:text-[var(--color-brand-teal)] flex items-center gap-1.5 mb-1.5">
              <Database className="w-3.5 h-3.5" /> Create Manual Backup
            </h3>
            <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-3 leading-relaxed">
              Create an instant snapshot of the PostgreSQL database and stored uploaded media assets.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCreateBackup}
            disabled={creatingBackup}
            className="w-full py-2 px-3 rounded-lg text-xs md:text-sm font-semibold text-[var(--color-white)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-all shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
          >
            {creatingBackup ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Generating Backup...</span>
              </>
            ) : (
              <>
                <HardDrive className="w-3.5 h-3.5" />
                <span>Create Backup Now</span>
              </>
            )}
          </button>
        </div>

        {/* Automated Backup Schedule */}
        <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-xl p-4 md:p-5 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)] dark:text-[var(--color-brand-teal)] flex items-center gap-1.5 mb-1.5">
              <Calendar className="w-3.5 h-3.5" /> Automatic Backup Schedule
            </h3>
            <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-2.5 leading-relaxed">
              Set automated cron jobs to regularly back up database contents to secure storage.
            </p>
          </div>

          <div>
            <select
              value={settings.backupSchedule || 'daily'}
              onChange={(e) => handleChange('backupSchedule', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-bg-light)] dark:bg-[var(--color-input-dark-bg)] text-xs md:text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all cursor-pointer font-medium"
            >
              <option value="disabled">Disabled (Manual Only)</option>
              <option value="daily">Daily at Midnight (00:00 UTC)</option>
              <option value="weekly">Weekly on Sunday</option>
              <option value="monthly">Monthly on 1st Day</option>
            </select>
          </div>
        </div>
      </div>

      {/* Backup History Table Card */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-xl p-4 md:p-5 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)] dark:text-[var(--color-brand-teal)] flex items-center gap-1.5">
            <FileSpreadsheet className="w-3.5 h-3.5" /> Backup Archives History
          </h3>
          <span className="text-xs font-semibold text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
            Total Snapshots: {backupHistory.length}
          </span>
        </div>

        <div className="overflow-x-auto no-scrollbar rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-input-dark-bg)] text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
                <th className="py-2.5 px-3">Backup File Name</th>
                <th className="py-2.5 px-3">Date Created</th>
                <th className="py-2.5 px-3">Size</th>
                <th className="py-2.5 px-3">Scope Type</th>
                <th className="py-2.5 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-subtle-light)] dark:divide-[var(--color-border-dark)] text-xs">
              {backupHistory.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] transition-colors"
                >
                  <td className="py-2.5 px-3 font-mono font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)]">
                    {item.filename}
                  </td>
                  <td className="py-2.5 px-3 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] whitespace-nowrap">
                    {item.date}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)]">
                    {item.size}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] border border-[var(--color-info-border)] dark:border-[var(--color-info-dark-border)]">
                      {item.type}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => alert(`Downloading ${item.filename}...`)}
                        title="Download Backup"
                        className="p-1 rounded-md text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => triggerRestoreConfirm(item)}
                        title="Restore Backup"
                        className="p-1 rounded-md text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] hover:bg-[var(--color-info-bg)] dark:hover:bg-[var(--color-info-dark-bg)] transition-colors cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteBackup(item.id)}
                        title="Delete Archive"
                        className="p-1 rounded-md text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Restore Confirmation Modal */}
      {restoreModalFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-modal-overlay)] backdrop-blur-xs animate-in fade-in">
          <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)] rounded-2xl max-w-md w-full p-5 shadow-2xl border border-[var(--color-border-subtle-light)] dark:border-[var(--color-modal-border)] zoom-in">
            <div className="flex items-center gap-3 text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] mb-3">
              <div className="p-2 bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] rounded-xl border border-[var(--color-info-border)] dark:border-[var(--color-info-dark-border)]">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)]">
                Restore Database Backup?
              </h3>
            </div>
            <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-2 leading-relaxed">
              Are you sure you want to restore the system state from:
            </p>
            <p className="text-xs font-mono font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)] bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-input-dark-bg)] p-2 rounded-lg mb-3">
              {restoreModalFile.filename}
            </p>
            <p className="text-xs text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)] font-semibold mb-5">
              ⚠️ Warning: Existing database data modified after {restoreModalFile.date} will be overwritten.
            </p>

            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setRestoreModalFile(null)}
                disabled={restoring}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRestore}
                disabled={restoring}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-white)] shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {restoring && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{restoring ? 'Restoring...' : 'Confirm Restore'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
