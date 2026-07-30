import { ArrowLeft, User, Star, Phone, Video, Info, MoreVertical, Bot, CheckCheck, Check, Paperclip, Smile, Send, MessageSquare } from 'lucide-react';
import { getStatusColor } from './ChatsList';

export default function ChatWindow({
  selectedChat,
  onBackToList,
  messagesEndRef,
  isAITyping,
  quickResponses,
  newMessage,
  onNewMessageChange,
  onSendMessage,
  onKeyPress,
  showUserInfo,
  onToggleShowUserInfo
}) {
  return (
    <div
      className={`${
        selectedChat ? 'flex' : 'hidden md:flex'
      } flex-1 min-w-0 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 flex-col overflow-hidden`}
    >
      {selectedChat ? (
        <>
          {/* Chat Header */}
          <div className="p-3 md:p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 md:gap-3 min-w-0">
              <button
                onClick={onBackToList}
                className="p-2 -ml-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0 md:hidden"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center text-2xl">
                  <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(selectedChat.user.status)}`} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">{selectedChat.user.name}</h3>
                  {selectedChat.user.isVIP && (
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 flex-shrink-0" />
                  )}
                  <span className="hidden sm:inline-block text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full flex-shrink-0">
                    {selectedChat.category}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {selectedChat.user.status === 'online' ? 'Online' : `Last seen ${selectedChat.user.lastSeen}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button className="hidden sm:inline-flex p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Phone className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="hidden sm:inline-flex p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Video className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
              <button 
                onClick={onToggleShowUserInfo}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="User info"
              >
                <Info className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="hidden sm:inline-flex p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3">
            {selectedChat.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] sm:max-w-[70%] ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  {message.isAI && (
                    <div className="flex items-center gap-1 mb-1">
                      <Bot className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                      <span className="text-xs font-medium text-purple-600 dark:text-purple-400">AI Assistant</span>
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : message.isAI
                        ? 'bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-gray-800 dark:text-gray-200 border border-purple-200 dark:border-purple-800'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-gray-400">{message.timestamp}</span>
                    {message.sender === 'user' && (
                      message.read ? (
                        <CheckCheck className="w-3 h-3 text-blue-400" />
                      ) : (
                        <Check className="w-3 h-3 text-gray-400" />
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isAITyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">AI is typing</span>
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Responses */}
          <div className="px-3 md:px-4 py-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {quickResponses.map((response, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onNewMessageChange(response);
                  }}
                  className="flex-shrink-0 text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full whitespace-nowrap transition-colors text-gray-700 dark:text-gray-300"
                >
                  {response}
                </button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-3 md:p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-end gap-1 sm:gap-2">
              <button className="hidden sm:inline-flex p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0">
                <Paperclip className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
              <div className="flex-1 min-w-0 relative">
                <textarea
                  value={newMessage}
                  onChange={(e) => onNewMessageChange(e.target.value)}
                  onKeyPress={onKeyPress}
                  placeholder="Type your message..."
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <button className="hidden sm:inline-flex p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0">
                <Smile className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
              <button 
                onClick={onSendMessage}
                disabled={!newMessage.trim()}
                className="p-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 hidden md:flex items-center justify-center">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <MessageSquare className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Select a conversation</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Choose a chat from the list to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
}
