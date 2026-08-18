import { useState, useEffect } from "react";
import { getInitialTheme } from "../../utils/Theme";
import {
  Settings as SettingsIcon,
  Palette,
  Bell,
  Shield,
  Server,
  Database,
  Info
} from "lucide-react";

import SettingsHeader from "./SettingsHeader";
import SettingsTabs from "./SettingsTabs";
import GeneralTab from "./GeneralTab";
import AppearanceTab from "./AppearanceTab";
import NotificationTab from "./NotificationTab";
import SecurityTab from "./SecurityTab";
import IntegrationTab from "./IntegrationTab";
import BackupTab from "./BackupTab";
import AboutTab from "./AboutTab";
import settingService from "../../services/settingService";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Comprehensive System Settings State
  const defaultSettings = {
    // General
    siteName: "Smart Tourism Information System",
    organizationName: "Ministry of Tourism & Culture Cambodia",
    siteDescription: "Official Smart Tourism Administration & Cultural Heritage Management Portal",
    contactEmail: "admin@tourism.gov.kh",
    contactPhone: "+855 23 888 999",
    defaultLanguage: "English",
    timezone: "Asia/Phnom_Penh",
    dateFormat: "YYYY-MM-DD",
    logoUrl: null,
    faviconUrl: null,

    // Appearance
    theme: getInitialTheme(),
    primaryColor: "#22b7ab",
    sidebarStyle: "modern",
    compactSidebar: false,
    fontSize: "medium",

    // Notifications
    pushNotifications: true,
    emailNotifications: true,
    newUserAlert: true,
    newReviewAlert: true,
    newEventAlert: true,
    deletionRequestAlert: true,

    // Security
    twoFactorAuth: true,
    sessionTimeout: "30",
    passwordPolicy: "strong",
    loginAttempts: "5",

    // Integrations
    googleMapsApiKey: "AIzaSyA_DEMO_MAPS_KEY_987654321",
    firebaseApiKey: "AIzaSy_DEMO_FIREBASE_KEY",
    firebaseAuthDomain: "smart-tourism.firebaseapp.com",
    firebaseProjectId: "smart-tourism-cambodia",
    firebaseStorageBucket: "smart-tourism.appspot.com",
    smtpHost: "smtp.mailtrap.io",
    smtpPort: "587",
    smtpEncryption: "tls",
    smtpUsername: "mailer@tourism.gov.kh",
    smtpPassword: "encrypted_smtp_pass_123",
    weatherApiKey: "openweather_demo_key_7788",
    aiProvider: "gemini",
    aiApiKey: "sk-proj-gemini-pro-v2",

    // Backup
    backupSchedule: "daily",
    backupRetention: "30"
  };

  const [settings, setSettings] = useState(defaultSettings);

  const loadSettings = async () => {
    try {
      const res = await settingService.getSettings();
      if (res.success && res.data && res.data.length > 0) {
        const loaded = { ...defaultSettings };
        res.data.forEach(item => {
          const k = item.key || item.setting_key;
          let v = item.value !== undefined ? item.value : item.setting_value;
          if (k && v !== undefined && v !== null) {
            if (v === "true") v = true;
            if (v === "false") v = false;
            loaded[k] = v;
          }
        });
        setSettings(loaded);
      }
    } catch (e) {
      console.error("Failed to load settings from API:", e);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const tabs = [
    { id: "general", label: "General", icon: SettingsIcon },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "integrations", label: "Integrations", icon: Server },
    { id: "backup", label: "Backup & Restore", icon: Database },
    { id: "about", label: "About System", icon: Info }
  ];

  const handleSave = async () => {
    setSaving(true);
    try {
      const settingsArray = Object.keys(settings).map(key => ({
        key,
        value: typeof settings[key] === "object" && settings[key] !== null ? JSON.stringify(settings[key]) : String(settings[key] ?? ""),
        group: activeTab,
      }));

      await settingService.updateSettings(settingsArray);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (e) {
      alert(e.message || "Failed to save settings to backend.");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all settings to system defaults?")) {
      setSettings(defaultSettings);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return <GeneralTab settings={settings} setSettings={setSettings} />;
      case "appearance":
        return <AppearanceTab settings={settings} setSettings={setSettings} />;
      case "notifications":
        return <NotificationTab settings={settings} setSettings={setSettings} />;
      case "security":
        return <SecurityTab settings={settings} setSettings={setSettings} />;
      case "integrations":
        return <IntegrationTab settings={settings} setSettings={setSettings} />;
      case "backup":
        return <BackupTab settings={settings} setSettings={setSettings} />;
      case "about":
        return <AboutTab />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col relative pb-10">
      {/* Settings Header */}
      <SettingsHeader
        saving={saving}
        saveSuccess={saveSuccess}
        onSave={handleSave}
        onReset={handleReset}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Settings Card */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-lg shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] overflow-hidden flex flex-col min-h-[550px]">
        {/* Top Header Navigation Tabs */}
        <SettingsTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Tab Content Body */}
        <div className="flex-1 p-5 md:p-7 min-w-0">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
