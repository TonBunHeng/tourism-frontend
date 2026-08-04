import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bell, Search, User, Settings, LogOut, Menu,
  X, ChevronDown, MessageCircle, Globe, Sun, Moon
} from "lucide-react";
import profile_v2 from "../../assets/images/profile_v2.png";
import { getInitialTheme, applyTheme, THEME_CHANGE_EVENT, isDarkTheme } from '../../utils/Theme';

export default function Header({ toggleSidebar, isSidebarOpen }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const [searchQuery, setSearchQuery] = useState('');

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
  const location = useLocation();

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

  const getPageTitle = () => {
    const path = location.pathname;
    const titles = {
      '/dashboard': 'Dashboard',
      '/place': 'Places',
      '/categories': 'Categories',
      '/provinces': 'Provinces',
      '/gallery': 'Gallery',
      '/events': 'Events',
      '/users': 'Users',
      '/reviews': 'Reviews',
      '/ratings': 'Ratings',
      '/favorites': 'Favorites',
      '/profile': 'Profile',
      '/settings': 'Settings',
      '/chat': 'Chat',
    };
    return titles[path] || 'Smart Tourism';
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30 transition-colors duration-200 w-full">
      <div className="px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section - Page Title & Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors shrink-0"
              aria-label="Toggle mobile menu"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <h1 className="text-base sm:text-xl font-semibold text-gray-800 dark:text-white truncate">
              {getPageTitle()}
            </h1>
          </div>

          {/* Right section - Actions */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            {/* Search - Desktop */}
            <div ref={searchRef} className="hidden md:flex items-center relative">
              <div className={`relative transition-all duration-300 ${isSearchOpen ? 'w-64' : 'w-40'}`}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                  className="w-full pl-9 pr-4 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 dark:text-white border-0 rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all"
                />
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Search - Mobile Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle search"
            >
              <Search size={20} className="text-gray-600 dark:text-gray-300" />
            </button>

            {/* Language Switcher */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1.5 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                aria-label="Change language"
              >
                <Globe size={20} />
                <span className="text-sm font-medium hidden sm:inline">{currentLang}</span>
                <ChevronDown size={14} className="text-gray-400" />
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50">
                  <div className="p-1.5">
                    <button
                      onClick={() => {
                        setCurrentLang('EN');
                        setShowLangMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-xl transition-colors ${currentLang === 'EN'
                          ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                    >
                      <span>English</span>
                      <span className="text-xs uppercase px-1.5 py-0.5 bg-gray-100 dark:bg-gray-600 rounded">EN</span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentLang('KH');
                        setShowLangMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-xl transition-colors mt-1 ${currentLang === 'KH'
                          ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                    >
                      <span>ភាសាខ្មែរ</span>
                      <span className="text-xs uppercase px-1.5 py-0.5 bg-gray-100 dark:bg-gray-600 rounded">KH</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div ref={notificationRef} className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Notifications"
              >
                <Bell size={20} className="text-gray-600 dark:text-gray-300" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-800"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 sm:w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800 dark:text-white">Notifications</h3>
                    <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium">
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${!notification.read ? 'bg-blue-50/50 dark:bg-gray-700' : ''
                          }`}
                      >
                        <p className="text-sm text-gray-800 dark:text-gray-200">{notification.title}</p>
                        <span className="text-xs text-gray-400">{notification.time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-100 dark:border-gray-700 text-center">
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
                className="flex items-center gap-1 sm:gap-2 p-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Profile menu"
              >
                <img
                  src={profile_v2}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-gray-600"
                />
                <ChevronDown size={16} className="text-gray-400 hidden sm:block" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">BunHeng Ton</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">bunheng@email.com</p>
                  </div>
                  <div className="p-2">
                    <Link to="/profile" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors">
                      <User size={18} className="text-gray-400" />
                      My Profile
                    </Link>
                    <Link to="/settings" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors">
                      <Settings size={18} className="text-gray-400" />
                      Settings
                    </Link>
                    <Link to="/chat" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors">
                      <MessageCircle size={18} className="text-gray-400" />
                      Messages
                    </Link>

                    {/* Dark/Light Mode Toggle */}
                    <div
                      onClick={handleToggleTheme}
                      className="flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3">
                        {isDarkMode ? (
                          <Moon size={18} className="text-blue-500 dark:text-blue-400" />
                        ) : (
                          <Sun size={18} className="text-amber-500" />
                        )}
                        <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleTheme();
                        }}
                        className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer bg-gray-200 dark:bg-gray-600"
                      >
                        <span
                          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-4' : 'translate-x-1'}`}
                        />
                      </button>
                    </div>

                    <button className="flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors w-full text-left">
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
          <div ref={searchRef} className="md:hidden py-2.5 border-t border-gray-100 dark:border-gray-700 animate-fadeIn">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 dark:text-white border-0 rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all"
                autoFocus
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}