import { User, AlertCircle, Clock, Check, X, Calendar, Eye, UserX, Trash2 } from 'lucide-react';

export const getStatusBadge = (status) => {
  const colors = {
    pending: 'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)] border-[var(--color-warning-border)] dark:bg-[var(--color-warning-dark-bg)] dark:text-[var(--color-warning-dark-text)] dark:border-[var(--color-warning-dark-border)]',
    approved: 'bg-[var(--color-success-bg)] text-[var(--color-success-text)] border-[var(--color-success-border)] dark:bg-[var(--color-success-dark-bg)] dark:text-[var(--color-success-dark-text)] dark:border-[var(--color-success-dark-border)]',
    rejected: 'bg-[var(--color-danger-bg)] text-[var(--color-danger-text)] border-[var(--color-danger-border)] dark:bg-[var(--color-danger-dark-bg)] dark:text-[var(--color-danger-dark-text)] dark:border-[var(--color-danger-dark-border)]',
    archived: 'bg-[var(--color-neutral-badge-bg)] text-[var(--color-neutral-badge-text)] border-[var(--color-border-subtle-light)] dark:bg-[var(--color-neutral-badge-dark-bg)] dark:text-[var(--color-neutral-badge-dark-text)] dark:border-[var(--color-border-dark)]'
  };
  return colors[status] || colors.pending;
};

export const getUrgencyBadge = (urgency) => {
  const colors = {
    critical: 'bg-[var(--color-danger-bg)] text-[var(--color-danger-text)] border-[var(--color-danger-border)] dark:bg-[var(--color-danger-dark-bg)] dark:text-[var(--color-danger-dark-text)] dark:border-[var(--color-danger-dark-border)]',
    high: 'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)] border-[var(--color-warning-border)] dark:bg-[var(--color-warning-dark-bg)] dark:text-[var(--color-warning-dark-text)] dark:border-[var(--color-warning-dark-border)]',
    medium: 'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)] border-[var(--color-warning-border)] dark:bg-[var(--color-warning-dark-bg)] dark:text-[var(--color-warning-dark-text)] dark:border-[var(--color-warning-dark-border)]',
    low: 'bg-[var(--color-info-bg)] text-[var(--color-info-text)] border-[var(--color-info-border)] dark:bg-[var(--color-info-dark-bg)] dark:text-[var(--color-info-dark-text)] dark:border-[var(--color-info-dark-border)]'
  };
  return colors[urgency] || colors.low;
};

export const getTypeLabel = (type) => {
  return type === 'account' ? 'Account Deletion' : 'Item Deletion';
};

export const getTypeIcon = (type) => {
  return type === 'account' ? UserX : Trash2;
};

export const getTypeBadge = (type) => {
  return type === 'account'
    ? 'bg-[var(--color-danger-bg)] text-[var(--color-danger-text)] border-[var(--color-danger-border)] dark:bg-[var(--color-danger-dark-bg)] dark:text-[var(--color-danger-dark-text)] dark:border-[var(--color-danger-dark-border)]'
    : 'bg-[var(--color-purple-badge-bg)] text-[var(--color-purple-badge-text)] border-[var(--color-purple-badge-border)] dark:bg-[var(--color-purple-badge-dark-bg)] dark:text-[var(--color-purple-badge-dark-text)] dark:border-[var(--color-purple-badge-dark-border)]';
};

export default function DeletionList({
  requests,
  onViewDetails,
  onApprove,
  onReject,
  onClearFilters,
  hasActiveFilters
}) {
  return (
    <div className="divide-y divide-[var(--color-border-subtle-light)] dark:divide-[var(--color-border-dark)]">
      {requests.length > 0 ? (
        requests.map((request) => {
          const TypeIcon = getTypeIcon(request.type);
          return (
            <div key={request.id} className="p-4 md:p-6 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)]/50 transition-colors">
              <div className="flex items-start gap-3 md:gap-4">
                {/* User Avatar */}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--color-rose-badge-bg)] dark:bg-[var(--color-rose-badge-dark-bg)] flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 md:w-6 md:h-6 text-[var(--color-rose-badge-text)] dark:text-[var(--color-rose-badge-dark-text)]" />
                </div>

                {/* Request Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{request.user.name}</span>
                        <span className="text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] truncate">{request.user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full border ${getTypeBadge(request.type)}`}>
                          <TypeIcon className="w-3 h-3" />
                          {getTypeLabel(request.type)}
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full border ${getUrgencyBadge(request.urgency)}`}>
                          <AlertCircle className="w-3 h-3" />
                          {request.urgency.toUpperCase()}
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusBadge(request.status)}`}>
                          {request.status === 'pending' && <Clock className="w-3 h-3" />}
                          {request.status === 'approved' && <Check className="w-3 h-3" />}
                          {request.status === 'rejected' && <X className="w-3 h-3" />}
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                        <span className="text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {request.requestDate}
                        </span>
                      </div>
                    </div>
                    {request.status === 'pending' && (
                      <div className="flex gap-1 flex-shrink-0">
                        <button
                          onClick={() => onApprove(request)}
                          className="p-1.5 bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)] hover:bg-[var(--color-success-bg)]/80 dark:hover:bg-[var(--color-success-dark-bg)]/80 rounded-lg transition-colors"
                          title="Approve"
                        >
                          <Check className="w-4 h-4 text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)]" />
                        </button>
                        <button
                          onClick={() => onReject(request)}
                          className="p-1.5 bg-[var(--color-danger-bg)] dark:bg-[var(--color-danger-dark-bg)] hover:bg-[var(--color-danger-bg)]/80 dark:hover:bg-[var(--color-danger-dark-bg)]/80 rounded-lg transition-colors"
                          title="Reject"
                        >
                          <X className="w-4 h-4 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)]" />
                        </button>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1 line-clamp-2">{request.reason}</p>

                  {request.itemsToDelete && request.itemsToDelete.length > 0 && (
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Items to delete:</span>
                      {request.itemsToDelete.map((item, idx) => (
                        <span key={idx} className="text-xs px-2 py-0.5 bg-[var(--color-border-light)] dark:bg-[var(--color-surface-hover-dark)] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] rounded-full">
                          {item.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {request.adminNotes && (
                    <div className="mt-2 p-2 bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] rounded-lg border border-[var(--color-info-border)] dark:border-[var(--color-info-dark-border)]">
                      <p className="text-xs text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]">
                        <span className="font-medium">Admin Note:</span> {request.adminNotes}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-4 mt-3 flex-wrap">
                    <button
                      onClick={() => onViewDetails(request)}
                      className="text-xs text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)] hover:text-[var(--color-purple-badge-text)]/80 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View Details
                    </button>
                    {request.status === 'pending' && (
                      <>
                        <button
                          onClick={() => onApprove(request)}
                          className="text-xs text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] hover:text-[var(--color-success-text)]/80 font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Approve
                        </button>
                        <button
                          onClick={() => onReject(request)}
                          className="text-xs text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] hover:text-[var(--color-danger-text)]/80 font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          Reject
                        </button>
                      </>
                    )}
                    {request.processedBy && (
                      <span className="text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]">
                        Processed by {request.processedBy} on {request.processedDate}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-lg font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">No requests found</h3>
          <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Try adjusting your search or filter criteria</p>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="mt-3 px-4 py-2 text-sm text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] rounded-xl transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
