import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell, Search, User, Settings, LogOut, Menu,
  X, MessageCircle, Globe, Sun, Moon
} from "lucide-react";
import { getInitialTheme, applyTheme, THEME_CHANGE_EVENT, isDarkTheme } from '../../utils/Theme';
import LogoutAlert from './LogoutAlert';

export default function Header({ toggleSidebar, isSidebarOpen, isExpanded, toggleExpand }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const [searchQuery, setSearchQuery] = useState('');

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

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return isDarkTheme(getInitialTheme());
  });

  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const langRef = useRef(null);

  useEffect(() => {
    const handleAvatarSync = () => {
      try {
        const u = JSON.parse(localStorage.getItem('user') || '{}');
        setUserAvatar(u.image || u.avatar || u.profile_photo_url || null);
        setUserName(u.name || u.username || 'Admin User');
        setUserEmail(u.email || 'admin@tourism.gov.kh');
      } catch (e) {}
    };

    window.addEventListener('storage', handleAvatarSync);
    window.addEventListener('user-profile-updated', handleAvatarSync);
    return () => {
      window.removeEventListener('storage', handleAvatarSync);
      window.removeEventListener('user-profile-updated', handleAvatarSync);
    };
  }, []);

  useEffect(() => {
    const handleThemeChange = (e) => {
      if (e.detail && typeof e.detail.isDark === 'boolean') {
        setIsDarkMode(e.detail.isDark);
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

  const notifications = [
    { id: 1, title: 'New user registered', time: '5 min ago', read: false },
    { id: 2, title: 'Place "Angkor Wat" updated', time: '1 hour ago', read: false },
    { id: 3, title: 'New review posted', time: '3 hours ago', read: true },
    { id: 4, title: 'System update completed', time: 'Yesterday', read: true },
  ];

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

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSidebarToggle = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      if (toggleSidebar) toggleSidebar();
    } else {
      if (toggleExpand) toggleExpand();
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
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-zinc-300 transition-colors"
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
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-zinc-300 transition-colors"
                aria-label="Change language"
              >
                <Globe size={20} />
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-gray-100 dark:border-zinc-800 overflow-hidden z-50 animate-smooth-pop">
                  <div className="p-1.5">
                    <button
                      onClick={() => {
                        setCurrentLang('EN');
                        setShowLangMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${currentLang === 'EN'
                        ? 'bg-blue-50 dark:bg-zinc-800 text-blue-600 dark:text-blue-400 font-semibold'
                        : 'text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800'
                        }`}
                    >
                      <span>English</span>
                      <span className="text-xs uppercase px-1.5 py-0.5 bg-gray-100 dark:bg-zinc-800 rounded">EN</span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentLang('KH');
                        setShowLangMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors mt-1 ${currentLang === 'KH'
                        ? 'bg-blue-50 dark:bg-zinc-800 text-blue-600 dark:text-blue-400 font-semibold'
                        : 'text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800'
                        }`}
                    >
                      <span>ភាសាខ្មែរ</span>
                      <span className="text-xs uppercase px-1.5 py-0.5 bg-gray-100 dark:bg-zinc-800 rounded">KH</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div ref={notificationRef} className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Notifications"
              >
                <Bell size={20} className="text-gray-600 dark:text-zinc-300" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-zinc-900"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 sm:w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-gray-100 dark:border-zinc-800 overflow-hidden z-50 animate-smooth-pop">
                  <div className="p-4 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800 dark:text-zinc-100">Notifications</h3>
                    <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium">
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-zinc-800 cursor-pointer transition-colors ${!notification.read ? 'bg-blue-50/50 dark:bg-zinc-800' : ''
                          }`}
                      >
                        <p className="text-sm text-gray-800 dark:text-zinc-200">{notification.title}</p>
                        <span className="text-xs text-gray-400">{notification.time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-100 dark:border-zinc-800 text-center">
                    <Link to="/notifications" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium">
                      View all notifications
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
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-zinc-800 text-blue-600 dark:text-blue-400 border border-gray-200 dark:border-zinc-700 flex items-center justify-center font-bold text-xs shadow-sm overflow-hidden">
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
                <div className="absolute right-0 mt-2 w-60 max-w-[calc(100vw-2rem)] bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-gray-100 dark:border-zinc-800 overflow-hidden z-50 animate-smooth-pop">
                  <div className="px-3.5 py-3 border-b border-gray-100 dark:border-zinc-800 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-zinc-800 text-blue-600 dark:text-blue-400 border border-gray-200 dark:border-zinc-700 flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden">
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

                  <div className="p-2">
                    <Link to="/profile" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-md transition-colors">
                      <User size={18} className="text-gray-400" />
                      My Profile
                    </Link>
                    <Link to="/settings" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-md transition-colors">
                      <Settings size={18} className="text-gray-400" />
                      Settings
                    </Link>
                    <Link to="/chat" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-md transition-colors">
                      <MessageCircle size={18} className="text-gray-400" />
                      Messages
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileMenu(false);
                        setShowLogoutAlert(true);
                      }}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-md transition-colors w-full text-left cursor-pointer"
                    >
                      <LogOut size={18} className="text-red-500 dark:text-red-400" />
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