export default function SecurityTab({ settings, setSettings }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-4">Security Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 p-4 bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 rounded-xl">
            <div className="min-w-0">
              <p className="font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">Two-Factor Authentication</p>
              <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Require 2FA for all admin accounts</p>
            </div>
            <button
              type="button"
              onClick={() => setSettings({ ...settings, twoFactorAuth: !settings.twoFactorAuth })}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${
                settings.twoFactorAuth ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border-subtle-light)] dark:bg-[var(--color-border-dark)]'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-[var(--color-white)] transition-transform ${
                  settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Session Timeout (minutes)</label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}
                className="w-full px-4 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Password Policy</label>
              <select
                value={settings.passwordPolicy}
                onChange={(e) => setSettings({ ...settings, passwordPolicy: e.target.value })}
                className="w-full px-4 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]"
              >
                <option value="weak">Weak</option>
                <option value="medium">Medium</option>
                <option value="strong">Strong</option>
                <option value="very_strong">Very Strong</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Max Login Attempts</label>
              <input
                type="number"
                value={settings.loginAttempts}
                onChange={(e) => setSettings({ ...settings, loginAttempts: e.target.value })}
                className="w-full px-4 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">IP Whitelist</label>
              <input
                type="text"
                value={settings.ipWhitelist.join(', ')}
                onChange={(e) => setSettings({ ...settings, ipWhitelist: e.target.value.split(',').map(s => s.trim()) })}
                placeholder="192.168.1.1, 10.0.0.1"
                className="w-full px-4 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
