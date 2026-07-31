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
      <div className="bg-[var(--color-bg-dark-modal)] text-[var(--color-white)] rounded-3xl max-w-lg w-full shadow-2xl border border-[var(--color-border-dark)] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border-dark)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-info-dark-bg)] flex items-center justify-center">
              {EventImage && <EventImage className="w-5 h-5 text-[var(--color-info-dark-text)]" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--color-white)] tracking-wide">Event Details</h3>
              <p className="text-xs text-[var(--color-text-secondary-dark)]">ID: #{event.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[var(--color-text-secondary-dark)] hover:text-[var(--color-white)] hover:bg-[var(--color-surface-hover-dark)] rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-dark)]">Event Title</span>
            <p className="text-base font-semibold text-[var(--color-white)] mt-1">{event.title}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[var(--color-surface-hover-dark)]/50 p-3.5 rounded-2xl border border-[var(--color-border-dark)]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-dark)]">Category</span>
              <p className="text-sm font-medium text-[var(--color-info-dark-text)] mt-1">{event.category}</p>
            </div>
            <div className="bg-[var(--color-surface-hover-dark)]/50 p-3.5 rounded-2xl border border-[var(--color-border-dark)]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-dark)]">Status</span>
              <p className="text-sm font-medium text-[var(--color-success-dark-text)] mt-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {event.status}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[var(--color-surface-hover-dark)]/50 p-3.5 rounded-2xl border border-[var(--color-border-dark)]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-dark)]">Date & Time</span>
              <p className="text-sm font-medium text-[var(--color-white)] mt-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[var(--color-text-secondary-dark)]" />
                {event.date} ({event.time})
              </p>
            </div>
            <div className="bg-[var(--color-surface-hover-dark)]/50 p-3.5 rounded-2xl border border-[var(--color-border-dark)]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-dark)]">Price & Rating</span>
              <p className="text-sm font-medium text-[var(--color-warning-dark-text)] mt-1 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[var(--color-amber-star)] text-[var(--color-amber-star)]" />
                {event.rating} · <span className="text-[var(--color-white)]">{event.price}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[var(--color-surface-hover-dark)]/50 p-3.5 rounded-2xl border border-[var(--color-border-dark)]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-dark)]">Attendees</span>
              <p className="text-sm font-medium text-[var(--color-white)] mt-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[var(--color-text-secondary-dark)]" />
                {event.attendees.toLocaleString()} attendees
              </p>
            </div>
            <div className="bg-[var(--color-surface-hover-dark)]/50 p-3.5 rounded-2xl border border-[var(--color-border-dark)]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-dark)]">Organizer</span>
              <p className="text-sm font-medium text-[var(--color-white)] mt-1 truncate">{event.organizer}</p>
            </div>
          </div>

          <div className="bg-[var(--color-surface-hover-dark)]/50 p-3.5 rounded-2xl border border-[var(--color-border-dark)]">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-dark)]">Location</span>
            <p className="text-sm text-[var(--color-text-secondary-dark)] mt-1 flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-[var(--color-text-secondary-dark)] shrink-0 mt-0.5" />
              <span>{event.location}</span>
            </p>
          </div>

          <div className="bg-[var(--color-surface-hover-dark)]/50 p-3.5 rounded-2xl border border-[var(--color-border-dark)]">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-dark)]">Description</span>
            <p className="text-sm text-[var(--color-text-secondary-dark)] mt-1">{event.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[var(--color-border-dark)] bg-[var(--color-bg-dark-modal)]">
          <button
            type="button"
            onClick={() => {
              const ev = event;
              onClose();
              onEdit(ev);
            }}
            className="py-2.5 px-4 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-white)] font-medium text-sm transition-colors flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit Event
          </button>
        </div>
      </div>
    </div>
  );
}
