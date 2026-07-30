import { useState, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { getInitialTheme, applyTheme } from '../../utils/Theme';

export default function PreferencesTab() {
  const [currentTheme, setCurrentTheme] = useState(() => getInitialTheme());

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId);
    applyTheme(themeId);
  };

  useEffect(() => {
    setCurrentTheme(getInitialTheme());
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Theme Preferences</h3>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {[
            { id: 'light', label: 'Light', icon: Sun },
            { id: 'dark', label: 'Dark', icon: Moon },
            { id: 'system', label: 'System', icon: Monitor }
          ].map((theme) => {
            const Icon = theme.icon;
            const isSelected = currentTheme === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => handleThemeChange(theme.id)}
                className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-center cursor-pointer ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`} />
                <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">{theme.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Notification Preferences</h3>
        <div className="space-y-3">
          {[
            { id: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
            { id: 'push', label: 'Push Notifications', desc: 'Receive notifications in browser' },
            { id: 'sms', label: 'SMS Notifications', desc: 'Receive updates via SMS' }
          ].map((pref) => (
            <div key={pref.id} className="flex items-center justify-between gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="min-w-0">
                <p className="font-medium text-gray-900 dark:text-white">{pref.label}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{pref.desc}</p>
              </div>
              <button type="button" className="relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full bg-blue-600 transition-colors">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Language & Region</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Language</label>
            <select className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option>English</option>
              <option>Khmer</option>
              <option>French</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Timezone</label>
            <select className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option>Asia/Phnom_Penh</option>
              <option>Asia/Bangkok</option>
              <option>UTC</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
