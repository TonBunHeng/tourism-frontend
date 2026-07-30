import { Check, Eye, Edit, Trash2, Activity, Calendar } from 'lucide-react';

export const getStatusColor = (status) => {
  const colors = {
    'Active': 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
    'Inactive': 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-700/50 dark:text-gray-400 dark:border-gray-600',
    'Suspended': 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
  };
  return colors[status] || colors['Inactive'];
};

export const getRoleColor = (role) => {
  const colors = {
    'Admin': 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800',
    'Moderator': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
    'User': 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700/50 dark:text-gray-400 dark:border-gray-600'
  };
  return colors[role] || colors['User'];
};

export const getSubscriptionColor = (subscription) => {
  const colors = {
    'Premium': 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
    'Basic': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
    'Free': 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700/50 dark:text-gray-400 dark:border-gray-600'
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
              className="group relative bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl p-4 sm:p-5 hover:shadow-lg transition-all duration-200 sm:hover:scale-[1.02]"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center shrink-0">
                  <UserAvatar className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{user.name}</h3>
                    {user.verified && (
                      <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
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
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={() => onEdit(user)}
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Reviews</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.reviews}</p>
                </div>
                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Favorites</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.favorites}</p>
                </div>
                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Places</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.places}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${getSubscriptionColor(user.subscription)}`}>
                    {user.subscription}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    {user.activity}
                  </span>
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
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
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No users found</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
