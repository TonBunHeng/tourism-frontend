import { useState, useRef, useEffect } from 'react';
import profile_v2 from "../assets/profile_v2.png";
import tourism_app_icon from "/public/tourism_app_icon.png";
import {
  LayoutGrid, MapPinned, Tags, Map, Images, CalendarDays, MessageSquareText,
  Star, Heart, MessageCircle, Settings, LogOut, ChevronRight, Grip, ChevronLeft,
  Sun, Moon, Folder, Clock
} from "lucide-react";


export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeItem = "";

  const menuItems = [
    { name: "Dashboard", icon: LayoutGrid, hasSubmenu: true },
    { name: "Places", icon: MapPinned, hasSubmenu: true },
    { name: "Categories", icon: Tags, hasSubmenu: true },
    { name: "Provinces", icon: Map, hasSubmenu: true },
    { name: "Gallery", icon: Images, hasSubmenu: true },
    { name: "Events", icon: CalendarDays, hasSubmenu: true },
    { name: "Reviews", icon: MessageSquareText, hasSubmenu: true },
    { name: "Ratings", icon: Star, hasSubmenu: true },
    { name: "Favorites", icon: Heart, hasSubmenu: true },
  ];

  const accountItems = [
    { name: "Chat", icon: MessageCircle },
    { name: "Settings", icon: Settings },
    { name: "Log out", icon: LogOut },
  ];

  const renderNavItem = (item) => {
    const isActive = activeItem === item.name;
    const Icon = item.icon;

    return (
      <div
        key={item.name}
        className={`group relative flex items-center px-3 py-2.5 my-0.5 rounded-xl cursor-pointer transition-colors duration-200`}
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

        {/* Tooltip for collapsed state */}
        {!isExpanded && (
          <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-800 text-white text-xs font-medium rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
            {item.name}
            {/* Triangle for tooltip */}
            <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-gray-800"></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={`relative h-screen bg-white flex flex-col transition-all duration-300 ${isExpanded ? 'w-[260px]' : 'w-[80px]'
        }`}
      style={{
        boxShadow: "1px 0 10px rgba(0,0,0,0.03)"
      }}
    >
      {/* Header */}
      <div className="h-20 flex items-center justify-between px-5">
        <div className="flex items-center gap-3 overflow-hidden w-full">
          <div className="w-10 h-10 rounded-xl bg-white border border-[#b2ebe6] text-[#22b7ab] flex items-center justify-center shrink-0">
            <img src={tourism_app_icon} alt="Tourism App Icon" className="w-10 h-10" />
          </div>
          {isExpanded && (
            <div className="flex flex-col whitespace-nowrap">
              <span className="font-bold text-gray-800 text-base leading-tight">Smart Tourism</span>
              <span className="text-[11px] text-gray-400 font-medium">Technology</span>
            </div>
          )}
        </div>
        {isExpanded && (
          <button
            onClick={() => setIsExpanded(false)}
            className="p-1 hover:bg-gray-100 rounded-md text-gray-400 transition-colors shrink-0"
          >
            <ChevronLeft size={18} />
          </button>
        )}
      </div>

      {/* When collapsed, a way to expand from header area */}
      {
        !isExpanded && (
          <div className="flex justify-center -mt-2 mb-2">
            <button
              onClick={() => setIsExpanded(true)}
              className="p-1 hover:bg-gray-100 rounded-md text-gray-400 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )
      }

      {/* Navigation Areas */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide py-2 px-4 flex flex-col gap-6">

        {/* Overview Section */}
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

        {/* Account Section */}
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
              <Sun size={16} className={!isDarkMode ? "text-gray-600" : ""} />
            </div>
          )}

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${isDarkMode ? 'bg-gray-300' : 'bg-gray-200'
              }`}
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-4' : 'translate-x-1'
                }`}
            />
          </button>

          {isExpanded && (
            <div className="text-gray-400">
              <Moon size={16} className={isDarkMode ? "text-gray-600" : ""} />
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="px-4">
        <div className="h-px bg-gray-100 w-full"></div>
      </div>

      {/* User Profile Footer */}
      <div className="p-4 relative">
        <div
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors ${!isExpanded && 'justify-center'}`}
        >
          <div className="relative shrink-0">
            <img
              src={profile_v2}
              alt="User profile"
              className="w-9 h-9 rounded-full object-cover bg-gray-100 border border-gray-200"
            />
          </div>
          {isExpanded && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold text-gray-800 truncate">BunHeng Ton</span>
              <span className="text-xs text-gray-500 truncate">[EMAIL_ADDRESS]</span>
            </div>
          )}
        </div>

        {/* Profile Dropdown Menu */}
        {showProfileMenu && (
          <div
            ref={menuRef}
            className={`absolute bottom-full mb-2 ${isExpanded ? 'left-6 ml-2' : 'left-full ml-4'} w-[240px] bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden z-50`}
          >
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <img
                src={profile_v2}
                alt="User profile"
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-800">BunHeng Ton</span>
                <span className="text-xs text-gray-500">[EMAIL_ADDRESS]</span>
              </div>
            </div>

            <div className="p-2 flex flex-col gap-0.5">
              <button className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 font-medium hover:bg-gray-50 rounded-xl transition-colors">
                <Folder size={18} className="text-gray-400" />
                Integrations
              </button>
              <button className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 font-medium hover:bg-gray-50 rounded-xl transition-colors">
                <Clock size={18} className="text-gray-400" />
                History
              </button>
              <button className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 font-medium hover:bg-gray-50 rounded-xl transition-colors">
                <Star size={18} className="text-gray-400" />
                Update to Pro
              </button>
            </div>

            <div className="px-5 py-3 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-400">
              <span className="font-semibold text-gray-300">v2.0</span>
              <span>Terms & Conditions</span>
            </div>
          </div>
        )}     
      </div>
    </aside >
  );
}
