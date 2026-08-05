import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function Main() {
  const location = useLocation();
  const mainRef = useRef(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const [isExpanded, setIsExpanded] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebar_expanded');
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem('sidebar_expanded', JSON.stringify(isExpanded));
  }, [isExpanded]);

  // Dynamic Page Title
  useEffect(() => {
    const pageTitles = {
      "/": "Login",
      "/dashboard": "Dashboard",
      "/place": "Places",
      "/categories": "Categories",
      "/provinces": "Provinces",
      "/galleries": "Galleries",
      "/events": "Events",
      "/reports": "Reports",
      "/users": "Users",
      "/reviews": "Reviews",
      "/ratings": "Ratings",
      "/favorites": "Favorites",
      "/deletion-requests": "Deletion Requests",
      "/chat": "Chat",
      "/settings": "Settings",
      "/profile": "Profile",
      "/login": "Login",
      "/logout": "Logout",
    };

    document.title = `${pageTitles[location.pathname] || "Smart Tourism"} | Smart Tourism`;
  }, [location.pathname]);

  // Scroll to top when page changes
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#09090b] transition-colors duration-200">
      <Sidebar
        isOpen={isMobileSidebarOpen}
        setIsOpen={setIsMobileSidebarOpen}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />

      <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
        <Header
          toggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          isSidebarOpen={isMobileSidebarOpen}
          isExpanded={isExpanded}
          toggleExpand={() => setIsExpanded(prev => !prev)}
        />

        <main ref={mainRef} className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}