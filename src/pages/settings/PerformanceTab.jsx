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
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Settings</h3>
        <div className="space-y-3">
          {performanceItems.map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="min-w-0">
                <p className="font-medium text-gray-900 dark:text-white">{label}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
              </div>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, [key]: !settings[key] })}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${
                  settings[key] ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
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
