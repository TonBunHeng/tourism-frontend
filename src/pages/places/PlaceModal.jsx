import { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, MapPin, ExternalLink, MousePointerClick, Map as MapIcon, Image as ImageIcon, Upload, Trash2, AlertCircle } from 'lucide-react';
import uploadService from '../../services/uploadService';
import { validateImageFile } from '../../utils/fileValidation';

export default function PlaceModal({
  isOpen,
  onClose,
  editingPlace,
  formData = {},
  onFormDataChange,
  onFormChange,
  onSubmit,
  formCategories = [],
  categories = [],
  statusOptions = []
}) {
  const [mapMode, setMapMode] = useState('interactive'); // 'interactive' or 'google'
  const [pickedCoords, setPickedCoords] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [fileValidationError, setFileValidationError] = useState('');
  const fileInputRef = useRef(null);

  const safeFormData = formData || {};
  const safeCategories = (formCategories && formCategories.length > 0)
    ? formCategories
    : ((categories && categories.length > 0) ? categories.filter(c => c !== 'All') : ['Temple', 'Palace', 'Beach', 'Nature', 'Market', 'Farm']);
  const safeStatuses = (statusOptions && statusOptions.length > 0)
    ? statusOptions
    : ['Active', 'Inactive', 'Closed', 'Under Renovation'];

  const updateField = (field, value) => {
    if (onFormChange) {
      onFormChange(field, value);
    } else if (onFormDataChange) {
      onFormDataChange({ ...safeFormData, [field]: value });
    }
  };

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
              updateField('address', data.display_name);
            } else {
              updateField('address', `Location: ${lat.toFixed(5)}, ${lng.toFixed(5)}`);
            }
          })
          .catch(() => {
            updateField('address', `Location: ${lat.toFixed(5)}, ${lng.toFixed(5)}`);
          });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onFormChange, onFormDataChange]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose?.();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileValidationError('');
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setFileValidationError(validation.error);
      if (e.target) e.target.value = '';
      return;
    }

    setIsUploadingImage(true);
    try {
      // 1. Instant preview via FileReader
      const reader = new FileReader();
      reader.onload = (event) => {
        updateField('image_url', event.target.result);
      };
      reader.readAsDataURL(file);

      // 2. Upload to backend storage
      const res = await uploadService.uploadFile(file, 'places');
      if (res.success && res.data?.url) {
        updateField('image_url', res.data.url);
      }
    } catch (err) {
      console.warn('Place image backend upload fallback to data URI:', err);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(e);
  };

  // Interactive OpenStreetMap HTML Doc
  const interactiveMapSrcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          html, body, #map { height: 100%; width: 100%; margin: 0; padding: 0; background: #0f172a; }
          .leaflet-popup-content-wrapper { border-radius: 8px; font-family: sans-serif; font-size: 12px; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          const map = L.map('map').setView([12.5657, 104.9910], 7);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '© OpenStreetMap'
          }).addTo(map);

          let currentMarker = null;

          map.on('click', function(e) {
            const { lat, lng } = e.latlng;
            if (currentMarker) {
              map.removeLayer(currentMarker);
            }
            currentMarker = L.marker([lat, lng]).addTo(map);
            currentMarker.bindPopup("<b>Selected Pin</b><br>" + lat.toFixed(4) + ", " + lng.toFixed(4)).openPopup();

            window.parent.postMessage({
              type: 'PICKED_LOCATION',
              lat: lat,
              lng: lng
            }, '*');
          });
        </script>
      </body>
    </html>
  `;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-alert-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark-modal)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] rounded-lg max-w-2xl w-full shadow-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden animate-alert-popup flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-zinc-800 shrink-0">
          <h3 className="text-base font-bold text-gray-900 dark:text-zinc-100">
            {editingPlace ? 'Edit Place Details' : 'Add New Place'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-all active:scale-90 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleFormSubmit}>
          <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {fileValidationError && (
              <div className="p-3 rounded bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 flex items-center gap-2 text-xs text-red-700 dark:text-red-400 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{fileValidationError}</span>
              </div>
            )}

            {/* Place Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Place Name *</label>
              <input
                type="text"
                value={safeFormData.name || ''}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="e.g. Angkor Wat, Royal Palace, Bokor Mountain"
                className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-gray-300 dark:border-zinc-700 rounded-lg px-3.5 py-2.5 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-1 focus:ring-[#003E83] transition-colors"
                required
              />
            </div>

            {/* Place Image Upload */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">
                Place Picture / Photo (Max 5MB: JPG, PNG, WEBP)
              </label>

              {safeFormData.image_url ? (
                <div className="relative w-full h-36 rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-700 group mb-2">
                  <img src={safeFormData.image_url} alt="Place Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 bg-[#003E83] hover:bg-[#002e62] text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
                    >
                      Change Photo
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField('image_url', '')}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs flex items-center gap-1 font-medium transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/40 rounded-lg p-4 text-center hover:border-[#003E83] transition-colors cursor-pointer mb-2"
                >
                  <Upload className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                  <p className="text-gray-800 dark:text-zinc-200 font-medium text-xs">
                    {isUploadingImage ? 'Uploading picture...' : 'Click to select picture'}
                  </p>
                  <p className="text-[11px] text-gray-500 dark:text-zinc-400">JPG, PNG, WEBP up to 5MB</p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={handleImageFileChange}
              />

              <input
                type="text"
                value={safeFormData.image_url || ''}
                onChange={(e) => updateField('image_url', e.target.value)}
                placeholder="Or paste image URL (https://...)"
                className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-gray-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-xs text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-1 focus:ring-[#003E83] transition-colors"
              />
            </div>

            {/* Category & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Category</label>
                <div className="relative">
                  <select
                    value={safeFormData.category || safeCategories[0] || 'Temple'}
                    onChange={(e) => updateField('category', e.target.value)}
                    className="appearance-none w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-lg px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent cursor-pointer"
                  >
                    {safeCategories.map(cat => (
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
                    value={safeFormData.status || 'Active'}
                    onChange={(e) => updateField('status', e.target.value)}
                    className="appearance-none w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-lg px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent cursor-pointer"
                  >
                    {safeStatuses.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Address *</label>
              <textarea
                value={safeFormData.address || ''}
                onChange={(e) => updateField('address', e.target.value)}
                placeholder="Enter full address or select location preset below"
                rows={2}
                className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-lg px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-none transition-all"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Description</label>
              <textarea
                value={safeFormData.description || ''}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Enter attraction history, highlights, and tourist details..."
                rows={3}
                className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-lg px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-none transition-all"
              />
            </div>

            {/* Best Time & Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Best Time to Visit</label>
                <input
                  type="text"
                  value={safeFormData.best_time || ''}
                  onChange={(e) => updateField('best_time', e.target.value)}
                  placeholder="e.g. Sunrise (5:30 AM - 7:00 AM)"
                  className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-lg px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Suggested Duration</label>
                <input
                  type="text"
                  value={safeFormData.duration || ''}
                  onChange={(e) => updateField('duration', e.target.value)}
                  placeholder="e.g. 2 - 3 Hours"
                  className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-lg px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                />
              </div>
            </div>

            {/* Price & Rating */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Ticket Price / Entry Fee</label>
                <input
                  type="text"
                  value={safeFormData.price || ''}
                  onChange={(e) => updateField('price', e.target.value)}
                  placeholder="e.g. Free, $37 USD, $5 USD"
                  className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-lg px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] placeholder-[var(--color-text-muted-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1.5">Initial Rating Score</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={safeFormData.rating || 5.0}
                  onChange={(e) => updateField('rating', parseFloat(e.target.value) || 5.0)}
                  className="w-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-lg px-4 py-3 text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                />
              </div>
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
                    className={`px-2 py-0.5 text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${mapMode === 'interactive' ? 'bg-[var(--color-primary)] text-white font-semibold' : 'bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]'}`}
                  >
                    <MousePointerClick className="w-3 h-3" />
                    Interactive Pick
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapMode('google')}
                    className={`px-2 py-0.5 text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${mapMode === 'google' ? 'bg-[var(--color-primary)] text-white font-semibold' : 'bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]'}`}
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
                    { label: 'Angkor Wat', address: 'Angkor Archaeological Park, Siem Reap, Cambodia' },
                    { label: 'Phnom Penh Palace', address: 'Royal Palace & Silver Pagoda, Phnom Penh, Cambodia' },
                    { label: 'Siem Reap City', address: 'Siem Reap City Center, Siem Reap, Cambodia' },
                    { label: 'Battambang', address: 'Battambang City, Battambang, Cambodia' },
                    { label: 'Kampot Riverfront', address: 'Kampot Riverfront, Kampot, Cambodia' },
                    { label: 'Koh Rong', address: 'Koh Rong Island, Preah Sihanouk, Cambodia' }
                  ].map((loc, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        updateField('address', loc.address);
                        if (!safeFormData.name) {
                          updateField('name', loc.label);
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
                <div className="relative w-full h-52 rounded-lg overflow-hidden border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[#0f172a] shadow-sm">
                  <div className="absolute top-2 left-2 z-10 bg-black/85 text-white text-[11px] px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-white/15">
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
                <div className="relative w-full h-52 rounded-lg overflow-hidden border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)] shadow-sm">
                  <iframe
                    title="Google Maps Location View"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(safeFormData.address || safeFormData.name || 'Cambodia')}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  ></iframe>
                </div>
              )}

              <div className="mt-1 flex items-center justify-between">
                <span className="text-[11px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                  Move map and click any point to set address
                </span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(safeFormData.address || safeFormData.name || 'Cambodia')}`}
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
              className="flex-1 py-3 px-4 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] font-medium text-sm transition-colors text-center cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!safeFormData?.name?.trim() || !safeFormData?.address?.trim() || isUploadingImage}
              className="flex-1 py-2.5 px-4 rounded-lg bg-[#003E83] hover:bg-[#002e62] text-white font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-center cursor-pointer"
            >
              {editingPlace ? 'Update Place' : 'Add Place'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
