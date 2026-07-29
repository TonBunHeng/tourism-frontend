import { useState, useEffect, useRef } from 'react';
import { Search, Send, Paperclip, Smile, MoreVertical, Phone, Video, Info, Clock, Check, CheckCheck, User, Users, Star, X, MessageSquare, Bot, AlertCircle, Plus, RotateCcw, ArrowLeft, ChevronDown } from 'lucide-react';

export default function Chats() {
  // Default chat data
  const defaultChats = [
    {
      id: 1,
      user: {
        name: 'Sokha P.',
        avatar: User,
        email: 'sokha@email.com',
        status: 'online',
        lastSeen: '2024-01-15 14:30',
        isVIP: true,
        totalChats: 23
      },
      messages: [
        {
          id: 1,
          sender: 'user',
          text: 'Hello! I need help planning my trip to Angkor Wat.',
          timestamp: '2024-01-15 14:00',
          read: true
        },
        {
          id: 2,
          sender: 'ai',
          text: 'Hello Sokha! I\'d be happy to help you plan your visit to Angkor Wat. What would you like to know?',
          timestamp: '2024-01-15 14:01',
          read: true,
          isAI: true
        },
        {
          id: 3,
          sender: 'user',
          text: 'What\'s the best time to visit?',
          timestamp: '2024-01-15 14:02',
          read: true
        },
        {
          id: 4,
          sender: 'ai',
          text: 'The best time to visit Angkor Wat is early morning (5:00-6:00 AM) for the sunrise view. The weather is cooler, and you can avoid the crowds. I recommend visiting between November and February for the best weather conditions.',
          timestamp: '2024-01-15 14:03',
          read: true,
          isAI: true
        }
      ],
      lastMessage: 'The best time to visit Angkor Wat is early morning...',
      lastMessageTime: '14:03',
      unread: 0,
      category: 'Travel Planning',
      priority: 'high',
      createdAt: '2024-01-15 14:00'
    },
    {
      id: 2,
      user: {
        name: 'David C.',
        avatar: User,
        email: 'david@email.com',
        status: 'away',
        lastSeen: '2024-01-20 16:45',
        isVIP: false,
        totalChats: 12
      },
      messages: [
        {
          id: 1,
          sender: 'user',
          text: 'I need to cancel my hotel booking.',
          timestamp: '2024-01-20 16:30',
          read: true
        },
        {
          id: 2,
          sender: 'ai',
          text: 'I understand you need to cancel a hotel booking. Could you please provide your booking reference number?',
          timestamp: '2024-01-20 16:31',
          read: true,
          isAI: true
        },
        {
          id: 3,
          sender: 'user',
          text: 'Reference: #BOOK-2024-0123',
          timestamp: '2024-01-20 16:32',
          read: true
        }
      ],
      lastMessage: 'Reference: #BOOK-2024-0123',
      lastMessageTime: '16:32',
      unread: 0,
      category: 'Bookings',
      priority: 'medium',
      createdAt: '2024-01-20 16:30'
    },
    {
      id: 3,
      user: {
        name: 'Maria L.',
        avatar: User,
        email: 'maria@email.com',
        status: 'offline',
        lastSeen: '2024-01-25 10:15',
        isVIP: false,
        totalChats: 5
      },
      messages: [
        {
          id: 1,
          sender: 'user',
          text: 'The restaurant I visited was terrible.',
          timestamp: '2024-01-25 10:00',
          read: true
        },
        {
          id: 2,
          sender: 'ai',
          text: 'I\'m sorry to hear that. Could you tell me which restaurant it was and what happened?',
          timestamp: '2024-01-25 10:01',
          read: true,
          isAI: true
        }
      ],
      lastMessage: 'I\'m sorry to hear that. Could you tell me which...',
      lastMessageTime: '10:01',
      unread: 0,
      category: 'Feedback',
      priority: 'high',
      createdAt: '2024-01-25 10:00'
    },
    {
      id: 4,
      user: {
        name: 'James R.',
        avatar: User,
        email: 'james@email.com',
        status: 'online',
        lastSeen: '2024-02-01 12:00',
        isVIP: true,
        totalChats: 45
      },
      messages: [
        {
          id: 1,
          sender: 'user',
          text: 'Recommend some must-visit places in Cambodia.',
          timestamp: '2024-02-01 11:50',
          read: true
        },
        {
          id: 2,
          sender: 'ai',
          text: 'Certainly! Here are some must-visit places in Cambodia:\n1. Angkor Wat (Siem Reap)\n2. Royal Palace (Phnom Penh)\n3. Killing Caves (Battambang)\n4. Koh Rong Island (Sihanoukville)\n5. Tonle Sap Lake\n\nWould you like more details about any of these?',
          timestamp: '2024-02-01 11:52',
          read: true,
          isAI: true
        },
        {
          id: 3,
          sender: 'user',
          text: 'Tell me more about Koh Rong Island.',
          timestamp: '2024-02-01 11:53',
          read: false
        }
      ],
      lastMessage: 'Tell me more about Koh Rong Island.',
      lastMessageTime: '11:53',
      unread: 1,
      category: 'Recommendations',
      priority: 'medium',
      createdAt: '2024-02-01 11:50'
    },
    {
      id: 5,
      user: {
        name: 'Sophie N.',
        avatar: User,
        email: 'sophie@email.com',
        status: 'online',
        lastSeen: '2024-02-10 09:30',
        isVIP: false,
        totalChats: 8
      },
      messages: [
        {
          id: 1,
          sender: 'user',
          text: 'I need help with my account.',
          timestamp: '2024-02-10 09:20',
          read: true
        },
        {
          id: 2,
          sender: 'ai',
          text: 'I\'d be happy to help with your account issues. What seems to be the problem?',
          timestamp: '2024-02-10 09:21',
          read: true,
          isAI: true
        }
      ],
      lastMessage: 'I\'d be happy to help with your account issues...',
      lastMessageTime: '09:21',
      unread: 0,
      category: 'Support',
      priority: 'high',
      createdAt: '2024-02-10 09:20'
    },
    {
      id: 6,
      user: {
        name: 'Thomas K.',
        avatar: User,
        email: 'thomas@email.com',
        status: 'offline',
        lastSeen: '2024-02-15 08:00',
        isVIP: false,
        totalChats: 3
      },
      messages: [
        {
          id: 1,
          sender: 'user',
          text: 'I want to delete my account.',
          timestamp: '2024-02-15 07:55',
          read: true
        },
        {
          id: 2,
          sender: 'ai',
          text: 'I understand you want to delete your account. I\'ll need to confirm your identity first. Could you please verify your email address?',
          timestamp: '2024-02-15 07:56',
          read: true,
          isAI: true
        }
      ],
      lastMessage: 'I understand you want to delete your account...',
      lastMessageTime: '07:56',
      unread: 0,
      category: 'Account Management',
      priority: 'critical',
      createdAt: '2024-02-15 07:55'
    }
  ];

  const [chats, setChats] = useState(defaultChats);
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [newMessage, setNewMessage] = useState('');
  const [isAITyping, setIsAITyping] = useState(false);
  const [sortBy, setSortBy] = useState('recent');
  const [showUserInfo, setShowUserInfo] = useState(false);

  const messagesEndRef = useRef(null);
  const categories = ['All', 'Travel Planning', 'Bookings', 'Feedback', 'Recommendations', 'Support', 'Account Management'];
  const statuses = ['All', 'online', 'away', 'offline'];

  const stats = [
    {
      label: 'Active Chats',
      value: chats.filter(c => c.user.status === 'online').length,
      icon: MessageSquare,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/30'
    },
    {
      label: 'Unread Messages',
      value: chats.reduce((sum, c) => sum + c.unread, 0),
      icon: Clock,
      color: 'text-amber-500 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-900/30'
    },
    {
      label: 'AI Conversations',
      value: chats.filter(c => c.messages.some(m => m.isAI)).length,
      icon: Bot,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-900/30'
    },
    {
      label: 'VIP Users',
      value: chats.filter(c => c.user.isVIP).length,
      icon: Star,
      color: 'text-rose-500 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-900/30'
    }
  ];

  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chat.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || chat.category === filterCategory;
    const matchesStatus = filterStatus === 'All' || chat.user.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedChats = [...filteredChats].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortBy === 'unread') {
      return b.unread - a.unread;
    }
    if (sortBy === 'priority') {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4);
    }
    return 0;
  });

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    // Add user message
    const userMessage = {
      id: selectedChat.messages.length + 1,
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toLocaleString(),
      read: true
    };

    const updatedChat = {
      ...selectedChat,
      messages: [...selectedChat.messages, userMessage],
      lastMessage: newMessage,
      lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update chat in list
    const updatedChats = chats.map(chat =>
      chat.id === selectedChat.id ? updatedChat : chat
    );
    setChats(updatedChats);
    setSelectedChat(updatedChat);
    setNewMessage('');

    // Simulate AI response
    setIsAITyping(true);
    setTimeout(() => {
      const aiResponses = [
        'That\'s a great question! Let me help you with that.',
        'I understand. Here\'s what I can suggest...',
        'Thank you for sharing that. I\'ll assist you right away.',
        'Let me look into that for you. One moment please.',
        'I appreciate your patience. Here\'s the information you need.',
        'That\'s an interesting point. Let me provide some insights.',
        'I\'m here to help! Let\'s work through this together.',
        'Thank you for reaching out. I\'ll do my best to assist you.'
      ];
      
      const aiMessage = {
        id: updatedChat.messages.length + 1,
        sender: 'ai',
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date().toLocaleString(),
        read: true,
        isAI: true
      };

      const aiUpdatedChat = {
        ...updatedChat,
        messages: [...updatedChat.messages, aiMessage],
        lastMessage: aiMessage.text,
        lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const aiUpdatedChats = updatedChats.map(chat =>
        chat.id === selectedChat.id ? aiUpdatedChat : chat
      );
      setChats(aiUpdatedChats);
      setSelectedChat(aiUpdatedChat);
      setIsAITyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all chats to default?')) {
      setChats(defaultChats);
      setSelectedChat(null);
      setSearchTerm('');
      setFilterCategory('All');
      setFilterStatus('All');
      setSortBy('recent');
    }
  };

  const handleSelectChat = (chat) => {
    // Mark messages as read
    const updatedChat = {
      ...chat,
      unread: 0,
      messages: chat.messages.map(m => ({ ...m, read: true }))
    };
    const updatedChats = chats.map(c => c.id === chat.id ? updatedChat : c);
    setChats(updatedChats);
    setSelectedChat(updatedChat);
    setShowUserInfo(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      online: 'bg-green-500',
      away: 'bg-yellow-500',
      offline: 'bg-gray-400'
    };
    return colors[status] || colors.offline;
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      critical: 'bg-red-100 text-red-700 border-red-200',
      high: 'bg-orange-100 text-orange-700 border-orange-200',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      low: 'bg-blue-100 text-blue-700 border-blue-200'
    };
    return colors[priority] || colors.low;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChat]);

  // Quick AI responses
  const quickResponses = [
    'Hello! How can I help you today?',
    'I understand your concern.',
    'Let me check that for you.',
    'Here\'s what I recommend.',
    'Thank you for your patience.',
    'Would you like more information?'
  ];

  return (
    <div className="flex flex-col">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Chat Area */}
      {/* Mobile: list and window are toggled (only one visible at a time). Desktop (md+): side by side. */}
      <div className="flex gap-4 md:min-h-[600px] h-[calc(100vh-260px)] md:h-auto">
        {/* Chat List */}
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
                  onClick={handleReset}
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
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2 mt-3 flex-wrap">
              <div className="relative">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
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
                  onChange={(e) => setFilterStatus(e.target.value)}
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
                  onChange={(e) => setSortBy(e.target.value)}
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

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {sortedChats.length > 0 ? (
              sortedChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleSelectChat(chat)}
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

        {/* Chat Window */}
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
                    onClick={() => setSelectedChat(null)}
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
                    onClick={() => setShowUserInfo(!showUserInfo)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Info className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="hidden sm:inline-flex p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Messages */}
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
                        setNewMessage(response);
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
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      rows="2"
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <button className="hidden sm:inline-flex p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0">
                    <Smile className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                  <button 
                    onClick={handleSendMessage}
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

        {/* User Info Sidebar: overlay on mobile, side panel on desktop */}
        {showUserInfo && selectedChat && (
          <div className="fixed inset-0 z-50 bg-black/30 md:static md:z-auto md:bg-transparent flex md:block justify-end">
            <div className="w-full max-w-sm md:max-w-none md:w-80 h-full md:h-auto bg-white dark:bg-gray-800 md:rounded-2xl shadow-sm border-l md:border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden flex-shrink-0">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white">User Info</h3>
                  <button 
                    onClick={() => setShowUserInfo(false)}
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
                    <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      This conversation is being assisted by AI. The AI provides automated responses to help users quickly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}