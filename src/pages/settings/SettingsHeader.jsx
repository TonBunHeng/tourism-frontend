import { RotateCcw, Save, RefreshCw, Check } from 'lucide-react';

export default function SettingsHeader({ saving, saveSuccess, onSave, onReset }) {
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            System Settings
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Configure and manage system preferences
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onReset}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors hover:border-amber-300 dark:hover:border-amber-700"
          >
            <RotateCcw size={20} />
            <span className="font-medium">Reset</span>
          </button>
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25"
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={20} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
      {saveSuccess && (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-2 text-green-700 dark:text-green-400">
          <Check className="w-5 h-5 flex-shrink-0" />
          <span>Settings saved successfully!</span>
        </div>
      )}
    </div>
  );
}
