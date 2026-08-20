import { Calendar, Bell, Clock, Users } from 'lucide-react';

export default function EventsStats({ events = [] }) {
  const safeEvents = Array.isArray(events) ? events : [];
  const total = safeEvents.length;
  const upcoming = safeEvents.filter(e => e.status === 'Upcoming').length;
  const ongoing = safeEvents.filter(e => e.status === 'Ongoing').length;
  const totalAttendees = safeEvents.reduce((sum, e) => sum + (Number(e.attendees || e.attendees_count) || 0), 0);

  const stats = [
    {
      label: 'Total Events',
      value: total.toLocaleString(),
      subtext: 'Scheduled festivals & events',
      icon: Calendar,
      color: 'text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]',
      bg: 'bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)]'
    },
    {
      label: 'Upcoming Events',
      value: upcoming.toLocaleString(),
      subtext: `${upcoming} events starting soon`,
      icon: Bell,
      color: 'text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)]',
      bg: 'bg-[var(--color-warning-bg)] dark:bg-[var(--color-warning-dark-bg)]'
    },
    {
      label: 'Ongoing Events',
      value: ongoing.toLocaleString(),
      subtext: ongoing === 0 ? 'No active events currently' : `${ongoing} events happening now`,
      icon: Clock,
      color: 'text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)]',
      bg: 'bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)]'
    },
    {
      label: 'Total Attendees',
      value: totalAttendees.toLocaleString(),
      subtext: 'Registered participants',
      icon: Users,
      color: 'text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)]',
      bg: 'bg-[var(--color-purple-badge-bg)] dark:bg-[var(--color-purple-badge-dark-bg)]'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={index}
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
