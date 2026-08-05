import { Bell, Mail, Smartphone, UserPlus, Star, Calendar, Trash2 } from 'lucide-react';

export default function NotificationTab({ settings, setSettings }) {
  const handleToggle = (field) => {
    setSettings((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const channelToggles = [
    {
      id: 'pushNotifications',
      title: 'Enable Push Notifications',
      desc: 'Receive real-time browser and desktop pop-up alerts.',
      icon: Bell,
      color: 'text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)]'
    },
    {
      id: 'emailNotifications',
      title: 'Enable Email Notifications',
      desc: 'Deliver system alerts and weekly digest reports to contact email.',
      icon: Mail,
      color: 'text-[var(--color-purple-text)] dark:text-[var(--color-purple-dark-text)] bg-[var(--color-purple-bg)] dark:bg-[var(--color-purple-dark-bg)]'
    },
    {
      id: 'smsNotifications',
      title: 'Enable SMS Notifications',
      desc: 'Receive urgent security and critical alert SMS messages on mobile phone.',
      icon: Smartphone,
      color: 'text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)]'
    }
  ];

  const alertToggles = [
    {
      id: 'newUserAlert',
      title: 'New User Alert',
      desc: 'Notify when a new tourist or partner registers an account.',
      icon: UserPlus,
      color: 'text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)]'
    },
    {
      id: 'newReviewAlert',
      title: 'New Review Alert',
      desc: 'Notify when a user submits a review or rating for a destination.',
      icon: Star,
      color: 'text-[var(--color-purple-text)] dark:text-[var(--color-purple-dark-text)] bg-[var(--color-purple-bg)] dark:bg-[var(--color-purple-dark-bg)]'
    },
    {
      id: 'newEventAlert',
      title: 'New Event Alert',
      desc: 'Notify when a new cultural or tourism event is published.',
      icon: Calendar,
      color: 'text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)]'
    },
    {
      id: 'deletionRequestAlert',
      title: 'Deletion Request Alert',
      desc: 'Immediate warning when a user or admin requests data deletion.',
      icon: Trash2,
      color: 'text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] bg-[var(--color-danger-bg)] dark:bg-[var(--color-danger-dark-bg)]'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Section Header */}
      <div>
        <h2 className="text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
          Notification Preferences
        </h2>
        <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
          Manage alert channels and select which event notifications you want to receive.
        </p>
      </div>

      {/* Card 1: Delivery Channels */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] pb-3">
          <Smartphone className="w-4 h-4 text-[var(--color-primary)]" />
          Notification Channels
        </h3>

        <div className="space-y-3">
          {channelToggles.map((item) => {
            const Icon = item.icon;
            const isChecked = !!settings[item.id];
            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2.5 rounded-lg ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] block">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                      {item.desc}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggle(item.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isChecked ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border-subtle-light)] dark:bg-[var(--color-surface-hover-dark)]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-[var(--color-white)] transition-transform ${
                      isChecked ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Card 2: System Event Alerts */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] pb-3">
          <Bell className="w-4 h-4 text-[var(--color-primary)]" />
          Event Alerts & Trigger Rules
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {alertToggles.map((item) => {
            const Icon = item.icon;
            const isChecked = !!settings[item.id];
            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] transition-all"
              >
                <div className="flex items-center space-x-3 pr-2">
                  <div className={`p-2.5 rounded-lg shrink-0 ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] block">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] leading-tight block mt-0.5">
                      {item.desc}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggle(item.id)}
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                    isChecked ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border-subtle-light)] dark:bg-[var(--color-surface-hover-dark)]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-[var(--color-white)] transition-transform ${
                      isChecked ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
