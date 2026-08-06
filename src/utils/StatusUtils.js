import React from 'react';
import { Star, Video, Image } from 'lucide-react';

export const getStatusColor = (status) => {
  return status === "Active"
    ? "bg-[var(--color-success-bg)] text-[var(--color-success-text)] border-[var(--color-success-border)] dark:bg-[var(--color-success-dark-bg)] dark:text-[var(--color-success-dark-text)] dark:border-[var(--color-success-dark-border)]"
    : "bg-[var(--color-neutral-badge-bg)] text-[var(--color-neutral-badge-text)] border-[var(--color-border-subtle-light)] dark:bg-[var(--color-neutral-badge-dark-bg)] dark:text-[var(--color-neutral-badge-dark-text)] dark:border-[var(--color-border-dark)]";
};

export const getEventStatusColor = (status) => {
  const colors = {
    'Upcoming': 'bg-[var(--color-info-bg)] text-[var(--color-info-text)] border-[var(--color-info-border)] dark:bg-[var(--color-info-dark-bg)] dark:text-[var(--color-info-dark-text)] dark:border-[var(--color-info-dark-border)]',
    'Ongoing': 'bg-[var(--color-success-bg)] text-[var(--color-success-text)] border-[var(--color-success-border)] dark:bg-[var(--color-success-dark-bg)] dark:text-[var(--color-success-dark-text)] dark:border-[var(--color-success-dark-border)]',
    'Completed': 'bg-[var(--color-neutral-badge-bg)] text-[var(--color-neutral-badge-text)] border-[var(--color-border-subtle-light)] dark:bg-[var(--color-neutral-badge-dark-bg)] dark:text-[var(--color-neutral-badge-dark-text)] dark:border-[var(--color-border-dark)]',
    'Cancelled': 'bg-[var(--color-danger-bg)] text-[var(--color-danger-text)] border-[var(--color-danger-border)] dark:bg-[var(--color-danger-dark-bg)] dark:text-[var(--color-danger-dark-text)] dark:border-[var(--color-danger-dark-border)]'
  };
  return colors[status] || colors['Upcoming'];
};

export const getTypeBadgeColor = (type) => {
  const colors = {
    'Capital City': 'bg-[var(--color-purple-badge-bg)] text-[var(--color-purple-badge-text)] border-[var(--color-purple-badge-border)] dark:bg-[var(--color-purple-badge-dark-bg)] dark:text-[var(--color-purple-badge-dark-text)] dark:border-[var(--color-purple-badge-dark-border)]',
    'Province': 'bg-[var(--color-info-bg)] text-[var(--color-info-text)] border-[var(--color-info-border)] dark:bg-[var(--color-info-dark-bg)] dark:text-[var(--color-info-dark-text)] dark:border-[var(--color-info-dark-border)]',
    'Municipality': 'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)] border-[var(--color-warning-border)] dark:bg-[var(--color-warning-dark-bg)] dark:text-[var(--color-warning-dark-text)] dark:border-[var(--color-warning-dark-border)]'
  };
  return colors[type] || 'bg-[var(--color-neutral-badge-bg)] text-[var(--color-neutral-badge-text)] border-[var(--color-border-subtle-light)] dark:bg-[var(--color-neutral-badge-dark-bg)] dark:text-[var(--color-neutral-badge-dark-text)] dark:border-[var(--color-border-dark)]';
};

export const getCategoryColor = (category) => {
  const colors = {
    'Sports': 'bg-[var(--color-info-bg)] text-[var(--color-info-text)] border-[var(--color-info-border)] dark:bg-[var(--color-info-dark-bg)] dark:text-[var(--color-info-dark-text)] dark:border-[var(--color-info-dark-border)]',
    'Cultural': 'bg-[var(--color-purple-badge-bg)] text-[var(--color-purple-badge-text)] border-[var(--color-purple-badge-border)] dark:bg-[var(--color-purple-badge-dark-bg)] dark:text-[var(--color-purple-badge-dark-text)] dark:border-[var(--color-purple-badge-dark-border)]',
    'Arts & Entertainment': 'bg-[var(--color-rose-badge-bg)] text-[var(--color-rose-badge-text)] border-[var(--color-rose-badge-border)] dark:bg-[var(--color-rose-badge-dark-bg)] dark:text-[var(--color-rose-badge-dark-text)] dark:border-[var(--color-rose-badge-dark-border)]',
    'Food & Drink': 'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)] border-[var(--color-warning-border)] dark:bg-[var(--color-warning-dark-bg)] dark:text-[var(--color-warning-dark-text)] dark:border-[var(--color-warning-dark-border)]',
    'Music': 'bg-[var(--color-rose-badge-bg)] text-[var(--color-rose-badge-text)] border-[var(--color-rose-badge-border)] dark:bg-[var(--color-rose-badge-dark-bg)] dark:text-[var(--color-rose-badge-dark-text)] dark:border-[var(--color-rose-badge-dark-border)]'
  };
  return colors[category] || 'bg-[var(--color-neutral-badge-bg)] text-[var(--color-neutral-badge-text)] border-[var(--color-border-subtle-light)] dark:bg-[var(--color-neutral-badge-dark-bg)] dark:text-[var(--color-neutral-badge-dark-text)] dark:border-[var(--color-border-dark)]';
};

export const getChatStatusColor = (status) => {
  const colors = {
    online: 'bg-emerald-500',
    away: 'bg-[var(--color-warning-text)]',
    offline: 'bg-[var(--color-text-muted-light)]'
  };
  return colors[status] || colors.offline;
};

export const getPriorityBadge = (priority) => {
  const colors = {
    critical: 'bg-[var(--color-danger-bg)] text-[var(--color-danger-text)] border-[var(--color-danger-border)]',
    high: 'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)] border-[var(--color-warning-border)]',
    medium: 'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)] border-[var(--color-warning-border)]',
    low: 'bg-[var(--color-info-bg)] text-[var(--color-info-text)] border-[var(--color-info-border)]'
  };
  return colors[priority] || colors.low;
};

export const renderStars = (rating, size = 'sm') => {
  const starSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  return React.createElement(
    'div',
    { className: 'flex gap-0.5' },
    [...Array(5)].map((_, i) =>
      React.createElement(Star, {
        key: i,
        className: `${i < rating ? 'fill-[var(--color-warning-text)] text-[var(--color-warning-text)]' : 'text-[var(--color-border-subtle-light)] dark:text-[var(--color-border-dark)]'} ${starSize}`
      })
    )
  );
};

export const getUserStatusColor = (status) => {
  const colors = {
    'Active': 'bg-[var(--color-success-bg)] text-[var(--color-success-text)] border-[var(--color-success-border)] dark:bg-[var(--color-success-dark-bg)] dark:text-[var(--color-success-dark-text)] dark:border-[var(--color-success-dark-border)]',
    'Inactive': 'bg-[var(--color-neutral-badge-bg)] text-[var(--color-neutral-badge-text)] border-[var(--color-neutral-badge-border)] dark:bg-[var(--color-neutral-badge-dark-bg)] dark:text-[var(--color-neutral-badge-dark-text)] dark:border-[var(--color-neutral-badge-dark-border)]',
    'Suspended': 'bg-[var(--color-danger-bg)] text-[var(--color-danger-text)] border-[var(--color-danger-border)] dark:bg-[var(--color-danger-dark-bg)] dark:text-[var(--color-danger-dark-text)] dark:border-[var(--color-danger-dark-border)]'
  };
  return colors[status] || colors['Inactive'];
};

export const getRoleColor = (role) => {
  const colors = {
    'Admin': 'bg-[var(--color-purple-bg)] text-[var(--color-purple-text)] border-[var(--color-purple-border)] dark:bg-[var(--color-purple-dark-bg)] dark:text-[var(--color-purple-dark-text)] dark:border-[var(--color-purple-dark-border)]',
    'User': 'bg-[var(--color-neutral-badge-bg)] text-[var(--color-neutral-badge-text)] border-[var(--color-neutral-badge-border)] dark:bg-[var(--color-neutral-badge-dark-bg)] dark:text-[var(--color-neutral-badge-dark-text)] dark:border-[var(--color-neutral-badge-dark-border)]'
  };
  return colors[role] || colors['User'];
};

export const getSubscriptionColor = (subscription) => {
  const colors = {
    'Premium': 'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)] border-[var(--color-warning-border)] dark:bg-[var(--color-warning-dark-bg)] dark:text-[var(--color-warning-dark-text)] dark:border-[var(--color-warning-dark-border)]',
    'Basic': 'bg-[var(--color-info-bg)] text-[var(--color-info-text)] border-[var(--color-info-border)] dark:bg-[var(--color-info-dark-bg)] dark:text-[var(--color-info-dark-text)] dark:border-[var(--color-info-dark-border)]',
    'Free': 'bg-[var(--color-neutral-badge-bg)] text-[var(--color-neutral-badge-text)] border-[var(--color-neutral-badge-border)] dark:bg-[var(--color-neutral-badge-dark-bg)] dark:text-[var(--color-neutral-badge-dark-text)] dark:border-[var(--color-neutral-badge-dark-border)]'
  };
  return colors[subscription] || colors['Free'];
};

export const getGalleryStatusColor = (status) => {
  return status === 'Published'
    ? 'bg-[var(--color-success-bg)] text-[var(--color-success-text)] border-[var(--color-success-border)] dark:bg-[var(--color-success-dark-bg)] dark:text-[var(--color-success-dark-text)] dark:border-[var(--color-success-dark-border)]'
    : 'bg-[var(--color-neutral-badge-bg)] text-[var(--color-neutral-badge-text)] border-[var(--color-border-subtle-light)] dark:bg-[var(--color-neutral-badge-dark-bg)] dark:text-[var(--color-neutral-badge-dark-text)] dark:border-[var(--color-border-dark)]';
};

export const getTypeIcon = (type) => {
  return type === 'video' ? Video : Image;
};

export const getReviewStatusColor = (status) => {
  const colors = {
    'Published': 'bg-[var(--color-success-bg)] text-[var(--color-success-text)] border-[var(--color-success-border)] dark:bg-[var(--color-success-dark-bg)] dark:text-[var(--color-success-dark-text)] dark:border-[var(--color-success-dark-border)]',
    'Pending': 'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)] border-[var(--color-warning-border)] dark:bg-[var(--color-warning-dark-bg)] dark:text-[var(--color-warning-dark-text)] dark:border-[var(--color-warning-dark-border)]',
    'Flagged': 'bg-[var(--color-danger-bg)] text-[var(--color-danger-text)] border-[var(--color-danger-border)] dark:bg-[var(--color-danger-dark-bg)] dark:text-[var(--color-danger-dark-text)] dark:border-[var(--color-danger-dark-border)]',
    'Archived': 'bg-[var(--color-neutral-badge-bg)] text-[var(--color-neutral-badge-text)] border-[var(--color-neutral-badge-border)] dark:bg-[var(--color-surface-hover-dark)]/50 dark:text-[var(--color-text-secondary-dark)] dark:border-[var(--color-border-dark)]'
  };
  return colors[status] || colors['Pending'];
};

export const getTypeLabel = (type) => {
  return type === 'account' ? 'Account Deletion' : 'Item Deletion';
};
