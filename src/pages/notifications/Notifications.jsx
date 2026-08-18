import { useState } from 'react';
import {
  Bell,
  CheckCheck,
  Trash2,
  Filter,
  Star,
  UserX,
  MessageCircle,
  ShieldAlert,
  Clock,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Notifications() {
  const initialNotifications = [
    {
      id: 1,
      title: 'Deletion Request Pending Approval',
      description: 'A user submitted a request to remove item "Draft Sunset Photo" from Gallery.',
      category: 'Alerts',
      time: '10 mins ago',
      read: false,
      icon: UserX,
      iconBg: 'bg-rose-50 dark:bg-rose-950/40',
      iconColor: 'text-rose-600 dark:text-rose-400',
      link: '/deletion-requests'
    },
    {
      id: 2,
      title: 'New 5-Star Review Received',
      description: 'John Doe published a review on "Angkor Wat": "Breathtaking Sunrise Experience!".',
      category: 'Reviews',
      time: '45 mins ago',
      read: false,
      icon: Star,
      iconBg: 'bg-amber-50 dark:bg-amber-950/40',
      iconColor: 'text-amber-600 dark:text-amber-400',
      link: '/ratings'
    },
    {
      id: 3,
      title: 'New Tourist Support Message',
      description: 'Tourist User sent a message regarding travel planning for Siem Reap.',
      category: 'Messages',
      time: '2 hours ago',
      read: false,
      icon: MessageCircle,
      iconBg: 'bg-teal-50 dark:bg-teal-950/40',
      iconColor: 'text-teal-600 dark:text-teal-400',
      link: '/chat'
    },
    {
      id: 4,
      title: 'System Security Verification',
      description: 'Two-Factor Authentication is active across all administrator accounts.',
      category: 'System',
      time: '1 day ago',
      read: true,
      icon: ShieldAlert,
      iconBg: 'bg-blue-50 dark:bg-blue-950/40',
      iconColor: 'text-blue-600 dark:text-blue-400',
      link: '/settings'
    },
    {
      id: 5,
      title: 'Database Cloud Backup Completed',
      description: 'Nightly automated database snapshot created and encrypted successfully.',
      category: 'System',
      time: '2 days ago',
      read: true,
      icon: Info,
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/40',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      link: '/settings'
    }
  ];

  const [notifications, setNotifications] = useState(initialNotifications);
  const [filterCategory, setFilterCategory] = useState('All');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const categories = ['All', 'Alerts', 'Reviews', 'Messages', 'System'];

  const filteredNotifications = notifications.filter(n => {
    const matchesCategory = filterCategory === 'All' || n.category === filterCategory;
    const matchesUnread = !showUnreadOnly || !n.read;
    return matchesCategory && matchesUnread;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleMarkAsRead = (id) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all notifications?')) {
      setNotifications([]);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] tracking-tight">
            Notifications Center
          </h1>
          <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
            Stay updated with deletion requests, tourist reviews, chat messages, and system alerts
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="py-2 px-3.5 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] hover:bg-gray-50 dark:hover:bg-zinc-800 text-xs font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <CheckCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              Mark All Read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="py-2 px-3.5 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 text-xs font-semibold text-red-600 dark:text-red-400 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs Toolbar */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] p-3 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${filterCategory === cat
                ? 'bg-[var(--color-primary)] text-white shadow-xs font-bold'
                : 'text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:bg-gray-100 dark:hover:bg-zinc-800'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <label className="flex items-center gap-2 text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showUnreadOnly}
              onChange={(e) => setShowUnreadOnly(e.target.checked)}
              className="rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] w-3.5 h-3.5"
            />
            Show unread only ({unreadCount})
          </label>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] shadow-sm overflow-hidden divide-y divide-[var(--color-border-subtle-light)] dark:divide-[var(--color-border-dark)]">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div
                key={notification.id}
                onClick={() => handleMarkAsRead(notification.id)}
                className={`p-4 md:p-5 flex items-start justify-between gap-4 transition-colors hover:bg-gray-50/80 dark:hover:bg-zinc-800/50 ${!notification.read ? 'bg-teal-50/30 dark:bg-teal-950/20' : ''
                  }`}
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className={`p-2.5 rounded-lg shrink-0 ${notification.iconBg}`}>
                    <Icon className={`w-5 h-5 ${notification.iconColor}`} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                        {notification.category}
                      </span>
                      {!notification.read && (
                        <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse shrink-0" />
                      )}
                      <span className="text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {notification.time}
                      </span>
                    </div>

                    <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mt-1">
                      {notification.title}
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-0.5 leading-relaxed">
                      {notification.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to={notification.link}
                    className="p-2 rounded-lg text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:text-[var(--color-primary)] hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                    title="Open details"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500 flex items-center justify-center mx-auto mb-3">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
              No notifications found
            </h3>
            <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
              You are all caught up!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
