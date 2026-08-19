import { useState } from 'react';
import {
  Globe,
  Mail,
  Phone,
  Clock,
  Upload,
  Image as ImageIcon,
  X,
  CheckCircle2
} from 'lucide-react';

export default function GeneralTab({ settings, setSettings }) {
  const [logoPreview, setLogoPreview] = useState(settings.logoUrl || null);
  const [faviconPreview, setFaviconPreview] = useState(settings.faviconUrl || null);

  const handleChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
      handleChange('logoUrl', url);
      handleChange('logoFileName', file.name);
    }
  };

  const handleFaviconUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFaviconPreview(url);
      handleChange('faviconUrl', url);
      handleChange('faviconFileName', file.name);
    }
  };

  const removeLogo = () => {
    setLogoPreview(null);
    handleChange('logoUrl', null);
    handleChange('logoFileName', '');
  };

  const removeFavicon = () => {
    setFaviconPreview(null);
    handleChange('faviconUrl', null);
    handleChange('faviconFileName', '');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Section Header */}
      <div>
        <h2 className="text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
          General Settings
        </h2>
        <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
          Configure fundamental system identity, organization details, localization, and branding assets.
        </p>
      </div>

      {/* Card 1: System Identity */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] pb-3">
          <Globe className="w-4 h-4 text-[var(--color-primary)]" />
          System Identity & Organization
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              System Name <span className="text-[var(--color-danger-text)]">*</span>
            </label>
            <input
              type="text"
              value={settings.siteName || ''}
              onChange={(e) => handleChange('siteName', e.target.value)}
              placeholder="e.g. AngkorVerses Admin System"
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              Organization Name <span className="text-[var(--color-danger-text)]">*</span>
            </label>
            <input
              type="text"
              value={settings.organizationName || ''}
              onChange={(e) => handleChange('organizationName', e.target.value)}
              placeholder="e.g. Ministry of Tourism & Culture"
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] transition-all"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              System Tagline & Description
            </label>
            <textarea
              rows={2}
              value={settings.siteDescription || ''}
              onChange={(e) => handleChange('siteDescription', e.target.value)}
              placeholder="Brief description of the tourism management system"
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] transition-all"
            />
          </div>
        </div>
      </div>

      {/* Card 2: Contact Information */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] pb-3">
          <Mail className="w-4 h-4 text-[var(--color-primary)]" />
          System Contact Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              Contact Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--color-text-muted-light)]">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                value={settings.contactEmail || ''}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
                placeholder="support@tourism.gov.kh"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              Contact Phone Number
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--color-text-muted-light)]">
                <Phone className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={settings.contactPhone || ''}
                onChange={(e) => handleChange('contactPhone', e.target.value)}
                placeholder="+855 23 888 999"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Localization & Regional Settings */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] pb-3">
          <Clock className="w-4 h-4 text-[var(--color-primary)]" />
          Localization & Date Formats
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              Default Language
            </label>
            <select
              value={settings.defaultLanguage || 'English'}
              onChange={(e) => handleChange('defaultLanguage', e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] transition-all"
            >
              <option value="English">English (US)</option>
              <option value="Khmer">Khmer (ភាសាខ្មែរ)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              Time Zone
            </label>
            <select
              value={settings.timezone || 'Asia/Phnom_Penh'}
              onChange={(e) => handleChange('timezone', e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] transition-all"
            >
              <option value="Asia/Phnom_Penh">Asia/Phnom_Penh (GMT+07:00)</option>
              <option value="Asia/Bangkok">Asia/Bangkok (GMT+07:00)</option>
              <option value="Asia/Singapore">Asia/Singapore (GMT+08:00)</option>
              <option value="Asia/Tokyo">Asia/Tokyo (GMT+09:00)</option>
              <option value="UTC">UTC (GMT+00:00)</option>
              <option value="America/New_York">America/New_York (GMT-05:00)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              Date Format
            </label>
            <select
              value={settings.dateFormat || 'YYYY-MM-DD'}
              onChange={(e) => handleChange('dateFormat', e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)] transition-all"
            >
              <option value="YYYY-MM-DD">YYYY-MM-DD (2026-08-04)</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY (04/08/2026)</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY (08/04/2026)</option>
              <option value="DD MMM YYYY">DD MMM YYYY (04 Aug 2026)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Card 4: Branding Assets Upload (Logo & Favicon) */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] pb-3">
          <ImageIcon className="w-4 h-4 text-[var(--color-primary)]" />
          Brand Assets (Logo & Favicon)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Logo Uploader */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
              Upload System Logo
            </label>

            {logoPreview ? (
              <div className="relative border-2 border-dashed border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md p-4 bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg p-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] flex items-center justify-center overflow-hidden">
                    <img src={logoPreview} alt="System Logo" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] block truncate max-w-[140px]">
                      {settings.logoFileName || 'logo.png'}
                    </span>
                    <span className="text-[10px] text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3 h-3" /> Ready to save
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeLogo}
                  className="p-1.5 text-[var(--color-text-muted-light)] hover:text-[var(--color-danger-text)] dark:hover:text-[var(--color-danger-dark-text)] rounded-lg transition-colors"
                  title="Remove Logo"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] hover:border-[var(--color-primary)] rounded-md p-4 flex flex-col items-center justify-center cursor-pointer transition-all bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/30">
                <Upload className="w-6 h-6 text-[var(--color-text-muted-light)] mb-1" />
                <span className="text-xs font-medium text-[var(--color-primary)]">Click to upload logo</span>
                <span className="text-[10px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-0.5">PNG, SVG, or JPG (max 2MB)</span>
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              </label>
            )}
          </div>

          {/* Favicon Uploader */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
              Upload Favicon
            </label>

            {faviconPreview ? (
              <div className="relative border-2 border-dashed border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] rounded-md p-4 bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg p-2 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] flex items-center justify-center overflow-hidden">
                    <img src={faviconPreview} alt="Favicon" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] block truncate max-w-[140px]">
                      {settings.faviconFileName || 'favicon.ico'}
                    </span>
                    <span className="text-[10px] text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3 h-3" /> Ready to save
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFavicon}
                  className="p-1.5 text-[var(--color-text-muted-light)] hover:text-[var(--color-danger-text)] dark:hover:text-[var(--color-danger-dark-text)] rounded-lg transition-colors"
                  title="Remove Favicon"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] hover:border-[var(--color-primary)] rounded-md p-4 flex flex-col items-center justify-center cursor-pointer transition-all bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/30">
                <Upload className="w-6 h-6 text-[var(--color-text-muted-light)] mb-1" />
                <span className="text-xs font-medium text-[var(--color-primary)]">Click to upload favicon</span>
                <span className="text-[10px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-0.5">ICO, PNG, or SVG (32x32px)</span>
                <input type="file" accept="image/*" onChange={handleFaviconUpload} className="hidden" />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
