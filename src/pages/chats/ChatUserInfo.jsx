import { X, User, AlertCircle, Bot } from 'lucide-react';
import { getStatusColor, getPriorityBadge } from './ChatsList';

export default function ChatUserInfo({
  isOpen,
  selectedChat,
  onClose
}) {
  if (!isOpen || !selectedChat) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 md:static md:z-auto md:bg-transparent flex md:block justify-end">
      <div className="w-full max-w-sm md:max-w-none md:w-80 h-full md:h-auto bg-white dark:bg-gray-800 md:rounded-2xl shadow-sm border-l md:border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden flex-shrink-0">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white">User Info</h3>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="text-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center text-5xl mx-auto">
              <User className="w-10 h-10 text-purple-600 dark:text-purple-400" />
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mt-2">{selectedChat.user.name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{selectedChat.user.email}</p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full ${getPriorityBadge(selectedChat.priority)}`}>
                <AlertCircle className="w-3 h-3" />
                {selectedChat.priority.toUpperCase()}
              </span>
              {selectedChat.user.isVIP && (
                <span className="text-xs px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full">
                  VIP
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
              <span className="text-sm font-medium flex items-center gap-1 text-gray-900 dark:text-white">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(selectedChat.user.status)}`} />
                {selectedChat.user.status}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">Last Seen</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedChat.user.lastSeen}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Chats</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedChat.user.totalChats}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">Category</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedChat.category}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Messages</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedChat.messages.length}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">AI Assisted</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {selectedChat.messages.some(m => m.isAI) ? 'Yes' : 'No'}
              </span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
              <p className="text-xs text-gray-700 dark:text-gray-300">
                This conversation is being assisted by AI. The AI provides automated responses to help users quickly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
