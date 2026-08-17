import { useState, useEffect, useRef } from "react";
import { User } from "lucide-react";
import ChatsStats from "./ChatsStats";
import ChatsList from "./ChatsList";
import ChatWindow from "./ChatWindow";
import ChatUserInfo from "./ChatUserInfo";
import chatService from "../../services/chatService";

export default function Chats() {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [newMessage, setNewMessage] = useState("");
  const [isAITyping] = useState(false);
  const [sortBy, setSortBy] = useState("recent");
  const [showUserInfo, setShowUserInfo] = useState(false);

  const messagesEndRef = useRef(null);
  const categories = ["All", "Travel Planning", "Bookings", "Feedback", "Recommendations", "Support", "Account Management"];
  const statuses = ["All", "online", "away", "offline"];

  const loadChats = async () => {
    setIsLoading(true);
    try {
      const res = await chatService.getChats();
      if (res.success && res.data) {
        const formatted = res.data.map(chat => {
          const userObj = chat.user || {};
          const msgs = (chat.messages || []).map(m => ({
            id: m.id,
            sender: m.sender_type === "admin" ? "admin" : (m.sender_type || "user"),
            text: m.message_text || m.text || "",
            timestamp: m.created_at || m.timestamp || new Date().toLocaleString(),
            read: Boolean(m.is_read)
          }));
          return {
            id: chat.id,
            user: {
              name: userObj.name || "App User",
              email: userObj.email || "user@example.com",
              avatar: userObj.avatar || null,
              status: userObj.status === "Active" ? "online" : "offline",
              role: userObj.role || "User"
            },
            category: chat.category || "Support",
            priority: chat.priority || "medium",
            status: chat.status || "active",
            unread: chat.unread_count || 0,
            lastMessage: chat.last_message || "",
            lastMessageTime: chat.last_message_time || "",
            createdAt: chat.created_at || new Date().toISOString(),
            messages: msgs
          };
        });
        setChats(formatted);
        if (selectedChat) {
          const updatedSel = formatted.find(c => c.id === selectedChat.id);
          if (updatedSel) setSelectedChat(updatedSel);
        }
      }
    } catch (e) {
      console.error("Failed to load chats:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadChats();
  }, []);

  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chat.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" || chat.category === filterCategory;
    const matchesStatus = filterStatus === "All" || chat.user.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedChats = [...filteredChats].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortBy === "unread") {
      return b.unread - a.unread;
    }
    if (sortBy === "priority") {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4);
    }
    return 0;
  });

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    const messageText = newMessage;
    setNewMessage("");

    try {
      await chatService.sendMessage(selectedChat.id, messageText);
      loadChats();
    } catch (e) {
      alert(e.message || "Failed to send message.");
    }
  };

  const handleReset = () => {
    loadChats();
  };

  const handleSelectChat = async (chat) => {
    try {
      const res = await chatService.getChatById(chat.id);
      if (res.success && res.data) {
        const c = res.data;
        const userObj = c.user || {};
        const msgs = (c.messages || []).map(m => ({
          id: m.id,
          sender: m.sender_type === "admin" ? "admin" : (m.sender_type || "user"),
          text: m.message_text || m.text || "",
          timestamp: m.created_at || m.timestamp || new Date().toLocaleString(),
          read: true
        }));
        const fullChat = {
          id: c.id,
          user: {
            name: userObj.name || "App User",
            email: userObj.email || "user@example.com",
            avatar: userObj.avatar || null,
            status: userObj.status === "Active" ? "online" : "offline",
            role: userObj.role || "User"
          },
          category: c.category || "Support",
          priority: c.priority || "medium",
          status: c.status || "active",
          unread: 0,
          lastMessage: c.last_message || "",
          lastMessageTime: c.last_message_time || "",
          createdAt: c.created_at || new Date().toISOString(),
          messages: msgs
        };
        setSelectedChat(fullChat);
      } else {
        setSelectedChat(chat);
      }
    } catch (e) {
      setSelectedChat(chat);
    }
    setShowUserInfo(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChat]);

  // Quick AI responses
  const quickResponses = [
    "Hello! How can I help you today?",
    "I understand your concern.",
    "Let me check that for you.",
    "Here is what I recommend.",
    "Thank you for your patience.",
    "Would you like more information?"
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
