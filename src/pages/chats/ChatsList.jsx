import { Search, RotateCcw, Plus, ChevronDown, User, Star, AlertCircle, MessageSquare } from 'lucide-react';
import { getChatStatusColor as getStatusColor } from '../../utils/StatusUtils'; 

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
      className={`${selectedChat ? 'hidden md:flex' : 'flex'
        } w-full md:w-96 bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] flex-col overflow-hidden flex-shrink-0`}
    >
      {/* Chat List Header */}
      <div className="p-4 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">Conversations</h2>
            <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">{chats.length} total chats</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onReset}
              className="p-2 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-lg transition-colors"
              title="Reset chats"
            >
              <RotateCcw className="w-4 h-4 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
            </button>
            <button className="p-2 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-lg transition-colors">
              <Plus className="w-4 h-4 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent text-sm bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 mt-3 flex-wrap">
          <div className="relative">
            <select
              value={filterCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="appearance-none text-xs pl-2 pr-6 py-1 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--color-input)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="appearance-none text-xs pl-2 pr-6 py-1 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--color-input)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none text-xs pl-2 pr-6 py-1 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--color-input)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]"
            >
              <option value="recent">Recent</option>
              <option value="unread">Unread</option>
              <option value="priority">Priority</option>
            </select>
            <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] pointer-events-none" />
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
              className={`flex items-start gap-3 p-4 cursor-pointer hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)]/50 transition-colors border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] ${selectedChat?.id === chat.id ? 'bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)]' : ''
                }`}
            >
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-[var(--color-purple-badge-bg)] dark:bg-[var(--color-purple-badge-dark-bg)] flex items-center justify-center text-2xl">
                  <User className="w-6 h-6 text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)]" />
                </div>
                <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-[var(--color-white)] dark:border-[var(--color-bg-dark)] ${getStatusColor(chat.user.status)}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] text-sm truncate">{chat.user.name}</span>
                    {chat.user.isVIP && (
                      <Star className="w-3.5 h-3.5 fill-[var(--color-amber-star)] text-[var(--color-amber-star)] flex-shrink-0" />
                    )}
                    {chat.priority === 'critical' && (
                      <AlertCircle className="w-3.5 h-3.5 text-[var(--color-danger-text)] flex-shrink-0" />
                    )}
                  </div>
                  <span className="text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] flex-shrink-0">{chat.lastMessageTime}</span>
                </div>
                <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] truncate">{chat.lastMessage}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-1.5 py-0.5 bg-[var(--color-border-light)] dark:bg-[var(--color-surface-hover-dark)] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] rounded-full truncate max-w-[140px]">
                    {chat.category}
                  </span>
                  {chat.unread > 0 && (
                    <span className="text-xs px-2 py-0.5 bg-[var(--color-primary)] text-[var(--color-white)] rounded-full flex-shrink-0">
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
              <MessageSquare className="w-16 h-16 text-[var(--color-text-muted-light)]" />
            </div>
            <h3 className="text-sm font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">No conversations found</h3>
            <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
