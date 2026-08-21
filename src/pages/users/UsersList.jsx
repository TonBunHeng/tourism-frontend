import React from 'react';
import { Check, Clock, Eye, Edit, Trash2, Phone, User as UserIcon } from 'lucide-react';
import { getUserStatusColor as getStatusColor, getRoleColor } from '../../utils/StatusUtils';

export default function UsersList({
  users = [],
  onViewDetails,
  onEdit,
  onDelete,
  onViewUser,
  onEditUser,
  onDeleteUser,
  startIndex = 0
}) {
  const handleView = onViewDetails || onViewUser || (() => {});
  const handleEdit = onEdit || onEditUser || (() => {});
  const handleDeleteItem = onDelete || onDeleteUser || (() => {});

  const safeUsers = users || [];

  return (
    <>
      {/* Mobile Card List View */}
      <div className="sm:hidden divide-y divide-[var(--color-border-subtle-light)] dark:divide-[var(--color-border-dark)]">
        {safeUsers.length > 0 ? (
          safeUsers.map((user) => {
            const isOnline = user.status === 'Active' || user.onlineStatus === 'Online';
            return (
              <div
                key={user.id}
                onClick={() => handleView(user)}
                className="p-4 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)]/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="relative w-10 h-10 rounded-full bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] flex items-center justify-center shrink-0 border border-slate-200 dark:border-zinc-700 overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <UserIcon className="w-5 h-5 text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]" />
                    )}
                    <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-zinc-900 ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 min-w-0">
                        <p className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] truncate">
                          {user.name}
                        </p>
                        {user.verified && (
                          <span className="text-[9px] text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/40 px-1 rounded-full shrink-0">
                            ✓
                          </span>
                        )}
                      </div>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border shrink-0 ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </div>

                    <p className="text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] truncate">
                      {user.email}
                    </p>

                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className={`text-[10px] font-semibold px-2 py-0.2 rounded-full border ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                      <span className="text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        {user.lastActive || 'Just now'}
                      </span>
                    </div>

                    <div
                      className="flex items-center justify-end gap-2 mt-3 pt-2 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => handleView(user)}
                        className="p-1.5 text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)] hover:bg-[var(--color-purple-badge-bg)] dark:hover:bg-[var(--color-purple-badge-dark-bg)] rounded-lg transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEdit(user)}
                        className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(user.id)}
                        className="p-1.5 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] rounded-lg transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 px-4">
            <UserIcon className="w-12 h-12 text-blue-500 mx-auto mb-2 opacity-80" />
            <h3 className="text-base font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">
              No users found
            </h3>
            <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Desktop Responsive Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left divide-y divide-[var(--color-border-subtle-light)] dark:divide-[var(--color-border-dark)] table-auto">
          <thead className="bg-[var(--color-surface-hover-light)]/50 dark:bg-[var(--color-surface-hover-dark)]/50">
            <tr>
              <th className="pl-4 pr-2 py-3.5 text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider w-10 text-center">
                #
              </th>
              <th className="px-4 py-3.5 text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">
                User & Profile
              </th>
              <th className="px-3 py-3.5 text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider whitespace-nowrap w-28">
                Role
              </th>
              <th className="px-3 py-3.5 text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider whitespace-nowrap w-32">
                Status
              </th>
              <th className="px-3 py-3.5 text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider whitespace-nowrap w-36">
                Last Active
              </th>
              <th className="px-3 py-3.5 text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider whitespace-nowrap w-36">
                Phone
              </th>
              <th className="pl-3 pr-4 py-3.5 text-right text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider w-24 whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] divide-y divide-[var(--color-border-light)] dark:divide-[var(--color-border-dark)]">
            {safeUsers.length > 0 ? (
              safeUsers.map((user, index) => {
                const isOnline = user.status === 'Active' || user.onlineStatus === 'Online';
                return (
                  <tr
                    key={user.id}
                    className="hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)]/50 transition-colors group"
                  >
                    <td className="pl-4 pr-2 py-3.5 whitespace-nowrap text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-mono text-center">
                      {startIndex + index + 1}
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative w-9 h-9 rounded-full bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] flex items-center justify-center shrink-0 border border-slate-200 dark:border-zinc-700 overflow-hidden">
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                          ) : (
                            <UserIcon className="w-4 h-4 text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]" />
                          )}
                          <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-zinc-900 ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <p className="text-xs md:text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] truncate">
                              {user.name}
                            </p>
                            {user.verified && (
                              <span className="text-[9px] text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/40 px-1 rounded-full">
                                ✓
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-3 py-3.5 whitespace-nowrap">
                      <span className={`text-[10px] font-semibold px-2 py-0.2 rounded-full border ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>

                    <td className="px-3 py-3.5 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold rounded-full border ${getStatusColor(user.status)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                        {user.status === 'Active' ? 'Active' : user.status}
                      </span>
                    </td>

                    <td className="px-3 py-3.5 whitespace-nowrap text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                      <div className="flex items-center gap-1.5 font-mono">
                        <Clock className="w-3.5 h-3.5 text-[var(--color-text-muted-light)] shrink-0" />
                        <span>{user.lastActive || 'Just now'}</span>
                      </div>
                    </td>

                    <td className="px-3 py-3.5 whitespace-nowrap text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-mono">
                      {user.phone || '—'}
                    </td>

                    <td className="pl-3 pr-4 py-3.5 whitespace-nowrap text-right text-xs">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleView(user)}
                          className="p-1.5 text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)] hover:bg-[var(--color-purple-badge-bg)] dark:hover:bg-[var(--color-purple-badge-dark-bg)] rounded-lg transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEdit(user)}
                          className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteItem(user.id)}
                          className="p-1.5 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] rounded-lg transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-12 px-4">
                  <UserIcon className="w-12 h-12 text-blue-500 mx-auto mb-2 opacity-80" />
                  <h3 className="text-base font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">
                    No users found
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                    Try adjusting your search or filter criteria
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
