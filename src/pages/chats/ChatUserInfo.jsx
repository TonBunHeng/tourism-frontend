import { X, User, AlertCircle, Bot } from 'lucide-react';
import { getChatStatusColor as getStatusColor, getPriorityBadge } from '../../utils/StatusUtils';

export default function ChatUserInfo({
  isOpen,
  selectedChat,
  onClose
}) {
  if (!isOpen || !selectedChat) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 md:static md:z-auto md:bg-transparent flex md:block justify-end">
      <div className="w-full max-w-sm md:max-w-none md:w-80 h-full md:h-auto bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] md:rounded-lg shadow-sm border-l md:border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] flex flex-col overflow-hidden flex-shrink-0">
        <div className="p-4 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">User Info</h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="text-center mb-4">
            <div className="w-20 h-20 rounded-full bg-[var(--color-purple-badge-bg)] dark:bg-[var(--color-purple-badge-dark-bg)] flex items-center justify-center text-5xl mx-auto">
              <User className="w-10 h-10 text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)]" />
            </div>
            <h4 className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mt-2">{selectedChat.user.name}</h4>
            <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">{selectedChat.user.email}</p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full ${getPriorityBadge(selectedChat.priority)}`}>
                <AlertCircle className="w-3 h-3" />
                {selectedChat.priority.toUpperCase()}
              </span>
              {selectedChat.user.isVIP && (
                <span className="text-xs px-2 py-0.5 bg-[var(--color-warning-bg)] dark:bg-[var(--color-warning-dark-bg)] text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)] rounded-full">
                  VIP
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 rounded-lg">
              <span className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Status</span>
              <span className="text-sm font-medium flex items-center gap-1 text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(selectedChat.user.status)}`} />
                {selectedChat.user.status}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 rounded-lg">
              <span className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Last Seen</span>
              <span className="text-sm font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{selectedChat.user.lastSeen}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 rounded-lg">
              <span className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Total Chats</span>
              <span className="text-sm font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{selectedChat.user.totalChats}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 rounded-lg">
              <span className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Category</span>
              <span className="text-sm font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{selectedChat.category}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 rounded-lg">
              <span className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Total Messages</span>
              <span className="text-sm font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{selectedChat.messages.length}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 rounded-lg">
              <span className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Chat Support</span>
              <span className="text-sm font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                {selectedChat.messages.some(m => m.isAI) ? 'Yes' : 'No'}
              </span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-[var(--color-purple-badge-bg)] dark:bg-[var(--color-purple-badge-dark-bg)] rounded-md border border-[var(--color-purple-badge-border)] dark:border-[var(--color-purple-badge-dark-border)]">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)] shrink-0" />
              <p className="text-xs text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                This conversation is being assisted by Chat Support. Automated responses help users quickly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
