import { MessageSquare, Clock, Bot, Star } from 'lucide-react';

export default function ChatsStats({ chats = [] }) {
  const safeChats = Array.isArray(chats) ? chats : [];
  const activeChats = safeChats.filter(c => c.user?.status === 'online' || c.status === 'active').length;
  const unreadMessages = safeChats.reduce((sum, c) => sum + (Number(c.unread) || 0), 0);
  const totalConversations = safeChats.length;
  const highPriority = safeChats.filter(c => c.priority === 'high' || c.priority === 'critical' || c.user?.isVIP).length;

  const stats = [
    {
      label: 'Active Chats',
      value: activeChats.toLocaleString(),
      subtext: 'Online support sessions',
      icon: MessageSquare,
      color: 'text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)]',
      bg: 'bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)]'
    },
    {
      label: 'Unread Messages',
      value: unreadMessages.toLocaleString(),
      subtext: unreadMessages === 0 ? 'All messages caught up' : `${unreadMessages} pending responses`,
      icon: Clock,
      color: 'text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)]',
      bg: 'bg-[var(--color-warning-bg)] dark:bg-[var(--color-warning-dark-bg)]'
    },
    {
      label: 'Total Conversations',
      value: totalConversations.toLocaleString(),
      subtext: 'All-time support threads',
      icon: Bot,
      color: 'text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)]',
      bg: 'bg-[var(--color-purple-badge-bg)] dark:bg-[var(--color-purple-badge-dark-bg)]'
    },
    {
      label: 'High Priority',
      value: highPriority.toLocaleString(),
      subtext: 'VIP & urgent inquiries',
      icon: Star,
      color: 'text-[var(--color-rose-badge-text)] dark:text-[var(--color-rose-badge-dark-text)]',
      bg: 'bg-[var(--color-rose-badge-bg)] dark:bg-[var(--color-rose-badge-dark-bg)]'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
      {stats.map((stat, idx) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={idx}
            className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg p-4 md:p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs md:text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] font-medium truncate">
                  {stat.label}
                </p>
                <p className="text-xl md:text-2xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mt-1 tracking-tight">
                  {stat.value}
                </p>
              </div>
              <div className={`p-2.5 md:p-3 rounded-lg shrink-0 ${stat.bg}`}>
                <IconComponent className={`w-5 h-5 md:w-5 md:h-5 ${stat.color}`} />
              </div>
            </div>
            <p className="text-[11px] text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] mt-2">
              {stat.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
}
