import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bell, Search, User, Settings, LogOut, Menu,
  X, MessageCircle, Globe, Sun, Moon, Loader2
} from "lucide-react";
import { getInitialTheme, applyTheme, THEME_CHANGE_EVENT, isDarkTheme } from '../../utils/Theme';
import LogoutAlert from './LogoutAlert';
import notificationService from '../../services/notificationService';

export default function Header({ toggleSidebar, isSidebarOpen, isExpanded, toggleExpand }) {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const [searchQuery, setSearchQuery] = useState('');

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loadingNotifs, setLoadingNotifs] = useState(false);

  const [userName, setUserName] = useState(() => {
    try {
      const u = JSON.parse(localStorage.getItem('user') || '{}');
      return u.name || u.username || 'Admin User';
    } catch (e) {
      return 'Admin User';
    }
  });

  const [userEmail, setUserEmail] = useState(() => {
    try {
      const u = JSON.parse(localStorage.getItem('user') || '{}');
      return u.email || 'admin@tourism.gov.kh';
    } catch (e) {
      return 'admin@tourism.gov.kh';
    }
  });

  const [userAvatar, setUserAvatar] = useState(() => {
    try {
      const u = JSON.parse(localStorage.getItem('user') || '{}');
      return u.image || u.avatar || u.profile_photo_url || null;
    } catch (e) {
      return null;
    }
  });

  const [isDarkMode, setIsDarkMode] = useState(() => isDarkTheme(getInitialTheme()));

  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const langRef = useRef(null);

  const formatTimeAgo = (dateString) => {
    if (!dateString) return 'Just now';
    try {
      const now = new Date();
      const date = new Date(dateString);
      const diffSec = Math.floor((now - date) / 1000);

      if (diffSec < 60) return 'Just now';
      const diffMin = Math.floor(diffSec / 60);
      if (diffMin < 60) return `${diffMin}m ago`;
      const diffHour = Math.floor(diffMin / 60);
      if (diffHour < 24) return `${diffHour}h ago`;
      const diffDays = Math.floor(diffHour / 24);
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays}d ago`;
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  const fetchHeaderNotifications = useCallback(async () => {
    try {
      const res = await notificationService.getNotifications({ limit: 6 });
      const data = res?.data || res || [];
      const notifs = Array.isArray(data) ? data : (data.data || []);
      setNotifications(notifs);

      if (res?.meta?.unread_count !== undefined) {
        setUnreadCount(res.meta.unread_count);
      } else {
        setUnreadCount(notifs.filter(n => !n.read).length);
      }
    } catch (e) {
      // Graceful silence on network error
    }
  }, []);

  useEffect(() => {
    fetchHeaderNotifications();

    const handleUpdate = () => fetchHeaderNotifications();
    window.addEventListener('notifications-updated', handleUpdate);

    // Light background poll every 45s
    const interval = setInterval(fetchHeaderNotifications, 45000);

    return () => {
      window.removeEventListener('notifications-updated', handleUpdate);
      clearInterval(interval);
    };
  }, [fetchHeaderNotifications]);

  // Sync profile info if updated elsewhere
  useEffect(() => {
    const handleProfileUpdate = () => {
      try {
        const u = JSON.parse(localStorage.getItem('user') || '{}');
        if (u.name || u.username) setUserName(u.name || u.username);
        if (u.email) setUserEmail(u.email);
        setUserAvatar(u.image || u.avatar || u.profile_photo_url || null);
      } catch (e) {}
    };

    window.addEventListener('profile-updated', handleProfileUpdate);
    return () => window.removeEventListener('profile-updated', handleProfileUpdate);
  }, []);

  // Theme Sync
  useEffect(() => {
    const handleThemeChange = (e) => {
      if (e?.detail?.theme) {
        setIsDarkMode(isDarkTheme(e.detail.theme));
      } else {
        setIsDarkMode(document.documentElement.classList.contains('dark'));
      }
    };

    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
  }, []);

  const handleToggleTheme = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    applyTheme(nextMode ? 'dark' : 'light');
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setShowLangMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSidebarToggle = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      if (toggleSidebar) toggleSidebar();
    } else {
      if (toggleExpand) toggleExpand();
    }
  };

  const handleMarkAllRead = async (e) => {
    e?.stopPropagation();
    try {
      await notificationService.markAllRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
      window.dispatchEvent(new CustomEvent('notifications-updated'));
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  };

  const handleNotificationClick = async (notif) => {
    setShowNotifications(false);
    if (!notif.read) {
      try {
        await notificationService.markAsRead(notif.id);
        setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
        setUnreadCount(prev => Math.max(0, prev - 1));
        window.dispatchEvent(new CustomEvent('notifications-updated'));
      } catch (err) {
        console.error(err);
      }
    }
    if (notif.link) {
      navigate(notif.link);
    }
  };

  return (
    <header className="h-16 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 sticky top-0 z-30 transition-colors duration-200 w-full flex items-center shrink-0">
      <div className="px-3 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between">
          {/* Left section - Unified Sidebar Toggle Button */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={handleSidebarToggle}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-zinc-300 transition-colors shrink-0 cursor-pointer flex items-center justify-center"
              title={isSidebarOpen ? "Close Sidebar" : isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
              aria-label="Toggle Sidebar Navigation"
            >
              {/* Mobile Icon */}
              <span className="md:hidden">
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </span>

              {/* Desktop Icon */}
              <span className="hidden md:inline-flex">
                <Menu size={20} />
              </span>
            </button>
          </div>

          {/* Right section - Actions */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            {/* Dark / Light Mode Toggle */}
            <button
              onClick={handleToggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-zinc-300 transition-colors cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Moon size={20} className="text-blue-400" />
              ) : (
                <Sun size={20} className="text-amber-500" />
              )}
            </button>

            {/* Language Switcher */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-zinc-300 transition-colors cursor-pointer"
                aria-label="Change language"
              >
                <Globe size={20} />
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-zinc-900 rounded-md shadow-md border border-gray-200 dark:border-zinc-800 py-1 z-50">
                  <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">
                    Select Language
                  </div>
                  <button
                    onClick={() => { setCurrentLang('EN'); setShowLangMenu(false); }}
                    className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between transition-colors cursor-pointer ${
                      currentLang === 'EN'
                        ? 'bg-blue-50 dark:bg-zinc-800 text-[#003E83] dark:text-blue-400 font-medium'
                        : 'text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <span>English</span>
                    <span className="text-xs uppercase px-1.5 py-0.5 bg-gray-100 dark:bg-zinc-800 rounded">EN</span>
                  </button>
                  <button
                    onClick={() => { setCurrentLang('KH'); setShowLangMenu(false); }}
                    className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between transition-colors cursor-pointer ${
                      currentLang === 'KH'
                        ? 'bg-blue-50 dark:bg-zinc-800 text-[#003E83] dark:text-blue-400 font-medium'
                        : 'text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <span>ភាសាខ្មែរ</span>
                    <span className="text-xs uppercase px-1.5 py-0.5 bg-gray-100 dark:bg-zinc-800 rounded">KH</span>
                  </button>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div ref={notificationRef} className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Notifications"
              >
                <Bell size={20} className="text-gray-600 dark:text-zinc-300" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] font-bold text-white bg-red-600 rounded-full">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 sm:w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-zinc-900 rounded-md shadow-md border border-gray-200 dark:border-zinc-800 overflow-hidden z-50">
                  <div className="p-3.5 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm text-gray-800 dark:text-zinc-100">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-blue-100 text-[#003E83] dark:bg-blue-950/60 dark:text-blue-400 rounded">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={handleMarkAllRead}
                        className="text-xs text-[#003E83] dark:text-blue-400 hover:underline font-medium cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 dark:divide-zinc-800">
                    {loadingNotifs ? (
                      <div className="p-6 text-center text-gray-400 flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                        <span className="text-xs">Loading notifications...</span>
                      </div>
                    ) : notifications.length === 0 ? (
                      <div className="p-6 text-center text-gray-400 dark:text-zinc-500 text-xs">
                        No notifications found.
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => handleNotificationClick(n)}
                          className={`p-3 text-xs flex items-start gap-2.5 transition-colors cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800/60 ${
                            !n.read ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
                          }`}
                        >
                          <div className={`w-2 h-2 mt-1 rounded-full shrink-0 ${!n.read ? 'bg-blue-600' : 'bg-transparent'}`} />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800 dark:text-zinc-200 truncate">{n.title || n.subject || 'System Notification'}</p>
                            <p className="text-gray-500 dark:text-zinc-400 truncate mt-0.5">{n.message || n.body}</p>
                            <p className="text-[10px] text-gray-400 dark:text-zinc-500 mt-1">{formatTimeAgo(n.created_at)}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="p-2.5 border-t border-gray-200 dark:border-zinc-800 text-center bg-gray-50/50 dark:bg-zinc-900/50">
                    <Link
                      to="/notifications"
                      onClick={() => setShowNotifications(false)}
                      className="text-xs text-[#003E83] dark:text-blue-400 hover:underline font-medium"
                    >
                      View all in Notifications Center →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="p-0.5 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Profile menu"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-zinc-800 text-blue-700 dark:text-blue-400 border border-gray-200 dark:border-zinc-700 flex items-center justify-center font-bold text-xs overflow-hidden">
                  {userAvatar ? (
                    <img
                      src={userAvatar}
                      alt={userName}
                      className="w-full h-full object-cover"
                      onError={() => setUserAvatar(null)}
                    />
                  ) : (
                    userName ? userName.charAt(0).toUpperCase() : <User size={16} />
                  )}
                </div>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 max-w-[calc(100vw-2rem)] bg-white dark:bg-zinc-900 rounded-md shadow-md border border-gray-200 dark:border-zinc-800 overflow-hidden z-50">
                  <div className="px-3.5 py-3 border-b border-gray-200 dark:border-zinc-800 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-zinc-800 text-blue-700 dark:text-blue-400 border border-gray-200 dark:border-zinc-700 flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden">
                      {userAvatar ? (
                        <img
                          src={userAvatar}
                          alt={userName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        userName ? userName.charAt(0).toUpperCase() : <User size={16} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-gray-900 dark:text-zinc-100 truncate">{userName}</p>
                      <p className="text-[11px] text-gray-500 dark:text-zinc-400 truncate">{userEmail}</p>
                    </div>
                  </div>

                  <div className="p-1.5">
                    <Link to="/profile" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded transition-colors">
                      <User size={16} className="text-gray-400" />
                      My Profile
                    </Link>
                    {(() => {
                      const role = JSON.parse(localStorage.getItem('user') || '{}')?.role;
                      if (role === 'Super Admin' || role === 'Admin') {
                        return (
                          <Link to="/settings" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded transition-colors">
                            <Settings size={16} className="text-gray-400" />
                            Settings
                          </Link>
                        );
                      }
                      return null;
                    })()}

                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileMenu(false);
                        setShowLogoutAlert(true);
                      }}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded transition-colors w-full text-left cursor-pointer"
                    >
                      <LogOut size={16} className="text-red-500 dark:text-red-400" />
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search - Expanded */}
        {isSearchOpen && (
          <div ref={searchRef} className="md:hidden py-2.5 border-t border-gray-100 dark:border-zinc-800 animate-fadeIn">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-100 dark:bg-zinc-800 dark:text-zinc-100 border-0 rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-zinc-700 transition-all"
                autoFocus
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutAlert
        isOpen={showLogoutAlert}
        onClose={() => setShowLogoutAlert(false)}
      />
    </header>
  );
}
