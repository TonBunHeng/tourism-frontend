export default function PerformanceTab({ settings, setSettings }) {
  const performanceItems = [
    { key: 'cacheEnabled', label: 'Cache Enabled', desc: 'Enable caching for faster load times' },
    { key: 'compressionEnabled', label: 'Compression', desc: 'Enable gzip compression for assets' },
    { key: 'imageOptimization', label: 'Image Optimization', desc: 'Automatically optimize images for web' },
    { key: 'cdnEnabled', label: 'CDN Enabled', desc: 'Use CDN for static asset delivery' },
    { key: 'lazyLoading', label: 'Lazy Loading', desc: 'Enable lazy loading for images and content' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] mb-4">Performance Settings</h3>
        <div className="space-y-3">
          {performanceItems.map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between gap-4 p-4 bg-[var(--color-surface-hover-light)] dark:bg-[var(--color-surface-hover-dark)]/50 rounded-xl">
              <div className="min-w-0">
                <p className="font-medium text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">{label}</p>
                <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">{desc}</p>
              </div>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, [key]: !settings[key] })}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${
                  settings[key] ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border-subtle-light)] dark:bg-[var(--color-border-dark)]'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-[var(--color-white)] transition-transform ${
                    settings[key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
