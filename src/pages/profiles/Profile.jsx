import { useState, useRef } from 'react';
import {
  User,
  Shield,
  Settings,
  Globe,
  Image,
  FileText,
  CalendarDays,
  Compass,
  Sparkles,
  MapPinned,
  MessageSquare,
  Heart
} from 'lucide-react';
import ProfileHeader from './ProfileHeader';
import ProfileStats from './ProfileStats';
import ProfileAchievements from './ProfileAchievements';
import ProfileActivity from './ProfileActivity';
import SecurityTab from './SecurityTab';
import PreferencesTab from './PreferencesTab';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  // User data
  const [userData, setUserData] = useState({
    name: 'BunHeng Ton',
    email: 'bunheng@example.com',
    phone: '+855 12 345 678',
    location: 'Phnom Penh, Cambodia',
    bio: 'Passionate about exploring Cambodia\'s rich cultural heritage and sharing experiences with fellow travelers.',
    joinDate: 'January 15, 2023',
    role: 'Admin',
    verified: true,
    twoFactorAuth: true
  });

  // User stats
  const userStats = [
    { label: 'Total Places', value: '156', icon: MapPinned, color: 'text-[var(--color-info-text)] dark:text-[var(--color-info-dark-text)]', bg: 'bg-[var(--color-info-bg)] dark:bg-[var(--color-info-dark-bg)]' },
    { label: 'Total Reviews', value: '89', icon: MessageSquare, color: 'text-[var(--color-success-text)] dark:text-[var(--color-success-dark-text)]', bg: 'bg-[var(--color-success-bg)] dark:bg-[var(--color-success-dark-bg)]' },
    { label: 'Total Favorites', value: '234', icon: Heart, color: 'text-[var(--color-danger-text)] dark:text-[var(--color-danger-dark-text)]', bg: 'bg-[var(--color-danger-bg)] dark:bg-[var(--color-danger-dark-bg)]' },
    { label: 'Total Photos', value: '567', icon: Image, color: 'text-[var(--color-purple-badge-text)] dark:text-[var(--color-purple-badge-dark-text)]', bg: 'bg-[var(--color-purple-badge-bg)] dark:bg-[var(--color-purple-badge-dark-bg)]' }
  ];

  // Recent activity
  const recentActivity = [
    { id: 1, action: 'Added new place', target: 'Angkor Wat Temple', time: '2 hours ago', icon: MapPinned },
    { id: 2, action: 'Submitted a review', target: 'Royal Palace', time: '5 hours ago', icon: MessageSquare },
    { id: 3, action: 'Uploaded photos', target: 'Koh Rong Island', time: '1 day ago', icon: Image },
    { id: 4, action: 'Created event', target: 'Water Festival 2024', time: '2 days ago', icon: CalendarDays },
    { id: 5, action: 'Added to favorites', target: 'Bayon Temple', time: '3 days ago', icon: Heart }
  ];

  // Achievements
  const achievements = [
    { name: 'Explorer', description: 'Visited 50+ places', icon: Globe, unlocked: true },
    { name: 'Photographer', description: 'Uploaded 100+ photos', icon: Image, unlocked: true },
    { name: 'Reviewer', description: 'Written 50+ reviews', icon: FileText, unlocked: true },
    { name: 'Event Creator', description: 'Created 10+ events', icon: CalendarDays, unlocked: false },
    { name: 'Guide', description: 'Helped 100+ travelers', icon: Compass, unlocked: false },
    { name: 'Ambassador', description: 'Invited 50+ friends', icon: Sparkles, unlocked: false }
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Settings }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <ProfileHeader
              userData={userData}
              profileImage={profileImage}
              fileInputRef={fileInputRef}
              handleImageUpload={handleImageUpload}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
            <ProfileStats userStats={userStats} />
            <ProfileAchievements achievements={achievements} />
            <ProfileActivity recentActivity={recentActivity} />
          </div>
        );
      case 'security':
        return (
          <SecurityTab
            userData={userData}
            setUserData={setUserData}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showNewPassword={showNewPassword}
            setShowNewPassword={setShowNewPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
          />
        );
      case 'preferences':
        return <PreferencesTab />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary-light)] dark:text-[var(--color-white)]">Profile Settings</h1>
          <p className="text-sm text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)]">Manage your account settings and preferences</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 bg-[var(--color-white)] dark:bg-[var(--color-bg-dark)] rounded-xl p-1 shadow-sm border border-[var(--color-border-subtle-light)] dark:border-[var(--color-border-dark)] mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                  ? 'bg-[var(--color-primary)] text-[var(--color-white)] shadow-lg shadow-[var(--color-primary)]/25'
                  : 'text-[var(--color-text-secondary-light)] dark:text-[var(--color-text-secondary-dark)] hover:bg-[var(--color-surface-hover-light)] dark:hover:bg-[var(--color-surface-hover-dark)]'
                }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {renderTabContent()}
    </div>
  );
}