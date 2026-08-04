import { useState, useEffect } from 'react';
import { X, ChevronDown, MapPin, ExternalLink, MousePointerClick, Map as MapIcon } from 'lucide-react';

export default function PlaceModal({
  isOpen,
  onClose,
  editingPlace,
  formData,
  onFormChange,
  onSubmit,
  formCategories,
  statusOptions
}) {
  const [mapMode, setMapMode] = useState('interactive'); // 'interactive' or 'google'
  const [pickedCoords, setPickedCoords] = useState(null);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'PICKED_LOCATION') {
        const { lat, lng } = event.data;
        setPickedCoords({ lat, lng });

        // Reverse geocode location using OpenStreetMap Nominatim
        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
          .then((res) => res.json())
          .then((data) => {
            if (data && data.display_name) {
              onFormChange('address', data.display_name);
            } else {
              onFormChange('address', `Location: ${lat.toFixed(5)}, ${lng.toFixed(5)}`);
            }
          })
          .catch(() => {
            onFormChange('address', `Location: ${lat.toFixed(5)}, ${lng.toFixed(5)}`);
          });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onFormChange]);

  if (!isOpen) return null;

  const interactiveMapSrcDoc = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    html, body, #map { width: 100%; height: 100%; margin: 0; padding: 0; background: #0f172a; cursor: crosshair; }
    .leaflet-control-attribution { font-size: 9px; opacity: 0.7; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    var map = L.map('map').setView([12.5657, 104.9910], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(map);

    var marker = null;

    function sendLocation(lat, lng) {
      window.parent.postMessage({ type: 'PICKED_LOCATION', lat: lat, lng: lng }, '*');
    }

    map.on('click', function(e) {
      var lat = e.latlng.lat;
      var lng = e.latlng.lng;
      if (marker) {
        marker.setLatLng(e.latlng);
      } else {
        marker = L.marker(e.latlng, { draggable: true }).addTo(map);
        marker.on('dragend', function(ev) {
          var pos = marker.getLatLng();
          sendLocation(pos.lat, pos.lng);
        });
      }
      sendLocation(lat, lng);
    });
  </script>
</body>
</html>
  `;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] rounded-3xl max-w-lg w-full shadow-2xl border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
          <h3 className="text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] tracking-wide">
            {editingPlace ? 'Edit Place' : 'Add New Place'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:text-[var(--color-text-primary-light)] dark:hover:text-[var(--color-white)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Place Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => onFormChange('name', e.target.value)}
                placeholder="Enter place name"
                className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] dark:placeholder-[var(--color-text-secondary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Category</label>
              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) => onFormChange('category', e.target.value)}
                  className="appearance-none w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent cursor-pointer"
                  >
                    {formCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] pointer-events-none" />
                </div>
              </div>
              <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Status</label>
              <div className="relative">
                <select
                  value={formData.status}
                  onChange={(e) => onFormChange('status', e.target.value)}
                  className="appearance-none w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent cursor-pointer"
                  >
                    {statusOptions.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Address</label>
              <textarea
                value={formData.address}
                onChange={(e) => onFormChange('address', e.target.value)}
                placeholder="Enter full address or click location on map below"
                rows="2"
                className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-xl px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] dark:placeholder-[var(--color-text-secondary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] focus:border-transparent resize-none transition-all"
                required
              />
            </div>

            {/* Map Picker & Location Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                  <span>Select Location on Map</span>
                </label>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setMapMode('interactive')}
                    className={`px-2 py-0.5 text-xs rounded-lg transition-colors flex items-center gap-1 ${mapMode === 'interactive' ? 'bg-[var(--color-primary)] text-white font-semibold' : 'bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]'}`}
                  >
                    <MousePointerClick className="w-3 h-3" />
                    Interactive Pick
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapMode('google')}
                    className={`px-2 py-0.5 text-xs rounded-lg transition-colors flex items-center gap-1 ${mapMode === 'google' ? 'bg-[var(--color-primary)] text-white font-semibold' : 'bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]'}`}
                  >
                    <MapIcon className="w-3 h-3" />
                    Google View
                  </button>
                </div>
              </div>

              {/* Quick Select Location Presets */}
              <div className="mb-2">
                <span className="text-[11px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] block mb-1">Quick Presets:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: 'Angkor Wat', address: 'Angkor Wat, Siem Reap, Cambodia' },
                    { label: 'Phnom Penh Palace', address: 'Royal Palace, Phnom Penh, Cambodia' },
                    { label: 'Siem Reap', address: 'Siem Reap City Center, Siem Reap, Cambodia' },
                    { label: 'Battambang', address: 'Battambang City, Cambodia' },
                    { label: 'Kampot', address: 'Kampot Riverfront, Kampot, Cambodia' },
                    { label: 'Koh Rong', address: 'Koh Rong Island, Sihanoukville, Cambodia' }
                  ].map((loc, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        onFormChange('address', loc.address);
                        if (!formData.name) {
                          onFormChange('name', loc.label);
                        }
                      }}
                      className="text-xs px-2.5 py-1 rounded-lg bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)] hover:bg-[var(--color-primary)] hover:text-white dark:hover:bg-[var(--color-primary)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] transition-colors cursor-pointer"
                    >
                      📍 {loc.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Map vs Google Maps Mode */}
              {mapMode === 'interactive' ? (
                <div className="relative w-full h-52 rounded-2xl overflow-hidden border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[#0f172a] shadow-sm">
                  <div className="absolute top-2 left-2 z-10 bg-black/75 text-white text-[11px] px-2.5 py-1 rounded-lg backdrop-blur-md flex items-center gap-1.5 border border-white/10">
                    <MousePointerClick className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Click anywhere on map to pick location pin</span>
                  </div>

                  {pickedCoords && (
                    <div className="absolute bottom-2 right-2 z-10 bg-emerald-600 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg shadow-md">
                      ✓ Pin Selected ({pickedCoords.lat.toFixed(4)}, {pickedCoords.lng.toFixed(4)})
                    </div>
                  )}

                  <iframe
                    title="Interactive Map Location Picker"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    srcDoc={interactiveMapSrcDoc}
                  ></iframe>
                </div>
              ) : (
                <div className="relative w-full h-52 rounded-2xl overflow-hidden border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)] shadow-sm">
                  <iframe
                    title="Google Maps Location View"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(formData.address || formData.name || 'Cambodia')}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  ></iframe>
                </div>
              )}

              <div className="mt-1 flex items-center justify-between">
                <span className="text-[11px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                  Move map and click any point to set address
                </span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formData.address || formData.name || 'Cambodia')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] hover:underline flex items-center gap-0.5"
                >
                  <span>Open Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 px-6 py-4 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] font-medium text-sm transition-colors text-center"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSubmit}
              disabled={!formData.name.trim() || !formData.address.trim()}
              className="flex-1 py-3 px-4 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-white)] font-medium text-sm transition-colors shadow-lg shadow-[var(--color-primary)]/25 disabled:opacity-50 disabled:cursor-not-allowed text-center"
            >
              {editingPlace ? 'Update Place' : 'Add Place'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
