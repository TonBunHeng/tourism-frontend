import { useState } from 'react';
import { getInitialTheme } from '../../utils/Theme';
import {
  Settings as SettingsIcon,
  Shield,
  Bell,
  Database,
  Palette,
  FileText,
  Activity,
  Server
} from 'lucide-react';
import SettingsHeader from './SettingsHeader';
import SettingsTabs from './SettingsTabs';
import GeneralTab from './GeneralTab';
import AppearanceTab from './AppearanceTab';
import SecurityTab from './SecurityTab';
import NotificationsTab from './NotificationsTab';
import ContentTab from './ContentTab';
import PerformanceTab from './PerformanceTab';
import ApiTab from './ApiTab';
import DatabaseTab from './DatabaseTab';

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
    theme: getInitialTheme(),
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralTab settings={settings} setSettings={setSettings} />;
      case 'appearance':
        return <AppearanceTab settings={settings} setSettings={setSettings} />;
      case 'security':
        return <SecurityTab settings={settings} setSettings={setSettings} />;
      case 'notifications':
        return <NotificationsTab settings={settings} setSettings={setSettings} />;
      case 'content':
        return <ContentTab settings={settings} setSettings={setSettings} />;
      case 'performance':
        return <PerformanceTab settings={settings} setSettings={setSettings} />;
      case 'api':
        return (
          <ApiTab
            settings={settings}
            setSettings={setSettings}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        );
      case 'database':
        return <DatabaseTab settings={settings} setSettings={setSettings} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <SettingsHeader
        saving={saving}
        saveSuccess={saveSuccess}
        onSave={handleSave}
        onReset={handleReset}
      />

      {/* Settings Layout */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-2xl shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Navigation Tabs */}
          <SettingsTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Content */}
          <div className="flex-1 p-4 md:p-6 min-w-0">
            <h3 className="text-xs uppercase tracking-wide font-semibold text-[var(--color-text-muted-light)] dark:text-[var(--color-text-secondary-dark)] mb-3 md:hidden">
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