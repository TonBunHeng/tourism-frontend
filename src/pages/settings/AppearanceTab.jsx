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
        <h3 className="text-lg font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-4">Appearance Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Theme</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleThemeChange('light')}
                className={`flex-1 p-3 border-2 rounded-xl text-center transition-all cursor-pointer ${
                  settings.theme === 'light' ? 'border-[var(--color-primary)] bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)]' : 'border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] hover:border-[var(--color-border-dark)] dark:hover:border-[var(--color-text-secondary-dark)]'
                }`}
              >
                <Sun className="w-5 h-5 mx-auto mb-1 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
                <span className="text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Light</span>
              </button>
              <button
                type="button"
                onClick={() => handleThemeChange('dark')}
                className={`flex-1 p-3 border-2 rounded-xl text-center transition-all cursor-pointer ${
                  settings.theme === 'dark' ? 'border-[var(--color-primary)] bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)]' : 'border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] hover:border-[var(--color-border-dark)] dark:hover:border-[var(--color-text-secondary-dark)]'
                }`}
              >
                <Moon className="w-5 h-5 mx-auto mb-1 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
                <span className="text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Dark</span>
              </button>
              <button
                type="button"
                onClick={() => handleThemeChange('system')}
                className={`flex-1 p-3 border-2 rounded-xl text-center transition-all cursor-pointer ${
                  settings.theme === 'system' ? 'border-[var(--color-primary)] bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)]' : 'border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] hover:border-[var(--color-border-dark)] dark:hover:border-[var(--color-text-secondary-dark)]'
                }`}
              >
                <Monitor className="w-5 h-5 mx-auto mb-1 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
                <span className="text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">System</span>
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Primary Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={settings.primaryColor}
                onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                className="w-12 h-12 rounded-xl border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] cursor-pointer flex-shrink-0"
              />
              <input
                type="text"
                value={settings.primaryColor}
                onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                className="flex-1 min-w-0 px-4 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Secondary Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={settings.secondaryColor}
                onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                className="w-12 h-12 rounded-xl border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] cursor-pointer flex-shrink-0"
              />
              <input
                type="text"
                value={settings.secondaryColor}
                onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                className="flex-1 min-w-0 px-4 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Font Family</label>
            <select
              value={settings.fontFamily}
              onChange={(e) => setSettings({ ...settings, fontFamily: e.target.value })}
              className="w-full px-4 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]"
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
