import { Eye, EyeOff } from 'lucide-react';

export default function ApiTab({ settings, setSettings, showPassword, setShowPassword }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-4">API Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">API Key</label>
            <div className="flex items-center gap-2">
              <input
                type={showPassword ? 'text' : 'password'}
                value={settings.apiKey}
                onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
                className="flex-1 min-w-0 px-4 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 flex-shrink-0 hover:bg-[var(--color-neutral-badge-bg)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-lg transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5 text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]" /> : <Eye className="w-5 h-5 text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">API Version</label>
            <select
              value={settings.apiVersion}
              onChange={(e) => setSettings({ ...settings, apiVersion: e.target.value })}
              className="w-full px-4 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]"
            >
              <option value="v1">v1</option>
              <option value="v2">v2</option>
              <option value="v3">v3</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Rate Limit (requests/hour)</label>
            <input
              type="number"
              value={settings.rateLimit}
              onChange={(e) => setSettings({ ...settings, rateLimit: e.target.value })}
              className="w-full px-4 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Webhook URL</label>
            <input
              type="url"
              value={settings.webhookUrl}
              onChange={(e) => setSettings({ ...settings, webhookUrl: e.target.value })}
              className="w-full px-4 py-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
