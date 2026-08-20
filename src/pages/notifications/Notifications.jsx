import { useState, useEffect, useCallback } from 'react';
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
  Info,
  Users,
  RefreshCw,
  Loader2,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAlert } from '../../context/AlertContext';
import notificationService from '../../services/notificationService';

export default function Notifications() {
  const { showConfirm, showSuccess, showError } = useAlert();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const categories = ['All', 'Alerts', 'Reviews', 'Messages', 'Users', 'System'];

  const formatTimeAgo = (dateString) => {
    if (!dateString) return 'Recent';
    try {
      const now = new Date();
      const date = new Date(dateString);
      const diffSec = Math.floor((now - date) / 1000);

      if (diffSec < 60) return 'Just now';
      const diffMin = Math.floor(diffSec / 60);
      if (diffMin < 60) return `${diffMin} min${diffMin > 1 ? 's' : ''} ago`;
      const diffHour = Math.floor(diffMin / 60);
      if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
      const diffDays = Math.floor(diffHour / 24);
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  const getNotificationIcon = (type, category) => {
    const cat = category || '';
    const typ = type || '';

    if (typ === 'deletion_request' || cat === 'Alerts') {
      return {
        icon: UserX,
        iconBg: 'bg-rose-50 dark:bg-rose-950/40',
        iconColor: 'text-rose-600 dark:text-rose-400'
      };
    }
    if (typ === 'review' || cat === 'Reviews') {
      return {
        icon: Star,
        iconBg: 'bg-amber-50 dark:bg-amber-950/40',
        iconColor: 'text-amber-600 dark:text-amber-400'
      };
    }
    if (typ === 'chat' || cat === 'Messages') {
      return {
        icon: MessageCircle,
        iconBg: 'bg-teal-50 dark:bg-teal-950/40',
        iconColor: 'text-teal-600 dark:text-teal-400'
      };
    }
    if (typ === 'user' || cat === 'Users') {
      return {
        icon: Users,
        iconBg: 'bg-indigo-50 dark:bg-indigo-950/40',
        iconColor: 'text-indigo-600 dark:text-indigo-400'
      };
    }
    if (typ === 'event') {
      return {
        icon: Calendar,
        iconBg: 'bg-emerald-50 dark:bg-emerald-950/40',
        iconColor: 'text-emerald-600 dark:text-emerald-400'
      };
    }
    return {
      icon: ShieldAlert,
      iconBg: 'bg-blue-50 dark:bg-blue-950/40',
      iconColor: 'text-blue-600 dark:text-blue-400'
    };
  };

  const fetchNotifications = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const params = {};
      if (filterCategory !== 'All') {
        params.category = filterCategory;
      }
      if (showUnreadOnly) {
        params.unread_only = true;
      }

      const res = await notificationService.getNotifications(params);
      const data = res?.data || res || [];
      const notifs = Array.isArray(data) ? data : (data.data || []);
      setNotifications(notifs);

      // Update unread count from meta or calculate
      if (res?.meta?.unread_count !== undefined) {
        setUnreadCount(res.meta.unread_count);
      } else {
        const unread = notifs.filter(n => !n.read).length;
        setUnreadCount(unread);
      }
    } catch (err) {
      console.error('Failed to load notifications:', err);
      showError('Failed to fetch notifications from the database.', 'Error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [filterCategory, showUnreadOnly]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleMarkAllRead = async () => {
    try {
      await notificationService.markAllRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
      showSuccess('All notifications marked as read.', 'Notifications Updated');
      window.dispatchEvent(new CustomEvent('notifications-updated'));
    } catch (err) {
      console.error('Failed to mark all as read:', err);
      showError('Failed to mark notifications as read.');
    }
  };

  const handleMarkAsRead = async (id, e) => {
    // If clicking directly on a link or button, avoid duplicate click
    if (e?.target?.closest('a')) return;

    try {
      await notificationService.markAsRead(id);
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, read: true } : n))
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
      window.dispatchEvent(new CustomEvent('notifications-updated'));
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  const handleDeleteNotification = async (id, e) => {
    e?.stopPropagation();
    try {
      await notificationService.deleteNotification(id);
      setNotifications(prev => prev.filter(n => n.id !== id));
      setUnreadCount(prev => {
        const item = notifications.find(n => n.id === id);
        return item && !item.read ? Math.max(0, prev - 1) : prev;
      });
      showSuccess('Notification removed.', 'Removed');
      window.dispatchEvent(new CustomEvent('notifications-updated'));
    } catch (err) {
      console.error('Failed to delete notification:', err);
      showError('Failed to delete notification.');
    }
  };

  const handleClearAll = async () => {
    const confirmed = await showConfirm({
      title: 'Clear Notifications',
      message: 'Are you sure you want to clear all notifications? This action cannot be undone.',
      confirmText: 'Clear All',
      type: 'danger'
    });
    if (confirmed) {
      try {
        await notificationService.clearAll();
        setNotifications([]);
        setUnreadCount(0);
        showSuccess('All notifications have been cleared.', 'Notifications Cleared');
        window.dispatchEvent(new CustomEvent('notifications-updated'));
      } catch (err) {
        console.error('Failed to clear notifications:', err);
        showError('Failed to clear notifications from database.');
      }
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
            Real-time updates for deletion requests, tourist reviews, chat messages, and system alerts
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => fetchNotifications(true)}
            disabled={refreshing || loading}
            className="py-2 px-3 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] hover:bg-gray-50 dark:hover:bg-zinc-800 text-xs font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Refresh notifications"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>

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
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filterCategory === cat
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
        {loading ? (
          <div className="p-12 text-center flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-[var(--color-primary)] animate-spin" />
            <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
              Fetching real notifications from database...
            </p>
          </div>
        ) : notifications.length > 0 ? (
          notifications.map((notification) => {
            const { icon: Icon, iconBg, iconColor } = getNotificationIcon(
              notification.type,
              notification.category
            );
            const timeLabel = formatTimeAgo(notification.created_at);

            return (
              <div
                key={notification.id}
                onClick={(e) => handleMarkAsRead(notification.id, e)}
                className={`p-4 md:p-5 flex items-start justify-between gap-4 transition-colors hover:bg-gray-50/80 dark:hover:bg-zinc-800/50 cursor-pointer ${
                  !notification.read ? 'bg-teal-50/30 dark:bg-teal-950/20' : ''
                }`}
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className={`p-2.5 rounded-lg shrink-0 ${iconBg}`}>
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                        {notification.category || 'General'}
                      </span>
                      {!notification.read && (
                        <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse shrink-0" />
                      )}
                      <span className="text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {timeLabel}
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

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => handleDeleteNotification(notification.id, e)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    title="Delete notification"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {notification.link && (
                    <Link
                      to={notification.link}
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="p-1.5 rounded-lg text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:text-[var(--color-primary)] hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                      title="Open details"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  )}
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
              You are all caught up with recent database events!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
