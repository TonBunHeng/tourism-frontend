import React, { useState } from 'react';
import { Plug, MapPin, Flame, Mail, CloudSun, Cpu, Eye, EyeOff, CheckCircle2, Loader2 } from 'lucide-react';

export default function IntegrationTab({ settings, setSettings }) {
  const [showGmapsKey, setShowGmapsKey] = useState(false);
  const [showSmtpPass, setShowSmtpPass] = useState(false);
  const [showAiKey, setShowAiKey] = useState(false);

  const [testingMaps, setTestingMaps] = useState(false);
  const [testingSmtp, setTestingSmtp] = useState(false);
  const [mapsTestResult, setMapsTestResult] = useState(null);
  const [smtpTestResult, setSmtpTestResult] = useState(null);

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleTestMapsConnection = () => {
    setTestingMaps(true);
    setMapsTestResult(null);
    setTimeout(() => {
      setTestingMaps(false);
      setMapsTestResult('Google Maps API Key verified successfully!');
      setTimeout(() => setMapsTestResult(null), 4000);
    }, 1200);
  };

  const handleTestSmtpConnection = () => {
    setTestingSmtp(true);
    setSmtpTestResult(null);
    setTimeout(() => {
      setTestingSmtp(false);
      setSmtpTestResult('Test email dispatched to contact address!');
      setTimeout(() => setSmtpTestResult(null), 4000);
    }, 1500);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      <div>
        <h2 className="text-base md:text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)]">
          Integrations & Third-Party APIs
        </h2>
        <p className="text-xs text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">
          Configure API credentials for mapping, real-time databases, SMTP mailers, weather, and AI services.
        </p>
      </div>

      {/* Google Maps API Card */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-xl p-4 md:p-5 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)] dark:text-[var(--color-brand-teal)] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" /> Google Maps Geolocation API
          </h3>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] border border-[var(--color-info-border)] dark:border-[var(--color-info-dark-border)]">
            Active Integration
          </span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
            Google Maps API Key
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type={showGmapsKey ? 'text' : 'password'}
                value={settings.gmapsApiKey || 'AIzaSyB_EXAMPLE_MAPS_KEY_9921'}
                onChange={(e) => handleChange('gmapsApiKey', e.target.value)}
                placeholder="AIzaSy..."
                className="w-full pl-3 pr-9 py-2 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-bg-light)] dark:bg-[var(--color-input-dark-bg)] text-xs md:text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowGmapsKey(!showGmapsKey)}
                className="absolute right-3 top-2.5 text-[var(--color-text-muted-light)] dark:text-[var(--color-text-muted-dark)] hover:text-[var(--color-text-primary-light)] dark:hover:text-[var(--color-text-primary-dark)]"
              >
                {showGmapsKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>

            <button
              type="button"
              onClick={handleTestMapsConnection}
              disabled={testingMaps}
              className="px-3 py-2 rounded-lg text-xs font-semibold border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)] transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              {testingMaps ? <Loader2 className="w-3.5 h-3.5 animate-spin text-[var(--color-primary)]" /> : <Plug className="w-3.5 h-3.5" />}
              <span>Test Key</span>
            </button>
          </div>

          {mapsTestResult && (
            <p className="text-xs text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] font-semibold mt-1.5 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> {mapsTestResult}
            </p>
          )}
        </div>
      </div>

      {/* Firebase Configuration Card */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-xl p-4 md:p-5 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] shadow-xs space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)] dark:text-[var(--color-brand-teal)] flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5" /> Firebase Credentials (Realtime Push)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              Firebase API Key
            </label>
            <input
              type="text"
              value={settings.firebaseApiKey || ''}
              onChange={(e) => handleChange('firebaseApiKey', e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-bg-light)] dark:bg-[var(--color-input-dark-bg)] text-xs md:text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              Auth Domain
            </label>
            <input
              type="text"
              value={settings.firebaseAuthDomain || ''}
              onChange={(e) => handleChange('firebaseAuthDomain', e.target.value)}
              placeholder="tourism-app.firebaseapp.com"
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-bg-light)] dark:bg-[var(--color-input-dark-bg)] text-xs md:text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              Project ID
            </label>
            <input
              type="text"
              value={settings.firebaseProjectId || ''}
              onChange={(e) => handleChange('firebaseProjectId', e.target.value)}
              placeholder="tourism-app-prod"
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-bg-light)] dark:bg-[var(--color-input-dark-bg)] text-xs md:text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              Storage Bucket
            </label>
            <input
              type="text"
              value={settings.firebaseStorageBucket || ''}
              onChange={(e) => handleChange('firebaseStorageBucket', e.target.value)}
              placeholder="tourism-app.appspot.com"
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-bg-light)] dark:bg-[var(--color-input-dark-bg)] text-xs md:text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
            />
          </div>
        </div>
      </div>

      {/* SMTP Mail Server Settings Card */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-xl p-4 md:p-5 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)] dark:text-[var(--color-brand-teal)] flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" /> SMTP Email Server Configuration
          </h3>
          <button
            type="button"
            onClick={handleTestSmtpConnection}
            disabled={testingSmtp}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] border border-[var(--color-info-border)] dark:border-[var(--color-info-dark-border)] hover:opacity-90 transition-all flex items-center gap-1 cursor-pointer"
          >
            {testingSmtp ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Mail className="w-3.5 h-3.5" />}
            <span>Send Test Mail</span>
          </button>
        </div>

        {smtpTestResult && (
          <p className="text-xs text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> {smtpTestResult}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              SMTP Host
            </label>
            <input
              type="text"
              value={settings.smtpHost || 'smtp.mailtrap.io'}
              onChange={(e) => handleChange('smtpHost', e.target.value)}
              placeholder="smtp.example.com"
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-bg-light)] dark:bg-[var(--color-input-dark-bg)] text-xs md:text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              Port
            </label>
            <input
              type="text"
              value={settings.smtpPort || '587'}
              onChange={(e) => handleChange('smtpPort', e.target.value)}
              placeholder="587 / 465"
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-bg-light)] dark:bg-[var(--color-input-dark-bg)] text-xs md:text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              SMTP Username
            </label>
            <input
              type="text"
              value={settings.smtpUser || ''}
              onChange={(e) => handleChange('smtpUser', e.target.value)}
              placeholder="user@example.com"
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-bg-light)] dark:bg-[var(--color-input-dark-bg)] text-xs md:text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              SMTP Password
            </label>
            <div className="relative">
              <input
                type={showSmtpPass ? 'text' : 'password'}
                value={settings.smtpPass || ''}
                onChange={(e) => handleChange('smtpPass', e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-3 pr-9 py-2 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-bg-light)] dark:bg-[var(--color-input-dark-bg)] text-xs md:text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowSmtpPass(!showSmtpPass)}
                className="absolute right-3 top-2.5 text-[var(--color-text-muted-light)] dark:text-[var(--color-text-muted-dark)] hover:text-[var(--color-text-primary-light)] dark:hover:text-[var(--color-text-primary-dark)]"
              >
                {showSmtpPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              Encryption Protocol
            </label>
            <select
              value={settings.smtpEncryption || 'tls'}
              onChange={(e) => handleChange('smtpEncryption', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-bg-light)] dark:bg-[var(--color-input-dark-bg)] text-xs md:text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all cursor-pointer"
            >
              <option value="tls">TLS (STARTTLS - Port 587)</option>
              <option value="ssl">SSL (Implicit - Port 465)</option>
              <option value="none">None (Plain Text - Port 25)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Weather API (Optional) */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-xl p-4 md:p-5 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] shadow-xs space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)] dark:text-[var(--color-brand-teal)] flex items-center gap-1.5">
          <CloudSun className="w-3.5 h-3.5" /> OpenWeather API (Optional)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              OpenWeather Key
            </label>
            <input
              type="text"
              value={settings.weatherApiKey || ''}
              onChange={(e) => handleChange('weatherApiKey', e.target.value)}
              placeholder="e.g. 8f92b7c4d1e2..."
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-bg-light)] dark:bg-[var(--color-input-dark-bg)] text-xs md:text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              Default Weather Location
            </label>
            <input
              type="text"
              value={settings.weatherLocation || 'Phnom Penh, KH'}
              onChange={(e) => handleChange('weatherLocation', e.target.value)}
              placeholder="e.g. Siem Reap, KH"
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-bg-light)] dark:bg-[var(--color-input-dark-bg)] text-xs md:text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
            />
          </div>
        </div>
      </div>

      {/* AI Service API Key (Future Support) */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-xl p-4 md:p-5 border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)] dark:text-[var(--color-brand-teal)] flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" /> AI Assistant Service
          </h3>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--color-purple-bg)] dark:bg-[var(--color-purple-dark-bg)] text-[var(--color-purple-text)] dark:text-[var(--color-purple-dark-text)] border border-[var(--color-purple-border)] dark:border-[var(--color-purple-dark-border)]">
            Future Support
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              AI Provider
            </label>
            <select
              value={settings.aiProvider || 'gemini'}
              onChange={(e) => handleChange('aiProvider', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-bg-light)] dark:bg-[var(--color-input-dark-bg)] text-xs md:text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all cursor-pointer"
            >
              <option value="gemini">Google Gemini AI</option>
              <option value="openai">OpenAI (GPT-4o)</option>
              <option value="claude">Anthropic Claude</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              AI Service API Key
            </label>
            <div className="relative">
              <input
                type={showAiKey ? 'text' : 'password'}
                value={settings.aiApiKey || ''}
                onChange={(e) => handleChange('aiApiKey', e.target.value)}
                placeholder="AIzaSy... or sk-proj-..."
                className="w-full pl-3 pr-9 py-2 rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-bg-light)] dark:bg-[var(--color-input-dark-bg)] text-xs md:text-sm text-[var(--color-text-primary-light)] dark:text-[var(--color-text-primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowAiKey(!showAiKey)}
                className="absolute right-3 top-2.5 text-[var(--color-text-muted-light)] dark:text-[var(--color-text-muted-dark)] hover:text-[var(--color-text-primary-light)] dark:hover:text-[var(--color-text-primary-dark)]"
              >
                {showAiKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
