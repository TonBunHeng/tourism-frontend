import { Eye, Edit, Trash2, Calendar, Clock, MapPin, Users, Star } from 'lucide-react';

export const getStatusColor = (status) => {
  const colors = {
    'Upcoming': 'bg-[var(--color-info-bg)] text-[var(--color-info-text)] border-[var(--color-info-border)] dark:bg-[var(--color-info-dark-bg)] dark:text-[var(--color-info-dark-text)] dark:border-[var(--color-info-dark-border)]',
    'Ongoing': 'bg-[var(--color-success-bg)] text-[var(--color-success-text)] border-[var(--color-success-border)] dark:bg-[var(--color-success-dark-bg)] dark:text-[var(--color-success-dark-text)] dark:border-[var(--color-success-dark-border)]',
    'Completed': 'bg-[var(--color-neutral-badge-bg)] text-[var(--color-neutral-badge-text)] border-[var(--color-border-subtle-light)] dark:bg-[var(--color-neutral-badge-dark-bg)] dark:text-[var(--color-neutral-badge-dark-text)] dark:border-[var(--color-border-dark)]',
    'Cancelled': 'bg-[var(--color-danger-bg)] text-[var(--color-danger-text)] border-[var(--color-danger-border)] dark:bg-[var(--color-danger-dark-bg)] dark:text-[var(--color-danger-dark-text)] dark:border-[var(--color-danger-dark-border)]'
  };
  return colors[status] || colors['Upcoming'];
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

export default function EventsGrid({
  events,
  onViewDetails,
  onEdit,
  onDelete
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-6">
      {events.length > 0 ? (
        events.map((event) => {
          const EventImage = event.image;
          return (
            <div
              key={event.id}
              className="group relative bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)]/50 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl p-4 sm:p-5 hover:shadow-lg transition-all duration-200 sm:hover:scale-[1.02]"
            >
              {event.featured && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-2 py-0.5 bg-[var(--color-warning-text)] text-[var(--color-white)] text-xs font-semibold rounded-full">
                    Featured
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between mb-3 gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[var(--color-purple-badge-bg)] dark:bg-[var(--color-purple-badge-dark-bg)] flex items-center justify-center shrink-0">
                    <EventImage className="w-6 h-6 sm:w-7 sm:h-7 text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] text-sm line-clamp-1">{event.title}</h3>
                    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full border ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shrink-0">
                  <button
                    onClick={() => onViewDetails(event)}
                    className="p-1.5 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-3.5 h-3.5 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
                  </button>
                  <button
                    onClick={() => onEdit(event)}
                    className="p-1.5 hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-3.5 h-3.5 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]" />
                  </button>
                  <button
                    onClick={() => onDelete(event.id)}
                    className="p-1.5 hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)]" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-3 line-clamp-2">{event.description}</p>

              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-2 mb-3">
                <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] min-w-0">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{event.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                  <Users className="w-3.5 h-3.5 shrink-0" />
                  <span>{event.attendees.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(event.status)}`}>
                    <Clock className="w-3 h-3" />
                    {event.status}
                  </span>
                  <span className="text-sm font-semibold text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]">{event.price}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[var(--color-amber-star)] text-[var(--color-amber-star)]" />
                  <span className="text-sm font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{event.rating}</span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="col-span-full text-center py-12">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-lg font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">No events found</h3>
          <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
