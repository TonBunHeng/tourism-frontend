import React from 'react';
import { Bell, Mail, Smartphone, UserPlus, Star, Calendar, Trash2 } from 'lucide-react';

export default function NotificationTab({ settings, setSettings }) {
  const handleToggle = (field) => {
    setSettings((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const channelSettings = [
    {
      id: 'pushNotifications',
      label: 'Browser Push Notifications',
      description: 'Receive real-time popup alerts directly in your web browser.',
      icon: Smartphone
    },
    {
      id: 'emailNotifications',
      label: 'Email Notifications',
      description: 'Send daily or instant email summaries for system events.',
      icon: Mail
    }
  ];

  const alertSettings = [
    {
      id: 'newUserAlert',
      label: 'New User Registration Alert',
      description: 'Notify administrators when a new tourist or partner account signs up.',
      icon: UserPlus
    },
    {
      id: 'newReviewAlert',
      label: 'New Review Alert',
      description: 'Get notified whenever a user submits a review for a tourist attraction.',
      icon: Star
    },
    {
      id: 'newEventAlert',
      label: 'New Event Submission Alert',
      description: 'Alert when a festival or community event is submitted for moderation.',
      icon: Calendar
    },
    {
      id: 'deletionRequestAlert',
      label: 'Deletion Request Alert',
      description: 'Urgent notifications when users submit GDPR or account deletion requests.',
      icon: Trash2
    }
  ];

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      <div>
        <h2 className="text-base md:text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)]">
          Notification Settings
        </h2>
        <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
          Configure notification channels and select which event triggers send alerts.
        </p>
      </div>

      {/* Notification Channels Card */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-xl p-4 md:p-5 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] shadow-xs space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)] dark:text-[var(--color-brand-teal)] flex items-center gap-1.5">
          <Bell className="w-3.5 h-3.5" /> Notification Channels
        </h3>

        <div className="divide-y divide-[var(--color-border-subtle-light)] dark:divide-[var(--color-border-dark)]">
          {channelSettings.map((channel) => {
            const Icon = channel.icon;
            const isEnabled = !!settings[channel.id];

            return (
              <div
                key={channel.id}
                className="flex items-center justify-between py-3 first:pt-1 last:pb-1"
              >
                <div className="flex items-start gap-3 pr-3">
                  <div className="p-2 rounded-lg bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs md:text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)]">
                      {channel.label}
                    </h4>
                    <p className="text-[11px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-0.5 leading-relaxed">
                      {channel.description}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggle(channel.id)}
                  className={`relative inline-flex h-5 w-10 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none cursor-pointer ${
                    isEnabled ? 'bg-[var(--color-primary)]' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-[var(--color-white)] transition-transform ${
                      isEnabled ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* System Event Trigger Alerts Card */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-xl p-4 md:p-5 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] shadow-xs space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)] dark:text-[var(--color-brand-teal)] flex items-center gap-1.5">
          <Bell className="w-3.5 h-3.5" /> System Event Triggers
        </h3>

        <div className="divide-y divide-[var(--color-border-subtle-light)] dark:divide-[var(--color-border-dark)]">
          {alertSettings.map((alert) => {
            const Icon = alert.icon;
            const isEnabled = settings[alert.id] !== false;

            return (
              <div
                key={alert.id}
                className="flex items-center justify-between py-3 first:pt-1 last:pb-1"
              >
                <div className="flex items-start gap-3 pr-3">
                  <div className="p-2 rounded-lg bg-[var(--color-neutral-badge-bg)] dark:bg-[var(--color-neutral-badge-dark-bg)] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs md:text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)]">
                      {alert.label}
                    </h4>
                    <p className="text-[11px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-0.5 leading-relaxed">
                      {alert.description}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggle(alert.id)}
                  className={`relative inline-flex h-5 w-10 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none cursor-pointer ${
                    isEnabled ? 'bg-[var(--color-primary)]' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-[var(--color-white)] transition-transform ${
                      isEnabled ? 'translate-x-5' : 'translate-x-1'
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
