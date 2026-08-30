import { Sun, Moon, Monitor, Check, LayoutDashboard } from 'lucide-react';
import { applyTheme } from '../../utils/Theme';

export default function AppearanceTab({ settings, setSettings }) {
  const handleChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value
    }));

    if (field === 'theme') {
      applyTheme(value);
    }
  };

  const themeOptions = [
    { id: 'light', name: 'Light Mode', icon: Sun, desc: 'Clean, crisp white interface tailored for daytime operations' },
    { id: 'dark', name: 'Dark Mode', icon: Moon, desc: 'Sleek dark theme reducing eye fatigue in low-light environments' },
    { id: 'system', name: 'System Default', icon: Monitor, desc: 'Automatically syncs with your operating system preference' }
  ];

  const sidebarOptions = [
    { id: 'brand', name: 'Brand Navy', color: 'bg-[#003E83]', desc: 'Official Ministry of Tourism deep navy blue' },
    { id: 'slate', name: 'Dark Slate', color: 'bg-slate-900', desc: 'Neutral modern dark charcoal navigation' },
    { id: 'light', name: 'Clean White', color: 'bg-white border border-gray-300', desc: 'High-contrast light minimalist sidebar' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Section Header */}
      <div>
        <h2 className="text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
          Appearance & Theme Settings
        </h2>
        <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
          Customize the administrative portal visual theme, contrast mode, and sidebar appearance.
        </p>
      </div>

      {/* Card 1: Dark / Light Mode */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] pb-3">
          <Sun className="w-4 h-4 text-[var(--color-primary)]" />
          Color Theme Mode
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
                <span className="text-[11px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1 leading-relaxed">
                  {opt.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Card 2: Sidebar Accent Preference */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] pb-3">
          <LayoutDashboard className="w-4 h-4 text-[var(--color-primary)]" />
          Navigation Sidebar Style
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sidebarOptions.map((opt) => {
            const isSelected = (settings.sidebarStyle || 'brand') === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleChange('sidebarStyle', opt.id)}
                className={`flex items-start gap-3 p-4 rounded-md border text-left transition-all relative cursor-pointer ${
                  isSelected
                    ? 'border-[var(--color-primary)] bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] ring-2 ring-[var(--color-primary)]/20'
                    : 'border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)]'
                }`}
              >
                <div className={`w-6 h-6 rounded-md shrink-0 mt-0.5 ${opt.color}`} />
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] block">
                    {opt.name}
                  </span>
                  <span className="text-[11px] text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-0.5 block">
                    {opt.desc}
                  </span>
                </div>
                {isSelected && (
                  <span className="text-[var(--color-primary)] shrink-0">
                    <Check className="w-4 h-4" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
