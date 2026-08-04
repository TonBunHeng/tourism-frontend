import { useState, useEffect, useRef } from 'react';
import { User } from 'lucide-react';
import ChatsStats from './ChatsStats';
import ChatsList from './ChatsList';
import ChatWindow from './ChatWindow';
import ChatUserInfo from './ChatUserInfo';

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
  const [isAITyping] = useState(false);
  const [sortBy, setSortBy] = useState('recent');
  const [showUserInfo, setShowUserInfo] = useState(false);

  const messagesEndRef = useRef(null);
  const categories = ['All', 'Travel Planning', 'Bookings', 'Feedback', 'Recommendations', 'Support', 'Account Management'];
  const statuses = ['All', 'online', 'away', 'offline'];

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

    // Add admin reply message
    const adminMessage = {
      id: selectedChat.messages.length + 1,
      sender: 'admin',
      text: newMessage,
      timestamp: new Date().toLocaleString(),
      read: true
    };

    const updatedChat = {
      ...selectedChat,
      messages: [...selectedChat.messages, adminMessage],
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
      <ChatsStats chats={chats} />

      {/* Main Chat Area */}
      <div className="flex gap-4 md:min-h-[600px] h-[calc(100vh-260px)] md:h-auto">
        {/* Chat List Sidebar */}
        <ChatsList
          chats={sortedChats}
          selectedChat={selectedChat}
          onSelectChat={handleSelectChat}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterCategory={filterCategory}
          onCategoryChange={setFilterCategory}
          categories={categories}
          filterStatus={filterStatus}
          onStatusChange={setFilterStatus}
          statuses={statuses}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onReset={handleReset}
        />

        {/* Chat Window */}
        <ChatWindow
          selectedChat={selectedChat}
          onBackToList={() => setSelectedChat(null)}
          messagesEndRef={messagesEndRef}
          isAITyping={isAITyping}
          quickResponses={quickResponses}
          newMessage={newMessage}
          onNewMessageChange={setNewMessage}
          onSendMessage={handleSendMessage}
          onKeyPress={handleKeyPress}
          showUserInfo={showUserInfo}
          onToggleShowUserInfo={() => setShowUserInfo(!showUserInfo)}
        />

        {/* User Info Sidebar Panel */}
        <ChatUserInfo
          isOpen={showUserInfo}
          selectedChat={selectedChat}
          onClose={() => setShowUserInfo(false)}
        />
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}