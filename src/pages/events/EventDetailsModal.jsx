import { X, Clock, Calendar, Star, Users, MapPin, Edit } from 'lucide-react';

export default function EventDetailsModal({
  isOpen,
  event,
  onClose,
  onEdit
}) {
  if (!isOpen || !event) return null;

  const EventImage = event.image;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[#111827] text-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
              {EventImage && <EventImage className="w-5 h-5 text-blue-400" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">Event Details</h3>
              <p className="text-xs text-gray-400">ID: #{event.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Event Title</span>
            <p className="text-base font-semibold text-white mt-1">{event.title}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Category</span>
              <p className="text-sm font-medium text-blue-400 mt-1">{event.category}</p>
            </div>
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Status</span>
              <p className="text-sm font-medium text-green-400 mt-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {event.status}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Date & Time</span>
              <p className="text-sm font-medium text-white mt-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                {event.date} ({event.time})
              </p>
            </div>
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Price & Rating</span>
              <p className="text-sm font-medium text-amber-400 mt-1 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {event.rating} · <span className="text-white">{event.price}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Attendees</span>
              <p className="text-sm font-medium text-white mt-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-gray-400" />
                {event.attendees.toLocaleString()} attendees
              </p>
            </div>
            <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Organizer</span>
              <p className="text-sm font-medium text-white mt-1 truncate">{event.organizer}</p>
            </div>
          </div>

          <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Location</span>
            <p className="text-sm text-gray-300 mt-1 flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <span>{event.location}</span>
            </p>
          </div>

          <div className="bg-[#1f2937]/50 p-3.5 rounded-2xl border border-gray-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Description</span>
            <p className="text-sm text-gray-300 mt-1">{event.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-800 bg-[#111827]">
          <button
            type="button"
            onClick={() => {
              const ev = event;
              onClose();
              onEdit(ev);
            }}
            className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit Event
          </button>
        </div>
      </div>
    </div>
  );
}
