import { MessageSquare, Clock, Bot, Star } from 'lucide-react';

export default function ChatsStats({ chats }) {
  const stats = [
    {
      label: 'Active Chats',
      value: chats.filter(c => c.user.status === 'online').length,
      icon: MessageSquare,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/30'
    },
    {
      label: 'Unread Messages',
      value: chats.reduce((sum, c) => sum + c.unread, 0),
      icon: Clock,
      color: 'text-amber-500 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-900/30'
    },
    {
      label: 'AI Conversations',
      value: chats.filter(c => c.messages.some(m => m.isAI)).length,
      icon: Bot,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-900/30'
    },
    {
      label: 'VIP Users',
      value: chats.filter(c => c.user.isVIP).length,
      icon: Star,
      color: 'text-rose-500 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-900/30'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => {
        const IconComponent = stat.icon;
        return (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
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
