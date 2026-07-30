import { Sun, Moon, Monitor } from 'lucide-react';
import { applyTheme } from '../../utils/Theme';

export default function AppearanceTab({ settings, setSettings }) {
  const handleThemeChange = (newTheme) => {
    setSettings({ ...settings, theme: newTheme });
    applyTheme(newTheme);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Theme</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleThemeChange('light')}
                className={`flex-1 p-3 border-2 rounded-xl text-center transition-all cursor-pointer ${
                  settings.theme === 'light' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Sun className="w-5 h-5 mx-auto mb-1 text-gray-700 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Light</span>
              </button>
              <button
                type="button"
                onClick={() => handleThemeChange('dark')}
                className={`flex-1 p-3 border-2 rounded-xl text-center transition-all cursor-pointer ${
                  settings.theme === 'dark' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Moon className="w-5 h-5 mx-auto mb-1 text-gray-700 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark</span>
              </button>
              <button
                type="button"
                onClick={() => handleThemeChange('system')}
                className={`flex-1 p-3 border-2 rounded-xl text-center transition-all cursor-pointer ${
                  settings.theme === 'system' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Monitor className="w-5 h-5 mx-auto mb-1 text-gray-700 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">System</span>
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Primary Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={settings.primaryColor}
                onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                className="w-12 h-12 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer flex-shrink-0"
              />
              <input
                type="text"
                value={settings.primaryColor}
                onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                className="flex-1 min-w-0 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Secondary Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={settings.secondaryColor}
                onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                className="w-12 h-12 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer flex-shrink-0"
              />
              <input
                type="text"
                value={settings.secondaryColor}
                onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                className="flex-1 min-w-0 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Font Family</label>
            <select
              value={settings.fontFamily}
              onChange={(e) => setSettings({ ...settings, fontFamily: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option>Inter</option>
              <option>Roboto</option>
              <option>Open Sans</option>
              <option>Poppins</option>
              <option>System Default</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
