import { X, ChevronDown, Upload, Trash2 } from 'lucide-react';

export default function EventModal({
  isOpen,
  editingEvent,
  formData = {},
  onFormDataChange,
  onFormChange,
  onClose,
  onSubmit,
  categories = ['Cultural', 'Festival', 'Sports', 'Food', 'Music', 'Exhibition']
}) {
  if (!isOpen) return null;

  const updateForm = (data) => {
    if (onFormDataChange) {
      onFormDataChange(data);
    } else if (onFormChange) {
      onFormChange(data);
    }
  };

  const safeCategories = Array.isArray(categories) ? categories : ['Cultural', 'Festival', 'Sports', 'Food', 'Music', 'Exhibition'];

  const timeSlots = [
    '06:00 AM', '06:30 AM', '07:00 AM', '07:30 AM',
    '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
    '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM',
    '10:00 PM', '10:30 PM', '11:00 PM'
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] rounded-xl max-w-lg w-full shadow-2xl border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
          <h3 className="text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] tracking-wide">
            {editingEvent ? 'Edit Event' : 'Create New Event'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:text-[var(--color-text-primary-light)] dark:hover:text-[var(--color-white)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Event Title</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => updateForm({ ...formData, title: e.target.value })}
                placeholder="Enter event title"
                className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] dark:placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Event Picture Upload Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5 flex items-center justify-between">
                <span>Event Picture</span>
                <span className="text-[11px] text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] lowercase font-normal">(Upload file or paste image URL)</span>
              </label>

              {formData.imageUrl ? (
                <div className="relative w-full h-36 rounded-lg overflow-hidden border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] group shadow-sm">
                  <img src={formData.imageUrl} alt="Event Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <label className="p-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-md text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-md transition-colors">
                      <Upload className="w-4 h-4" />
                      Change Picture
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              updateForm({ ...formData, imageUrl: reader.result });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => updateForm({ ...formData, imageUrl: '' })}
                      className="p-2.5 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs font-medium flex items-center gap-1 cursor-pointer shadow-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] hover:border-[var(--color-primary)] dark:hover:border-[var(--color-primary)] rounded-lg cursor-pointer bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)]/50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-2 pb-2">
                      <Upload className="w-5 h-5 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1" />
                      <p className="text-xs font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">Click to upload event picture</p>
                      <p className="text-[10px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-0.5">PNG, JPG, WEBP or GIF</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            updateForm({ ...formData, imageUrl: reader.result });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                  <div>
                    <input
                      type="url"
                      value={formData.imageUrl || ''}
                      onChange={(e) => updateForm({ ...formData, imageUrl: e.target.value })}
                      placeholder="Or enter image URL (https://...)"
                      className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md px-4 py-2.5 text-xs text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] transition-all"
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Category</label>
              <div className="relative">
                <select
                  value={formData.category || 'Cultural'}
                  onChange={(e) => updateForm({ ...formData, category: e.target.value })}
                  className="appearance-none w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent cursor-pointer"
                  required
                >
                  {safeCategories.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => updateForm({ ...formData, description: e.target.value })}
                placeholder="Enter event description"
                rows="2"
                className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] dark:placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent resize-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Location</label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => updateForm({ ...formData, location: e.target.value })}
                placeholder="Enter event location"
                className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] dark:placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent transition-all"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Date</label>
                <input
                  type="date"
                  value={formData.start_date || formData.date || ''}
                  onChange={(e) => updateForm({ ...formData, start_date: e.target.value, date: e.target.value })}
                  className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Event Time</label>
                {(() => {
                  const rawTime = formData.start_time || formData.time || '08:00 AM';
                  // Convert 12h to 24h for input type="time"
                  let time24 = '08:00';
                  const match = String(rawTime).trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
                  if (match) {
                    let h = parseInt(match[1], 10);
                    const m = match[2];
                    const p = match[3] ? match[3].toUpperCase() : 'AM';
                    if (p === 'PM' && h < 12) h += 12;
                    if (p === 'AM' && h === 12) h = 0;
                    time24 = `${String(h).padStart(2, '0')}:${m}`;
                  } else if (/^\d{2}:\d{2}$/.test(rawTime)) {
                    time24 = rawTime;
                  }

                  const handleNativeTimeChange = (val24) => {
                    if (!val24) return;
                    const parts = val24.split(':');
                    let h = parseInt(parts[0], 10);
                    const m = parts[1];
                    const period = h >= 12 ? 'PM' : 'AM';
                    h = h % 12 || 12;
                    const time12 = `${String(h).padStart(2, '0')}:${m} ${period}`;
                    updateForm({ ...formData, start_time: time12, time: time12 });
                  };

                  return (
                    <input
                      type="time"
                      value={time24}
                      onChange={(e) => handleNativeTimeChange(e.target.value)}
                      className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent transition-all cursor-pointer"
                      required
                    />
                  );
                })()}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Price</label>
                <input
                  type="text"
                  value={formData.price || ''}
                  onChange={(e) => updateForm({ ...formData, price: e.target.value })}
                  placeholder="e.g., $45 or Free"
                  className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] dark:placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Organizer</label>
                <input
                  type="text"
                  value={formData.organizer || ''}
                  onChange={(e) => updateForm({ ...formData, organizer: e.target.value })}
                  placeholder="Organizer name"
                  className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] dark:placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-6 py-4 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] font-medium text-sm transition-colors text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-md bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-white)] font-medium text-sm transition-colors shadow-lg shadow-[var(--color-primary)]/25 text-center"
            >
              {editingEvent ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
