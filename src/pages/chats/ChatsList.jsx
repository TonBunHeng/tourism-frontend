import { Search, RotateCcw, Plus, ChevronDown, User, Star, AlertCircle, MessageSquare } from 'lucide-react';

export const getStatusColor = (status) => {
  const colors = {
    online: 'bg-green-500',
    away: 'bg-yellow-500',
    offline: 'bg-gray-400'
  };
  return colors[status] || colors.offline;
};

export const getPriorityBadge = (priority) => {
  const colors = {
    critical: 'bg-red-100 text-red-700 border-red-200',
    high: 'bg-orange-100 text-orange-700 border-orange-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    low: 'bg-blue-100 text-blue-700 border-blue-200'
  };
  return colors[priority] || colors.low;
};

export default function ChatsList({
  chats,
  selectedChat,
  onSelectChat,
  searchTerm,
  onSearchChange,
  filterCategory,
  onCategoryChange,
  categories,
  filterStatus,
  onStatusChange,
  statuses,
  sortBy,
  onSortChange,
  onReset
}) {
  return (
    <div
      className={`${
        selectedChat ? 'hidden md:flex' : 'flex'
      } w-full md:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 flex-col overflow-hidden flex-shrink-0`}
    >
      {/* Chat List Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Conversations</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">{chats.length} total chats</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={onReset}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Reset chats"
            >
              <RotateCcw className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <Plus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 mt-3 flex-wrap">
          <div className="relative">
            <select
              value={filterCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="appearance-none text-xs pl-2 pr-6 py-1 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="appearance-none text-xs pl-2 pr-6 py-1 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none text-xs pl-2 pr-6 py-1 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="recent">Recent</option>
              <option value="unread">Unread</option>
              <option value="priority">Priority</option>
            </select>
            <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Chat List Feed */}
      <div className="flex-1 overflow-y-auto">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat)}
              className={`flex items-start gap-3 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-100 dark:border-gray-700 ${
                selectedChat?.id === chat.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
            >
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center text-2xl">
                  <User className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${getStatusColor(chat.user.status)}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-semibold text-gray-900 dark:text-white text-sm truncate">{chat.user.name}</span>
                    {chat.user.isVIP && (
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 flex-shrink-0" />
                    )}
                    {chat.priority === 'critical' && (
                      <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                    )}
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{chat.lastMessageTime}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{chat.lastMessage}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full truncate max-w-[140px]">
                    {chat.category}
                  </span>
                  {chat.unread > 0 && (
                    <span className="text-xs px-2 py-0.5 bg-blue-500 text-white rounded-full flex-shrink-0">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <MessageSquare className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">No conversations found</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
