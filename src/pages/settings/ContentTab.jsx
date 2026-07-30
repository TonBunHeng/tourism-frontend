export default function ContentTab({ settings, setSettings }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Content Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <div className="min-w-0">
              <p className="font-medium text-gray-900 dark:text-white">Auto-Approve Content</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Automatically approve user-submitted content</p>
            </div>
            <button
              type="button"
              onClick={() => setSettings({ ...settings, autoApprove: !settings.autoApprove })}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${
                settings.autoApprove ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.autoApprove ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Moderation Level</label>
            <select
              value={settings.moderationLevel}
              onChange={(e) => setSettings({ ...settings, moderationLevel: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="strict">Strict</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Image Quality</label>
            <select
              value={settings.imageQuality}
              onChange={(e) => setSettings({ ...settings, imageQuality: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="original">Original</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Video Quality</label>
            <select
              value={settings.videoQuality}
              onChange={(e) => setSettings({ ...settings, videoQuality: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="480p">480p</option>
              <option value="720p">720p</option>
              <option value="1080p">1080p</option>
              <option value="4k">4K</option>
            </select>
          </div>
          <div className="flex items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <div className="min-w-0">
              <p className="font-medium text-gray-900 dark:text-white">Spam Protection</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Enable comment spam detection and filtering</p>
            </div>
            <button
              type="button"
              onClick={() => setSettings({ ...settings, commentSpam: !settings.commentSpam })}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${
                settings.commentSpam ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.commentSpam ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
