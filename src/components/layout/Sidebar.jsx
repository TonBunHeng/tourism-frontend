import { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import tourism_app_icon from "../../../public/tourism_app_icon.png";
import {
  LayoutGrid, MapPinned, Tags, Images, CalendarDays,
  Star, Heart, Trash2, Settings, LogOut,
  Users, User, X, FileText, ShieldCheck
} from "lucide-react";
import LogoutAlert from './LogoutAlert';

export default function Sidebar({ isOpen, setIsOpen, isExpanded }) {
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    const handleUserSync = () => {
      try {
        setUser(JSON.parse(localStorage.getItem('user') || '{}'));
      } catch (e) { }
    };

    window.addEventListener('storage', handleUserSync);
    window.addEventListener('user-profile-updated', handleUserSync);
    return () => {
      window.removeEventListener('storage', handleUserSync);
      window.removeEventListener('user-profile-updated', handleUserSync);
    };
  }, []);

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

  const userRole = user?.role || 'Admin';
  const isPrivileged = userRole === 'Super Admin' || userRole === 'Admin';

  // Navigation Items defined per role (UI convenience; protected routes enforce actual authorization)
  const managementItems = [
    { name: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
    { name: "Categories", icon: Tags, path: "/categories" },
    { name: "Places", icon: MapPinned, path: "/place" },
    { name: "Galleries", icon: Images, path: "/galleries" },
    { name: "Events", icon: CalendarDays, path: "/events" },
  ];

  const engagementItems = [
    ...(isPrivileged ? [{ name: "Security", icon: ShieldCheck, path: "/security" }] : []),
    { name: "Favorites", icon: Heart, path: "/favorites" },
    { name: "Ratings & Reviews", icon: Star, path: "/ratings" },
    ...(isPrivileged ? [
      { name: "Reports", icon: FileText, path: "/reports" },
      { name: "Deletion Requests", icon: Trash2, path: "/deletion-requests" },
    ] : []),
  ];

  const accountItems = [
    ...(isPrivileged ? [{ name: "Users", icon: Users, path: "/users" }] : []),
    { name: "Profile", icon: User, path: "/profile" },
    ...(isPrivileged ? [{ name: "Settings", icon: Settings, path: "/settings" }] : []),
    { name: "Log out", icon: LogOut, path: "/logout" },
  ];

  const userName = user?.name || user?.username || "Admin User";
  const userEmail = user?.email || "admin@tourism.gov.kh";
  const userAvatar = user?.image || user?.avatar || user?.profile_photo_url || null;

  const renderNavItem = (item) => {
    const isActive = item.path && item.path !== '#' && location.pathname.startsWith(item.path);
    const Icon = item.icon;

    if (item.name === "Log out") {
      return (
        <button
          key={item.name}
          type="button"
          onClick={() => setShowLogoutAlert(true)}
          className="group relative flex items-center w-full px-3 py-1.5 my-0.5 rounded-md cursor-pointer transition-colors duration-150 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 overflow-hidden"
          aria-label="Log out"
        >
          <div className="flex items-center w-full min-w-0">
            <div className="flex items-center justify-center w-5 h-5 shrink-0">
              <Icon size={18} />
            </div>
            <span className={`text-sm font-medium whitespace-nowrap transition-all duration-200 ${isExpanded ? 'ml-3 opacity-100 max-w-[160px]' : 'opacity-100 md:opacity-0 md:max-w-0 md:overflow-hidden md:ml-0'}`}>
              {item.name}
            </span>
          </div>
          {!isExpanded && (
            <div className="hidden md:block absolute left-full ml-3 px-2.5 py-1 bg-zinc-900 dark:bg-zinc-800 text-white text-xs font-medium rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
              {item.name}
            </div>
          )}
        </button>
      );
    }

    return (
      <Link
        to={item.path || '#'}
        key={item.name}
        className={`group relative flex items-center px-3 py-1.5 my-0.5 rounded-md cursor-pointer transition-colors duration-150 overflow-hidden
          ${isActive
            ? 'bg-blue-50 text-[#003E83] dark:bg-zinc-800 dark:text-blue-400 font-semibold'
            : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-zinc-200'}`}
        aria-label={item.name}
      >
        <div className="flex items-center w-full min-w-0">
          <div className="flex items-center justify-center w-5 h-5 shrink-0">
            <Icon size={18} />
          </div>

          <span className={`text-sm whitespace-nowrap transition-all duration-200 ${isExpanded ? 'ml-3 opacity-100 max-w-[160px]' : 'opacity-100 md:opacity-0 md:max-w-0 md:overflow-hidden md:ml-0'}`}>
            {item.name}
          </span>
        </div>

        {!isExpanded && (
          <div className="hidden md:block absolute left-full ml-3 px-2.5 py-1 bg-zinc-900 dark:bg-zinc-800 text-white text-xs font-medium rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
            {item.name}
          </div>
        )}
      </Link>
    );
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-200 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        ref={sidebarRef}
        className={`fixed md:static inset-y-0 left-0 z-40 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 transition-all duration-200 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          } ${isExpanded ? 'w-56' : 'w-56 md:w-18'}`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-3.5 border-b border-gray-200 dark:border-zinc-800 overflow-hidden shrink-0">
          <div className="flex items-center gap-2.5 w-full min-w-0">
            <div className="w-8 h-8 rounded bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
              <img src={tourism_app_icon} alt="AngkorVerses" className="w-7 h-7 object-contain" />
            </div>
            <div className={`flex flex-col whitespace-nowrap transition-all duration-200 ${isExpanded ? 'opacity-100 max-w-[160px]' : 'opacity-100 md:opacity-0 md:max-w-0 md:overflow-hidden'}`}>
              <span className="font-bold text-gray-900 dark:text-zinc-100 text-sm leading-tight">AngkorVerses</span>
              <span className="text-[10px] text-gray-500 dark:text-zinc-400 font-normal">Admin Portal</span>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="md:hidden p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded text-gray-500 dark:text-zinc-400 transition-colors shrink-0"
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Areas */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 flex flex-col gap-4">
          <div>
            <h3 className={`px-3 text-[10px] font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider ${isExpanded ? 'opacity-100 mb-1' : 'opacity-100 md:opacity-0 md:h-0 md:overflow-hidden'}`}>
              Management
            </h3>
            <div className="flex flex-col">
              {managementItems.map(item => renderNavItem(item))}
            </div>
          </div>

          <div>
            <h3 className={`px-3 text-[10px] font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider ${isExpanded ? 'opacity-100 mb-1' : 'opacity-100 md:opacity-0 md:h-0 md:overflow-hidden'}`}>
              Engagement
            </h3>
            <div className="flex flex-col">
              {engagementItems.map(item => renderNavItem(item))}
            </div>
          </div>

          <div>
            <h3 className={`px-3 text-[10px] font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider ${isExpanded ? 'opacity-100 mb-1' : 'opacity-100 md:opacity-0 md:h-0 md:overflow-hidden'}`}>
              Preferences
            </h3>
            <div className="flex flex-col">
              {accountItems.map(item => renderNavItem(item))}
            </div>
          </div>
        </div>

        {/* Profile Card Section */}
        <div className="h-14 px-2.5 border-t border-gray-200 dark:border-zinc-800 shrink-0 bg-white dark:bg-zinc-900 flex items-center">
          <Link
            to="/profile"
            className="w-full group relative flex items-center gap-2 p-1.5 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors overflow-hidden"
            aria-label="User Profile"
          >
            <div className="w-7 h-7 rounded-full bg-blue-50 dark:bg-zinc-800 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 border border-gray-200 dark:border-zinc-700 overflow-hidden">
              {userAvatar ? (
                <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
              ) : (
                userName.charAt(0).toUpperCase()
              )}
            </div>
            <div className={`flex flex-col min-w-0 transition-all duration-200 ${isExpanded ? 'opacity-100 max-w-[140px]' : 'opacity-100 md:opacity-0 md:max-w-0 md:overflow-hidden'}`}>
              <span className="text-xs font-medium text-gray-900 dark:text-zinc-100 truncate">
                {userName}
              </span>
              <span className="text-[10px] text-gray-500 dark:text-zinc-400 truncate">
                {userRole}
              </span>
            </div>

            {!isExpanded && (
              <div className="hidden md:block absolute left-full ml-3 px-2.5 py-1 bg-zinc-900 dark:bg-zinc-800 text-white text-xs font-medium rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                {userName} ({userRole})
              </div>
            )}
          </Link>
        </div>

      </aside>

      <LogoutAlert
        isOpen={showLogoutAlert}
        onClose={() => setShowLogoutAlert(false)}
        onLogout={() => {}}
      />
    </>
  );
}
