import { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import profile_v2 from "../../assets/images/profile_v2.png";
import tourism_app_icon from "../../assets/images/tourism_app_icon.png";
import {
  LayoutGrid, MapPinned, Tags, Map, Images, CalendarDays, MessageSquareText,
  Star, Heart, Trash2, MessageCircle, Settings, LogOut, ChevronRight, ChevronLeft,
  Sun, Moon, Users, User, X
} from "lucide-react";
import LogoutAlert from './LogoutAlert';
import { getInitialTheme, applyTheme, THEME_CHANGE_EVENT, isDarkTheme } from '../../utils/Theme';

export default function Sidebar({ isOpen, setIsOpen }) {
  // Load initial state from localStorage to prevent transition flashes on refresh
  const [isExpanded, setIsExpanded] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebar_expanded');
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return isDarkTheme(getInitialTheme());
  });
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const menuRef = useRef(null);
  const sidebarRef = useRef(null);
  const location = useLocation();

  // Save expanded state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sidebar_expanded', JSON.stringify(isExpanded));
  }, [isExpanded]);

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

  useEffect(() => {
    function handleClickOutside(event) {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, setIsOpen]);

  const managementItems = [
    { name: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
    { name: "Places", icon: MapPinned, path: "/place" },
    { name: "Categories", icon: Tags, path: "/categories" },
    { name: "Provinces", icon: Map, path: "/provinces" },
    { name: "Gallery", icon: Images, path: "/gallery" },
    { name: "Events", icon: CalendarDays, path: "/events" },
  ];

  const engagementItems = [
    { name: "Users", icon: Users, path: "/users" },
    { name: "Reviews", icon: MessageSquareText, path: "/reviews" },
    { name: "Ratings", icon: Star, path: "/ratings" },
    { name: "Favorites", icon: Heart, path: "/favorites" },
    { name: "Deletion Requests", icon: Trash2, path: "/deletion-requests" },
  ];

  const accountItems = [
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Chat", icon: MessageCircle, path: "/chat" },
    { name: "Settings", icon: Settings, path: "/settings" },
    { name: "Log out", icon: LogOut, path: "/logout" },
  ];

  const renderNavItem = (item) => {
    const isActive = item.path && item.path !== '#' && location.pathname.startsWith(item.path);
    const Icon = item.icon;

    if (item.name === "Log out") {
      return (
        <button
          key={item.name}
          onClick={() => setShowLogoutAlert(true)}
          className="group relative flex items-center w-full px-3 py-2.5 my-0.5 rounded-xl cursor-pointer transition-colors duration-200 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)]"
        >
          <div className="flex items-center w-full">
            <div className={`flex items-center justify-center shrink-0 ${!isExpanded ? 'mx-auto' : ''}`}>
              <Icon size={20} strokeWidth={2} className="text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)]" />
            </div>
            {isExpanded && (
              <span className="ml-3 text-sm font-medium whitespace-nowrap text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)]">
                {item.name}
              </span>
            )}
          </div>
          {!isExpanded && (
            <div className="hidden md:block absolute left-full ml-4 px-3 py-1.5 bg-[var(--color-danger-text)] text-[var(--color-white)] text-xs font-medium rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
              {item.name}
              <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-[var(--color-danger-text)]"></div>
            </div>
          )}
        </button>
      );
    }

    return (
      <Link
        to={item.path || '#'}
        key={item.name}
        className={`group relative flex items-center px-3 py-2.5 my-0.5 rounded-xl cursor-pointer transition-colors duration-200 
          ${isActive
            ? 'bg-[var(--color-info-bg)] text-[var(--color-info-text)] dark:bg-[var(--color-info-dark-bg)] dark:text-[var(--color-info-dark-text)] font-semibold'
            : 'text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)]'}`}
      >
        <div className="flex items-center w-full">
          <div className={`flex items-center justify-center shrink-0 ${!isExpanded ? 'mx-auto' : ''}`}>
            <Icon size={20} strokeWidth={2} />
          </div>

          {isExpanded && (
            <span className="ml-3 text-sm font-medium whitespace-nowrap">
              {item.name}
            </span>
          )}
        </div>

        {!isExpanded && (
          <div className="hidden md:block absolute left-full ml-4 px-3 py-1.5 bg-[var(--color-bg-dark)] dark:bg-[var(--color-surface-hover-dark)] text-[var(--color-white)] text-xs font-medium rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
            {item.name}
            <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-[var(--color-bg-dark)] dark:border-r-[var(--color-surface-hover-dark)]"></div>
          </div>
        )}
      </Link>
    );
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        ref={sidebarRef}
        className={`fixed md:relative h-screen border-r flex flex-col transition-all duration-300 z-50
          bg-[var(--color-sidebar-bg)] dark:bg-[var(--color-sidebar-dark-bg)]
          border-[var(--color-sidebar-border)] dark:border-[var(--color-sidebar-dark-border)]
          ${isExpanded ? 'md:w-[260px]' : 'md:w-[80px]'}
          w-[280px] 
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          shadow-2xl md:shadow-[1px_0_10px_rgba(0,0,0,0.03)]
        `}
      >
        {/* Header */}
        <div className={`h-20 flex items-center ${isExpanded ? 'justify-between px-5' : 'justify-center px-2'}`}>
          <div className={`flex items-center gap-3 overflow-hidden ${isExpanded ? 'w-full' : 'w-auto'}`}>
            <div
              className="w-10 h-10 rounded-xl bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-info-border)] dark:border-[var(--color-info-dark-border)] text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] flex items-center justify-center shrink-0"
            >
              <img src={tourism_app_icon} alt="Tourism App Icon" className="w-10 h-10" />
            </div>
            {isExpanded && (
              <div className="flex flex-col whitespace-nowrap">
                <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)] text-base leading-tight">Smart Tourism</span>
                <span className="text-[11px] text-[var(--color-text-muted-light)] dark:text-[var(--color-text-muted-dark)] font-medium">Technology</span>
              </div>
            )}
          </div>

          {isExpanded && (
            <button
              onClick={() => setIsExpanded(false)}
              className="hidden md:block p-1 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-md text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] transition-colors shrink-0"
            >
              <ChevronLeft size={18} />
            </button>
          )}

          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-1 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-md text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] transition-colors shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {!isExpanded && (
          <div className="hidden md:flex justify-center -mt-2 mb-2">
            <button
              onClick={() => setIsExpanded(true)}
              className="p-1 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-md text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Navigation Areas */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide py-2 px-4 flex flex-col gap-6">
          <div>
            {isExpanded && (
              <h3 className="px-3 text-[10px] font-bold text-[var(--color-text-muted-light)] dark:text-[var(--color-text-muted-dark)] mb-2 uppercase tracking-widest">
                Management
              </h3>
            )}
            <div className="flex flex-col">
              {managementItems.map(item => renderNavItem(item))}
            </div>
          </div>

          <div>
            {isExpanded && (
              <h3 className="px-3 text-[10px] font-bold text-[var(--color-text-muted-light)] dark:text-[var(--color-text-muted-dark)] mb-2 uppercase tracking-widest">
                Engagement
              </h3>
            )}
            <div className="flex flex-col">
              {engagementItems.map(item => renderNavItem(item))}
            </div>
          </div>

          <div>
            {isExpanded && (
              <h3 className="px-3 text-[10px] font-bold text-[var(--color-text-muted-light)] dark:text-[var(--color-text-muted-dark)] mb-2 uppercase tracking-widest">
                Preferences
              </h3>
            )}
            <div className="flex flex-col">
              {accountItems.map(item => renderNavItem(item))}
            </div>
          </div>

          {/* Theme Toggle */}
          <div className={`mt-auto mb-2 flex items-center ${isExpanded ? 'px-4 justify-between' : 'justify-center'}`}>
            {isExpanded && (
              <div className="text-[var(--color-text-muted-light)] dark:text-[var(--color-text-muted-dark)]">
                <Sun size={16} className={!isDarkMode ? "text-yellow-500" : ""} />
              </div>
            )}

            <button
              onClick={handleToggleTheme}
              className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer bg-[var(--color-border-subtle-light)] dark:bg-[var(--color-border-dark)]"
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-[var(--color-white)] transition-transform ${isDarkMode ? 'translate-x-4' : 'translate-x-1'}`}
              />
            </button>

            {isExpanded && (
              <div className="text-[var(--color-text-muted-light)] dark:text-[var(--color-text-muted-dark)]">
                <Moon size={16} className={isDarkMode ? "text-[var(--color-info-dark-text)]" : ""} />
              </div>
            )}
          </div>
        </div>

        {/* User Profile Footer */}
        <div
          className="p-4 relative border-t border-[var(--color-sidebar-border)] dark:border-[var(--color-sidebar-dark-border)]"
        >
          <button
            type="button"
            onClick={() => setShowProfileMenu((prev) => !prev)}
            className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] transition-colors w-full text-left ${!isExpanded && 'justify-center'}`}
          >
            <div className="relative shrink-0">
              <img
                src={profile_v2}
                alt="User profile"
                className="w-9 h-9 rounded-full object-cover bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]"
              />
            </div>
            {isExpanded && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)] truncate">BunHeng Ton</span>
                <span className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] truncate">bunheng@email.com</span>
              </div>
            )}
          </button>
        </div>
      </aside>

      <LogoutAlert
        isOpen={showLogoutAlert}
        onClose={() => setShowLogoutAlert(false)}
        onLogout={() => console.log('User logged out')}
      />
    </>
  );
}