import { Sun, Moon, Monitor, Type, Check, Sidebar, SlidersHorizontal } from 'lucide-react';
import {
  applyTheme,
  applySidebarStyle,
  applyCompactSidebar,
  applyFontSize,
  applyFontFamily
} from '../../utils/Theme';

export default function AppearanceTab({ settings, setSettings }) {
  const handleChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value
    }));

    if (field === 'theme') {
      applyTheme(value);
    } else if (field === 'sidebarStyle') {
      applySidebarStyle(value);
    } else if (field === 'compactSidebar') {
      applyCompactSidebar(value);
    } else if (field === 'fontSize') {
      applyFontSize(value);
    } else if (field === 'fontFamily') {
      applyFontFamily(value);
    }
  };

  const themeOptions = [
    { id: 'light', name: 'Light Mode', icon: Sun, desc: 'Clean, crisp white interface' },
    { id: 'dark', name: 'Dark Mode', icon: Moon, desc: 'Sleek dark theme for lower eye strain' },
    { id: 'system', name: 'System Default', icon: Monitor, desc: 'Syncs automatically with OS settings' }
  ];

  const sidebarStyles = [
    { id: 'modern', name: 'Modern Dark', desc: 'Dark background with vibrant accents' },
    { id: 'light', name: 'Light Clean', desc: 'Minimalist border-separated light sidebar' },
    { id: 'brand', name: 'Brand Gradient', desc: 'Subtle brand blue highlight styling' }
  ];

  const fontSizes = [
    { id: 'small', name: 'Small', label: '14px - Compact layout' },
    { id: 'medium', name: 'Medium', label: '16px - Standard default' },
    { id: 'large', name: 'Large', label: '18px - High legibility' }
  ];

  const fontFamilies = [
    { id: 'inter', name: 'Inter', desc: 'Clean, modern & highly readable' },
    { id: 'jakarta', name: 'Plus Jakarta Sans', desc: 'Crisp, contemporary geometric sans' },
    { id: 'outfit', name: 'Outfit', desc: 'Refined, stylish & elegant curves' },
    { id: 'roboto', name: 'Roboto', desc: 'Structured, universal neutrality' }
  ];

  const activeFamilyName = fontFamilies.find(f => f.id === (settings.fontFamily || 'inter'))?.name || 'Inter';

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Section Header */}
      <div>
        <h2 className="text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
          Appearance Settings
        </h2>
        <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
          Customize theme modes, navigation sidebar styling, compact mode, and typography for your admin panel.
        </p>
      </div>

      {/* Card 1: Dark / Light Mode */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] pb-3">
          <Sun className="w-4 h-4 text-[var(--color-primary)]" />
          Theme Mode (Dark / Light)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {themeOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = (settings.theme || 'system') === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleChange('theme', opt.id)}
                className={`flex flex-col items-start p-4 rounded-md border text-left transition-all relative cursor-pointer ${
                  isSelected
                    ? 'border-[var(--color-primary)] bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] ring-2 ring-[var(--color-primary)]/20'
                    : 'border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)]'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-3 right-3 text-[var(--color-primary)]">
                    <Check className="w-4 h-4" />
                  </span>
                )}
                <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)]'}`} />
                <span className="text-xs font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                  {opt.name}
                </span>
                <span className="text-[10px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
                  {opt.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Card 2: Sidebar Style & Compact Toggle */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] pb-3">
          <Sidebar className="w-4 h-4 text-[var(--color-primary)]" />
          Navigation Sidebar Customization
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sidebarStyles.map((style) => {
            const isSelected = (settings.sidebarStyle || 'modern') === style.id;
            return (
              <button
                key={style.id}
                type="button"
                onClick={() => handleChange('sidebarStyle', style.id)}
                className={`p-4 rounded-md border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[var(--color-primary)] bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] ring-2 ring-[var(--color-primary)]/20'
                    : 'border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                    {style.name}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-[var(--color-primary)]" />}
                </div>
                <span className="text-[10px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                  {style.desc}
                </span>
              </button>
            );
          })}
        </div>

        {/* Compact Sidebar Switch */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
          <div>
            <span className="text-xs font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] block">
              Compact Sidebar Mode
            </span>
            <span className="text-[11px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
              Automatically collapse navigation bar to icons only on startup
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleChange('compactSidebar', !settings.compactSidebar)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
              settings.compactSidebar ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border-subtle-light)] dark:bg-[var(--color-surface-hover-dark)]'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-[var(--color-white)] transition-transform ${
                settings.compactSidebar ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Card 3: Typography & Font Size */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] pb-3">
          <Type className="w-4 h-4 text-[var(--color-primary)]" />
          Typography & Font Size
        </h3>

        {/* Font Size Selector */}
        <div>
          <label className="text-xs font-semibold text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider block mb-2">
            Base Font Size & UI Scale
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fontSizes.map((size) => {
              const isSelected = (settings.fontSize || 'medium') === size.id;
              return (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => handleChange('fontSize', size.id)}
                  className={`p-4 rounded-md border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[var(--color-primary)] bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] ring-2 ring-[var(--color-primary)]/20'
                      : 'border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                      {size.name}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-[var(--color-primary)]" />}
                  </div>
                  <span className="text-[10px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
                    {size.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Font Family Selector */}
        <div className="pt-3 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
          <label className="text-xs font-semibold text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] uppercase tracking-wider block mb-2">
            Typography Family
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {fontFamilies.map((fam) => {
              const isSelected = (settings.fontFamily || 'inter') === fam.id;
              return (
                <button
                  key={fam.id}
                  type="button"
                  onClick={() => handleChange('fontFamily', fam.id)}
                  className={`p-3 rounded-md border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[var(--color-primary)] bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] ring-2 ring-[var(--color-primary)]/20'
                      : 'border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
                      {fam.name}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[var(--color-primary)]" />}
                  </div>
                  <span className="text-[10px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] leading-tight line-clamp-1">
                    {fam.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Interactive Preview Box */}
        <div className="p-4 rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-gray-50/70 dark:bg-zinc-800/40">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              Live Typography & Scale Preview
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] text-[var(--color-primary)] dark:text-blue-400">
              {(settings.fontSize || 'medium').toUpperCase()} ({settings.fontSize === 'small' ? '14px' : settings.fontSize === 'large' ? '18px' : '16px'}) • {activeFamilyName}
            </span>
          </div>
          <p className="text-base font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
            AngkorVerses Cultural Heritage & Tourism System
          </p>
          <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1 leading-relaxed">
            Experience real-time UI scaling and elegant modern typography across all dashboards, records, and management modules.
          </p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3 text-xs text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] pt-2 border-t border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)]">
            <span>Base Text: 1rem</span>
            <span>•</span>
            <span>Caption: 0.75rem</span>
            <span>•</span>
            <span>Metrics: 1,482 Places • 99.9% Uptime</span>
          </div>
        </div>
      </div>
    </div>
  );
}
