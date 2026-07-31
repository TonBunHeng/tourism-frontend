import { Eye, Edit, Trash2, MapPin, Users, Star, Clock } from 'lucide-react';
import { getStatusColor, getCategoryColor } from './EventsGrid';

export default function EventsList({
  events,
  onViewDetails,
  onEdit,
  onDelete
}) {
  return (
    <>
      {/* Mobile Card List View */}
      <div className="sm:hidden divide-y divide-[var(--color-border-subtle-light)] dark:divide-[var(--color-border-dark)]">
        {events.length > 0 ? (
          events.map((event) => {
            const EventImage = event.image;
            return (
              <div key={event.id} className="p-4 flex gap-3">
                <div className="w-14 h-14 rounded-xl bg-[var(--color-purple-badge-bg)] dark:bg-[var(--color-purple-badge-dark-bg)] flex items-center justify-center shrink-0">
                  <EventImage className="w-6 h-6 text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] truncate">{event.title}</p>
                    <span className={`shrink-0 inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-full border ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] mt-1 min-w-0">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{event.location}</span>
                    <span className="mx-1">·</span>
                    <Users className="w-3 h-3 shrink-0" />
                    <span>{event.attendees.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <button onClick={() => onViewDetails(event)} className="p-1.5 text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)] hover:bg-[var(--color-purple-badge-bg)] dark:hover:bg-[var(--color-purple-badge-dark-bg)] rounded-lg transition-colors" title="View Details">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => onEdit(event)} className="p-1.5 text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] hover:bg-[var(--color-info-bg)] dark:hover:bg-[var(--color-info-dark-bg)] rounded-lg transition-colors" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => onDelete(event.id)} className="p-1.5 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] rounded-lg transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-lg font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">No events found</h3>
            <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full divide-y divide-[var(--color-border-subtle-light)] dark:divide-[var(--color-border-dark)]">
          <thead className="bg-[var(--color-surface-hover-light)]/50 dark:bg-[var(--color-surface-hover-dark)]/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">Event</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">Attendees</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] divide-y divide-[var(--color-border-subtle-light)] dark:divide-[var(--color-border-dark)]">
            {events.length > 0 ? (
              events.map((event, index) => {
                const EventImage = event.image;
                return (
                  <tr key={event.id} className="hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)]/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                      {String(index + 1).padStart(2, '0')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[var(--color-purple-badge-bg)] dark:bg-[var(--color-purple-badge-dark-bg)] flex items-center justify-center flex-shrink-0">
                          <EventImage className="w-6 h-6 text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)]" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{event.title}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${getCategoryColor(event.category)}`}>
                              {event.category}
                            </span>
                            {event.featured && (
                              <span className="text-xs px-2 py-0.5 bg-[var(--color-warning-bg)] dark:bg-[var(--color-warning-dark-bg)] text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)] rounded-full border border-[var(--color-warning-border)] dark:border-[var(--color-warning-dark-border)] flex items-center gap-1">
                                <Star className="w-3 h-3 fill-[var(--color-amber-star)] text-[var(--color-amber-star)]" /> Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                      <div className="flex flex-col">
                        <span>{event.date}</span>
                        <span className="text-xs">{event.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="truncate max-w-xs">{event.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        <span>{event.attendees.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(event.status)}`}>
                        <Clock className="w-3 h-3" />
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onViewDetails(event)}
                          className="p-1.5 text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)] hover:bg-[var(--color-purple-badge-bg)] dark:hover:bg-[var(--color-purple-badge-dark-bg)] rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEdit(event)}
                          className="p-1.5 text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] hover:bg-[var(--color-info-bg)] dark:hover:bg-[var(--color-info-dark-bg)] rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(event.id)}
                          className="p-1.5 text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)] hover:bg-[var(--color-danger-bg)] dark:hover:bg-[var(--color-danger-dark-bg)] rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-12">
                  <div className="text-6xl mb-4">📅</div>
                  <h3 className="text-lg font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-1">No events found</h3>
                  <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Try adjusting your search or filter criteria</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
