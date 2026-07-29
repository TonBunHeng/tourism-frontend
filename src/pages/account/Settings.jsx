import { useState } from 'react';
import { Settings as SettingsIcon, Shield, Bell, Database, Palette, Eye, EyeOff, Save, RotateCcw, RefreshCw, Check, Moon, Sun, Monitor, FileText, Activity, Server } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    // General
    siteName: 'Cambodia Heritage Explorer',
    siteDescription: 'Explore the rich cultural heritage of Cambodia',
    defaultLanguage: 'English',
    timezone: 'Asia/Phnom_Penh',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: '24h',

    // Appearance
    theme: 'light',
    primaryColor: '#2563EB',
    secondaryColor: '#7C3AED',
    fontFamily: 'Inter',
    layout: 'sidebar',

    // Security
    twoFactorAuth: true,
    sessionTimeout: '30',
    passwordPolicy: 'strong',
    loginAttempts: '5',
    ipWhitelist: ['192.168.1.1', '10.0.0.1'],

    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    systemAlerts: true,
    userActivity: true,

    // Content
    autoApprove: false,
    moderationLevel: 'medium',
    commentSpam: true,
    imageQuality: 'high',
    videoQuality: '1080p',

    // Performance
    cacheEnabled: true,
    compressionEnabled: true,
    imageOptimization: true,
    cdnEnabled: true,
    lazyLoading: true,

    // API
    apiKey: 'sk_live_4eC39HqLyjWDarjtT1zdp7dc',
    apiVersion: 'v2',
    rateLimit: '1000',
    webhookUrl: 'https://api.example.com/webhook',

    // Database
    dbType: 'postgresql',
    dbHost: 'localhost',
    dbPort: '5432',
    dbName: 'heritage_db',
    backupSchedule: 'daily',
    backupRetention: '30'
  });

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'performance', label: 'Performance', icon: Activity },
    { id: 'api', label: 'API', icon: Server },
    { id: 'database', label: 'Database', icon: Database }
  ];

  const activeTabLabel = tabs.find(t => t.id === activeTab)?.label;

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      setSettings({
        siteName: 'Cambodia Heritage Explorer',
        siteDescription: 'Explore the rich cultural heritage of Cambodia',
        defaultLanguage: 'English',
        timezone: 'Asia/Phnom_Penh',
        dateFormat: 'YYYY-MM-DD',
        timeFormat: '24h',
        theme: 'light',
        primaryColor: '#2563EB',
        secondaryColor: '#7C3AED',
        fontFamily: 'Inter',
        layout: 'sidebar',
        twoFactorAuth: true,
        sessionTimeout: '30',
        passwordPolicy: 'strong',
        loginAttempts: '5',
        ipWhitelist: ['192.168.1.1', '10.0.0.1'],
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        marketingEmails: false,
        systemAlerts: true,
        userActivity: true,
        autoApprove: false,
        moderationLevel: 'medium',
        commentSpam: true,
        imageQuality: 'high',
        videoQuality: '1080p',
        cacheEnabled: true,
        compressionEnabled: true,
        imageOptimization: true,
        cdnEnabled: true,
        lazyLoading: true,
        apiKey: 'sk_live_4eC39HqLyjWDarjtT1zdp7dc',
        apiVersion: 'v2',
        rateLimit: '1000',
        webhookUrl: 'https://api.example.com/webhook',
        dbType: 'postgresql',
        dbHost: 'localhost',
        dbPort: '5432',
        dbName: 'heritage_db',
        backupSchedule: 'daily',
        backupRetention: '30'
      });
    }
  };

  const renderGeneral = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">General Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Site Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({...settings, siteName: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Site Description</label>
            <input
              type="text"
              value={settings.siteDescription}
              onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Default Language</label>
            <select
              value={settings.defaultLanguage}
              onChange={(e) => setSettings({...settings, defaultLanguage: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option>English</option>
              <option>Khmer</option>
              <option>French</option>
              <option>Chinese</option>
              <option>Japanese</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Timezone</label>
            <select
              value={settings.timezone}
              onChange={(e) => setSettings({...settings, timezone: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="Asia/Phnom_Penh">Asia/Phnom_Penh</option>
              <option value="Asia/Bangkok">Asia/Bangkok</option>
              <option value="Asia/Singapore">Asia/Singapore</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Date Format</label>
            <select
              value={settings.dateFormat}
              onChange={(e) => setSettings({...settings, dateFormat: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option>YYYY-MM-DD</option>
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Time Format</label>
            <select
              value={settings.timeFormat}
              onChange={(e) => setSettings({...settings, timeFormat: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="24h">24h</option>
              <option value="12h">12h</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Theme</label>
            <div className="flex gap-3">
              <button
                onClick={() => setSettings({...settings, theme: 'light'})}
                className={`flex-1 p-3 border-2 rounded-xl text-center transition-all ${
                  settings.theme === 'light' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Sun className="w-5 h-5 mx-auto mb-1 text-gray-700 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Light</span>
              </button>
              <button
                onClick={() => setSettings({...settings, theme: 'dark'})}
                className={`flex-1 p-3 border-2 rounded-xl text-center transition-all ${
                  settings.theme === 'dark' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Moon className="w-5 h-5 mx-auto mb-1 text-gray-700 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark</span>
              </button>
              <button
                onClick={() => setSettings({...settings, theme: 'system'})}
                className={`flex-1 p-3 border-2 rounded-xl text-center transition-all ${
                  settings.theme === 'system' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Monitor className="w-5 h-5 mx-auto mb-1 text-gray-700 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">System</span>
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Primary Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={settings.primaryColor}
                onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                className="w-12 h-12 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer flex-shrink-0"
              />
              <input
                type="text"
                value={settings.primaryColor}
                onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                className="flex-1 min-w-0 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Secondary Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={settings.secondaryColor}
                onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})}
                className="w-12 h-12 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer flex-shrink-0"
              />
              <input
                type="text"
                value={settings.secondaryColor}
                onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})}
                className="flex-1 min-w-0 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Font Family</label>
            <select
              value={settings.fontFamily}
              onChange={(e) => setSettings({...settings, fontFamily: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option>Inter</option>
              <option>Roboto</option>
              <option>Open Sans</option>
              <option>Poppins</option>
              <option>System Default</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <div className="min-w-0">
              <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Require 2FA for all admin accounts</p>
            </div>
            <button
              onClick={() => setSettings({...settings, twoFactorAuth: !settings.twoFactorAuth})}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${
                settings.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Session Timeout (minutes)</label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings({...settings, sessionTimeout: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password Policy</label>
              <select
                value={settings.passwordPolicy}
                onChange={(e) => setSettings({...settings, passwordPolicy: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="weak">Weak</option>
                <option value="medium">Medium</option>
                <option value="strong">Strong</option>
                <option value="very_strong">Very Strong</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Max Login Attempts</label>
              <input
                type="number"
                value={settings.loginAttempts}
                onChange={(e) => setSettings({...settings, loginAttempts: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">IP Whitelist</label>
              <input
                type="text"
                value={settings.ipWhitelist.join(', ')}
                onChange={(e) => setSettings({...settings, ipWhitelist: e.target.value.split(',').map(s => s.trim())})}
                placeholder="192.168.1.1, 10.0.0.1"
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notification Settings</h3>
        <div className="space-y-3">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
            { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive push notifications in browser' },
            { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive notifications via SMS' },
            { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Receive promotional emails and updates' },
            { key: 'systemAlerts', label: 'System Alerts', desc: 'Receive critical system alerts' },
            { key: 'userActivity', label: 'User Activity', desc: 'Get notified about user activity' }
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="min-w-0">
                <p className="font-medium text-gray-900 dark:text-white">{label}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
              </div>
              <button
                onClick={() => setSettings({...settings, [key]: !settings[key]})}
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

  const renderContent = () => (
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
              onClick={() => setSettings({...settings, autoApprove: !settings.autoApprove})}
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
              onChange={(e) => setSettings({...settings, moderationLevel: e.target.value})}
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
              onChange={(e) => setSettings({...settings, imageQuality: e.target.value})}
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
              onChange={(e) => setSettings({...settings, videoQuality: e.target.value})}
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
              onClick={() => setSettings({...settings, commentSpam: !settings.commentSpam})}
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

  const renderPerformance = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Settings</h3>
        <div className="space-y-3">
          {[
            { key: 'cacheEnabled', label: 'Cache Enabled', desc: 'Enable caching for faster load times' },
            { key: 'compressionEnabled', label: 'Compression', desc: 'Enable gzip compression for assets' },
            { key: 'imageOptimization', label: 'Image Optimization', desc: 'Automatically optimize images for web' },
            { key: 'cdnEnabled', label: 'CDN Enabled', desc: 'Use CDN for static asset delivery' },
            { key: 'lazyLoading', label: 'Lazy Loading', desc: 'Enable lazy loading for images and content' }
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="min-w-0">
                <p className="font-medium text-gray-900 dark:text-white">{label}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
              </div>
              <button
                onClick={() => setSettings({...settings, [key]: !settings[key]})}
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

  const renderAPI = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">API Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">API Key</label>
            <div className="flex items-center gap-2">
              <input
                type={showPassword ? 'text' : 'password'}
                value={settings.apiKey}
                onChange={(e) => setSettings({...settings, apiKey: e.target.value})}
                className="flex-1 min-w-0 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 flex-shrink-0 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5 text-gray-500 dark:text-gray-400" /> : <Eye className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">API Version</label>
            <select
              value={settings.apiVersion}
              onChange={(e) => setSettings({...settings, apiVersion: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="v1">v1</option>
              <option value="v2">v2</option>
              <option value="v3">v3</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Rate Limit (requests/hour)</label>
            <input
              type="number"
              value={settings.rateLimit}
              onChange={(e) => setSettings({...settings, rateLimit: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Webhook URL</label>
            <input
              type="url"
              value={settings.webhookUrl}
              onChange={(e) => setSettings({...settings, webhookUrl: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderDatabase = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Database Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Database Type</label>
            <select
              value={settings.dbType}
              onChange={(e) => setSettings({...settings, dbType: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="postgresql">PostgreSQL</option>
              <option value="mysql">MySQL</option>
              <option value="mongodb">MongoDB</option>
              <option value="sqlite">SQLite</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Host</label>
            <input
              type="text"
              value={settings.dbHost}
              onChange={(e) => setSettings({...settings, dbHost: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Port</label>
            <input
              type="text"
              value={settings.dbPort}
              onChange={(e) => setSettings({...settings, dbPort: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Database Name</label>
            <input
              type="text"
              value={settings.dbName}
              onChange={(e) => setSettings({...settings, dbName: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Backup Schedule</label>
            <select
              value={settings.backupSchedule}
              onChange={(e) => setSettings({...settings, backupSchedule: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Backup Retention (days)</label>
            <input
              type="number"
              value={settings.backupRetention}
              onChange={(e) => setSettings({...settings, backupRetention: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch(activeTab) {
      case 'general': return renderGeneral();
      case 'appearance': return renderAppearance();
      case 'security': return renderSecurity();
      case 'notifications': return renderNotifications();
      case 'content': return renderContent();
      case 'performance': return renderPerformance();
      case 'api': return renderAPI();
      case 'database': return renderDatabase();
      default: return null;
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
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
              onClick={handleReset}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors hover:border-amber-300 dark:hover:border-amber-700"
            >
              <RotateCcw size={20} />
              <span className="font-medium">Reset</span>
            </button>
            <button
              onClick={handleSave}
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

      {/* Settings Layout */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Tabs: horizontal scrollable row on mobile, vertical sidebar on desktop */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 flex-shrink-0">
            <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible p-3 md:p-4 no-scrollbar">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-shrink-0 md:w-full flex items-center gap-2 md:gap-3 px-3.5 md:px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 md:p-6 min-w-0">
            <h3 className="text-xs uppercase tracking-wide font-semibold text-gray-400 dark:text-gray-500 mb-3 md:hidden">
              {activeTabLabel}
            </h3>
            {renderTabContent()}
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}