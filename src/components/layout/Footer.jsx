import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 px-4 sm:px-6 py-4 flex-shrink-0 transition-colors duration-200">
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-between text-center sm:text-left">

        {/* Left section: Copyright & Version */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-zinc-400">
          <span>© {currentYear} Smart Tourism</span>
          <span className="bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold text-gray-700 dark:text-zinc-300">
            v1.5
          </span>
        </div>

        {/* Right section: Links, Status & Support Button */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
          <Link
            to="/privacy"
            className="text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100 hover:underline transition-colors"
          >
            Privacy Policy
          </Link>

          <span className="text-gray-300 dark:text-zinc-700 hidden sm:inline">•</span>

          <Link
            to="/terms"
            className="text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100 hover:underline transition-colors"
          >
            Terms of Service
          </Link>

          <span className="text-emerald-500 dark:text-emerald-400 font-medium flex items-center gap-1.5 mx-1">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full inline-block animate-pulse"></span>
            <span>System Online</span>
          </span>

          <Link
            to="/support"
            className="bg-blue-600 dark:bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200"
          >
            Contact Support
          </Link>
        </div>

      </div>
    </footer>
  );
}