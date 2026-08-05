import { ArrowLeft, User, Star, Phone, Video, Info, MoreVertical, Bot, CheckCheck, Check, Paperclip, Smile, Send, MessageSquare } from 'lucide-react';
import { getChatStatusColor as getStatusColor } from '../../utils/StatusUtils';

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
  onToggleShowUserInfo
}) {
  return (
    <div
      className={`${selectedChat ? 'flex' : 'hidden md:flex'
        } flex-1 min-w-0 bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] flex-col overflow-hidden`}
    >
      {selectedChat ? (
        <>
          {/* Chat Header */}
          <div className="p-3 md:p-4 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 md:gap-3 min-w-0">
              <button
                onClick={onBackToList}
                className="p-2 -ml-1 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-lg transition-colors flex-shrink-0 md:hidden"
              >
                <ArrowLeft className="w-5 h-5 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
              </button>
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-[var(--color-purple-badge-bg)] dark:bg-[var(--color-purple-badge-dark-bg)] flex items-center justify-center text-2xl">
                  <User className="w-5 h-5 text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)]" />
                </div>
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[var(--color-white)] dark:border-[var(--color-bg-dark)] ${getStatusColor(selectedChat.user.status)}`} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 min-w-0">
                  <h3 className="font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] truncate">{selectedChat.user.name}</h3>
                  {selectedChat.user.isVIP && (
                    <Star className="w-3.5 h-3.5 fill-[var(--color-amber-star)] text-[var(--color-amber-star)] flex-shrink-0" />
                  )}
                  <span className="hidden sm:inline-block text-xs px-2 py-0.5 bg-[var(--color-border-light)] dark:bg-[var(--color-surface-hover-dark)] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] rounded-full flex-shrink-0">
                    {selectedChat.category}
                  </span>
                </div>
                <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] truncate">
                  {selectedChat.user.status === 'online' ? 'Online' : `Last seen ${selectedChat.user.lastSeen}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button className="hidden sm:inline-flex p-2 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-lg transition-colors">
                <Phone className="w-4 h-4 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
              </button>
              <button className="hidden sm:inline-flex p-2 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-lg transition-colors">
                <Video className="w-4 h-4 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
              </button>
              <button
                onClick={onToggleShowUserInfo}
                className="p-2 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-lg transition-colors"
                title="User info"
              >
                <Info className="w-4 h-4 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
              </button>
              <button className="hidden sm:inline-flex p-2 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3">
            {selectedChat.messages.map((message) => {
              const isAdmin = message.sender === 'admin' || message.sender === 'support';
              const isAI = message.isAI || message.sender === 'ai';
              const isOutbound = isAdmin || isAI;

              return (
                <div
                  key={message.id}
                  className={`flex ${isOutbound ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] sm:max-w-[70%] flex flex-col ${isOutbound ? 'items-end' : 'items-start'}`}>
                    {isAdmin && (
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-xs font-medium text-[var(--color-primary)]">Admin</span>
                      </div>
                    )}
                    {isAI && (
                      <div className="flex items-center gap-1 mb-1">
                        <Bot className="w-3 h-3 text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)]" />
                        <span className="text-xs font-medium text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)]">Chat Support</span>
                      </div>
                    )}
                    {!isOutbound && (
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">{selectedChat.user.name}</span>
                      </div>
                    )}
                    <div
                      className={`rounded-lg px-4 py-2 ${isAdmin
                        ? 'bg-[var(--color-primary)] text-[var(--color-white)]'
                        : isAI
                          ? 'bg-[var(--color-purple-badge-bg)] dark:bg-[var(--color-purple-badge-dark-bg)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] border border-[var(--color-purple-badge-border)] dark:border-[var(--color-purple-badge-dark-border)]'
                          : 'bg-[var(--color-border-light)] dark:bg-[var(--color-surface-hover-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]'
                        }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]">{message.timestamp}</span>
                      {isOutbound && (
                        message.read ? (
                          <CheckCheck className="w-3 h-3 text-[var(--color-info-text)]" />
                        ) : (
                          <Check className="w-3 h-3 text-[var(--color-text-muted-light)]" />
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {isAITyping && (
              <div className="flex justify-start">
                <div className="bg-[var(--color-border-light)] dark:bg-[var(--color-surface-hover-dark)] rounded-lg px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)]" />
                    <span className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Chat Support is typing</span>
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-[var(--color-text-muted-light)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-[var(--color-text-muted-light)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-[var(--color-text-muted-light)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Responses */}
          <div className="px-3 md:px-4 py-2 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {quickResponses.map((response, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onNewMessageChange(response);
                  }}
                  className="flex-shrink-0 text-xs px-3 py-1.5 bg-[var(--color-border-light)] dark:bg-[var(--color-surface-hover-dark)] hover:bg-[var(--color-border-subtle-light)] dark:hover:bg-[var(--color-border-dark)] rounded-full whitespace-nowrap transition-colors text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]"
                >
                  {response}
                </button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-3 md:p-4 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
            <div className="flex items-end gap-1 sm:gap-2">
              <button className="hidden sm:inline-flex p-2 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-lg transition-colors flex-shrink-0">
                <Paperclip className="w-5 h-5 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
              </button>
              <div className="flex-1 min-w-0 relative">
                <textarea
                  value={newMessage}
                  onChange={(e) => onNewMessageChange(e.target.value)}
                  onKeyPress={onKeyPress}
                  placeholder="Type your message..."
                  rows="2"
                  className="w-full px-4 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent resize-none text-sm bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]"
                />
              </div>
              <button className="hidden sm:inline-flex p-2 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-lg transition-colors flex-shrink-0">
                <Smile className="w-5 h-5 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
              </button>
              <button
                onClick={onSendMessage}
                disabled={!newMessage.trim()}
                className="p-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send className="w-5 h-5 text-[var(--color-white)]" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 hidden md:flex items-center justify-center">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <MessageSquare className="w-16 h-16 text-[var(--color-text-muted-light)]" />
            </div>
            <h3 className="text-lg font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">Select a conversation</h3>
            <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Choose a chat from the list to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
}
