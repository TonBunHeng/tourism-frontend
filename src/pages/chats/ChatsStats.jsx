import { MessageSquare, Clock, Bot, Star } from 'lucide-react';

export default function ChatsStats({ chats }) {
  const stats = [
    {
      label: 'Active Chats',
      value: chats.filter(c => c.user.status === 'online').length,
      icon: MessageSquare,
      color: 'text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)]',
      bg: 'bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)]'
    },
    {
      label: 'Unread Messages',
      value: chats.reduce((sum, c) => sum + c.unread, 0),
      icon: Clock,
      color: 'text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)]',
      bg: 'bg-[var(--color-warning-bg)] dark:bg-[var(--color-warning-dark-bg)]'
    },
    {
      label: 'AI Conversations',
      value: chats.filter(c => c.messages.some(m => m.isAI)).length,
      icon: Bot,
      color: 'text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)]',
      bg: 'bg-[var(--color-purple-badge-bg)] dark:bg-[var(--color-purple-badge-dark-bg)]'
    },
    {
      label: 'VIP Users',
      value: chats.filter(c => c.user.isVIP).length,
      icon: Star,
      color: 'text-[var(--color-rose-badge-text)] dark:text-[var(--color-rose-badge-dark-text)]',
      bg: 'bg-[var(--color-rose-badge-bg)] dark:bg-[var(--color-rose-badge-dark-bg)]'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => {
        const IconComponent = stat.icon;
        return (
          <div key={idx} className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-xl p-4 shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">{stat.label}</p>
                <p className="text-2xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <IconComponent className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
