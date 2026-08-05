export default function NotificationsTab({ settings, setSettings }) {
  const notificationItems = [
    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
    { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive push notifications in browser' },
    { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive notifications via SMS' },
    { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Receive promotional emails and updates' },
    { key: 'systemAlerts', label: 'System Alerts', desc: 'Receive critical system alerts' },
    { key: 'userActivity', label: 'User Activity', desc: 'Get notified about user activity' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-4">Notification Settings</h3>
        <div className="space-y-3">
          {notificationItems.map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between gap-4 p-4 bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 rounded-md">
              <div className="min-w-0">
                <p className="font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{label}</p>
                <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">{desc}</p>
              </div>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, [key]: !settings[key] })}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${
                  settings[key] ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border-subtle-light)] dark:bg-[var(--color-border-dark)]'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-[var(--color-white)] transition-transform ${
                    settings[key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
