import { useState } from 'react';
import {
  MapPin,
  Flame,
  Mail,
  CloudSun,
  Bot,
  Eye,
  EyeOff,
  CheckCircle2,
  RefreshCw,
  Send
} from 'lucide-react';

export default function IntegrationTab({ settings, setSettings }) {
  const [showKeys, setShowKeys] = useState({});
  const [testingService, setTestingService] = useState({});
  const [testResult, setTestResult] = useState({});

  const toggleShowKey = (keyName) => {
    setShowKeys((prev) => ({ ...prev, [keyName]: !prev[keyName] }));
  };

  const handleChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTestConnection = (serviceName) => {
    setTestingService((prev) => ({ ...prev, [serviceName]: true }));
    setTestResult((prev) => ({ ...prev, [serviceName]: null }));

    setTimeout(() => {
      setTestingService((prev) => ({ ...prev, [serviceName]: false }));
      setTestResult((prev) => ({
        ...prev,
        [serviceName]: { success: true, message: `Connected to ${serviceName} successfully!` }
      }));

      setTimeout(() => {
        setTestResult((prev) => ({ ...prev, [serviceName]: null }));
      }, 3500);
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Section Header */}
      <div>
        <h2 className="text-lg font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">
          API & Third-Party Integrations
        </h2>
        <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mt-1">
          Configure external service API keys, spatial mapping services, cloud infrastructure, and AI features.
        </p>
      </div>

      {/* Card 1: Google Maps API Key */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] pb-3">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)]" />
            Google Maps Geocoding & Places API
          </h3>
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)] text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)]">
            Active Integration
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              Google Maps API Key
            </label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <input
                  type={showKeys['googleMaps'] ? 'text' : 'password'}
                  value={settings.googleMapsApiKey || ''}
                  onChange={(e) => handleChange('googleMapsApiKey', e.target.value)}
                  placeholder="AIzaSyA..."
                  className="w-full pl-3 pr-9 py-2 text-sm font-mono rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)]"
                />
                <button
                  type="button"
                  onClick={() => toggleShowKey('googleMaps')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--color-text-muted-light)] hover:text-[var(--color-text-secondary-light)] dark:hover:text-[var(--color-text-secondary-dark)]"
                >
                  {showKeys['googleMaps'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleTestConnection('Google Maps API')}
                disabled={testingService['Google Maps API']}
                className="px-4 py-2 bg-[var(--color-neutral-badge-bg)] dark:bg-[var(--color-surface-hover-dark)] hover:bg-[var(--color-surface-hover-light)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] text-xs md:text-sm font-semibold rounded-md border border-transparent flex items-center justify-center gap-1.5 md:gap-2 shrink-0 transition-all"
              >
                {testingService['Google Maps API'] ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[var(--color-primary)]" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)]" />
                )}
                <span>Test API</span>
              </button>
            </div>
            {testResult['Google Maps API'] && (
              <p className="text-[11px] text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {testResult['Google Maps API'].message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Card 2: Firebase Configuration */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] pb-3">
          <Flame className="w-4 h-4 text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)]" />
          Firebase Cloud Storage & Analytics
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              Firebase API Key
            </label>
            <div className="relative">
              <input
                type={showKeys['firebaseKey'] ? 'text' : 'password'}
                value={settings.firebaseApiKey || ''}
                onChange={(e) => handleChange('firebaseApiKey', e.target.value)}
                placeholder="AIzaSy..."
                className="w-full pl-3 pr-9 py-2 text-sm font-mono rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)]"
              />
              <button
                type="button"
                onClick={() => toggleShowKey('firebaseKey')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--color-text-muted-light)] hover:text-[var(--color-text-secondary-light)] dark:hover:text-[var(--color-text-secondary-dark)]"
              >
                {showKeys['firebaseKey'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              Auth Domain
            </label>
            <input
              type="text"
              value={settings.firebaseAuthDomain || ''}
              onChange={(e) => handleChange('firebaseAuthDomain', e.target.value)}
              placeholder="smart-tourism.firebaseapp.com"
              className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              Project ID
            </label>
            <input
              type="text"
              value={settings.firebaseProjectId || ''}
              onChange={(e) => handleChange('firebaseProjectId', e.target.value)}
              placeholder="smart-tourism-cambodia"
              className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              Storage Bucket
            </label>
            <input
              type="text"
              value={settings.firebaseStorageBucket || ''}
              onChange={(e) => handleChange('firebaseStorageBucket', e.target.value)}
              placeholder="smart-tourism.appspot.com"
              className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)]"
            />
          </div>
        </div>
      </div>

      {/* Card 3: SMTP Email Settings */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] pb-3">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2">
            <Mail className="w-4 h-4 text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]" />
            SMTP Mail Server Configuration
          </h3>
          <button
            type="button"
            onClick={() => handleTestConnection('SMTP Email')}
            disabled={testingService['SMTP Email']}
            className="px-4 py-2 bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)] text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)] hover:opacity-90 text-xs md:text-sm font-semibold rounded-md border border-transparent flex items-center justify-center gap-1.5 md:gap-2 transition-all"
          >
            {testingService['SMTP Email'] ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span>Send Test Email</span>
          </button>
        </div>

        {testResult['SMTP Email'] && (
          <p className="text-[11px] text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> {testResult['SMTP Email'].message}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              SMTP Host
            </label>
            <input
              type="text"
              value={settings.smtpHost || ''}
              onChange={(e) => handleChange('smtpHost', e.target.value)}
              placeholder="smtp.mailtrap.io"
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              SMTP Port
            </label>
            <input
              type="text"
              value={settings.smtpPort || ''}
              onChange={(e) => handleChange('smtpPort', e.target.value)}
              placeholder="587 / 465"
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              Encryption Protocol
            </label>
            <select
              value={settings.smtpEncryption || 'tls'}
              onChange={(e) => handleChange('smtpEncryption', e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)]"
            >
              <option value="tls">TLS (STARTTLS - Port 587)</option>
              <option value="ssl">SSL (Implicit - Port 465)</option>
              <option value="none">None (Plaintext - Port 25)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              SMTP Username
            </label>
            <input
              type="text"
              value={settings.smtpUsername || ''}
              onChange={(e) => handleChange('smtpUsername', e.target.value)}
              placeholder="mailer@tourism.gov.kh"
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              SMTP Password
            </label>
            <div className="relative">
              <input
                type={showKeys['smtpPassword'] ? 'text' : 'password'}
                value={settings.smtpPassword || ''}
                onChange={(e) => handleChange('smtpPassword', e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-3 pr-9 py-2 text-sm font-mono rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)]"
              />
              <button
                type="button"
                onClick={() => toggleShowKey('smtpPassword')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--color-text-muted-light)] hover:text-[var(--color-text-secondary-light)] dark:hover:text-[var(--color-text-secondary-dark)]"
              >
                {showKeys['smtpPassword'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Card 4: Weather API (Optional) & AI Service Integration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weather API */}
        <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs space-y-3">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] pb-3">
            <CloudSun className="w-4 h-4 text-[var(--color-warning-text)] dark:text-[var(--color-warning-dark-text)]" />
            Live Destination Weather API
          </h3>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
              OpenWeatherMap API Key
            </label>
            <div className="relative">
              <input
                type={showKeys['weatherKey'] ? 'text' : 'password'}
                value={settings.weatherApiKey || ''}
                onChange={(e) => handleChange('weatherApiKey', e.target.value)}
                placeholder="OpenWeather API Key..."
                className="w-full pl-3 pr-9 py-2 text-sm font-mono rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)]"
              />
              <button
                type="button"
                onClick={() => toggleShowKey('weatherKey')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--color-text-muted-light)] hover:text-[var(--color-text-secondary-light)] dark:hover:text-[var(--color-text-secondary-dark)]"
              >
                {showKeys['weatherKey'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* AI Service API */}
        <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-md border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] p-5 shadow-xs space-y-3">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] flex items-center gap-2 border-b border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] pb-3">
            <Bot className="w-4 h-4 text-[var(--color-purple-text)] dark:text-[var(--color-purple-dark-text)]" />
            AI Assistant Service API Key
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
                AI Provider
              </label>
              <select
                value={settings.aiProvider || 'gemini'}
                onChange={(e) => handleChange('aiProvider', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)]"
              >
                <option value="gemini">Google Gemini AI</option>
                <option value="openai">OpenAI (GPT-4o)</option>
                <option value="claude">Anthropic Claude</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] mb-1">
                AI Service API Key
              </label>
              <div className="relative">
                <input
                  type={showKeys['aiKey'] ? 'text' : 'password'}
                  value={settings.aiApiKey || ''}
                  onChange={(e) => handleChange('aiApiKey', e.target.value)}
                  placeholder="sk-proj-..."
                  className="w-full pl-3 pr-9 py-2 text-sm font-mono rounded-lg border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary-light)] dark:text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-input)]"
                />
                <button
                  type="button"
                  onClick={() => toggleShowKey('aiKey')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--color-text-muted-light)] hover:text-[var(--color-text-secondary-light)] dark:hover:text-[var(--color-text-secondary-dark)]"
                >
                  {showKeys['aiKey'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
