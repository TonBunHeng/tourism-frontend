import { useState, useEffect, useCallback } from 'react';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAlert } from '../../context/AlertContext';
import securityService from '../../services/securityService';
import SecurityHeader from './SecurityHeader';
import SecurityStats from './SecurityStats';
import SecurityList from './SecurityList';
import SecurityDetailsModal from './SecurityDetailsModal';
import SecurityExportModal from './SecurityExportModal';

export default function Security() {
  const { showConfirm, showSuccess, showError } = useAlert();

  const [alerts, setAlerts] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);

  // Modal States
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Pagination States (10 items per page)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchSecurityAlerts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await securityService.getAlerts({ per_page: 100 });
      const data = res?.data || [];
      setAlerts(Array.isArray(data) ? data : []);
      if (res?.meta) {
        setMeta(res.meta);
      }
    } catch (err) {
      console.error('Failed to load security alerts from DB:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSecurityAlerts();
  }, [fetchSecurityAlerts]);

  const totalRecords = alerts.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalRecords);
  const paginatedAlerts = alerts.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }
    if (currentPage >= totalPages - 3) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const handleOpenDetails = (alert) => {
    setSelectedAlert(alert);
    setIsDetailsModalOpen(true);

    if (!alert.is_read) {
      handleMarkRead(alert.id);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await securityService.markAsRead(id);
      setAlerts(prev =>
        prev.map(a => (a.id === id ? { ...a, is_read: true } : a))
      );
      if (selectedAlert && selectedAlert.id === id) {
        setSelectedAlert(prev => ({ ...prev, is_read: true }));
      }
      setMeta(prev => ({ ...prev, unread_count: Math.max(0, (prev.unread_count || 1) - 1) }));
    } catch (err) {
      console.error('Failed to mark alert as read:', err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await securityService.markAllRead();
      setAlerts(prev => prev.map(a => ({ ...a, is_read: true })));
      setMeta(prev => ({ ...prev, unread_count: 0 }));
      showSuccess('All security incidents marked as acknowledged.', 'Success');
    } catch (err) {
      showError(err.message || 'Failed to mark alerts as read.', 'Error');
    }
  };

  const handleBlockIp = async (ipAddress) => {
    if (!ipAddress) return;
    const confirmed = await showConfirm({
      title: 'Block IP Address',
      message: `Are you sure you want to block IP address "${ipAddress}"? All login requests and access from this IP will be immediately rejected.`,
      confirmText: 'Block IP',
      type: 'danger'
    });

    if (confirmed) {
      try {
        await securityService.blockIp(ipAddress, 'Blocked by admin due to security threshold violation.');
        setAlerts(prev =>
          prev.map(a => (a.ip_address === ipAddress ? { ...a, is_ip_blocked: true } : a))
        );
        if (selectedAlert && selectedAlert.ip_address === ipAddress) {
          setSelectedAlert(prev => ({ ...prev, is_ip_blocked: true }));
        }
        setMeta(prev => ({ ...prev, blocked_ips_count: (prev.blocked_ips_count || 0) + 1 }));
        showSuccess(`IP address ${ipAddress} has been blocked.`, 'IP Blocked');
      } catch (err) {
        showError(err.message || 'Failed to block IP address.', 'Error');
      }
    }
  };

  const handleUnblockIp = async (ipAddress) => {
    if (!ipAddress) return;
    const confirmed = await showConfirm({
      title: 'Unblock IP Address',
      message: `Are you sure you want to unblock IP address "${ipAddress}"?`,
      confirmText: 'Unblock IP',
      type: 'info'
    });

    if (confirmed) {
      try {
        await securityService.unblockIp(ipAddress);
        setAlerts(prev =>
          prev.map(a => (a.ip_address === ipAddress ? { ...a, is_ip_blocked: false } : a))
        );
        if (selectedAlert && selectedAlert.ip_address === ipAddress) {
          setSelectedAlert(prev => ({ ...prev, is_ip_blocked: false }));
        }
        setMeta(prev => ({ ...prev, blocked_ips_count: Math.max(0, (prev.blocked_ips_count || 1) - 1) }));
        showSuccess(`IP address ${ipAddress} is now unblocked.`, 'IP Unblocked');
      } catch (err) {
        showError(err.message || 'Failed to unblock IP address.', 'Error');
      }
    }
  };

  const handleDeleteAlert = async (id) => {
    const confirmed = await showConfirm({
      title: 'Delete Security Alert',
      message: 'Are you sure you want to permanently remove this incident record?',
      confirmText: 'Delete',
      type: 'danger'
    });

    if (confirmed) {
      try {
        await securityService.deleteAlert(id);
        setAlerts(prev => prev.filter(a => a.id !== id));
        if (selectedAlert && selectedAlert.id === id) {
          setIsDetailsModalOpen(false);
          setSelectedAlert(null);
        }
        setMeta(prev => ({ ...prev, total_alerts: Math.max(0, (prev.total_alerts || 1) - 1) }));
        showSuccess('Security alert deleted.', 'Success');
      } catch (err) {
        showError(err.message || 'Failed to delete security alert.', 'Error');
      }
    }
  };

  return (
    <>
      {/* Details Modal with IP Blocking Controls */}
      <SecurityDetailsModal
        isOpen={isDetailsModalOpen}
        alert={selectedAlert}
        onClose={() => setIsDetailsModalOpen(false)}
        onMarkRead={handleMarkRead}
        onDelete={handleDeleteAlert}
        onBlockIp={handleBlockIp}
        onUnblockIp={handleUnblockIp}
      />

      {/* Download Data / Export Modal */}
      <SecurityExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        alerts={alerts}
        meta={meta}
      />

      {/* Header */}
      <SecurityHeader
        onOpenExport={() => setIsExportModalOpen(true)}
      />

      {/* Standard KPI Stats Cards */}
      <SecurityStats meta={meta} />

      {/* Standard Table List View with Pagination */}
      {loading ? (
        <div className="p-12 text-center flex flex-col items-center justify-center space-y-3 bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
          <Loader2 className="w-8 h-8 text-[#003E83] dark:text-blue-500 animate-spin" />
          <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
            Loading real security logs from database...
          </p>
        </div>
      ) : (
        <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden shadow-xs">
          <SecurityList
            alerts={paginatedAlerts}
            loading={loading}
            onOpenDetails={handleOpenDetails}
            onMarkRead={handleMarkRead}
            onDeleteAlert={handleDeleteAlert}
            startIndex={startIndex}
          />

          {/* Pagination Footer */}
          {totalRecords > 0 && (
            <div className="p-4 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[var(--color-surface-hover-light)]/40 dark:bg-[var(--color-input-dark-bg)]/40">
              <div className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-medium">
                Showing <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{startIndex + 1}</span> to{' '}
                <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{endIndex}</span> of{' '}
                <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{totalRecords}</span> alerts
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage <= 1}
                  className="p-1.5 rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  title="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {getPageNumbers().map((pageNum, idx) => {
                  if (pageNum === '...') {
                    return (
                      <span
                        key={`dots-${idx}`}
                        className="w-8 h-8 flex items-center justify-center text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]"
                      >
                        ...
                      </span>
                    );
                  }
                  const isActive = pageNum === currentPage;
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[var(--color-primary)] text-white shadow-sm font-bold'
                          : 'border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage >= totalPages}
                  className="p-1.5 rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  title="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
