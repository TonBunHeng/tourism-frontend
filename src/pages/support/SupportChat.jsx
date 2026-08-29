import { useState, useEffect, useRef } from 'react';
import {
  MessageSquare, User, Send, CheckCircle, Clock, AlertCircle,
  Filter, Search, RefreshCw, ChevronRight, CheckCheck
} from 'lucide-react';
import chatService from '../../services/chatService';

export default function SupportChat() {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState('');
  const [sending, setSending] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const messagesEndRef = useRef(null);

  const fetchChats = async () => {
    try {
      setLoading(true);
      const params = statusFilter ? { status: statusFilter } : {};
      const res = await chatService.getChats(params);
      const list = res.data || [];
      setChats(list);
      if (list.length > 0 && !activeChat) {
        setActiveChat(list[0]);
      } else if (activeChat) {
        const refreshed = list.find((c) => c.id === activeChat.id);
        if (refreshed) setActiveChat(refreshed);
      }
    } catch (err) {
      console.error('Failed to fetch chats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [statusFilter]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim() || !activeChat || sending) return;

    try {
      setSending(true);
      await chatService.sendMessage(activeChat.id, messageText.trim());
      setMessageText('');
      // Reload chat details
      const updated = await chatService.getChatById(activeChat.id);
      setActiveChat(updated.data);
      fetchChats();
    } catch (err) {
      console.error('Send error:', err);
    } finally {
      setSending(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (!activeChat) return;
    try {
      const updated = await chatService.updateStatus(activeChat.id, { status: newStatus });
      setActiveChat(updated.data);
      fetchChats();
    } catch (err) {
      console.error('Status update error:', err);
    }
  };

  return (
    <div className="h-[calc(100vh-8.5rem)] flex flex-col">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-zinc-800 shrink-0">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#003E83] dark:text-blue-400" />
            <span>Tourist Support Conversations</span>
          </h1>
          <p className="text-xs text-gray-500 dark:text-zinc-400">
            Real-time inquiries, assistance tickets, and travel support requests.
          </p>
        </div>

        <button
          onClick={fetchChats}
          className="p-1.5 rounded-md border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800 text-xs font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Workspace Grid */}
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 gap-4 mt-4 overflow-hidden">
        {/* Left Chat List */}
        <div className="md:col-span-4 bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 flex flex-col overflow-hidden shadow-xs">
          <div className="p-3 border-b border-gray-100 dark:border-zinc-800 shrink-0">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 rounded-md bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 border border-gray-200 dark:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-[#003E83] focus:border-[#003E83] transition-colors cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="active">Active Tickets</option>
              <option value="closed">Resolved / Closed</option>
            </select>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-zinc-800/80">
            {chats.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-400">No support chats found.</div>
            ) : (
              chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setActiveChat(chat)}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                    activeChat?.id === chat.id
                      ? 'bg-blue-50/70 dark:bg-zinc-800/80 border-l-3 border-[#003E83]'
                      : 'hover:bg-gray-50/60 dark:hover:bg-zinc-800/30'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold shrink-0 text-[#003E83]">
                    <User size={15} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                        {chat.user?.name || `Tourist #${chat.user_id}`}
                      </h4>
                      <span className="text-[10px] text-gray-400">{chat.last_message_time || ''}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-zinc-400 truncate mt-0.5">
                      {chat.last_message || 'New conversation'}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                        chat.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {chat.status}
                      </span>
                      <span className="text-[9px] text-gray-400">{chat.category}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Message Pane */}
        <div className="md:col-span-8 bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 flex flex-col overflow-hidden shadow-xs">
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="p-3.5 bg-gray-50/70 dark:bg-zinc-800/40 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#003E83] text-white flex items-center justify-center text-xs font-bold">
                    {activeChat.user?.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900 dark:text-white">
                      {activeChat.user?.name || `Tourist #${activeChat.user_id}`}
                    </h3>
                    <span className="text-[10px] text-gray-500 dark:text-zinc-400">
                      Email: {activeChat.user?.email || 'N/A'} • Category: {activeChat.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {activeChat.status === 'active' ? (
                    <button
                      onClick={() => handleStatusChange('closed')}
                      className="px-2.5 py-1 text-xs rounded-md bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-zinc-200 hover:bg-gray-300 font-medium cursor-pointer"
                    >
                      Close Ticket
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusChange('active')}
                      className="px-2.5 py-1 text-xs rounded-md bg-emerald-600 text-white hover:bg-emerald-700 font-medium cursor-pointer"
                    >
                      Reopen
                    </button>
                  )}
                </div>
              </div>

              {/* Message Stream */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/30 dark:bg-zinc-950/40 text-xs">
                {(activeChat.messages || []).map((msg) => {
                  const isAdmin = msg.sender_type === 'admin';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[75%] p-3 rounded-lg ${
                          isAdmin
                            ? 'bg-[#003E83] text-white rounded-tr-xs'
                            : 'bg-white dark:bg-zinc-800 text-gray-900 dark:text-white border border-gray-200 dark:border-zinc-700 rounded-tl-xs shadow-xs'
                        }`}
                      >
                        <p className="leading-relaxed">{msg.message_text}</p>
                      </div>
                      <span className="text-[10px] text-gray-400 mt-1 px-1">
                        {isAdmin ? 'Support Staff' : activeChat.user?.name || 'Tourist'} • {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input Form */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800 flex items-center gap-2 shrink-0"
              >
                <input
                  type="text"
                  placeholder="Type your reply as support staff..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="flex-1 text-xs px-3.5 py-2 rounded-md bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 border border-gray-200 dark:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-[#003E83] focus:border-[#003E83] transition-colors"
                />
                <button
                  type="submit"
                  disabled={!messageText.trim() || sending}
                  className="px-4 py-2 rounded-md bg-[#003E83] hover:bg-[#002e62] disabled:opacity-40 text-white text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send size={13} />
                  <span>Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-xs text-gray-400">
              <MessageSquare className="w-10 h-10 text-gray-300 dark:text-zinc-700 mb-2" />
              <p>Select a tourist conversation from the list to view messages.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
