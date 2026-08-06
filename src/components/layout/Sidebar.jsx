import { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import profile_v2 from "../../assets/images/profile_v2.png";
import tourism_app_icon from "../../assets/images/tourism_app_icon.png";
import {
  LayoutGrid, MapPinned, Tags, Map, Images, CalendarDays, MessageSquareText,
  Star, Heart, Trash2, MessageCircle, Settings, LogOut, ChevronRight, ChevronLeft,
  Users, User, X, FileText
} from "lucide-react";
import LogoutAlert from './LogoutAlert';

export default function Sidebar({ isOpen, setIsOpen, isExpanded, setIsExpanded }) {
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();

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
    setIsOpen(false);
  }, [location.pathname, setIsOpen]);

  const managementItems = [
    { name: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
    { name: "Categories", icon: Tags, path: "/categories" },
    { name: "Places", icon: MapPinned, path: "/place" },
    { name: "Provinces", icon: Map, path: "/provinces" },
    { name: "Galleries", icon: Images, path: "/galleries" },
    { name: "Events", icon: CalendarDays, path: "/events" },

  ];

  const engagementItems = [
    { name: "Users", icon: Users, path: "/users" },
    { name: "Favorites", icon: Heart, path: "/favorites" },
    { name: "Ratings & Reviews", icon: Star, path: "/ratings" },
    { name: "Reports", icon: FileText, path: "/reports" },
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
          className="group relative flex items-center w-full px-4 py-2.5 my-0.5 rounded-md cursor-pointer transition-colors duration-200 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] overflow-hidden"
        >
          <div className="flex items-center w-full min-w-0">
            <div className="flex items-center justify-center w-6 h-6 shrink-0">
              <Icon size={20} strokeWidth={2} className="text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)]" />
            </div>
            <span className={`text-sm font-medium whitespace-nowrap text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] transition-all duration-300 ease-in-out ${isExpanded ? 'ml-3 opacity-100 max-w-[200px] translate-x-0' : 'opacity-100 md:opacity-0 md:max-w-0 md:overflow-hidden md:ml-0 md:-translate-x-3 md:pointer-events-none'}`}>
              {item.name}
            </span>
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
        className={`group relative flex items-center px-4 py-2.5 my-0.5 rounded-md cursor-pointer transition-colors duration-200 overflow-hidden
          ${isActive
            ? 'bg-[var(--color-info-bg)] text-[var(--color-info-text)] dark:bg-[var(--color-info-dark-bg)] dark:text-[var(--color-info-dark-text)] font-semibold'
            : 'text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)]'}`}
      >
        <div className="flex items-center w-full min-w-0">
          <div className="flex items-center justify-center w-6 h-6 shrink-0">
            <Icon size={20} strokeWidth={2} />
          </div>

          <span className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ease-in-out ${isExpanded ? 'ml-3 opacity-100 max-w-[200px] translate-x-0' : 'opacity-100 md:opacity-0 md:max-w-0 md:overflow-hidden md:ml-0 md:-translate-x-3 md:pointer-events-none'}`}>
            {item.name}
          </span>
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
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        ref={sidebarRef}
        className={`fixed md:static inset-y-0 left-0 z-40 bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] border-r border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] transition-all duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          } ${isExpanded ? 'w-64' : 'w-64 md:w-20'}`}
      >
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-between px-4 overflow-hidden">
          <div className="flex items-center gap-3 w-full min-w-0">
            <div
              className="w-10 h-10 rounded-md bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-info-border)] dark:border-[var(--color-info-dark-border)] text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] flex items-center justify-center shrink-0"
            >
              <img src={tourism_app_icon} alt="Tourism App Icon" className="w-10 h-10" />
            </div>
            <div className={`flex flex-col whitespace-nowrap transition-all duration-300 ease-in-out ${isExpanded ? 'opacity-100 max-w-[200px] translate-x-0' : 'opacity-100 md:opacity-0 md:max-w-0 md:overflow-hidden md:-translate-x-3 md:pointer-events-none'}`}>
              <span className="font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)] text-base leading-tight">Smart Tourism</span>
              <span className="text-[11px] text-[var(--color-text-muted-light)] dark:text-[var(--color-text-muted-dark)] font-medium">Technology</span>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-1 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-md text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] transition-colors shrink-0"
          >
            <X size={18} />
          </button>
        </div>


        {/* Navigation Areas */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide py-2 px-3 flex flex-col gap-6">
          <div>
            <h3 className={`px-3 text-[10px] font-bold text-[var(--color-text-muted-light)] dark:text-[var(--color-text-muted-dark)] uppercase tracking-widest transition-all duration-300 ease-in-out ${isExpanded ? 'opacity-100 mb-2 max-h-6' : 'opacity-100 md:opacity-0 md:max-h-0 md:mb-0 md:overflow-hidden'}`}>
              Management
            </h3>
            <div className="flex flex-col">
              {managementItems.map(item => renderNavItem(item))}
            </div>
          </div>

          <div>
            <h3 className={`px-3 text-[10px] font-bold text-[var(--color-text-muted-light)] dark:text-[var(--color-text-muted-dark)] uppercase tracking-widest transition-all duration-300 ease-in-out ${isExpanded ? 'opacity-100 mb-2 max-h-6' : 'opacity-100 md:opacity-0 md:max-h-0 md:mb-0 md:overflow-hidden'}`}>
              Engagement
            </h3>
            <div className="flex flex-col">
              {engagementItems.map(item => renderNavItem(item))}
            </div>
          </div>

          <div>
            <h3 className={`px-3 text-[10px] font-bold text-[var(--color-text-muted-light)] dark:text-[var(--color-text-muted-dark)] uppercase tracking-widest transition-all duration-300 ease-in-out ${isExpanded ? 'opacity-100 mb-2 max-h-6' : 'opacity-100 md:opacity-0 md:max-h-0 md:mb-0 md:overflow-hidden'}`}>
              Preferences
            </h3>
            <div className="flex flex-col">
              {accountItems.map(item => renderNavItem(item))}
            </div>
          </div>
        </div>

        {/* User Profile Footer */}
        <div
          className="p-1 relative border-t border-[var(--color-sidebar-border)] dark:border-[var(--color-sidebar-dark-border)] overflow-hidden">
          <div className="flex items-center gap-3 p-2 rounded-md transition-all duration-300 ease-in-out w-full text-left">
            <div className="relative shrink-0">
              <img
                src={profile_v2}
                alt="User profile"
                className="w-9 h-9 rounded-full object-cover bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]" />
            </div>
            <div className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'opacity-100 max-w-[200px] translate-x-0' : 'opacity-100 md:opacity-0 md:max-w-0 md:overflow-hidden md:-translate-x-3 md:pointer-events-none'}`}>
              <span className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)] truncate">BunHeng Ton</span>
              <span className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] truncate">bunheng@email.com</span>
            </div>
          </div>
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