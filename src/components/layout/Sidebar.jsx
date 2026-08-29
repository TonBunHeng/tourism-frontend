import { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import tourism_app_icon from "../../../public/tourism_app_icon.png";
import {
  LayoutGrid, MapPinned, Tags, Images, CalendarDays,
  Star, Heart, Trash2, Settings, LogOut,
  Users, User, X, FileText, ShieldCheck, MessageSquare, ShieldAlert, Bell
} from "lucide-react";
import LogoutAlert from './LogoutAlert';
import { getInitialSidebarStyle, SIDEBAR_STYLE_CHANGE_EVENT } from '../../utils/Theme';

export default function Sidebar({ isOpen, setIsOpen, isExpanded }) {
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();

  // Sidebar appearance style: 'modern' | 'light' | 'brand'
  const [sidebarStyle, setSidebarStyle] = useState(() => getInitialSidebarStyle());

  useEffect(() => {
    const handleStyleChange = (e) => {
      if (e?.detail?.sidebarStyle) {
        setSidebarStyle(e.detail.sidebarStyle);
      } else {
        setSidebarStyle(getInitialSidebarStyle());
      }
    };

    window.addEventListener(SIDEBAR_STYLE_CHANGE_EVENT, handleStyleChange);
    window.addEventListener('storage', handleStyleChange);
    return () => {
      window.removeEventListener(SIDEBAR_STYLE_CHANGE_EVENT, handleStyleChange);
      window.removeEventListener('storage', handleStyleChange);
    };
  }, []);

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
    { name: "Support Chat", icon: MessageSquare, path: "/support" },
    { name: "Ratings & Reviews", icon: Star, path: "/ratings" },
    { name: "Favorites", icon: Heart, path: "/favorites" },
    { name: "Notifications", icon: Bell, path: "/notifications" },
    ...(isPrivileged ? [
      { name: "Reports", icon: FileText, path: "/reports" },
      { name: "Audit Logs", icon: ShieldAlert, path: "/audit-logs" },
      { name: "Security Alerts", icon: ShieldCheck, path: "/security" },
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
  const userAvatar = user?.image || user?.avatar || user?.profile_photo_url || null;

  // Style Variants Config
  const styleVariants = {
    // 1. Modern Dark (Dark background with vibrant accents in both modes)
    modern: {
      aside: "bg-[#111114] border-r border-zinc-800 text-zinc-300",
      header: "border-b border-zinc-800 bg-[#111114]",
      iconBox: "bg-zinc-800/80 border border-zinc-700/80",
      title: "text-white",
      subtitle: "text-zinc-400",
      closeBtn: "text-zinc-400 hover:bg-zinc-800 hover:text-white",
      sectionHead: "text-zinc-500",
      navActive: "bg-blue-600/15 text-blue-400 font-semibold border-l-2 border-blue-500 shadow-xs",
      navInactive: "text-zinc-400 hover:text-white hover:bg-zinc-800/70",
      profileArea: "border-t border-zinc-800 bg-[#111114]",
      profileCardHover: "hover:bg-zinc-800/60",
      profileName: "text-zinc-100",
      profileRole: "text-zinc-400",
      profileAvatarBg: "bg-zinc-800 text-blue-400 border border-zinc-700",
      logoutItem: "text-red-400 hover:bg-red-950/40 hover:text-red-300",
      tooltip: "bg-zinc-950 border border-zinc-800 text-white",
    },
    // 2. Light Clean (Crisp border-separated light sidebar)
    light: {
      aside: "bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-zinc-300",
      header: "border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900",
      iconBox: "bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700",
      title: "text-gray-900 dark:text-zinc-100",
      subtitle: "text-gray-500 dark:text-zinc-400",
      closeBtn: "text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800",
      sectionHead: "text-gray-400 dark:text-zinc-500",
      navActive: "bg-blue-50 text-[#003E83] dark:bg-zinc-800 dark:text-blue-400 font-semibold shadow-xs",
      navInactive: "text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-zinc-200",
      profileArea: "border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900",
      profileCardHover: "hover:bg-gray-100 dark:hover:bg-zinc-800",
      profileName: "text-gray-900 dark:text-zinc-100",
      profileRole: "text-gray-500 dark:text-zinc-400",
      profileAvatarBg: "bg-blue-50 dark:bg-zinc-800 text-blue-700 dark:text-blue-400 border border-gray-200 dark:border-zinc-700",
      logoutItem: "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40",
      tooltip: "bg-zinc-900 dark:bg-zinc-800 text-white",
    },
    // 3. Brand Gradient (Deep Angkor royal blue gradient with glowing accents)
    brand: {
      aside: "bg-gradient-to-b from-[#002754] via-[#001c3d] to-[#00132b] border-r border-blue-900/50 text-white shadow-xl",
      header: "border-b border-blue-900/50 bg-white/5 backdrop-blur-xs",
      iconBox: "bg-white/10 border border-white/20 shadow-xs",
      title: "text-white font-bold",
      subtitle: "text-blue-200/70",
      closeBtn: "text-blue-200 hover:bg-white/10 hover:text-white",
      sectionHead: "text-blue-300/60",
      navActive: "bg-white/15 text-white font-semibold shadow-sm ring-1 ring-white/25 border-l-2 border-cyan-400",
      navInactive: "text-blue-100/75 hover:bg-white/10 hover:text-white",
      profileArea: "border-t border-blue-900/50 bg-[#00132b]/85",
      profileCardHover: "hover:bg-white/10",
      profileName: "text-white",
      profileRole: "text-blue-200/80",
      profileAvatarBg: "bg-white/15 text-cyan-300 border border-white/20",
      logoutItem: "text-red-300 hover:bg-red-500/20 hover:text-red-100",
      tooltip: "bg-[#001f42] border border-blue-700/60 text-white",
    }
  };

  const activeTheme = styleVariants[sidebarStyle] || styleVariants.modern;

  const renderNavItem = (item) => {
    const isActive = item.path && item.path !== '#' && location.pathname.startsWith(item.path);
    const Icon = item.icon;

    if (item.name === "Log out") {
      return (
        <button
          key={item.name}
          type="button"
          onClick={() => setShowLogoutAlert(true)}
          className={`group relative flex items-center w-full px-3 py-1.5 my-0.5 rounded-md cursor-pointer transition-colors duration-150 overflow-hidden ${activeTheme.logoutItem}`}
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
            <div className={`hidden md:block absolute left-full ml-3 px-2.5 py-1 text-xs font-medium rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-md ${activeTheme.tooltip}`}>
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
          ${isActive ? activeTheme.navActive : activeTheme.navInactive}`}
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
          <div className={`hidden md:block absolute left-full ml-3 px-2.5 py-1 text-xs font-medium rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-md ${activeTheme.tooltip}`}>
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
        className={`fixed md:static inset-y-0 left-0 z-40 transition-all duration-200 flex flex-col ${activeTheme.aside} ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          } ${isExpanded ? 'w-56' : 'w-56 md:w-18'}`}
      >
        {/* Brand Header */}
        <div className={`h-16 flex items-center justify-between px-3.5 overflow-hidden shrink-0 transition-colors ${activeTheme.header}`}>
          <div className="flex items-center gap-2.5 w-full min-w-0">
            <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 transition-colors ${activeTheme.iconBox}`}>
              <img src={tourism_app_icon} alt="AngkorVerses" className="w-7 h-7 object-contain" />
            </div>
            <div className={`flex flex-col whitespace-nowrap transition-all duration-200 ${isExpanded ? 'opacity-100 max-w-[160px]' : 'opacity-100 md:opacity-0 md:max-w-0 md:overflow-hidden'}`}>
              <span className={`font-bold text-sm leading-tight ${activeTheme.title}`}>AngkorVerses</span>
              <span className={`text-[10px] font-normal ${activeTheme.subtitle}`}>Admin Portal</span>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className={`md:hidden p-1 rounded transition-colors shrink-0 ${activeTheme.closeBtn}`}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Areas */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 flex flex-col gap-4">
          <div>
            <h3 className={`px-3 text-[10px] font-semibold uppercase tracking-wider transition-colors ${activeTheme.sectionHead} ${isExpanded ? 'opacity-100 mb-1' : 'opacity-100 md:opacity-0 md:h-0 md:overflow-hidden'}`}>
              Management
            </h3>
            <div className="flex flex-col">
              {managementItems.map(item => renderNavItem(item))}
            </div>
          </div>

          <div>
            <h3 className={`px-3 text-[10px] font-semibold uppercase tracking-wider transition-colors ${activeTheme.sectionHead} ${isExpanded ? 'opacity-100 mb-1' : 'opacity-100 md:opacity-0 md:h-0 md:overflow-hidden'}`}>
              Engagement
            </h3>
            <div className="flex flex-col">
              {engagementItems.map(item => renderNavItem(item))}
            </div>
          </div>

          <div>
            <h3 className={`px-3 text-[10px] font-semibold uppercase tracking-wider transition-colors ${activeTheme.sectionHead} ${isExpanded ? 'opacity-100 mb-1' : 'opacity-100 md:opacity-0 md:h-0 md:overflow-hidden'}`}>
              Preferences
            </h3>
            <div className="flex flex-col">
              {accountItems.map(item => renderNavItem(item))}
            </div>
          </div>
        </div>

        {/* Profile Card Section */}
        <div className={`h-14 px-2.5 shrink-0 flex items-center transition-colors ${activeTheme.profileArea}`}>
          <Link
            to="/profile"
            className={`w-full group relative flex items-center gap-2 p-1.5 rounded transition-colors overflow-hidden ${activeTheme.profileCardHover}`}
            aria-label="User Profile"
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden ${activeTheme.profileAvatarBg}`}>
              {userAvatar ? (
                <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
              ) : (
                userName.charAt(0).toUpperCase()
              )}
            </div>
            <div className={`flex flex-col min-w-0 transition-all duration-200 ${isExpanded ? 'opacity-100 max-w-[140px]' : 'opacity-100 md:opacity-0 md:max-w-0 md:overflow-hidden'}`}>
              <span className={`text-xs font-medium truncate ${activeTheme.profileName}`}>
                {userName}
              </span>
              <span className={`text-[10px] truncate ${activeTheme.profileRole}`}>
                {userRole}
              </span>
            </div>

            {!isExpanded && (
              <div className={`hidden md:block absolute left-full ml-3 px-2.5 py-1 text-xs font-medium rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-md ${activeTheme.tooltip}`}>
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
