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
import { getInitialTheme, applyTheme } from '../../utils/Theme';

export default function Sidebar({ isOpen, setIsOpen }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => getInitialTheme() === 'dark');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const menuRef = useRef(null);
  const sidebarRef = useRef(null);
  const location = useLocation();

  // Handle Global Dark Mode
  useEffect(() => {
    applyTheme(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isOpen && 
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setIsOpen]);

  // Close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, setIsOpen]);

  const menuItems = [
    { name: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
    { name: "Places", icon: MapPinned, path: "/place" },
    { name: "Categories", icon: Tags, path: "/categories" },
    { name: "Provinces", icon: Map, path: "/provinces" },
    { name: "Gallery", icon: Images, path: "/gallery" },
    { name: "Events", icon: CalendarDays, path: "/events" },
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
          className={`group relative flex items-center w-full px-3 py-2.5 my-0.5 rounded-xl cursor-pointer transition-colors duration-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30`}
        >
          <div className="flex items-center w-full">
            <div className={`flex items-center justify-center shrink-0 ${!isExpanded ? 'mx-auto' : ''}`}>
              <Icon size={20} strokeWidth={2} className="text-red-600 dark:text-red-400" />
            </div>
            {isExpanded && (
              <span className={`ml-3 text-sm font-medium whitespace-nowrap text-red-600 dark:text-red-400`}>
                {item.name}
              </span>
            )}
          </div>
          {!isExpanded && (
            <div className="hidden md:block absolute left-full ml-4 px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
              {item.name}
              <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-red-600"></div>
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
          ${isActive ? 'bg-[#e9f8f6] text-[#22b7ab] dark:bg-[#22b7ab]/20 dark:text-[#22b7ab]' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
      >
        <div className="flex items-center w-full">
          {item.hasSubmenu && isExpanded && (
            <div className="w-4 mr-1.5 flex justify-center shrink-0">
              <ChevronRight size={14} className={isActive ? "text-[#22b7ab]" : "text-gray-400"} />
            </div>
          )}

          <div className={`flex items-center justify-center shrink-0 ${!isExpanded ? 'mx-auto' : ''}`}>
            <Icon size={20} strokeWidth={2} />
          </div>

          {isExpanded && (
            <span className={`ml-3 text-sm font-medium whitespace-nowrap`}>
              {item.name}
            </span>
          )}
        </div>

        {!isExpanded && (
          <div className="hidden md:block absolute left-full ml-4 px-3 py-1.5 bg-gray-800 dark:bg-gray-700 text-white text-xs font-medium rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
            {item.name}
            <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-gray-800 dark:border-r-gray-700"></div>
          </div>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        ref={sidebarRef}
        className={`fixed md:relative h-screen bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col transition-all duration-300 z-50
          ${isExpanded ? 'md:w-[260px]' : 'md:w-[80px]'}
          w-[280px] /* Mobile fixed width */
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          shadow-2xl md:shadow-[1px_0_10px_rgba(0,0,0,0.03)]
        `}
      >
        {/* Header */}
        <div className="h-20 flex items-center justify-between px-5">
          <div className="flex items-center gap-3 overflow-hidden w-full">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#b2ebe6] text-[#22b7ab] flex items-center justify-center shrink-0">
              <img src={tourism_app_icon} alt="Tourism App Icon" className="w-10 h-10" />
            </div>
            {isExpanded && (
              <div className="flex flex-col whitespace-nowrap">
                <span className="font-bold text-gray-800 dark:text-white text-base leading-tight">Smart Tourism</span>
                <span className="text-[11px] text-gray-400 font-medium">Technology</span>
              </div>
            )}
          </div>
          
          {/* Desktop Collapse Toggle */}
          {isExpanded && (
            <button
              onClick={() => setIsExpanded(false)}
              className="hidden md:block p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-gray-400 transition-colors shrink-0"
            >
              <ChevronLeft size={18} />
            </button>
          )}

          {/* Mobile Close Toggle */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-gray-400 transition-colors shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Desktop Expand Toggle */}
        {!isExpanded && (
          <div className="hidden md:flex justify-center -mt-2 mb-2">
            <button
              onClick={() => setIsExpanded(true)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-gray-400 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Navigation Areas */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide py-2 px-4 flex flex-col gap-6">
          <div>
            {isExpanded && (
              <h3 className="px-3 text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">
                Overview
              </h3>
            )}
            <div className="flex flex-col">
              {menuItems.map(item => renderNavItem(item))}
            </div>
          </div>

          <div className="mt-2">
            {isExpanded && (
              <h3 className="px-3 text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">
                Account
              </h3>
            )}
            <div className="flex flex-col">
              {accountItems.map(item => renderNavItem(item))}
            </div>
          </div>

          {/* Theme Toggle */}
          <div className={`mt-auto mb-2 flex items-center ${isExpanded ? 'px-4 justify-between' : 'justify-center'}`}>
            {isExpanded && (
              <div className="text-gray-400">
                <Sun size={16} className={!isDarkMode ? "text-yellow-500" : ""} />
              </div>
            )}

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-4' : 'translate-x-1'}`}
              />
            </button>

            {isExpanded && (
              <div className="text-gray-400">
                <Moon size={16} className={isDarkMode ? "text-blue-400" : ""} />
              </div>
            )}
          </div>
        </div>

        {/* User Profile Footer */}
        <div className="p-4 relative border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            onClick={() => setShowProfileMenu((prev) => !prev)}
            className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors w-full text-left ${!isExpanded && 'justify-center'}`}
          >
            <div className="relative shrink-0">
              <img
                src={profile_v2}
                alt="User profile"
                className="w-9 h-9 rounded-full object-cover bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              />
            </div>
            {isExpanded && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-semibold text-gray-800 dark:text-white truncate">BunHeng Ton</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 truncate">bunheng@email.com</span>
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