import { Check, Eye, Edit, Trash2, Activity, Calendar } from 'lucide-react';

export const getStatusColor = (status) => {
  const colors = {
    'Active': 'bg-[var(--color-success-bg)] text-[var(--color-success-text)] border-[var(--color-success-border)] dark:bg-[var(--color-success-dark-bg)] dark:text-[var(--color-success-dark-text)] dark:border-[var(--color-success-dark-border)]',
    'Inactive': 'bg-[var(--color-neutral-badge-bg)] text-[var(--color-neutral-badge-text)] border-[var(--color-neutral-badge-border)] dark:bg-[var(--color-neutral-badge-dark-bg)] dark:text-[var(--color-neutral-badge-dark-text)] dark:border-[var(--color-neutral-badge-dark-border)]',
    'Suspended': 'bg-[var(--color-danger-bg)] text-[var(--color-danger-text)] border-[var(--color-danger-border)] dark:bg-[var(--color-danger-dark-bg)] dark:text-[var(--color-danger-dark-text)] dark:border-[var(--color-danger-dark-border)]'
  };
  return colors[status] || colors['Inactive'];
};

export const getRoleColor = (role) => {
  const colors = {
    'Admin': 'bg-[var(--color-purple-bg)] text-[var(--color-purple-text)] border-[var(--color-purple-border)] dark:bg-[var(--color-purple-dark-bg)] dark:text-[var(--color-purple-dark-text)] dark:border-[var(--color-purple-dark-border)]',
    'Moderator': 'bg-[var(--color-info-bg)] text-[var(--color-info-text)] border-[var(--color-info-border)] dark:bg-[var(--color-info-dark-bg)] dark:text-[var(--color-info-dark-text)] dark:border-[var(--color-info-dark-border)]',
    'User': 'bg-[var(--color-neutral-badge-bg)] text-[var(--color-neutral-badge-text)] border-[var(--color-neutral-badge-border)] dark:bg-[var(--color-neutral-badge-dark-bg)] dark:text-[var(--color-neutral-badge-dark-text)] dark:border-[var(--color-neutral-badge-dark-border)]'
  };
  return colors[role] || colors['User'];
};

export const getSubscriptionColor = (subscription) => {
  const colors = {
    'Premium': 'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)] border-[var(--color-warning-border)] dark:bg-[var(--color-warning-dark-bg)] dark:text-[var(--color-warning-dark-text)] dark:border-[var(--color-warning-dark-border)]',
    'Basic': 'bg-[var(--color-info-bg)] text-[var(--color-info-text)] border-[var(--color-info-border)] dark:bg-[var(--color-info-dark-bg)] dark:text-[var(--color-info-dark-text)] dark:border-[var(--color-info-dark-border)]',
    'Free': 'bg-[var(--color-neutral-badge-bg)] text-[var(--color-neutral-badge-text)] border-[var(--color-neutral-badge-border)] dark:bg-[var(--color-neutral-badge-dark-bg)] dark:text-[var(--color-neutral-badge-dark-text)] dark:border-[var(--color-neutral-badge-dark-border)]'
  };
  return colors[subscription] || colors['Free'];
};

export default function UsersGrid({ users, onViewDetails, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-6">
      {users.length > 0 ? (
        users.map((user) => {
          const UserAvatar = user.avatar;
          return (
            <div
              key={user.id}
              className="group relative bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)]/50 border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] rounded-xl p-4 sm:p-5 hover:shadow-lg transition-all duration-200 sm:hover:scale-[1.02]"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[var(--color-info-bg)] to-[var(--color-purple-bg)] dark:from-[var(--color-info-dark-bg)] dark:to-[var(--color-purple-dark-bg)] flex items-center justify-center shrink-0">
                  <UserAvatar className="w-6 h-6 sm:w-7 sm:h-7 text-[var(--color-primary)] dark:text-[var(--color-info-dark-text)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] text-sm truncate">{user.name}</h3>
                    {user.verified && (
                      <Check className="w-4 h-4 text-[var(--color-primary)] dark:text-[var(--color-info-dark-text)] shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] truncate">{user.email}</p>
                  <div className="flex items-center gap-1 mt-1 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shrink-0">
                  <button
                    onClick={() => onViewDetails(user)}
                    className="p-1.5 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-3.5 h-3.5 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
                  </button>
                  <button
                    onClick={() => onEdit(user)}
                    className="p-1.5 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-3.5 h-3.5 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="p-1.5 hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)]" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center p-2 bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 rounded-lg">
                  <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Reviews</p>
                  <p className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{user.reviews}</p>
                </div>
                <div className="text-center p-2 bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 rounded-lg">
                  <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Favorites</p>
                  <p className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{user.favorites}</p>
                </div>
                <div className="text-center p-2 bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 rounded-lg">
                  <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Places</p>
                  <p className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{user.places}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${getSubscriptionColor(user.subscription)}`}>
                    {user.subscription}
                  </span>
                  <span className="text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    {user.activity}
                  </span>
                </div>
                <span className="text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {user.joinDate}
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <div className="col-span-full text-center py-12">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-lg font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">No users found</h3>
          <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
