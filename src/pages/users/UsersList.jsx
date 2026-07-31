import { Check, Clock, X, Eye, Edit, Trash2, Phone } from 'lucide-react';
import { getStatusColor, getRoleColor, getSubscriptionColor } from './UsersGrid';

export default function UsersList({ users, onViewDetails, onEdit, onDelete }) {
  return (
    <>
      {/* Mobile Card List View */}
      <div className="sm:hidden divide-y divide-[var(--color-border-light)] dark:divide-[var(--color-border-dark)]">
        {users.length > 0 ? (
          users.map((user) => {
            const UserAvatar = user.avatar;
            return (
              <div key={user.id} className="p-4 flex gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-info-bg)] to-[var(--color-purple-bg)] dark:from-[var(--color-info-dark-bg)] dark:to-[var(--color-purple-dark-bg)] flex items-center justify-center shrink-0">
                  <UserAvatar className="w-6 h-6 text-[var(--color-primary)] dark:text-[var(--color-info-dark-text)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1 min-w-0">
                      <p className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] truncate">{user.name}</p>
                      {user.verified && <Check className="w-3.5 h-3.5 text-[var(--color-primary)] dark:text-[var(--color-info-dark-text)] shrink-0" />}
                    </div>
                    <span className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full border ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] truncate">{user.email}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${getSubscriptionColor(user.subscription)}`}>
                      {user.subscription}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]">{user.reviews} reviews</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <button onClick={() => onViewDetails(user)} className="p-1.5 text-[var(--color-purple-text)] dark:text-[var(--color-purple-dark-text)] hover:bg-[var(--color-purple-bg)] dark:hover:bg-[var(--color-purple-dark-bg)] rounded-lg transition-colors" title="View Details">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => onEdit(user)} className="p-1.5 text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] hover:bg-[var(--color-info-bg)] dark:hover:bg-[var(--color-info-dark-bg)] rounded-lg transition-colors" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => onDelete(user.id)} className="p-1.5 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] rounded-lg transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-lg font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">No users found</h3>
            <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full divide-y divide-[var(--color-border-subtle-light)] dark:divide-[var(--color-border-dark)]">
          <thead className="bg-[var(--color-surface-hover-light)]/50 dark:bg-[var(--color-surface-hover-dark)]/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">Reviews</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">Favorites</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">Subscription</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] divide-y divide-[var(--color-border-light)] dark:divide-[var(--color-border-dark)]">
            {users.length > 0 ? (
              users.map((user, index) => {
                const UserAvatar = user.avatar;
                return (
                  <tr key={user.id} className="hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)]/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                      {String(index + 1).padStart(2, '0')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-info-bg)] to-[var(--color-purple-bg)] dark:from-[var(--color-info-dark-bg)] dark:to-[var(--color-purple-dark-bg)] flex items-center justify-center flex-shrink-0">
                          <UserAvatar className="w-5 h-5 text-[var(--color-primary)] dark:text-[var(--color-info-dark-text)]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <p className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{user.name}</p>
                            {user.verified && (
                              <Check className="w-3.5 h-3.5 text-[var(--color-primary)] dark:text-[var(--color-info-dark-text)]" />
                            )}
                          </div>
                          <p className="text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]">{user.email}</p>
                          <p className="text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {user.phone}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-xs px-2 py-1 rounded-full border ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(user.status)}`}>
                        {user.status === 'Active' && <Check className="w-3 h-3" />}
                        {user.status === 'Inactive' && <Clock className="w-3 h-3" />}
                        {user.status === 'Suspended' && <X className="w-3 h-3" />}
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                      {user.reviews}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                      {user.favorites}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-xs px-2 py-1 rounded-full border ${getSubscriptionColor(user.subscription)}`}>
                        {user.subscription}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onViewDetails(user)}
                          className="p-1.5 text-[var(--color-purple-text)] dark:text-[var(--color-purple-dark-text)] hover:bg-[var(--color-purple-bg)] dark:hover:bg-[var(--color-purple-dark-bg)] rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEdit(user)}
                          className="p-1.5 text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] hover:bg-[var(--color-info-bg)] dark:hover:bg-[var(--color-info-dark-bg)] rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(user.id)}
                          className="p-1.5 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] rounded-lg transition-colors"
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
                <td colSpan="8" className="text-center py-12">
                  <div className="text-6xl mb-4">👥</div>
                  <h3 className="text-lg font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">No users found</h3>
                  <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Try adjusting your search or filter criteria</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
