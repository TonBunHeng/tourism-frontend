import { Eye, Edit, Trash2, Calendar, Clock, MapPin, Users, Star } from 'lucide-react';

export const getStatusColor = (status) => {
  const colors = {
    'Upcoming': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
    'Ongoing': 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
    'Completed': 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-700/50 dark:text-gray-400 dark:border-gray-600',
    'Cancelled': 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
  };
  return colors[status] || colors['Upcoming'];
};

export const getCategoryColor = (category) => {
  const colors = {
    'Sports': 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800',
    'Cultural': 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800',
    'Arts & Entertainment': 'bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/20 dark:text-pink-400 dark:border-pink-800',
    'Food & Drink': 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
    'Music': 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800'
  };
  return colors[category] || 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700/50 dark:text-gray-400 dark:border-gray-600';
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
              className="group relative bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl p-4 sm:p-5 hover:shadow-lg transition-all duration-200 sm:hover:scale-[1.02]"
            >
              {event.featured && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-full">
                    Featured
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between mb-3 gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center shrink-0">
                    <EventImage className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">{event.title}</h3>
                    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full border ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shrink-0">
                  <button
                    onClick={() => onViewDetails(event)}
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={() => onEdit(event)}
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={() => onDelete(event.id)}
                    className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{event.description}</p>

              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-2 mb-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 min-w-0">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{event.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <Users className="w-3.5 h-3.5 shrink-0" />
                  <span>{event.attendees.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(event.status)}`}>
                    <Clock className="w-3 h-3" />
                    {event.status}
                  </span>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{event.price}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{event.rating}</span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="col-span-full text-center py-12">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No events found</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
