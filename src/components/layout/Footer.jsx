import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-4 flex-shrink-0">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>© 2026 Smart Tourism</span>
          <span className="bg-gray-200 px-2.5 py-0.5 rounded-full text-xs font-semibold text-gray-700">
            v1.0.0
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-5">
          <a href="/privacy" className="text-sm text-gray-500 hover:text-gray-900 hover:underline transition-colors">
            Privacy Policy
          </a>
          <a href="/terms" className="text-sm text-gray-500 hover:text-gray-900 hover:underline transition-colors">
            Terms of Service
          </a>

          <span className="text-sm text-green-500 font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full inline-block animate-pulse"></span>
            System Online
          </span>

          <a href="/support"
            className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2 shadow-md hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
            <i className="fas fa-headset"></i> Contact Support
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;