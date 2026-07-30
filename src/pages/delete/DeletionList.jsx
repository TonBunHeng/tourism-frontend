import { User, AlertCircle, Clock, Check, X, Calendar, Eye, UserX, Trash2 } from 'lucide-react';

export const getStatusBadge = (status) => {
  const colors = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
    approved: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
    rejected: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
    archived: 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-700/50 dark:text-gray-400 dark:border-gray-600'
  };
  return colors[status] || colors.pending;
};

export const getUrgencyBadge = (urgency) => {
  const colors = {
    critical: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
    high: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800',
    low: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'
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
    ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800' 
    : 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800';
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
    <div className="divide-y divide-gray-100 dark:divide-gray-700">
      {requests.length > 0 ? (
        requests.map((request) => {
          const TypeIcon = getTypeIcon(request.type);
          return (
            <div key={request.id} className="p-4 md:p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-start gap-3 md:gap-4">
                {/* User Avatar */}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 md:w-6 md:h-6 text-red-600 dark:text-red-400" />
                </div>
                
                {/* Request Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-gray-900 dark:text-white">{request.user.name}</span>
                        <span className="text-xs text-gray-400 dark:text-gray-500 truncate">{request.user.email}</span>
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
                        <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {request.requestDate}
                        </span>
                      </div>
                    </div>
                    {request.status === 'pending' && (
                      <div className="flex gap-1 flex-shrink-0">
                        <button
                          onClick={() => onApprove(request)}
                          className="p-1.5 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 rounded-lg transition-colors"
                          title="Approve"
                        >
                          <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </button>
                        <button
                          onClick={() => onReject(request)}
                          className="p-1.5 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg transition-colors"
                          title="Reject"
                        >
                          <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{request.reason}</p>
                  
                  {request.itemsToDelete && request.itemsToDelete.length > 0 && (
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Items to delete:</span>
                      {request.itemsToDelete.map((item, idx) => (
                        <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                          {item.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {request.adminNotes && (
                    <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                      <p className="text-xs text-blue-700 dark:text-blue-400">
                        <span className="font-medium">Admin Note:</span> {request.adminNotes}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-4 mt-3 flex-wrap">
                    <button
                      onClick={() => onViewDetails(request)}
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View Details
                    </button>
                    {request.status === 'pending' && (
                      <>
                        <button
                          onClick={() => onApprove(request)}
                          className="text-xs text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Approve
                        </button>
                        <button
                          onClick={() => onReject(request)}
                          className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          Reject
                        </button>
                      </>
                    )}
                    {request.processedBy && (
                      <span className="text-xs text-gray-400 dark:text-gray-500">
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
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No requests found</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="mt-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
